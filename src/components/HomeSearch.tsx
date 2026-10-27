"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/icons";
import { tools } from "@/lib/tools";

/** Example queries cycled by the typewriter placeholder (Jitter-style). */
const TYPEWRITER_EXAMPLES = ["EMI Calculator", "Age Calculator", "Word Counter", "BMI Calculator", "Base64"];

/**
 * Jitter "Animated Search Bar" adaptation for Tulyro.
 * - Entrance (mount only, pure CSS): 80px circle -> full pill via clip-path
 *   (0.7s natural ease, no layout shift, no content distortion); icon pops
 *   in with scale + fade (0.4s ease-out, slight overlap).
 * - Typewriter placeholder cycles example queries at 50ms/letter when the
 *   input is empty and blurred; stops on focus/type, resumes on blur+clear.
 * - All existing behavior preserved: live suggestions, keyboard nav,
 *   clear button, Find Tool submit, "/" shortcut, ARIA combobox.
 */
export function HomeSearch({ variantId = "desktop" }: { variantId?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(-1);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [typed, setTyped] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    return tools.filter((tool) => `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT" || target.isContentEditable;
      if (event.key === "/" && !typing) {
        // Only the visible instance (desktop or mobile hero) takes focus.
        if (inputRef.current && inputRef.current.offsetParent !== null) {
          event.preventDefault();
          inputRef.current.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Typewriter placeholder: 50ms/letter, linear. Runs only when the input is
  // empty and blurred; halts the moment the user focuses or types.
  useEffect(() => {
    if (focused || query) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let example = 0;
    let chars = 0;
    let deleting = false;
    let timer = 0;
    const tick = () => {
      const word = TYPEWRITER_EXAMPLES[example % TYPEWRITER_EXAMPLES.length];
      if (!deleting) {
        chars += 1;
        setTyped(word.slice(0, chars));
        if (chars >= word.length) {
          deleting = true;
          timer = window.setTimeout(tick, 1400);
          return;
        }
        timer = window.setTimeout(tick, 50);
      } else {
        chars -= 1;
        setTyped(word.slice(0, chars));
        if (chars <= 0) {
          deleting = false;
          example += 1;
          timer = window.setTimeout(tick, 350);
          return;
        }
        timer = window.setTimeout(tick, 22);
      }
    };
    timer = window.setTimeout(tick, 900);
    return () => window.clearTimeout(timer);
  }, [focused, query]);

  const goTo = (index: number) => {
    const target = matches[index];
    if (target) router.push(target.href);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlight((current) => Math.min(current + 1, matches.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlight((current) => Math.max(current - 1, -1));
    } else if (event.key === "Enter") {
      const target = highlight >= 0 ? matches[highlight] : matches[0];
      if (target) {
        event.preventDefault();
        router.push(target.href);
      }
    } else if (event.key === "Escape") {
      setQuery("");
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setOpen(false);
      setFocused(false);
    }
  };

  return (
    <div id={variantId === "desktop" ? "search" : undefined} onBlur={onBlur} className="relative mt-4 w-full max-w-2xl scroll-mt-32 text-left">
      <form
        role="search"
        className="search-enter relative flex items-center rounded-full bg-surface-container-lowest p-1.5 shadow-2xl transition-shadow focus-within:shadow-[0_0_24px_rgba(99,91,255,0.4)]"
        onSubmit={(event) => {
          event.preventDefault();
          if (matches.length) router.push(matches[highlight >= 0 ? highlight : 0].href);
        }}
      >
        <span className="search-icon-enter ml-3 grid h-[22px] w-[22px] shrink-0 place-items-center" aria-hidden="true">
          <Icon name="search" className="h-[22px] w-[22px] text-outline" />
        </span>
        <label htmlFor={`home-search-${variantId}`} className="sr-only">
          Search tools
        </label>
        <input
          id={`home-search-${variantId}`} data-home-search
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setHighlight(-1);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            setFocused(true);
            setTyped("");
          }}
          onKeyDown={onKeyDown}
          placeholder={typed ? `Try "${typed}"` : "Search tools…"}
          role="combobox"
          aria-expanded={open && query.trim().length > 0}
          aria-controls={`home-search-suggestions-${variantId}`}
          aria-activedescendant={highlight >= 0 ? `home-search-option-${variantId}-${highlight}` : undefined}
          autoComplete="off"
          className="w-full bg-transparent px-3 py-3 font-body-md text-body-md text-on-surface outline-none placeholder:text-outline"
        />
        <span className="mr-2 hidden items-center gap-1.5 sm:flex" aria-hidden="true">
          <kbd className="rounded bg-surface-container-high px-2 py-1 font-code-data text-xs text-on-surface-variant shadow-sm">⌘</kbd>
          <kbd className="rounded bg-surface-container-high px-2 py-1 font-code-data text-xs text-on-surface-variant shadow-sm">K</kbd>
        </span>
        {query.length > 0 ? (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setQuery("");
              setHighlight(-1);
              inputRef.current?.focus();
            }}
            className="pop-in btn-icon mr-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-outline transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <Icon name="close" className="h-4 w-4" />
          </button>
        ) : null}
        <button
          type="submit"
          className="btn-press btn-sheen btn-glow flex shrink-0 items-center gap-1.5 rounded-full bg-primary-container px-5 py-3 font-label-md text-label-md text-on-primary shadow-button-glow transition-all hover:bg-primary"
        >
          Find Tool
          <Icon name="arrow_forward" className="h-4 w-4" />
        </button>
      </form>
      {open && query.trim().length > 0 ? (
        <div
          id={`home-search-suggestions-${variantId}`}
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 mt-2 isolate overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest shadow-lg"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          {matches.length ? (
            matches.map((tool, index) => (
              <button
                key={tool.id}
                id={`home-search-option-${variantId}-${index}`}
                type="button"
                role="option"
                aria-selected={highlight === index}
                onMouseEnter={() => setHighlight(index)}
                onClick={() => goTo(index)}
                style={{ ["--suggest-index" as string]: Math.min(index, 7) }}
                className={`suggest-item flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm transition-colors duration-150 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary-container ${
                  highlight === index ? "bg-primary-fixed" : ""
                }`}
              >
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-on-surface">{tool.title}</span>
                  <span className="block truncate text-on-surface-variant">{tool.description}</span>
                </span>
                <span aria-hidden="true" className="shrink-0 text-primary">
                  →
                </span>
              </button>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-on-surface-variant">No tools found.</p>
          )}
        </div>
      ) : null}
      <p className="mt-3 text-center font-body-sm text-body-sm text-tertiary-fixed-dim">
        Press <kbd className="rounded border border-white/20 bg-white/10 px-1.5 py-0.5 font-code-data text-xs text-white">/</kbd> to search · Free tools · No signup
      </p>
    </div>
  );
}
