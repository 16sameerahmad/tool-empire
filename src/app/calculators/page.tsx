import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
export const metadata: Metadata = { title: "Calculators | Tool Empire", description: "Free browser-only calculators for age, loans, BMI, and grades." };
export default function CalculatorsPage() { return <HubPage cluster="Calculators" />; }
