"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import { siteUrl } from "@/lib/seo";
import type { ToolDefinition } from "@/lib/tools";

export function EmbedModal({ tool, isOpen, onClose }: { tool: ToolDefinition; isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const embedUrl = `${siteUrl}/embed/${tool.id}/`;
  const canonicalUrl = `${siteUrl}${tool.href}`;
  const embedCode = `<iframe src="${embedUrl}" width="100%" height="600" style="border:1px solid #e2e8f0;border-radius:12px;max-width:100%;min-height:500px;" title="${tool.title} by Tulyro" loading="lazy"></iframe>\n<p style="font-size:12px;color:#64748b;margin-top:6px;text-align:right;">Powered by <a href="${canonicalUrl}" target="_blank" rel="noopener" style="color:#4f46e5;text-decoration:underline;">Tulyro ${tool.title}</a></p>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="embed-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-container text-white">
              <Icon name="code" className="h-4 w-4" />
            </span>
            <h3 id="embed-dialog-title" className="font-display font-headline-sm text-headline-sm text-on-surface">
              Embed {tool.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>

        <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Add this calculator or tool directly onto your website or blog. Free, responsive, and completely private for your visitors.
        </p>

        <div className="mt-4">
          <label htmlFor="embed-code-snippet" className="block font-label-md text-label-md text-on-surface mb-1.5">
            Embed HTML Code
          </label>
          <div className="relative">
            <textarea
              id="embed-code-snippet"
              readOnly
              rows={5}
              value={embedCode}
              className="w-full rounded-xl border border-outline-variant bg-surface-container-low p-3 font-code-data text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary-container select-all"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-container"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-container px-4 py-2 font-label-md text-label-md text-white shadow-button-glow hover:bg-primary transition-colors"
          >
            <Icon name={copied ? "check" : "content_copy"} className="h-4 w-4" />
            {copied ? "Copied to Clipboard!" : "Copy Code"}
          </button>
        </div>
      </div>
    </div>
  );
}
