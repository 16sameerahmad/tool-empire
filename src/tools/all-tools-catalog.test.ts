import { describe, it, expect } from "vitest";
import { tools } from "../lib/tools";
import { content } from "../lib/content";
import * as fs from "fs";
import * as path from "path";

describe("All Tools Integrity Test", () => {
  it("should have exactly 52 registered tools", () => {
    expect(tools.length).toBe(52);
  });

  it("every tool has non-empty unique id and valid metadata", () => {
    const ids = new Set<string>();
    for (const t of tools) {
      expect(t.id).toBeTruthy();
      expect(ids.has(t.id)).toBe(false);
      ids.add(t.id);
      expect(t.title).toBeTruthy();
      expect(t.description).toBeTruthy();
      expect(t.href).toMatch(/^\/[a-z0-9\-\/]+\/$/);
      expect(t.keywords.length).toBeGreaterThan(0);
      expect(t.seoTitle).toBeTruthy();
      expect(t.seoDescription).toBeTruthy();
    }
  });

  it("every tool has corresponding rich content (definition, intro, howTo, content, faq)", () => {
    for (const t of tools) {
      const c = content[t.id];
      expect(c, `Missing content definition for tool: ${t.id}`).toBeDefined();
      expect(c.definition.length).toBeGreaterThan(10);
      expect(c.intro.length).toBeGreaterThan(10);
      expect(c.howTo.length).toBeGreaterThanOrEqual(3);
      expect(c.content.length).toBeGreaterThanOrEqual(2);
      expect(c.faq.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("every tool has a matching Next.js page.tsx route file", () => {
    const rootDir = process.cwd();
    for (const t of tools) {
      const cleanRoute = t.href.replace(/^\//, "").replace(/\/$/, "");
      const fullPath = path.join(rootDir, "src", "app", cleanRoute, "page.tsx");
      const exists = fs.existsSync(fullPath);
      expect(exists, `Missing route file at ${fullPath} for tool ${t.id}`).toBe(true);
    }
  });
});
