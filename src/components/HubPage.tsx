import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { ToolCard } from "@/components/ToolCard";
import { getToolsByCluster, tools, type Cluster } from "@/lib/tools";

const HUB_COPY: Record<string, { pill: string; blurb: string }> = {
  Calculators: { pill: "Finance, Health & Math", blurb: "Free browser-only calculators for age, loans, BMI, and grades." },
  Text: { pill: "Writing & Voice", blurb: "Free browser-only text tools for counting, styling, and listening." },
  Dev: { pill: "Developer Utilities", blurb: "Free browser-only developer tools for encoding text." },
  Tools: { pill: "Everyday Work", blurb: "Free browser-only utilities for invoices and everyday work." },
  Fun: { pill: "Mockups & Entertainment", blurb: "Free browser-only mockup tools for sketches and entertainment." },
};

export function HubPage({ cluster }: { cluster: Cluster }) {
  const entries = getToolsByCluster(cluster);
  const copy = HUB_COPY[cluster];
  return (
    <>
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
  return (
    <>
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
                All Tools
              </span>
            </nav>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-code-data text-xs text-primary-fixed">Full Directory • 11 utilities</p>
            <h1 className="mt-3 font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">All tools</h1>
            <p className="mt-2 max-w-[720px] font-body-lg text-body-lg text-tertiary-fixed-dim">
              Every free browser-only tool on Tool Empire. No signup, no watermark, nothing sent to a server.
            </p>
          </div>
        </section>
        <div className="mx-auto max-w-shell px-6 py-10">
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
