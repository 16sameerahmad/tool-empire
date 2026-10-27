export interface SwpInput {
  initialInvestment: number;
  monthlyWithdrawal: number;
  annualRate: number;
  tenureYears: number;
}

export interface SwpResult {
  totalInvestment: number;
  totalWithdrawn: number;
  finalBalance: number;
  totalGained: number;
  depletedMonth?: number;
}

export function calculateSwp(input: SwpInput): SwpResult {
  const { initialInvestment, monthlyWithdrawal, annualRate, tenureYears } = input;

  if (initialInvestment <= 0 || tenureYears <= 0) {
    return {
      totalInvestment: 0,
      totalWithdrawn: 0,
      finalBalance: 0,
      totalGained: 0,
    };
  }

  const monthlyRate = annualRate / 100 / 12;
  const totalMonths = Math.round(tenureYears * 12);
  let balance = initialInvestment;
  let totalWithdrawn = 0;
  let depletedMonth: number | undefined = undefined;

  for (let m = 1; m <= totalMonths; m++) {
    // Interest earned for the month on current balance
    const interest = balance * monthlyRate;
    balance += interest;

    if (balance >= monthlyWithdrawal) {
      balance -= monthlyWithdrawal;
      totalWithdrawn += monthlyWithdrawal;
    } else {
      totalWithdrawn += balance;
      balance = 0;
      depletedMonth = m;
      break;
    }
  }

  const totalGained = Math.max(0, balance + totalWithdrawn - initialInvestment);

  return {
    totalInvestment: initialInvestment,
    totalWithdrawn: Math.round(totalWithdrawn),
    finalBalance: Math.round(balance),
    totalGained: Math.round(totalGained),
    depletedMonth,
  };
}
