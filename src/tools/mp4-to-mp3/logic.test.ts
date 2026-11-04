import { describe, it, expect } from "vitest";
import { videoToMp3 } from "./logic";

describe("mp4-to-mp3", () => {
  it("exports videoToMp3 function", () => {
    expect(typeof videoToMp3).toBe("function");
  });
});
