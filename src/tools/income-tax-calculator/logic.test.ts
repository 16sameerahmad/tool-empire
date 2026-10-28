import { describe, it, expect } from "vitest";
import { calculateNewRegimeTax, calculateOldRegimeTax, compareTaxRegimes } from "./logic";

describe("income-tax-calculator logic", () => {
  it("applies zero tax under new regime for income <= 12L (after std deduction)", () => {
    // 12L gross - 75k std deduction = 11.25L taxable <= 12L -> 0 tax
    const res = calculateNewRegimeTax(1200000);
    expect(res.totalTax).toBe(0);
  });

  it("calculates tax correctly under new regime above 12L", () => {
    // 15L gross - 75k = 14.25L taxable
    // 0-4L: 0
    // 4-8L: 20k
    // 8-12L: 40k
    // 12-14.25L (2.25L * 15%): 33,750
    // Total base: 93,750 + 4% cess = 97,500
    const res = calculateNewRegimeTax(1500000);
    expect(res.baseTax).toBe(93750);
    expect(res.cess).toBe(3750);
    expect(res.totalTax).toBe(97500);
  });

  it("applies 87A rebate under old regime for taxable income <= 5L", () => {
    // 5.5L gross - 50k std deduction = 5L taxable -> 0 tax due to rebate
    const res = calculateOldRegimeTax(550000);
    expect(res.totalTax).toBe(0);
  });

  it("compares regimes and gives clear recommendation", () => {
    const comparison = compareTaxRegimes(1500000, { ded80c: 150000, ded80d: 25000 });
    expect(["Old", "New"]).toContain(comparison.recommended);
    expect(comparison.savings).toBeGreaterThanOrEqual(0);
  });
});
