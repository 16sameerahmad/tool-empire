export interface AttendanceInput {
  attended: number;
  total: number;
  targetPercentage?: number; // defaults to 75
}

export interface AttendanceResult {
  currentPercentage: number;
  status: "safe" | "shortage" | "target_reached";
  classesToAttend: number; // if shortage: how many consecutive classes to attend to reach target
  classesCanBunk: number; // if safe: how many consecutive classes can be missed without falling below target
  targetPercentage: number;
  totalClassesAtTarget: number;
}

export interface AttendanceProjection {
  remaining: number;
  termTotal: number;
  targetPercentage: number;
  bestPossiblePercentage: number; // (attended + remaining) / (total + remaining) * 100
  classesMustAttend: number; // of the remaining classes, how many must be attended to finish at/above target
  classesCanMiss: number; // remaining - classesMustAttend when reachable, else 0
  reachable: boolean; // bestPossiblePercentage >= target
}

/**
 * Term-end projection: given the classes still left this term, how many of
 * them must be attended (and how many can be missed) to finish at or above
 * the target? The requirement is measured against the whole term:
 * required attended by term end = ceil(target * (total + remaining)).
 * The two counts always sum to `remaining`, which makes them easy to
 * sanity-check. If even attending every remaining class falls short, the
 * target is mathematically out of reach this term.
 */
export function attendanceProjection(
  attended: number,
  total: number,
  remaining: number,
  targetPercentage = 75
): AttendanceProjection | { error: string } {
  if (
    !Number.isFinite(attended) ||
    !Number.isFinite(total) ||
    !Number.isFinite(remaining) ||
    !Number.isFinite(targetPercentage)
  ) {
    return { error: "Please enter valid numbers." };
  }

  if (total <= 0) {
    return { error: "Total classes held must be greater than zero." };
  }

  if (attended < 0 || attended > total) {
    return { error: "Attended classes must be between 0 and total classes held." };
  }

  if (!Number.isInteger(remaining) || remaining < 0) {
    return { error: "Classes left this term must be a whole number of 0 or more." };
  }

  if (targetPercentage <= 0 || targetPercentage >= 100) {
    return { error: "Target attendance must be between 1% and 99%." };
  }

  const termTotal = total + remaining;
  const targetFraction = targetPercentage / 100;
  const bestPossiblePercentage =
    Math.round(((attended + remaining) / termTotal) * 100 * 100) / 100;
  const requiredByTermEnd = Math.ceil(targetFraction * termTotal);
  // True count needed; when it exceeds `remaining` the target is out of
  // reach this term, and the panel says so instead of showing this number
  // as an achievable plan.
  const classesMustAttend = Math.max(0, requiredByTermEnd - attended);
  const reachable = classesMustAttend <= remaining;

  return {
    remaining,
    termTotal,
    targetPercentage,
    bestPossiblePercentage,
    classesMustAttend,
    classesCanMiss: reachable ? remaining - classesMustAttend : 0,
    reachable,
  };
}

export function attendance(
  attended: number,
  total: number,
  targetPercentage = 75
): AttendanceResult | { error: string } {
  if (
    !Number.isFinite(attended) ||
    !Number.isFinite(total) ||
    !Number.isFinite(targetPercentage)
  ) {
    return { error: "Please enter valid numbers." };
  }

  if (total <= 0) {
    return { error: "Total classes held must be greater than zero." };
  }

  if (attended < 0) {
    return { error: "Attended classes cannot be negative." };
  }

  if (attended > total) {
    return { error: "Attended classes cannot exceed total classes held." };
  }

  if (targetPercentage <= 0 || targetPercentage >= 100) {
    return { error: "Target attendance must be between 1% and 99%." };
  }

  const currentPct = (attended / total) * 100;
  const targetFraction = targetPercentage / 100;

  if (currentPct >= targetPercentage) {
    // How many classes can be bunked?
    // attended / (total + x) >= targetFraction
    // attended / targetFraction >= total + x
    // x <= (attended / targetFraction) - total
    const maxBunk = Math.floor(attended / targetFraction - total);
    return {
      currentPercentage: Math.round(currentPct * 100) / 100,
      status: maxBunk > 0 ? "safe" : "target_reached",
      classesToAttend: 0,
      classesCanBunk: Math.max(0, maxBunk),
      targetPercentage,
      totalClassesAtTarget: total + Math.max(0, maxBunk),
    };
  } else {
    // How many classes must be attended consecutively?
    // (attended + x) / (total + x) >= targetFraction
    // attended + x >= targetFraction * total + targetFraction * x
    // x * (1 - targetFraction) >= targetFraction * total - attended
    // x >= (targetFraction * total - attended) / (1 - targetFraction)
    const needed = Math.ceil(
      (targetFraction * total - attended) / (1 - targetFraction)
    );
    return {
      currentPercentage: Math.round(currentPct * 100) / 100,
      status: "shortage",
      classesToAttend: Math.max(1, needed),
      classesCanBunk: 0,
      targetPercentage,
      totalClassesAtTarget: total + Math.max(1, needed),
    };
  }
}
