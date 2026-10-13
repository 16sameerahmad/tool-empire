import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Fun Tools | Tulyro", description: "Free browser-only tools for mockups, humour, and entertainment.", robots: { index: false, follow: true }, alternates: { canonical: `${siteUrl}/fun/` } };
export default function FunPage() { return <HubPage cluster="Fun" />; }
