import { describe, it, expect } from "vitest";
import { sgpaToCgpa } from "./logic";

describe("SGPA to CGPA Calculator Logic", () => {
  it("calculates simple average when credits are equal or omitted", () => {
    const res = sgpaToCgpa([
      { sgpa: 8.0 },
      { sgpa: 9.0 },
      { sgpa: 8.5 },
      { sgpa: 7.5 },
    ]);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.cgpa).toBe(8.25);
      expect(res.percentageCbse).toBe(78.38); // 8.25 * 9.5 = 78.375 -> 78.38
      expect(res.percentageStandard).toBe(82.5);
    }
  });

  it("calculates credit-weighted CGPA correctly", () => {
    // Sem 1: 8.0 (20 credits) = 160
    // Sem 2: 9.0 (20 credits) = 180
    // Sem 3: 7.0 (10 credits) = 70
    // Total credits = 50, Weighted = 410 -> CGPA = 410 / 50 = 8.2
    const res = sgpaToCgpa([
      { sgpa: 8.0, credits: 20 },
      { sgpa: 9.0, credits: 20 },
      { sgpa: 7.0, credits: 10 },
    ]);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.cgpa).toBe(8.2);
    }
  });

  it("rejects invalid SGPA scores", () => {
    expect("error" in sgpaToCgpa([{ sgpa: 12.0 }])).toBe(true);
    expect("error" in sgpaToCgpa([{ sgpa: -1 }])).toBe(true);
    expect("error" in sgpaToCgpa([])).toBe(true);
  });
});
