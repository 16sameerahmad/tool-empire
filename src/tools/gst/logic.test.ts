import { describe, expect, it } from "vitest";
import { calculateGst } from "./logic";

describe("GST Calculator logic", () => {
  it("calculates 18% GST exclusive on ₹10,000", () => {
    const res = calculateGst({
      amount: 10000,
      rate: 18,
      type: "exclusive",
    });
    expect(res.netAmount).toBe(10000);
    expect(res.gstAmount).toBe(1800);
    expect(res.cgst).toBe(900);
    expect(res.sgst).toBe(900);
    expect(res.totalAmount).toBe(11800);
  });

  it("calculates 18% GST inclusive on ₹11,800", () => {
    const res = calculateGst({
      amount: 11800,
      rate: 18,
      type: "inclusive",
    });
    expect(res.netAmount).toBe(10000);
    expect(res.gstAmount).toBe(1800);
    expect(res.cgst).toBe(900);
    expect(res.sgst).toBe(900);
    expect(res.totalAmount).toBe(11800);
  });

  it("handles 0 amount or rate gracefully", () => {
    const res = calculateGst({
      amount: 0,
      rate: 12,
      type: "exclusive",
    });
    expect(res.gstAmount).toBe(0);
    expect(res.totalAmount).toBe(0);
  });
});
