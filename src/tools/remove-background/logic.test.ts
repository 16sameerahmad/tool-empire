import { describe, expect, it } from "vitest";
import {
  computeDownscaleSize,
  detectCornerColor,
  getColorDistance,
  getProcessingMaxEdge,
  hexToRgb,
  processImageBackground,
  rgbToHex,
} from "./logic";

describe("remove-background logic", () => {
  it("calculates color distance correctly", () => {
    expect(getColorDistance(255, 255, 255, 255, 255, 255)).toBe(0);
    expect(getColorDistance(0, 0, 0, 255, 255, 255)).toBeCloseTo(441.67, 1);
  });

  it("converts hex to rgb accurately", () => {
    expect(hexToRgb("#ffffff")).toEqual({ r: 255, g: 255, b: 255 });
    expect(hexToRgb("#000")).toEqual({ r: 0, g: 0, b: 0 });
    expect(hexToRgb("invalid")).toBeNull();
  });

  it("removes target color within tolerance and keeps foreground intact", () => {
    // 2x1 image: pixel 1 is white (background), pixel 2 is pure black (subject)
    const raw = new Uint8ClampedArray([
      255, 255, 255, 255, // white
      0, 0, 0, 255, // black
    ]);
    const mockImageData = {
      width: 2,
      height: 1,
      data: raw,
    } as unknown as ImageData;

    const result = processImageBackground(mockImageData, {
      targetColor: { r: 255, g: 255, b: 255 },
      tolerance: 15,
      feather: 0,
    });

    // First pixel (white) should have alpha = 0 (transparent)
    expect(result.data[3]).toBe(0);

    // Second pixel (black) should remain opaque (alpha = 255)
    expect(result.data[7]).toBe(255);
  });

  it("detects corner color properly", () => {
    // 2x2 image: all 4 corners are green (0, 255, 0)
    const raw = new Uint8ClampedArray([
      0, 255, 0, 255,
      0, 255, 0, 255,
      0, 255, 0, 255,
      0, 255, 0, 255,
    ]);
    const mockImageData = {
      width: 2,
      height: 2,
      data: raw,
    } as unknown as ImageData;

    const detected = detectCornerColor(mockImageData);
    expect(detected).toEqual({ r: 0, g: 255, b: 0 });
  });

  it("exports rgbToHex correctly", () => {
    expect(rgbToHex(255, 255, 255)).toBe("#ffffff");
    expect(rgbToHex(0, 0, 0)).toBe("#000000");
  });

  it("keeps small images unchanged and caps the longest edge", () => {
    // 4000x3000 phone photo capped at 1024px keeps its 4:3 ratio
    expect(computeDownscaleSize(4000, 3000, 1024)).toEqual({
      width: 1024,
      height: 768,
    });
    // Portrait photo: height is the longest edge
    expect(computeDownscaleSize(3000, 4000, 1024)).toEqual({
      width: 768,
      height: 1024,
    });
    // Already under the cap: untouched (no upscale)
    expect(computeDownscaleSize(800, 600, 1024)).toEqual({
      width: 800,
      height: 600,
    });
    expect(computeDownscaleSize(0, 0, 1024)).toEqual({ width: 0, height: 0 });
  });

  it("returns a valid processing cap without a browser navigator", () => {
    // Node's navigator (if present) carries no mobile signals; the cap must
    // always be one of the two known values, never arbitrary.
    expect([1024, 1600]).toContain(getProcessingMaxEdge());
  });
});
