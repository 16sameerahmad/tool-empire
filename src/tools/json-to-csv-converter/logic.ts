/**
 * JSON to CSV conversion logic (RFC 4180).
 *
 * Accepts a JSON array of objects, or a single object (wrapped in an array).
 * Headers are the union of object keys in first-seen order. Nested objects
 * and arrays are JSON-stringified into a single cell. Fields containing the
 * delimiter, a quote, or a line break are wrapped in double quotes and inner
 * quotes are doubled — the RFC 4180 rule Excel and Google Sheets expect.
 */

export type CsvDelimiter = "," | ";" | "\t";

export interface JsonToCsvOptions {
  delimiter: CsvDelimiter;
  includeHeader: boolean;
}

export interface JsonToCsvResult {
  valid: boolean;
  csv?: string;
  rows?: number;
  columns?: string[];
  error?: string;
}

const DEFAULT_OPTIONS: JsonToCsvOptions = { delimiter: ",", includeHeader: true };

function formatCell(value: unknown, delimiter: string): string {
  let text: string;
  if (value === null || value === undefined) {
    text = "";
  } else if (typeof value === "object") {
    text = JSON.stringify(value);
  } else {
    text = String(value);
  }
  const needsQuotes =
    text.includes(delimiter) ||
    text.includes('"') ||
    text.includes("\n") ||
    text.includes("\r");
  if (!needsQuotes) return text;
  return `"${text.replace(/"/g, '""')}"`;
}

export function jsonToCsv(input: string, options: JsonToCsvOptions = DEFAULT_OPTIONS): JsonToCsvResult {
  if (!input.trim()) {
    return { valid: false, error: "Paste some JSON first." };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(input);
  } catch (err) {
    return { valid: false, error: `Invalid JSON: ${(err as Error).message}` };
  }

  const rows = Array.isArray(parsed) ? parsed : [parsed];
  if (rows.length === 0) {
    return { valid: false, error: "The JSON array is empty — nothing to convert." };
  }

  const { delimiter, includeHeader } = options;
  let columns: string[];
  let records: unknown[][];

  if (rows.every((row) => row !== null && typeof row === "object" && !Array.isArray(row))) {
    const seen = new Set<string>();
    columns = [];
    for (const row of rows as Record<string, unknown>[]) {
      for (const key of Object.keys(row)) {
        if (!seen.has(key)) {
          seen.add(key);
          columns.push(key);
        }
      }
    }
    records = (rows as Record<string, unknown>[]).map((row) => columns.map((col) => row[col]));
  } else if (rows.every((row) => row === null || typeof row !== "object")) {
    columns = ["value"];
    records = rows.map((row) => [row]);
  } else {
    return {
      valid: false,
      error: "Mixed input: use an array of objects, or an array of plain values — not both.",
    };
  }

  const lines: string[] = [];
  if (includeHeader) lines.push(columns.map((col) => formatCell(col, delimiter)).join(delimiter));
  for (const record of records) {
    lines.push(record.map((cell) => formatCell(cell, delimiter)).join(delimiter));
  }

  return {
    valid: true,
    csv: lines.join("\n"),
    rows: records.length,
    columns,
  };
}
