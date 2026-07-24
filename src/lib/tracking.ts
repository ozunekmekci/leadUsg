/**
 * Event Tracking Infrastructure Stub
 * Full consent-gated implementation will be added in CP-009.
 */
export interface EventMetadata {
  [key: string]: unknown;
}

export function trackEvent(eventName: string, metadata?: EventMetadata): void {
  const timestamp = new Date().toISOString();
  console.log(`[Event Tracking Stub] [${timestamp}] ${eventName}:`, metadata || {});
}
