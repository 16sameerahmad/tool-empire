import Link from "next/link";
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
  return (
    <Link
      href={tool.href}
      className="group flex flex-col justify-between rounded-xl bg-surface-container-lowest p-5 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-[rgba(99,91,255,0.35)] hover:shadow-card-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
    >
      <span>
        <span className="mb-4 flex items-center justify-between">
          <ToolIcon id={tool.id} />
          <span className="rounded bg-surface-container-high px-2 py-0.5 font-label-sm text-[11px] text-on-surface-variant">{badge ?? clusterBadge(tool.cluster)}</span>
        </span>
        <span className="block font-display font-headline-sm text-headline-sm text-on-surface transition-colors group-hover:text-primary">{tool.title}</span>
        <span className="mt-2 block font-body-sm text-body-sm leading-[1.5] text-on-surface-variant [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {tool.description}
        </span>
      </span>
      <span className="mt-4 flex items-center justify-between border-t border-surface-container pt-4 font-label-sm text-label-sm text-primary">
        Launch Tool
        <Icon name="arrow_forward" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}
