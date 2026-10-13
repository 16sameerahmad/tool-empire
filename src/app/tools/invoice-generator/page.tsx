import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";
export const metadata: Metadata = createToolMetadata(getTool("invoice-generator"));
export default function InvoicePage() { return <ToolPage toolId="invoice-generator" />; }
