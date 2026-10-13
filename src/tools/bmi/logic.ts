export type BmiCategory = "Underweight" | "Normal" | "Overweight" | "Obese";

export function bmi(weightKg: number, heightM: number): number {
  return weightKg / (heightM * heightM);
}

export function bmiCategory(value: number): BmiCategory {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal";
  if (value < 30) return "Overweight";
  return "Obese";
}

export function poundsToKg(pounds: number): number { return pounds * 0.45359237; }
export function inchesToMeters(inches: number): number { return inches * 0.0254; }

export function validateMetric(weightKg: number, heightCm: number): string | null {
  if (!Number.isFinite(heightCm) || heightCm < 50 || heightCm > 250) return "Height must be between 50 and 250 cm.";
  if (!Number.isFinite(weightKg) || weightKg < 10 || weightKg > 500) return "Weight must be between 10 and 500 kg.";
  return null;
}
