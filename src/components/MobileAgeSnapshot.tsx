"use client";

import { useMemo, useState } from "react";
import { ageCalc } from "@/tools/age/logic";
import { Icon } from "@/components/icons";

/** Stitch mobile-home "Instant Age Snapshot": live age from a birth date. */
export function MobileAgeSnapshot() {
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [dob, setDob] = useState("");
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => ageCalc(dob, todayValue), [dob, todayValue]);
  const valid = result && !("error" in result) ? result : null;
  const error = result && "error" in result ? result.error : null;

  const copy = async () => {
    if (!valid) return;
    try {
      await navigator.clipboard.writeText(`Age: ${valid.years} years, ${valid.months} months, ${valid.days} days.`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="w-full rounded-2xl bg-surface-container-lowest p-4 text-on-surface shadow-card">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1.5 font-display font-headline-sm text-headline-sm">
          <Icon name="bolt" className="h-4 w-4 text-primary-container" />
          Instant Age Snapshot
        </p>
        <span className="rounded-full bg-primary-fixed px-2 py-0.5 font-label-sm text-label-sm text-primary">Live</span>
      </div>
      <p className="mt-0.5 font-body-sm text-body-sm text-on-surface-variant">Live computational preview</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <label htmlFor="snapshot-dob" className="font-label-md text-label-md text-on-surface-variant">
          Birth Date
        </label>
        <input
          id="snapshot-dob"
          type="date"
          min="1900-01-01"
          max={todayValue}
          value={dob}
          onChange={(event) => setDob(event.target.value)}
          className="stitch-input mt-0 min-h-10 w-40 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 font-body-sm text-body-sm text-on-surface"
        />
      </div>
      <div className="mt-3 border-t border-surface-container pt-3">
        <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Exact Age</p>
        {error ? (
          <p role="alert" className="mt-1 font-body-md text-body-md font-medium text-error">
            {error}
          </p>
        ) : valid ? (
          <div className="mt-1 flex items-start justify-between gap-2">
            <div>
              <p className="font-display font-headline-md text-headline-md text-on-surface">
                {valid.years} yrs • {valid.months} mos
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">{valid.daysLived.toLocaleString()} days lived</p>
            </div>
            <button type="button" onClick={copy} className="btn-press inline-flex shrink-0 items-center gap-1 rounded-lg border border-outline-variant px-2.5 py-1.5 font-label-sm text-label-sm text-on-surface hover:bg-surface-container-low">
              <Icon name="content_copy" className="h-3.5 w-3.5" />
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Set your birth date above.</p>
        )}
      </div>
    </div>
  );
}
