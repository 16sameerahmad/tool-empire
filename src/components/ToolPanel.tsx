"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { bmi, poundsToKg, validateMetric } from "@/tools/bmi/logic";
import { emi } from "@/tools/emi/logic";
import { sip } from "@/tools/sip/logic";
import { attendance } from "@/tools/attendance/logic";
import { ppf } from "@/tools/ppf/logic";
import { sgpaToCgpa } from "@/tools/sgpa/logic";
import { invoiceTotals, type InvoiceItem } from "@/tools/invoice/logic";
import { styleText, type Style } from "@/tools/fancy-text/logic";
import { decodeB64, encodeB64 } from "@/tools/base64/logic";
import { chunkText } from "@/tools/text-to-speech/logic";
import { wordStats } from "@/tools/word-counter/logic";
import { canAddMessage, type FakeMessage, validateMessage } from "@/tools/fake-text/logic";
import {
  detectCornerColor,
  hexToRgb,
  processImageBackground,
  removeBackgroundAI,
  rgbToHex,
  type RemoveBackgroundAIProgress,
} from "@/tools/remove-background/logic";
import { calculateGst } from "@/tools/gst/logic";
import { calculateSwp } from "@/tools/swp/logic";
import { calculateLumpsum } from "@/tools/lumpsum/logic";
import { calculateCagr } from "@/tools/cagr/logic";
import {
  calculateIsWhatPercent,
  calculatePercentChange,
  calculatePercentOf,
} from "@/tools/percentage/logic";
import { computeAspectRatioFit, formatFileSize } from "@/tools/image-resizer/logic";
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

