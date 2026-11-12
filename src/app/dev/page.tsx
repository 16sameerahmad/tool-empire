import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Developer Tools | Tulyro", "Free browser-only developer utilities: Base64, JSON formatting, epoch conversion, hashing, UUIDs and secure passwords. No signup, nothing uploaded.", "/dev/");
export default function DevPage() { return <HubPage cluster="Dev" />; }
