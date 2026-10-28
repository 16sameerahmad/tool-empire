/**
 * QR Code configuration and format helpers.
 *
 * ponytail: basic color and sizing.
 * Upgrade path: add center logo embedding via canvas drawImage when requested.
 */

export interface QrOptions {
  text: string;
  size: number;
  fgColor: string;
  bgColor: string;
  errorCorrection: "L" | "M" | "Q" | "H";
}

export function validateQrText(text: string): { valid: boolean; error?: string } {
  if (!text || !text.trim()) {
    return { valid: false, error: "Text or URL cannot be empty." };
  }
  if (text.length > 2000) {
    return { valid: false, error: "Text exceeds 2000 characters limit." };
  }
  return { valid: true };
}

export function sanitizeHexColor(hex: string, fallback: string): string {
  const match = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(hex);
  return match ? hex : fallback;
}
