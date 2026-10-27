import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("ppf-calculator"));

export default function PpfPage() {
  return <ToolPage toolId="ppf-calculator" />;
}
