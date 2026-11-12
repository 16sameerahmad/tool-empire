import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Fun Tools | Tulyro", "Free browser-only tools for mockups, humour, and entertainment.", "/fun/");
export default function FunPage() { return <HubPage cluster="Fun" />; }
