import type { Metadata } from "next";
import { DirectoryPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("All Tools | Tulyro", "Every free browser-only tool on Tulyro — calculators, text tools, developer tools, and generators.", "/tools/");
export default function ToolsPage() { return <DirectoryPage />; }
