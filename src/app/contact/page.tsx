import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
export const metadata: Metadata = { title: "Contact | Tool Empire", description: "Contact Tool Empire by email." };
export default function ContactPage() { return <LegalPage title="Contact"><p>For questions, corrections, or feedback about Tool Empire, email <a href="mailto:contact@example.com">contact@example.com</a>.</p><p>This page uses a mail link only. There is no contact form because the site has no backend. Please do not send passwords, payment details, or other sensitive information by email.</p></LegalPage>; }
