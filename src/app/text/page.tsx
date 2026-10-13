import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Text Tools | Tulyro", description: "Free browser-only text tools: word counter, text to speech and fancy text generator. Everything runs in your browser — no signup, no watermark. Try one now.", alternates: { canonical: `${siteUrl}/text/` } };
export default function TextPage() { return <HubPage cluster="Text" />; }
