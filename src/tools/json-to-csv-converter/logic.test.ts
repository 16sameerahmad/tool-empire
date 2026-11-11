import { describe, it, expect } from "vitest";
import { jsonToCsv } from "./logic";

const SAMPLE = `[
  {"name": "Asha", "city": "Delhi", "age": 28},
  {"name": "Rohan", "city": "Mumbai", "age": 31}
]`;

describe("JSON to CSV Logic", () => {
  it("converts an array of objects with first-seen header order", () => {
    const r = jsonToCsv(SAMPLE);
    expect(r.valid).toBe(true);
    expect(r.columns).toEqual(["name", "city", "age"]);
    expect(r.rows).toBe(2);
    expect(r.csv).toBe("name,city,age\nAsha,Delhi,28\nRohan,Mumbai,31");
  });

  it("wraps a single object in an array", () => {
    const r = jsonToCsv('{"name": "Asha", "age": 28}');
    expect(r.valid).toBe(true);
    expect(r.csv).toBe("name,age\nAsha,28");
  });

  it("fills missing keys with empty cells", () => {
    const r = jsonToCsv('[{"a": 1, "b": 2}, {"a": 3}]');
    expect(r.valid).toBe(true);
    expect(r.csv).toBe("a,b\n1,2\n3,");
  });

  it("quotes fields with commas, quotes, or newlines (RFC 4180)", () => {
    const r = jsonToCsv('[{"name": "Asha, Dr.", "note": "says \\"hi\\""}]');
    expect(r.valid).toBe(true);
    expect(r.csv).toBe('name,note\n"Asha, Dr.","says ""hi"""');
  });

  it("stringifies nested objects and arrays into one cell", () => {
    const r = jsonToCsv('[{"id": 1, "tags": ["x", "y"], "meta": {"a": 1}}]');
    expect(r.valid).toBe(true);
    // The nested JSON contains commas, so the cell is quoted.
    expect(r.csv).toBe('id,tags,meta\n1,"[""x"",""y""]","{""a"":1}"');
  });

  it("supports semicolon delimiter and header toggle", () => {
    const semi = jsonToCsv(SAMPLE, { delimiter: ";", includeHeader: true });
    expect(semi.csv).toBe("name;city;age\nAsha;Delhi;28\nRohan;Mumbai;31");
    const noHeader = jsonToCsv(SAMPLE, { delimiter: ",", includeHeader: false });
    expect(noHeader.csv).toBe("Asha,Delhi,28\nRohan,Mumbai,31");
    expect(noHeader.columns).toEqual(["name", "city", "age"]);
  });

  it("converts a plain-value array into a single value column", () => {
    const r = jsonToCsv('["Delhi", "Mumbai", 42, true]');
    expect(r.valid).toBe(true);
    expect(r.columns).toEqual(["value"]);
    expect(r.csv).toBe("value\nDelhi\nMumbai\n42\ntrue");
  });

  it("rejects invalid JSON, empty input, and empty arrays", () => {
    expect(jsonToCsv("").valid).toBe(false);
    expect(jsonToCsv("   ").valid).toBe(false);
    expect(jsonToCsv("{not json").valid).toBe(false);
    expect(jsonToCsv("[]").valid).toBe(false);
    expect(jsonToCsv("[]").error).toMatch(/empty/i);
  });

  it("rejects mixed object and primitive rows", () => {
    expect(jsonToCsv('[{"a": 1}, 2]').valid).toBe(false);
  });
});
