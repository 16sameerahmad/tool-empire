import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { ToolCard } from "@/components/ToolCard";
import { getToolsByCluster, tools, type Cluster } from "@/lib/tools";
import { createCollectionPageJsonLd, createSimpleBreadcrumbJsonLd, siteUrl } from "@/lib/seo";

const HUB_COPY: Record<string, { pill: string; blurb: string }> = {
  Calculators: { pill: "Finance, Health & Math", blurb: "Free browser-only calculators for age, loans, BMI, and grades." },
  Text: { pill: "Writing & Voice", blurb: "Free browser-only text tools for counting, styling, and listening." },
  Dev: { pill: "Developer Utilities", blurb: "Free browser-only developer tools for encoding, JSON, timestamps, hashes, UUIDs and passwords." },
  Tools: { pill: "Everyday Work", blurb: "Free browser-only utilities for invoices and everyday work." },
  Fun: { pill: "Mockups & Entertainment", blurb: "Free browser-only tools for invoices, chat mockups, background removal and image resizing." },
  Media: { pill: "PDF, Image & Audio", blurb: "Free PDF, image, and audio tools for converting, compressing, and editing files." },
};

/** Short intro paragraph on each hub and the directory (factual, no invented claims). */
const HUB_INTRO: Partial<Record<string, string>> = {
  Calculators:
    "Calculators on this page cover everyday maths: work out an exact age from a date of birth, estimate a loan EMI in rupees or a US mortgage payment in dollars, check adult BMI in metric or imperial units, or convert a 10-point CGPA to an estimated percentage. Every calculator runs entirely in your browser — nothing you enter is sent to a server — and every result is an informational estimate, not professional advice.",
  Text: "Text tools on this page cover everyday writing work: count words, characters, sentences and reading time as you type; listen to text read aloud with voices already in your browser; or turn plain text into copyable Unicode styles for bios and posts. Everything runs entirely in your browser — nothing you type is sent to a server. No signup, no watermark.",
  Dev: "Developer tools on this page cover everyday debugging and data work: encode or decode Base64 text, format and validate JSON, convert JSON arrays to CSV, convert Unix timestamps to dates, and generate hashes, UUIDs and secure passwords. Everything runs entirely in your browser — nothing you paste is sent to a server. No signup, no watermark.",
  Fun: "The tools on this page cover practical everyday jobs alongside lighter ones: create an invoice and print it without a watermark, make a chat mockup for a sketch or presentation, remove an image background, or resize and compress an image to an exact KB size. Everything runs entirely in your browser — no file you open leaves your device. No signup, no watermark.",
  Media: "Media tools on this page cover PDF, image and audio files: convert PDF pages to images and images back to PDF, merge, split, compress and rotate PDFs, convert between JPG, PNG, WebP and HEIC, extract audio from video, and generate QR codes and barcodes. Every file is processed entirely in your browser — nothing is uploaded to a server. No signup, no watermark.",
  Tools:
    "Every tool on Tulyro, in one place: calculators for finance, health, study and everyday maths; PDF, image and audio tools; text and writing tools; developer utilities; and small everyday utilities. Every tool runs entirely in your browser — nothing you enter is sent to a server — with no signup and no watermark.",
};

export function HubPage({ cluster }: { cluster: Cluster }) {
  const entries = getToolsByCluster(cluster);
  const copy = HUB_COPY[cluster];
  const breadcrumbJsonLd = createSimpleBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: cluster, path: `/${cluster.toLowerCase()}/` },
  ]);
  const collectionJsonLd = createCollectionPageJsonLd({
    path: `/${cluster.toLowerCase()}/`,
    name: `${cluster} tools`,
    items: entries.map((tool) => ({ name: tool.title, url: `${siteUrl}${tool.href}`, type: "WebApplication" })),
  });
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <main className="w-full bg-background">
        <section className="relative w-full overflow-hidden bg-midnight px-6 py-10 text-white shadow-md">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-shell">
            <nav className="mb-4 flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary-fixed-dim" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Icon name="chevron_right" className="h-3 w-3" />
              <span aria-current="page" className="font-semibold text-white">
                {cluster}
              </span>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-code-data text-xs text-primary-fixed">
              {copy?.pill ?? cluster} • {entries.length} {entries.length === 1 ? "tool" : "tools"}
            </p>
            <h1 className="mt-3 font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">{cluster} tools</h1>
            <p className="mt-2 max-w-[720px] font-body-lg text-body-lg text-tertiary-fixed-dim">
              Free browser-only {cluster.toLowerCase()} tools with no signup and no watermark.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-shell px-6 py-10">
          {HUB_INTRO[cluster] ? <p className="mb-8 max-w-[720px] font-body-md text-body-md leading-[1.6] text-on-surface-variant">{HUB_INTRO[cluster]}</p> : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** All-directory page: every live tool, Stitch card pattern. Served at /tools/. */
export function DirectoryPage() {
  const entries = tools.filter((tool) => tool.live);
  const breadcrumbJsonLd = createSimpleBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "All Tools", path: "/tools/" },
  ]);
  const collectionJsonLd = createCollectionPageJsonLd({
    path: "/tools/",
    name: "All tools",
    items: entries.map((tool) => ({ name: tool.title, url: `${siteUrl}${tool.href}`, type: "WebApplication" })),
  });
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <main className="w-full bg-background">
        <section className="relative w-full overflow-hidden bg-midnight px-6 py-10 text-white shadow-md">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-shell">
            <nav className="mb-4 flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary-fixed-dim" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Icon name="chevron_right" className="h-3 w-3" />
              <span aria-current="page" className="font-semibold text-white">
                All Tools
              </span>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-code-data text-xs text-primary-fixed">Full Directory</p>
            <h1 className="mt-3 font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">All tools</h1>
            <p className="mt-2 max-w-[720px] font-body-lg text-body-lg text-tertiary-fixed-dim">
              Every free browser-only tool on Tulyro. No signup, no watermark, nothing sent to a server.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-shell px-6 py-10">
          {HUB_INTRO["Tools"] ? <p className="mb-8 max-w-[720px] font-body-md text-body-md leading-[1.6] text-on-surface-variant">{HUB_INTRO["Tools"]}</p> : null}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {entries.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
