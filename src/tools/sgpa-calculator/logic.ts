/** 10-point grade scale used by most Indian universities (VTU / CBCS style). */
export const GRADE_POINTS: Record<string, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  P: 4,
  F: 0,
};

export const GRADE_ORDER = ["O", "A+", "A", "B+", "B", "C", "P", "F"] as const;

export interface SgpaSubject {
  credits: number;
  grade: string;
}

export interface SgpaCalculatorResult {
  sgpa: number;
  totalCredits: number;
  totalPoints: number;
  percentageStandard: number; // SGPA * 10
  percentageCbse: number; // SGPA * 9.5
}

/**
 * SGPA = Σ(credits × grade point) / Σ(credits).
 * A failed subject (F = 0 points) still counts its credits in the denominator,
 * so it pulls the SGPA down — matching how universities compute it.
 */
export function calculateSgpa(
  subjects: SgpaSubject[]
): SgpaCalculatorResult | { error: string } {
  if (!Array.isArray(subjects) || subjects.length === 0) {
    return { error: "Add at least one subject with credits and a grade." };
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (let i = 0; i < subjects.length; i++) {
    const subject = subjects[i];
    if (!Number.isFinite(subject.credits) || subject.credits <= 0 || subject.credits > 10) {
      return { error: `Subject ${i + 1} credits must be between 1 and 10.` };
    }
    const gradePoint = GRADE_POINTS[subject.grade];
    if (gradePoint === undefined) {
      return { error: `Subject ${i + 1} has an invalid grade. Use O, A+, A, B+, B, C, P, or F.` };
    }
    totalPoints += subject.credits * gradePoint;
    totalCredits += subject.credits;
  }

  if (totalCredits <= 0) {
    return { error: "Total credits must be greater than zero." };
  }

  const sgpa = Math.round((totalPoints / totalCredits) * 100) / 100;

  return {
    sgpa,
    totalCredits,
    totalPoints,
    percentageStandard: Math.round(sgpa * 10 * 100) / 100,
    percentageCbse: Math.round(sgpa * 9.5 * 100) / 100,
  };
}
