import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("text-to-speech"));
export default function TextToSpeechPage() { return <ToolPage toolId="text-to-speech" />; }
