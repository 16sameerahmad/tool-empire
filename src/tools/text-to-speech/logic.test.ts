import { describe, expect, it } from "vitest";
import { chunkText } from "./logic";

describe("chunkText", () => {
  it("returns no chunks for empty text", () => expect(chunkText("")).toEqual([]));
  it("keeps short text in one chunk", () => expect(chunkText("One short sentence.")).toHaveLength(1));
  it("splits long text at a safe boundary", () => { const chunks = chunkText("Sentence one. ".repeat(30)); expect(chunks.every((chunk) => chunk.length <= 200)).toBe(true); expect(chunks.join(" ").replace(/\s+/g, " ")).toBe("Sentence one. ".repeat(30).trim()); });
});
