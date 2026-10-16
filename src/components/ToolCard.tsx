import { GlassToolCard } from "@/components/GlassToolCard";
import { Icon } from "@/components/icons";
import type { ToolDefinition } from "@/lib/tools";

/** Material-Symbols glyph per tool, matching the Stitch screens. */
export const TOOL_ICONS: Record<string, string> = {
  "age-calculator": "calendar_month",
  "emi-calculator": "account_balance",
  "mortgage-calculator": "home",
  "bmi-calculator": "monitor_weight",
  "cgpa-to-percentage": "percent",
  "word-counter": "description",
  "text-to-speech": "record_voice_over",
  "fancy-text-generator": "auto_awesome",
  "base64-encoder-decoder": "code",
  "invoice-generator": "description",
  "fake-text-generator": "chat_bubble",
};

/** Category badge label per cluster (Stitch card pattern). */
export function clusterBadge(cluster: string): string {
  switch (cluster) {
    case "Calculators":
      return "Calculator";
    case "Text":
      return "Text Utility";
    case "Dev":
      return "Developer";
    case "Fun":
      return "Media & Fun";
    default:
      return "Utility";
  }
}

/** Tinted 44px icon block, Stitch tool-card pattern. */
export function ToolIcon({ id, className }: { id: string; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={className ?? "grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-primary-fixed text-primary-container shadow-inner"}
    >
      <Icon name={TOOL_ICONS[id] ?? "description"} className="h-[22px] w-[22px]" />
    </span>
  );
}

export function ToolCard({ tool, badge }: { tool: ToolDefinition; badge?: string }) {
  // Unified with the glassmorphism system: every tool card site-wide
  // (category hubs, /tools/ directory, related-tools rails) gets the
  // glass + gradient-border glow treatment.
  return <GlassToolCard tool={tool} badge={badge} />;
}
