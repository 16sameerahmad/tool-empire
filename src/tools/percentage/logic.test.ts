import { describe, expect, it } from "vitest";
import {
  calculateIsWhatPercent,
  calculatePercentChange,
  calculatePercentOf,
} from "./logic";

describe("percentage calculator logic", () => {
  it("calculates X% of Y", () => {
    expect(calculatePercentOf(20, 150)).toBe(30);
  });

  it("calculates what percent X is of Y", () => {
    expect(calculateIsWhatPercent(45, 90)).toBe(50);
  });

  it("calculates percentage increase and decrease", () => {
    const inc = calculatePercentChange(100, 125);
    expect(inc.changePercent).toBe(25);
    expect(inc.type).toBe("increase");

    const dec = calculatePercentChange(200, 150);
    expect(dec.changePercent).toBe(25);
    expect(dec.type).toBe("decrease");
  });
});
