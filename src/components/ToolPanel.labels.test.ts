import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * AP-H10 guard (Claude SEO audit, agentic F1): every form control in
 * ToolPanel.tsx must have an accessible name, and every <label> must be
 * associated with a control — the EMI pattern (explicit id + htmlFor, or
 * aria-label where no visible label exists, or a wrapping <label>).
 *
 * Fs/text based, like seo-audit-guards.test.ts: ToolPanel.tsx is JSX and
 * must not be imported by vitest.
 *
 * SCOPE: all panels, including GstPanel (its labels were associated in the
 * 13 Nov 2026 follow-up; no exclusions remain).
 */
const root = process.cwd(); // vitest runs from the repo root
const source = readFileSync(join(root, "src/components/ToolPanel.tsx"), "utf-8");

/** Index just past the `>` that closes the tag starting at `start`. */
function tagEnd(start: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = start; i < source.length; i += 1) {
    const c = source[i];
    if (quote) {
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
    } else if (c === "{") {
      depth += 1;
    } else if (c === "}") {
      depth -= 1;
    } else if (c === ">" && depth === 0) {
      return i + 1;
    }
  }
  return source.length;
}

function lineOf(pos: number): number {
  return source.slice(0, pos).split("\n").length;
}


interface Label {
  pos: number;
  htmlFor: string | null; // static id, or template prefix before ${
  isTemplate: boolean;
  wrapsControl: boolean;
}

interface Control {
  pos: number;
  tag: string;
  id: string | null; // static id, or template prefix before ${
  isTemplate: boolean;
  hasAriaName: boolean;
  wrapped: boolean;
}

const labels: Label[] = [];
const labelSpans: Array<[number, number]> = [];
for (const m of source.matchAll(/<label\b/g)) {
  const end = tagEnd(m.index);
  const openTag = source.slice(m.index, end);
  const close = source.indexOf("</label>", end);
  const body = close === -1 ? "" : source.slice(end, close);
  labelSpans.push([m.index, close === -1 ? end : close]);
  const staticFor = /htmlFor="([^"]+)"/.exec(openTag)?.[1] ?? null;
  const templateFor = /htmlFor=\{`([^`$]+)/.exec(openTag)?.[1] ?? null;
  labels.push({
    pos: m.index,
    htmlFor: staticFor ?? templateFor,
    isTemplate: staticFor === null && templateFor !== null,
    wrapsControl: /<(input|select|textarea)\b/.test(body),
  });
}

const controls: Control[] = [];
for (const m of source.matchAll(/<(input|select|textarea)\b/g)) {
  const end = tagEnd(m.index);
  const openTag = source.slice(m.index, end);
  const staticId = /\bid="([^"]+)"/.exec(openTag)?.[1] ?? null;
  const templateId = /\bid=\{`([^`$]+)/.exec(openTag)?.[1] ?? null;
  controls.push({
    pos: m.index,
    tag: m[1],
    id: staticId ?? templateId,
    isTemplate: staticId === null && templateId !== null,
    hasAriaName: /aria-label(ledby)?=/.test(openTag),
    wrapped: labelSpans.some(([s, e]) => m.index >= s && m.index < e),
  });
}

describe("ToolPanel label association (AP-H10)", () => {
  it("scans the full panel file (no exclusions)", () => {
    expect(labels.length).toBeGreaterThan(50);
    expect(controls.length).toBeGreaterThan(90);
  });

  it("every label is associated: htmlFor matching a control id, or wraps a control", () => {
    const controlIds = new Set(controls.map((c) => c.id).filter((id): id is string => id !== null));
    const bad = labels.filter(
      (l) => !l.wrapsControl && (l.htmlFor === null || !controlIds.has(l.htmlFor)),
    );
    expect(
      bad.map((l) => `line ${lineOf(l.pos)}: htmlFor=${l.htmlFor ?? "(none)"}`),
    ).toEqual([]);
  });

  it("every control has an accessible name: labelled id, aria-label, or wrapping label", () => {
    const labelledIds = new Set(
      labels.map((l) => l.htmlFor).filter((id): id is string => id !== null),
    );
    const bad = controls.filter(
      (c) => !c.hasAriaName && !c.wrapped && (c.id === null || !labelledIds.has(c.id)),
    );
    expect(
      bad.map((c) => `line ${lineOf(c.pos)}: <${c.tag}> id=${c.id ?? "(none)"}`),
    ).toEqual([]);
  });

  it("no duplicate static control ids", () => {
    const ids = controls.filter((c) => !c.isTemplate && c.id !== null).map((c) => c.id as string);
    expect(ids).toHaveLength(new Set(ids).size);
  });
});
