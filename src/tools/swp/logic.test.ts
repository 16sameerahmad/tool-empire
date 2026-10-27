import { describe, expect, it } from "vitest";
import { calculateSwp } from "./logic";

describe("swp calculator logic", () => {
  it("calculates balance correctly with positive growth", () => {
    // ₹10,00,000 invested, ₹8,000 withdrawn/month at 10% annual for 5 years
    const result = calculateSwp({
      initialInvestment: 1000000,
      monthlyWithdrawal: 8000,
      annualRate: 10,
      tenureYears: 5,
    });

    expect(result.totalInvestment).toBe(1000000);
    expect(result.totalWithdrawn).toBe(480000); // 8000 * 60
    expect(result.finalBalance).toBeGreaterThan(900000);
    expect(result.depletedMonth).toBeUndefined();
  });

  it("detects premature depletion when withdrawal rate is unsustainable", () => {
    // ₹1,00,000 invested, ₹20,000 withdrawn/month at 5% annual for 5 years
    const result = calculateSwp({
      initialInvestment: 100000,
      monthlyWithdrawal: 20000,
      annualRate: 5,
      tenureYears: 5,
    });

    expect(result.finalBalance).toBe(0);
    expect(result.depletedMonth).toBeDefined();
    expect(result.depletedMonth).toBeLessThan(10);
  });
});
