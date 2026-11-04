import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("mp4-to-mp3"));

export default function Mp4ToMp3Page() {
  return <ToolPage toolId="mp4-to-mp3" />;
}
