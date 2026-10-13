import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Calculators | Tulyro", description: "Free browser-only calculators: age, EMI, mortgage, BMI and CGPA tools. Every calculation runs in your browser — no signup, no watermark. Try one now — free.", alternates: { canonical: `${siteUrl}/calculators/` } };
export default function CalculatorsPage() { return <HubPage cluster="Calculators" />; }
