import { describe, it, expect } from "vitest";
import { ppf } from "./logic";

describe("PPF Calculator Logic", () => {
  it("calculates 15 year standard 1.5 lakh deposit correctly", () => {
    const res = ppf(150000, 15, 7.1);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.investedAmount).toBe(2250000); // 1.5L * 15 = 22.5L
      expect(res.maturityAmount).toBeGreaterThan(4000000); // ~40.68L at 7.1%
      expect(res.totalInterest).toBe(res.maturityAmount - res.investedAmount);
      expect(res.yearlyBreakdown).toHaveLength(15);
    }
  });

  it("rejects deposits exceeding 1.5L limit or below 500", () => {
    expect("error" in ppf(200000, 15)).toBe(true);
    expect("error" in ppf(200, 15)).toBe(true);
    expect("error" in ppf(50000, 10)).toBe(true); // tenure under 15
  });
});
