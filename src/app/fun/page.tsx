import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Fun Tools | Tulyro", "Free browser-only tools for chat mockups, invoices, background removal and image resizing. Everything runs on your device — no signup, no watermark.", "/fun/");
export default function FunPage() { return <HubPage cluster="Fun" />; }
