import type { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";

export interface Finding {
  code: "Critical" | "Major" | "Minor";
  title: string;
  body: string;
}

export interface IndustryProblemProps {
  sectionLabel?: string;
  heading: string;
  body1: string;
  body2: string;
  findings: Finding[];
}

const severityStyles = {
  Critical: {
    border: "rgba(239,68,68,.25)",
    bg: "rgba(239,68,68,.04)",
    badgeBg: "rgba(239,68,68,.12)",
    badgeColor: "#f87171",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f87171", opacity: 0.6 }}>
        <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
  },
  Major: {
    border: "rgba(249,115,22,.25)",
    bg: "rgba(249,115,22,.04)",
    badgeBg: "rgba(249,115,22,.12)",
    badgeColor: "#fb923c",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#fb923c", opacity: 0.6 }}>
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  Minor: {
    border: "var(--b2)",
    bg: "var(--b)",
    badgeBg: "var(--b2)",
    badgeColor: "var(--t3)",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
} satisfies Record<string, { border: string; bg: string; badgeBg: string; badgeColor: string; icon: ReactNode }>;

export default function IndustryProblem({
  sectionLabel = "The challenge",
  heading,
  body1,
  body2,
  findings,
}: IndustryProblemProps) {
  return (
    <section className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <FadeIn>
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
              {sectionLabel}
            </p>
            <h2
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              {heading}
            </h2>
            <p className="mb-4 text-base leading-relaxed" style={{ color: "var(--t2)" }}>{body1}</p>
            <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>{body2}</p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="grid gap-3 sm:grid-cols-2">
              {findings.map((f) => {
                const s = severityStyles[f.code];
                return (
                  <div
                    key={f.title}
                    className="rounded-xl border p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow)]"
                    style={{ borderColor: s.border, backgroundColor: s.bg }}
                  >
                    <div className="mb-3 flex items-start justify-between gap-2">
                      {s.icon}
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}
                      >
                        {f.code}
                      </span>
                    </div>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{f.body}</p>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
