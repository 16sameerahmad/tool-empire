import { describe, expect, it } from "vitest";
import { calculateLumpsum } from "./logic";

describe("lumpsum calculator logic", () => {
  it("computes compound maturity correctly", () => {
    // ₹1,00,000 at 12% for 10 years -> ~₹3,10,585
    const result = calculateLumpsum({
      totalInvestment: 100000,
      annualRate: 12,
      tenureYears: 10,
    });

    expect(result.totalInvestment).toBe(100000);
    expect(result.totalValue).toBe(310585);
    expect(result.estimatedReturns).toBe(210585);
  });
});
