"use client";

import { useMemo, useState } from "react";
import { ageCalc } from "@/tools/age/logic";
import { Icon } from "@/components/icons";

const inputClass =
  "stitch-input mt-1 min-h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-base text-on-surface";
const labelClass = "block font-label-md text-label-md text-on-surface-variant";

/** Stitch Age Calculator workspace: input card left, live result dashboard right. */
export function AgeWorkspace() {
  const today = new Date();
  const todayValue = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const [dob, setDob] = useState("");
  const [asOf, setAsOf] = useState(todayValue);
  const [copied, setCopied] = useState(false);
  const result = useMemo(() => ageCalc(dob, asOf || todayValue), [dob, asOf, todayValue]);
  const error = result && "error" in result ? result.error : null;
  const valid = result && !("error" in result) ? result : null;

  const copySummary = async () => {
    if (!valid) return;
    const text = `Age: ${valid.years} years, ${valid.months} months, ${valid.days} days. Total days lived: ${valid.daysLived.toLocaleString()}. Next birthday: ${valid.isToday ? "Today" : valid.nextBirthday} (${valid.daysUntilBirthday} days).`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const stats = valid
    ? [
        { label: "Total Days", value: valid.daysLived.toLocaleString() },
        { label: "Total Weeks", value: Math.floor(valid.daysLived / 7).toLocaleString() },
        { label: "Total Months", value: String(valid.years * 12 + valid.months) },
        { label: "Total Hours", value: (valid.daysLived * 24).toLocaleString() },
        {
          label: "Next Birthday",
          value: valid.isToday ? "Today" : valid.nextBirthday,
          sub: valid.isToday ? "0 days remaining" : `${valid.daysUntilBirthday} days remaining`,
          span: "sm:col-span-2",
        },
      ]
    : null;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-5">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary-container/10 text-primary">
            <Icon name="calendar_month" className="h-[18px] w-[18px]" />
          </span>
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">Input Chronology</h2>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="dob" className={labelClass}>
              Date of Birth
            </label>
            <input
              id="dob"
              type="date"
              min="1900-01-01"
              max={todayValue}
              value={dob}
              onChange={(event) => setDob(event.target.value)}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "dob-error" : "dob-help"}
              className={inputClass}
            />
            <p id="dob-help" className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
              Uses your device&apos;s local date. Refreshing clears the input.
            </p>
            {error ? (
              <p id="dob-error" role="alert" className="mt-3 rounded-lg border border-error/30 bg-error-container px-3 py-2 font-body-sm text-body-sm font-medium text-error">
                {error}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="asof" className={labelClass}>
              Calculate Age As Of
            </label>
            <input
              id="asof"
              type="date"
              value={asOf}
              onChange={(event) => setAsOf(event.target.value)}
              className={inputClass}
            />
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
              Defaults to today. Pick a future date to see a future age.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => { setDob(""); setAsOf(todayValue); }}
              className="btn-press inline-flex min-h-11 items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 font-label-md text-label-md text-on-surface hover:bg-surface-container-low"
            >
              <Icon name="restart_alt" className="h-4 w-4" />
              Clear
            </button>
          </div>
          <p className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            <Icon name="security" className="h-4 w-4 text-primary" />
            100% client computation — no data leaves your browser.
          </p>
        </div>
      </div>

      <div aria-live="polite" className="rounded-xl bg-midnight p-6 text-white shadow-card lg:col-span-7">
        <div className="flex items-center justify-between">
          <h2 className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed-dim">Chronological Age</h2>
          {valid ? (
            <button
              type="button"
              onClick={copySummary}
              className="btn-press inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 font-label-md text-label-md text-white hover:bg-white/20"
            >
              <Icon name="content_copy" className="h-4 w-4" />
              {copied ? "Copied!" : "Copy Summary"}
            </button>
          ) : null}
        </div>
        {!valid ? (
          <p className="mt-4 font-body-md text-body-md text-tertiary-fixed-dim">Enter your date of birth to see your exact age.</p>
        ) : (
          <>
            <p className="mt-3 font-display font-result-metric text-result-metric text-white">
              {valid.years} <span className="font-body-md text-body-md font-normal text-tertiary-fixed-dim">Years</span>, {valid.months}{" "}
              <span className="font-body-md text-body-md font-normal text-tertiary-fixed-dim">Months</span>, {valid.days}{" "}
              <span className="font-body-md text-body-md font-normal text-tertiary-fixed-dim">Days</span>
            </p>
            <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-3">
              {stats?.map((stat) => (
                <div key={stat.label} className={`bg-midnight p-3 sm:p-4 ${"span" in stat && stat.span ? stat.span : ""}`}>
                  <dt className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed-dim">{stat.label}</dt>
                  <dd className="mt-1 font-mono text-xl font-semibold leading-none text-white tabular-nums sm:text-2xl">{stat.value}</dd>
                  {"sub" in stat && stat.sub ? <dd className="mt-1 font-body-sm text-body-sm text-tertiary-fixed-dim">{stat.sub}</dd> : null}
                </div>
              ))}
            </dl>
          </>
        )}
      </div>
    </div>
  );
}
