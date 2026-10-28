/**
 * Income Tax calculation logic for India (FY 2025-26 / AY 2026-27).
 * Implements Union Budget 2025 revised New Tax Regime slabs and
 * Old Tax Regime slabs with standard deduction and 87A rebate.
 *
 * ponytail: individual resident taxpayers only.
 * Upgrade path: add surcharge and marginal relief for >₹50L income.
 */

export interface TaxBreakdown {
  grossIncome: number;
  taxableIncome: number;
  baseTax: number;
  cess: number;
  totalTax: number;
}

export interface TaxComparison {
  oldRegime: TaxBreakdown;
  newRegime: TaxBreakdown;
  recommended: "Old" | "New";
  savings: number;
}

export function calculateNewRegimeTax(grossIncome: number): TaxBreakdown {
  const stdDeduction = 75000;
  const taxableIncome = Math.max(0, grossIncome - stdDeduction);

  // Full rebate under 87A if taxable income <= 12,00,000 (Budget 2025)
  if (taxableIncome <= 1200000) {
    return {
      grossIncome,
      taxableIncome,
      baseTax: 0,
      cess: 0,
      totalTax: 0,
    };
  }

  const slabs = [
    { upto: 400000, rate: 0 },
    { upto: 800000, rate: 0.05 },
    { upto: 1200000, rate: 0.10 },
    { upto: 1600000, rate: 0.15 },
    { upto: 2000000, rate: 0.20 },
    { upto: 2400000, rate: 0.25 },
    { upto: Infinity, rate: 0.30 },
  ];

  let tax = 0;
  let prev = 0;
  for (const s of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, s.upto) - prev;
    tax += chunk * s.rate;
    prev = s.upto;
  }

  const cess = tax * 0.04;
  return {
    grossIncome,
    taxableIncome,
    baseTax: tax,
    cess,
    totalTax: tax + cess,
  };
}

export function calculateOldRegimeTax(
  grossIncome: number,
  deductions: {
    ded80c?: number;
    ded80d?: number;
    hra?: number;
    other?: number;
  } = {},
  ageGroup: "below60" | "60to80" | "above80" = "below60"
): TaxBreakdown {
  const { ded80c = 0, ded80d = 0, hra = 0, other = 0 } = deductions;
  const capped80c = Math.min(150000, Math.max(0, ded80c));
  const stdDeduction = 50000;
  const totalDeductions = capped80c + Math.max(0, ded80d) + Math.max(0, hra) + Math.max(0, other) + stdDeduction;
  const taxableIncome = Math.max(0, grossIncome - totalDeductions);

  const exemptLimit = ageGroup === "above80" ? 500000 : ageGroup === "60to80" ? 300000 : 250000;
  if (taxableIncome <= exemptLimit) {
    return { grossIncome, taxableIncome, baseTax: 0, cess: 0, totalTax: 0 };
  }

  let slabs: { upto: number; rate: number }[];
  if (ageGroup === "above80") {
    slabs = [
      { upto: 500000, rate: 0 },
      { upto: 1000000, rate: 0.20 },
      { upto: Infinity, rate: 0.30 },
    ];
  } else if (ageGroup === "60to80") {
    slabs = [
      { upto: 300000, rate: 0 },
      { upto: 500000, rate: 0.05 },
      { upto: 1000000, rate: 0.20 },
      { upto: Infinity, rate: 0.30 },
    ];
  } else {
    slabs = [
      { upto: 250000, rate: 0 },
      { upto: 500000, rate: 0.05 },
      { upto: 1000000, rate: 0.20 },
      { upto: Infinity, rate: 0.30 },
    ];
  }

  let tax = 0;
  let prev = 0;
  for (const s of slabs) {
    if (taxableIncome <= prev) break;
    const chunk = Math.min(taxableIncome, s.upto) - prev;
    tax += chunk * s.rate;
    prev = s.upto;
  }

  // 87A rebate for old regime (taxable income <= ₹5L)
  if (ageGroup !== "above80" && taxableIncome <= 500000) {
    tax = 0;
  }

  const cess = tax * 0.04;
  return {
    grossIncome,
    taxableIncome,
    baseTax: tax,
    cess,
    totalTax: tax + cess,
  };
}

export function compareTaxRegimes(
  grossIncome: number,
  deductions: { ded80c?: number; ded80d?: number; hra?: number; other?: number } = {},
  ageGroup: "below60" | "60to80" | "above80" = "below60"
): TaxComparison {
  const oldRegime = calculateOldRegimeTax(grossIncome, deductions, ageGroup);
  const newRegime = calculateNewRegimeTax(grossIncome);

  const recommended = newRegime.totalTax <= oldRegime.totalTax ? "New" : "Old";
  const savings = Math.abs(oldRegime.totalTax - newRegime.totalTax);

  return { oldRegime, newRegime, recommended, savings };
}
