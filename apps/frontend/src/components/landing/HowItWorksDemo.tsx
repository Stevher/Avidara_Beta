"use client";

import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

type Step = 1 | 2 | 3;

export interface DemoFinding {
  id: string;
  sev: "critical" | "major" | "minor";
  sevLabel: string;
  title: string;
  loc: string;
}

export interface DemoConfig {
  documentName: string;
  documentMeta: string;
  checks: string[];
  findings: DemoFinding[];
  outcome: string;
}

const pharmaDefault: DemoConfig = {
  documentName: "Cardivex_HCP_LeaveBehind_A5_v2.pdf",
  documentMeta: "2.8 MB · Reference PI: EVD-NX-001/SA · Ready",
  checks: [
    "Scheduling symbol verified",
    "Indication statement cross-referenced",
    "Dosing chart validation",
    "Mandatory warnings check",
    "SI unit formatting",
    "MAH address verification",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Incorrect initiation dosing — 5 mg BD vs PI 10 mg BD", loc: "Page 2 · Dosing chart · Section 4.2" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: 'Product name typo — "Cardivec" not "Cardivex"', loc: "Page 2 · Convenience callout" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Renal impairment claim inconsistent with approved PI", loc: "Page 2 · Renal callout · Section 4.2" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "SI unit — ml/min vs mL/min throughout", loc: "Page 2 · Multiple instances" },
  ],
  outcome: "2 Critical · 4 Major · 2 Minor",
};

const steps = [
  {
    n: 1 as Step,
    title: "Submit your document",
    desc: "Upload your document alongside the reference standard or PI. Avidara confirms inputs before starting — no partial reviews.",
  },
  {
    n: 2 as Step,
    title: "Avidara runs the review",
    desc: "Every element checked against the encoded regulatory ruleset. Nothing skipped, no reviewer fatigue, same rigour every time.",
  },
  {
    n: 3 as Step,
    title: "You receive a structured report",
    desc: "A branded PDF finding report with graded findings, exact references, locations, and recommendations. Your team owns all decisions.",
  },
];

