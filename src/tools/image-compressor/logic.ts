/**
 * Image compression logic with target-KB binary search.
 * Runs 100% client-side via HTML5 Canvas.
 *
 * ponytail: binary search over JPEG quality with dimension step-down.
 * Upgrade path: add WebP and AVIF output once older mobile browsers sunset.
 */

export interface ExamPreset {
  id: string;
  name: string;
  minKb: number;
  maxKb: number;
  defaultKb: number;
  description: string;
}

export const EXAM_PRESETS: ExamPreset[] = [
  {
    id: "upsc-photo",
    name: "UPSC / Civil Services Photo",
    minKb: 20,
    maxKb: 50,
    defaultKb: 40,
    description: "20KB – 50KB JPG for UPSC online application forms.",
  },
  {
    id: "ssc-photo",
    name: "SSC CGL / CHSL Photo",
    minKb: 20,
    maxKb: 50,
    defaultKb: 35,
    description: "20KB – 50KB JPG for Staff Selection Commission portals.",
  },
  {
    id: "ssc-signature",
    name: "SSC / IBPS Signature",
    minKb: 10,
    maxKb: 20,
    defaultKb: 15,
    description: "10KB – 20KB JPG for candidate signature uploads.",
  },
  {
    id: "neet-jee-photo",
    name: "NEET / JEE Photo",
    minKb: 10,
    maxKb: 200,
    defaultKb: 100,
    description: "10KB – 200KB JPG for NTA examination registration.",
  },
  {
    id: "aadhaar-pan",
    name: "Aadhaar / PAN Card Scan",
    minKb: 50,
    maxKb: 100,
    defaultKb: 90,
    description: "Under 100KB JPG for KYC verification portals.",
  },
];

export function calculateScaledDimensions(
  width: number,
  height: number,
  maxDimension: number
): { width: number; height: number } {
  if (width <= 0 || height <= 0) return { width: 0, height: 0 };
  if (width <= maxDimension && height <= maxDimension) {
    return { width, height };
  }
  const ratio = Math.min(maxDimension / width, maxDimension / height);
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: Math.max(1, Math.round(height * ratio)),
  };
}

export function formatBytes(bytes: number): string {
  if (bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function calculateSavingsPercent(originalBytes: number, newBytes: number): number {
  if (originalBytes <= 0 || newBytes >= originalBytes) return 0;
  return Math.round(((originalBytes - newBytes) / originalBytes) * 100);
}

/**
 * Suggest optimal quality (0.01 - 1.0) and maxDimension for a given target KB.
 */
export function estimateInitialQualityAndDimension(
  originalBytes: number,
  targetKb: number,
  origWidth: number,
  origHeight: number
): { quality: number; maxDim: number } {
  const targetBytes = targetKb * 1024;
  const ratio = targetBytes / Math.max(1, originalBytes);

  let maxDim = Math.max(origWidth, origHeight);
  let quality = 0.85;

  if (targetKb <= 20) {
    maxDim = Math.min(maxDim, 600);
    quality = 0.65;
  } else if (targetKb <= 50) {
    maxDim = Math.min(maxDim, 900);
    quality = 0.75;
  } else if (targetKb <= 100) {
    maxDim = Math.min(maxDim, 1400);
    quality = 0.85;
  } else if (targetKb <= 200) {
    maxDim = Math.min(maxDim, 1800);
    quality = 0.9;
  }

  if (ratio < 0.2) {
    quality = Math.min(quality, 0.55);
    maxDim = Math.min(maxDim, 800);
  }

  return { quality, maxDim };
}
