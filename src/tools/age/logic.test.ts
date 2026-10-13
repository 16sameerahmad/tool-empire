import { describe, expect, it } from "vitest";
import { ageCalc } from "./logic";

describe("ageCalc", () => {
  it("calculates a birthday today", () => expect(ageCalc("2000-01-01", "2025-01-01")).toMatchObject({ years: 25, months: 0, days: 0, daysLived: 9132, isToday: true }));
  it("calculates calendar age and next birthday", () => expect(ageCalc("1990-05-15", "2026-10-13")).toMatchObject({ years: 36, months: 4, days: 28, daysLived: 13300, nextBirthday: "2027-05-15", daysUntilBirthday: 214 }));
  it("uses 1 March for a leap-day birthday in a non-leap year", () => expect(ageCalc("2000-02-29", "2025-02-28")).toMatchObject({ years: 24, months: 11, days: 30, nextBirthday: "2025-03-01", daysUntilBirthday: 1 }));
  it("rejects future and pre-1900 dates", () => { expect(ageCalc("2026-10-14", "2026-10-13")).toEqual({ error: "Date of birth cannot be in the future." }); expect(ageCalc("1899-12-31", "2026-10-13")).toEqual({ error: "Date of birth must be 1 January 1900 or later." }); });
  it("returns an empty state", () => expect(ageCalc("", "2026-10-13")).toBeNull());
  it("clamps month-end birthdays so days never go negative", () => {
    expect(ageCalc("2000-01-31", "2025-03-01")).toMatchObject({ years: 25, months: 1, days: 1 });
    expect(ageCalc("2000-01-31", "2025-02-28")).toMatchObject({ years: 25, months: 0, days: 28 });
  });
});
