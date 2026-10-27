export interface LumpsumInput {
  totalInvestment: number;
  annualRate: number;
  tenureYears: number;
}

export interface LumpsumResult {
  totalInvestment: number;
  estimatedReturns: number;
  totalValue: number;
}

export function calculateLumpsum(input: LumpsumInput): LumpsumResult {
  const { totalInvestment, annualRate, tenureYears } = input;

  if (totalInvestment <= 0 || tenureYears <= 0 || annualRate < 0) {
    return {
      totalInvestment: 0,
      estimatedReturns: 0,
      totalValue: 0,
    };
  }

  // A = P * (1 + r)^t
  const r = annualRate / 100;
  const totalValue = totalInvestment * Math.pow(1 + r, tenureYears);
  const estimatedReturns = Math.max(0, totalValue - totalInvestment);

  return {
    totalInvestment: Math.round(totalInvestment),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue),
  };
}
