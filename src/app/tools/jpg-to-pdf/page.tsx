import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("jpg-to-pdf"));

export default function JpgToPdfPage() {
  return <ToolPage toolId="jpg-to-pdf" />;
}
