import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("hash-generator"));

export default function HashGeneratorPage() {
  return <ToolPage toolId="hash-generator" />;
}
