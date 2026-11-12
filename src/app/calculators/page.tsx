import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { createPageMetadata } from "@/lib/seo";
export const metadata: Metadata = createPageMetadata("Calculators | Tulyro", "Free browser-only calculators: age, EMI, mortgage, BMI and CGPA tools. Every calculation runs in your browser — no signup, no watermark. Try one now — free.", "/calculators/");
export default function CalculatorsPage() { return <HubPage cluster="Calculators" />; }
