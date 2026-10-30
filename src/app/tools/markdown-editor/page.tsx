import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("markdown-editor"));

export default function MarkdownEditorPage() {
  return <ToolPage toolId="markdown-editor" />;
}
