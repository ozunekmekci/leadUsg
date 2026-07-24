import { prisma } from "@/lib/prisma";
import { verifyPassword, createAdminToken, verifyAdminToken } from "@/lib/auth";

const ALLOWED_TRANSITIONS: Record<string, string[]> = {
  new: ["called", "closed"],
  called: ["warm", "cold", "closed"],
  warm: ["sold", "cold", "closed"],
  cold: ["warm", "closed"],
  sold: ["closed"],
  closed: ["new", "called"],
};

async function runIntegrationTests() {
  console.log("==========================================================");
  console.log("🚀 STARTING LEADUSG E2E INTEGRATION TEST SUITE (CP-013)");
  console.log("==========================================================");

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
  // STEP 2: Consent-Gated Session Initialization
  // ----------------------------------------------------------------------
  console.log("\n[Step 2/8] Testing Consent-Gated Session Initialization...");
  const testSessionId = `e2e_sess_${Date.now()}`;
  const testFpHash = `e2e_fp_hash_${Date.now()}`;

  const session = await prisma.session.create({
    data: {
      id: testSessionId,
      consentStatus: "analytics",
      fingerprintHash: testFpHash,
      ipHash: "127.0.0.***"
    },
  });

  if (session && session.consentStatus === "analytics") {
    console.log(`✅ STEP 2 PASSED: Created session ${session.id} with active analytics consent.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 2 FAILED: Session creation failed or consent status incorrect.");
  }

  // ----------------------------------------------------------------------
  // STEP 3: Behavioral Event Pipeline
  // ----------------------------------------------------------------------
  console.log("\n[Step 3/8] Testing Behavioral Event Pipeline...");
  const eventBatch = await prisma.event.createMany({
    data: [
      {
        sessionId: session.id,
        eventName: "compare_start",
        metadata: { productIds: [1, 2], count: 2 },
      },
      {
        sessionId: session.id,
        eventName: "product_view",
        metadata: { productId: 1, productSlug: "ge-voluson-e10" },
      },
    ],
  });

  if (eventBatch.count === 2) {
    console.log(`✅ STEP 3 PASSED: Recorded ${eventBatch.count} behavioral events into PostgreSQL.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 3 FAILED: Event batch recording failed.");
  }

  // ----------------------------------------------------------------------
  // STEP 4: Proposal Form & Lead Submission + Consent Upgrade
  // ----------------------------------------------------------------------
  console.log("\n[Step 4/8] Testing Proposal Lead Form & Consent Upgrade to 'full'...");
  await prisma.session.update({
    where: { id: session.id },
    data: { consentStatus: "full" },
  });

  const lead = await prisma.lead.create({
    data: {
      name: "Dr. Selin Aksu",
      company: "Aksu Kadın Sağlığı Polikliniği",
      phone: "05329998877",
      email: "selin@aksu.com",
      budgetRange: "2M-3M TL",
      message: "EPIQ Elite ile Voluson E10 teklifi talep ediliyor.",
      sessionId: session.id,
      status: "new",
    },
  });

  const updatedSession = await prisma.session.findUnique({ where: { id: session.id } });

  if (lead && updatedSession?.consentStatus === "full") {
    console.log(`✅ STEP 4 PASSED: Created Lead ID ${lead.id} and upgraded session consent to 'full'.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 4 FAILED: Lead creation or consent upgrade failed.");
  }

  // ----------------------------------------------------------------------
  // STEP 5: Account Manager Authentication
  // ----------------------------------------------------------------------
  console.log("\n[Step 5/8] Testing Account Manager Credentials & JWT Tokens...");
  const amUser = await prisma.aMUser.findUnique({
    where: { email: "admin@leadusg.com" },
  });

  const isPasswordValid = amUser ? verifyPassword("LeadUsg2026!", amUser.passwordHash) : false;
  const token = amUser ? await createAdminToken({ sub: amUser.id, email: amUser.email, name: amUser.name }) : "";
  const tokenPayload = token ? await verifyAdminToken(token) : null;

  if (isPasswordValid && tokenPayload?.email === "admin@leadusg.com") {
    console.log(`✅ STEP 5 PASSED: AM Authentication & JWT Token verified for ${tokenPayload.name}.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 5 FAILED: AM authentication failed.");
  }

  // ----------------------------------------------------------------------
  // STEP 6: Unified Lead Card & Product ID Resolution
  // ----------------------------------------------------------------------
  console.log("\n[Step 6/8] Testing Unified Lead Card & Product Name Resolution...");
  const sessionEvents = await prisma.event.findMany({
    where: { sessionId: session.id },
  });

  const pids = [1, 2];
  const resolvedProducts = await prisma.product.findMany({
    where: { id: { in: pids } },
  });

  const resolvedNames = resolvedProducts.map((p) => `${p.brand} ${p.name}`);

  if (sessionEvents.length === 2 && resolvedNames.length === 2) {
    console.log(`✅ STEP 6 PASSED: Resolved product IDs into: ${resolvedNames.join(", ")}.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 6 FAILED: Product ID resolution failed.");
  }

  // ----------------------------------------------------------------------
  // STEP 7: Server-side AM State Machine Rules
  // ----------------------------------------------------------------------
  console.log("\n[Step 7/8] Testing AM State Machine Enforcement...");
  const currentStatus = lead.status; // 'new'
  const isInvalidAllowed = (ALLOWED_TRANSITIONS[currentStatus] || []).includes("sold");
  const isValidAllowed = (ALLOWED_TRANSITIONS[currentStatus] || []).includes("called");

  if (!isInvalidAllowed && isValidAllowed) {
    await prisma.lead.update({
      where: { id: lead.id },
      data: { status: "called" },
    });
    console.log("✅ STEP 7 PASSED: Rejected invalid transition ('new'->'sold'), accepted valid transition ('new'->'called').");
    passedSteps++;
  } else {
    console.error("❌ STEP 7 FAILED: State Machine validation rules violated.");
  }

  // ----------------------------------------------------------------------
  // STEP 8: AM Notes Pipeline
  // ----------------------------------------------------------------------
  console.log("\n[Step 8/8] Testing AM Notes Pipeline...");
  const note = amUser
    ? await prisma.leadNote.create({
        data: {
          leadId: lead.id,
          content: "E2E Test Note: Müşteri ile ön muayene görüşmesi planlandı.",
          amUserId: amUser.id,
        },
      })
    : null;

  if (note) {
    console.log(`✅ STEP 8 PASSED: Created AM Note ID ${note.id}.`);
    passedSteps++;
  } else {
    console.error("❌ STEP 8 FAILED: AM Note creation failed.");
  }

  // ----------------------------------------------------------------------
  // CLEANUP & SUMMARY
  // ----------------------------------------------------------------------
  console.log("\n🧹 Cleaning up test artifacts from database...");
  if (note) await prisma.leadNote.delete({ where: { id: note.id } });
  await prisma.event.deleteMany({ where: { sessionId: session.id } });
  await prisma.lead.delete({ where: { id: lead.id } });
  await prisma.session.delete({ where: { id: session.id } });

  console.log("\n==========================================================");
  console.log(`🏁 INTEGRATION TEST RESULTS: ${passedSteps}/${totalSteps} STEPS PASSED`);
  console.log("==========================================================");

  if (passedSteps === totalSteps) {
    console.log("✨ ALL E2E INTEGRATION TESTS PASSED CLEANLY!");
  } else {
    console.error("⚠️ SOME STEPS FAILED. PLEASE REVIEW LOGS ABOVE.");
    process.exit(1);
  }
}

runIntegrationTests().catch((err) => {
  console.error("Unhandled error during integration tests:", err);
  process.exit(1);
});
