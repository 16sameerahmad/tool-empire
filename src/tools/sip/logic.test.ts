import { describe, expect, it } from "vitest";
import { sip } from "./logic";

describe("sip logic", () => {
  it("calculates standard 5000/month at 12% for 10 years", () => {
    // 5000 * 120 = 600,000 invested.
    // Future value ~ 1,161,695
    const res = sip(5000, 12, 10);
    expect(res).not.toHaveProperty("error");
    if (!("error" in res)) {
      expect(res.investedAmount).toBe(600000);
      expect(res.totalValue).toBeCloseTo(1161695.38, 1);
      expect(res.estimatedReturns).toBeCloseTo(561695.38, 1);
    }
  });

  it("handles 0% return rate cleanly", () => {
    const res = sip(10000, 0, 5);
    expect(res).toEqual({
      investedAmount: 600000,
      estimatedReturns: 0,
      totalValue: 600000,
    });
  });

  it("validates boundary conditions and invalid inputs", () => {
    expect(sip(0, 12, 5)).toEqual({ error: expect.stringContaining("Monthly investment") });
    expect(sip(5000, -5, 5)).toEqual({ error: expect.stringContaining("Expected return rate") });
    expect(sip(5000, 12, 60)).toEqual({ error: expect.stringContaining("Time period") });
  });
});
