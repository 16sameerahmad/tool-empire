import { describe, expect, it } from "vitest";
import { bmi, bmiCategory, inchesToMeters, poundsToKg, validateMetric } from "./logic";

describe("BMI", () => {
  it("calculates and classifies metric values", () => expect(bmiCategory(Number(bmi(70, 1.75).toFixed(1)))).toBe("Normal"));
  it("handles boundaries", () => { expect(bmiCategory(25)).toBe("Overweight"); expect(bmiCategory(18.5)).toBe("Normal"); expect(bmiCategory(30)).toBe("Obese"); });
  it("converts imperial values", () => expect(Number(bmi(poundsToKg(150), inchesToMeters(66)).toFixed(1))).toBe(24.2));
  it("validates metric input", () => { expect(validateMetric(70, 0)).toContain("Height"); expect(validateMetric(600, 175)).toContain("Weight"); });
});
