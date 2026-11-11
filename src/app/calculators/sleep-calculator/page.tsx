import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("sleep-calculator"));

export default function SleepCalculatorPage() {
  return <ToolPage toolId="sleep-calculator" />;
}
