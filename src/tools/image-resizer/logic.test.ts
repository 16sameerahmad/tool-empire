import { describe, expect, it } from "vitest";
import { computeAspectRatioFit, formatFileSize } from "./logic";

describe("image resizer logic", () => {
  it("preserves aspect ratio accurately", () => {
    const fit = computeAspectRatioFit(1920, 1080, 800, 600);
    expect(fit.width).toBe(800);
    expect(fit.height).toBe(450);
  });

  it("formats file sizes cleanly", () => {
    expect(formatFileSize(500)).toBe("500 B");
    expect(formatFileSize(51200)).toBe("50.0 KB");
    expect(formatFileSize(2097152)).toBe("2.00 MB");
  });
});
