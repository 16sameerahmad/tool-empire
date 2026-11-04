export interface ImageResizeDimensions {
  originalWidth: number;
  originalHeight: number;
  targetWidth: number;
  targetHeight: number;
}

export interface ExamPhotoPreset {
  name: string;
  widthCm: number;
  heightCm: number;
  widthPx: number;
  heightPx: number;
  maxKb: number;
  description: string;
}

export const EXAM_PHOTO_PRESETS: Record<string, ExamPhotoPreset> = {
  ssc: {
    name: "SSC CGL / CHSL Photo",
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 450,
    maxKb: 50,
    description: "3.5cm x 4.5cm, 20KB to 50KB",
  },
  upsc: {
    name: "UPSC Civil Services Photo",
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 350,
    heightPx: 350,
    maxKb: 100,
    description: "350x350 px, 20KB to 100KB",
  },
  ibps: {
    name: "IBPS PO / Clerk Photo",
    widthCm: 4.5,
    heightCm: 3.5,
    widthPx: 450,
    heightPx: 350,
    maxKb: 50,
    description: "4.5cm x 3.5cm, 20KB to 50KB",
  },
  nta: {
    name: "NTA NEET / JEE Photo",
    widthCm: 3.5,
    heightCm: 4.5,
    widthPx: 400,
    heightPx: 500,
    maxKb: 200,
    description: "Passport size with 80% face coverage",
  },
  signature: {
    name: "Govt Exam Signature (Standard)",
    widthCm: 3.5,
    heightCm: 1.5,
    widthPx: 350,
    heightPx: 150,
    maxKb: 20,
    description: "3.5cm x 1.5cm, 10KB to 20KB",
  },
};

export function cmToPixels(cm: number, dpi: number = 300): number {
  return Math.round((cm * dpi) / 2.54);
}

export function computeAspectRatioFit(
  srcWidth: number,
  srcHeight: number,
  maxWidth: number,
  maxHeight: number
): { width: number; height: number } {
  if (srcWidth <= 0 || srcHeight <= 0) return { width: 0, height: 0 };
  const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight, 1);
  return {
    width: Math.round(srcWidth * ratio),
    height: Math.round(srcHeight * ratio),
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
