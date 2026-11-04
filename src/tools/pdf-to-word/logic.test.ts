import { describe, it, expect } from "vitest";
import { extractPdfText, pdfTextToDocx } from "./logic";

describe("pdf-to-word", () => {
  it("exports extractPdfText function", () => {
    expect(typeof extractPdfText).toBe("function");
  });

  it("exports pdfTextToDocx function", () => {
    expect(typeof pdfTextToDocx).toBe("function");
  });
});
