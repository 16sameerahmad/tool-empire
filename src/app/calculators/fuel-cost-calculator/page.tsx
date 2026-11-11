import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("fuel-cost-calculator"));

export default function FuelCostCalculatorPage() {
  return <ToolPage toolId="fuel-cost-calculator" />;
}
