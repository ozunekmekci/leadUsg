/**
 * Client-side Event Tracking SDK (Consent-Gated)
 * 
 * STRICT RULES:
 * - If consent is NOT given ("none"), NO events, fingerprint, or cookies/localstorage IDs are created.
 * - If consent IS given ("analytics" | "full"), events are buffered locally and flushed every 5s or on page unload via sendBeacon.
 */

import { generateFingerprint } from "./fingerprint";

export type ConsentStatus = "none" | "analytics" | "full";

export interface TrackedEvent {
  eventName: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

const CONSENT_STORAGE_KEY = "leadusg_consent";
const SESSION_STORAGE_KEY = "leadusg_session_id";
const FINGERPRINT_STORAGE_KEY = "leadusg_fp_hash";

let eventBuffer: TrackedEvent[] = [];
let flushInterval: ReturnType<typeof setInterval> | null = null;
let isInitialized = false;

/**
 * Get current consent status. Returns "none" if not set or explicitly set to "none".
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "none";
  const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
  if (stored === "analytics" || stored === "full") {
    return stored;
  }
  return "none";
}

/**
 * Set consent status.
 * If set to "analytics" or "full", generates fingerprint & initializes session tracking.
 * If set to "none", clears stored session/fingerprint IDs and stops buffer.
 */
export async function setConsentStatus(status: ConsentStatus): Promise<void> {
  if (typeof window === "undefined") return;

  localStorage.setItem(CONSENT_STORAGE_KEY, status);
  document.cookie = `consent_status=${status}; path=/; max-age=${365 * 86400}; SameSite=Lax`;

  if (status === "none") {
    // Clear any existing stored tracking tokens
    localStorage.removeItem(SESSION_STORAGE_KEY);
    localStorage.removeItem(FINGERPRINT_STORAGE_KEY);
    document.cookie = "session_id=; path=/; max-age=0";
    eventBuffer = [];
    if (flushInterval) {
      clearInterval(flushInterval);
      flushInterval = null;
    }
    isInitialized = false;
    return;
  }

  // Active consent given ("analytics" or "full")
  await initTrackingSession();
}

/**
 * Initialize tracking session if consent is active.
 */
export async function initTrackingSession(): Promise<void> {
  if (typeof window === "undefined" || isInitialized) return;

  const consent = getConsentStatus();
  if (consent === "none") return;

  let sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!sessionId) {
    sessionId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(SESSION_STORAGE_KEY, sessionId);
  }
  document.cookie = `session_id=${sessionId}; path=/; max-age=${30 * 86400}; SameSite=Lax`;

  let fpHash = localStorage.getItem(FINGERPRINT_STORAGE_KEY);
  if (!fpHash) {
    fpHash = await generateFingerprint();
    localStorage.setItem(FINGERPRINT_STORAGE_KEY, fpHash);
  }

  // Start periodic 5s flush interval
  if (!flushInterval) {
    flushInterval = setInterval(() => {
      flushEvents();
    }, 5000);
  }

  // Add page unload handler for sendBeacon
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushEvents(true);
    }
  });

  isInitialized = true;
}

/**
 * Track an event. NO-OP if consent is "none".
 */
export function trackEvent(eventName: string, metadata?: Record<string, unknown>): void {
  const consent = getConsentStatus();
  if (consent === "none") {
    // Consent NOT given: STRICT NO-OP
    return;
  }

  const eventItem: TrackedEvent = {
    eventName,
    metadata: metadata || {},
    timestamp: new Date().toISOString(),
  };

  eventBuffer.push(eventItem);

  // If auto-init hasn't completed yet, trigger background init
  if (!isInitialized) {
    initTrackingSession().catch(console.error);
  }
}

/**
 * Flush buffered events to backend /api/events
 */
export async function flushEvents(useBeacon = false): Promise<void> {
  if (typeof window === "undefined" || eventBuffer.length === 0) return;

  const consent = getConsentStatus();
  if (consent === "none") {
    eventBuffer = [];
    return;
  }

  const sessionId = localStorage.getItem(SESSION_STORAGE_KEY);
  const fpHash = localStorage.getItem(FINGERPRINT_STORAGE_KEY);
  const eventsToSend = [...eventBuffer];
  eventBuffer = [];

  const payload = {
    sessionId,
    fingerprintHash: fpHash,
    consentStatus: consent,
    events: eventsToSend,
  };

  const payloadString = JSON.stringify(payload);

  if (useBeacon && navigator.sendBeacon) {
    const blob = new Blob([payloadString], { type: "application/json" });
    navigator.sendBeacon("/api/events", blob);
    return;
  }

  try {
    const res = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payloadString,
    });
    if (!res.ok) {
      // Re-queue events if network error occurs
      eventBuffer.unshift(...eventsToSend);
    }
  } catch (err) {
    console.warn("Failed to flush event batch:", err);
    // Re-queue events on failure
    eventBuffer.unshift(...eventsToSend);
  }
}
