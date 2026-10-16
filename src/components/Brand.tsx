import Link from "next/link";
import { useId } from "react";

/** Tulyro "Node-T" mark. Gradient id is unique per instance (no duplicate-id collisions). */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const gid = `tulyro-hdr-${uid}`;
  return (
    <span
      className={`grid ${className} shrink-0 place-items-center overflow-hidden rounded-lg shadow-[0_0_16px_rgba(99,91,255,0.4)]`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7C74FF" />
            <stop offset="1" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect x="4" y="4" width="56" height="56" rx="16" fill={`url(#${gid})`} />
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
    <Link
      href="/"
      aria-label="Tulyro home"
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
    >
      <LogoMark />
      <span className={`font-display text-headline-sm font-extrabold tracking-tight ${dark ? "text-white" : "text-on-surface"}`}>
        Tulyro
      </span>
    </Link>
  );
}
