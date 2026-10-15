import type { ReactNode } from "react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { ToolCard } from "@/components/ToolCard";
import { getTool, type ToolDefinition } from "@/lib/tools";
import type { FAQItem } from "@/lib/content";

/** Honest per-tool hero pills (Stitch-style, no fabricated version numbers). */
const HERO_PILLS: Record<string, string> = {
  "age-calculator": "High Precision Utility • Client-Side Only",
  "emi-calculator": "Financial Engineering Suite • Instant Computation",
  "mortgage-calculator": "Home Loan Suite • Instant Computation",
  "bmi-calculator": "Biometric Health Suite • Screening Only",
  "cgpa-to-percentage": "Academic Grading Suite • CBSE 9.5",
  "word-counter": "Text Analytics Suite • Real-Time Parsing",
  "text-to-speech": "Web Speech Synthesis • In-Browser Audio",
  "fancy-text-generator": "Unicode Typography Suite • Client-Side Only",
  "base64-encoder-decoder": "Developer Encoding Suite • RFC 4648",
  "invoice-generator": "Client-Side Billing Engine • Zero Watermark",
  "fake-text-generator": "Chat Mockup Studio • Client-Side Only",
};

type ToolLayoutProps = {
  tool: ToolDefinition;
  children: ReactNode;
  intro: string;
  definition: string;
  howTo: string[];
  content: string[];
  faq: FAQItem[];
  sources?: { label: string; href: string }[];
  guides?: { label: string; href: string }[];
};

export function ToolLayout({ tool, children, intro, definition, howTo, content, faq, sources, guides }: ToolLayoutProps) {
  const relatedTools = tool.related.map((id) => getTool(id)).filter((related) => related.live);
  return (
    <>
      <Header />
      <a href="#tool" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-primary-container focus:px-4 focus:py-3 focus:text-white">
        Skip to tool
      </a>
      <main className="w-full bg-background">
        {/* Breadcrumb strip (Stitch tool screens) */}
        <section className="w-full border-b border-surface-container bg-surface-container-low/70 px-6 py-2.5">
          <div className="mx-auto flex max-w-shell items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
            <Breadcrumb tool={tool} />
            <div className="hidden items-center gap-4 font-body-sm text-body-sm sm:flex">
              <span className="flex items-center gap-1 text-tertiary">
                <Icon name="lock" className="h-[14px] w-[14px] text-primary" />
                Private Computation
              </span>
              <span className="text-outline-variant" aria-hidden="true">
                •
              </span>
              <span className="flex items-center gap-1 text-tertiary">
                <Icon name="speed" className="h-[14px] w-[14px] text-secondary" />
                Real-time Output
              </span>
            </div>
          </div>
        </section>

        {/* Midnight tool hero */}
        <section className="relative w-full overflow-hidden bg-midnight px-6 py-10 text-white shadow-md">
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 right-1/3 h-80 w-80 rounded-full bg-secondary-container/15 blur-2xl" aria-hidden="true" />
          <div className="relative z-10 mx-auto max-w-shell">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-code-data text-xs text-primary-fixed shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary-container animate-ping" aria-hidden="true" />
              {HERO_PILLS[tool.id] ?? "Client-Side Only"}
            </p>
            <h1 className="mt-3 font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">{tool.title}</h1>
            <p className="mt-2 max-w-2xl font-body-lg text-body-lg text-tertiary-fixed-dim">{intro}</p>
          </div>
        </section>

        {/* Workspace (per-tool panels render their own Stitch cards) */}
        <div className="mx-auto w-full max-w-shell px-6 py-10">
          <section id="tool" aria-label={`${tool.title} tool`} className="scroll-mt-32">
            {children}
          </section>

          <section className="mt-12 max-w-[720px]" aria-labelledby="definition-heading">
            <h2 id="definition-heading" className="font-display font-headline-md text-headline-md text-on-surface">
              What is {tool.title}?
            </h2>
            <p className="mt-4 font-body-md text-body-md leading-[1.6] text-on-surface-variant">{definition}</p>
          </section>

          <section className="mt-12 max-w-[720px]" aria-labelledby="how-to-heading">
            <h2 id="how-to-heading" className="font-display font-headline-md text-headline-md text-on-surface">
              How to use
            </h2>
            <ol className="mt-4 grid gap-3 md:grid-cols-3">
              {howTo.map((step, index) => (
                <li key={step} className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-card">
                  <span className="font-display font-semibold text-primary">{index + 1}. </span>
                  <span className="font-body-md text-body-md text-on-surface">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12 max-w-[720px]" aria-labelledby="about-tool-heading">
            <h2 id="about-tool-heading" className="font-display font-headline-md text-headline-md text-on-surface">
              About {tool.title}
            </h2>
            {content.map((paragraph) => (
              <p key={paragraph} className="mt-4 font-body-md text-body-md leading-[1.6] text-on-surface-variant">
                {paragraph}
              </p>
            ))}
          </section>

          <div className="mt-12 max-w-[900px]">
            <FAQ items={faq} />
          </div>

          {sources && sources.length > 0 ? (
            <section className="mt-12 max-w-[720px]" aria-labelledby="sources-heading">
              <h2 id="sources-heading" className="font-display font-headline-md text-headline-md text-on-surface">
                Sources
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {sources.map((source) => (
                  <li key={source.href} className="font-body-md text-body-md text-on-surface-variant">
                    <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {guides && guides.length > 0 ? (
            <section className="mt-12 max-w-[720px]" aria-labelledby="guides-heading">
              <h2 id="guides-heading" className="font-display font-headline-md text-headline-md text-on-surface">
                Related guides
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5">
                {guides.map((guide) => (
                  <li key={guide.href} className="font-body-md text-body-md text-on-surface-variant">
                    <a href={guide.href} className="text-primary underline">
                      {guide.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="mt-12" aria-labelledby="related-heading">
            <div className="flex items-center justify-between">
              <h2 id="related-heading" className="font-display font-headline-md text-headline-md text-on-surface">
                Related tools
              </h2>
              <a href="/tools/" className="flex items-center gap-1 font-label-md text-label-md text-primary hover:underline">
                View all 11 tools
                <Icon name="arrow_forward" className="h-4 w-4" />
              </a>
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
