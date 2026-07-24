import crypto from "crypto";

const JWT_SECRET = process.env.SESSION_SECRET || "default_super_secret_leadusg_am_key_2026";
export const AM_COOKIE_NAME = "am_session";

export interface AdminSessionPayload {
  sub: string;
  email: string;
  name: string;
  iat: number;
  exp: number;
}

// 1. Password Hashing with Scrypt
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, originalHash] = storedHash.split(":");
  if (!salt || !originalHash) return false;
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(originalHash, "hex"));
}

// 2. Clean Base64URL Helpers for Web Crypto JWT
function bufferToBase64Url(buf: ArrayBuffer | Buffer | string): string {
  return Buffer.from(buf as unknown as WithImplicitCoercion<string>)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlToBuffer(str: string): Buffer {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64");
}

// 3. JWT Token Creation & Verification using Web Crypto (Middleware Safe)
export async function createAdminToken(payload: Omit<AdminSessionPayload, "iat" | "exp">): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload: AdminSessionPayload = {
    ...payload,
    iat: now,
    exp: now + 7 * 24 * 60 * 60, // 7 days expiration
  };

  const encodedHeader = bufferToBase64Url(JSON.stringify(header));
  const encodedPayload = bufferToBase64Url(JSON.stringify(fullPayload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signatureBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(dataToSign));
  const signatureBase64 = bufferToBase64Url(signatureBuffer);

  return `${dataToSign}.${signatureBase64}`;
}

export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, signature] = parts;
    const dataToVerify = `${encodedHeader}.${encodedPayload}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const signatureBytes = base64UrlToBuffer(signature);

    const isValid = await crypto.subtle.verify("HMAC", key, signatureBytes, encoder.encode(dataToVerify));
    if (!isValid) return null;

    const payloadString = base64UrlToBuffer(encodedPayload).toString("utf-8");
    const payload: AdminSessionPayload = JSON.parse(payloadString);
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) return null;

    return payload;
  } catch {
    return null;
  }
}
