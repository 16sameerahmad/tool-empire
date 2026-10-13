import { describe, expect, it } from "vitest";
import { emi } from "./logic";

describe("emi", () => {
  it("calculates a standard loan", () => expect(emi(100000, 12, 12)).toMatchObject({ monthlyPayment: expect.closeTo(8884.878867834166, 10), totalPayment: expect.closeTo(106618.54641400999, 6), totalInterest: expect.closeTo(6618.54641400999, 6) }));
  it("handles zero interest", () => expect(emi(120000, 0, 12)).toEqual({ monthlyPayment: 10000, totalPayment: 120000, totalInterest: 0 }));
  it("rejects invalid values and supports a large finite loan", () => { expect(emi(0, 12, 12)).toEqual({ error: expect.stringContaining("Loan amount") }); expect(emi(100000, 12, 601)).toEqual({ error: expect.stringContaining("Tenure") }); const result = emi(1_000_000_000_000, 12, 600); expect(result).not.toHaveProperty("error"); });
});
