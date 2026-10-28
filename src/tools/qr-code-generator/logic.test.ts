import { describe, it, expect } from "vitest";
import { validateQrText, sanitizeHexColor } from "./logic";

describe("qr-code-generator logic", () => {
  it("rejects empty text", () => {
    expect(validateQrText("").valid).toBe(false);
    expect(validateQrText("   ").valid).toBe(false);
  });

  it("accepts valid URL", () => {
    expect(validateQrText("https://tulyro.online").valid).toBe(true);
  });

  it("rejects excessively long strings", () => {
    const long = "a".repeat(2001);
    expect(validateQrText(long).valid).toBe(false);
  });

  it("sanitizes hex colors", () => {
    expect(sanitizeHexColor("#ff0000", "#000000")).toBe("#ff0000");
    expect(sanitizeHexColor("#fff", "#000000")).toBe("#fff");
    expect(sanitizeHexColor("invalid", "#000000")).toBe("#000000");
  });
});
