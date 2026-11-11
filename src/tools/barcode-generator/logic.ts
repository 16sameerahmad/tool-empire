/**
 * Barcode encoding logic — pure functions, no dependencies.
 *
 * Code 39: each character is 9 elements (5 bars, 4 spaces, alternating from a
 * bar), exactly 3 of them wide. Patterns are stored as 9-bit strings where
 * 1 = wide and 0 = narrow. Start/stop character is `*`, characters are
 * separated by one narrow space. Verified against the published Code 39
 * table (e.g. A = 100001001, * = 010010100).
 *
 * EAN-13: 95 modules — start guard 101, 6 left digits (L/G parity by first
 * digit), middle guard 01010, 6 right digits (R code), end guard 101.
 * UPC-A is EAN-13 with a leading 0. Check digit: (10 - total % 10) % 10
 * where total = sum of odd-position digits + 3 × sum of even-position digits.
 */

export type BarcodeFormat = "code39" | "ean13" | "upca";

export interface BarElement {
  /** true = black bar, false = white space. */
  bar: boolean;
  /** Width in narrow units (1 = narrow, 2 = wide for Code 39; always 1 for EAN/UPC). */
  units: number;
}

export interface BarcodeResult {
  valid: boolean;
  bars?: BarElement[];
  /** Human-readable text printed under the barcode. */
  humanText?: string;
  /** Full digit string including the computed check digit (EAN-13 / UPC-A). */
  fullCode?: string;
  format?: BarcodeFormat;
  error?: string;
}

/** Code 39 patterns: 9 elements each, exactly 3 wide (1). */
export const CODE39_TABLE: Record<string, string> = {
  "0": "000110100",
  "1": "100100001",
  "2": "001100001",
  "3": "101100000",
  "4": "000110001",
  "5": "100110000",
  "6": "001110000",
  "7": "000100101",
  "8": "100100100",
  "9": "001100100",
  A: "100001001",
  B: "001001001",
  C: "101001000",
  D: "000011001",
  E: "100011000",
  F: "001011000",
  G: "000001101",
  H: "100001100",
  I: "001001100",
  J: "000011100",
  K: "100000011",
  L: "001000011",
  M: "101000010",
  N: "000010011",
  O: "100010010",
  P: "001010010",
  Q: "000000111",
  R: "100000110",
  S: "001000110",
  T: "000010110",
  U: "110000001",
  V: "011000001",
  W: "111000000",
  X: "010010001",
  Y: "110010000",
  Z: "011010000",
  "-": "010000101",
  ".": "110000100",
  " ": "011000100",
  $: "010101000",
  "/": "010100010",
  "+": "010001010",
  "%": "000101010",
  "*": "010010100",
};

const EAN_L: Record<string, string> = {
  "0": "0001101",
  "1": "0011001",
  "2": "0010011",
  "3": "0111101",
  "4": "0100011",
  "5": "0110001",
  "6": "0101111",
  "7": "0111011",
  "8": "0110111",
  "9": "0001011",
};

const EAN_G: Record<string, string> = {
  "0": "0100111",
  "1": "0110011",
  "2": "0011011",
  "3": "0100001",
  "4": "0011101",
  "5": "0111001",
  "6": "0000101",
  "7": "0010001",
  "8": "0001001",
  "9": "0010111",
};

const EAN_R: Record<string, string> = {
  "0": "1110010",
  "1": "1100110",
  "2": "1101100",
  "3": "1000010",
  "4": "1011100",
  "5": "1001110",
  "6": "1010000",
  "7": "1000100",
  "8": "1001000",
  "9": "1110100",
};

/** Left-half parity pattern by first digit: L = odd, G = even. */
const EAN_PARITY: Record<string, string> = {
  "0": "LLLLLL",
  "1": "LLGLGG",
  "2": "LLGGLG",
  "3": "LLGGGL",
  "4": "LGLLGG",
  "5": "LGGLLG",
  "6": "LGGGLL",
  "7": "LGLGLG",
  "8": "LGLGGL",
  "9": "LLGLLG",
};

function bitsToBars(bits: string, narrowOnly = false): BarElement[] {
  const bars: BarElement[] = [];
  for (let i = 0; i < bits.length; i++) {
    bars.push({ bar: i % 2 === 0, units: narrowOnly ? 1 : bits[i] === "1" ? 2 : 1 });
  }
  return bars;
}

