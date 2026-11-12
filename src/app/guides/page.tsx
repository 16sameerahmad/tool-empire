import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { guides } from "@/lib/guides";
import { createCollectionPageJsonLd, createSimpleBreadcrumbJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Guides — How Things Work, With Real Numbers | Tulyro",
  description:
    "Plain-language guides with worked examples: EMI by hand, choosing an EMI calculator, age in Excel, BMI accuracy, and more. Every number verified.",
  alternates: { canonical: `${siteUrl}/guides/` },
  openGraph: {
    title: "Guides — How Things Work, With Real Numbers | Tulyro",
    description:
      "Plain-language guides with worked examples: EMI by hand, choosing an EMI calculator, age in Excel, BMI accuracy, and more. Every number verified.",
    url: `${siteUrl}/guides/`,
    siteName: "Tulyro",
    type: "website",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Tulyro — Free browser-only tools. No signup. No watermark." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides — How Things Work, With Real Numbers | Tulyro",
    description:
      "Plain-language guides with worked examples: EMI by hand, choosing an EMI calculator, age in Excel, BMI accuracy, and more. Every number verified.",
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function GuidesIndexPage() {
  const breadcrumbJsonLd = createSimpleBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
  ]);
  const collectionJsonLd = createCollectionPageJsonLd({
    path: "/guides/",
    name: "Guides",
    items: guides.map((guide) => ({ name: guide.title, url: `${siteUrl}${guide.href}`, type: "Article" })),
  });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }} />
      <Header />
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
                Guides
              </span>
            </nav>
            <h1 className="font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">
              Guides
            </h1>
            <p className="mt-2 max-w-2xl font-body-lg text-body-lg text-tertiary-fixed-dim">
              How things work, with real numbers. Each guide shows the working, and every example is
              verified against the matching tool.
            </p>
          </div>
        </section>
        <div className="mx-auto w-full max-w-shell px-6 py-10">
          <div className="grid gap-4 sm:grid-cols-2">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={guide.href}
                className="group rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-5 shadow-card transition-colors hover:border-primary"
              >
                <h2 className="font-display font-headline-sm text-headline-sm text-on-surface group-hover:text-primary">
                  {guide.title}
                </h2>
                <p className="mt-2 font-body-md text-body-md leading-[1.6] text-on-surface-variant">{guide.seoDescription}</p>
                <span className="mt-3 inline-flex items-center gap-1 font-label-md text-label-md text-primary">
                  Read the guide
                  <Icon name="arrow_forward" className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
