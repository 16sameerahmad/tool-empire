import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Developer Tools | Tulyro", description: "Free browser-only developer utilities for everyday text tasks.", alternates: { canonical: `${siteUrl}/dev/` } };
export default function DevPage() { return <HubPage cluster="Dev" />; }
