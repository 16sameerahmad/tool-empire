import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("gratuity-calculator"));

export default function GratuityCalculatorPage() {
  return <ToolPage toolId="gratuity-calculator" />;
}
