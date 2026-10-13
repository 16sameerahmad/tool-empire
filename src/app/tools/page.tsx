import type { Metadata } from "next";
import { DirectoryPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "All Tools | Tulyro", description: "Every free browser-only tool on Tulyro — calculators, text tools, developer tools, and generators.", robots: { index: false, follow: true }, alternates: { canonical: `${siteUrl}/tools/` } };
export default function ToolsPage() { return <DirectoryPage />; }
