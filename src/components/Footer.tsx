import Link from "next/link";
import { Icon } from "@/components/icons";
import { Logo } from "@/components/Brand";
import { getToolsByCluster } from "@/lib/tools";

const linkClass = "rounded font-body-sm text-body-sm text-tertiary-fixed-dim transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative w-full border-t border-white/5 bg-midnight pb-space-lg pt-space-xl text-white">
      {/* Blend the light content above into the midnight footer — no hard edge. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-surface to-transparent" />
      <div className="mx-auto max-w-shell px-6">
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
