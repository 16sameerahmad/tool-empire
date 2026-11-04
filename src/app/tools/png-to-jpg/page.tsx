import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("png-to-jpg"));

export default function PngToJpgPage() {
  return <ToolPage toolId="png-to-jpg" />;
}
