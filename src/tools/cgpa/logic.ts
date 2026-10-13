export function cgpaToPercentage(cgpa: number): number | { error: string } {
  if (!Number.isFinite(cgpa) || cgpa < 0 || cgpa > 10 || !/^\d+(\.\d{1,2})?$/.test(String(cgpa))) return { error: "CGPA must be a number from 0 to 10 with up to 2 decimals." };
  return cgpa * 9.5;
}
