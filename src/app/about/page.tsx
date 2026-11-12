import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { createAboutPageJsonLd, siteUrl } from "@/lib/seo";
export const metadata: Metadata = { title: "About | Tulyro", description: "About Tulyro: free browser-only calculators, text tools, developer tools and generators. No signup, no tracking, no watermark.", alternates: { canonical: `${siteUrl}/about/` } };
export default function AboutPage() {
  const aboutPageJsonLd = createAboutPageJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }} />
      <LegalPage title="About Tulyro" path="/about/">
        <p><strong>Tulyro</strong> is a free collection of practical browser-only tools — calculators, text utilities, developer helpers, PDF and media tools, and small generators. Every tool runs entirely in the visitor&apos;s browser: our code does not send what is typed into a tool to a server, store it, or track it. The one exception is text-to-speech, which uses voices supplied by the browser — some may send text to vendor servers, as explained in our <Link href="/privacy/">privacy policy</Link>.</p>
        <h2>How Tulyro tools work</h2>
        <p>Each tool is a self-contained client-side application. Calculations use plain, reviewable JavaScript logic that executes on the visitor&apos;s device, which keeps results instant and means our code never receives the values entered into a tool. There are no accounts, no saved history, and no database.</p>
        <h2>How tools are built and checked</h2>
        <p>Tulyro is developed and maintained by <strong>Sameer Ahmad</strong>, its founder and lead developer, who is responsible for the tools, the calculations behind them, and fixing errors when they are reported. Before any tool is released, its calculation engine is verified with unit test suites (Vitest), formula edge-case boundary checks, and full accessibility standards. Methodology notes and formulas are documented openly in our <Link href="/guides/">guides</Link> so every number can be independently verified.</p>
        <h2>What Tulyro offers</h2>
        <p>The site is organised into clusters: <Link href="/calculators/">calculators</Link> for finance, health, study and everyday maths; <Link href="/text/">writing and voice helpers</Link>; <Link href="/dev/">developer utilities</Link>; <Link href="/media/">PDF, image and audio tools</Link>; and <Link href="/tools/">practical everyday utilities</Link>, plus plain-language <Link href="/guides/">guides</Link> that show the working behind the numbers. All tools are free, private by design, and run without signup or watermarks.</p>
        <h2>Editorial &amp; Accuracy Standards</h2>
        <p>Calculations adhere strictly to authoritative standards: Indian banking reducing-balance formulas for loan EMIs, RBI &amp; post office compound interest schedules for PPF, UGC and AICTE regulatory guidelines for attendance thresholds, and CBSE/university rubrics for academic grade conversions. If you spot a calculation discrepancy, we treat corrections with immediate priority.</p>
        <h2>Contact &amp; Maintainer</h2>
        <p>Tulyro is developed as an open web utility initiative maintained by Sameer Ahmad. Questions, corrections, bug reports, or tool suggestions: <a href="mailto:Tulyrotools@gmail.com">Tulyrotools@gmail.com</a>. Source repository and open issue tracking are available at <a href="https://github.com/16sameerahmad/tool-empire" target="_blank" rel="noopener noreferrer">GitHub (16sameerahmad/tool-empire)</a>.</p>
        <h2>Security, Client-Side Safety &amp; Verification</h2>
        <p>Unlike standard web converters, Tulyro never uploads your text, passwords, images, or JSON data to cloud servers. All processing uses standard browser-native Web APIs (<code>window.crypto</code>, <code>Canvas API</code>, <code>Web Workers</code>). You can verify this by inspecting the browser Network tab while using any tool: our code sends zero outbound payload requests. The exception is text-to-speech, which uses voices supplied by your browser — some browser voices may send text to the browser vendor&apos;s servers, as explained in our <Link href="/privacy/">privacy policy</Link>.</p>
      </LegalPage>
    </>
  );
}
