import { describe, it, expect } from "vitest";
import { calculateGratuity } from "./logic";

describe("Gratuity Calculator Logic", () => {
  it("calculates gratuity with the 6-month rounding rule (worked example)", () => {
    // ₹60,000 Basic+DA, 12y 8m -> 8m >= 6 so 13 completed years.
    // (15/26) * 60000 * 13 = 450000 exactly.
    const res = calculateGratuity({ basicDA: 60000, years: 12, months: 8 });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.completedYears).toBe(13);
      expect(res.gratuity).toBe(450000);
      expect(res.uncapped).toBe(450000);
      expect(res.capped).toBe(false);
      expect(res.eligible).toBe(true);
    }
  });

  it("does not round up when extra months are under 6", () => {
    // ₹45,000, 5y 4m -> 5 completed years.
    // (15/26) * 45000 * 5 = 129807.69
    const res = calculateGratuity({ basicDA: 45000, years: 5, months: 4 });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.completedYears).toBe(5);
      expect(res.gratuity).toBe(129807.69);
      expect(res.eligible).toBe(true);
    }
  });

  it("caps the payout at ₹20 lakh", () => {
    // ₹1,50,000, 30y -> (15/26) * 150000 * 30 = 2596153.85 -> capped.
    const res = calculateGratuity({ basicDA: 150000, years: 30, months: 0 });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.uncapped).toBe(2596153.85);
      expect(res.gratuity).toBe(2000000);
      expect(res.capped).toBe(true);
      expect(res.taxFree).toBe(2000000);
    }
  });

  it("rounds 4y 11m up to 5 eligible years", () => {
    // (15/26) * 50000 * 5 = 144230.77
    const res = calculateGratuity({ basicDA: 50000, years: 4, months: 11 });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.completedYears).toBe(5);
      expect(res.eligible).toBe(true);
      expect(res.gratuity).toBe(144230.77);
    }
  });

  it("reports ineligibility with months remaining", () => {
    const res = calculateGratuity({ basicDA: 50000, years: 4, months: 5 });
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.completedYears).toBe(4);
      expect(res.eligible).toBe(false);
      expect(res.monthsToEligibility).toBe(7); // 60 - 53 months
    }
  });

  it("rejects invalid inputs", () => {
    expect("error" in calculateGratuity({ basicDA: 0, years: 5, months: 0 })).toBe(true);
    expect("error" in calculateGratuity({ basicDA: 50000, years: -1, months: 0 })).toBe(true);
    expect("error" in calculateGratuity({ basicDA: 50000, years: 5, months: 12 })).toBe(true);
    expect("error" in calculateGratuity({ basicDA: 50000, years: 51, months: 0 })).toBe(true);
  });
});
