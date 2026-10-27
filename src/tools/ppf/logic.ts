export interface PpfResult {
  investedAmount: number;
  totalInterest: number;
  maturityAmount: number;
  yearlyBreakdown: Array<{
    year: number;
    openingBalance: number;
    deposit: number;
    interestEarned: number;
    closingBalance: number;
  }>;
}

export function ppf(
  yearlyDeposit: number,
  years = 15,
  interestRate = 7.1
): PpfResult | { error: string } {
  if (
    !Number.isFinite(yearlyDeposit) ||
    !Number.isFinite(years) ||
    !Number.isFinite(interestRate)
  ) {
    return { error: "Please enter valid numbers." };
  }

  if (yearlyDeposit < 500) {
    return { error: "Minimum annual PPF deposit is ₹500." };
  }

  if (yearlyDeposit > 150000) {
    return { error: "Maximum annual PPF deposit allowed under Section 80C is ₹1,50,000." };
  }

  if (years < 15 || years > 50) {
    return { error: "PPF tenure must be at least 15 years (up to 50 years with 5-year extensions)." };
  }

  if (interestRate <= 0 || interestRate > 15) {
    return { error: "Interest rate must be between 0.1% and 15%." };
  }

  const rate = interestRate / 100;
  let balance = 0;
  let totalInvested = 0;
  const breakdown: PpfResult["yearlyBreakdown"] = [];

  // PPF interest calculated annually on deposits made on or before 5th of each month / year start
  for (let y = 1; y <= years; y++) {
    const opening = balance;
    const deposit = yearlyDeposit;
    totalInvested += deposit;
    const balanceBeforeInterest = opening + deposit;
    const interest = Math.round(balanceBeforeInterest * rate);
    balance = balanceBeforeInterest + interest;

    breakdown.push({
      year: y,
      openingBalance: opening,
      deposit,
      interestEarned: interest,
      closingBalance: balance,
    });
  }

  return {
    investedAmount: totalInvested,
    totalInterest: balance - totalInvested,
    maturityAmount: balance,
    yearlyBreakdown: breakdown,
  };
}
