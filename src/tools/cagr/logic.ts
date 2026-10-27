export interface CagrInput {
  initialValue: number;
  finalValue: number;
  tenureYears: number;
}

export interface CagrResult {
  cagrPercentage: number;
  totalGrowthPercentage: number;
  absoluteGain: number;
}

export function calculateCagr(input: CagrInput): CagrResult {
  const { initialValue, finalValue, tenureYears } = input;

  if (initialValue <= 0 || finalValue <= 0 || tenureYears <= 0) {
    return {
      cagrPercentage: 0,
      totalGrowthPercentage: 0,
      absoluteGain: 0,
    };
  }

  // CAGR = ( (final / initial) ^ (1 / years) - 1 ) * 100
  const cagr = (Math.pow(finalValue / initialValue, 1 / tenureYears) - 1) * 100;
  const totalGrowth = ((finalValue - initialValue) / initialValue) * 100;
  const absoluteGain = finalValue - initialValue;

  return {
    cagrPercentage: Number(cagr.toFixed(2)),
    totalGrowthPercentage: Number(totalGrowth.toFixed(2)),
    absoluteGain: Math.round(absoluteGain),
  };
}
