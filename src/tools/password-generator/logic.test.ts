import { describe, it, expect } from "vitest";
import { generatePassword, calculatePasswordStrength } from "./logic";

describe("Password Generator logic", () => {
  it("generates password with requested length", () => {
    const pw = generatePassword({
      length: 24,
      uppercase: true,
      lowercase: true,
      numbers: true,
      symbols: true,
      excludeSimilar: false,
    });
    expect(pw.length).toBe(24);
  });

  it("handles empty options gracefully", () => {
    const pw = generatePassword({
      length: 16,
      uppercase: false,
      lowercase: false,
      numbers: false,
      symbols: false,
      excludeSimilar: false,
    });
    expect(pw).toBe("");
  });

  it("calculates strength accurately", () => {
    expect(calculatePasswordStrength("123").label).toBe("Very Weak");
    expect(calculatePasswordStrength("Passw0rd!Secure2026").label).toBe("Very Strong");
  });
});
