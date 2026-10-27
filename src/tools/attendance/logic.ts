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
