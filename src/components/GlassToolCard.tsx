"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { clusterBadge, TOOL_ICONS } from "@/components/ToolCard";
import type { ToolDefinition } from "@/lib/tools";

/**
 * Glassmorphism tool card — port of the Stitch
 * "protools_realistic_glass_icons_interactive_border_hover" edition.
 *
 * Frosted glass card; on hover (desktop) or tap (mobile) the chromatic
 * gradient border reveals, the card lifts, and the 3D glass icon tile
 * fills with its theme gradient. GPU-friendly (transform/opacity only).
 */

/** Category badge → glass theme key. */
const BADGE_THEME: Record<string, string> = {
  Calculator: "calculator",
  Finance: "finance",
  "Text Utility": "text",
  Developer: "developer",
  Academic: "academic",
  "Media & Fun": "media",
};

export function GlassToolCard({ tool, badge: badgeOverride }: { tool: ToolDefinition; badge?: string }) {
  const badge = badgeOverride ?? clusterBadge(tool.cluster);
  const theme = BADGE_THEME[badge] ?? "calculator";
  const [tapped, setTapped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mobile has no hover: a tap triggers the same delight as mouseenter.
  // The class lingers briefly so the glow registers before navigation.
  const onTouchStart = () => {
    if (timer.current) clearTimeout(timer.current);
    setTapped(true);
  };
  const clearTap = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTapped(false), 500);
  };
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <Link
      href={tool.href}
      onTouchStart={onTouchStart}
      onTouchEnd={clearTap}
      onTouchCancel={clearTap}
      className={`glass-card glass-theme-${theme}${tapped ? " is-tapped" : ""} group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-3xl p-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container`}
      aria-label={`${tool.title} — launch tool`}
    >
      <span className="relative z-[1] block space-y-4">
        <span className="flex items-center justify-between">
          <span aria-hidden="true" className="glass-tile">
            <Icon name={TOOL_ICONS[tool.id] ?? "description"} className="h-6 w-6" />
          </span>
          <span className="glass-badge rounded-lg px-2.5 py-1 text-xs font-semibold">{badge}</span>
        </span>
        <span className="block">
          <span className="glass-title block text-lg font-bold text-slate-900">{tool.title}</span>
          <span className="mt-1.5 block text-xs leading-relaxed text-slate-500">{tool.description}</span>
        </span>
      </span>
      <span className="glass-launch relative z-[1] mt-4 flex items-center justify-between border-t border-slate-200/50 pt-5 text-xs font-semibold">
        <span>Launch Tool</span>
        <span aria-hidden="true" className="glass-arrow grid h-7 w-7 place-items-center rounded-full border border-white/80 bg-white/70 shadow-sm">
          <Icon name="arrow_forward" className="h-3.5 w-3.5" />
        </span>
      </span>
    </Link>
  );
}

/** Category label → glass theme key (for Explore Categories rows). */
const CATEGORY_THEME: Record<string, string> = {
  Calculators: "calculator",
  "Text Tools": "text",
  "Developer Tools": "developer",
  "Fun Tools": "media",
  "All Tools": "calculator",
};

export interface CategoryRow {
  label: string;
  sub: string;
  href: string;
  icon: string;
  tint: string;
}

/**
 * Glassmorphism category row — the Explore Categories row layout, unchanged
 * in size/structure, with the glass + gradient-border glow interaction.
 * Tap (mobile) triggers the same delight as hover (desktop).
 */
export function GlassCategoryRow({ category }: { category: CategoryRow }) {
  const theme = CATEGORY_THEME[category.label] ?? "calculator";
  const [tapped, setTapped] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onTouchStart = () => {
    if (timer.current) clearTimeout(timer.current);
    setTapped(true);
  };
  const clearTap = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setTapped(false), 500);
  };
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <Link
      href={category.href}
      onTouchStart={onTouchStart}
      onTouchEnd={clearTap}
      onTouchCancel={clearTap}
      className={`glass-row glass-theme-${theme}${tapped ? " is-tapped" : ""} flex items-center gap-3 rounded-xl p-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container`}
    >
      <span className={`glass-row-icon grid h-10 w-10 shrink-0 place-items-center rounded-lg ${category.tint}`}>
        <Icon name={category.icon} className="h-5 w-5" />
      </span>
      <span className="relative z-[1] min-w-0 flex-1">
        <span className="glass-row-title block font-display text-sm font-semibold text-on-surface">{category.label}</span>
        <span className="block truncate font-body-sm text-body-sm text-on-surface-variant">{category.sub}</span>
      </span>
      <Icon name="chevron_right" className="glass-row-chevron relative z-[1] h-4 w-4 shrink-0 text-outline-variant" />
    </Link>
  );
}
