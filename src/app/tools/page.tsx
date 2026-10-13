import type { Metadata } from "next";
import { DirectoryPage } from "@/components/HubPage";
export const metadata: Metadata = { title: "All Tools | Tool Empire", description: "Every free browser-only tool on Tool Empire — calculators, text tools, developer tools, and generators.", robots: { index: false, follow: true } };
export default function ToolsPage() { return <DirectoryPage />; }
