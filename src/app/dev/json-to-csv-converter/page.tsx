import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("json-to-csv-converter"));

export default function JsonToCsvConverterPage() {
  return <ToolPage toolId="json-to-csv-converter" />;
}
