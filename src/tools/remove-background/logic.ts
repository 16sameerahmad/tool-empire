export interface ColorRgba {
  r: number;
  g: number;
  b: number;
  a: number;
}

/**
 * Calculates Euclidean color distance in 3D RGB space.
 * Max distance between (0,0,0) and (255,255,255) is ~441.67.
 */
export function getColorDistance(
  r1: number,
  g1: number,
  b1: number,
  r2: number,
  g2: number,
  b2: number
): number {
  const dr = r1 - r2;
  const dg = g1 - g2;
  const db = b1 - b2;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Converts a hex string (#ffffff or #fff) to RGB.
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "").trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  }
  return null;
}

export interface RemoveBackgroundOptions {
  targetColor: { r: number; g: number; b: number };
  tolerance: number; // 0 to 100
  feather: number; // 0 to 50
  contiguous?: boolean; // if true, only removes touching borders (flood fill)
}

/**
 * Removes target background color from ImageData in-place with tolerance and edge smoothing.
 */
export function processImageBackground(
  imageData: ImageData,
  options: RemoveBackgroundOptions
): ImageData {
  const { targetColor, tolerance, feather } = options;
  const data = imageData.data;
  const len = data.length;

  // Max Euclidean distance is ~441.67. Map tolerance (0-100) to max distance
  const threshold = (tolerance / 100) * 441.67;
  const featherRange = (feather / 100) * 150;

  for (let i = 0; i < len; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    if (a === 0) continue;

    const dist = getColorDistance(r, g, b, targetColor.r, targetColor.g, targetColor.b);

    if (dist <= threshold) {
      // Within full tolerance: 100% transparent
      data[i + 3] = 0;
    } else if (featherRange > 0 && dist < threshold + featherRange) {
      // Within feather edge zone: smooth alpha transition
      const alphaFactor = (dist - threshold) / featherRange;
      data[i + 3] = Math.round(a * Math.min(1, Math.max(0, alphaFactor)));
    }
  }

  return imageData;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const hex = Math.max(0, Math.min(255, Math.round(n))).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Auto-samples the 4 corners of an image to detect the dominant background color.
 */
export function detectCornerColor(imageData: ImageData): { r: number; g: number; b: number } {
  const { width, height, data } = imageData;
  if (width === 0 || height === 0) return { r: 255, g: 255, b: 255 };

  const samplePoints = [
    0, // top-left
    (width - 1) * 4, // top-right
    (height - 1) * width * 4, // bottom-left
    ((height - 1) * width + (width - 1)) * 4, // bottom-right
  ];

  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  let count = 0;

  for (const idx of samplePoints) {
    if (idx >= 0 && idx + 2 < data.length) {
      rSum += data[idx];
      gSum += data[idx + 1];
      bSum += data[idx + 2];
      count++;
    }
  }

  if (count === 0) return { r: 255, g: 255, b: 255 };

  return {
    r: Math.round(rSum / count),
    g: Math.round(gSum / count),
    b: Math.round(bSum / count),
  };
}

export type RemovalEngine = "ai" | "chroma";

export interface RemoveBackgroundAIProgress {
  stage: "preparing" | "downloading" | "processing" | "finishing";
  progress: number;
  message: string;
}

export interface RemoveBackgroundAIResult {
  blob: Blob;
  width: number;
  height: number;
  provider: "webgpu" | "wasm";
  durationMs: number;
}

/**
 * Runs on-device BiRefNet inference via @bg0/browser.
 * Dynamically loaded in the browser to avoid server-side bundling issues.
 */
export async function removeBackgroundAI(
  input: Blob,
  options?: {
    quality?: "fast" | "quality";
    onProgress?: (progress: RemoveBackgroundAIProgress) => void;
    signal?: AbortSignal;
  }
): Promise<RemoveBackgroundAIResult> {
  const { removeBackground } = await import("@bg0/browser");
  const result = await removeBackground(input, {
    quality: options?.quality ?? "fast",
    onProgress: options?.onProgress,
    signal: options?.signal,
  });

  return {
    blob: result.blob,
    width: result.width,
    height: result.height,
    provider: result.provider,
    durationMs: result.durationMs,
  };
}

/* ------------------------------------------------------------------ */
/* Mobile-safe processing: downscale before any heavy work.           */
/* A full-res phone photo (12MP+) fed straight into BiRefNet / a       */
/* per-pixel canvas loop blows the tab's memory and crashes the        */
/* renderer ("Aw, Snap!"). Capping the longest edge keeps peak         */
/* memory small and the UI responsive.                                 */
/* ------------------------------------------------------------------ */

/** Longest-edge cap for on-device work: 1024px on phones/low-memory, 1600px on desktop. */
export function getProcessingMaxEdge(): number {
  if (typeof navigator === "undefined") return 1600;
  const nav = navigator as Navigator & { deviceMemory?: number };
  const coarse =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;
  const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
  const fewCores =
    typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
  const mobileUA = /Android|iPhone|iPad|iPod|Mobile/i.test(nav.userAgent || "");
  return coarse || lowMem || fewCores || mobileUA ? 1024 : 1600;
}

export function isLowPowerDevice(): boolean {
  return getProcessingMaxEdge() <= 1024;
}

/** Pure: capped dimensions keeping aspect ratio (never upscales). */
export function computeDownscaleSize(
  width: number,
  height: number,
  maxEdge: number
): { width: number; height: number } {
  if (width <= 0 || height <= 0 || maxEdge <= 0) return { width: 0, height: 0 };
  const longest = Math.max(width, height);
  if (longest <= maxEdge) return { width, height };
  const scale = maxEdge / longest;
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  };
}

/**
 * Decode an image blob and downscale it to the processing cap.
 * Uses createImageBitmap with resize options (downscales during decode,
 * so a huge photo never exists at full res in memory). Falls back to
 * <img> + canvas. Returns the (possibly original) blob plus its size.
 */
export async function decodeDownscaled(
  blob: Blob,
  maxEdge: number
): Promise<{ width: number; height: number; blob: Blob }> {
  if (typeof createImageBitmap === "function") {
    try {
      const probe = await createImageBitmap(blob);
      const pw = probe.width;
      const ph = probe.height;
      probe.close();
      const target = computeDownscaleSize(pw, ph, maxEdge);
      if (target.width === pw && target.height === ph) {
        return { width: pw, height: ph, blob };
      }
      const bmp = await createImageBitmap(blob, {
        resizeWidth: target.width,
        resizeHeight: target.height,
        resizeQuality: "high",
      });
      const canvas = document.createElement("canvas");
      canvas.width = bmp.width;
      canvas.height = bmp.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        bmp.close();
        throw new Error("Canvas unavailable");
      }
      ctx.drawImage(bmp, 0, 0);
      bmp.close();
      const out = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );
      if (!out) throw new Error("Downscale failed");
      return { width: canvas.width, height: canvas.height, blob: out };
    } catch {
      // Fall through to the <img> path (e.g. SVG samples, old browsers).
    }
  }

  const url = URL.createObjectURL(blob);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("Could not decode image"));
      im.src = url;
    });
    const nw = img.naturalWidth || img.width;
    const nh = img.naturalHeight || img.height;
    const target = computeDownscaleSize(nw, nh, maxEdge);
    if (target.width === nw && target.height === nh) {
      return { width: nw, height: nh, blob };
    }
    const canvas = document.createElement("canvas");
    canvas.width = target.width;
    canvas.height = target.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, target.width, target.height);
    const out = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    if (!out) throw new Error("Downscale failed");
    return { width: target.width, height: target.height, blob: out };
  } finally {
    URL.revokeObjectURL(url);
  }
}
