import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("lumpsum-calculator"));

export default function LumpsumCalculatorPage() {
  return <ToolPage toolId="lumpsum-calculator" />;
}
