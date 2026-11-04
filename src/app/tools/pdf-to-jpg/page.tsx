import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("pdf-to-jpg"));

export default function PdfToJpgPage() {
  return <ToolPage toolId="pdf-to-jpg" />;
}
