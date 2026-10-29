/**
 * Unix Epoch & Timestamp Converter logic.
 * Supports seconds, milliseconds, human readable formats, and relative times.
 *
 * ponytail: Native JavaScript Date API.
 * Upgrade path: add timezone dropdown (Intl.DateTimeFormat already supported).
 */

export interface TimestampResult {
  seconds: number;
  milliseconds: number;
  utcDate: string;
  localDate: string;
  iso8601: string;
  relative: string;
}

export function parseToTimestamp(input: string | number): TimestampResult | null {
  if (typeof input === "string") {
    input = input.trim();
  }
  if (!input && input !== 0) return null;

  let ms: number;

  if (typeof input === "number" || /^-?\d+(\.\d+)?$/.test(String(input))) {
    const num = Number(input);
    if (!Number.isFinite(num)) return null;
    // If input is in seconds (e.g., 10 digits), convert to ms
    if (Math.abs(num) < 1e11) {
      ms = Math.round(num * 1000);
    } else {
      ms = Math.round(num);
    }
  } else {
    // Attempt parse as human readable date string
    const parsed = Date.parse(String(input));
    if (Number.isNaN(parsed)) return null;
    ms = parsed;
  }

  const d = new Date(ms);
  if (Number.isNaN(d.getTime())) return null;

  const seconds = Math.floor(ms / 1000);
  const now = Date.now();
  const diffSec = Math.round((ms - now) / 1000);

  let relative = "";
  if (Math.abs(diffSec) < 5) {
    relative = "just now";
  } else if (diffSec > 0) {
    if (diffSec < 60) relative = `in ${diffSec}s`;
    else if (diffSec < 3600) relative = `in ${Math.round(diffSec / 60)}m`;
    else if (diffSec < 86400) relative = `in ${Math.round(diffSec / 3600)}h`;
    else relative = `in ${Math.round(diffSec / 86400)}d`;
  } else {
    const abs = Math.abs(diffSec);
    if (abs < 60) relative = `${abs}s ago`;
    else if (abs < 3600) relative = `${Math.round(abs / 60)}m ago`;
    else if (abs < 86400) relative = `${Math.round(abs / 3600)}h ago`;
    else relative = `${Math.round(abs / 86400)}d ago`;
  }

  return {
    seconds,
    milliseconds: ms,
    utcDate: d.toUTCString(),
    localDate: d.toString(),
    iso8601: d.toISOString(),
    relative,
  };
}
