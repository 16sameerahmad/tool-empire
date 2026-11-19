import { describe, expect, it } from "vitest";
import { styleText } from "./logic";

describe("styleText", () => {
  it("maps bold letters", () => expect(styleText("Hello", "Bold")).toBe("𝐇𝐞𝐥𝐥𝐨"));
  it("handles Unicode gaps", () => { expect(styleText("h", "Italic")).toBe("ℎ"); expect(styleText("B", "Script")).toBe("ℬ"); expect(styleText("R", "Double-struck")).toBe("ℝ"); });
  it("passes through punctuation and emoji", () => expect(styleText("Hi 123! é 😀", "Bold")).toContain("123! é 😀"));
  it("maps fullwidth letters and digits", () => expect(styleText("Ab 12", "Fullwidth")).toBe("Ａｂ　１２"));
  it("maps squared and parenthesized letters", () => { expect(styleText("Ab", "Squared")).toBe("🄰🄱"); expect(styleText("Ab", "Parenthesized")).toBe("🄐⒝"); expect(styleText("Ab", "Negative Squared")).toBe("🅰🅱"); });
  it("maps sans-serif and bold fraktur offsets", () => { expect(styleText("Ab", "Sans-Serif Bold")).toBe("𝗔𝗯"); expect(styleText("Ab", "Sans-Serif Italic")).toBe("𝘈𝘣"); expect(styleText("Ab", "Sans-Serif Bold Italic")).toBe("𝘼𝙗"); expect(styleText("Ab", "Bold Fraktur")).toBe("𝕬𝖇"); });
  it("reverses and rotates upside-down text", () => expect(styleText("Hello", "Upside-Down")).toBe("ollǝH"));
  it("adds combining marks for strikethrough and underline", () => { expect(styleText("Ab", "Strikethrough")).toBe("A̶b̶"); expect(styleText("Ab", "Underline")).toBe("A̲b̲"); });
  it("spaces out characters", () => expect(styleText("Ab", "Spaced Out")).toBe("A b"));
  it("maps superscript and subscript letters", () => { expect(styleText("Ab", "Superscript")).toBe("ᴬᵇ"); expect(styleText("ae", "Subscript")).toBe("ₐₑ"); });
  it("keeps all 24 styles distinct on a sample word", () => {
    const all = ["Bold", "Italic", "Bold Italic", "Script", "Bold Script", "Fraktur", "Bold Fraktur", "Double-struck", "Monospace", "Circled", "Small Caps", "Sans-Serif Bold", "Sans-Serif Italic", "Sans-Serif Bold Italic", "Fullwidth", "Squared", "Parenthesized", "Negative Squared", "Upside-Down", "Strikethrough", "Underline", "Spaced Out", "Superscript", "Subscript"] as const;
    const outputs = new Set(all.map((style) => styleText("Hello", style)));
    expect(outputs.size).toBe(24);
  });
});
