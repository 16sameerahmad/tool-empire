import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * AP-M10 guard: the layout's robots index/follow gate.
 *
 * Source-level guard ONLY — it deliberately never reads out/ or any build
 * output, so it passes standalone via `npm run test` without a prior build.
 * Limitation (honest): this proves the gate exists in source and defaults to
 * index/follow exactly when VERCEL_ENV=production; it cannot prove the
 * served production HTML carries `index, follow`. That needs a post-deploy
 * check (curl the live homepage and grep the robots meta tag).
 */
const root = process.cwd(); // vitest runs from the repo root
const read = (rel: string) => readFileSync(join(root, rel), "utf-8");

describe("layout robots gate (AP-M10)", () => {
  it("gates index/follow on VERCEL_ENV=production, with no hardcoded bypass", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain('process.env.VERCEL_ENV === "production"');
    expect(layout).toMatch(
      /robots:\s*\{\s*index:\s*isProductionDeployment,\s*follow:\s*isProductionDeployment,?\s*\}/,
    );
    // A hardcoded boolean anywhere in the robots block would silently
    // defeat the gate (always indexed previews, or a deindexed site).
    expect(layout).not.toMatch(/robots:\s*\{[^}]*index:\s*(true|false)/);
    expect(layout).not.toMatch(/robots:\s*\{[^}]*follow:\s*(true|false)/);
  });

  it("documents why the gate exists in a layout.tsx comment", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toContain("noindex,nofollow");
    expect(layout).toContain("preview");
    expect(layout).toContain("Deployment Protection");
  });
});

describe("404 robots + spam-probe redirects (AP-L1, AP-L2)", () => {
  it("not-found.tsx declares no custom robots object (framework tag only)", () => {
    const notFound = read("src/app/not-found.tsx");
    expect(notFound).not.toMatch(/robots\s*:/);
    expect(notFound).toContain('title: "Page not found | Tulyro"');
  });

  it("spam-probe redirects point at /404/ and stay temporary (307)", () => {
    const vercel = JSON.parse(read("vercel.json")) as {
      redirects: { source: string; destination: string; permanent: boolean }[];
    };
    const probes = vercel.redirects.filter(
      (r) => r.source.includes("wp-admin") || r.source.includes("php|asp"),
    );
    expect(probes).toHaveLength(2);
    for (const rule of probes) {
      expect(rule.destination).toBe("/404/");
      expect(rule.permanent).toBe(false);
    }
    expect(
      vercel.redirects.filter((r) => r.destination === "/404"),
    ).toHaveLength(0);
  });
});
