import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("base64-encoder-decoder"));
export default function Base64Page() { return <ToolPage toolId="base64-encoder-decoder" />; }
