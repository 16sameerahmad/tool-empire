import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "About | Tulyro", description: "About Tulyro: free browser-only calculators, text tools, developer tools and generators. No signup, no tracking, no watermark.", alternates: { canonical: `${siteUrl}/about/` } };
export default function AboutPage() { return <LegalPage title="About Tulyro" path="/about/">
<p><strong>Tulyro</strong> is a free collection of practical browser-only tools — calculators, text utilities, developer helpers, and small generators. Every tool runs entirely in the visitor&apos;s browser: nothing typed into a tool is sent to a server, stored, or tracked.</p>
<h2>How Tulyro tools work</h2>
<p>Each tool is a self-contained client-side application. Calculations use plain, reviewable JavaScript logic that executes on the visitor&apos;s device, which keeps results instant and means our code never receives the values entered into a tool. There are no accounts, no saved history, and no database.</p>
<h2>How tools are built and checked</h2>
<p>Tulyro is developed and maintained by <strong>Sameer Ahmad</strong> and contributors with a focus on transparent mathematical accuracy, client-side privacy, and clean utility. Before any tool is released, its calculation engine is verified with unit test suites (Vitest), formula edge-case boundary checks, and full accessibility standards. Methodology notes, formulas, and references are documented openly in our <Link href="/guides/">guides</Link> so every number can be independently verified.</p>
<h2>What Tulyro offers</h2>
<p>The site includes <Link href="/calculators/">calculators</Link> (SIP, 75% attendance, PPF, SGPA to CGPA, EMI, age, mortgage, BMI, CGPA to percentage), <Link href="/text/">writing helpers</Link> (word counter, text to speech, fancy text), <Link href="/dev/">developer utilities</Link> (Base64), and <Link href="/tools/">practical utilities</Link> (GST invoice generator, fake text generator). All 15 tools are free, private by design, and run without signup or watermarks.</p>
<h2>Editorial & Accuracy Standards</h2>
<p>Calculations adhere strictly to authoritative standards: Indian banking reducing-balance formulas for loan EMIs, RBI &amp; post office compound interest schedules for PPF, UGC and AICTE regulatory guidelines for attendance thresholds, and CBSE/university rubrics for academic grade conversions. If you spot a calculation discrepancy, we treat corrections with immediate priority.</p>
<h2>Contact & Maintainer</h2>
<p>Tulyro is maintained by Sameer Ahmad. Questions, corrections, or tool suggestions: <a href="mailto:Tulyrotools@gmail.com">Tulyrotools@gmail.com</a>. If you spot an error, please share the tool name, your input values, and the expected result for rapid verification.</p>
</LegalPage>; }