function AttendancePanel() {
  const [totalClasses, setTotalClasses] = useState("50");
  const [attendedClasses, setAttendedClasses] = useState("42");
  const [targetPct, setTargetPct] = useState("75");
  const [copied, setCopied] = useState(false);

  const res = attendance(Number(attendedClasses), Number(totalClasses), Number(targetPct));
  const error = res && "error" in res ? res.error : null;
  const valid = res && !("error" in res) ? res : null;

  const copySummary = async () => {
    if (!valid) return;
    const text = `Attendance Report: ${attendedClasses}/${totalClasses} (${valid.currentPercentage}%). Target: ${valid.targetPercentage}%. Status: ${
      valid.status === "safe"
        ? `Safe! You can bunk ${valid.classesCanBunk} more classes.`
        : valid.status === "target_reached"
        ? `On target (75%). Cannot bunk any classes right now.`
        : `Shortage! You must attend ${valid.classesToAttend} consecutive classes to reach 75%.`
    }`;
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
        <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <label htmlFor="att-total" className="font-display font-headline-sm text-headline-sm text-on-surface">
              Total Classes Held
            </label>
            <input
              id="att-total"
              type="number"
              min="1"
              value={totalClasses}
              onChange={(e) => setTotalClasses(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <label htmlFor="att-attended" className="font-display font-headline-sm text-headline-sm text-on-surface">
              Classes Attended
            </label>
            <input
              id="att-attended"
              type="number"
              min="0"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(e.target.value)}
              className={inputClass}
            />
          </div>

          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="att-target" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Target Attendance (%)
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Default 75%</span>
            </div>
            <input
              id="att-target"
              type="number"
              min="50"
              max="95"
              value={targetPct}
              onChange={(e) => setTargetPct(e.target.value)}
              className={inputClass}
            />
            <div className="flex gap-2 pt-1">
              {[75, 80, 85].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTargetPct(String(preset))}
                  className={`btn-chip rounded px-2.5 py-1 text-xs font-medium ${
                    Number(targetPct) === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface"
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          {error ? (
            <div role="alert" className="rounded-xl border border-error/20 bg-error-container/20 p-4 font-body-md text-error">
              {error}
            </div>
          ) : (
            <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card">
              <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Attendance Status</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Current Attendance</span>
                  <span className="mt-1 block font-code-data text-3xl font-black text-on-surface">
                    {valid ? `${valid.currentPercentage}%` : "0%"}
                  </span>
                </div>

                {valid && valid.status === "safe" && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                    <span className="block font-label-md text-label-md font-semibold text-emerald-700">You Are Safe!</span>
                    <span className="mt-1 block font-body-md text-body-md text-on-surface">
                      You can bunk <strong className="text-xl text-emerald-600">{valid.classesCanBunk}</strong> upcoming classes without falling below {valid.targetPercentage}%.
                    </span>
                  </div>
                )}

                {valid && valid.status === "shortage" && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                    <span className="block font-label-md text-label-md font-semibold text-amber-700">Attendance Shortage!</span>
                    <span className="mt-1 block font-body-md text-body-md text-on-surface">
                      You must attend the next <strong className="text-xl text-amber-600">{valid.classesToAttend}</strong> consecutive classes to reach {valid.targetPercentage}%.
                    </span>
                  </div>
                )}

                {valid && valid.status === "target_reached" && (
                  <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
                    <span className="block font-label-md text-label-md font-semibold text-blue-700">Right On Track</span>
                    <span className="mt-1 block font-body-md text-body-md text-on-surface">
                      You are exactly at {valid.targetPercentage}%. Attending every scheduled lecture is recommended.
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!valid}
                  className="btn-press flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-primary disabled:opacity-50"
                >
                  <Icon name={copied ? "check" : "content_copy"} className="h-4 w-4" />
                  {copied ? "Status copied!" : "Copy Status"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PpfPanel() {
  const [annualDeposit, setAnnualDeposit] = useState("150000");
  const [tenureYears, setTenureYears] = useState("15");
  const [copied, setCopied] = useState(false);

  const res = ppf(Number(annualDeposit), Number(tenureYears), 7.1);
  const error = res && "error" in res ? res.error : null;
  const valid = res && !("error" in res) ? res : null;
  const format = numberFormat("en-IN", "INR");

  const copySummary = async () => {
    if (!valid) return;
    const text = `PPF Investment Summary: ${format.format(Number(annualDeposit))}/year for ${tenureYears} years. Total Deposited: ${format.format(valid.investedAmount)}. Total Tax-Free Interest: ${format.format(valid.totalInterest)}. Expected Maturity Balance: ${format.format(valid.maturityAmount)}.`;
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
        <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="ppf-deposit" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Yearly Deposit (₹)
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Max ₹1.5L / year</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 font-code-data font-semibold text-on-surface-variant">₹</span>
              <input
                id="ppf-deposit"
                type="number"
                min="500"
                max="150000"
                step="500"
                value={annualDeposit}
                onChange={(e) => setAnnualDeposit(e.target.value)}
                className={`${inputClass} mt-0 pl-8 font-code-data`}
              />
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[10000, 50000, 100000, 150000].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAnnualDeposit(String(preset))}
                  className={`btn-chip rounded px-2.5 py-1 text-xs font-medium ${
                    Number(annualDeposit) === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface"
                  }`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="ppf-tenure" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Time Period (Years)
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Min 15 years</span>
            </div>
            <input
              id="ppf-tenure"
              type="number"
              min="15"
              max="50"
              step="5"
              value={tenureYears}
              onChange={(e) => setTenureYears(e.target.value)}
              className={inputClass}
            />
            <div className="flex gap-2 pt-1">
              {[15, 20, 25, 30].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTenureYears(String(preset))}
                  className={`btn-chip rounded px-2.5 py-1 text-xs font-medium ${
                    Number(tenureYears) === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface"
                  }`}
                >
                  {preset} Years
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-surface-container-low/50 p-4">
            <span className="font-display font-headline-sm text-sm font-semibold text-on-surface">Government Interest Rate</span>
            <span className="mt-1 block font-code-data text-xl font-bold text-primary">7.1% p.a. (Compounded Annually)</span>
            <span className="font-body-sm text-xs text-on-surface-variant">100% Tax-Free under Section 80C (EEE Category)</span>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          {error ? (
            <div role="alert" className="rounded-xl border border-error/20 bg-error-container/20 p-4 font-body-md text-error">
              {error}
            </div>
          ) : (
            <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card">
              <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Maturity Summary</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Total Invested</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-on-surface">
                    {valid ? format.format(valid.investedAmount) : "₹ 0"}
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Total Interest Earned</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-primary">
                    {valid ? format.format(valid.totalInterest) : "₹ 0"}
                  </span>
                </div>
                <div className="rounded-xl bg-primary-container/10 border border-primary-container/20 p-4">
                  <span className="block font-label-md text-label-md text-primary">Total Maturity Value</span>
                  <span className="mt-1 block font-code-data text-3xl font-black text-on-surface">
                    {valid ? format.format(valid.maturityAmount) : "₹ 0"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!valid}
                  className="btn-press flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-primary disabled:opacity-50"
                >
                  <Icon name={copied ? "check" : "content_copy"} className="h-4 w-4" />
                  {copied ? "Summary copied!" : "Copy Summary"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SgpaPanel() {
  const [sems, setSems] = useState<Array<{ sgpa: string; credits: string }>>([
    { sgpa: "8.2", credits: "20" },
    { sgpa: "8.5", credits: "20" },
    { sgpa: "8.0", credits: "22" },
    { sgpa: "8.8", credits: "22" },
  ]);
  const [copied, setCopied] = useState(false);

  const parsed = sems.map((s) => ({
    sgpa: Number(s.sgpa) || 0,
    credits: s.credits !== "" ? Number(s.credits) : undefined,
  }));

  const res = sgpaToCgpa(parsed);
  const error = res && "error" in res ? res.error : null;
  const valid = res && !("error" in res) ? res : null;

  const updateSem = (idx: number, field: "sgpa" | "credits", val: string) => {
    setSems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const addSem = () => {
    if (sems.length < 8) {
      setSems((prev) => [...prev, { sgpa: "8.0", credits: "20" }]);
    }
  };

  const removeSem = (idx: number) => {
    if (sems.length > 1) {
      setSems((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const copySummary = async () => {
    if (!valid) return;
    const text = `SGPA to CGPA Result: Cumulative CGPA: ${valid.cgpa} across ${sems.length} semesters. Equivalent Percentage (CBSE/AICTE ×9.5): ${valid.percentageCbse}%. Equivalent Percentage (×10): ${valid.percentageStandard}%.`;
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
        <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          <div className="flex items-center justify-between pb-2">
            <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Enter Semester SGPAs</h3>
            {sems.length < 8 && (
              <button
                type="button"
                onClick={addSem}
                className="btn-chip flex items-center gap-1 rounded bg-primary-container px-2.5 py-1 text-xs text-white"
              >
                + Add Semester
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sems.map((sem, idx) => (
              <div key={idx} className="flex items-center gap-3 rounded-lg bg-surface-container-low/50 p-3">
                <span className="w-16 font-label-md text-sm font-semibold text-on-surface">Sem {idx + 1}</span>
                <div className="flex-1">
                  <label htmlFor={`sgpa-${idx}`} className="sr-only">SGPA</label>
                  <input
                    id={`sgpa-${idx}`}
                    type="number"
                    min="0"
                    max="10"
                    step="0.01"
                    placeholder="SGPA (0-10)"
                    value={sem.sgpa}
                    onChange={(e) => updateSem(idx, "sgpa", e.target.value)}
                    className={`${inputClass} mt-0`}
                  />
                </div>
                <div className="w-28">
                  <label htmlFor={`credits-${idx}`} className="sr-only">Credits</label>
                  <input
                    id={`credits-${idx}`}
                    type="number"
                    min="0"
                    max="40"
                    placeholder="Credits"
                    value={sem.credits}
                    onChange={(e) => updateSem(idx, "credits", e.target.value)}
                    className={`${inputClass} mt-0`}
                  />
                </div>
                {sems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSem(idx)}
                    className="grid h-8 w-8 place-items-center rounded text-error hover:bg-error/10"
                    aria-label={`Remove semester ${idx + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-5">
          {error ? (
            <div role="alert" className="rounded-xl border border-error/20 bg-error-container/20 p-4 font-body-md text-error">
              {error}
            </div>
          ) : (
            <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card">
              <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Cumulative Results</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-primary-container/10 border border-primary-container/20 p-4">
                  <span className="block font-label-md text-label-md text-primary">Cumulative CGPA</span>
                  <span className="mt-1 block font-code-data text-4xl font-black text-on-surface">
                    {valid ? valid.cgpa : "0.00"}
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Equivalent Marks (CBSE / AICTE ×9.5)</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-on-surface">
                    {valid ? `${valid.percentageCbse}%` : "0%"}
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Equivalent Marks (Standard ×10)</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-on-surface">
                    {valid ? `${valid.percentageStandard}%` : "0%"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!valid}
                  className="btn-press flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-primary disabled:opacity-50"
                >
                  <Icon name={copied ? "check" : "content_copy"} className="h-4 w-4" />
                  {copied ? "Results copied!" : "Copy Results"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SipPanel() {
  const [monthlyAmount, setMonthlyAmount] = useState("5000");
  const [returnRate, setReturnRate] = useState("12");
  const [durationYears, setDurationYears] = useState("10");
  const [copied, setCopied] = useState(false);

  const hasValues = monthlyAmount !== "" && returnRate !== "" && durationYears !== "";
  const result = hasValues ? sip(Number(monthlyAmount), Number(returnRate), Number(durationYears)) : null;
  const error = result && "error" in result ? result.error : null;
  const valid = result && !("error" in result) ? result : null;
  const format = numberFormat("en-IN", "INR");
  const presets = [1000, 2500, 5000, 10000, 25000];
  const monthlyAmountNum = Number(monthlyAmount) || 0;

  const totalValue = valid ? valid.totalValue : 0;
  const invested = valid ? valid.investedAmount : 0;
  const investedPct = totalValue > 0 ? Math.round((invested / totalValue) * 100) : 0;
  const returnsPct = 100 - investedPct;

  const copySummary = async () => {
    if (!valid) return;
    const text = `SIP Investment Plan: ${format.format(Number(monthlyAmount))}/month for ${durationYears} years at ${returnRate}% expected return. Invested Amount: ${format.format(valid.investedAmount)}. Estimated Wealth Gain: ${format.format(valid.estimatedReturns)}. Expected Maturity Value: ${format.format(valid.totalValue)}. (Estimate only, subject to market fluctuations).`;
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
        {/* Params (7 cols) */}
        <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card lg:col-span-7">
          {/* Monthly Investment */}
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sip-amount" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Monthly Investment
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">SIP deposit amount</span>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 font-code-data font-semibold text-on-surface-variant">₹</span>
              <input
                id="sip-amount"
                type="number"
                min="100"
                step="500"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                className={`${inputClass} mt-0 pl-8 font-code-data`}
              />
            </div>
            <input
              type="range"
              min={500}
              max={100000}
              step={500}
              value={Math.min(monthlyAmountNum, 100000)}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Monthly investment slider"
            />
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="mr-1 font-label-sm text-label-sm text-on-surface-variant">Presets:</span>
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setMonthlyAmount(String(preset))}
                  className={`btn-chip rounded px-2.5 py-1 font-code-data text-xs ${
                    monthlyAmountNum === preset ? "bg-primary-container text-white" : "bg-surface-container text-on-surface hover:bg-primary-container hover:text-white"
                  }`}
                >
                  ₹{preset.toLocaleString("en-IN")}
                </button>
              ))}
            </div>
          </div>

          {/* Expected Return Rate */}
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sip-rate" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Expected Return Rate (p.a.)
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Historical avg 12-15%</span>
            </div>
            <div className="relative flex items-center">
              <input
                id="sip-rate"
                type="number"
                min="1"
                max="30"
                step="0.5"
                value={returnRate}
                onChange={(e) => setReturnRate(e.target.value)}
                className={`${inputClass} mt-0 pr-8 font-code-data`}
              />
              <span className="absolute right-3 font-code-data font-semibold text-on-surface-variant">%</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={Number(returnRate) || 12}
              onChange={(e) => setReturnRate(e.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Return rate slider"
            />
          </div>

          {/* Time Period (Years) */}
          <div className="space-y-2 rounded-xl bg-surface-container-low/50 p-4">
            <div className="flex items-center justify-between">
              <label htmlFor="sip-years" className="font-display font-headline-sm text-headline-sm text-on-surface">
                Investment Period
              </label>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Years</span>
            </div>
            <div className="relative flex items-center">
              <input
                id="sip-years"
                type="number"
                min="1"
                max="40"
                step="1"
                value={durationYears}
                onChange={(e) => setDurationYears(e.target.value)}
                className={`${inputClass} mt-0 pr-16 font-code-data`}
              />
              <span className="absolute right-3 font-code-data font-semibold text-on-surface-variant">Years</span>
            </div>
            <input
              type="range"
              min={1}
              max={40}
              step={1}
              value={Number(durationYears) || 10}
              onChange={(e) => setDurationYears(e.target.value)}
              className="h-2 w-full cursor-pointer accent-primary-container"
              aria-label="Investment period slider"
            />
          </div>
        </div>

        {/* Results (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          {error ? (
            <div role="alert" className="rounded-xl border border-error/20 bg-error-container/20 p-4 font-body-md text-error">
              {error}
            </div>
          ) : (
            <div className="space-y-4 rounded-xl bg-surface-container-lowest p-6 shadow-card">
              <h3 className="font-display font-headline-sm text-headline-sm text-on-surface">Expected Wealth Summary</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Invested Amount</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-on-surface">
                    {valid ? format.format(valid.investedAmount) : "₹ 0"}
                  </span>
                </div>
                <div className="rounded-xl bg-surface-container-low p-4">
                  <span className="block font-label-md text-label-md text-on-surface-variant">Estimated Wealth Gain</span>
                  <span className="mt-1 block font-code-data text-2xl font-bold text-primary">
                    {valid ? format.format(valid.estimatedReturns) : "₹ 0"}
                  </span>
                </div>
                <div className="rounded-xl bg-primary-container/10 border border-primary-container/20 p-4">
                  <span className="block font-label-md text-label-md text-primary">Total Maturity Value</span>
                  <span className="mt-1 block font-code-data text-3xl font-black text-on-surface">
                    {valid ? format.format(valid.totalValue) : "₹ 0"}
                  </span>
                </div>

                {valid && totalValue > 0 && (
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between font-label-sm text-xs text-on-surface-variant">
                      <span>Invested: {investedPct}%</span>
                      <span>Growth: {returnsPct}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                      <div className="h-full bg-primary-container" style={{ width: `${investedPct}%` }} />
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={copySummary}
                  disabled={!valid}
                  className="btn-press flex w-full items-center justify-center gap-2 rounded-lg bg-primary-container px-3 py-2.5 font-label-md text-label-md text-white transition-colors hover:bg-primary disabled:opacity-50"
                >
                  <Icon name={copied ? "check" : "content_copy"} className="h-4 w-4" />
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
              <h4 className="font-display font-headline-sm text-sm font-semibold text-on-surface">Power of Compounding</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                SIP gains compound over time. The longer you stay invested, the larger the wealth gain component relative to your actual invested principal.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Formula explanation */}
      <div className="mt-6 rounded-2xl bg-surface-container-lowest p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary-container/10 text-primary">
            <Icon name="functions" className="h-4 w-4" />
          </span>
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">The Mathematical Formula Behind SIP Returns</h2>
        </div>
        <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
          Future value of systematic periodic investments calculated using the standard annuity compound interest formula:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl bg-surface-container-low p-4 text-center">
          <p className="font-mono text-lg font-bold tracking-wide text-on-surface md:text-xl">
            M = P × [((1 + i)<sup>n</sup> − 1) / i] × (1 + i)
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-3">
          {[
            { k: "P = Monthly Deposit", v: "Fixed monthly amount invested regularly." },
            { k: "i = Monthly Return Rate", v: "Annual expected return rate divided by 12, then divided by 100." },
            { k: "n = Total Months", v: "Total number of monthly instalments (Years × 12)." },
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

/** BMI screening scales. WHO is the global standard; the Indian/Asian ICMR scale uses lower
 *  overweight/obesity cutoffs (23.0 / 25.0) because health risks rise at lower BMI values in
 *  Asian populations. Implemented here (not in tools/bmi/logic.ts) so the shared logic stays
 *  untouched. */
export const BMI_SCALES = {
  who: {
    label: "WHO Global Standard (25.0 Overweight / 30.0 Obese)",
    shortLabel: "WHO Global",
    categories: [
      { name: "Underweight", min: 0, max: 18.49, rangeText: "Below 18.5" },
      { name: "Normal Weight", min: 18.5, max: 24.99, rangeText: "18.5 – 24.9" },
      { name: "Overweight", min: 25.0, max: 29.99, rangeText: "25.0 – 29.9" },
      { name: "Obese (Class I–III)", min: 30.0, max: Infinity, rangeText: "30.0 & Above" },
    ],
    healthyRange: [18.5, 24.9] as const,
  },
  asian: {
    label: "Indian / Asian ICMR Standard (23.0 Overweight / 25.0 Obese)",
    shortLabel: "Indian / Asian ICMR",
    categories: [
      { name: "Underweight", min: 0, max: 18.49, rangeText: "Below 18.5" },
      { name: "Normal / Healthy Weight", min: 18.5, max: 22.99, rangeText: "18.5 – 22.9" },
      { name: "Overweight (At Risk)", min: 23.0, max: 24.99, rangeText: "23.0 – 24.9" },
      { name: "Obese (Action Required)", min: 25.0, max: Infinity, rangeText: "25.0 & Above" },
    ],
    healthyRange: [18.5, 22.9] as const,
  },
} as const;

export type BmiScaleKey = keyof typeof BMI_SCALES;

function BmiPanel() {
  const [unit, setUnit] = useState("Metric");
  const [scale, setScale] = useState<BmiScaleKey>("who");
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
  const activeScale = BMI_SCALES[scale];
  const category =
    value !== null
      ? activeScale.categories.find((c) => value >= c.min && value <= c.max)?.name ??
        activeScale.categories[activeScale.categories.length - 1].name
      : null;
  const changeUnit = (next: string) => {
    setUnit(next);
    setHeight("");
    setWeight("");
    setFeet("");
    setInches("");
  };
  const markerPct = value !== null ? Math.min(100, Math.max(0, ((value - 14) / (40 - 14)) * 100)) : 0;
  const [healthyLow, healthyHigh] = activeScale.healthyRange;
  const idealLow = heightCm ? healthyLow * (heightCm / 100) ** 2 : null;
  const idealHigh = heightCm ? healthyHigh * (heightCm / 100) ** 2 : null;
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
          <div>
            <span className={labelClass}>BMI scale</span>
            <div className="mt-1">
              <Segmented
                value={activeScale.shortLabel}
                options={["WHO Global", "Indian / Asian ICMR"]}
                onChange={(next) => setScale(next === "WHO Global" ? "who" : "asian")}
                ariaLabel="BMI screening scale"
              />
            </div>
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{activeScale.label}</p>
          </div>
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
              <span className="rounded bg-secondary-fixed px-2 py-0.5 font-label-sm text-label-sm text-on-secondary-fixed-variant">
                {scale === "who" ? "WHO Clinical Result" : "Indian / Asian ICMR Result"}
              </span>
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
                    (BMI {healthyLow}–{healthyHigh} for your height)
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
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">WHO vs Indian / Asian ICMR Cut-offs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="px-6 py-3 font-medium text-on-surface">Category</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">WHO Global</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">Indian / Asian ICMR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                ["Underweight", "< 18.5", "< 18.5"],
                ["Normal", "18.5 – 24.9", "18.5 – 22.9"],
                ["Overweight", "25.0 – 29.9", "23.0 – 24.9"],
                ["Obese (Class I)", "30.0 – 34.9", "25.0 – 29.9"],
                ["Obese (Class II+)", "35.0 & above", "30.0 & above"],
              ].map(([label, who, asian]) => (
                <tr key={label}>
                  <td className="px-6 py-3 font-medium text-on-surface">{label}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{who}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{asian}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
          BMI is a screening measure, not a diagnosis, and is intended for adults 18 and over.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="border-b border-surface-container px-6 py-4">
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">Healthy Weight by Height</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="px-6 py-3 font-medium text-on-surface">Height</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">Indian / Asian (18.5–22.9)</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">WHO (18.5–24.9)</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">WHO obesity (30.0)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                ["150 cm", "41.6 – 51.5 kg", "41.6 – 56.0 kg", "67.5 kg"],
                ["155 cm", "44.4 – 55.0 kg", "44.4 – 59.8 kg", "72.1 kg"],
                ["160 cm", "47.4 – 58.6 kg", "47.4 – 63.7 kg", "76.8 kg"],
                ["165 cm", "50.4 – 62.3 kg", "50.4 – 67.8 kg", "81.7 kg"],
                ["170 cm", "53.5 – 66.2 kg", "53.5 – 72.0 kg", "86.7 kg"],
                ["175 cm", "56.7 – 70.1 kg", "56.7 – 76.3 kg", "91.9 kg"],
                ["180 cm", "59.9 – 74.2 kg", "59.9 – 80.7 kg", "97.2 kg"],
                ["185 cm", "63.3 – 78.4 kg", "63.3 – 85.2 kg", "102.7 kg"],
                ["190 cm", "66.8 – 82.7 kg", "66.8 – 89.9 kg", "108.3 kg"],
              ].map(([height, indian, who, obese]) => (
                <tr key={height}>
                  <td className="px-6 py-3 font-medium text-on-surface">{height}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{indian}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{who}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{obese}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
          Healthy weight ranges are BMI × height² for each scale. The last column is the weight at
          which the WHO obesity threshold (BMI 30.0) is reached for that height.
        </p>
      </div>
    </div>
  );
}

/** CGPA-to-percentage formulas by institution. Verified against published conversions:
 *  CBSE ×9.5; UGC/AICTE/IIT/NIT ×10; VTU/AKTU/JNTU (CGPA−0.75)×10; GTU/BPUT (CGPA−0.5)×10;
 *  Mumbai University 7.1×CGPA+11 (the most widely cited MU formula — check your transcript).
 *  Deliberately NOT shipped: SPPU (its formula varies by batch/circular: ×8.8, ×8.9, or
 *  (CGPA−0.75)×10) and Anna University (varies by regulation: CGPA×10 or (CGPA×10)−7.5).
 *  Implemented here (not in tools/cgpa/logic.ts) so the shared logic stays untouched. */
export const CGPA_FORMULAS = {
  cbse95: {
    name: "CBSE Class 10/12 & Standard 9.5 Rule (CGPA × 9.5)",
    shortFormula: "Percentage = CGPA × 9.5",
    maxCgpa: 10,
    calculate: (cgpa: number) => Math.min(100, cgpa * 9.5),
  },
  ugc10: {
    name: "UGC / AICTE / IIT / NIT 10-Point Direct Scale (CGPA × 10)",
    shortFormula: "Percentage = CGPA × 10",
    maxCgpa: 10,
    calculate: (cgpa: number) => Math.min(100, cgpa * 10),
  },
  vtu: {
    name: "VTU / AKTU / JNTU (CBCS Scheme): (CGPA − 0.75) × 10",
    shortFormula: "Percentage = (CGPA − 0.75) × 10",
    maxCgpa: 10,
    calculate: (cgpa: number) => Math.max(0, Math.min(100, (cgpa - 0.75) * 10)),
  },
  gtu: {
    name: "GTU / BPUT: (CGPA − 0.5) × 10",
    shortFormula: "Percentage = (CGPA − 0.5) × 10",
    maxCgpa: 10,
    calculate: (cgpa: number) => Math.max(0, Math.min(100, (cgpa - 0.5) * 10)),
  },
  mumbai: {
    name: "Mumbai University (MU 10-Point CBSGS): (7.1 × CGPA) + 11",
    shortFormula: "Percentage = (7.1 × CGPA) + 11",
    maxCgpa: 10,
    calculate: (cgpa: number) => Math.min(100, 7.1 * cgpa + 11),
  },
} as const;

export type CgpaFormulaKey = keyof typeof CGPA_FORMULAS;

function cgpaDivision(percentage: number): string {
  if (percentage >= 75) return "First Class with Distinction";
  if (percentage >= 60) return "First Class / Division";
  if (percentage >= 50) return "Second Class / Division";
  return "Pass Class";
}

function CgpaPanel() {
  const [value, setValue] = useState("");
  const [formulaKey, setFormulaKey] = useState<CgpaFormulaKey>("cbse95");
  const [copied, setCopied] = useState(false);
  const formula = CGPA_FORMULAS[formulaKey];
  const num = value === "" ? null : Number(value);
  const validInput =
    num !== null && Number.isFinite(num) && num >= 0 && num <= 10 && /^\d+(\.\d{1,2})?$/.test(value.trim());
  const errorMessage = value === "" ? null : validInput ? null : "CGPA must be a number from 0 to 10 with up to 2 decimals.";
  const percent = validInput && num !== null ? Number(formula.calculate(num).toFixed(2)) : null;
  const division = percent !== null ? cgpaDivision(percent) : null;
  const copyResult = async () => {
    if (percent === null) return;
    try {
      await navigator.clipboard.writeText(`${percent.toFixed(2)}% (Estimated, ${formula.shortFormula})`);
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
          <div>
            <label htmlFor="cgpa-formula" className={labelClass}>
              Grading Standard &amp; University Rule
            </label>
            <select
              id="cgpa-formula"
              value={formulaKey}
              onChange={(event) => setFormulaKey(event.target.value as CgpaFormulaKey)}
              className={inputClass}
            >
              {(Object.keys(CGPA_FORMULAS) as CgpaFormulaKey[]).map((key) => (
                <option key={key} value={key}>
                  {CGPA_FORMULAS[key].name}
                </option>
              ))}
            </select>
            <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
              {formula.shortFormula}. Institutions differ — if your transcript already prints a
              percentage, use that. SPPU and Anna University are not listed because their official
              formulas vary by batch and regulation; check your college&apos;s circular.
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
              <p className="mt-1 font-display font-headline-sm text-headline-sm text-primary">{division}</p>
              <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">
                Active calculation formula:{" "}
                <span className="font-code-data text-on-surface">
                  {formula.shortFormula.replace("CGPA", `CGPA (${num !== null ? num.toFixed(2) : ""})`)}
                </span>
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

      <div className="mt-6 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="border-b border-surface-container px-6 py-4">
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">Official Conversion Formulas</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="px-6 py-3 font-medium text-on-surface">University / Board</th>
                <th className="px-6 py-3 font-medium text-on-surface">Formula</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">8.0 CGPA</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">9.0 CGPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                ["CBSE (Class 10/12)", "CGPA × 9.5", "76.00%", "85.50%"],
                ["UGC / AICTE / IIT / NIT", "CGPA × 10", "80.00%", "90.00%"],
                ["VTU / AKTU / JNTU", "(CGPA − 0.75) × 10", "72.50%", "82.50%"],
                ["GTU / BPUT", "(CGPA − 0.5) × 10", "75.00%", "85.00%"],
                ["Mumbai University", "(7.1 × CGPA) + 11", "67.80%", "74.90%"],
              ].map(([board, rule, eight, nine]) => (
                <tr key={board}>
                  <td className="px-6 py-3 font-medium text-on-surface">{board}</td>
                  <td className="px-6 py-3 font-mono text-on-surface-variant">{rule}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{eight}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{nine}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
          Mumbai University&apos;s (7.1 × CGPA) + 11 is the most widely cited MU formula — verify it
          against your transcript. SPPU&apos;s formula varies by batch and circular (×8.8, ×8.9, or
          (CGPA − 0.75) × 10 in different circulars); Anna University&apos;s conversion also varies by
          regulation. When in doubt, quote the CGPA itself.
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-surface-container-lowest shadow-sm">
        <div className="border-b border-surface-container px-6 py-4">
          <h2 className="font-display font-headline-sm text-headline-sm text-on-surface">CGPA to Percentage Conversion Chart</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container">
                <th className="px-6 py-3 font-medium text-on-surface">CGPA</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">CBSE × 9.5</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">× 10</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">VTU (CGPA − 0.75) × 10</th>
                <th className="px-6 py-3 text-right font-medium text-on-surface">Mumbai (7.1 × CGPA) + 11</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {[
                ["5.0", "47.50%", "50.00%", "42.50%", "46.50%"],
                ["5.5", "52.25%", "55.00%", "47.50%", "50.05%"],
                ["6.0", "57.00%", "60.00%", "52.50%", "53.60%"],
                ["6.5", "61.75%", "65.00%", "57.50%", "57.15%"],
                ["7.0", "66.50%", "70.00%", "62.50%", "60.70%"],
                ["7.5", "71.25%", "75.00%", "67.50%", "64.25%"],
                ["8.0", "76.00%", "80.00%", "72.50%", "67.80%"],
                ["8.2", "77.90%", "82.00%", "74.50%", "69.22%"],
                ["8.5", "80.75%", "85.00%", "77.50%", "71.35%"],
                ["8.8", "83.60%", "88.00%", "80.50%", "73.48%"],
                ["9.0", "85.50%", "90.00%", "82.50%", "74.90%"],
                ["9.2", "87.40%", "92.00%", "84.50%", "76.32%"],
                ["9.5", "90.25%", "95.00%", "87.50%", "78.45%"],
                ["9.8", "93.10%", "98.00%", "90.50%", "80.58%"],
                ["10.0", "95.00%", "100.00%", "92.50%", "82.00%"],
              ].map(([cgpa, cbse, ten, vtu, mumbai]) => (
                <tr key={cgpa}>
                  <td className="px-6 py-3 font-medium text-on-surface">{cgpa}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{cbse}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{ten}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{vtu}</td>
                  <td className="px-6 py-3 text-right font-mono text-on-surface-variant">{mumbai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="px-6 py-4 font-body-sm text-body-sm text-on-surface-variant">
          Every value is computed with the formula in its column heading. All results are estimates —
          your institution&apos;s rule wins.
        </p>
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

const SAMPLE_IMAGES = [
  {
    name: "Red Sneaker",
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23ffffff'/><path d='M60 220 Q120 120 220 130 Q310 140 340 180 Q320 230 250 230 Q170 230 60 220 Z' fill='%23ef4444'/><circle cx='180' cy='180' r='20' fill='%23111827'/><rect x='80' y='210' width='240' height='20' rx='10' fill='%230f172a'/><text x='130' y='270' font-size='16' font-weight='bold' font-family='sans-serif' fill='%2394a3b8'>Sample Sneaker</text></svg>",
  },
  {
    name: "Person Portrait",
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%2338bdf8'/><circle cx='200' cy='120' r='55' fill='%23fbcfe8'/><path d='M110 270 C120 185 280 185 290 270 Z' fill='%231e293b'/><circle cx='180' cy='115' r='6' fill='%230f172a'/><circle cx='220' cy='115' r='6' fill='%230f172a'/><path d='M190 140 Q200 150 210 140' stroke='%230f172a' stroke-width='3' fill='none'/><text x='135' y='285' font-size='14' font-weight='bold' font-family='sans-serif' fill='%23ffffff'>Sample Portrait</text></svg>",
  },
  {
    name: "Camera Gadget",
    url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='400' height='300' fill='%23f8fafc'/><rect x='100' y='100' width='200' height='130' rx='20' fill='%23334155'/><circle cx='200' cy='165' r='45' fill='%230284c7'/><circle cx='200' cy='165' r='25' fill='%230f172a'/><rect x='130' y='80' width='40' height='20' rx='5' fill='%2364748b'/><text x='140' y='265' font-size='14' font-weight='bold' font-family='sans-serif' fill='%2364748b'>Sample Camera</text></svg>",
  },
];

function RemoveBackgroundPanel() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [targetColor, setTargetColor] = useState<string>("#ffffff");
  const [tolerance, setTolerance] = useState<number>(20);
  const [feather, setFeather] = useState<number>(10);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("image");
  const [bgChoice, setBgChoice] = useState<"transparent" | "white" | "black" | "custom">("transparent");
  const [customBgColor, setCustomBgColor] = useState<string>("#3b82f6");
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [viewMode, setViewMode] = useState<"slider" | "side">("slider");
  const [engineMode, setEngineMode] = useState<"ai" | "chroma">("ai");
  const [aiProgress, setAiProgress] = useState<RemoveBackgroundAIProgress | null>(null);
  const [aiStatusMessage, setAiStatusMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [aiBlob, setAiBlob] = useState<Blob | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalImageRef = useRef<HTMLImageElement | null>(null);
  const currentFileBlobRef = useRef<Blob | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadSample = async (sampleUrl: string, sampleName: string) => {
    setErrorMessage(null);
    setImageSrc(sampleUrl);
    setFileName(sampleName.toLowerCase().replace(/\s+/g, "-"));
    setProcessedUrl(null);
    setAiBlob(null);

    try {
      const res = await fetch(sampleUrl);
      const blob = await res.blob();
      currentFileBlobRef.current = blob;
    } catch {
      // fallback if fetch fails
    }

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      originalImageRef.current = img;
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = img.width;
      tempCanvas.height = img.height;
      const ctx = tempCanvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const detected = detectCornerColor(imgData);
        setTargetColor(rgbToHex(detected.r, detected.g, detected.b));
      }
    };
    img.src = sampleUrl;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setAiProgress(null);
    setProcessedUrl(null);
    setAiBlob(null);

    // File validation: JPG, JPEG, PNG, WEBP, up to 60MB
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!validTypes.includes(file.type) && !/\.(jpe?g|png|webp)$/i.test(file.name)) {
      setErrorMessage("Please upload a valid image file (JPG, PNG, or WEBP).");
      return;
    }

    if (file.size > 60 * 1024 * 1024) {
      setErrorMessage("Image is too large (exceeds 60 MB limit). Please choose a smaller photo.");
      return;
    }

    currentFileBlobRef.current = file;
    setFileName(file.name.replace(/\.[^/.]+$/, ""));
    const reader = new FileReader();
    reader.onload = (event) => {
      const src = event.target?.result as string;
      setImageSrc(src);

      const img = new Image();
      img.onload = () => {
        originalImageRef.current = img;

        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = img.width;
        tempCanvas.height = img.height;
        const ctx = tempCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imgData = ctx.getImageData(0, 0, img.width, img.height);
          const detected = detectCornerColor(imgData);
          setTargetColor(rgbToHex(detected.r, detected.g, detected.b));
        }
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  // Run AI background removal via @bg0/browser
  const runAiRemoval = async () => {
    if (!currentFileBlobRef.current && !imageSrc) return;

    setIsProcessing(true);
    setErrorMessage(null);
    setAiStatusMessage("Initializing on-device AI...");
    abortControllerRef.current?.abort();
    const ac = new AbortController();
    abortControllerRef.current = ac;

    try {
      let blob = currentFileBlobRef.current;
      if (!blob && imageSrc) {
        const res = await fetch(imageSrc);
        blob = await res.blob();
        currentFileBlobRef.current = blob;
      }
      if (!blob) throw new Error("No image data available");

      const result = await removeBackgroundAI(blob, {
        quality: "quality",
        signal: ac.signal,
        onProgress: (prog) => {
          setAiProgress(prog);
          setAiStatusMessage(prog.message || `${Math.round(prog.progress * 100)}% complete`);
        },
      });

      setAiBlob(result.blob);
      const transparentUrl = URL.createObjectURL(result.blob);
      applyBackdrop(transparentUrl);
      setIsProcessing(false);
      setAiStatusMessage(`Completed with ${result.provider.toUpperCase()} in ${(result.durationMs / 1000).toFixed(1)}s`);
    } catch (err: unknown) {
      if (ac.signal.aborted) {
        setAiStatusMessage("Cancelled");
        setIsProcessing(false);
        return;
      }
      const msg = err instanceof Error ? err.message : String(err);
      console.warn("AI removal failed, switching to high-accuracy color keying:", msg);
      setErrorMessage(`On-device AI notice: ${msg}. Switching to instant edge keying mode.`);
      setEngineMode("chroma");
      setIsProcessing(false);
    }
  };

  const applyBackdrop = useCallback((cutoutSrc: string) => {
    if (bgChoice === "transparent") {
      setProcessedUrl(cutoutSrc);
      return;
    }
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setProcessedUrl(cutoutSrc);
        return;
      }
      ctx.fillStyle = bgChoice === "white" ? "#ffffff" : bgChoice === "black" ? "#000000" : customBgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setProcessedUrl(canvas.toDataURL("image/png"));
    };
    img.src = cutoutSrc;
  }, [bgChoice, customBgColor]);

  // Re-apply backdrop whenever bgChoice or customBgColor changes on existing AI cutout
  useEffect(() => {
    if (engineMode === "ai" && aiBlob) {
      const url = URL.createObjectURL(aiBlob);
      applyBackdrop(url);
    }
  }, [applyBackdrop, aiBlob, engineMode]);

  // Chroma keying fallback / manual adjustment pipeline
  useEffect(() => {
    if (engineMode !== "chroma") return;
    if (!originalImageRef.current || !imageSrc) return;

    setIsProcessing(true);
    const timer = setTimeout(() => {
      const img = originalImageRef.current;
      if (!img) {
        setIsProcessing(false);
        return;
      }

      const canvas = canvasRef.current || document.createElement("canvas");
      canvas.width = img.naturalWidth || img.width;
      canvas.height = img.naturalHeight || img.height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        setIsProcessing(false);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      const rgb = hexToRgb(targetColor) || { r: 255, g: 255, b: 255 };
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

      processImageBackground(imgData, {
        targetColor: rgb,
        tolerance,
        feather,
      });

      if (bgChoice === "transparent") {
        ctx.putImageData(imgData, 0, 0);
      } else {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        const tempCtx = tempCanvas.getContext("2d");
        if (tempCtx) {
          tempCtx.putImageData(imgData, 0, 0);
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = bgChoice === "white" ? "#ffffff" : bgChoice === "black" ? "#000000" : customBgColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(tempCanvas, 0, 0);
        }
      }

      setProcessedUrl(canvas.toDataURL("image/png"));
      setIsProcessing(false);
    }, 40);

    return () => clearTimeout(timer);
  }, [imageSrc, targetColor, tolerance, feather, bgChoice, customBgColor, engineMode]);

  const handleDownload = () => {
    if (!processedUrl) return;
    const a = document.createElement("a");
    a.href = processedUrl;
    a.download = `${fileName}-transparent.png`;
    a.click();
  };

  const handleReset = () => {
    abortControllerRef.current?.abort();
    setImageSrc(null);
    setProcessedUrl(null);
    setAiBlob(null);
    setAiProgress(null);
    setAiStatusMessage("");
    setErrorMessage(null);
    currentFileBlobRef.current = null;
    originalImageRef.current = null;
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setIsProcessing(false);
    setAiStatusMessage("Processing cancelled");
  };

  return (
    <div className="space-y-6">
      {errorMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-500 flex items-start justify-between gap-3">
          <span>{errorMessage}</span>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-xs font-bold underline hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {!imageSrc ? (
        <div className="space-y-6">
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/40 bg-gradient-to-b from-surface-container-lowest to-surface-container-low p-8 sm:p-14 text-center transition hover:border-primary hover:shadow-xl cursor-pointer"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 transition transform group-hover:scale-110 shadow-inner">
              <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">Upload an Image</h3>
            <p className="mt-2 text-sm sm:text-base text-on-surface-variant max-w-lg">
              100% Automatically and <span className="font-bold text-primary">Free</span>. Drop any image here or click to browse.
            </p>
            <button type="button" className={`${buttonClass} mt-6 px-8 py-3.5 text-base font-bold shadow-lg hover:shadow-primary/30`}>
              Upload Image
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-on-surface-variant">
              <span>Supports PNG, JPG, WEBP (up to 60 MB)</span>
              <span>•</span>
              <span className="font-medium text-primary">Private WebGPU/WASM AI Engine</span>
              <span>•</span>
              <span>Zero server uploads</span>
            </div>
          </div>

          <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold text-on-surface">No image? Try one of these:</p>
                <p className="text-xs text-on-surface-variant">Click any sample to test automatic background removal</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.name}
                    type="button"
                    onClick={() => loadSample(sample.url, sample.name)}
                    className="flex items-center gap-2.5 rounded-xl border border-outline-variant bg-surface-container-low px-3 py-2 text-xs font-semibold text-on-surface hover:border-primary hover:bg-surface-container transition shadow-sm"
                  >
                    <img src={sample.url} alt={sample.name} className="h-9 w-9 rounded-lg object-cover border border-outline-variant" />
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-outline-variant pb-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode("slider")}
                className={viewMode === "slider" ? buttonClass : secondaryButtonClass}
              >
                Before / After Slider
              </button>
              <button
                type="button"
                onClick={() => setViewMode("side")}
                className={viewMode === "side" ? buttonClass : secondaryButtonClass}
              >
                Side-by-Side
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">Engine:</span>
              <button
                type="button"
                onClick={() => setEngineMode("ai")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  engineMode === "ai"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface border-outline-variant"
                }`}
              >
                AI Model (BiRefNet)
              </button>
              <button
                type="button"
                onClick={() => setEngineMode("chroma")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                  engineMode === "chroma"
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface-container-lowest text-on-surface border-outline-variant"
                }`}
              >
                Instant Edge Keying
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-on-surface-variant">Backdrop:</span>
              <button
                type="button"
                onClick={() => setBgChoice("transparent")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  bgChoice === "transparent" ? "bg-primary text-white border-primary" : "bg-surface-container-lowest text-on-surface border-outline-variant"
                }`}
              >
                Transparent
              </button>
              <button
                type="button"
                onClick={() => setBgChoice("white")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  bgChoice === "white" ? "bg-primary text-white border-primary" : "bg-surface-container-lowest text-on-surface border-outline-variant"
                }`}
              >
                White
              </button>
              <button
                type="button"
                onClick={() => setBgChoice("black")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                  bgChoice === "black" ? "bg-primary text-white border-primary" : "bg-surface-container-lowest text-on-surface border-outline-variant"
                }`}
              >
                Black
              </button>
              <input
                type="color"
                value={customBgColor}
                onChange={(e) => {
                  setCustomBgColor(e.target.value);
                  setBgChoice("custom");
                }}
                className="h-7 w-7 rounded cursor-pointer border border-outline-variant bg-transparent p-0"
                title="Pick custom backdrop color"
              />
            </div>
          </div>

          {/* AI Mode Banner & Trigger */}
          {engineMode === "ai" ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm font-bold text-on-surface">BiRefNet On-Device AI Engine</p>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Runs locally in your browser with WebGPU / WASM acceleration. No images uploaded.
                </p>
                {aiStatusMessage && (
                  <p className="text-xs font-semibold text-primary pt-1">{aiStatusMessage}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isProcessing ? (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-xl border border-red-500/50 bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/20 transition"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={runAiRemoval}
                    className={`${buttonClass} px-6 py-2.5 font-bold shadow-md hover:shadow-primary/30`}
                  >
                    ✨ Run AI Background Removal
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-surface-container-low p-4">
              <div>
                <label className={labelClass}>Target Background Color</label>
                <div className="mt-2 flex items-center gap-3">
                  <input
                    type="color"
                    value={targetColor}
                    onChange={(e) => setTargetColor(e.target.value)}
                    className="h-10 w-12 cursor-pointer rounded border border-outline-variant bg-transparent p-0"
                  />
                  <input
                    type="text"
                    value={targetColor}
                    onChange={(e) => setTargetColor(e.target.value)}
                    className="w-24 rounded-lg border border-outline-variant bg-surface-container-lowest px-2 py-1.5 text-sm text-on-surface"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  <label className={labelClass}>Tolerance</label>
                  <span className="text-xs text-on-surface-variant font-medium">{tolerance}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="85"
                  value={tolerance}
                  onChange={(e) => setTolerance(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </div>

              <div>
                <div className="flex justify-between">
                  <label className={labelClass}>Edge Feathering</label>
                  <span className="text-xs text-on-surface-variant font-medium">{feather}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={feather}
                  onChange={(e) => setFeather(Number(e.target.value))}
                  className="mt-3 w-full accent-primary"
                />
              </div>
            </div>
          )}

          {/* Progress bar if AI is working */}
          {isProcessing && aiProgress && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                <span>{aiProgress.message}</span>
                <span>{Math.round(aiProgress.progress * 100)}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
                <div
                  className="h-full bg-primary transition-all duration-200"
                  style={{ width: `${Math.round(aiProgress.progress * 100)}%` }}
                />
              </div>
            </div>
          )}

          {viewMode === "slider" ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-on-surface-variant px-1">
                <span>Original</span>
                <span>Drag slider to inspect cutout</span>
                <span>Cutout {isProcessing && "(Processing...)"}</span>
              </div>
              <div className="relative mx-auto max-w-2xl h-[360px] sm:h-[420px] rounded-2xl border border-outline-variant overflow-hidden select-none shadow-lg">
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    backgroundImage:
                      bgChoice === "transparent"
                        ? "linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)"
                        : "none",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                    backgroundColor: bgChoice === "transparent" ? "#0f172a" : bgChoice === "white" ? "#ffffff" : bgChoice === "black" ? "#000000" : customBgColor,
                  }}
                >
                  {processedUrl ? (
                    <img
                      src={processedUrl}
                      alt="Processed output"
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-6 text-on-surface-variant text-sm">
                      Click <span className="font-bold text-primary">&quot;Run AI Background Removal&quot;</span> above to generate cutout
                    </div>
                  )}
                </div>

                <div
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-primary bg-surface-container-lowest"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={imageSrc}
                    alt="Original"
                    className="h-full w-full object-contain max-w-none"
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 h-full w-full opacity-0 cursor-ew-resize z-20"
                />

                <div
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-xl z-10"
                  style={{ left: `${sliderPos}%` }}
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-sm font-medium text-on-surface-variant">Original Image</span>
                <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-outline-variant bg-surface-container-lowest p-3 overflow-hidden shadow-sm">
                  <img
                    src={imageSrc}
                    alt="Original upload"
                    className="max-h-[360px] max-w-full rounded object-contain"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-medium text-on-surface-variant">
                  Processed Cutout {isProcessing && <span className="text-xs text-primary">({aiStatusMessage || "Processing..."})</span>}
                </span>
                <div
                  className="flex min-h-[300px] items-center justify-center rounded-2xl border border-outline-variant p-3 overflow-hidden shadow-sm"
                  style={{
                    backgroundImage:
                      bgChoice === "transparent"
                        ? "linear-gradient(45deg, #1e293b 25%, transparent 25%), linear-gradient(-45deg, #1e293b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e293b 75%), linear-gradient(-45deg, transparent 75%, #1e293b 75%)"
                        : "none",
                    backgroundSize: "16px 16px",
                    backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0px",
                    backgroundColor: bgChoice === "transparent" ? "#0f172a" : bgChoice === "white" ? "#ffffff" : bgChoice === "black" ? "#000000" : customBgColor,
                  }}
                >
                  {processedUrl ? (
                    <img
                      src={processedUrl}
                      alt="Processed output"
                      className="max-h-[360px] max-w-full rounded object-contain"
                    />
                  ) : (
                    <div className="text-center p-6 text-on-surface-variant text-sm">
                      Ready to remove background. Click <span className="font-bold text-primary">&quot;Run AI Background Removal&quot;</span>.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className={secondaryButtonClass}
            >
              Start Over / New Image
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!processedUrl || isProcessing}
              className={`${buttonClass} px-6 py-2.5 shadow-md`}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download HD Cutout ({bgChoice.toUpperCase()})
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" aria-hidden="true" />
    </div>
  );
}

function GstPanel() {
  const [amount, setAmount] = useState("10000");
  const [rate, setRate] = useState("18");
  const [type, setType] = useState<"exclusive" | "inclusive">("exclusive");
  const [copied, setCopied] = useState(false);

  const numAmount = Number(amount) || 0;
  const numRate = Number(rate) || 0;

  const result = calculateGst({
    amount: numAmount,
    rate: numRate,
    type,
  });

  const fmt = (v: number) => "₹" + v.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `GST Calculation (${type.toUpperCase()}): Net ${fmt(result.netAmount)}, GST (${rate}%) ${fmt(result.gstAmount)} [CGST ${fmt(result.cgst)} + SGST ${fmt(result.sgst)}], Total ${fmt(result.totalAmount)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setType("exclusive")}
          className={type === "exclusive" ? buttonClass : secondaryButtonClass}
        >
          GST Exclusive (Add GST)
        </button>
        <button
          type="button"
          onClick={() => setType("inclusive")}
          className={type === "inclusive" ? buttonClass : secondaryButtonClass}
        >
          GST Inclusive (Remove GST)
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            {type === "exclusive" ? "Initial Net Amount (₹)" : "Total Gross Amount (₹)"}
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={inputClass}
            placeholder="e.g. 10000"
          />
        </div>
        <div>
          <label className={labelClass}>GST Rate (%)</label>
          <div className="flex flex-wrap gap-2 mt-1">
            {["5", "12", "18", "28"].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRate(r)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition ${
                  rate === r
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
                }`}
              >
                {r}%
              </button>
            ))}
          </div>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={`${inputClass} mt-2`}
            placeholder="Custom GST %"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Net Pre-Tax Value</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.netAmount)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">CGST ({numRate / 2}%)</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.cgst)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">SGST ({numRate / 2}%)</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.sgst)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Total Gross Value</p>
          <p className="text-xl font-bold text-primary mt-1">{fmt(result.totalAmount)}</p>
        </div>
      </div>

      <div className="rounded-xl bg-surface-container-lowest p-4 border border-outline-variant flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-xs text-on-surface-variant font-medium">Total GST Component ({rate}%)</span>
          <p className="text-2xl font-bold text-primary mt-0.5">{fmt(result.gstAmount)}</p>
        </div>
        <button onClick={handleCopy} className={secondaryButtonClass}>
          {copied ? "Copied Breakdown!" : "Copy Tax Breakdown"}
        </button>
      </div>
    </div>
  );
}

function SwpPanel() {
  const [investment, setInvestment] = useState("1000000");
  const [withdrawal, setWithdrawal] = useState("10000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("5");
  const [copied, setCopied] = useState(false);

  const numInv = Number(investment) || 0;
  const numWith = Number(withdrawal) || 0;
  const numRate = Number(rate) || 0;
  const numYears = Number(years) || 0;

  const result = calculateSwp({
    initialInvestment: numInv,
    monthlyWithdrawal: numWith,
    annualRate: numRate,
    tenureYears: numYears,
  });

  const fmt = (v: number) => "₹" + v.toLocaleString("en-IN");

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `SWP Plan: Total Invested ${fmt(result.totalInvestment)}, Total Withdrawn ${fmt(result.totalWithdrawn)}, Remaining Balance ${fmt(result.finalBalance)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Total Investment (₹)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className={inputClass}
            placeholder="e.g. 1000000"
          />
        </div>
        <div>
          <label className={labelClass}>Monthly Withdrawal (₹)</label>
          <input
            type="number"
            value={withdrawal}
            onChange={(e) => setWithdrawal(e.target.value)}
            className={inputClass}
            placeholder="e.g. 10000"
          />
        </div>
        <div>
          <label className={labelClass}>Expected Return Rate (p.a %)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputClass}
            placeholder="e.g. 10"
          />
        </div>
        <div>
          <label className={labelClass}>Tenure (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className={inputClass}
            placeholder="e.g. 5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Total Withdrawn</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.totalWithdrawn)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Final Balance</p>
          <p className="text-xl font-bold text-primary mt-1">{fmt(result.finalBalance)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Total Wealth Created</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.totalGained)}</p>
        </div>
      </div>

      {result.depletedMonth && (
        <div className="rounded-lg bg-error-container/20 border border-error/30 p-3 text-sm text-error">
          ⚠️ Note: At this withdrawal rate, your capital is exhausted by month {result.depletedMonth}. Consider lowering monthly withdrawal or extending returns.
        </div>
      )}

      <button onClick={handleCopy} className={secondaryButtonClass}>
        {copied ? "Copied Summary!" : "Copy SWP Summary"}
      </button>
    </div>
  );
}

function LumpsumPanel() {
  const [investment, setInvestment] = useState("100000");
  const [rate, setRate] = useState("12");
  const [years, setYears] = useState("10");
  const [copied, setCopied] = useState(false);

  const numInv = Number(investment) || 0;
  const numRate = Number(rate) || 0;
  const numYears = Number(years) || 0;

  const result = calculateLumpsum({
    totalInvestment: numInv,
    annualRate: numRate,
    tenureYears: numYears,
  });

  const fmt = (v: number) => "₹" + v.toLocaleString("en-IN");

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `Lumpsum Plan: Invested ${fmt(result.totalInvestment)}, Wealth Gain ${fmt(result.estimatedReturns)}, Total Maturity ${fmt(result.totalValue)}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Total Investment (₹)</label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className={inputClass}
            placeholder="e.g. 100000"
          />
        </div>
        <div>
          <label className={labelClass}>Expected Return Rate (p.a %)</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className={inputClass}
            placeholder="e.g. 12"
          />
        </div>
        <div>
          <label className={labelClass}>Tenure (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className={inputClass}
            placeholder="e.g. 10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Invested Amount</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.totalInvestment)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Estimated Wealth Gain</p>
          <p className="text-xl font-bold text-on-surface mt-1">{fmt(result.estimatedReturns)}</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Total Maturity Value</p>
          <p className="text-xl font-bold text-primary mt-1">{fmt(result.totalValue)}</p>
        </div>
      </div>

      <button onClick={handleCopy} className={secondaryButtonClass}>
        {copied ? "Copied Summary!" : "Copy Maturity Summary"}
      </button>
    </div>
  );
}

function CagrPanel() {
  const [initial, setInitial] = useState("100000");
  const [finalVal, setFinalVal] = useState("250000");
  const [years, setYears] = useState("5");
  const [copied, setCopied] = useState(false);

  const numInit = Number(initial) || 0;
  const numFinal = Number(finalVal) || 0;
  const numYears = Number(years) || 0;

  const result = calculateCagr({
    initialValue: numInit,
    finalValue: numFinal,
    tenureYears: numYears,
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `CAGR Result: ${result.cagrPercentage}% annual growth, ${result.totalGrowthPercentage}% total return over ${years} years`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Initial Investment Value</label>
          <input
            type="number"
            value={initial}
            onChange={(e) => setInitial(e.target.value)}
            className={inputClass}
            placeholder="e.g. 100000"
          />
        </div>
        <div>
          <label className={labelClass}>Final Maturity Value</label>
          <input
            type="number"
            value={finalVal}
            onChange={(e) => setFinalVal(e.target.value)}
            className={inputClass}
            placeholder="e.g. 250000"
          />
        </div>
        <div>
          <label className={labelClass}>Duration (Years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className={inputClass}
            placeholder="e.g. 5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-surface-container-low p-4">
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">CAGR (Annual Growth)</p>
          <p className="text-2xl font-bold text-primary mt-1">{result.cagrPercentage}%</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Total Return</p>
          <p className="text-2xl font-bold text-on-surface mt-1">{result.totalGrowthPercentage}%</p>
        </div>
        <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
          <p className="text-xs text-on-surface-variant font-medium">Absolute Profit</p>
          <p className="text-2xl font-bold text-on-surface mt-1">{result.absoluteGain.toLocaleString()}</p>
        </div>
      </div>

      <button onClick={handleCopy} className={secondaryButtonClass}>
        {copied ? "Copied!" : "Copy CAGR Result"}
      </button>
    </div>
  );
}

function PercentagePanel() {
  const [mode, setMode] = useState<"of" | "what" | "change">("of");

  // Mode 1: What is X% of Y?
  const [pct1, setPct1] = useState("18");
  const [val1, setVal1] = useState("5000");

  // Mode 2: X is what % of Y?
  const [num2, setNum2] = useState("450");
  const [total2, setTotal2] = useState("600");

  // Mode 3: % Increase/Decrease from X to Y
  const [oldVal3, setOldVal3] = useState("120");
  const [newVal3, setNewVal3] = useState("150");

  const res1 = calculatePercentOf(Number(pct1) || 0, Number(val1) || 0);
  const res2 = calculateIsWhatPercent(Number(num2) || 0, Number(total2) || 0);
  const res3 = calculatePercentChange(Number(oldVal3) || 0, Number(newVal3) || 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("of")}
          className={mode === "of" ? buttonClass : secondaryButtonClass}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => setMode("what")}
          className={mode === "what" ? buttonClass : secondaryButtonClass}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => setMode("change")}
          className={mode === "change" ? buttonClass : secondaryButtonClass}
        >
          % Increase / Decrease
        </button>
      </div>

      {mode === "of" && (
        <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Percentage (%)</label>
              <input
                type="number"
                value={pct1}
                onChange={(e) => setPct1(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Total Value</label>
              <input
                type="number"
                value={val1}
                onChange={(e) => setVal1(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
            <span className="text-xs text-on-surface-variant font-medium">Result</span>
            <p className="text-2xl font-bold text-primary mt-1">
              {pct1}% of {val1} = {Number(res1.toFixed(2))}
            </p>
          </div>
        </div>
      )}

      {mode === "what" && (
        <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Part Value (X)</label>
              <input
                type="number"
                value={num2}
                onChange={(e) => setNum2(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Total Value (Y)</label>
              <input
                type="number"
                value={total2}
                onChange={(e) => setTotal2(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
            <span className="text-xs text-on-surface-variant font-medium">Result</span>
            <p className="text-2xl font-bold text-primary mt-1">
              {num2} is {Number(res2.toFixed(2))}% of {total2}
            </p>
          </div>
        </div>
      )}

      {mode === "change" && (
        <div className="space-y-4 rounded-xl bg-surface-container-low p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Initial Value</label>
              <input
                type="number"
                value={oldVal3}
                onChange={(e) => setOldVal3(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>New Value</label>
              <input
                type="number"
                value={newVal3}
                onChange={(e) => setNewVal3(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
            <span className="text-xs text-on-surface-variant font-medium">Result</span>
            <p className="text-2xl font-bold text-primary mt-1">
              {res3.changePercent}% {res3.type === "increase" ? "Increase (+)" : res3.type === "decrease" ? "Decrease (-)" : "No change"}
            </p>
            <p className="text-xs text-on-surface-variant mt-1">Difference: {res3.difference}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageResizerPanel() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [targetKb, setTargetKb] = useState<number>(50);
  const [quality, setQuality] = useState<number>(85);
  const [maxDimension, setMaxDimension] = useState<number>(1000);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [currentSize, setCurrentSize] = useState<number>(0);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [fileName, setFileName] = useState<string>("resized-image");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setOriginalSize(file.size);
    setFileName(file.name.replace(/\.[^/.]+$/, ""));

    const reader = new FileReader();
    reader.onload = (ev) => {
      const src = ev.target?.result as string;
      setImageSrc(src);

      const img = new Image();
      img.onload = () => {
        imgRef.current = img;
        runCompression(img, maxDimension, quality);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const runCompression = (img: HTMLImageElement, maxDim: number, q: number) => {
    const canvas = document.createElement("canvas");
    const fit = computeAspectRatioFit(img.naturalWidth || img.width, img.naturalHeight || img.height, maxDim, maxDim);
    canvas.width = fit.width;
    canvas.height = fit.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0, fit.width, fit.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        setCurrentSize(blob.size);
        setCompressedUrl(URL.createObjectURL(blob));
      },
      "image/jpeg",
      q / 100
    );
  };

  useEffect(() => {
    if (imgRef.current) {
      runCompression(imgRef.current, maxDimension, quality);
    }
  }, [maxDimension, quality]);

  const handlePreset = (kb: number) => {
    setTargetKb(kb);
    if (kb <= 20) {
      setMaxDimension(600);
      setQuality(60);
    } else if (kb <= 50) {
      setMaxDimension(800);
      setQuality(75);
    } else if (kb <= 100) {
      setMaxDimension(1200);
      setQuality(85);
    } else {
      setMaxDimension(1600);
      setQuality(90);
    }
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-outline-variant bg-surface-container-lowest p-10 text-center transition hover:border-primary cursor-pointer"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-container text-white mb-4">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-on-surface">Upload photo or signature</h3>
          <p className="mt-1 text-sm text-on-surface-variant">Compress to 20KB, 50KB, or 100KB for exam forms. 100% private in browser.</p>
          <button type="button" className={`${buttonClass} mt-5`}>
            Select Image
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4 rounded-xl bg-surface-container-low p-4">
            <span className="text-xs text-on-surface-variant font-medium">Quick Target Presets</span>
            <div className="flex flex-wrap gap-2">
              {[20, 50, 100, 200].map((kb) => (
                <button
                  key={kb}
                  type="button"
                  onClick={() => handlePreset(kb)}
                  className={targetKb === kb ? buttonClass : secondaryButtonClass}
                >
                  Under {kb} KB
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <div className="flex justify-between">
                  <label className={labelClass}>Quality</label>
                  <span className="text-xs text-on-surface-variant font-medium">{quality}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between">
                  <label className={labelClass}>Max Resolution</label>
                  <span className="text-xs text-on-surface-variant font-medium">{maxDimension}px</span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="2000"
                  step="50"
                  value={maxDimension}
                  onChange={(e) => setMaxDimension(Number(e.target.value))}
                  className="mt-2 w-full accent-primary"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
              <span className="text-xs text-on-surface-variant font-medium">Original Size</span>
              <p className="text-xl font-bold text-on-surface mt-1">{formatFileSize(originalSize)}</p>
            </div>
            <div className="rounded-lg bg-surface-container-lowest p-4 border border-outline-variant">
              <span className="text-xs text-on-surface-variant font-medium">New Compressed Size</span>
              <p className={`text-xl font-bold mt-1 ${currentSize / 1024 <= targetKb ? "text-primary" : "text-amber-500"}`}>
                {formatFileSize(currentSize)} {currentSize / 1024 <= targetKb ? "✓ (Fits under limit)" : "⚠️ (Adjust slider)"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setImageSrc(null);
                setCompressedUrl(null);
                imgRef.current = null;
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className={secondaryButtonClass}
            >
              Upload Different Image
            </button>
            <a
              href={compressedUrl || "#"}
              download={`${fileName}-${targetKb}kb.jpg`}
              className={buttonClass}
            >
              Download Resized JPEG ({formatFileSize(currentSize)})
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export function ToolPanel({ kind }: { kind: string }) {
  switch (kind) {
    case "age-calculator":
      return <AgePanel />;
    case "attendance-calculator":
      return <AttendancePanel />;
    case "ppf-calculator":
      return <PpfPanel />;
    case "sgpa-to-cgpa":
      return <SgpaPanel />;
    case "sip-calculator":
      return <SipPanel />;
    case "swp-calculator":
      return <SwpPanel />;
    case "lumpsum-calculator":
      return <LumpsumPanel />;
    case "cagr-calculator":
      return <CagrPanel />;
    case "percentage-calculator":
      return <PercentagePanel />;
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
    case "remove-background":
      return <RemoveBackgroundPanel />;
    case "image-resizer":
      return <ImageResizerPanel />;
    case "gst-calculator":
      return <GstPanel />;
    default:
      return <p>Tool unavailable.</p>;
  }
}
