import { describe, expect, it } from "vitest";
import { cgpaToPercentage } from "./logic";

describe("cgpaToPercentage", () => {
  it("uses the 9.5 convention", () => { expect(cgpaToPercentage(8)).toBe(76); expect(cgpaToPercentage(7.5)).toBe(71.25); expect(cgpaToPercentage(10)).toBe(95); });
  it("accepts zero and rejects invalid input", () => { expect(cgpaToPercentage(0)).toBe(0); expect(cgpaToPercentage(10.01)).toHaveProperty("error"); expect(cgpaToPercentage(-1)).toHaveProperty("error"); });
});
