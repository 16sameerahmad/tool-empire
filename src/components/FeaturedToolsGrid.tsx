"use client";

import { useState } from "react";
import { GlassToolCard } from "@/components/GlassToolCard";
import { Reveal } from "@/components/motion";
import type { ToolDefinition } from "@/lib/tools";

/**
 * Featured tools grid with Load More (Floto fix, SEO-safe variant).
 * All tool cards are server-rendered in the initial HTML; cards beyond
 * the first 12 are collapsed with `hidden` (still in the DOM, links
 * intact for crawlers) and revealed with a CSS/JS toggle — nothing is
 * removed from the served HTML.
 */
const VISIBLE_COUNT = 12;

export function FeaturedToolsGrid({ tools }: { tools: ToolDefinition[] }) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = Math.max(0, tools.length - VISIBLE_COUNT);

  return (
    <>
      <div id="featured-tools-grid" className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool, i) => (
          <Reveal
            key={tool.id}
            delay={(i % 4) * 70}
            className={expanded || i < VISIBLE_COUNT ? "h-full" : "hidden h-full"}
          >
            <GlassToolCard tool={tool} />
          </Reveal>
        ))}
      </div>
      {hiddenCount > 0 ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls="featured-tools-grid"
            onClick={() => setExpanded((current) => !current)}
            className="btn-press btn-sheen inline-flex items-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-label-md text-label-md font-semibold text-white shadow-button-glow transition-all hover:bg-primary"
          >
            {expanded ? "Show fewer tools" : `Load more tools (${hiddenCount} more)`}
          </button>
        </div>
      ) : null}
    </>
  );
}
