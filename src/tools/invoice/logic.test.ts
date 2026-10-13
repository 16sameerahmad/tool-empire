import { describe, expect, it } from "vitest";
import { invoiceTotals } from "./logic";

describe("invoiceTotals", () => {
  it("calculates rounded tax", () => expect(invoiceTotals([{ description: "Item", quantity: 3, unitPrice: 19.99 }], 8)).toEqual({ subtotal: 5997, tax: 480, total: 6477 }));
  it("supports decimal quantities", () => expect(invoiceTotals([{ description: "A", quantity: 1.5, unitPrice: 100 }, { description: "B", quantity: 2, unitPrice: 49.99 }], 18)).toEqual({ subtotal: 24998, tax: 4500, total: 29498 }));
  it("rejects invalid rows and tax", () => { expect(invoiceTotals([{ description: "A", quantity: 0, unitPrice: 10 }], 0)).toHaveProperty("error"); expect(invoiceTotals([{ description: "A", quantity: 1, unitPrice: 10 }], 101)).toHaveProperty("error"); });
});
