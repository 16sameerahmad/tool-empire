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
<p>Tulyro is built tool by tool. Before a tool is released, its calculation logic is covered by automated tests, and the page is checked for correct results with valid, invalid, and edge-case inputs, mobile usability, accessibility, and search metadata. Methodology notes and formulas are documented on the tool pages and in our <Link href="/guides/">guides</Link> so results can be understood and verified.</p>
<h2>What Tulyro offers</h2>
<p>The site includes <Link href="/calculators/">calculators</Link> (age, EMI, mortgage, BMI, CGPA), <Link href="/text/">writing helpers</Link> (word counter, text to speech, fancy text), <Link href="/dev/">developer utilities</Link> (Base64), and <Link href="/fun/">fun tools</Link> (invoice and chat mockups). All 11 tools are free, with no signup and no watermark.</p>
<h2>Contact</h2>
<p>Questions, corrections, or tool suggestions: <a href="mailto:Tulyrotools@gmail.com">Tulyrotools@gmail.com</a>. If you spot a calculation error, tell us the tool, your inputs, and the expected result — we treat correctness reports as the highest priority.</p>
</LegalPage>; }
