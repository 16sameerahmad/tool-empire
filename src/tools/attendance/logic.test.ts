import { describe, it, expect } from "vitest";
import { attendance, attendanceProjection } from "./logic";

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

describe("Attendance term-end projection (classes left this term)", () => {
  it("plans the remaining classes: 42/50 with 20 left at 75%", () => {
    // Term total 70; best finish 62/70 = 88.57%. Need ceil(0.75*70)=53
    // attended by term end, so attend 11 of the 20 remaining, miss 9.
    // (Matches Cramberry's published answer: skip 9 of the remaining 20.)
    const res = attendanceProjection(42, 50, 20, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.termTotal).toBe(70);
      expect(res.bestPossiblePercentage).toBe(88.57);
      expect(res.reachable).toBe(true);
      expect(res.classesMustAttend).toBe(11);
      expect(res.classesCanMiss).toBe(9);
      expect(res.classesMustAttend + res.classesCanMiss).toBe(20);
    }
  });

  it("requires every remaining class when the shortage is deep", () => {
    // 70/100 with 20 left: best finish 90/120 = 75% exactly.
    const res = attendanceProjection(70, 100, 20, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.bestPossiblePercentage).toBe(75);
      expect(res.reachable).toBe(true);
      expect(res.classesMustAttend).toBe(20);
      expect(res.classesCanMiss).toBe(0);
    }
  });

  it("reports the target out of reach when even full attendance falls short", () => {
    // 30/50 with 10 left: best finish 40/60 = 66.67% < 75%.
    // Would need 15 more attended, only 10 remain.
    const res = attendanceProjection(30, 50, 10, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.bestPossiblePercentage).toBe(66.67);
      expect(res.reachable).toBe(false);
      expect(res.classesMustAttend).toBe(15);
      expect(res.classesCanMiss).toBe(0);
    }
  });

  it("matches the worked example: 52/64 with 26 left at 75%", () => {
    // Term total 90; need ceil(0.75*90)=68 attended, so attend 16, miss 10.
    const res = attendanceProjection(52, 64, 26, 75);
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.reachable).toBe(true);
      expect(res.classesMustAttend).toBe(16);
      expect(res.classesCanMiss).toBe(10);
    }
  });

  it("rejects invalid projection inputs", () => {
    expect("error" in attendanceProjection(42, 50, -1, 75)).toBe(true);
    expect("error" in attendanceProjection(42, 50, 2.5, 75)).toBe(true);
    expect("error" in attendanceProjection(60, 50, 10, 75)).toBe(true);
    expect("error" in attendanceProjection(42, 0, 10, 75)).toBe(true);
  });
});
