export interface SgpaInput {
  semesters: Array<{ sgpa: number; credits?: number }>;
}

export interface SgpaResult {
  cgpa: number;
  totalCredits: number;
  percentageCbse: number; // CGPA * 9.5
  percentageStandard: number; // CGPA * 10
}

export function sgpaToCgpa(
  semesters: Array<{ sgpa: number; credits?: number }>
): SgpaResult | { error: string } {
  if (!Array.isArray(semesters) || semesters.length === 0) {
    return { error: "Please provide at least one semester SGPA." };
  }

  let totalCreditWeightedSgpa = 0;
  let totalCredits = 0;
  let simpleSgpaSum = 0;
  let hasCredits = false;

  for (let i = 0; i < semesters.length; i++) {
    const sem = semesters[i];
    if (!Number.isFinite(sem.sgpa) || sem.sgpa < 0 || sem.sgpa > 10) {
      return { error: `Semester ${i + 1} SGPA must be between 0 and 10.` };
    }

    if (sem.credits !== undefined && sem.credits !== null && Number.isFinite(sem.credits)) {
      if (sem.credits < 0 || sem.credits > 50) {
        return { error: `Semester ${i + 1} credits must be between 0 and 50.` };
      }
      hasCredits = true;
      totalCreditWeightedSgpa += sem.sgpa * sem.credits;
      totalCredits += sem.credits;
    }

    simpleSgpaSum += sem.sgpa;
  }

  let cgpa = 0;
  if (hasCredits && totalCredits > 0) {
    cgpa = totalCreditWeightedSgpa / totalCredits;
  } else {
    cgpa = simpleSgpaSum / semesters.length;
  }

  cgpa = Math.round(cgpa * 100) / 100;

  return {
    cgpa,
    totalCredits: hasCredits ? totalCredits : semesters.length,
    percentageCbse: Math.round(cgpa * 9.5 * 100) / 100,
    percentageStandard: Math.round(cgpa * 10 * 100) / 100,
  };
}
