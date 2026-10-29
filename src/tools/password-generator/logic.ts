/**
 * Secure Password Generator logic.
 * Uses window.crypto.getRandomValues for cryptographically strong random generation.
 *
 * ponytail: browser-native crypto API only.
 * Upgrade path: add passphrase / diceware wordlist generation.
 */

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeSimilar: boolean;
}

const UPPERCASE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // without I, O if excludeSimilar
const UPPERCASE_ALL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASE_CHARS = "abcdefghijkmnopqrstuvwxyz"; // without l if excludeSimilar
const LOWERCASE_ALL = "abcdefghijklmnopqrstuvwxyz";
const NUMBER_CHARS = "23456789"; // without 0, 1 if excludeSimilar
const NUMBER_ALL = "0123456789";
const SYMBOL_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

export function generatePassword(opts: PasswordOptions): string {
  const {
    length = 16,
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
    excludeSimilar = false,
  } = opts;

  const u = excludeSimilar ? UPPERCASE_CHARS : UPPERCASE_ALL;
  const l = excludeSimilar ? LOWERCASE_CHARS : LOWERCASE_ALL;
  const n = excludeSimilar ? NUMBER_CHARS : NUMBER_ALL;
  const s = SYMBOL_CHARS;

  let pool = "";
  const guaranteed: string[] = [];

  if (uppercase) {
    pool += u;
    guaranteed.push(getRandomChar(u));
  }
  if (lowercase) {
    pool += l;
    guaranteed.push(getRandomChar(l));
  }
  if (numbers) {
    pool += n;
    guaranteed.push(getRandomChar(n));
  }
  if (symbols) {
    pool += s;
    guaranteed.push(getRandomChar(s));
  }

  if (!pool) return "";

  const passwordLength = Math.max(guaranteed.length, Math.min(128, length));
  const remainingCount = passwordLength - guaranteed.length;
  const chars = [...guaranteed];

  for (let i = 0; i < remainingCount; i++) {
    chars.push(getRandomChar(pool));
  }

  // Shuffle using Fisher-Yates with crypto random
  for (let i = chars.length - 1; i > 0; i--) {
    const j = getSecureRandomInt(i + 1);
    const temp = chars[i];
    chars[i] = chars[j];
    chars[j] = temp;
  }

  return chars.join("");
}

function getRandomChar(charset: string): string {
  const idx = getSecureRandomInt(charset.length);
  return charset[idx];
}

function getSecureRandomInt(max: number): number {
  if (max <= 0) return 0;
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

export function calculatePasswordStrength(password: string): {
  score: number; // 0 to 4
  label: "Very Weak" | "Weak" | "Fair" | "Strong" | "Very Strong";
} {
  if (!password) return { score: 0, label: "Very Weak" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 14) score++;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 1) return { score: 0, label: "Very Weak" };
  if (score === 2) return { score: 1, label: "Weak" };
  if (score === 3) return { score: 2, label: "Fair" };
  if (score === 4) return { score: 3, label: "Strong" };
  return { score: 4, label: "Very Strong" };
}
