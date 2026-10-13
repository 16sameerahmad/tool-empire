"use client";

import { useState } from "react";
import Link from "next/link";
import { emi } from "@/tools/emi/logic";
import { Icon } from "@/components/icons";

const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

/** Stitch "live-calculator.sim" hero card, wired to the real emi() logic in USD. */
export function HeroEmiSimulator() {
  const [principal, setPrincipal] = useState(25000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);
  const result = emi(principal, rate, years * 12);
  const monthly = result && !("error" in result) ? result.monthlyPayment : null;
  const interest = result && !("error" in result) ? result.totalInterest : null;

  return (
    <div className="w-full max-w-md rounded-2xl bg-midnight-deep/90 p-6 text-on-primary shadow-[0_20px_50px_rgba(0,0,0,0.45)] backdrop-blur-md">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-4">
        <p className="flex items-center gap-2 font-code-data text-code-data text-xs font-medium text-tertiary-fixed">
          <span className="h-3 w-3 rounded-full bg-error" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-secondary-fixed" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-primary-container" aria-hidden="true" />
          <span className="ml-2">live-calculator.sim</span>
        </p>
        <p className="flex items-center gap-1 font-code-data text-xs text-primary-fixed">
          <Icon name="bolt" className="h-[14px] w-[14px]" />
          Realtime
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="hero-principal" className="font-label-md text-label-md text-tertiary-fixed">
              Principal Amount
            </label>
            <span className="font-code-data text-code-data font-semibold text-white">{usd0.format(principal)}</span>
          </div>
          <input
            id="hero-principal"
            type="range"
            min={1000}
            max={1000000}
            step={1000}
            value={principal}
            onChange={(event) => setPrincipal(Number(event.target.value))}
            className="h-2 w-full cursor-pointer accent-primary-container"
            aria-label="Principal amount"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div>
            <label htmlFor="hero-rate" className="mb-1 block font-label-sm text-label-sm text-tertiary-fixed-dim">
              Interest Rate
            </label>
            <div className="flex items-center rounded-lg bg-white/5 px-2.5 py-1.5">
              <input
                id="hero-rate"
                type="number"
                min={0}
                max={100}
                step={0.1}
                value={rate}
                onChange={(event) => setRate(Number(event.target.value))}
                className="w-full bg-transparent font-code-data text-sm text-white outline-none"
              />
              <span className="font-body-sm text-body-sm text-tertiary-fixed">%</span>
            </div>
          </div>
          <div>
            <label htmlFor="hero-years" className="mb-1 block font-label-sm text-label-sm text-tertiary-fixed-dim">
              Tenure (Years)
            </label>
            <div className="flex items-center rounded-lg bg-white/5 px-2.5 py-1.5">
              <input
                id="hero-years"
                type="number"
                min={1}
                max={50}
                step={1}
                value={years}
                onChange={(event) => setYears(Number(event.target.value))}
                className="w-full bg-transparent font-code-data text-sm text-white outline-none"
              />
              <span className="font-body-sm text-body-sm text-tertiary-fixed">Yrs</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-xl bg-surface-container-lowest p-4 text-on-surface shadow-xl">
          <div>
            <span className="block font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">Monthly Installment</span>
            <span className="font-display font-result-metric text-result-metric font-extrabold text-primary">
              {monthly !== null ? usd0.format(monthly) : "—"}
            </span>
          </div>
          <div className="text-right">
            <span className="block font-label-sm text-label-sm uppercase tracking-wide text-on-surface-variant">Total Interest</span>
            <span className="font-code-data text-code-data font-semibold text-on-surface">{interest !== null ? usd0.format(interest) : "—"}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-1 font-body-sm text-body-sm text-tertiary-fixed-dim">
          <span className="flex items-center gap-1.5">
            <Icon name="verified" className="h-[14px] w-[14px] text-primary-fixed" />
            Computed locally in your browser
          </span>
          <Link href="/calculators/mortgage-calculator/" className="flex items-center text-primary-fixed hover:underline">
            Open Full Tool →
          </Link>
        </div>
      </div>
    </div>
  );
}
