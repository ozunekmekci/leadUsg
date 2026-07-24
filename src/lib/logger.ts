/**
 * Structured Logger with PII Masking
 * Ensures IP addresses, fingerprint hashes, and personal info are never logged in raw form.
 */

import crypto from "crypto";

export function maskPII(value?: string | null): string {
  if (!value) return "none";
  if (value.length <= 8) return "***";
  // Hash the value using SHA-256 and truncate for safe logging
  return crypto.createHash("sha256").update(value).digest("hex").substring(0, 12);
}

export function maskIP(ip?: string | null): string {
  if (!ip) return "0.0.0.0";
  // If IPv4, mask last octet: 192.168.1.xxx -> 192.168.1.***
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.***`;
    }
  }
  // IPv6 or unparseable: return hash prefix
  return maskPII(ip);
}

export const logger = {
  info: (message: string, context?: Record<string, unknown>) => {
    console.log(JSON.stringify({
      level: "info",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? sanitizeContext(context) : {}),
    }));
  },
  warn: (message: string, context?: Record<string, unknown>) => {
    console.warn(JSON.stringify({
      level: "warn",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? sanitizeContext(context) : {}),
    }));
  },
  error: (message: string, context?: Record<string, unknown>) => {
    console.error(JSON.stringify({
      level: "error",
      timestamp: new Date().toISOString(),
      message,
      ...(context ? sanitizeContext(context) : {}),
    }));
  },
};

function sanitizeContext(ctx: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(ctx)) {
    if (key.toLowerCase().includes("ip")) {
      sanitized[key] = typeof val === "string" ? maskIP(val) : "masked";
    } else if (key.toLowerCase().includes("fingerprint") || key.toLowerCase().includes("phone") || key.toLowerCase().includes("email")) {
      sanitized[key] = typeof val === "string" ? maskPII(val) : "masked";
    } else {
      sanitized[key] = val;
    }
  }
  return sanitized;
}
