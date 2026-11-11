import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("barcode-generator"));

export default function BarcodeGeneratorPage() {
  return <ToolPage toolId="barcode-generator" />;
}
