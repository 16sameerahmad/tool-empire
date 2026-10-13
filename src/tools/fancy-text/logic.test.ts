import { describe, expect, it } from "vitest";
import { styleText } from "./logic";

describe("styleText", () => {
  it("maps bold letters", () => expect(styleText("Hello", "Bold")).toBe("𝐇𝐞𝐥𝐥𝐨"));
  it("handles Unicode gaps", () => { expect(styleText("h", "Italic")).toBe("ℎ"); expect(styleText("B", "Script")).toBe("ℬ"); expect(styleText("R", "Double-struck")).toBe("ℝ"); });
  it("passes through punctuation and emoji", () => expect(styleText("Hi 123! é 😀", "Bold")).toContain("123! é 😀"));
});
