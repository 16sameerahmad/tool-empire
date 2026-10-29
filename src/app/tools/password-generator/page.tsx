import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = createToolMetadata(getTool("password-generator"));

export default function PasswordGeneratorPage() {
  return <ToolPage toolId="password-generator" />;
}
