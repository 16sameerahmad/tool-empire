import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
export const metadata: Metadata = { title: "Fun Tools | Tool Empire", description: "Free browser-only tools for mockups, humour, and entertainment.", robots: { index: false, follow: true } };
export default function FunPage() { return <HubPage cluster="Fun" />; }
