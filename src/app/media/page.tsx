import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Media Tools | Tulyro", description: "Free PDF, image, and audio tools — convert, compress, merge, and split files online.", alternates: { canonical: `${siteUrl}/media/` } };
export default function MediaPage() { return <HubPage cluster="Media" />; }
