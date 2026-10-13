import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("cgpa-to-percentage"));
export default function CgpaPage() { return <ToolPage toolId="cgpa-to-percentage" />; }
