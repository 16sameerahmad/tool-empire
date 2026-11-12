import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Media Tools | Tulyro", "Free PDF, image and audio tools: convert, compress, merge, split and rotate files in your browser. No uploads, no signup, no watermark.", "/media/");
export default function MediaPage() { return <HubPage cluster="Media" />; }
