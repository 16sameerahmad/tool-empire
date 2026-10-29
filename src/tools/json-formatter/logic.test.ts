import { describe, it, expect } from "vitest";
import { processJson } from "./logic";

describe("JSON Formatter logic", () => {
  it("formats valid JSON with indentation", () => {
    const raw = '{"name":"tulyro","tools":3}';
    const res = processJson(raw, 2);
    expect(res.valid).toBe(true);
    expect(res.formatted).toContain('  "name": "tulyro"');
    expect(res.minified).toBe(raw);
  });

  it("identifies invalid JSON and returns error", () => {
    const broken = '{"name": "tulyro",}';
    const res = processJson(broken);
    expect(res.valid).toBe(false);
    expect(res.error).toBeDefined();
  });

  it("handles empty input", () => {
    const res = processJson("");
    expect(res.valid).toBe(false);
  });
});
