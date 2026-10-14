"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/icons";
import { tools } from "@/lib/tools";

const NAV = [
  { label: "Calculators", href: "/calculators/" },
  { label: "Text Tools", href: "/text/" },
  { label: "Developer Tools", href: "/dev/" },
  { label: "Productivity & Fun", href: "/fun/" },
  { label: "All Tools", href: "/tools/" },
];

function LogoMark() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg shadow-[0_0_16px_rgba(99,91,255,0.4)]" aria-hidden="true">
      <svg viewBox="0 0 64 64" className="h-9 w-9">
        <defs>
          <linearGradient id="tulyro-hdr" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7C74FF" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="16" fill="url(#tulyro-hdr)" />
        <rect x="15" y="17" width="34" height="10" rx="5" fill="#FFFFFF" />
        <rect x="27" y="27" width="10" height="23" rx="5" fill="#FFFFFF" />
        <circle cx="32" cy="27" r="9" fill="#FFFFFF" />
        <circle cx="32" cy="27" r="3.6" fill="#5B54F0" />
      </svg>
    </span>
  );
}

export function Logo({ dark = true }: { dark?: boolean }) {
  return (
    <Link href="/" aria-label="Tulyro home" className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container">
      <LogoMark />
      <span className={`font-display text-headline-sm font-extrabold tracking-tight ${dark ? "text-white" : "text-on-surface"}`}>
        Tulyro
      </span>
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return tools.filter((tool) => `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable;
      if (event.key === "/" && !typing) {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href.replace(/\/$/, "/")) || pathname === href.slice(0, -1);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-midnight text-white shadow-[0_4px_20px_rgba(7,20,47,0.15)]">
        {/* Utility strip (desktop only). "API Access" omitted — no API exists. */}
        <div className="hidden border-b border-white/5 bg-midnight-deep px-6 py-1.5 lg:block">
          <div className="mx-auto flex w-full max-w-shell items-center justify-between font-label-sm text-label-sm">
            <p className="flex items-center gap-2 text-tertiary-fixed-dim">
              <span className="flex h-2 w-2 rounded-full bg-primary-container animate-pulse" aria-hidden="true" />
              Ultra-Fast Client-Side Engine • Zero Server Logging • 100% Private Calculations
            </p>
            <p className="flex items-center gap-1 font-code-data text-code-data text-tertiary-fixed-dim">
              <Icon name="bolt" className="h-[14px] w-[14px] text-primary-fixed" />
              Computed locally in your browser
            </p>
          </div>
        </div>
        <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex items-center gap-6">
            <Logo />
            <nav className="hidden items-center gap-1 xl:flex" aria-label="Primary">
              {NAV.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-label-md text-label-md transition-all ${
                    isActive(item.href) ? "bg-white/10 font-semibold text-white" : "text-tertiary-fixed-dim hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.label === "All Tools" ? (
                    <span className="rounded bg-accent-violet/20 px-1.5 py-0.5 font-code-data text-[10px] text-accent-violet">11</span>
                  ) : null}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <label htmlFor="site-search" className="sr-only">
                Search tools
              </label>
              <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 hover:bg-white/10">
                <Icon name="search" className="h-4 w-4 text-tertiary-fixed-dim" />
                <input
                  id="site-search"
                  ref={inputRef}
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setOpen(true);
                  }}
                  onFocus={() => setOpen(true)}
                  onBlur={() => window.setTimeout(() => setOpen(false), 150)}
                  placeholder="Search tools..."
                  autoComplete="off"
                  className="w-32 bg-transparent font-body-sm text-body-sm text-white outline-none placeholder:text-tertiary-fixed-dim md:w-40"
                />
                <kbd className="rounded border border-white/10 bg-white/10 px-1.5 py-0.5 font-code-data text-[10px] text-white">/</kbd>
              </div>
              {open && query.trim() ? (
                <div className="absolute left-0 right-0 top-12 z-10 rounded-xl border border-outline-variant bg-surface-container-lowest p-2 shadow-lg">
                  {matches.length ? (
                    matches.map((tool) => (
                      <Link
                        key={tool.id}
                        href={tool.href}
                        onClick={() => {
                          setQuery("");
                          setOpen(false);
                        }}
                        className="block rounded-lg px-3 py-2 text-sm text-on-surface hover:bg-primary-fixed focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-container"
                      >
                        {tool.title}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm text-on-surface-variant">No tools found.</p>
                  )}
                </div>
              ) : null}
            </div>
            <Link
              href="/contact/"
              className="hidden items-center gap-1.5 rounded-lg border border-white/20 bg-transparent px-3 py-2 font-label-md text-label-md text-white hover:bg-white/10 sm:inline-flex"
            >
              Suggest Tool
            </Link>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 text-tertiary-fixed-dim hover:bg-white/10 hover:text-white xl:hidden"
              aria-label="Toggle navigation menu"
            >
              <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav id="mobile-navigation" aria-label="Mobile" className="border-t border-white/10 bg-midnight px-4 py-3 xl:hidden">
            <ul className="space-y-1">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-label-md text-label-md text-tertiary-fixed-dim hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact/" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2.5 font-label-md text-label-md text-white hover:bg-white/5">
                  Suggest Tool
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
      {/* Spacer matching the fixed header (bar 64px + desktop utility strip ~28px). */}
      <div className="h-16 lg:h-[92px]" aria-hidden="true" />
      {/* Mobile bottom-dock nav (DESIGN.md: midnight, 5 tabs). */}
      <nav aria-label="Mobile bottom navigation" className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-midnight md:hidden">
        <ul className="grid grid-cols-5">
          {[
            { label: "Home", href: "/", icon: "home" },
            { label: "Category", href: "/calculators/", icon: "category" },
            { label: "Tools", href: "/tools/", icon: "apps" },
          ].map((item) => (
            <li key={item.label}>
              <Link href={item.href} className="flex flex-col items-center gap-0.5 py-2 text-[10px] font-semibold text-tertiary-fixed-dim hover:text-white">
                <Icon name={item.icon} className="h-5 w-5" />
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() => {
                const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-home-search]"));
                const visible = inputs.find((input) => input.offsetParent !== null);
                if (visible) {
                  visible.scrollIntoView({ block: "center" });
                  visible.focus();
                } else {
                  window.location.href = "/#search";
                }
              }}
              className="flex w-full flex-col items-center gap-0.5 py-2 text-[10px] font-semibold text-tertiary-fixed-dim hover:text-white"
            >
              <Icon name="search" className="h-5 w-5" />
              Search
            </button>
          </li>
          <li>
            <button
              type="button"
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((value) => !value);
                window.scrollTo({ top: 0 });
              }}
              className="flex w-full flex-col items-center gap-0.5 py-2 text-[10px] font-semibold text-tertiary-fixed-dim hover:text-white"
            >
              <Icon name="menu" className="h-5 w-5" />
              Menu
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}
