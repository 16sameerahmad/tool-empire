/** Maximum gratuity payable: ₹20 lakh ceiling carried forward under the Code on Social Security, 2020 (Section 53; raised from ₹10 lakh by the 2018 amendment). */
export const GRATUITY_CAP = 2000000;

/** Minimum continuous service (in completed years) to qualify for gratuity. */
export const GRATUITY_MIN_YEARS = 5;

export interface GratuityInput {
  /** Last-drawn monthly salary: Basic + Dearness Allowance, in ₹. */
  basicDA: number;
  /** Completed years of service. */
  years: number;
  /** Extra months of service beyond the completed years (0–11). */
  months: number;
}

export interface GratuityResult {
  /** Completed years after the 6-month rounding rule. */
  completedYears: number;
  /** Gratuity payable, capped at ₹20 lakh. */
  gratuity: number;
  /** Uncapped amount before the ₹20 lakh ceiling. */
  uncapped: number;
  /** True when the ₹20 lakh cap reduced the payout. */
  capped: boolean;
  /** Tax-free portion (up to ₹20 lakh for private-sector employees). */
  taxFree: number;
  /** Whether the 5-year eligibility condition is met. */
  eligible: boolean;
  /** Months of service still needed to reach 5 years (0 when eligible). */
  monthsToEligibility: number;
}

/**
 * Gratuity = (15/26) × last-drawn monthly Basic+DA × completed years.
 * A month counts as 26 working days, hence 15 days' wages per year of service.
 * Service of 6 months or more in the final year counts as a full year.
 * Payout is capped at ₹20 lakh.
 */
export function calculateGratuity(
  input: GratuityInput
): GratuityResult | { error: string } {
  const { basicDA, years, months } = input;

  if (!Number.isFinite(basicDA) || basicDA <= 0 || basicDA > 10000000) {
    return { error: "Monthly Basic + DA must be between ₹1 and ₹1,00,00,000." };
  }
  if (!Number.isFinite(years) || years < 0 || years > 50) {
    return { error: "Years of service must be between 0 and 50." };
  }
  if (!Number.isFinite(months) || months < 0 || months > 11) {
    return { error: "Extra months must be between 0 and 11." };
  }

  const completedYears = years + (months >= 6 ? 1 : 0);
  const totalMonths = years * 12 + months;
  const eligible = completedYears >= GRATUITY_MIN_YEARS;
  const round2 = (n: number) => Math.round(n * 100) / 100;

  const uncapped = round2((15 / 26) * basicDA * completedYears);
  const capped = uncapped > GRATUITY_CAP;
  const gratuity = capped ? GRATUITY_CAP : uncapped;

  return {
    completedYears,
    gratuity,
    uncapped,
    capped,
    taxFree: gratuity,
    eligible,
    monthsToEligibility: eligible ? 0 : GRATUITY_MIN_YEARS * 12 - totalMonths,
  };
}
