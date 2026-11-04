import { describe, expect, it } from "vitest";
import {
  EXAM_PRESETS,
  calculateScaledDimensions,
  calculateSavingsPercent,
  formatBytes,
  estimateInitialQualityAndDimension,
} from "./logic";

describe("image compressor logic", () => {
  it("includes all primary Indian exam presets", () => {
    const ids = EXAM_PRESETS.map((p) => p.id);
    expect(ids).toContain("upsc-photo");
    expect(ids).toContain("ssc-photo");
    expect(ids).toContain("ssc-signature");
    expect(ids).toContain("neet-jee-photo");
    expect(ids).toContain("aadhaar-pan");
  });

  it("scales dimensions preserving aspect ratio within maxDimension", () => {
    const scaled = calculateScaledDimensions(2000, 1000, 800);
    expect(scaled.width).toBe(800);
    expect(scaled.height).toBe(400);

    // If already smaller, don't upscale
    const unscaled = calculateScaledDimensions(400, 300, 800);
    expect(unscaled.width).toBe(400);
    expect(unscaled.height).toBe(300);
  });

  it("handles invalid or zero dimensions safely", () => {
    expect(calculateScaledDimensions(0, 500, 800)).toEqual({ width: 0, height: 0 });
    expect(calculateScaledDimensions(500, 0, 800)).toEqual({ width: 0, height: 0 });
  });

  it("formats file bytes cleanly", () => {
    expect(formatBytes(0)).toBe("0 B");
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(20480)).toBe("20.0 KB");
    expect(formatBytes(1572864)).toBe("1.50 MB");
  });

  it("computes savings percentage correctly", () => {
    expect(calculateSavingsPercent(100000, 20000)).toBe(80);
    expect(calculateSavingsPercent(50000, 50000)).toBe(0);
    expect(calculateSavingsPercent(50000, 60000)).toBe(0);
  });

  it("estimates conservative initial quality and dimension for strict 20KB limit", () => {
    const res = estimateInitialQualityAndDimension(2000000, 20, 2400, 3200);
    expect(res.quality).toBeLessThanOrEqual(0.65);
    expect(res.maxDim).toBeLessThanOrEqual(800);
  });
});
