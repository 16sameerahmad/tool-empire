import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("income-tax-calculator"));

export default function IncomeTaxCalculatorPage() {
  return <ToolPage toolId="income-tax-calculator" />;
}
