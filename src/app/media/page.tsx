import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Media Tools | Tulyro", "Free PDF, image, and audio tools — convert, compress, merge, and split files online.", "/media/");
export default function MediaPage() { return <HubPage cluster="Media" />; }
