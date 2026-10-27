import type { Metadata } from "next";
import { ToolPage } from "@/lib/tool-page";
import { createToolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

export const metadata: Metadata = {
  ...createToolMetadata(getTool("remove-background")),
  alternates: {
    canonical: "/tools/remove-background/",
  },
};

export default function BackgroundRemoverPage() {
  return <ToolPage toolId="remove-background" />;
}
