export type SipResult = {
  investedAmount: number;
  estimatedReturns: number;
  totalValue: number;
};

export function validateSip(monthlyInvestment: number, annualReturnRatePct: number, timePeriodYears: number): string | null {
  if (!Number.isFinite(monthlyInvestment) || monthlyInvestment <= 0 || monthlyInvestment > 100_000_000) {
    return "Monthly investment must be greater than 0 and up to 100,000,000.";
  }
  if (!Number.isFinite(annualReturnRatePct) || annualReturnRatePct < 0 || annualReturnRatePct > 100 || !/^\d+(\.\d{1,2})?$/.test(String(annualReturnRatePct))) {
    return "Expected return rate must be from 0 to 100 with up to 2 decimals.";
  }
  if (!Number.isFinite(timePeriodYears) || timePeriodYears < 0.5 || timePeriodYears > 50 || !/^\d+(\.\d{1,2})?$/.test(String(timePeriodYears))) {
    return "Time period must be from 0.5 to 50 years.";
  }
  return null;
}

export function sip(monthlyInvestment: number, annualReturnRatePct: number, timePeriodYears: number): SipResult | { error: string } {
  const error = validateSip(monthlyInvestment, annualReturnRatePct, timePeriodYears);
  if (error) return { error };

  const totalMonths = Math.round(timePeriodYears * 12);
  const investedAmount = monthlyInvestment * totalMonths;

  if (annualReturnRatePct === 0) {
    return {
      investedAmount,
      estimatedReturns: 0,
      totalValue: investedAmount,
    };
  }

  const monthlyRate = annualReturnRatePct / 12 / 100;
  // Standard SIP future value formula: P * [((1 + i)^n - 1) / i] * (1 + i)
  const futureValue = monthlyInvestment * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
  const estimatedReturns = Math.max(0, futureValue - investedAmount);

  return {
    investedAmount,
    estimatedReturns,
    totalValue: futureValue,
  };
}
