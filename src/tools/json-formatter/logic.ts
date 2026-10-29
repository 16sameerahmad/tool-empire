/**
 * JSON Formatter, Minifier, and Validator logic.
 *
 * ponytail: Native JSON.parse & JSON.stringify.
 * Upgrade path: schema validation via Ajv.
 */

export interface JsonProcessResult {
  valid: boolean;
  formatted?: string;
  minified?: string;
  error?: string;
  line?: number;
  charCount?: number;
  byteSize?: number;
}

export function processJson(
  input: string,
  indent: number = 2
): JsonProcessResult {
  if (!input.trim()) {
    return { valid: false, error: "Empty input" };
  }

  try {
    const parsed = JSON.parse(input);
    const formatted = JSON.stringify(parsed, null, indent);
    const minified = JSON.stringify(parsed);
    const byteSize = new TextEncoder().encode(formatted).length;

    return {
      valid: true,
      formatted,
      minified,
      charCount: formatted.length,
      byteSize,
    };
  } catch (err) {
    const message = (err as Error).message;
    // Attempt line extraction from message (e.g., "at position X" or "at line X")
    let line: number | undefined;
    const match = message.match(/line (\d+)/i) || message.match(/position (\d+)/i);
    if (match) {
      line = parseInt(match[1], 10);
    }

    return {
      valid: false,
      error: message,
      line,
    };
  }
}
