import { describe, expect, it } from "vitest";
import { canAddMessage, validateMessage } from "./logic";

describe("fake text validation", () => {
  it("validates message length", () => { expect(validateMessage({ side: "sent", text: "" })).toContain("required"); expect(validateMessage({ side: "sent", text: "x".repeat(501) })).toContain("500"); });
  it("limits the message count", () => { expect(canAddMessage(Array(29).fill({ side: "sent", text: "x" }))).toBe(true); expect(canAddMessage(Array(30).fill({ side: "sent", text: "x" }))).toBe(false); });
});
