import type { ReactNode, CSSProperties } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const deliverables = [
  "Branded PDF review report",
  "Finding summary table with severities",
  "Exact PI section references per finding",
  "Actionable corrective recommendations",
  "Approved or Not Approved outcome statement",
];

interface Service {
  code: string;
  color: string;
  title: string;
  body: string;
  tags: string[];
  href?: string;
}

interface ServiceGroup {
  label: string;
  services: Service[];
}

const serviceGroups: ServiceGroup[] = [
  {
    label: "Market Entry",
    services: [
      {
        code: "AVD-BRIDGE",
        color: "blu",
        title: "Dossier Bridging",
        body: "Bringing a product into South Africa or taking a registered SA product into African markets? Module-by-module gap analysis against the destination authority's requirements — before you file.",
        tags: ["Into South Africa", "SA → Africa", "5 African routes", "ZAZIBONA"],
        href: "/life-sciences/dossier-bridging",
      },
      {
        code: "AVD-GAP-D",
        color: "ind",
        title: "Dossier Gap Analysis",
        body: "Module-by-module assessment of your registration dossier against SAHPRA eCTD requirements. Readiness scoring, critical path, and priority action plan before you submit.",
        tags: ["Modules 1–5", "New registration", "eCTD readiness"],
      },
    ],
  },
  {
    label: "Documentation & Labelling",
    services: [
      {
        code: "AVD-GAP-PI",
        color: "ind",
        title: "PI, PIL & SmPC Development",
        body: "SAHPRA-compliant Professional Information, Patient Leaflet, and SmPC drafting and review — clean, submission-ready. English UK, SI units, scheduling box, bilingual PIL.",
        tags: ["PI · PIL · SmPC", "SAHPRA format", "Bilingual"],
      },
      {
        code: "AVD-VER",
        color: "eme",
        title: "Version Comparison",
        body: "Tracked change comparison between PI, PIL, or SmPC versions — every material change identified, assessed, and documented with a branded change report for your MLR file.",
        tags: ["Tracked changes", "Change report", "MLR file"],
      },
      {
        code: "AVD-VAR",
        color: "ind",
        title: "Post-Registration Variation Review",
        body: "Changing a label claim, formulation, strength, or manufacturer? Identify the correct SAHPRA variation type, the supporting data requirements, and any conditions you'll need to satisfy — before you file.",
        tags: ["Type IA/IB/II", "Major variation", "Label changes"],
      },
    ],
  },
  {
    label: "Review Services",
    services: [
      {
        code: "AVD-MLR",
        color: "eme",
        title: "MLR & Scientific Publications Review",
        body: "Medical-Legal-Regulatory review of promotional materials and scientific publications — manuscripts, congress abstracts, and CME content — against current approved data and MLR requirements.",
        tags: ["MLR structured", "Scientific publications", "CME · Congress"],
      },
      {
        code: "AVD-S21",
        color: "ind",
        title: "Section 21 Authorisation Review",
        body: "Seeking SAHPRA authorisation for an unregistered medicine? Review your application for patient need justification, prescriber documentation, safety data completeness, and supporting submission requirements.",
        tags: ["Compassionate use", "Unregistered medicine", "SAHPRA S21"],
      },
    ],
  },
];

const icons: Record<string, ReactNode> = {
  blu: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
    </svg>
  ),
  ind: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  ),
  eme: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
    </svg>
  ),
  amb: (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
    </svg>
  ),
};

const iconStyles: Record<string, CSSProperties> = {
  blu: { backgroundColor: "rgba(59,130,246,.09)",  color: "#3b82f6",          border: "1.5px solid rgba(59,130,246,.16)" },
  ind: { backgroundColor: "rgba(79,70,229,.09)",   color: "var(--indigo)",    border: "1.5px solid rgba(79,70,229,.16)"  },
  eme: { backgroundColor: "rgba(16,185,129,.09)",  color: "var(--emerald)",   border: "1.5px solid rgba(16,185,129,.16)" },
  amb: { backgroundColor: "rgba(245,158,11,.09)",  color: "var(--amber)",     border: "1.5px solid rgba(245,158,11,.16)" },
};

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-12">
          <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-end">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Services
              </p>
              <h2
                className="text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                From first submission to ongoing compliance.
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              Market entry, registration maintenance, labelling, portfolio management, pharmacovigilance —
              wherever your regulatory workload sits, Avidara has a service for it.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col gap-4">
            {/* Flagship — full width */}
            <div
              className="card-hover active rounded-xl border p-6 lg:p-8"
              style={{ borderColor: "rgba(79,70,229,.22)", backgroundColor: "rgba(79,70,229,.05)" }}
            >
              <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
                <div>
                  <div className="mb-4 flex flex-wrap items-center gap-2">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.16)" }}
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                      </svg>
                    </div>
                    <span className="font-mono text-xs" style={{ color: "var(--t3)" }}>AVD-ART</span>
                    <span className="rounded px-2 py-0.5 text-xs font-semibold" style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}>
                      Flagship
                    </span>
                  </div>
                  <h3 className="mb-3 text-lg font-bold" style={{ color: "var(--t)" }}>
                    Artwork and Promotional Material Review
                  </h3>
                  <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                    Every promotional piece reviewed against the SAHPRA-approved Professional Information.
                    Findings graded Critical, Major, or Minor with exact PI references, locations, and
                    corrective recommendations. Structured for MLR submission.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["Critical / Major / Minor grading", "PI Cross-Reference", "MLR Ready", "Same-day turnaround"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-3 py-0.5 text-xs"
                        style={{ borderColor: "rgba(79,70,229,.18)", color: "var(--indigo-light)", backgroundColor: "rgba(79,70,229,.06)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "rgba(79,70,229,.15)", backgroundColor: "rgba(79,70,229,.06)" }}
                >
                  <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                    What you receive
                  </p>
                  <div className="flex flex-col divide-y" style={{ borderColor: "var(--b)" }}>
                    {deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-3 py-3 text-sm first:pt-0 last:pb-0" style={{ color: "var(--t2)" }}>
                        <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Lifecycle groups */}
            {serviceGroups.map((group) => (
              <div key={group.label}>
                <p
                  className="mb-3 mt-2 text-[11px] font-bold uppercase tracking-[0.1em]"
                  style={{ color: "var(--t3)" }}
                >
                  {group.label}
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.services.map((s) => (
                    <div
                      key={s.code}
                      className="card-hover flex flex-col rounded-xl border p-6"
                      style={{
                        borderColor: s.color === "blu" ? "rgba(59,130,246,.2)" : "var(--b)",
                        backgroundColor: s.color === "blu" ? "rgba(59,130,246,.03)" : "var(--surf)",
                      }}
                    >
                      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg" style={iconStyles[s.color]}>
                        {icons[s.color]}
                      </div>
                      <span className="mb-2 block font-mono text-xs" style={{ color: "var(--t3)" }}>{s.code}</span>
                      <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{s.title}</h3>
                      <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {s.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border px-2.5 py-0.5 text-[11px]"
                            style={{ borderColor: "var(--b)", color: "var(--t3)" }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {s.href && (
                        <Link
                          href={s.href}
                          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold transition-colors"
                          style={{ color: "#3b82f6" }}
                        >
                          Learn more
                          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
