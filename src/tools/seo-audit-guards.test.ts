import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { tools } from "../lib/tools";

/**
 * Guards from the 2026-11-12 Claude SEO full-site audit. All assertions are
 * fs/text based: guides.tsx is JSX and must not be imported by vitest.
 */
const root = process.cwd(); // vitest runs from the repo root
const read = (rel: string) => readFileSync(join(root, rel), "utf-8");

function guideHrefsFromSource(): string[] {
  const source = read("src/lib/guides.tsx");
  const hrefs = [...source.matchAll(/href: "(\/guides\/[^"]+)"/g)].map((m) => m[1]);
  const unique = [...new Set(hrefs)];
  expect(hrefs).toHaveLength(unique.length); // no duplicate guide hrefs
  return unique;
}

describe("seo audit guards", () => {
  it("sitemap formula covers every indexable page exactly once (96 URLs)", () => {
    const guides = guideHrefsFromSource();
    expect(guides).toHaveLength(31);
    const liveTools = tools.filter((t) => t.live);
    expect(liveTools).toHaveLength(53);
    const pages = [
      "/",
      "/tools/",
      "/guides/",
      ...guides,
      "/calculators/",
      "/text/",
      "/dev/",
      "/fun/",
      "/media/",
      "/about/",
      "/privacy/",
      "/terms/",
      "/contact/",
      ...liveTools.map((t) => t.href),
    ];
    expect(pages).toHaveLength(96);
    expect(new Set(pages).size).toBe(96);
    for (const p of pages) {
      expect(p).toMatch(/^\/([a-z0-9\-]+\/)*$/);
      expect(p).not.toContain("/embed/");
      expect(p).not.toContain("background-remover");
    }
    const sitemapSource = read("src/app/sitemap.ts");
    for (const hub of ["/calculators/", "/text/", "/dev/", "/fun/", "/media/"]) {
      expect(sitemapSource).toContain(`"${hub}"`);
    }
    expect(sitemapSource).toContain("contentUpdated");
    expect(sitemapSource).not.toContain("new Date()");
  });

  it("llms.txt lists every live tool and every guide", () => {
    const llms = read("public/llms.txt");
    for (const tool of tools.filter((t) => t.live)) {
      expect(llms).toContain(`https://tulyro.online${tool.href}`);
    }
    for (const href of guideHrefsFromSource()) {
      expect(llms).toContain(`https://tulyro.online${href}`);
    }
  });

  it("robots.ts does not disallow render resources or embed pages", () => {
    const robots = read("src/app/robots.ts");
    // The wildcard rule's disallow list must be /api/ only; the explanatory
    // comment legitimately names /_next/ and /embed/, so match the array.
    expect(robots).toContain('disallow: ["/api/"]');
  });

  it("JSON-LD is emitted once per type per page: no component-level duplicates", () => {
    expect(read("src/components/Breadcrumb.tsx")).not.toContain("application/ld+json");
    expect(read("src/components/FAQ.tsx")).not.toContain("application/ld+json");
    const toolPage = read("src/lib/tool-page.tsx");
    expect(toolPage.match(/application\/ld\+json/g)).toHaveLength(4);
  });

  it("shared content date is a real YYYY-MM-DD date", () => {
    const seo = read("src/lib/seo.ts");
    const match = seo.match(/contentUpdated = "(\d{4}-\d{2}-\d{2})"/);
    expect(match).not.toBeNull();
    expect(Number.isNaN(Date.parse(match![1]))).toBe(false);
  });
});