export function encodeCode39(text: string): BarcodeResult {
  const upper = text.toUpperCase();
  if (!upper.trim()) {
    return { valid: false, error: "Enter some text to encode." };
  }
  if (upper.length > 40) {
    return { valid: false, error: "Code 39 text is limited to 40 characters." };
  }
  for (const ch of upper) {
    if (!(ch in CODE39_TABLE)) {
      return {
        valid: false,
        error: `Character "${ch}" cannot be used in Code 39. Allowed: A–Z, 0–9, space and - . $ / + %.`,
      };
    }
  }
  const framed = `*${upper}*`;
  const bars: BarElement[] = [];
  for (let i = 0; i < framed.length; i++) {
    if (i > 0) bars.push({ bar: false, units: 1 }); // inter-character narrow gap
    bars.push(...bitsToBars(CODE39_TABLE[framed[i]]));
  }
  return { valid: true, bars, humanText: upper, format: "code39" };
}

/** Check digit for the first 12 digits of an EAN-13 (or 11 of a UPC-A). */
export function eanCheckDigit(digits: string): number {
  let total = 0;
  for (let i = 0; i < digits.length; i++) {
    const d = Number(digits[i]);
    // Positions are 1-based from the left; odd positions count once, even ×3.
    total += (i + 1) % 2 === 1 ? d : d * 3;
  }
  return (10 - (total % 10)) % 10;
}

function encodeEan13Digits(full13: string): BarElement[] {
  const parity = EAN_PARITY[full13[0]];
  let bits = "101"; // start guard
  for (let i = 1; i <= 6; i++) {
    const table = parity[i - 1] === "L" ? EAN_L : EAN_G;
    bits += table[full13[i]];
  }
  bits += "01010"; // middle guard
  for (let i = 7; i <= 12; i++) {
    bits += EAN_R[full13[i]];
  }
  bits += "101"; // end guard
  // Collapse the module string into runs: "1" = bar, "0" = space, run length = width.
  const bars: BarElement[] = [];
  for (let i = 0; i < bits.length; i++) {
    const isBar = bits[i] === "1";
    const last = bars[bars.length - 1];
    if (last && last.bar === isBar) {
      last.units += 1;
    } else {
      bars.push({ bar: isBar, units: 1 });
    }
  }
  return bars;
}

export function encodeEan13(input: string): BarcodeResult {
  const digits = input.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(digits)) {
    return { valid: false, error: "EAN-13 needs digits only — 12 digits, or 13 with the check digit." };
  }
  if (digits.length !== 12 && digits.length !== 13) {
    return { valid: false, error: "EAN-13 needs 12 digits (check digit is added) or 13 digits." };
  }
  const check = eanCheckDigit(digits.slice(0, 12));
  const full = digits.length === 12 ? digits + String(check) : digits;
  if (digits.length === 13 && Number(digits[12]) !== check) {
    return {
      valid: false,
      error: `Check digit mismatch: the 13th digit should be ${check} for ${digits.slice(0, 12)}.`,
    };
  }
  return {
    valid: true,
    bars: encodeEan13Digits(full),
    humanText: full,
    fullCode: full,
    format: "ean13",
  };
}

export function encodeUpca(input: string): BarcodeResult {
  const digits = input.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(digits)) {
    return { valid: false, error: "UPC-A needs digits only — 11 digits, or 12 with the check digit." };
  }
  if (digits.length !== 11 && digits.length !== 12) {
    return { valid: false, error: "UPC-A needs 11 digits (check digit is added) or 12 digits." };
  }
  const check = eanCheckDigit("0" + digits.slice(0, 11));
  const full12 = digits.length === 11 ? digits + String(check) : digits;
  if (digits.length === 12 && Number(digits[11]) !== check) {
    return {
      valid: false,
      error: `Check digit mismatch: the 12th digit should be ${check} for ${digits.slice(0, 11)}.`,
    };
  }
  const ean = encodeEan13Digits("0" + full12);
  return {
    valid: true,
    bars: ean,
    humanText: full12,
    fullCode: full12,
    format: "upca",
  };
}

export function encodeBarcode(text: string, format: BarcodeFormat): BarcodeResult {
  if (format === "code39") return encodeCode39(text);
  if (format === "ean13") return encodeEan13(text);
  return encodeUpca(text);
}
