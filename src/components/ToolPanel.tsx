"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { bmi, bmiCategory, poundsToKg, validateMetric } from "@/tools/bmi/logic";
import { cgpaToPercentage } from "@/tools/cgpa/logic";
import { emi } from "@/tools/emi/logic";
import { invoiceTotals, type InvoiceItem } from "@/tools/invoice/logic";
import { styleText, type Style } from "@/tools/fancy-text/logic";
import { decodeB64, encodeB64 } from "@/tools/base64/logic";
import { chunkText } from "@/tools/text-to-speech/logic";
import { wordStats } from "@/tools/word-counter/logic";
import { canAddMessage, type FakeMessage, validateMessage } from "@/tools/fake-text/logic";
import { AgeWorkspace } from "@/components/AgeWorkspace";
import { Icon } from "@/components/icons";
import { MorphIcon } from "@/components/motion";

const inputClass = "stitch-input mt-1 min-h-11 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-base text-on-surface";
const labelClass = "block font-label-md text-label-md text-on-surface-variant";
const buttonClass =
  "btn-press btn-sheen btn-glow inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg bg-primary-container px-4 font-label-md text-label-md text-white shadow-button-glow transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container disabled:cursor-not-allowed disabled:bg-outline-variant disabled:text-on-surface-variant disabled:shadow-none";
const secondaryButtonClass =
  "btn-press inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 font-label-md text-label-md text-on-surface hover:bg-surface-container-low focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container disabled:cursor-not-allowed disabled:text-outline";
const numberFormat = (locale: string, currency?: string) =>
  new Intl.NumberFormat(locale, currency ? { style: "currency", currency, minimumFractionDigits: 2 } : { maximumFractionDigits: 2 });

