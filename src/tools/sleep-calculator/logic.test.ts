import { describe, it, expect } from "vitest";
import { formatTime, parseTime, sleepOptions } from "./logic";

describe("Sleep Calculator Logic", () => {
  it("computes bedtimes for a 7:00 AM wake-up (worked example)", () => {
    // 6 cycles: 7:00 - 9h15m = 9:45 PM (previous night)
    // 5 cycles: 7:00 - 7h45m = 11:15 PM (previous night)
    // 4 cycles: 7:00 - 6h15m = 12:45 AM, 3 cycles: 7:00 - 4h45m = 2:15 AM
    const res = sleepOptions("wake", "07:00");
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.map((o) => o.timeLabel)).toEqual(["9:45 PM", "11:15 PM", "12:45 AM", "2:15 AM"]);
      expect(res.map((o) => o.cycles)).toEqual([6, 5, 4, 3]);
      expect(res.map((o) => o.sleepLabel)).toEqual(["9h", "7h 30m", "6h", "4h 30m"]);
      expect(res[0].dayOffset).toBe(-1);
      expect(res[2].dayOffset).toBe(0);
      expect(res[0].recommended).toBe(true);
      expect(res[1].recommended).toBe(true);
      expect(res[2].recommended).toBe(false);
    }
  });

  it("computes wake-up times for an 11:00 PM bedtime", () => {
    // 3 cycles: 11:00 PM + 4h45m = 3:45 AM, 4: 5:15 AM, 5: 6:45 AM, 6: 8:15 AM
    const res = sleepOptions("bed", "23:00");
    expect("error" in res).toBe(false);
    if (!("error" in res)) {
      expect(res.map((o) => o.timeLabel)).toEqual(["3:45 AM", "5:15 AM", "6:45 AM", "8:15 AM"]);
      expect(res.map((o) => o.cycles)).toEqual([3, 4, 5, 6]);
      expect(res.every((o) => o.dayOffset === 1)).toBe(true);
    }
  });

  it("formats times and parses input", () => {
    expect(formatTime(0)).toBe("12:00 AM");
    expect(formatTime(720)).toBe("12:00 PM");
    expect(formatTime(1305)).toBe("9:45 PM");
    expect(parseTime("07:00")).toBe(420);
    expect(parseTime("23:59")).toBe(1439);
    expect(parseTime("24:00")).toBe(null);
    expect(parseTime("7:00")).toBe(null);
    expect(parseTime("")).toBe(null);
  });

  it("rejects invalid times", () => {
    expect("error" in sleepOptions("wake", "25:00")).toBe(true);
    expect("error" in sleepOptions("bed", "")).toBe(true);
  });
});
