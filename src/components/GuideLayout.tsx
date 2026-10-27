import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { ToolCard } from "@/components/ToolCard";
import { getTool } from "@/lib/tools";
import { createArticleJsonLd, createFaqJsonLd, createSimpleBreadcrumbJsonLd } from "@/lib/seo";
import type { Guide } from "@/lib/guides";

/** Shared layout for /guides/* pages. Mirrors ToolLayout styling; content comes from guides.tsx. */
export function GuideLayout({ guide }: { guide: Guide }) {
  const articleJsonLd = createArticleJsonLd({
    headline: guide.title,
    description: guide.seoDescription,
    path: guide.href,
  });
  const breadcrumbJsonLd = createSimpleBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Guides", path: "/guides/" },
    { name: guide.title, path: guide.href },
  ]);
  const faqJsonLd = createFaqJsonLd(guide.faq);
  const relatedTools = guide.related.map((id) => getTool(id)).filter((tool) => tool.live);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Header />
      <a
        href="#guide"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-primary-container focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to guide
      </a>
      <main className="w-full bg-background">
        {/* Breadcrumb strip */}
        <section className="w-full border-b border-surface-container bg-surface-container-low/70 px-6 py-2.5">
          <div className="mx-auto max-w-shell font-label-sm text-label-sm text-on-surface-variant">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li>
                  <Link
                    className="flex items-center gap-1 rounded text-primary transition-colors hover:text-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
                    href="/"
                  >
                    <Icon name="home" className="h-[14px] w-[14px]" />
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <Icon name="chevron_right" className="h-3 w-3 text-outline-variant" />
                </li>
                <li>
                  <Link
                    className="rounded text-primary transition-colors hover:text-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
                    href="/guides/"
                  >
                    Guides
                  </Link>
                </li>
                <li aria-hidden="true">
                  <Icon name="chevron_right" className="h-3 w-3 text-outline-variant" />
                </li>
                <li aria-current="page" className="font-semibold text-on-surface">
                  {guide.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Midnight hero */}
        <section className="relative w-full overflow-hidden bg-midnight px-6 py-10 text-white shadow-md">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-secondary-container/15 blur-2xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-shell">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-code-data text-xs text-primary-fixed shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary-container animate-ping" aria-hidden="true" />
              Guide • No signup needed
            </p>
            <h1 className="mt-3 max-w-3xl font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">
              {guide.title}
            </h1>
            <div className="mt-2 max-w-2xl font-body-lg text-body-lg text-tertiary-fixed-dim">
              {guide.intro.map((paragraph, index) => (
                <p key={index} className="mt-2">
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3 font-label-sm text-xs text-tertiary-fixed-dim">
              <span>By <Link href="/about/" className="text-white underline hover:text-primary-fixed">Sameer Ahmad</Link></span>
              <span aria-hidden="true">•</span>
              <span>Updated October 2026</span>
              <span aria-hidden="true">•</span>
              <span>Verified mathematical accuracy</span>
            </div>
            <Link
              href={guide.cta.href}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-container px-5 py-3 font-label-md text-label-md text-white shadow-md transition-colors hover:bg-primary"
            >
              {guide.cta.label}
              <Icon name="arrow_forward" className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <div className="mx-auto w-full max-w-shell px-6 py-10">
          <article id="guide" className="max-w-[720px] scroll-mt-32">
            {guide.sections.map((section) => (
              <section key={section.heading} className="mt-10 first:mt-0" aria-label={section.heading}>
                <h2 className="font-display font-headline-md text-headline-md text-on-surface">{section.heading}</h2>
                {section.body.map((paragraph, index) => (
                  <div key={index} className="mt-4 font-body-md text-body-md leading-[1.7] text-on-surface-variant">
                    {paragraph}
                  </div>
                ))}
              </section>
            ))}
          </article>

          {/* Author Bio Box */}
          <div className="mt-10 rounded-2xl border border-surface-container bg-surface-container-low p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-white font-bold text-lg">
                SA
              </div>
              <div>
                <h3 className="font-display font-title-md text-on-surface">Written &amp; Verified by Sameer Ahmad</h3>
                <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
                  Founder &amp; software developer at Tulyro. Specializing in client-side computational architecture, transparent mathematical modeling, and zero-tracking privacy utilities. Read our <Link href="/about/" className="text-primary hover:underline">editorial standards</Link>.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 max-w-[900px]">
            <FAQ items={guide.faq} />
          </div>

          <section className="mt-12" aria-labelledby="related-heading">
            <div className="flex items-center justify-between">
              <h2 id="related-heading" className="font-display font-headline-md text-headline-md text-on-surface">
                Related tools
              </h2>
              <Link
                href={guide.pillar.href}
                className="flex items-center gap-1 font-label-md text-label-md text-primary hover:underline"
              >
                {guide.pillar.label}
                <Icon name="arrow_forward" className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.map((related) => (
                <ToolCard key={related.id} tool={related} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
