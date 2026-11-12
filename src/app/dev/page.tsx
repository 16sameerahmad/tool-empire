import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Developer Tools | Tulyro", "Free browser-only developer utilities for everyday text tasks.", "/dev/");
export default function DevPage() { return <HubPage cluster="Dev" />; }
