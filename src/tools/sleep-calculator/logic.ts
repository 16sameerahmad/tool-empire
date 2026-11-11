/** Minutes the average person takes to fall asleep after getting into bed. */
export const FALL_ASLEEP_MINUTES = 15;

/** One full sleep cycle (light → deep → REM) lasts about 90 minutes. */
export const CYCLE_MINUTES = 90;

/** 5–6 cycles (7.5–9 hours) matches the 7–9 hour adult recommendation. */
export const RECOMMENDED_CYCLES = [5, 6];

export type SleepMode = "wake" | "bed";

export interface SleepOption {
  cycles: number;
  /** Total sleep time in minutes (cycles × 90). */
  sleepMinutes: number;
  sleepLabel: string;
  /** Minutes since midnight, 0–1439. */
  timeMinutes: number;
  timeLabel: string;
  /** -1 = previous day, 0 = same day, 1 = next day (relative to the input time). */
  dayOffset: -1 | 0 | 1;
  recommended: boolean;
}

/** Parse "HH:MM" (24-hour) into minutes since midnight, or null if invalid. */
export function parseTime(value: string): number | null {
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(value.trim());
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

/** Format minutes since midnight as a 12-hour clock label, e.g. "9:45 PM". */
export function formatTime(minutes: number): string {
  const m = ((minutes % 1440) + 1440) % 1440;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  const period = h < 12 ? "AM" : "PM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(mm).padStart(2, "0")} ${period}`;
}

function durationLabel(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

/**
 * Sleep times for a target wake-up time (bedtimes, earliest first) or a
 * bedtime (wake-up times, earliest first). Each option is one whole number
 * of 90-minute cycles plus a 15-minute fall-asleep allowance, so waking up
 * lands between cycles instead of in deep sleep.
 */
export function sleepOptions(
  mode: SleepMode,
  timeValue: string
): SleepOption[] | { error: string } {
  const timeMinutes = parseTime(timeValue);
  if (timeMinutes === null) {
    return { error: "Enter a valid time (HH:MM, 24-hour)." };
  }

  const cyclesList = mode === "wake" ? [6, 5, 4, 3] : [3, 4, 5, 6];
  return cyclesList.map((cycles) => {
    const total = FALL_ASLEEP_MINUTES + cycles * CYCLE_MINUTES;
    const raw = mode === "wake" ? timeMinutes - total : timeMinutes + total;
    const dayOffset: -1 | 0 | 1 = raw < 0 ? -1 : raw >= 1440 ? 1 : 0;
    return {
      cycles,
      sleepMinutes: cycles * CYCLE_MINUTES,
      sleepLabel: durationLabel(cycles * CYCLE_MINUTES),
      timeMinutes: ((raw % 1440) + 1440) % 1440,
      timeLabel: formatTime(raw),
      dayOffset,
      recommended: RECOMMENDED_CYCLES.includes(cycles),
    };
  });
}
