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
