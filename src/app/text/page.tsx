import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
export const metadata: Metadata = { title: "Text Tools | Tool Empire", description: "Free browser-only text counters, speech, and fancy text tools." };
export default function TextPage() { return <HubPage cluster="Text" />; }
