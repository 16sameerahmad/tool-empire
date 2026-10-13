export type AgeResult = {
  years: number;
  months: number;
  days: number;
  daysLived: number;
  nextBirthday: string;
  daysUntilBirthday: number;
  isToday: boolean;
};

const MIN_DATE = "1900-01-01";

function parseLocalDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function toDateString(date: Date): string {
  return [date.getFullYear(), String(date.getMonth() + 1).padStart(2, "0"), String(date.getDate()).padStart(2, "0")].join("-");
}

function daysBetween(start: Date, end: Date): number {
  const startUtc = Date.UTC(start.getFullYear(), start.getMonth(), start.getDate());
  const endUtc = Date.UTC(end.getFullYear(), end.getMonth(), end.getDate());
  return Math.round((endUtc - startUtc) / 86_400_000);
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function birthdayForYear(dob: Date, year: number): Date {
  const month = dob.getMonth();
  const day = dob.getDate() === 29 && month === 1 && !isLeapYear(year) ? 1 : dob.getDate();
  const birthdayMonth = day === 1 && dob.getDate() === 29 && month === 1 && !isLeapYear(year) ? 2 : month;
  return new Date(year, birthdayMonth, day);
}

export function ageCalc(dobValue: string, asOfValue: string): AgeResult | { error: string } | null {
  if (!dobValue) return null;
  if (dobValue < MIN_DATE) return { error: "Date of birth must be 1 January 1900 or later." };
  if (dobValue > asOfValue) return { error: "Date of birth cannot be in the future." };
  const dob = parseLocalDate(dobValue);
  const asOf = parseLocalDate(asOfValue);
  let years = asOf.getFullYear() - dob.getFullYear();
  const birthdayThisYear = birthdayForYear(dob, asOf.getFullYear());
  if (asOf < birthdayThisYear) years -= 1;
  const anchor = new Date(dob.getFullYear() + years, dob.getMonth(), dob.getDate());
  let months = asOf.getMonth() - anchor.getMonth();
  if (asOf.getDate() < anchor.getDate()) months -= 1;
  if (months < 0) months += 12;
  const targetMonthIndex = anchor.getMonth() + months;
  const targetYear = anchor.getFullYear() + Math.floor(targetMonthIndex / 12);
  const targetMonth = ((targetMonthIndex % 12) + 12) % 12;
  const lastDayOfTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const monthAnchor = new Date(targetYear, targetMonth, Math.min(anchor.getDate(), lastDayOfTargetMonth));
  const days = daysBetween(monthAnchor, asOf);
  let nextBirthday = birthdayForYear(dob, asOf.getFullYear());
  if (nextBirthday < asOf) nextBirthday = birthdayForYear(dob, asOf.getFullYear() + 1);
  const daysUntilBirthday = daysBetween(asOf, nextBirthday);
  return {
    years,
    months,
    days,
    daysLived: daysBetween(dob, asOf),
    nextBirthday: toDateString(nextBirthday),
    daysUntilBirthday,
    isToday: daysUntilBirthday === 0,
  };
}
