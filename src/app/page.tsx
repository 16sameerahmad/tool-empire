import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroEmiSimulator } from "@/components/HeroEmiSimulator";
import { HomeSearch } from "@/components/HomeSearch";
import { Icon } from "@/components/icons";
import { MobileAgeSnapshot } from "@/components/MobileAgeSnapshot";
import { Parallax, Reveal, CountUp } from "@/components/motion";
import { ToolCard } from "@/components/ToolCard";
import { getTool } from "@/lib/tools";
import { createWebSiteJsonLd, siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Tulyro | Free Online Tools & Calculators",
  description: "Tulyro offers free browser-only calculators, text tools, and developer utilities. No signup, no watermark — everything runs on your device.",
  alternates: { canonical: `${siteUrl}/` },
};

const TRENDING = [
  { id: "age-calculator", label: "Age Calculator" },
  { id: "emi-calculator", label: "EMI Calculator" },
  { id: "word-counter", label: "Word Counter" },
  { id: "base64-encoder-decoder", label: "Base64" },
  { id: "fancy-text-generator", label: "Fancy Text" },
];
const POPULAR = [
  { id: "age-calculator", badge: "Calculator" },
  { id: "emi-calculator", badge: "Finance" },
  { id: "word-counter", badge: "Text Utility" },
  { id: "mortgage-calculator", badge: "Finance" },
  { id: "base64-encoder-decoder", badge: "Developer" },
  { id: "fancy-text-generator", badge: "Text Utility" },
  { id: "cgpa-to-percentage", badge: "Academic" },
  { id: "text-to-speech", badge: "Media & Fun" },
];
const CATEGORIES = [
  { label: "Calculators", href: "/calculators/", count: "5 tools", icon: "calculate", hover: "group-hover:bg-primary-container group-hover:text-on-primary-container" },
  { label: "Text Tools", href: "/text/", count: "3 tools", icon: "font_download", hover: "group-hover:bg-secondary group-hover:text-on-secondary" },
  { label: "Developer Tools", href: "/dev/", count: "1 tool", icon: "terminal", hover: "group-hover:bg-tertiary group-hover:text-on-tertiary" },
  { label: "Fun Tools", href: "/fun/", count: "2 tools", icon: "auto_awesome", hover: "group-hover:bg-primary-container group-hover:text-on-primary-container" },
  { label: "All Tools", href: "/tools/", count: "11 utilities", icon: "apps", hover: "group-hover:bg-surface-tint group-hover:text-on-primary" },
];
const TRUST = [
  { title: "11 Free Utilities", sub: "Finance, Math, Text & Dev tools", icon: "calculate", tint: "bg-primary-fixed text-primary-container" },
  { title: "100% Client-Side", sub: "Zero payload sent to servers", icon: "lock", tint: "bg-secondary-fixed text-secondary" },
  { title: "Instant Compute", sub: "Computed locally in your browser", icon: "speed", tint: "bg-tertiary-fixed text-tertiary" },
  { title: "No Signup", sub: "Start instantly, nothing to install", icon: "bolt", tint: "bg-surface-container-high text-on-surface" },
];
const BLUEPRINT = [
  { title: "Zero Storage", body: "Nothing you enter is sent to a server or stored by our code.", icon: "security" },
  { title: "No Signup", body: "Start instantly, nothing to install. No accounts, no passwords.", icon: "verified" },
  { title: "Computed Locally", body: "Plain JavaScript logic that runs in your browser, verified by tests.", icon: "memory" },
  { title: "Private by Design", body: "No accounts, no saved history, no database.", icon: "cookie_off" },
];
/* Mobile-home (Stitch mobile skeleton) content — real tools, real counts, short labels. */
const MOBILE_STATS = [
  { value: "11", label: "Free Utilities", icon: "apps" },
  { value: "100%", label: "Client-Side", icon: "verified" },
  { value: "No", label: "Signup", icon: "lock_open" },
  { value: "Instant", label: "In-Browser Compute", icon: "wifi_off" },
];
const MOBILE_POPULAR = [
  { id: "age-calculator", label: "Age Calculator", badge: "Calculator", tint: "bg-primary-fixed text-primary-container" },
  { id: "emi-calculator", label: "EMI Calculator", badge: "Finance", tint: "bg-secondary-fixed text-secondary" },
  { id: "word-counter", label: "Word Counter", badge: "Text Utility", tint: "bg-tertiary-fixed text-tertiary" },
  { id: "bmi-calculator", label: "BMI Calculator", badge: "Calculator", tint: "bg-primary-fixed text-primary-container" },
  { id: "cgpa-to-percentage", label: "CGPA to Percentage", badge: "Academic", tint: "bg-secondary-fixed text-secondary" },
  { id: "text-to-speech", label: "Text to Speech", badge: "Media & Fun", tint: "bg-tertiary-fixed text-tertiary" },
  { id: "base64-encoder-decoder", label: "Base64 Encoder & Decoder", badge: "Developer", tint: "bg-primary-fixed text-primary-container" },
];
const MOBILE_CATEGORIES = [
  { label: "Calculators", sub: "Finance, Health & Math", href: "/calculators/", count: "5 tools", icon: "calculate", tint: "bg-primary-fixed text-primary-container" },
  { label: "Text Tools", sub: "Counting, styling & voice", href: "/text/", count: "3 tools", icon: "article", tint: "bg-secondary-fixed text-secondary" },
  { label: "Developer Tools", sub: "Base64 encoding", href: "/dev/", count: "1 tool", icon: "terminal", tint: "bg-tertiary-fixed text-tertiary" },
  { label: "Fun Tools", sub: "Mockups & entertainment", href: "/fun/", count: "2 tools", icon: "smile", tint: "bg-primary-fixed text-primary-container" },
  { label: "All Tools", sub: "Every utility in one place", href: "/tools/", count: "11 utilities", icon: "apps", tint: "bg-secondary-fixed text-secondary" },
];

