import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("fancy-text-generator"));
export default function FancyTextPage() { return <ToolPage toolId="fancy-text-generator" />; }
