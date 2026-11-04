import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("split-pdf"));

export default function SplitPdfPage() {
  return <ToolPage toolId="split-pdf" />;
}
