/**
 * Client-Side Browser Fingerprint Generator
 * Note: MUST ONLY BE INVOKED AFTER USER GIVES CONSENT ("analytics" or "full").
 */

export async function generateFingerprint(): Promise<string> {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    const components: string[] = [];

    // User Agent & Language
    components.push(navigator.userAgent || "");
    components.push(navigator.language || "");
    components.push(String(navigator.hardwareConcurrency || ""));
    components.push(String(navigator.maxTouchPoints || 0));

    // Screen info
    if (window.screen) {
      components.push(`${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`);
    }

    // Timezone
    try {
      components.push(Intl.DateTimeFormat().resolvedOptions().timeZone || "");
    } catch {
      components.push(String(new Date().getTimezoneOffset()));
    }

    // Canvas fingerprint snippet
    try {
      const canvas = document.createElement("canvas");
      canvas.width = 200;
      canvas.height = 50;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.textBaseline = "top";
        ctx.font = "14px 'Arial'";
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = "#f60";
        ctx.fillRect(125, 1, 62, 20);
        ctx.fillStyle = "#069";
        ctx.fillText("leadUsg Fingerprint", 2, 15);
        ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
        ctx.fillText("leadUsg Fingerprint", 4, 17);
        components.push(canvas.toDataURL());
      }
    } catch {
      // Canvas blocked or unsupported
    }

    const rawString = components.join("::");

    // Crypto Hash (SHA-256)
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(rawString);
      const hashBuffer = await window.crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }

    // Fallback FNV-1a 32-bit hash if crypto subtle unavailable
    let hash = 2166136261;
    for (let i = 0; i < rawString.length; i++) {
      hash ^= rawString.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    return (hash >>> 0).toString(16);
  } catch (error) {
    console.warn("Failed to generate fingerprint:", error);
    return "anonymous-fallback";
  }
}
