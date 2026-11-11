import { describe, it, expect } from "vitest";
import { CODE39_TABLE, eanCheckDigit, encodeBarcode, encodeCode39, encodeEan13, encodeUpca } from "./logic";

describe("Barcode Generator Logic", () => {
  it("every Code 39 pattern is 9 elements with exactly 3 wide", () => {
    for (const [ch, pattern] of Object.entries(CODE39_TABLE)) {
      expect(pattern.length, `pattern for ${ch}`).toBe(9);
      const wide = pattern.split("").filter((b) => b === "1").length;
      expect(wide, `wide elements for ${ch}`).toBe(3);
    }
  });

  it("encodes Code 39 with * start/stop and narrow inter-character gaps", () => {
    const r = encodeCode39("A");
    expect(r.valid).toBe(true);
    expect(r.humanText).toBe("A");
    // * + A + * = 3 chars × 9 elements + 2 gaps = 29 elements.
    expect(r.bars?.length).toBe(29);
    // First element is a narrow bar (start * begins 0 = narrow bar).
    expect(r.bars?.[0]).toEqual({ bar: true, units: 1 });
    // The gap between * and A is a narrow space at index 9.
    expect(r.bars?.[9]).toEqual({ bar: false, units: 1 });
    // Total width in narrow units: each char = 6 narrow + 3 wide(2) = 12, ×3 chars + 2 gaps = 38.
    const total = r.bars?.reduce((sum, b) => sum + b.units, 0);
    expect(total).toBe(38);
  });

  it("rejects Code 39 characters outside the charset", () => {
    expect(encodeCode39("hello@world").valid).toBe(false);
    expect(encodeCode39("").valid).toBe(false);
    expect(encodeCode39("a".repeat(41)).valid).toBe(false);
    // Lowercase is uppercased automatically.
    expect(encodeCode39("abc-123").valid).toBe(true);
  });

  it("computes the EAN-13 check digit (verified: 590123412345 → 7)", () => {
    expect(eanCheckDigit("590123412345")).toBe(7);
    expect(eanCheckDigit("400638133393")).toBe(1);
  });

  it("encodes EAN-13 as 95 modules with guards in place", () => {
    const r = encodeEan13("590123412345");
    expect(r.valid).toBe(true);
    expect(r.fullCode).toBe("5901234123457");
    // Sum of bar/space widths must equal 95 modules.
    const total = r.bars?.reduce((sum, b) => sum + b.units, 0);
    expect(total).toBe(95);
    // Start guard 101: narrow bar, narrow space, narrow bar.
    expect(r.bars?.slice(0, 3)).toEqual([
      { bar: true, units: 1 },
      { bar: false, units: 1 },
      { bar: true, units: 1 },
    ]);
  });

  it("rejects a wrong EAN-13 check digit and non-digits", () => {
    expect(encodeEan13("5901234123458").valid).toBe(false);
    expect(encodeEan13("59012341234").valid).toBe(false);
    expect(encodeEan13("59012341234A").valid).toBe(false);
  });

  it("encodes UPC-A via EAN-13 with a leading zero (verified: 03600029145 → 2)", () => {
    const r = encodeUpca("03600029145");
    expect(r.valid).toBe(true);
    expect(r.fullCode).toBe("036000291452");
    const total = r.bars?.reduce((sum, b) => sum + b.units, 0);
    expect(total).toBe(95);
    expect(encodeUpca("036000291453").valid).toBe(false);
  });

  it("encodeBarcode dispatches by format", () => {
    expect(encodeBarcode("HELLO", "code39").format).toBe("code39");
    expect(encodeBarcode("590123412345", "ean13").format).toBe("ean13");
    expect(encodeBarcode("03600029145", "upca").format).toBe("upca");
  });
});
