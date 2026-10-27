import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("sip-calculator"));

export default function SipCalculatorPage() {
  return <ToolPage toolId="sip-calculator" />;
}
