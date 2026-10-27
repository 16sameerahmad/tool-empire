import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("swp-calculator"));

export default function SwpCalculatorPage() {
  return <ToolPage toolId="swp-calculator" />;
}
