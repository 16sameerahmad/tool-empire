"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/Brand";

/** Primary site sections — the capsule's links. */
export const NAV = [
  { label: "Calculators", href: "/calculators/" },
  { label: "Text Tools", href: "/text/" },
  { label: "Developer Tools", href: "/dev/" },
  { label: "Fun Tools", href: "/fun/" },
  { label: "All Tools", href: "/tools/" },
];

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href.replace(/\/$/, "/")) || pathname === href.slice(0, -1);
}

type Spring = { x: number; v: number; g: number; k: number; c: number; e: number };

/**
 * Capsule Nav — ported from the vividsites "capsule-nav" component (pure CSS + JS, zero deps).
 * Frosted rounded-full capsule; the active pill slides on two edge springs (leading edge
 * stiffer, trailing edge softer) so it stretches with velocity; labels re-ink under the pill
 * via a clipped ink copy. Hides on scroll down, returns on first scroll up, compacts past
 * `data-compact-at`. All motion is GPU-friendly (transform / clip-path / opacity).
 */
export function CapsuleNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const activeIndex = NAV.findIndex((item) => isActive(pathname, item.href));
  const activeRef = useRef(activeIndex);
  activeRef.current = activeIndex;

  useEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;
    const nav: HTMLElement = navEl;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* ---- spring engine (semi-implicit Euler, 120 Hz substeps) ---- */
    type Tickable = { update: (dt: number) => boolean };
    const live = new Set<Tickable>();
    let raf = 0;
    let last = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.064, (now - last) / 1000 || 0.016);
      last = now;
      for (const t of live) if (!t.update(dt)) live.delete(t);
      raf = live.size ? requestAnimationFrame(tick) : 0;
    };
    const wake = (t: Tickable) => {
      live.add(t);
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const sp = (x: number, k: number, c: number, e = 0.05): Spring => ({ x, v: 0, g: x, k, c, e });
    const run = (s: Spring, dt: number): boolean => {
      if (reduce.matches) {
        s.x = s.g;
        s.v = 0;
        return false;
      }
      const n = Math.max(1, Math.ceil(dt * 120));
      const h = dt / n;
      for (let i = 0; i < n; i++) {
        s.v += (-s.k * (s.x - s.g) - s.c * s.v) * h;
        s.x += s.v * h;
      }
      if (Math.abs(s.v) < s.e && Math.abs(s.x - s.g) < s.e) {
        s.x = s.g;
        s.v = 0;
        return false;
      }
      return true;
    };
    const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
    /* Aim a pair of edge springs: the edge in the direction of travel leads (stiffer). */
    const aim = (L: Spring, R: Spring, l: number, r: number, lead: [number, number], trail: [number, number]) => {
      const dir = l + r - (L.g + R.g);
      const [a, b] = dir >= 0 ? [R, L] : [L, R];
      a.k = lead[0];
      a.c = lead[1];
      b.k = trail[0];
      b.c = trail[1];
      L.g = l;
      R.g = r;
    };
    const PILL: [[number, number], [number, number]] = [
      [560, 36],
      [240, 27],
    ];
    const GHOST: [[number, number], [number, number]] = [
      [440, 36],
      [230, 29],
    ];

    const bar = nav.querySelector<HTMLElement>(".vs-capsule-nav-bar");
    const track = nav.querySelector<HTMLElement>(".vs-capsule-nav-track");
    const ghost = nav.querySelector<HTMLElement>(".vs-capsule-nav-ghost");
    const shade = nav.querySelector<HTMLElement>(".vs-capsule-nav-shade");
    const pill = nav.querySelector<HTMLElement>(".vs-capsule-nav-pill");
    const ul = nav.querySelector<HTMLUListElement>(".vs-capsule-nav-track > .vs-capsule-nav-list");
    if (!bar || !track || !ghost || !shade || !pill || !ul) return;
    // The frosted action cluster lives in the same .site-header row — hide it with the bar.
    const cluster = nav.closest(".site-header")?.querySelector<HTMLElement>(".site-header-cluster") ?? null;
    pill.inert = true;
    const links = [...ul.querySelectorAll<HTMLAnchorElement>(".vs-capsule-nav-link")];
    if (!links.length) return;

    let G: { l: number; r: number }[] = [];
    let W = 0;
    let H = 0;
    let D = 80;
    const measure = () => {
      W = track.offsetWidth;
      H = track.offsetHeight;
      G = links.map((a) => ({ l: a.offsetLeft, r: a.offsetLeft + a.offsetWidth }));
      D = (nav.getBoundingClientRect().top || 0) + bar.offsetHeight + 28;
    };
    measure();

    let active = activeRef.current;
    const at = (i: number) => (i >= 0 && i < G.length ? G[i] : { l: 0, r: 0 });
    const S = {
      L: sp(at(active).l, 560, 36),
      R: sp(at(active).r, 560, 36),
      gl: sp(at(active).l, 440, 36),
      gr: sp(at(active).r, 440, 36),
      go: sp(0, 320, 30, 0.002),
      press: sp(0, 700, 40, 0.002),
      hy: sp(0, 300, 32, 0.1),
      cp: sp(0, 170, 26, 0.002),
    };
    const all = [S.L, S.R, S.gl, S.gr, S.go, S.press, S.hy, S.cp];
    let hot = -1;
    let pressed = -1;
    let hidden = false;

    const api: Tickable = {
      update(dt: number): boolean {
        let moving = false;
        for (const s of all) if (run(s, dt)) moving = true;
        const { L, R, gl, gr, go, press, hy, cp } = S;
        // Pill: velocity squash (px/s -> px) + press pinch.
        const v = (L.v + R.v) / 2;
        const pp = pressed === active ? press.x : 0;
        const sq = Math.min(H * 0.1, Math.abs(v) * 0.0011) + pp * 1.6;
        const l = L.x + pp * 2;
        const r = R.x - pp * 2;
        pill.style.clipPath = `inset(${sq.toFixed(2)}px ${(W - r).toFixed(2)}px ${sq.toFixed(2)}px ${l.toFixed(2)}px round 999px)`;
        shade.style.transform = `translate3d(${l.toFixed(2)}px,0,0) scale(${((r - l) / 100).toFixed(4)},${(1 - (2 * sq) / H).toFixed(4)})`;
        const gp = pressed >= 0 && pressed !== active ? press.x * 1.5 : 0;
        ghost.style.clipPath = `inset(${gp.toFixed(2)}px ${(W - gr.x + gp).toFixed(2)}px ${gp.toFixed(2)}px ${(gl.x + gp).toFixed(2)}px round 999px)`;
        ghost.style.opacity = go.x.toFixed(3);
        const hp = clamp(hy.x / D, -0.2, 1);
        bar.style.transform = `translate3d(0,${(-hy.x).toFixed(2)}px,0) scale(${(1 - 0.07 * cp.x - 0.05 * Math.max(0, hp)).toFixed(4)})`;
        bar.style.opacity = (1 - 0.45 * Math.max(0, hp)).toFixed(3);
        if (cluster) {
          cluster.style.transform = `translate3d(0,${(-hy.x).toFixed(2)}px,0)`;
          cluster.style.opacity = (1 - 0.45 * Math.max(0, hp)).toFixed(3);
        }
        nav.style.setProperty("--c", cp.x.toFixed(3));
        return moving;
      },
    };

    function setHidden(h: boolean, v: number) {
      if (reduce.matches && h) return; // reduced motion: never hide on scroll
      if (h === hidden) return;
      hidden = h;
      S.hy.g = h ? D : 0;
      S.hy.k = h ? 300 : 360;
      S.hy.c = h ? 32 : 27; // returning lands with a hint of overshoot
      S.hy.v += clamp(v * 0.7, -2600, 2600);
      wake(api);
    }

    function select(i: number, user = false) {
      if (i < 0 || i >= links.length) return;
      const changed = i !== active;
      active = i;
      activeRef.current = i;
      aim(S.L, S.R, G[i].l, G[i].r, ...PILL);
      wake(api);
      if (changed && user) nav.dispatchEvent(new CustomEvent("change", { bubbles: true, detail: { index: i } }));
    }

    function hover(i: number) {
      if (i === hot) return;
      hot = i;
      links.forEach((a, j) => a.classList.toggle("is-hot", j === i));
      if (i < 0) {
        S.go.g = 0;
        wake(api);
        return;
      }
      if (S.go.x < 0.06) {
        // Snap in, never sweep from far.
        S.gl.x = S.gl.g = G[i].l;
        S.gr.x = S.gr.g = G[i].r;
        S.gl.v = S.gr.v = 0;
      } else {
        aim(S.gl, S.gr, G[i].l, G[i].r, ...GHOST);
      }
      S.go.g = 1;
      wake(api);
    }

    const idx = (e: Event): number => {
      const t = e.target as HTMLElement | null;
      const a = t && t.closest ? t.closest(".vs-capsule-nav-list .vs-capsule-nav-link") : null;
      return a ? links.indexOf(a as HTMLAnchorElement) : -1;
    };
    // Ignore hits from the pill's ink copy (spans, not in `links`).
    const onPointerOver = (e: PointerEvent) => {
      const i = idx(e);
      if (i >= 0) hover(i);
    };
    const onPointerLeave = () => hover(-1);
    const onPointerDown = (e: PointerEvent) => {
      const i = idx(e);
      if (i < 0 || e.button > 0) return;
      pressed = i;
      S.press.g = 1;
      wake(api);
    };
    const release = () => {
      S.press.g = 0;
      wake(api);
      window.setTimeout(() => {
        if (S.press.g === 0) pressed = -1;
      }, 400);
    };
    const onClick = (e: MouseEvent) => {
      const i = idx(e);
      if (i < 0) return;
      select(i, true); // pill slides; Next.js Link performs the navigation
    };
    const onFocusIn = (e: FocusEvent) => {
      const i = idx(e);
      if (i >= 0 && (e.target as HTMLElement).matches(":focus-visible")) hover(i);
      setHidden(false, 0);
    };
    const onFocusOut = () => {
      window.setTimeout(() => {
        if (!ul.contains(document.activeElement)) hover(-1);
      }, 0);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      const i = links.indexOf(document.activeElement as HTMLAnchorElement);
      if (i < 0) return;
      const pick: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 };
      const d = pick[e.key];
      if (!d) return;
      e.preventDefault();
      const j = d === -99 ? 0 : d === 99 ? links.length - 1 : i + d;
      if (j >= 0 && j < links.length) links[j].focus();
    };

    /* Hide on scroll: direction with a small dead zone; scroll velocity feeds the spring. */
    const getY = () => window.scrollY || document.documentElement.scrollTop;
    let lastY = getY();
    let lastT = performance.now();
    let vel = 0;
    let acc = 0;
    const onScroll = () => {
      const y = getY();
      const now = performance.now();
      const dy = y - lastY;
      const dtm = Math.max(8, now - lastT);
      vel = vel * 0.5 + ((dy / dtm) * 1000) * 0.5;
      lastY = y;
      lastT = now;
      const compactAt = parseFloat(nav.dataset.compactAt ?? "96");
      S.cp.g = !reduce.matches && y > compactAt ? 1 : 0;
      if (reduce.matches || nav.dataset.hide === "off" || y <= Math.max(8, compactAt * 0.5)) {
        acc = 0;
        setHidden(false, 0);
      } else if (dy) {
        if (Math.sign(dy) !== Math.sign(acc)) acc = 0;
        acc += dy;
        if (acc > 14) setHidden(true, vel);
        else if (acc < -6) setHidden(false, vel);
      }
      wake(api);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (hidden && e.pointerType === "mouse" && e.clientY < 28) {
        acc = 0;
        setHidden(false, 0);
      }
    };
    const ro = new ResizeObserver(() => {
      measure();
      const a = at(active);
      S.L.g = a.l;
      S.R.g = a.r;
      if (!live.has(api)) {
        S.L.x = a.l;
        S.R.x = a.r;
      }
      if (hot >= 0 && G[hot]) {
        S.gl.g = G[hot].l;
        S.gr.g = G[hot].r;
      }
      if (hidden) S.hy.g = D;
      wake(api);
    });

    track.addEventListener("pointerover", onPointerOver);
    track.addEventListener("pointerleave", onPointerLeave);
    track.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    ul.addEventListener("click", onClick);
    ul.addEventListener("focusin", onFocusIn);
    ul.addEventListener("focusout", onFocusOut);
    ul.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    ro.observe(ul);

    api.update(0);
    onScroll();
    wake(api);

    return () => {
      track.removeEventListener("pointerover", onPointerOver);
      track.removeEventListener("pointerleave", onPointerLeave);
      track.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      ul.removeEventListener("click", onClick);
      ul.removeEventListener("focusin", onFocusIn);
      ul.removeEventListener("focusout", onFocusOut);
      ul.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      live.clear();
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };
    // Mount-only: Header remounts per page, so pathname-at-mount is the source of truth.
  }, []);

  return (
    <nav ref={navRef} className="vs-capsule-nav" aria-label="Primary" data-hide="on" data-compact-at="96">
      <div className="vs-capsule-nav-bar">
        <Link href="/" className="vs-capsule-nav-brand" aria-label="Tulyro home">
          <LogoMark className="h-7 w-7" />
        </Link>
        <div className="vs-capsule-nav-track">
          <span className="vs-capsule-nav-ghost" aria-hidden="true" />
          <span className="vs-capsule-nav-shade" aria-hidden="true" />
          <ul className="vs-capsule-nav-list">
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="vs-capsule-nav-link"
                  aria-current={i === activeIndex ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <span className="vs-capsule-nav-pill" aria-hidden="true" inert>
            {/* Ink copy: same labels in pill ink, clipped by the sliding pill. */}
            <ul className="vs-capsule-nav-list" aria-hidden="true">
              {NAV.map((item) => (
                <li key={item.href}>
                  <span className="vs-capsule-nav-link">{item.label}</span>
                </li>
              ))}
            </ul>
          </span>
        </div>
      </div>
    </nav>
  );
}
