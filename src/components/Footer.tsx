import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/Brand";
import { getToolsByCluster } from "@/lib/tools";

const linkClass = "rounded font-body-sm text-body-sm text-tertiary-fixed-dim transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container";

/** Footer site directory — Argon Day 1 (1C): tools grouped by topical silo + top guides. */
const DIRECTORY: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Finance & Business Tools",
    links: [
      { label: "Loan EMI Calculator (₹)", href: "/calculators/emi-calculator/" },
      { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator/" },
      { label: "Free Invoice Generator", href: "/tools/invoice-generator/" },
    ],
  },
  {
    heading: "Academic, Health & Date",
    links: [
      { label: "CGPA to Percentage Calculator", href: "/calculators/cgpa-to-percentage/" },
      { label: "BMI Calculator (Metric & Imperial)", href: "/calculators/bmi-calculator/" },
      { label: "Exact Age Calculator", href: "/calculators/age-calculator/" },
    ],
  },
  {
    heading: "Text, Creator & Dev Tools",
    links: [
      { label: "Word & Character Counter", href: "/text/word-counter/" },
      { label: "Browser Text-to-Speech", href: "/text/text-to-speech/" },
      { label: "Fancy Text Font Generator", href: "/text/fancy-text-generator/" },
      { label: "Base64 Encoder & Decoder", href: "/dev/base64-encoder-decoder/" },
      { label: "Fake Text Message Generator", href: "/fun/fake-text-generator/" },
    ],
  },
];

const GUIDE_LINKS: { label: string; href: string }[] = [
  { label: "How to Calculate EMI by Hand", href: "/guides/how-to-calculate-emi/" },
  { label: "EMI Calculator vs Mortgage Calculator: Which One to Use", href: "/guides/emi-vs-mortgage-calculator/" },
  { label: "CGPA to Percentage: The CBSE ×9.5 Rule, Explained", href: "/guides/cgpa-to-percentage-cbse-9-5-rule/" },
  { label: "How to Calculate BMI by Hand: Formula, Examples, Metric and Imperial", href: "/guides/how-to-calculate-bmi/" },
  { label: "Calculate Age in Excel: 3 Formulas That Work", href: "/guides/calculate-age-in-excel/" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-white/5 bg-midnight pb-space-lg pt-space-xl text-white">
      {/* Blend the light content above into the midnight footer — no hard edge. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent" />
      <div className="mx-auto max-w-shell px-6">
        {/* Site directory — every tool one click from the footer, on every page. */}
        <nav aria-label="All tools directory" className="mb-space-xl border-b border-white/10 pb-space-lg">
          <h2 className="font-headline-sm text-headline-sm text-white">Browse All Tools</h2>
          <div className="mt-4 grid grid-cols-2 gap-6 md:grid-cols-4">
            {DIRECTORY.map((group) => (
              <div key={group.heading}>
                <h3 className="font-label-md text-label-md font-semibold uppercase tracking-wider text-tertiary-fixed">{group.heading}</h3>
                <ul className="mt-2 space-y-2">
                  {group.links.map((entry) => (
                    <li key={entry.href}>
                      <Link className={linkClass} href={entry.href}>
                        {entry.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h3 className="font-label-md text-label-md font-semibold uppercase tracking-wider text-tertiary-fixed">
                <Link className="rounded transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container" href="/guides/">
                  Guides &amp; Formulas
                </Link>
              </h3>
              <ul className="mt-2 space-y-2">
                {GUIDE_LINKS.map((entry) => (
                  <li key={entry.href}>
                    <Link className={linkClass} href={entry.href}>
                      {entry.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link className={linkClass} href="/guides/">
                    View All 9 Guides →
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="mb-space-xl grid grid-cols-1 gap-space-lg md:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <Logo />
            <p className="max-w-sm font-body-sm text-body-sm text-tertiary-fixed-dim">
              Free browser-only utilities engineered for everyday calculations, text work, and developer tasks. Nothing you enter is sent to a server.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-code-data text-[11px] text-primary-fixed">100% Client-Side</span>
              <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-code-data text-[11px] text-secondary-fixed">Zero Tracking</span>
            </div>
          </div>
          <nav aria-label="Calculators">
            <h3 className="font-headline-sm text-headline-sm text-white">Calculators</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className={linkClass} href="/calculators/">
                  All Calculators
                </Link>
              </li>
              {getToolsByCluster("Calculators").map((tool) => (
                <li key={tool.id}>
                  <Link className={linkClass} href={tool.href}>
                    {tool.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Workspaces">
            <h3 className="font-headline-sm text-headline-sm text-white">Workspaces</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className={linkClass} href="/text/">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/dev/">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/fun/">
                  Fun Tools
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/tools/">
                  Tool Directory
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/guides/">
                  Guides &amp; Formulas
                </Link>
              </li>
            </ul>
          </nav>
          <nav aria-label="Company and legal">
            <h3 className="font-headline-sm text-headline-sm text-white">Company &amp; Legal</h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link className={linkClass} href="/about/">
                  About
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/contact/">
                  Contact
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/privacy/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className={linkClass} href="/terms/">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-4 font-body-sm text-body-sm text-tertiary-fixed sm:flex-row">
          <p>© {year} Tulyro. Fast, Private, Client-Side Utilities.</p>
          <p className="flex items-center gap-1 font-code-data text-code-data text-primary-fixed">
            <Icon name="verified_user" className="h-[14px] w-[14px]" />
            100% In-Browser Execution
          </p>
        </div>
      </div>
    </footer>
  );
}
