// Setup browser mock environment for client-side tracking testing
const mockStorage: Record<string, string> = {};
let mockCookieString = "";
(global as any).window = {
  addEventListener: () => {},
  removeEventListener: () => {},
} as any;
(global as any).localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, val: string) => { mockStorage[key] = val; },
  removeItem: (key: string) => { delete mockStorage[key]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
} as any;
(global as any).document = {
  get cookie() {
    return mockCookieString;
  },
  set cookie(val: string) {
    mockCookieString = val;
  },
  createElement: (tag: string) => {
    if (tag === "canvas") {
      return {
        width: 0,
        height: 0,
        getContext: () => null,
        toDataURL: () => "data:image/png;base64,mock"
      };
    }
    return {};
  }
} as any;
Object.defineProperty(global, "navigator", {
  value: {
    userAgent: "Mozilla/5.0 (Mock; CPU Mock OS)",
    language: "tr",
    hardwareConcurrency: 4,
    maxTouchPoints: 0,
    sendBeacon: () => true
  },
  configurable: true,
  writable: true
});

import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { verifyPassword, createAdminToken } from "@/lib/auth";

// Import Next.js route handlers
import { POST as postEvents } from "@/app/api/events/route";
import { POST as postLeads } from "@/app/api/leads/route";
import { GET as getLeadDetails } from "@/app/api/admin/leads/[id]/route";
import { PATCH as patchStatus } from "@/app/api/admin/leads/[id]/status/route";
import { POST as postNotes } from "@/app/api/admin/leads/[id]/notes/route";

// Import Client Tracking SDK
import { trackEvent, getConsentStatus, setConsentStatus, flushEvents } from "@/lib/tracking";

