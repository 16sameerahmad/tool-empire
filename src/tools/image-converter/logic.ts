export type ImageFormat = "jpeg" | "png" | "webp";

export interface ConvertOptions {
  format: ImageFormat;
  quality?: number; // 0.1 to 1.0 (default 0.92 for jpeg/webp)
  backgroundColor?: string; // Default "#ffffff" for transparency flattening to JPEG
}

export interface ConvertedImageResult {
  blob: Blob;
  width: number;
  height: number;
  originalSize: number;
  convertedSize: number;
  outputFormat: ImageFormat;
}

/**
 * Parse page range string (e.g. "1-3, 5, 8-10") into 1-based unique sorted page numbers.
 */
export function parsePageRanges(rangeStr: string, totalPages: number): number[] {
  if (!rangeStr.trim()) {
    // If empty, return all pages
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages = new Set<number>();
  const parts = rangeStr.split(",").map((p) => p.trim()).filter(Boolean);

  for (const part of parts) {
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-").map((s) => s.trim());
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      if (!isNaN(start) && !isNaN(end) && start <= end) {
        for (let i = Math.max(1, start); i <= Math.min(totalPages, end); i++) {
          pages.add(i);
        }
      }
    } else {
      const p = parseInt(part, 10);
      if (!isNaN(p) && p >= 1 && p <= totalPages) {
        pages.add(p);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * Convert an image file or DataURL to another format (PNG, JPEG, WebP) using Canvas.
 */
export async function convertImage(
  source: File | Blob | HTMLImageElement | string,
  options: ConvertOptions
): Promise<ConvertedImageResult> {
  const { format, quality = 0.92, backgroundColor = "#ffffff" } = options;

  let img: HTMLImageElement;
  let originalSize = 0;

  if (source instanceof HTMLImageElement) {
    img = source;
  } else {
    img = new Image();
    let url: string;
    if (typeof source === "string") {
      url = source;
    } else {
      originalSize = source.size;
      url = URL.createObjectURL(source);
    }

    await new Promise<void>((resolve, reject) => {
      img.onload = () => {
        if (typeof source !== "string") URL.revokeObjectURL(url);
        resolve();
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = url;
    });
  }

  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not acquire canvas context");

  // If converting to JPEG, fill background with white first to avoid black transparency
  if (format === "jpeg") {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, 0, 0, width, height);

  const mimeType = format === "jpeg" ? "image/jpeg" : format === "png" ? "image/png" : "image/webp";

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error("Canvas conversion produced null blob"));
      },
      mimeType,
      format === "png" ? undefined : quality
    );
  });

  return {
    blob,
    width,
    height,
    originalSize,
    convertedSize: blob.size,
    outputFormat: format,
  };
}

/**
 * Convert HEIC / HEIF file to JPEG or PNG directly in browser using heic2any.
 */
export async function convertHeic(
  file: File | Blob,
  options: { format?: "jpeg" | "png"; quality?: number } = {}
): Promise<Blob> {
  const { format = "jpeg", quality = 0.9 } = options;

  if (typeof window === "undefined") {
    throw new Error("HEIC conversion requires browser environment");
  }

  // Load heic2any from cdnjs if not already present
  if (!(window as unknown as { heic2any?: unknown }).heic2any) {
    await new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/heic2any/0.0.4/heic2any.min.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load HEIC converter engine"));
      document.head.appendChild(script);
    });
  }

  const heic2any = (window as unknown as {
    heic2any: (opts: { blob: Blob; toType: string; quality?: number }) => Promise<Blob | Blob[]>;
  }).heic2any;

  const toType = format === "png" ? "image/png" : "image/jpeg";
  const result = await heic2any({
    blob: file,
    toType,
    quality: format === "png" ? undefined : quality,
  });

  return Array.isArray(result) ? result[0] : result;
}