function Segmented({ value, options, onChange, ariaLabel }: { value: string; options: string[]; onChange: (value: string) => void; ariaLabel?: string }) {
  return (
    <div role="radiogroup" aria-label={ariaLabel} className="inline-flex rounded-xl bg-surface-container p-1">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          role="radio"
          aria-checked={value === option}
          onClick={() => onChange(option)}
          className={`btn-chip min-h-10 rounded-lg px-3 font-label-md text-label-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container ${
            value === option ? "bg-primary-container text-white shadow-sm" : "text-on-surface-variant hover:text-on-surface"
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function ErrorBox({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="rounded-xl border border-error/30 bg-error-container px-4 py-3 font-body-sm text-body-sm font-medium text-error">
      {children}
    </div>
  );
}

function AgePanel() {
  return <AgeWorkspace />;
}

function EmiPanel({ mortgage = false }: { mortgage?: boolean }) {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [tenure, setTenure] = useState("");
  const [unit, setUnit] = useState(mortgage ? "Years" : "Months");
  const [copied, setCopied] = useState(false);
  const hasValues = amount !== "" && rate !== "" && tenure !== "";
  const months = Number(tenure) * (unit === "Years" ? 12 : 1);
  const result = hasValues ? emi(Number(amount), Number(rate), months) : null;
  const error = result && "error" in result ? result.error : null;
  const valid = result && !("error" in result) ? result : null;
  const format = numberFormat(mortgage ? "en-US" : "en-IN", mortgage ? "USD" : "INR");
  const symbol = mortgage ? "$" : "₹";
  const presets = mortgage ? [50000, 100000, 250000, 500000] : [500000, 1000000, 2500000, 5000000, 10000000];
  const presetLabel = (value: number) =>
    mortgage ? `$${value / 1000}K` : value >= 10000000 ? "₹1 Cr" : `₹${value / 100000}L`;
  const sliderMax = mortgage ? 1000000 : 10000000;
  const amountNum = Number(amount) || 0;
  const principalShare = valid ? Number(amount) / valid.totalPayment : 0;
  const principalPct = Math.round(principalShare * 100);
  const copySummary = async () => {
    if (!valid) return;
    const text = `Monthly payment: ${format.format(valid.monthlyPayment)}. Total payment: ${format.format(valid.totalPayment)}. Total interest: ${format.format(valid.totalInterest)}. Estimate only; the lender's figure may differ slightly.`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="grid items-start gap-6 lg:grid-cols-12">
        {/* Params (7) */}
        <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-amount" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Loan Amount
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{mortgage ? "US home loan principal" : "Indian loan principal"}</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 font-code-data font-semibold text-on-surface-variant">{symbol}</span>
              <input
                id="emi-amount"
                type="number"
                min="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className={`${inputClass} mt-0 pl-8 font-code-data`}
              />
            </div>
            <input
              type="range"
              min={0}
              max={sliderMax}
              step={mortgage ? 1000 : 10000}
              value={Math.min(amountNum, sliderMax)}
              onChange={(event) => setAmount(event.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Loan amount slider"
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="mr-1 font-label-sm text-label-sm text-on-surface-variant">Presets:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAmount(String(preset))}
                  className={`btn-chip rounded px-2.5 py-1 font-code-data text-xs ${
                    amountNum === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface hover:bg-primary-container hover:text-white"
                  }`}
                >
                  {presetLabel(preset)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="emi-rate" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Interest Rate
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Annual Percentage Rate (P.A.)</span>
            </div>
            <div className="relative flex items-center">
              <input id="emi-rate" type="number" min="0" max="100" step="0.01" value={rate} onChange={(event) => setRate(event.target.value)} className={`${inputClass} mt-0 pr-8 font-code-data`} />
              <span className="absolute right-3 font-code-data font-semibold text-on-surface-variant">%</span>
            </div>
            <input
              type="range"
              min={0}
              max={30}
              step={0.1}
              value={Math.min(Number(rate) || 0, 30)}
              onChange={(event) => setRate(event.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Interest rate slider"
            />
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>0%</span>
              <span>30%</span>
            </div>
          </div>

          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <span className="font-display font-headline-sm text-headline-sm text-on-surface">{mortgage ? "Loan Term" : "Loan Tenure"}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{Number.isFinite(months) && months > 0 ? `${months} Calendar Months` : "Enter a tenure"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Segmented value={unit} options={["Years", "Months"]} onChange={setUnit} ariaLabel="Tenure unit" />
              <label htmlFor="emi-tenure" className="sr-only">
                Tenure value
              </label>
              <input id="emi-tenure" type="number" min="1" value={tenure} onChange={(event) => setTenure(event.target.value)} className={`${inputClass} mt-0 font-code-data`} />
            </div>
            <input
              type="range"
              min={1}
              max={unit === "Years" ? 30 : 360}
              step={1}
              value={Math.min(Number(tenure) || 1, unit === "Years" ? 30 : 360)}
              onChange={(event) => setTenure(event.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Tenure slider"
            />
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
              <span>1 {unit === "Years" ? "Year" : "Month"}</span>
              <span>{unit === "Years" ? "30 Years" : "360 Months"}</span>
            </div>
          </div>
        </div>

        {/* Result (5) */}
        <div className="space-y-4 lg:col-span-5 lg:sticky lg:top-32">
          {error ? (
            <ErrorBox>{error}</ErrorBox>
          ) : (
            <div aria-live="polite" className="relative overflow-hidden rounded-2xl bg-midnight p-6 text-white shadow-xl">
              <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-primary-container/30 blur-2xl" aria-hidden="true" />
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed">Computed {mortgage ? "Payment" : "EMI"}</span>
                  <span className="flex items-center gap-1 font-code-data text-xs text-tertiary-fixed-dim">
                    <span className="h-2 w-2 rounded-full bg-primary-container" aria-hidden="true" />
                    Live Synced
                  </span>
                </div>
                <div>
                  <p className="font-display font-result-metric text-result-metric tracking-tight text-white md:text-display-hero-mobile">
                    {valid ? format.format(valid.monthlyPayment) : `${symbol} 0`}
                    <span className="ml-1 font-body-md text-body-md font-normal text-tertiary-fixed-dim">/ month</span>
                  </p>
                  <p className="mt-1 font-body-sm text-body-sm text-tertiary-fixed-dim">
                    Payable across <span className="font-semibold text-white">{valid ? months : 0}</span> equal monthly installments.
                  </p>
                </div>
                <div className="flex items-center gap-4 rounded-xl bg-white/5 p-4 backdrop-blur-md">
                  <div className="relative h-28 w-28 shrink-0" aria-hidden="true">
                    <svg viewBox="0 0 100 100" className="h-28 w-28 -rotate-90">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#0072E2" strokeWidth="12" />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="#635BFF"
                        strokeWidth="12"
                        strokeDasharray={`${(principalShare || 0) * 264} 264`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="font-code-data text-xs text-tertiary-fixed-dim">Ratio</span>
                      <span className="font-headline-sm text-sm font-bold text-white">
                        {valid ? `${principalPct}:${100 - principalPct}` : "—"}
                      </span>
                    </div>
                  </div>
                  <div className="flex-grow space-y-2">
                    <div className="flex items-center justify-between font-label-md text-label-md">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary-container" aria-hidden="true" />
                        Principal
                      </span>
                      <span className="font-code-data text-white">{valid ? `${principalPct}.0%` : "—"}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-primary-container" style={{ width: `${valid ? principalPct : 0}%` }} />
                    </div>
                    <div className="flex items-center justify-between pt-1 font-label-md text-label-md">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-secondary-container" aria-hidden="true" />
                        Total Interest
                      </span>
                      <span className="font-code-data text-secondary-fixed">{valid ? `${100 - principalPct}.0%` : "—"}</span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-secondary-container" style={{ width: `${valid ? 100 - principalPct : 0}%` }} />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">Total Interest</span>
                    <span className="mt-0.5 block font-code-data text-base font-bold text-white">{valid ? format.format(valid.totalInterest) : `${symbol} 0`}</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-3">
                    <span className="block font-label-sm text-label-sm uppercase text-tertiary-fixed-dim">Total Payable</span>
                    <span className="mt-0.5 block font-code-data text-base font-bold text-secondary-fixed">{valid ? format.format(valid.totalPayment) : `${symbol} 0`}</span>
                  </div>
                </div>
                <button type="button" onClick={copySummary} disabled={!valid} className="btn-press btn-sheen btn-glow flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-white/10">
                  <MorphIcon from="content_copy" to="check" morphed={copied} className="h-4 w-4" />
                  {copied ? "Summary copied!" : "Copy Summary"}
                </button>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3 rounded-xl bg-surface-container p-4 shadow-sm">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary">
              <Icon name="lightbulb" className="h-5 w-5" />
            </span>
            <div className="space-y-1">
              <h2 className="font-display font-headline-sm text-sm font-semibold text-on-surface">Estimate, not a quote</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                A longer tenure can lower the monthly payment while increasing the total interest. A lender&apos;s figure may differ slightly — fees, taxes, and insurance are not included.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula block (Stitch EMI screen, formula text matches content.ts) */}
      <div className="mt-6 rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-container/10 text-primary">
            <Icon name="functions" className="h-4 w-4" />
          </span>
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">The Mathematical Formula Behind {mortgage ? "the Mortgage Payment" : "EMI"}</h2>
        </div>
        <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
          {mortgage ? "The monthly payment" : "Equated Monthly Installment"} is calculated using the standard reducing-balance formula.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl bg-surface-container-low p-4 text-center">
          <p className="font-mono text-lg font-bold tracking-wide text-on-surface md:text-xl">
            {mortgage ? "Payment" : "EMI"} = [P × R × (1 + R)<sup>N</sup>] / [(1 + R)<sup>N</sup> − 1]
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
          {[
            { k: "P = Principal", v: "Total borrowed loan sum." },
            { k: "R = Rate per Month", v: "Annual interest divided by 12 months, then by 100." },
            { k: "N = Total Months", v: "The duration expressed as calendar monthly payments." },
          ].map((item) => (
            <div key={item.k} className="rounded-lg bg-surface-container-low p-3">
              <span className="block font-code-data font-bold text-primary">{item.k}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{item.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BmiPanel() {
  const [unit, setUnit] = useState("Metric");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [copied, setCopied] = useState(false);
  const imperial = unit === "Imperial";
  const heightCm = imperial ? (Number(feet) * 12 + Number(inches)) * 2.54 : Number(height);
  const weightKg = imperial ? poundsToKg(Number(weight)) : Number(weight);
  const anyInput = imperial ? feet !== "" || inches !== "" || weight !== "" : height !== "" || weight !== "";
  const error = !anyInput ? null : validateMetric(weightKg, heightCm);
  const value = !error && heightCm && weightKg ? Number(bmi(weightKg, heightCm / 100).toFixed(1)) : null;
  const category = value !== null ? bmiCategory(value) : null;
  const changeUnit = (next: string) => {
    setUnit(next);
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
  };
  const markerPct = value !== null ? Math.min(100, Math.max(0, ((value - 14) / (40 - 14)) * 100)) : 0;
  const idealLow = heightCm ? 18.5 * (heightCm / 100) ** 2 : null;
  const idealHigh = heightCm ? 24.9 * (heightCm / 100) ** 2 : null;
  const copySummary = async () => {
    if (value === null || !category) return;
    try {
      await navigator.clipboard.writeText(`BMI: ${value.toFixed(1)} (${category}). BMI is a screening measure, not a diagnosis.`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <div className="space-y-5 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          <Segmented value={unit} options={["Metric", "Imperial"]} onChange={changeUnit} ariaLabel="Unit system" />
          <div className="grid gap-4 md:grid-cols-2">
            {imperial ? (
              <>
                <div>
                  <label htmlFor="bmi-feet" className={labelClass}>
                    Feet
                  </label>
                  <input id="bmi-feet" type="number" min="0" value={feet} onChange={(event) => setFeet(event.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor="bmi-inches" className={labelClass}>
                    Inches
                  </label>
                  <input id="bmi-inches" type="number" min="0" value={inches} onChange={(event) => setInches(event.target.value)} className={inputClass} />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="bmi-height" className={labelClass}>
                  Height (cm)
                </label>
                <input id="bmi-height" type="number" min="0" value={height} onChange={(event) => setHeight(event.target.value)} className={inputClass} />
                <input
                  type="range"
                  min={50}
                  max={250}
                  value={Math.min(Number(height) || 50, 250)}
                  onChange={(event) => setHeight(event.target.value)}
                  className="mt-3 h-2 w-full cursor-pointer accent-primary-container"
                  aria-label="Height slider"
                />
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                  <span>50 cm</span>
                  <span>250 cm</span>
                </div>
              </div>
            )}
            <div>
              <label htmlFor="bmi-weight" className={labelClass}>
                Weight ({imperial ? "lb" : "kg"})
              </label>
              <input id="bmi-weight" type="number" min="0" value={weight} onChange={(event) => setWeight(event.target.value)} className={inputClass} />
              {!imperial ? (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {[65, 70, 75, 80].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setWeight(String(preset))}
                      className={`btn-chip rounded px-2.5 py-1 font-code-data text-xs ${Number(weight) === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface hover:bg-primary-container hover:text-white"}`}
                    >
                      {preset} kg
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <p className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            <Icon name="lock" className="h-4 w-4 text-primary" />
            100% client-side computation • Zero health data leaves browser.
          </p>
        </div>

        <div aria-live="polite" className="space-y-4 lg:col-span-5">
          <div className="rounded-xl bg-surface-container-lowest p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="rounded bg-secondary-fixed px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-fixed-variant">WHO Clinical Result</span>
              <span className="font-code-data text-xs text-on-surface-variant">Adult screening</span>
            </div>
            {!anyInput ? (
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">Enter height and weight.</p>
            ) : error ? (
              <p role="alert" className="mt-4 font-body-md text-body-md font-medium text-error">
                {error}
              </p>
            ) : value !== null ? (
              <>
                <p className="mt-3 font-body-sm text-body-sm text-on-surface-variant">Your Computed BMI</p>
                <p className="font-display font-result-metric text-result-metric text-on-surface">
                  {value.toFixed(1)} <span className="font-body-md text-body-md font-normal text-on-surface-variant">kg/m²</span>
                </p>
                <p className="mt-1 font-display font-headline-sm text-headline-sm text-primary">{category}</p>
                <div className="relative mt-5">
                  <div className="flex h-2.5 w-full overflow-hidden rounded-full">
                    <div className="bg-action" style={{ width: `${(4.5 / 26) * 100}%` }} />
                    <div className="bg-success" style={{ width: `${(6.5 / 26) * 100}%` }} />
                    <div className="bg-amber-500" style={{ width: `${(5 / 26) * 100}%` }} />
                    <div className="bg-error" style={{ width: `${(10 / 26) * 100}%` }} />
                  </div>
                  <div className="absolute -top-1 h-4 w-1 rounded bg-on-surface" style={{ left: `calc(${markerPct}% - 2px)` }} aria-hidden="true" />
                  <div className="mt-1.5 flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span>Under</span>
                    <span>Normal</span>
                    <span>Over</span>
                    <span>Obese</span>
                  </div>
                </div>
                {idealLow !== null && idealHigh !== null ? (
                  <p className="mt-4 font-body-sm text-body-sm text-on-surface-variant">
                    Ideal range:{" "}
                    <span className="font-semibold text-on-surface">
                      {imperial
                        ? `${(idealLow * 2.20462).toFixed(1)} – ${(idealHigh * 2.20462).toFixed(1)} lb`
                        : `${idealLow.toFixed(1)} – ${idealHigh.toFixed(1)} kg`}
                    </span>{" "}
                    (BMI 18.5–24.9 for your height)
                  </p>
                ) : null}
                <button type="button" onClick={copySummary} className={`${secondaryButtonClass} mt-4 w-full`}>
                  <MorphIcon from="content_copy" to="check" morphed={copied} className="h-4 w-4" />
                  {copied ? "Copied!" : "Copy Summary"}
                </button>
              </>
            ) : (
              <p className="mt-4 font-body-md text-body-md text-on-surface-variant">Enter valid height and weight.</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="border-b border-surface-container px-6 py-4">
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">WHO Adult BMI Cut-offs</h2>
        </div>
        <table className="w-full text-left font-body-sm text-body-sm">
          <tbody className="divide-y divide-surface-container">
            {[
              ["Underweight", "< 18.5"],
              ["Normal Weight", "18.5 – 24.9"],
              ["Overweight", "25.0 – 29.9"],
              ["Obese", "≥ 30.0"],
            ].map(([label, range]) => (
              <tr key={label}>
                <td className="px-6 py-3 font-medium text-on-surface">{label}</td>
                <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{range}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
          BMI is a screening measure, not a diagnosis, and is intended for adults 18 and over.
        </p>
      </div>
    </div>
  );
}

function CgpaPanel() {
  const [value, setValue] = useState("");
  const [copied, setCopied] = useState(false);
  const result = value === "" ? null : cgpaToPercentage(Number(value));
  const errorMessage = result && typeof result === "object" ? result.error : undefined;
  const percent = typeof result === "number" ? result : null;
  const copyResult = async () => {
    if (percent === null) return;
    try {
      await navigator.clipboard.writeText(`${percent.toFixed(2)}% (Estimated)`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="space-y-5 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
        <div>
          <span className={labelClass}>Grading Standard &amp; University Rule</span>
          <p className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary-container px-3 py-2 font-label-md text-label-md text-white">
            CBSE / 10-Pt (× 9.5)
          </p>
          <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
            Only the CBSE 10-point rule is shipped. Other grading scales are not included — institutions differ, so check your own rule.
          </p>
        </div>
        <div>
          <label htmlFor="cgpa-input" className={labelClass}>
            Enter Your CGPA <span className="text-on-surface-variant">Range: 0.00 – 10.00</span>
          </label>
          <input id="cgpa-input" type="number" min="0" max="10" step="0.01" value={value} onChange={(event) => setValue(event.target.value)} className={inputClass} />
          <div className="mt-3 flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-label-sm text-label-sm text-on-surface-variant">Quick Presets:</span>
            {[7.5, 8.0, 8.5, 9.0, 9.5, 10.0].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setValue(preset.toFixed(2))}
                className={`btn-chip rounded px-2.5 py-1 font-code-data text-xs ${Number(value) === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface hover:bg-primary-container hover:text-white"}`}
              >
                {preset.toFixed(2)}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div aria-live="polite" className="rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-5">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Calculated Grade Assessment</span>
          <span className="rounded-full bg-secondary-fixed px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-fixed-variant">Estimated</span>
        </div>
        {errorMessage ? (
          <p role="alert" className="mt-4 font-body-md text-body-md font-medium text-error">
            {errorMessage}
          </p>
        ) : percent === null ? (
          <p className="mt-4 font-body-md text-body-md text-on-surface-variant">Enter your CGPA.</p>
        ) : (
          <>
            <p className="mt-3 font-display font-result-metric text-result-metric text-on-surface">
              {percent.toFixed(2)}% <span className="font-body-md text-body-md font-normal text-on-surface-variant">/ 100</span>
            </p>
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
              Active calculation formula: <span className="font-code-data text-on-surface">Percentage (%) = CGPA ({Number(value).toFixed(2)}) × 9.5</span>
            </p>
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">Estimated percentage. Institutions differ; check your own rule.</p>
            <button type="button" onClick={copyResult} className={`${secondaryButtonClass} mt-4 w-full`}>
              <MorphIcon from="content_copy" to="check" morphed={copied} className="h-4 w-4" />
              {copied ? "Copied!" : "Copy Result"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function WordPanel() {
  const [text, setText] = useState("");
  const [notice, setNotice] = useState("");
  const stats = wordStats(text);
  const paste = async () => {
    try {
      const value = await navigator.clipboard.readText();
      setText(value);
      setNotice("");
    } catch {
      setNotice("Could not read the clipboard. Paste with Ctrl+V (Cmd+V on Mac).");
    }
  };
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setNotice("Copied to clipboard.");
    } catch {
      setNotice("Could not copy. Select the text and press Ctrl+C (Cmd+C on Mac).");
    }
  };
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ["Words", String(stats.words), "total"],
          ["Chars (All)", String(stats.characters), "With spaces"],
          ["Chars (Dense)", String(stats.charactersWithoutSpaces), "No whitespace"],
          ["Sentences", String(stats.sentences), "Approx. count"],
          ["Reading Time", stats.readingTime, "At 200 wpm"],
        ].map(([label, value, sub]) => (
          <div key={label} className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-4 shadow-card">
            <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">{label}</p>
            <p className="mt-1 font-display font-headline-md text-headline-md text-on-surface tabular-nums">{value}</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">{sub}</p>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-surface-container-lowest p-4 shadow-card md:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="flex items-center gap-2 font-display font-headline-sm text-headline-sm text-on-surface">
            <Icon name="edit_note" className="h-5 w-5 text-primary" />
            Text Editor
          </span>
          <span className="flex items-center gap-2">
            <button type="button" onClick={paste} className={secondaryButtonClass}>
              <Icon name="content_paste" className="h-4 w-4" />
              Paste
            </button>
            <button type="button" onClick={copy} disabled={!text} className={secondaryButtonClass}>
              <MorphIcon from="content_copy" to="check" morphed={notice === "Copied to clipboard."} className="h-4 w-4" />
              Copy
            </button>
            <button type="button" onClick={() => setText("")} className={secondaryButtonClass}>
              <Icon name="delete_sweep" className="h-4 w-4" />
              Clear
            </button>
          </span>
        </div>
        <label htmlFor="word-input" className="sr-only">
          Text
        </label>
        <textarea id="word-input" value={text} onChange={(event) => setText(event.target.value)} rows={8} placeholder="Type or paste your text here…" className={`${inputClass} mt-4`} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 font-body-sm text-body-sm text-on-surface-variant">
          <span>Live synchronized engine • {stats.characters.toLocaleString()} characters • Reading time assumes 200 words per minute.</span>
          {notice ? (
            <span role="status" className="text-on-surface">
              {notice}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SpeechPanel() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voice, setVoice] = useState("");
  const [rate, setRate] = useState("1");
  const [status, setStatus] = useState("Loading voices…");
  const chunksRef = useRef<string[]>([]);
  const indexRef = useRef(0);
  const errorRef = useRef(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setStatus("Your browser does not support text to speech. Try Chrome, Edge or Safari.");
      return;
    }
    const load = () => {
      const next = window.speechSynthesis.getVoices();
      setVoices(next);
      setVoice((current) => current || next[0]?.name || "");
      setStatus(next.length ? "Ready" : "Your browser does not support text to speech. Try Chrome, Edge or Safari.");
    };
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);
  const speakNext = () => {
    if (indexRef.current >= chunksRef.current.length) {
      setStatus(errorRef.current ? "Finished with errors" : "Finished");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(chunksRef.current[indexRef.current]);
    utterance.voice = voices.find((item) => item.name === voice) ?? null;
    utterance.rate = Number(rate);
    utterance.onend = () => {
      indexRef.current += 1;
      speakNext();
    };
    utterance.onerror = () => {
      errorRef.current = true;
      indexRef.current += 1;
      speakNext();
    };
    window.speechSynthesis.speak(utterance);
  };
  const play = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    chunksRef.current = chunkText(text);
    indexRef.current = 0;
    errorRef.current = false;
    setStatus("Speaking");
    speakNext();
  };
  const speechAction = (action: "pause" | "resume" | "stop") => {
    if (!("speechSynthesis" in window)) return;
    if (action === "pause") window.speechSynthesis.pause();
    if (action === "resume") window.speechSynthesis.resume();
    if (action === "stop") {
      window.speechSynthesis.cancel();
      setStatus("Stopped");
    }
  };
  const paste = async () => {
    try {
      setText(await navigator.clipboard.readText());
    } catch {
      setStatus("Could not read the clipboard. Paste with Ctrl+V (Cmd+V on Mac).");
    }
  };
  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-display font-headline-sm text-headline-sm text-on-surface">
            <Icon name="notes" className="h-5 w-5 text-primary" />
            Text to Speak
          </span>
          <span className="font-code-data text-code-data text-on-surface-variant">
            {text.length} / 10,000 chars
          </span>
        </div>
        <label className="sr-only" htmlFor="tts-text">
          Text
        </label>
        <textarea id="tts-text" maxLength={10000} rows={8} value={text} onChange={(event) => setText(event.target.value)} placeholder="Type or paste text to hear it read aloud…" className={inputClass} />
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={paste} className={secondaryButtonClass}>
            <Icon name="content_paste" className="h-4 w-4" />
            Paste
          </button>
          <button type="button" onClick={() => setText("")} className={secondaryButtonClass}>
            <Icon name="delete_sweep" className="h-4 w-4" />
            Clear
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Speech uses your browser&apos;s built-in speechSynthesis API. No audio download in v1. Some browser voices may send text to the browser vendor&apos;s servers.
        </p>
      </div>
      <div className="space-y-4 lg:col-span-5">
        <div className="rounded-xl bg-surface-container-lowest p-6 shadow-card">
          <h2 className="flex items-center gap-2 font-display font-headline-sm text-headline-sm text-on-surface">
            <Icon name="tune" className="h-5 w-5 text-primary" />
            Voice &amp; Speed
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="tts-voice" className={labelClass}>
                Voice
              </label>
              <select id="tts-voice" value={voice} onChange={(event) => setVoice(event.target.value)} className={inputClass}>
                {voices.map((item) => (
                  <option key={item.name} value={item.name}>
                    {item.name} {item.localService ? "" : "(online)"}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="tts-rate" className={labelClass}>
                Speed ({rate}×)
              </label>
              <input id="tts-rate" type="range" min="0.5" max="2" step="0.1" value={rate} onChange={(event) => setRate(event.target.value)} className="mt-3 h-2 w-full cursor-pointer accent-primary-container" />
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                <span>0.5×</span>
                <span>2×</span>
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" className={buttonClass} disabled={!text || !voices.length} onClick={play}>
              <Icon name="play_arrow" className="h-4 w-4" />
              Speak Now
            </button>
            <button type="button" className={secondaryButtonClass} onClick={() => speechAction("pause")}>
              <Icon name="pause" className="h-4 w-4" />
              Pause
            </button>
            <button type="button" className={secondaryButtonClass} onClick={() => speechAction("resume")}>
              <Icon name="play_arrow" className="h-4 w-4" />
              Resume
            </button>
            <button type="button" className={secondaryButtonClass} onClick={() => speechAction("stop")}>
              <Icon name="stop" className="h-4 w-4" />
              Stop
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant" aria-live="polite">
            <Icon name="volume_up" className="h-4 w-4 text-secondary" />
            {status}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles: Style[] = ["Bold", "Italic", "Bold Italic", "Script", "Bold Script", "Fraktur", "Double-struck", "Monospace", "Circled", "Small Caps"];

function FancyPanel() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState("");
  const copy = async (value: string, style: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(style);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("error");
    }
  };
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return (
    <div className="space-y-4">
      <div className="rounded-xl bg-surface-container-lowest p-6 shadow-card">
        <div className="flex items-center justify-between">
          <label htmlFor="fancy-input" className="font-display font-headline-sm text-headline-sm text-on-surface">
            Source Input
          </label>
          <span className="font-code-data text-code-data text-on-surface-variant">
            {text.length} Chars • {words} Words
          </span>
        </div>
        <input
          id="fancy-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Type something to style…"
          className={`${inputClass} mt-3`}
        />
        <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
          {styles.length} styles • Encoding: UTF-8 • Characters without a mapping pass through unchanged.
        </p>
      </div>
      <div className="rounded-xl bg-surface-container-lowest p-4 shadow-card md:p-6">
        <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">Transformed Unicode Formats</h2>
        <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">Click Copy to populate the system clipboard.</p>
        <div className="mt-4 space-y-2">
          {styles.map((style) => {
            const output = text ? styleText(text, style) : "Your styled text appears here";
            return (
              <div key={style} className="flex flex-wrap items-center gap-3 rounded-xl border border-outline-variant/60 bg-surface-container-low/50 p-3">
                <span className="w-32 shrink-0 font-label-md text-label-md text-on-surface">{style}</span>
                <span className="min-w-0 flex-1 break-words font-body-md text-body-md text-on-surface">{output}</span>
                <button type="button" className={secondaryButtonClass} onClick={() => copy(output, style)} disabled={!text}>
                  <MorphIcon from="content_copy" to="check" morphed={copied === style} className="h-4 w-4" />
                  {copied === style ? "Copied" : "Copy"}
                </button>
              </div>
            );
          })}
        </div>
        <p aria-live="polite" className="mt-4 font-body-sm text-body-sm text-on-surface-variant">
          {copied === "error"
            ? "Could not copy. Select the text and press Ctrl+C (Cmd+C on Mac)."
            : copied
              ? `${copied} copied.`
              : "Styled text may not display on every device and can be read poorly by screen readers."}
        </p>
      </div>
    </div>
  );
}

function Base64Panel() {
  const [mode, setMode] = useState("Encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const result = input ? (mode === "Encode" ? encodeB64(input) : decodeB64(input)) : "";
  const output = typeof result === "string" ? result : "";
  const error = typeof result === "string" ? undefined : result.error;
  const inputBytes = new TextEncoder().encode(input).length;
  const outputBytes = new TextEncoder().encode(output).length;
  const paste = async () => {
    try {
      setInput(await navigator.clipboard.readText());
    } catch {
      setCopyFailed(true);
    }
  };
  const copyOutput = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyFailed(true);
    }
  };
  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented value={mode} options={["Encode", "Decode"]} onChange={setMode} ariaLabel="Mode" />
          <span className="flex items-center gap-1.5 rounded-full bg-primary-fixed px-2.5 py-1 font-label-sm text-label-sm text-on-primary-fixed">
            <Icon name="verified" className="h-3.5 w-3.5" />
            RFC 4648
          </span>
        </div>
        <div>
          <label htmlFor="b64-input" className={labelClass}>
            Source Text / Payload
          </label>
          <textarea id="b64-input" rows={7} value={input} onChange={(event) => setInput(event.target.value)} placeholder={mode === "Encode" ? "Enter text to encode…" : "Enter Base64 to decode…"} className={inputClass} />
          <p className="mt-2 font-code-data text-code-data text-on-surface-variant">
            {input.length} chars • {inputBytes} bytes (UTF-8)
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={paste} className={secondaryButtonClass}>
            <Icon name="content_paste" className="h-4 w-4" />
            Paste
          </button>
          <button type="button" onClick={() => setInput("")} className={secondaryButtonClass}>
            <Icon name="delete_sweep" className="h-4 w-4" />
            Clear
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Base64 is encoding, not encryption. Anyone who receives the output can decode it.</p>
      </div>
      <div aria-live="polite" className="rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">RFC 4648 Output</h2>
          <span className="font-code-data text-code-data text-on-surface-variant">
            {outputBytes} bytes{inputBytes > 0 && output ? ` • +${Math.round(((outputBytes - inputBytes) / inputBytes) * 100)}%` : ""}
          </span>
        </div>
        {error ? (
          <p role="alert" className="mt-4 font-body-md text-body-md font-medium text-error">
            {error}
          </p>
        ) : (
          <>
            <p className="mt-4 break-words font-mono text-sm leading-relaxed text-on-surface">{output || "Output appears here"}</p>
            <button type="button" className={`${secondaryButtonClass} mt-4`} disabled={!output} onClick={copyOutput}>
              <MorphIcon from="content_copy" to="check" morphed={copied} className="h-4 w-4" />
              {copied ? "Copied" : "Copy Base64"}
            </button>
            {copyFailed ? <p className="mt-2 font-body-sm text-body-sm text-error">Could not copy. Select the text and press Ctrl+C (Cmd+C on Mac).</p> : null}
          </>
        )}
      </div>
    </div>
  );
}

function InvoicePanel() {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 0, unitPrice: 0 }]);
  const [tax, setTax] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const totals = invoiceTotals(items, Number(tax));
  const totalsError = totals && "error" in totals ? totals.error : null;
  const validTotals = totals && !("error" in totals) ? totals : null;
  const format = numberFormat(currency === "USD" ? "en-US" : "en-IN", currency);
  const formatDate = (value: string) => {
    if (!value) return "";
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return value;
    return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
  };
  const update = (index: number, field: keyof InvoiceItem, value: string) =>
    setItems((current) => current.map((item, itemIndex) => (itemIndex === index ? { ...item, [field]: field === "description" ? value : Number(value) } : item)));
  const usedItems = items.filter((item) => item.description.trim() || item.quantity || item.unitPrice);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-12">
      <div className="space-y-5 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
        <h2 className="flex items-center gap-2 font-display font-headline-sm text-headline-sm text-on-surface">
          <Icon name="briefcase" className="h-5 w-5 text-primary" />
          Invoice Details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="inv-from" className={labelClass}>
              From
            </label>
            <input id="inv-from" value={from} onChange={(event) => setFrom(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="inv-to" className={labelClass}>
              To
            </label>
            <input id="inv-to" value={to} onChange={(event) => setTo(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="inv-number" className={labelClass}>
              Invoice number
            </label>
            <input id="inv-number" value={invoiceNumber} onChange={(event) => setInvoiceNumber(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="inv-currency" className={labelClass}>
              Currency
            </label>
            <select id="inv-currency" value={currency} onChange={(event) => setCurrency(event.target.value)} className={inputClass}>
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
            </select>
          </div>
          <div>
            <label htmlFor="inv-issue" className={labelClass}>
              Issue date
            </label>
            <input id="inv-issue" type="date" value={issueDate} onChange={(event) => setIssueDate(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="inv-due" className={labelClass}>
              Due date (optional)
            </label>
            <input id="inv-due" type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} className={inputClass} />
          </div>
          <div>
            <label htmlFor="inv-tax" className={labelClass}>
              Tax rate (%)
            </label>
            <input id="inv-tax" type="number" min="0" max="100" step="0.01" value={tax} onChange={(event) => setTax(event.target.value)} className={inputClass} />
          </div>
        </div>
        <div>
          <label htmlFor="inv-notes" className={labelClass}>
            Notes
          </label>
          <textarea id="inv-notes" value={notes} onChange={(event) => setNotes(event.target.value)} rows={2} className={inputClass} />
        </div>
        <div>
          <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Line Items &amp; Services</h3>
          <div className="mt-3 space-y-3">
            {items.map((item, index) => (
              <div key={index} className="grid gap-3 rounded-xl border border-outline-variant/60 p-3 md:grid-cols-[1fr_110px_130px_auto]">
                <div>
                  <label htmlFor={`inv-desc-${index}`} className={labelClass}>
                    Description
                  </label>
                  <input id={`inv-desc-${index}`} value={item.description} onChange={(event) => update(index, "description", event.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor={`inv-qty-${index}`} className={labelClass}>
                    Quantity
                  </label>
                  <input id={`inv-qty-${index}`} type="number" min="0" step="0.01" value={item.quantity || ""} onChange={(event) => update(index, "quantity", event.target.value)} className={inputClass} />
                </div>
                <div>
                  <label htmlFor={`inv-price-${index}`} className={labelClass}>
                    Unit price
                  </label>
                  <input id={`inv-price-${index}`} type="number" min="0" step="0.01" value={item.unitPrice || ""} onChange={(event) => update(index, "unitPrice", event.target.value)} className={inputClass} />
                </div>
                <button type="button" className={`${secondaryButtonClass} self-end`} disabled={items.length === 1} onClick={() => setItems(items.filter((_, itemIndex) => itemIndex !== index))}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className={secondaryButtonClass} disabled={items.length >= 50} onClick={() => setItems([...items, { description: "", quantity: 0, unitPrice: 0 }])}>
            <Icon name="add_circle" className="h-4 w-4" />
            Add item
          </button>
          <button type="button" className={buttonClass} onClick={() => window.print()}>
            <Icon name="print" className="h-4 w-4" />
            Print / Save as PDF
          </button>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">Refreshing clears this form. The printed invoice has no watermark.</p>
      </div>

      {/* Live preview (print area) */}
      <div className="lg:col-span-5 lg:sticky lg:top-32">
        <div className="print-area rounded-xl bg-surface-container-lowest p-6 shadow-card" aria-live="polite">
          <div className="flex items-start justify-between border-b border-outline-variant/60 pb-4">
            <div>
              <p className="font-display font-headline-md text-headline-md text-on-surface">Invoice</p>
              <p className="font-code-data text-code-data text-on-surface-variant">#{invoiceNumber || "draft"}</p>
            </div>
            <p className="rounded-full bg-primary-fixed px-2.5 py-1 font-label-sm text-label-sm text-on-primary-fixed">Draft</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4 font-body-sm text-body-sm">
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">From</p>
              <p className="mt-1 text-on-surface">{from || "—"}</p>
            </div>
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Bill To</p>
              <p className="mt-1 text-on-surface">{to || "—"}</p>
            </div>
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Issued</p>
              <p className="mt-1 text-on-surface">{formatDate(issueDate)}</p>
            </div>
            <div>
              <p className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Due</p>
              <p className="mt-1 text-on-surface">{dueDate ? formatDate(dueDate) : "—"}</p>
            </div>
          </div>
          <table className="mt-5 w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-outline-variant/60 font-label-sm text-label-sm text-on-surface-variant">
                <th className="py-2 pr-2 font-semibold">Item</th>
                <th className="py-2 pr-2 text-right font-semibold">Qty</th>
                <th className="py-2 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {usedItems.length ? (
                usedItems.map((item, index) => (
                  <tr key={index} className="border-b border-outline-variant/40">
                    <td className="py-2 pr-2 text-on-surface">{item.description || "Untitled item"}</td>
                    <td className="py-2 pr-2 text-right tabular-nums text-on-surface-variant">{item.quantity}</td>
                    <td className="py-2 text-right font-mono tabular-nums text-on-surface">{format.format(item.quantity * item.unitPrice)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="py-4 text-center text-on-surface-variant">
                    Add at least one item.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {totalsError ? (
            <p role="alert" className="mt-4 font-body-sm text-body-sm font-medium text-error">
              {totalsError}
            </p>
          ) : (
            <div className="mt-4 space-y-1.5 font-body-md text-body-md text-on-surface">
              <p className="flex justify-between">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-mono tabular-nums">{format.format(validTotals!.subtotal / 100)}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-on-surface-variant">Tax ({tax || 0}%)</span>
                <span className="font-mono tabular-nums">{format.format(validTotals!.tax / 100)}</span>
              </p>
              <p className="flex justify-between border-t border-outline-variant/60 pt-2 font-display font-headline-sm text-headline-sm">
                <span>Total</span>
                <span className="font-mono tabular-nums">{format.format(validTotals!.total / 100)}</span>
              </p>
            </div>
          )}
          {notes ? <p className="mt-4 border-t border-outline-variant/60 pt-3 font-body-sm text-body-sm text-on-surface-variant">{notes}</p> : null}
        </div>
      </div>
    </div>
  );
}

function FakePanel() {
  const [name, setName] = useState("");
  const [messages, setMessages] = useState<FakeMessage[]>([]);
  const [text, setText] = useState("");
  const [side, setSide] = useState<FakeMessage["side"]>("received");
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const add = () => {
    const next = { side, text };
    const nextError = validateMessage(next);
    if (nextError) {
      setError(nextError);
      return;
    }
    setMessages([...messages, next]);
    setText("");
    setError("");
  };
  const exportPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const wrap = (value: string, maxWidth: number): string[] => {
      const lines: string[] = [];
      let line = "";
      const flush = () => {
        if (line) {
          lines.push(line);
          line = "";
        }
      };
      for (const word of value.split(/\s+/)) {
        if (context.measureText(word).width > maxWidth) {
          flush();
          let rest = word;
          while (rest) {
            let cut = 1;
            while (cut < rest.length && context.measureText(rest.slice(0, cut + 1)).width <= maxWidth) cut += 1;
            lines.push(rest.slice(0, cut));
            rest = rest.slice(cut);
          }
          continue;
        }
        const test = line ? `${line} ${word}` : word;
        if (context.measureText(test).width <= maxWidth) line = test;
        else {
          flush();
          line = word;
        }
      }
      flush();
      return lines;
    };
    context.font = "16px system-ui";
    const boxes = messages.map((message) => {
      const lines = wrap(message.text, 372);
      return { message, lines, height: lines.length * 22 + 20 };
    });
    canvas.width = 720;
    canvas.height = Math.max(220, 100 + boxes.reduce((sum, box) => sum + box.height + 18, 0));
    context.fillStyle = "#f4f6fc";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "#0f172a";
    context.font = "600 20px system-ui";
    context.fillText(name || "Chat mockup", 24, 36);
    context.font = "16px system-ui";
    let y = 70;
    for (const box of boxes) {
      const x = box.message.side === "sent" ? 300 : 24;
      context.fillStyle = box.message.side === "sent" ? "#e2dfff" : "#ffffff";
      context.fillRect(x, y, 396, box.height);
      context.fillStyle = "#0f172a";
      box.lines.forEach((lineText, lineIndex) => {
        context.fillText(lineText, x + 12, y + 26 + lineIndex * 22);
      });
      y += box.height + 18;
    }
    const link = document.createElement("a");
    link.download = "fake-chat.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  return (
    <div className="grid items-start gap-6 md:grid-cols-2">
      <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card">
        <h2 className="flex items-center gap-2 font-display font-headline-sm text-headline-sm text-on-surface">
          <Icon name="chat_bubble" className="h-5 w-5 text-primary" />
          Message Composer
        </h2>
        <div>
          <label htmlFor="fake-name" className={labelClass}>
            Contact name
          </label>
          <input id="fake-name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} />
        </div>
        <Segmented value={side} options={["received", "sent"]} onChange={(value) => setSide(value as FakeMessage["side"])} ariaLabel="Message side" />
        <div>
          <label htmlFor="fake-text" className={labelClass}>
            Message ({text.length}/500)
          </label>
          <textarea id="fake-text" maxLength={500} rows={3} value={text} onChange={(event) => setText(event.target.value)} className={inputClass} />
        </div>
        {error ? (
          <p role="alert" className="font-body-sm text-body-sm font-medium text-error">
            {error}
          </p>
        ) : null}
        <button type="button" className={buttonClass} disabled={!canAddMessage(messages)} onClick={add}>
          <Icon name="add_circle" className="h-4 w-4" />
          Add message
        </button>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Label fictional conversations clearly when context could be misunderstood. Never present a mockup as evidence of a real exchange.
        </p>
      </div>
      <div className="rounded-xl bg-surface-container-lowest p-4 shadow-card">
        <div className="rounded-xl bg-canvas p-4">
          <p className="text-center font-display font-headline-sm text-headline-sm text-on-surface">{name || "Chat mockup"}</p>
          {messages.length ? (
            <div className="mt-4 space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.side === "sent" ? "justify-end" : "justify-start"}`}>
                  <span className={`max-w-[85%] break-words rounded-xl px-3 py-2 shadow-sm font-body-md text-body-md ${message.side === "sent" ? "bg-primary-fixed text-on-surface" : "bg-white text-on-surface"}`}>
                    {message.text}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-8 text-center font-body-sm text-body-sm text-on-surface-variant">Add a message to see the preview.</p>
          )}
        </div>
        <button type="button" className={`${buttonClass} mt-4 w-full`} disabled={!messages.length} onClick={exportPng}>
          <Icon name="download" className="h-4 w-4" />
          Export PNG
        </button>
      </div>
      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}

export function ToolPanel({ kind }: { kind: string }) {
  switch (kind) {
    case "age-calculator":
      return <AgePanel />;
    case "emi-calculator":
      return <EmiPanel />;
    case "mortgage-calculator":
      return <EmiPanel mortgage />;
    case "bmi-calculator":
      return <BmiPanel />;
    case "cgpa-to-percentage":
      return <CgpaPanel />;
    case "word-counter":
      return <WordPanel />;
    case "text-to-speech":
      return <SpeechPanel />;
    case "fancy-text-generator":
      return <FancyPanel />;
    case "base64-encoder-decoder":
      return <Base64Panel />;
    case "invoice-generator":
      return <InvoicePanel />;
    case "fake-text-generator":
      return <FakePanel />;
    default:
      return <p>Tool unavailable.</p>;
  }
}
