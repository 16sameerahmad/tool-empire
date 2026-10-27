"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { EmbedModal } from "@/components/EmbedModal";
import type { ToolDefinition } from "@/lib/tools";

export function EmbedButton({ tool }: { tool: ToolDefinition }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-label-sm text-xs text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
      >
        <Icon name="code" className="h-3.5 w-3.5 text-primary-fixed" />
        <span>Embed Widget</span>
      </button>
      <EmbedModal tool={tool} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
