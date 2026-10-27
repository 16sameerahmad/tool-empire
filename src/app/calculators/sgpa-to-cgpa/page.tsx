import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("sgpa-to-cgpa"));

export default function SgpaPage() {
  return <ToolPage toolId="sgpa-to-cgpa" />;
}
