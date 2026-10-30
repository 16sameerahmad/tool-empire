"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { trackEvent } from "@/lib/analytics";
import type { ToolDefinition } from "@/lib/tools";

export function ShareButton({ tool }: { tool: ToolDefinition }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : `https://tulyro.online/tools/${tool.id}/`;
    const shareData = {
      title: `${tool.title} — Tulyro`,
      text: tool.description,
      url,
    };

    trackEvent("tool_share_clicked", { tool_id: tool.id });

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(shareData);
        trackEvent("tool_share_native_success", { tool_id: tool.id });
        return;
      } catch {
        // Fallback to clipboard if user dismissed or native share unsupported
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("tool_share_clipboard_copy", { tool_id: tool.id });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      title="Share this tool"
      className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 font-label-sm text-xs text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
    >
      <Icon name={copied ? "check" : "share"} className="h-3.5 w-3.5 text-primary-fixed" />
      <span>{copied ? "Link Copied!" : "Share Tool"}</span>
    </button>
  );
}
