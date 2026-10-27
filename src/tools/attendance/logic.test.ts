import { describe, it, expect } from "vitest";
import { attendance } from "./logic";

describe("75% Attendance Calculator Logic", () => {
  it("calculates bunkable classes when attendance is above target", () => {
    // 80 attended out of 100 = 80%. Target 75%.
    // 80 / (100 + x) >= 0.75 => 80 / 0.75 - 100 = 106.66 - 100 = 6 bunkable
    const res = attendance(80, 100, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.currentPercentage).toBe(80);
      expect(res.status).toBe("safe");
      expect(res.classesCanBunk).toBe(6);
      expect(res.classesToAttend).toBe(0);
    }
  });

  it("calculates required classes when attendance is below target", () => {
    // 50 attended out of 80 = 62.5%. Target 75%.
    // (50 + x) / (80 + x) >= 0.75 => x >= (0.75*80 - 50) / 0.25 = (60 - 50) / 0.25 = 40 classes
    const res = attendance(50, 80, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.currentPercentage).toBe(62.5);
      expect(res.status).toBe("shortage");
      expect(res.classesToAttend).toBe(40);
      expect(res.classesCanBunk).toBe(0);
    }
  });

  it("handles exact target attendance", () => {
    const res = attendance(75, 100, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.currentPercentage).toBe(75);
      expect(res.classesCanBunk).toBe(0);
      expect(res.classesToAttend).toBe(0);
    }
  });

  it("rejects invalid inputs", () => {
    expect("error" in attendance(110, 100)).toBe(true);
    expect("error" in attendance(-5, 50)).toBe(true);
    expect("error" in attendance(10, 0)).toBe(true);
    expect("error" in attendance(10, 20, 120)).toBe(true);
  });
});
