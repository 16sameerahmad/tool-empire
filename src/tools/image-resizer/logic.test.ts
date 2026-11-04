import { describe, expect, it } from "vitest";
import { computeAspectRatioFit, formatFileSize, cmToPixels, EXAM_PHOTO_PRESETS } from "./logic";

describe("image resizer logic", () => {
  it("preserves aspect ratio accurately", () => {
    const fit = computeAspectRatioFit(1920, 1080, 800, 600);
    expect(fit.width).toBe(800);
    expect(fit.height).toBe(450);
  });

  it("calculates pixels from cm based on standard 300 DPI", () => {
    // 3.5cm at 300 DPI: (3.5 * 300) / 2.54 ~= 413px
    expect(cmToPixels(3.5, 300)).toBe(413);
    expect(cmToPixels(4.5, 300)).toBe(531);
  });

  it("contains valid exam photo presets for SSC, UPSC, and Signatures", () => {
    expect(EXAM_PHOTO_PRESETS.ssc.maxKb).toBe(50);
    expect(EXAM_PHOTO_PRESETS.upsc.widthPx).toBe(350);
    expect(EXAM_PHOTO_PRESETS.signature.heightCm).toBe(1.5);
  });

  it("formats file sizes cleanly", () => {
    expect(formatFileSize(500)).toBe("500 B");
    expect(formatFileSize(51200)).toBe("50.0 KB");
    expect(formatFileSize(2097152)).toBe("2.00 MB");
  });
});
