import { describe, it, expect } from "vitest";
import { parsePageRanges } from "./logic";

describe("parsePageRanges", () => {
  it("returns all pages when range is empty", () => {
    expect(parsePageRanges("", 5)).toEqual([1, 2, 3, 4, 5]);
    expect(parsePageRanges("   ", 3)).toEqual([1, 2, 3]);
  });

  it("parses single pages", () => {
    expect(parsePageRanges("1, 3, 5", 5)).toEqual([1, 3, 5]);
  });

  it("parses ranges and individual pages", () => {
    expect(parsePageRanges("1-3, 5", 6)).toEqual([1, 2, 3, 5]);
  });

  it("deduplicates and sorts pages", () => {
    expect(parsePageRanges("4, 2-3, 1, 2", 5)).toEqual([1, 2, 3, 4]);
  });

  it("clamps to total pages", () => {
    expect(parsePageRanges("1-10", 4)).toEqual([1, 2, 3, 4]);
    expect(parsePageRanges("0, 5, 8", 4)).toEqual([]);
  });

  it("handles malformed strings gracefully", () => {
    expect(parsePageRanges("abc, 2-x, -5", 5)).toEqual([]);
    expect(parsePageRanges("2-4, foo", 5)).toEqual([2, 3, 4]);
  });
});
