import { describe, expect, it } from "vitest";
import { decodeB64, encodeB64 } from "./logic";

describe("Base64", () => {
  it("encodes UTF-8 text", () => { expect(encodeB64("Hello")).toBe("SGVsbG8="); expect(encodeB64("héllo")).toBe("aMOpbGxv"); expect(encodeB64("😀")).toBe("8J+YgA=="); });
  it("decodes padding and whitespace variants", () => { expect(decodeB64("SGVsbG8=")).toBe("Hello"); expect(decodeB64("SGVs bG8")).toBe("Hello"); });
  it("reports malformed and invalid UTF-8 data", () => { expect(decodeB64("SGVsbG8$")).toHaveProperty("error", "This is not valid Base64."); expect(decodeB64("A")).toHaveProperty("error", "This is not valid Base64."); expect(decodeB64("////")).toHaveProperty("error", "The decoded data is not valid text (UTF-8)."); });
});
