import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Text Tools | Tulyro", "Free browser-only text tools: word counter, text-to-speech, and fancy text. Everything runs in your browser — no signup, no watermark. Try one now.", "/text/");
export default function TextPage() { return <HubPage cluster="Text" />; }
