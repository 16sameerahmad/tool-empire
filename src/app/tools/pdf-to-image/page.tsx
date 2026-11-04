import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("pdf-to-image"));

export default function PdfToImagePage() {
  return <ToolPage toolId="pdf-to-image" />;
}
