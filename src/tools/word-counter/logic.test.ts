import { describe, expect, it } from "vitest";
import { wordStats } from "./logic";

describe("wordStats", () => {
  it("counts an empty string", () => expect(wordStats("")).toEqual({ words: 0, characters: 0, charactersWithoutSpaces: 0, sentences: 0, readingTime: "0 sec" }));
  it("counts words, characters, and sentences", () => expect(wordStats("Hi. How are you? Fine!")).toMatchObject({ words: 5, characters: 22, charactersWithoutSpaces: 18, sentences: 3 }));
  it("ignores repeated whitespace and decimal points", () => expect(wordStats("  3.14   is pi  ")).toMatchObject({ words: 3, sentences: 1 }));
  it("formats reading time", () => { expect(wordStats(Array(200).fill("word").join(" ")).readingTime).toBe("1 min"); expect(wordStats(Array(250).fill("word").join(" ")).readingTime).toBe("1 min 15 sec"); });
});
