import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("heic-to-jpg"));

export default function HeicToJpgPage() {
  return <ToolPage toolId="heic-to-jpg" />;
}