function SevBadge({ sev, label }: { sev: string; label: string }) {
  const styles: Record<string, string> = {
    critical: "bg-red-500/10 text-red-400 border border-red-500/20",
    major:    "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    minor:    "bg-slate-500/10 text-[var(--t3)] border border-[var(--b)]",
  };
  return (
    <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${styles[sev]}`}>
      {label}
    </span>
  );
}

export default function HowItWorksDemo({ config = pharmaDefault }: { config?: DemoConfig }) {
  const [step, setStep] = useState<Step>(1);
  const [progress, setProgress] = useState(0);
  const [checked, setChecked] = useState<number[]>([]);

  useEffect(() => {
    if (step !== 2) return;
    setProgress(0);
    setChecked([]);
    config.checks.forEach((_, i) => {
      setTimeout(() => {
        setChecked((prev) => [...prev, i]);
        setProgress(Math.round(((i + 1) / config.checks.length) * 100));
      }, i * 550);
    });
    setTimeout(() => setStep(3), config.checks.length * 550 + 800);
  }, [step, config.checks]);

  return (
    <section id="how-it-works" className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            How it works
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            Three steps. Zero ambiguity.
          </h2>
          <p className="mx-auto max-w-lg text-lg" style={{ color: "var(--t2)" }}>
            You bring the document. Avidara brings the rulebook. You get a clear,
            structured finding report before anything leaves your desk.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            {/* Steps */}
            <div className="flex flex-col gap-3">
              {steps.map((s) => {
                const active = step === s.n;
                return (
                  <button
                    key={s.n}
                    onClick={() => setStep(s.n)}
                    className={`group flex gap-4 rounded-xl border p-5 text-left transition-all ${
                      active
                        ? "border-[var(--indigo)] bg-[var(--indigo)]/5 shadow-[0_0_0_1px_var(--indigo)]"
                        : "border-[var(--b)] hover:border-[var(--b2)]"
                    }`}
                    style={{ backgroundColor: active ? undefined : "var(--surf)" }}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        active ? "bg-[var(--indigo)] text-white" : "border border-[var(--b2)] text-[var(--t3)]"
                      }`}
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      {s.n}
                    </div>
                    <div>
                      <h4 className="mb-1 text-sm font-semibold transition-colors" style={{ color: active ? "var(--t)" : "var(--t2)" }}>
                        {s.title}
                      </h4>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Demo window */}
            <div className="rounded-2xl border border-[var(--b)] overflow-hidden" style={{ boxShadow: "var(--shadow-lg)", backgroundColor: "var(--surf2)" }}>
              {/* Browser chrome */}
              <div className="flex items-center gap-2 border-b border-[var(--b)] px-4 py-3" style={{ backgroundColor: "var(--bg)" }}>
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/60" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                  <div className="h-3 w-3 rounded-full bg-green-500/60" />
                </div>
                <div className="mx-auto flex h-6 w-64 items-center justify-center rounded-md text-xs" style={{ backgroundColor: "var(--b)", color: "var(--t3)" }}>
                  app.avidara.co.za / review / new
                </div>
              </div>

              {/* Step 1 — Upload */}
              {step === 1 && (
                <div className="p-6">
                  <p className="mb-4 text-[11px] font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                    New Review
                  </p>
                  <div
                    className="mb-4 flex flex-col items-center rounded-xl border-2 border-dashed px-6 py-10 text-center"
                    style={{ borderColor: "var(--b2)" }}
                  >
                    <svg className="mb-3" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--t3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                    <p className="mb-1 font-semibold" style={{ color: "var(--t)" }}>Drop your document here</p>
                    <p className="mb-4 text-sm" style={{ color: "var(--t3)" }}>PDF, DOCX, INDD — max 50 MB</p>
                    <button className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--indigo)] hover:text-[var(--indigo)]" style={{ borderColor: "var(--b2)", color: "var(--t2)" }}>
                      Browse files
                    </button>
                  </div>
                  <div className="mb-4 flex items-center gap-3 rounded-lg border px-4 py-3" style={{ borderColor: "var(--emerald)", backgroundColor: "rgba(16,185,129,.06)" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--t)" }}>{config.documentName}</p>
                      <p className="text-xs" style={{ color: "var(--t3)" }}>{config.documentMeta}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--indigo)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
                  >
                    Start review
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </button>
                </div>
              )}

              {/* Step 2 — In progress */}
              {step === 2 && (
                <div className="p-6">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-8 w-8 shrink-0">
                      <svg className="animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="var(--b2)" strokeWidth="3"/>
                        <path d="M12 2a10 10 0 0110 10" stroke="var(--indigo)" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold" style={{ color: "var(--t)" }}>Review in progress</p>
                      <p className="text-xs" style={{ color: "var(--t3)" }}>{config.documentName}</p>
                    </div>
                  </div>
                  <div className="mb-5 flex flex-col gap-2">
                    {config.checks.map((item, i) => {
                      const done = checked.includes(i);
                      const curr = !done && checked.length === i;
                      return (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm transition-all"
                          style={{ color: done ? "var(--emerald)" : curr ? "var(--t)" : "var(--t3)", opacity: i > checked.length + 1 ? 0.4 : 1 }}
                        >
                          {done ? (
                            <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          ) : curr ? (
                            <svg className="shrink-0 animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <circle cx="12" cy="12" r="9" stroke="var(--b2)" strokeWidth="2.5"/>
                              <path d="M12 3a9 9 0 019 9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                            </svg>
                          ) : (
                            <svg className="shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9"/></svg>
                          )}
                          {item}
                        </div>
                      );
                    })}
                  </div>
                  <div className="mb-5 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: "var(--b2)" }}>
                    <div className="h-full rounded-full bg-[var(--indigo)] transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
                  </div>
                  <button onClick={() => setStep(3)} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--indigo)] py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]">
                    View report
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>
                  </button>
                </div>
              )}

              {/* Step 3 — Report */}
              {step === 3 && (
                <div className="p-6">
                  <div className="mb-5 flex flex-col items-center rounded-xl border py-5 text-center" style={{ borderColor: "rgba(239,68,68,.25)", backgroundColor: "rgba(239,68,68,.05)" }}>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-red-400" />
                      <span className="text-sm font-bold" style={{ color: "var(--t)" }}>Not Approved for Release</span>
                    </div>
                    <p className="text-xs" style={{ color: "var(--t3)" }}>{config.outcome}</p>
                  </div>
                  <div className="mb-5 flex flex-col gap-2">
                    {config.findings.map((f) => (
                      <div key={f.id} className="flex items-start gap-3 rounded-lg border p-3 text-sm" style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}>
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-[10px] font-bold" style={{ backgroundColor: "var(--b)", color: "var(--t3)" }}>{f.id}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium" style={{ color: "var(--t)" }}>{f.title}</p>
                          <p className="mt-0.5 text-xs" style={{ color: "var(--t3)" }}>{f.loc}</p>
                        </div>
                        <SevBadge sev={f.sev} label={f.sevLabel} />
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setStep(1)} className="flex w-full items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition-colors hover:border-[var(--indigo)] hover:text-[var(--indigo)]" style={{ borderColor: "var(--b2)", color: "var(--t2)" }}>
                    Run another review
                  </button>
                </div>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
