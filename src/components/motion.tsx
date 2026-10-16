"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "@/components/icons";

/** Scroll-reveal wrapper: fades/slides in once when entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    // Safety fallback: never leave content invisible.
    const fallback = window.setTimeout(() => setVisible(true), 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`motion-reveal${visible ? " motion-reveal-visible" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms`, ["--reveal-y" as string]: `${y}px` }}
    >
      {children}
    </div>
  );
}

/** Animated counter: counts up to `to` when scrolled into view. */
export function CountUp({
  to,
  suffix = "",
  duration = 1200,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (started.current) return;
      started.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || duration <= 0) {
        setValue(to);
        return;
      }
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * to));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    // Safety fallback: never leave the counter stuck at 0.
    const fallback = window.setTimeout(run, 3000);
    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/** Subtle scroll parallax: translates children at `speed` × scrollY within the hero. */
export function Parallax({
  children,
  speed = 0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const offset = -rect.top * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {children}
    </div>
  );
}

/** Minimal circular SVG progress ring for tool processing/loading states.
 *  `progress` is 0–1. Animates via stroke-dashoffset (opacity-safe, GPU-friendly).
 *  Under prefers-reduced-motion the value jumps without animation. */
export function ProgressRing({
  progress,
  size = 20,
  stroke = 2.5,
  label,
  className = "",
}: {
  progress: number;
  size?: number;
  stroke?: number;
  label?: string;
  className?: string;
}) {
  const clamped = Math.min(1, Math.max(0, progress));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <span
      role="progressbar"
      aria-valuenow={Math.round(clamped * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Loading"}
      className={`inline-grid shrink-0 place-items-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.2"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - clamped)}
          className="progress-ring-arc"
        />
      </svg>
    </span>
  );
}

/** Smoothly morphing SVG icon for tool-state toggles (e.g. copy → copied check).
 *  Cross-fades + scales between two named icons — zero layout shift.
 *  Size via className (e.g. "h-4 w-4"). */
export function MorphIcon({
  from,
  to,
  morphed,
  className = "",
}: {
  from: string;
  to: string;
  morphed: boolean;
  className?: string;
}) {
  const layer = (hidden: boolean) =>
    `col-start-1 row-start-1 h-full w-full transition-all duration-150 ease-out motion-reduce:transition-none ${
      hidden ? "scale-[0.6] opacity-0" : "scale-100 opacity-100"
    }`;
  return (
    <span className={`relative inline-grid shrink-0 place-items-center ${className}`} aria-hidden="true">
      <span className={layer(morphed)}>
        <Icon name={from} className="h-full w-full" />
      </span>
      <span className={layer(!morphed)}>
        <Icon name={to} className="h-full w-full" />
      </span>
    </span>
  );
}
