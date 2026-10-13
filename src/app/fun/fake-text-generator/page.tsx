import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("fake-text-generator"));
export default function FakeTextPage() { return <ToolPage toolId="fake-text-generator" />; }
