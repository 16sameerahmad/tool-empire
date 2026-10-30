/**
 * RFC 4122 version 4 UUID generator
 * Uses native Web Crypto API for cryptographically secure pseudo-random numbers.
 */
export function generateUuidV4(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  // Fallback for environments lacking crypto.randomUUID
  const bytes = new Uint8Array(16);
  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < 16; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }
  // Set version (4) and variant (RFC 4122)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0"));
  return `${hex.slice(0, 4).join("")}-${hex.slice(4, 6).join("")}-${hex.slice(6, 8).join("")}-${hex.slice(8, 10).join("")}-${hex.slice(10, 16).join("")}`;
}

export interface UuidOptions {
  count?: number;
  uppercase?: boolean;
  hyphens?: boolean;
}

export function generateUuidBatch(options: UuidOptions = {}): string[] {
  const count = Math.min(Math.max(options.count ?? 1, 1), 100);
  const uppercase = options.uppercase ?? false;
  const hyphens = options.hyphens ?? true;

  const results: string[] = [];
  for (let i = 0; i < count; i++) {
    let id = generateUuidV4();
    if (!hyphens) {
      id = id.replace(/-/g, "");
    }
    if (uppercase) {
      id = id.toUpperCase();
    }
    results.push(id);
  }
  return results;
}
