import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
export const metadata: Metadata = { title: "Developer Tools | Tool Empire", description: "Free browser-only developer utilities for everyday text tasks.", robots: { index: false, follow: true } };
export default function DevPage() { return <HubPage cluster="Dev" />; }
