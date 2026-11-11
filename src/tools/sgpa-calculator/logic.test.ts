import { describe, it, expect } from "vitest";
import { calculateSgpa } from "./logic";

describe("SGPA Calculator Logic", () => {
  it("calculates SGPA from credits and letter grades (worked example)", () => {
    // Maths 4cr A(8)=32, Physics 4cr A+(9)=36, Programming 3cr O(10)=30,
    // Electronics 3cr B+(7)=21, English 2cr A(8)=16.
    // Total points 135, total credits 16 -> 135/16 = 8.4375 -> 8.44
    const res = calculateSgpa([
      { credits: 4, grade: "A" },
      { credits: 4, grade: "A+" },
      { credits: 3, grade: "O" },
      { credits: 3, grade: "B+" },
      { credits: 2, grade: "A" },
    ]);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.sgpa).toBe(8.44);
      expect(res.totalCredits).toBe(16);
      expect(res.totalPoints).toBe(135);
      expect(res.percentageStandard).toBe(84.4); // 8.44 * 10
      expect(res.percentageCbse).toBe(80.18); // 8.44 * 9.5
    }
  });

  it("returns the grade point for a single subject", () => {
    const res = calculateSgpa([{ credits: 3, grade: "O" }]);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.sgpa).toBe(10);
      expect(res.totalCredits).toBe(3);
    }
  });

  it("counts failed subjects (F = 0 points) in the denominator", () => {
    // F 4cr = 0 points, O 4cr = 40 points -> 40/8 = 5.0
    const res = calculateSgpa([
      { credits: 4, grade: "F" },
      { credits: 4, grade: "O" },
    ]);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.sgpa).toBe(5);
    }
  });

  it("rejects empty input, bad grades, and invalid credits", () => {
    expect("error" in calculateSgpa([])).toBe(true);
    expect("error" in calculateSgpa([{ credits: 3, grade: "Z" }])).toBe(true);
    expect("error" in calculateSgpa([{ credits: 0, grade: "A" }])).toBe(true);
    expect("error" in calculateSgpa([{ credits: -2, grade: "A" }])).toBe(true);
    expect("error" in calculateSgpa([{ credits: 11, grade: "A" }])).toBe(true);
  });
});