function TrendingRow() {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed-dim">Quick links:</span>
      {TRENDING.map((entry) => (
        <Link key={entry.id} href={getTool(entry.id).href} className="rounded-md bg-white/10 px-2.5 py-1 font-label-sm text-label-sm text-tertiary-fixed transition-colors hover:bg-white/20">
          {entry.label}
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  const webSiteJsonLd = createWebSiteJsonLd();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }} />
      <Header />
      <a href="#browse" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-20 focus:rounded-lg focus:bg-primary-container focus:px-4 focus:py-3 focus:text-white">
        Skip to tools
      </a>
      <main className="w-full bg-background">
        {/* Hero — Stitch midnight command zone */}
        <section className="relative w-full overflow-hidden bg-midnight pb-20 pt-12 text-on-primary shadow-2xl">
          <Parallax speed={0.1} className="pointer-events-none absolute inset-0">
            <div className="hero-grid absolute inset-0 opacity-40" aria-hidden="true" />
          </Parallax>
          <Parallax speed={0.18} className="pointer-events-none absolute inset-0">
            <div className="hero-drift absolute -left-20 -top-32 h-96 w-96 rounded-full bg-primary-container opacity-40 blur-[128px]" aria-hidden="true" />
            <div className="hero-drift-slow absolute -right-24 top-1/2 h-[32rem] w-[32rem] rounded-full bg-secondary-container opacity-40 blur-[140px]" aria-hidden="true" />
          </Parallax>
          {/* Desktop hero (Stitch desktop homepage) */}
          <div className="relative z-10 mx-auto hidden max-w-shell px-6 lg:block">
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className="flex flex-col space-y-6 lg:col-span-7">
                <p className="hero-enter inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-label-sm text-label-sm text-tertiary-fixed shadow-inner" style={{ ["--enter-delay" as string]: "0ms" }}>
                  <span className="flex h-2 w-2 rounded-full bg-primary-container animate-ping" aria-hidden="true" />
                  11 free tools • No signup • Private by design
                </p>
                <h1 className="hero-enter font-display font-display-hero leading-[1.08] tracking-tight text-white" style={{ ["--enter-delay" as string]: "90ms" }}>
                  Precision tools for
                  <br className="hidden sm:inline" />{" "}
                  <span className="bg-gradient-to-r from-primary-fixed to-secondary-fixed bg-clip-text text-transparent">everyday numbers.</span>
                </h1>
                <p className="hero-enter max-w-xl font-body-lg text-body-lg leading-relaxed text-tertiary-fixed" style={{ ["--enter-delay" as string]: "180ms" }}>
                  EMI, age, BMI, word counts, Base64 and 6 more — 11 free utilities running entirely in your browser. No signup, no tracking, no waiting.
                </p>
                <div className="hero-enter flex flex-wrap items-center gap-3" style={{ ["--enter-delay" as string]: "270ms" }}>
                  <Link href="#browse" className="group inline-flex items-center gap-2 rounded-xl bg-primary-container px-6 py-3 font-label-md text-label-md font-semibold text-white shadow-button-glow transition-all hover:bg-primary">
                    Browse all 11 tools
                    <Icon name="arrow_forward" className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link href="#why-tulyro" className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-label-md text-label-md font-semibold text-white transition-colors hover:bg-white/10">
                    Why Tulyro?
                  </Link>
                </div>
                <div className="hero-enter relative z-10" style={{ ["--enter-delay" as string]: "360ms" }}>
                  <HomeSearch variantId="desktop" />
                </div>
                <div className="hero-enter" style={{ ["--enter-delay" as string]: "450ms" }}>
                  <TrendingRow />
                </div>
              </div>
              <div className="hero-enter-scale flex justify-center lg:col-span-5" style={{ ["--enter-delay" as string]: "320ms" }}>
                <HeroEmiSimulator />
              </div>
            </div>
          </div>
          {/* Mobile hero (Stitch mobile homepage) */}
          <div className="relative z-10 mx-auto max-w-shell px-4 lg:hidden">
            <div className="flex flex-col gap-4">
              <p className="hero-enter inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3 py-1 font-label-sm text-label-sm text-tertiary-fixed" style={{ ["--enter-delay" as string]: "0ms" }}>
                <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse" aria-hidden="true" />
                11 free tools • No signup • Private by design
              </p>
              <div className="hero-enter font-display font-display-hero-mobile tracking-tight text-white" style={{ ["--enter-delay" as string]: "90ms" }}>
                Precision tools for{" "}
                <span className="bg-gradient-to-r from-primary-fixed to-secondary-fixed bg-clip-text text-transparent">
                  everyday numbers.
                </span>
              </div>
              <p className="hero-enter font-body-md text-body-md leading-relaxed text-tertiary-fixed" style={{ ["--enter-delay" as string]: "180ms" }}>
                Age, EMI, BMI, word count, Base64 and 6 more — everything runs in your browser. Nothing you type ever leaves your phone.
              </p>
              <div className="hero-enter flex flex-wrap items-center gap-2.5" style={{ ["--enter-delay" as string]: "270ms" }}>
                <Link href="#browse-mobile" className="group inline-flex items-center gap-1.5 rounded-xl bg-primary-container px-5 py-2.5 font-label-md text-label-md font-semibold text-white shadow-button-glow transition-all hover:bg-primary">
                  Browse all 11 tools
                  <Icon name="arrow_forward" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link href="#why-tulyro-mobile" className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-5 py-2.5 font-label-md text-label-md font-semibold text-white transition-colors hover:bg-white/10">
                  Why Tulyro?
                </Link>
              </div>
              <div className="hero-enter relative z-10" style={{ ["--enter-delay" as string]: "360ms" }}>
                <HomeSearch variantId="mobile" />
              </div>
              <div className="hero-enter" style={{ ["--enter-delay" as string]: "450ms" }}>
                <TrendingRow />
              </div>
              <div className="hero-enter-scale mt-2" style={{ ["--enter-delay" as string]: "400ms" }}>
                <MobileAgeSnapshot />
              </div>
            </div>
          </div>
        </section>

        {/* Trust strip (desktop) */}
        <section className="hidden w-full bg-surface-container-low py-8 shadow-sm lg:block" aria-label="Why Tulyro">
          <div className="mx-auto max-w-shell px-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {TRUST.map((item, i) => (
                <Reveal key={item.title} delay={i * 90}>
                <div className="flex items-center gap-4 rounded-xl bg-surface-container-lowest p-4 shadow-sm transition-shadow hover:shadow-md">
                  <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg ${item.tint}`}>
                    <Icon name={item.icon} className="h-[26px] w-[26px]" />
                  </span>
                  <span>
                    <span className="block font-display font-headline-sm text-headline-sm font-bold text-on-surface">{
                      item.title === "11 Free Utilities" ? <><CountUp to={11} /> Free Utilities</> : item.title
                    }</span>
                    <span className="block font-body-sm text-body-sm text-on-surface-variant">{item.sub}</span>
                  </span>
                </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Stat strip (mobile) */}
        <section className="w-full bg-surface-container-low px-4 py-4 lg:hidden" aria-label="Site facts">
          <div className="grid grid-cols-4 gap-2">
            {MOBILE_STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center rounded-xl bg-surface-container-lowest px-1 py-3 text-center shadow-sm">
                <Icon name={stat.icon} className="h-5 w-5 text-primary-container" />
                <span className="mt-1 font-display font-headline-sm text-headline-sm font-bold text-on-surface">{stat.value}</span>
                <span className="font-body-sm text-body-sm leading-tight text-on-surface-variant">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Most Popular Tools (desktop) */}
        <section id="browse" className="hidden w-full scroll-mt-32 bg-surface py-16 lg:block">
          <div className="mx-auto max-w-shell px-6">
            <Reveal>
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="inline-flex items-center gap-1.5 rounded-md bg-primary-fixed px-3 py-1 font-label-sm text-label-sm uppercase tracking-wide text-on-primary-fixed">
                  Engineered For Precision
                </p>
                <h2 className="mt-3 font-display font-headline-lg text-headline-lg text-on-surface">Featured Tools</h2>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Frequently used calculators, string analyzers, and developer utilities.</p>
              </div>
              <Link href="/tools/" className="group inline-flex items-center gap-1 font-label-md text-label-md font-semibold text-primary transition-all hover:text-primary-container">
                View all 11 tools
                <Icon name="arrow_forward" className="h-[18px] w-[18px] transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            </Reveal>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {POPULAR.map((entry, i) => (
                <Reveal key={entry.id} delay={(i % 4) * 80}>
                  <ToolCard tool={getTool(entry.id)} badge={entry.badge} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Popular Utilities list (mobile) */}
        <section id="browse-mobile" className="w-full scroll-mt-32 bg-surface px-4 py-8 lg:hidden" aria-label="Popular utilities">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 font-display font-headline-sm text-headline-sm text-on-surface">
              <Icon name="flame" className="h-5 w-5 text-primary-container" />
              Featured Utilities
            </h2>
            <Link href="/tools/" className="flex items-center gap-0.5 font-label-md text-label-md font-semibold text-primary">
              View all (11)
              <Icon name="chevron_right" className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-2">
            {MOBILE_POPULAR.map((entry) => {
              const tool = getTool(entry.id);
              return (
                <Link key={entry.id} href={tool.href} className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${entry.tint}`}>
                    <Icon name={entry.id === "bmi-calculator" ? "monitor_weight" : entry.id === "text-to-speech" ? "record_voice_over" : entry.id === "base64-encoder-decoder" ? "code" : entry.id === "cgpa-to-percentage" ? "percent" : entry.id === "word-counter" ? "description" : entry.id === "emi-calculator" ? "account_balance" : "calendar_month"} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 font-display text-sm font-semibold text-on-surface">
                      {entry.label}
                      {entry.badge ? <span className="rounded bg-surface-container-high px-1.5 py-0.5 font-label-sm text-[10px] text-on-surface-variant">{entry.badge}</span> : null}
                    </span>
                    <span className="block truncate font-body-sm text-body-sm text-on-surface-variant">{tool.description}</span>
                  </span>
                  <Icon name="arrow_forward" className="h-4 w-4 shrink-0 text-outline-variant" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Browse by Category (desktop) */}
        <section className="hidden w-full bg-surface-container-low py-16 lg:block">
          <div className="mx-auto max-w-shell px-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="font-display font-headline-lg text-headline-lg text-on-surface">Browse by Category</h2>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Explore the whole catalogue, categorized for focused workflows.</p>
              </div>
              <Link href="/tools/" className="hidden items-center gap-1 font-label-md text-label-md font-semibold text-primary hover:text-primary-container sm:inline-flex">
                View All Categories
                <Icon name="arrow_forward" className="h-[18px] w-[18px]" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {CATEGORIES.map((category) => (
                <Link
                  key={category.label}
                  href={category.href}
                  className="group flex flex-col items-center rounded-xl bg-surface-container-lowest p-6 text-center shadow-sm transition-all hover:shadow-lg"
                >
                  <span className={`grid h-14 w-14 place-items-center rounded-2xl bg-primary-fixed text-primary transition-colors ${category.hover}`}>
                    <Icon name={category.icon} className="h-7 w-7" />
                  </span>
                  <span className="mt-3 font-display font-headline-sm text-headline-sm font-semibold text-on-surface transition-colors group-hover:text-primary">
                    {category.label}
                  </span>
                  <span className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{category.count}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Explore Categories rows (mobile) */}
        <section className="w-full bg-surface-container-low px-4 py-8 lg:hidden" aria-label="Explore categories">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-1.5 font-display font-headline-sm text-headline-sm text-on-surface">
              <Icon name="category" className="h-5 w-5 text-primary-container" />
              Explore Categories
            </h2>
            <span className="font-label-md text-label-md text-on-surface-variant">5 Directories</span>
          </div>
          <div className="space-y-2">
            {MOBILE_CATEGORIES.map((category) => (
              <Link key={category.label} href={category.href} className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-3 shadow-sm">
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg ${category.tint}`}>
                  <Icon name={category.icon} className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-sm font-semibold text-on-surface">{category.label}</span>
                  <span className="block truncate font-body-sm text-body-sm text-on-surface-variant">{category.sub}</span>
                </span>
                <span className="shrink-0 font-label-sm text-label-sm text-on-surface-variant">{category.count}</span>
                <Icon name="chevron_right" className="h-4 w-4 shrink-0 text-outline-variant" />
              </Link>
            ))}
          </div>
        </section>

        {/* Blueprint / Why section (desktop) */}
        <section id="why-tulyro" className="hidden w-full scroll-mt-32 bg-surface py-16 lg:block">
          <div className="mx-auto max-w-shell px-6">
            <div className="relative overflow-hidden rounded-2xl bg-midnight p-8 text-on-primary shadow-2xl lg:p-12">
              <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-primary-container/20 blur-[100px]" aria-hidden="true" />
              <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-6">
                  <p className="inline-flex items-center gap-2 rounded bg-white/10 px-3 py-1 font-code-data text-code-data text-xs text-primary-fixed">
                    <Icon name="security" className="h-4 w-4" />
                    ENGINEERING BLUEPRINT
                  </p>
                  <h2 className="font-display font-headline-lg text-headline-lg text-white">Why engineers and analysts rely on Tulyro</h2>
                  <p className="font-body-md text-body-md text-tertiary-fixed">
                    Unlike ordinary web portals that pipe sensitive calculations through remote servers, Tulyro runs 100% in your browser — nothing you type is sent to a server.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Link href="/privacy/" className="rounded-lg bg-primary-container px-5 py-2.5 font-label-md text-label-md text-white shadow-button-glow transition-colors hover:bg-primary">
                      Security Model
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
                  {BLUEPRINT.map((card) => (
                    <div key={card.title} className="rounded-xl bg-white/5 p-5 shadow-inner backdrop-blur-sm">
                      <Icon name={card.icon} className="mb-2 h-[26px] w-[26px] text-secondary-fixed" />
                      <p className="font-display font-headline-sm text-headline-sm font-semibold text-white">{card.title}</p>
                      <p className="mt-1 font-body-sm text-body-sm text-tertiary-fixed">{card.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy First Engine card (mobile) */}
        <section id="why-tulyro-mobile" className="w-full scroll-mt-32 bg-surface px-4 pb-8 lg:hidden" aria-label="Privacy">
          <div className="rounded-2xl bg-midnight p-5 text-white shadow-card">
            <p className="flex items-center gap-2 font-display font-headline-sm text-headline-sm">
              <Icon name="security" className="h-5 w-5 text-primary-fixed" />
              Privacy First Engine
            </p>
            <p className="mt-2 font-body-sm text-body-sm leading-relaxed text-tertiary-fixed">
              100% of text and calculations run locally on your device browser. No logs. No servers watching your numbers.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded bg-white/10 px-2 py-1 font-code-data text-xs text-primary-fixed">Client-Side Only</span>
              <span className="rounded bg-white/10 px-2 py-1 font-code-data text-xs text-secondary-fixed">Computed Locally</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
