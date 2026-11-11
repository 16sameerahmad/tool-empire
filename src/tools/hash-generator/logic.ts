export type HashAlgorithm = "MD5" | "SHA-1" | "SHA-256" | "SHA-512";

export const HASH_ALGORITHMS: HashAlgorithm[] = ["MD5", "SHA-1", "SHA-256", "SHA-512"];

/** Output length of each algorithm, in hex characters. */
export const HASH_HEX_LENGTH: Record<HashAlgorithm, number> = {
  MD5: 32,
  "SHA-1": 40,
  "SHA-256": 64,
  "SHA-512": 128,
};

function bytesToHex(bytes: Uint8Array): string {
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, "0");
  }
  return hex;
}

/**
 * Pure-JavaScript MD5 (RFC 1321) over raw bytes.
 * Web Crypto has no MD5, so this covers it. K constants are derived from
 * Math.sin exactly as the RFC specifies: K[i] = floor(2^32 × |sin(i+1)|).
 */
export function md5Bytes(input: Uint8Array): string {
  const s = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];
  const K = new Uint32Array(64);
  for (let i = 0; i < 64; i++) {
    K[i] = Math.floor(Math.abs(Math.sin(i + 1)) * 0x100000000) >>> 0;
  }

  const rotl = (x: number, c: number) => ((x << c) | (x >>> (32 - c))) >>> 0;
  const add = (...nums: number[]) => {
    let sum = 0;
    for (const n of nums) sum = (sum + (n >>> 0)) >>> 0;
    return sum >>> 0;
  };

  // Padding: 0x80, zeros until length ≡ 56 (mod 64), then 8-byte LE bit length.
  const bitLen = input.length * 8;
  const paddedLen = (((input.length + 9 + 63) >> 6) << 6);
  const padded = new Uint8Array(paddedLen);
  padded.set(input);
  padded[input.length] = 0x80;
  const view = new DataView(padded.buffer);
  view.setUint32(paddedLen - 8, bitLen >>> 0, true);
  view.setUint32(paddedLen - 4, Math.floor(bitLen / 0x100000000) >>> 0, true);

  let a0 = 0x67452301;
  let b0 = 0xefcdab89;
  let c0 = 0x98badcfe;
  let d0 = 0x10325476;

  const M = new Uint32Array(16);
  for (let offset = 0; offset < paddedLen; offset += 64) {
    for (let j = 0; j < 16; j++) {
      M[j] = view.getUint32(offset + j * 4, true);
    }
    let A = a0;
    let B = b0;
    let C = c0;
    let D = d0;
    for (let i = 0; i < 64; i++) {
      let F: number;
      let g: number;
      if (i < 16) {
        F = (B & C) | (~B & D);
        g = i;
      } else if (i < 32) {
        F = (D & B) | (~D & C);
        g = (5 * i + 1) % 16;
      } else if (i < 48) {
        F = B ^ C ^ D;
        g = (3 * i + 5) % 16;
      } else {
        F = C ^ (B | ~D);
        g = (7 * i) % 16;
      }
      F = add(F, A, K[i], M[g]);
      A = D;
      D = C;
      C = B;
      B = add(B, rotl(F, s[i]));
    }
    a0 = add(a0, A);
    b0 = add(b0, B);
    c0 = add(c0, C);
    d0 = add(d0, D);
  }

  const out = new Uint8Array(16);
  const outView = new DataView(out.buffer);
  outView.setUint32(0, a0, true);
  outView.setUint32(4, b0, true);
  outView.setUint32(8, c0, true);
  outView.setUint32(12, d0, true);
  return bytesToHex(out);
}

/** Hash raw bytes with any supported algorithm. */
export async function hashBytes(data: Uint8Array, algorithm: HashAlgorithm): Promise<string> {
  if (algorithm === "MD5") {
    return md5Bytes(data);
  }
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) {
    throw new Error(`${algorithm} needs a secure context (HTTPS or localhost) — your browser does not provide Web Crypto here.`);
  }
  const digest = await subtle.digest(algorithm, data as BufferSource);
  return bytesToHex(new Uint8Array(digest));
}

/** Hash UTF-8 text with any supported algorithm. */
export async function hashText(text: string, algorithm: HashAlgorithm): Promise<string> {
  return hashBytes(new TextEncoder().encode(text), algorithm);
}

/** Hash the same input with every algorithm at once. */
export async function hashAll(
  data: Uint8Array
): Promise<Record<HashAlgorithm, string>> {
  const entries = await Promise.all(
    HASH_ALGORITHMS.map(async (algorithm) => [algorithm, await hashBytes(data, algorithm)] as const)
  );
  return Object.fromEntries(entries) as Record<HashAlgorithm, string>;
}
