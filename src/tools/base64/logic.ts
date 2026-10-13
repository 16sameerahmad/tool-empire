function bytesToBase64(bytes: Uint8Array): string {
  if (typeof Buffer !== "undefined") return Buffer.from(bytes).toString("base64");
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  if (typeof Buffer !== "undefined") return new Uint8Array(Buffer.from(value, "base64"));
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export function encodeB64(text: string): string {
  return bytesToBase64(new TextEncoder().encode(text));
}

export function decodeB64(text: string): string | { error: string } {
  const normalized = text.replace(/\s/g, "");
  if (!normalized) return "";
  if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized) || normalized.replace(/=/g, "").length % 4 === 1) return { error: "This is not valid Base64." };
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(base64ToBytes(padded));
  } catch {
    return { error: "The decoded data is not valid text (UTF-8)." };
  }
}