async function runIntegrationTests() {
  console.log("==========================================================");
  console.log("🚀 STARTING HTTP-LEVEL INTEGRATION TEST SUITE");
  console.log("==========================================================");

  // Reset Redis rate limit keys to ensure clean test runs
  try {
    await redis.del("ratelimit:events:127.0.0.1");
    await redis.del("ratelimit:leads:127.0.0.1");
  } catch (err) {
    console.warn("Could not reset Redis rate limit keys:", err);
  }

  let passedSteps = 0;
  const totalSteps = 8;

  // ----------------------------------------------------------------------
  // STEP 1: Catalog & Database Products Verification
  // ----------------------------------------------------------------------
  console.log("\n[Step 1/8] Verifying Database Catalog & Product Specs...");
  const products = await prisma.product.findMany({
    where: { category: "ultrason" },
  });

  if (products.length >= 8) {
    console.log(`✅ STEP 1 PASSED: Found ${products.length} ultrasound devices with full specs.`);
    passedSteps++;
  } else {
    console.error(`❌ STEP 1 FAILED: Expected >= 8 products, found ${products.length}.`);
  }

  // ----------------------------------------------------------------------
  // STEP 2: Client SDK Consent-Gate Verification
  // ----------------------------------------------------------------------
  console.log("\n[Step 2/8] Testing Client-Side Tracking Consent Enforcement...");
  
  // Set consent to none
  await setConsentStatus("none");
  if (getConsentStatus() !== "none") {
    console.error("❌ STEP 2 FAILED: Consent should default to 'none'");
    return;
  }

  // Attempt to track event (should be strict no-op)
  trackEvent("compare_start", { productIds: [1, 2] });
  
  // Verify localStorage is empty of tracking tokens
  const storedSessionId = localStorage.getItem("leadusg_session_id");
  const storedFp = localStorage.getItem("leadusg_fp_hash");

  if (!storedSessionId && !storedFp) {
    console.log("✅ STEP 2 PASSED: Client SDK strictly prevented tracking tokens when consent is 'none'.");
    passedSteps++;
  } else {
    console.error(`❌ STEP 2 FAILED: SDK created tracking tokens (Sess: ${storedSessionId}, Fp: ${storedFp}) without consent!`);
  }

  // ----------------------------------------------------------------------
  // STEP 3: Backend API Consent-Gate Verification (Negative Test)
  // ----------------------------------------------------------------------
  console.log("\n[Step 3/8] Testing Backend API Event Consent Gate (Negative Test)...");
  
  const testSessionId = `e2e_sess_${Date.now()}`;
  const testFpHash = `e2e_fp_${Date.now()}`;

  // Attempt events POST with consentStatus "none" (malicious client bypass simulation)
  const noneReq = new NextRequest("http://localhost/api/events", {
    method: "POST",
    headers: {
      "x-forwarded-for": "127.0.0.1",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sessionId: testSessionId,
      fingerprintHash: testFpHash,
      consentStatus: "none", // Bypassing client check simulation
      events: [
        { eventName: "product_view", metadata: { productId: 1 }, timestamp: new Date().toISOString() }
      ]
    })
  });

  const noneRes = await postEvents(noneReq);
  
  if (noneRes.status === 403 || noneRes.status === 400) {
    console.log(`✅ STEP 3 PASSED: Backend correctly rejected event POST with 'none' consent (Status: ${noneRes.status}).`);
    passedSteps++;
  } else {
    console.error(`❌ STEP 3 FAILED: Backend accepted events with 'none' consent! Status: ${noneRes.status}`);
  }

  // ----------------------------------------------------------------------
  // STEP 4: Backend API Event Tracking with Active Consent
  // ----------------------------------------------------------------------
  console.log("\n[Step 4/8] Testing Event Submission with Analytics Consent...");

  const analyticsReq = new NextRequest("http://localhost/api/events", {
    method: "POST",
    headers: {
      "x-forwarded-for": "127.0.0.1",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      sessionId: testSessionId,
      fingerprintHash: testFpHash,
      consentStatus: "analytics",
      events: [
        { eventName: "product_view", metadata: { productId: 1 }, timestamp: new Date().toISOString() },
        { eventName: "compare_start", metadata: { productIds: [1, 2] }, timestamp: new Date().toISOString() }
      ]
    })
  });

  const analyticsRes = await postEvents(analyticsReq);
  const eventsResult = await analyticsRes.json();

  if (analyticsRes.status === 200 && eventsResult.success) {
    // Confirm write to DB
    const dbEvents = await prisma.event.findMany({ where: { sessionId: testSessionId } });
    if (dbEvents.length === 2) {
      console.log(`✅ STEP 4 PASSED: Successfully recorded ${dbEvents.length} events and upserted session with active analytics consent.`);
      passedSteps++;
    } else {
      console.error(`❌ STEP 4 FAILED: Expected 2 events in DB, found ${dbEvents.length}`);
    }
  } else {
    console.error(`❌ STEP 4 FAILED: Backend event POST failed. Status: ${analyticsRes.status}`);
  }

  // ----------------------------------------------------------------------
  // STEP 5: Proposal Form Submission & Consent Upgrade (Lead API)
  // ----------------------------------------------------------------------
  console.log("\n[Step 5/8] Testing Proposal Form & Consent Upgrade to 'full' (Negative & Positive)...");

  // A. Negative Test: Submit with invalid phone number format
  const invalidLeadReq = new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: {
      "x-forwarded-for": "127.0.0.1",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: "Dr. Selin Aksu",
      company: "Aksu Klinik",
      phone: "12345", // Invalid Turkish phone number
      email: "invalid-email", // Invalid email
      sessionId: testSessionId
    })
  });

  const invalidLeadRes = await postLeads(invalidLeadReq);
  
  if (invalidLeadRes.status === 400) {
    console.log("✅ STEP 5A PASSED: Backend correctly rejected invalid lead data with 400 Bad Request.");
  } else {
    console.error(`❌ STEP 5A FAILED: Backend accepted invalid lead schema. Status: ${invalidLeadRes.status}`);
  }

  // B. Positive Test: Submit valid lead
  const validLeadReq = new NextRequest("http://localhost/api/leads", {
    method: "POST",
    headers: {
      "x-forwarded-for": "127.0.0.1",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      name: "Dr. Selin Aksu",
      company: "Aksu Klinik",
      phone: "05329998877",
      email: "selin@aksu.com",
      budgetRange: "2M-3M TL",
      message: "GE Voluson E10 teklifi rica ederim.",
      sessionId: testSessionId,
      selectedProducts: ["1", "2"]
    })
  });

  const validLeadRes = await postLeads(validLeadReq);
  const leadResult = await validLeadRes.json();

  if (validLeadRes.status === 200 && leadResult.success) {
    // Confirm session consent was upgraded to full
    const dbSession = await prisma.session.findUnique({ where: { id: testSessionId } });
    if (dbSession?.consentStatus === "full") {
      console.log(`✅ STEP 5B PASSED: Created Lead ID ${leadResult.leadId} and upgraded session consent to 'full'.`);
      passedSteps++;
    } else {
      console.error(`❌ STEP 5B FAILED: Lead created, but session consent status is '${dbSession?.consentStatus}' (expected: 'full').`);
    }
  } else {
    console.error(`❌ STEP 5B FAILED: Valid lead submission failed. Status: ${validLeadRes.status}`);
  }

  const createdLeadId = leadResult.leadId;

  // ----------------------------------------------------------------------
  // STEP 6: Account Manager Authentication & JWT Validation
  // ----------------------------------------------------------------------
  console.log("\n[Step 6/8] Testing Account Manager Auth Token Generation...");
  const amUser = await prisma.aMUser.findUnique({
    where: { email: "admin@leadusg.com" },
  });

  const isPasswordValid = amUser ? verifyPassword("LeadUsg2026!", amUser.passwordHash) : false;
  const amToken = amUser ? await createAdminToken({ sub: amUser.id, email: amUser.email, name: amUser.name }) : "";

  if (isPasswordValid && amToken) {
    console.log(`✅ STEP 6 PASSED: AM password verified and admin JWT token generated successfully.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 6 FAILED: AM authentication token setup failed.");
  }

  // ----------------------------------------------------------------------
  // STEP 7: Unified Lead Card & Product ID Resolution
  // ----------------------------------------------------------------------
  console.log("\n[Step 7/8] Testing Unified Lead Card Details API...");
  
  const leadCardReq = new NextRequest(`http://localhost/api/admin/leads/${createdLeadId}`, {
    method: "GET"
  });

  const leadCardRes = await getLeadDetails(leadCardReq, { params: { id: createdLeadId } });
  const leadCardData = await leadCardRes.json();

  if (leadCardRes.status === 200 && leadCardData.success) {
    const metrics = leadCardData.metrics;
    const productMap = leadCardData.productMap;
    
    // Check if product 1 is resolved in productMap
    if (productMap["1"] && metrics.totalEvents === 2) {
      console.log(`✅ STEP 7 PASSED: Unified lead metrics loaded. Total events: ${metrics.totalEvents}. Resolved: ${productMap["1"].fullName}`);
      passedSteps++;
    } else {
      console.error("❌ STEP 7 FAILED: Product ID resolution or metrics mismatch in unified lead card.");
    }
  } else {
    console.error(`❌ STEP 7 FAILED: Unified lead details API request failed. Status: ${leadCardRes.status}`);
  }

  // ----------------------------------------------------------------------
  // STEP 8: AM State Machine Enforcement & Lead Notes (HTTP Boundary Tests)
  // ----------------------------------------------------------------------
  console.log("\n[Step 8/8] Testing AM State Machine & Lead Notes API Enforcement...");

  // A. Negative State Machine Test: new -> sold (Invalid)
  const invalidStatusReq = new NextRequest(`http://localhost/api/admin/leads/${createdLeadId}/status`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ status: "sold" })
  });

  const invalidStatusRes = await patchStatus(invalidStatusReq, { params: { id: createdLeadId } });
  
  let validTransitionPassed = false;
  if (invalidStatusRes.status === 400) {
    console.log("✅ STEP 8A PASSED: State Machine API correctly blocked invalid transition ('new' -> 'sold') with 400 Bad Request.");
    
    // B. Positive State Machine Test: new -> called (Valid)
    const validStatusReq = new NextRequest(`http://localhost/api/admin/leads/${createdLeadId}/status`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status: "called" })
    });
    
    const validStatusRes = await patchStatus(validStatusReq, { params: { id: createdLeadId } });
    const statusResult = await validStatusRes.json();
    
    if (validStatusRes.status === 200 && statusResult.lead?.status === "called") {
      console.log("✅ STEP 8B PASSED: State Machine API allowed valid transition ('new' -> 'called') successfully.");
      validTransitionPassed = true;
    } else {
      console.error(`❌ STEP 8B FAILED: Valid transition failed. Status: ${validStatusRes.status}`);
    }
  } else {
    console.error(`❌ STEP 8A FAILED: State Machine API accepted invalid transition! Status: ${invalidStatusRes.status}`);
  }

  // C. Lead Notes POST API Test
  const noteReq = new NextRequest(`http://localhost/api/admin/leads/${createdLeadId}/notes`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ content: "E2E HTTP Test Note: Görüşme yapıldı." })
  });

  const noteRes = await postNotes(noteReq, { params: { id: createdLeadId } });
  const noteResult = await noteRes.json();

  let notePassed = false;
  if (noteRes.status === 201 && noteResult.success && noteResult.note?.content === "E2E HTTP Test Note: Görüşme yapıldı.") {
    console.log(`✅ STEP 8C PASSED: Added lead note through the POST API endpoint: Note ID ${noteResult.note.id}.`);
    notePassed = true;
  } else {
    console.error(`❌ STEP 8C FAILED: Note addition through API failed. Status: ${noteRes.status}`);
  }

  if (validTransitionPassed && notePassed) {
    passedSteps++;
  }

  // ----------------------------------------------------------------------
  // CLEANUP & SUMMARY
  // ----------------------------------------------------------------------
  console.log("\n🧹 Cleaning up test artifacts from database...");
  if (noteResult?.note?.id) {
    await prisma.leadNote.delete({ where: { id: noteResult.note.id } });
  }
  await prisma.event.deleteMany({ where: { sessionId: testSessionId } });
  await prisma.lead.delete({ where: { id: createdLeadId } });
  await prisma.session.delete({ where: { id: testSessionId } });

  console.log("\n==========================================================");
  console.log(`🏁 INTEGRATION TEST RESULTS: ${passedSteps}/${totalSteps} STEPS PASSED`);
  console.log("==========================================================");

  if (passedSteps === totalSteps) {
    console.log("✨ ALL HTTP-LEVEL E2E INTEGRATION TESTS PASSED CLEANLY!");
  } else {
    console.error("⚠️ SOME STEPS FAILED. PLEASE REVIEW LOGS ABOVE.");
    process.exit(1);
  }
}

runIntegrationTests().catch((err) => {
  console.error("Unhandled error during integration tests:", err);
  process.exit(1);
});
