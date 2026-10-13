export type EmiResult = { monthlyPayment: number; totalPayment: number; totalInterest: number };

export function validateEmi(principal: number, annualRatePct: number, tenureMonths: number): string | null {
  if (!Number.isFinite(principal) || principal <= 0 || principal > 1_000_000_000_000) return "Loan amount must be greater than 0 and no more than 1,000,000,000,000.";
  if (!Number.isFinite(annualRatePct) || annualRatePct < 0 || annualRatePct > 100 || !/^\d+(\.\d{1,2})?$/.test(String(annualRatePct))) return "Interest rate must be from 0 to 100 with up to 2 decimals.";
  if (!Number.isInteger(tenureMonths) || tenureMonths < 1 || tenureMonths > 600) return "Tenure must be a whole number from 1 to 600 months.";
  return null;
}

export function emi(principal: number, annualRatePct: number, tenureMonths: number): EmiResult | { error: string } {
  const error = validateEmi(principal, annualRatePct, tenureMonths);
  if (error) return { error };
  const rate = annualRatePct / 12 / 100;
  const monthlyPayment = rate === 0 ? principal / tenureMonths : principal * rate * (1 + rate) ** tenureMonths / ((1 + rate) ** tenureMonths - 1);
  const totalPayment = monthlyPayment * tenureMonths;
  return { monthlyPayment, totalPayment, totalInterest: totalPayment - principal };
}
