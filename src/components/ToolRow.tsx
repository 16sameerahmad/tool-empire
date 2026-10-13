import Link from "next/link";
import { Icon } from "@/components/icons";
import { ToolIcon } from "@/components/ToolCard";
import type { ToolDefinition } from "@/lib/tools";

export function ToolRow({ tool, badge }: { tool: ToolDefinition; badge?: string }) {
  return (
    <Link
      href={tool.href}
      className="group flex items-center gap-4 border-b border-outline-variant/60 py-4 transition-colors duration-150 ease-out hover:bg-primary-fixed/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
    >
      <ToolIcon id={tool.id} className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary-fixed text-primary-container" />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2 font-display text-base font-semibold text-on-surface">
          {tool.title}
          {badge ? (
            <span className="rounded-full border border-primary-container/30 bg-primary-fixed px-2 py-0.5 font-label-sm text-[11px] text-primary">{badge}</span>
          ) : null}
        </span>
        <span className="mt-0.5 block truncate font-body-sm text-body-sm leading-[1.5] text-on-surface-variant" title={tool.description}>
          {tool.description}
        </span>
      </span>
      <span className="flex shrink-0 items-center gap-1 font-label-md text-label-md text-on-surface-variant transition-colors duration-150 ease-out group-hover:text-primary">
        Open
        <Icon name="arrow_forward" className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
