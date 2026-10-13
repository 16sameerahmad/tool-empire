import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "Contact | Tulyro", description: "Contact Tulyro by email for questions, corrections or feedback about the free browser-only tools.", alternates: { canonical: `${siteUrl}/contact/` } };
export default function ContactPage() { return <LegalPage title="Contact" path="/contact/"><p>For questions, corrections, or feedback about Tulyro, email <a href="mailto:contact@example.com">contact@example.com</a>.</p><p>This page uses a mail link only. There is no contact form because the site has no backend. Please do not send passwords, payment details, or other sensitive information by email.</p></LegalPage>; }
