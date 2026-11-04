import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("image-to-pdf"));

export default function ImageToPdfPage() {
  return <ToolPage toolId="image-to-pdf" />;
}
