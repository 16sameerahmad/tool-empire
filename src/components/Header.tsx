"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { CapsuleNav, NAV } from "@/components/CapsuleNav";

/** Focus the hero search (or fall back to the homepage search anchor). */
function scrollToSiteSearch() {
  const inputs = Array.from(document.querySelectorAll<HTMLInputElement>("[data-home-search]"));
  const visible = inputs.find((input) => input.offsetParent !== null);
  if (visible) {
    visible.scrollIntoView({ block: "center" });
    visible.focus({ preventScroll: true });
  } else {
    window.location.href = "/#search";
  }
}

const iconBtn =
  "grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-midnight/60 text-white backdrop-blur-xl transition-colors hover:bg-midnight/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Primary navigation: floating frosted capsule (logo + category links). */}
      <CapsuleNav />

      {/* Top-right floating cluster: search, Suggest Tool, menu. */}
      <div className="fixed right-3 top-3.5 z-50 flex items-center gap-2">
        <button type="button" onClick={scrollToSiteSearch} aria-label="Search tools" className={iconBtn}>
          <Icon name="search" className="h-[18px] w-[18px]" />
        </button>
        <Link
          href="/contact/"
          className="hidden h-10 items-center rounded-full border border-white/10 bg-midnight/60 px-4 font-label-md text-label-md text-white backdrop-blur-xl transition-colors hover:bg-midnight/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container sm:inline-flex"
        >
          Suggest Tool
        </Link>
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
          className={`${iconBtn} xl:hidden`}
          aria-label="Toggle navigation menu"
        >
          <Icon name={menuOpen ? "close" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile"
          className="fixed inset-x-4 top-[68px] z-50 rounded-2xl border border-white/10 bg-midnight/90 p-2 shadow-2xl backdrop-blur-xl xl:hidden"
        >
          <ul className="space-y-1">
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 font-label-md text-label-md text-tertiary-fixed-dim hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact/"
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-4 py-3 font-label-md text-label-md text-white hover:bg-white/5"
              >
                Suggest Tool
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}

      {/* Spacer matching the floating capsule. */}
      <div className="h-[76px]" aria-hidden="true" />

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
              onClick={scrollToSiteSearch}
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
