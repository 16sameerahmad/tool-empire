import { describe, it, expect } from "vitest";
import { parseToTimestamp } from "./logic";

describe("Epoch Converter logic", () => {
  it("converts 10-digit epoch seconds correctly", () => {
    const res = parseToTimestamp("1700000000");
    expect(res).not.toBeNull();
    expect(res?.seconds).toBe(1700000000);
    expect(res?.iso8601).toBe("2023-11-14T22:13:20.000Z");
  });

  it("converts 13-digit epoch milliseconds correctly", () => {
    const res = parseToTimestamp("1700000000000");
    expect(res).not.toBeNull();
    expect(res?.milliseconds).toBe(1700000000000);
    expect(res?.seconds).toBe(1700000000);
  });

  it("converts human date string correctly", () => {
    const res = parseToTimestamp("2026-01-01T00:00:00Z");
    expect(res).not.toBeNull();
    expect(res?.iso8601).toBe("2026-01-01T00:00:00.000Z");
  });

  it("returns null for invalid inputs", () => {
    expect(parseToTimestamp("invalid date string")).toBeNull();
    expect(parseToTimestamp("")).toBeNull();
  });
});
