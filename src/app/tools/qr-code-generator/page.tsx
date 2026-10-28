import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("qr-code-generator"));

export default function QrCodeGeneratorPage() {
  return <ToolPage toolId="qr-code-generator" />;
}
