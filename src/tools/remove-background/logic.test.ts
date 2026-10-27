import { describe, expect, it } from "vitest";
import {
  detectCornerColor,
  getColorDistance,
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
});
