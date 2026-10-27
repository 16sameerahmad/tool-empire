import { describe, expect, it } from "vitest";
import { calculateCagr } from "./logic";

describe("cagr calculator logic", () => {
  it("calculates CAGR accurately over multi-year period", () => {
    // 1,00,000 grows to 2,00,000 in 5 years -> CAGR ~ 14.87%
    const result = calculateCagr({
      initialValue: 100000,
      finalValue: 200000,
      tenureYears: 5,
    });

    expect(result.cagrPercentage).toBe(14.87);
    expect(result.totalGrowthPercentage).toBe(100);
    expect(result.absoluteGain).toBe(100000);
  });
});
