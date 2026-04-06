import FadeIn from "@/components/FadeIn";

const deliverables = [
  "Branded PDF review report",
  "Finding summary table with severities",
  "Exact PI section references per finding",
  "Actionable corrective recommendations",
  "Approved or Not Approved outcome statement",
];

const services = [
  {
    code: "AVD-GAP-PI",
    color: "ind",
    title: "PI and PIL Development",
    body: "SAHPRA-compliant Professional Information and Patient Leaflet drafting and review — clean, submission-ready. English UK, SI units, scheduling box, bilingual PIL.",
    tags: ["PI Drafting", "PIL bilingual", "SAHPRA format"],
  },
  {
    code: "AVD-VER",
    color: "eme",
    title: "Version Comparison",
    body: "Tracked change comparison between PI or PIL versions — every material change identified, assessed, and documented with a branded change report for your MLR file.",
    tags: ["Tracked changes", "Change report"],
  },
  {
    code: "AVD-GAP-D",
    color: "ind",
    title: "Dossier Gap Analysis",
    body: "Module-by-module assessment of your registration dossier against SAHPRA eCTD requirements. Readiness scoring, critical path, and priority action plan.",
    tags: ["Modules 1 to 5", "New registration"],
  },
  {
    code: "AVD-TRN",
    color: "amb",
    title: "Transport and Logistics Compliance",
    body: "Cross-border document review, dangerous goods assessment, and POPIA compliance across NRTA, RTMS, AARTO, SADC protocols, and SANS standards.",
    tags: ["NRTA / RTMS", "Cross-border", "Dangerous goods"],
  },
];

const icons: Record<string, React.ReactNode> = {
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
      <rect x="1" y="3" width="15" height="13" rx="2"/>
      <path d="M16 8h4a2 2 0 012 2v6a2 2 0 01-2 2h-1"/>
      <circle cx="5.5" cy="18.5" r="2.5"/>
      <circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
};

const iconStyles: Record<string, React.CSSProperties> = {
  ind: { backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.16)" },
  eme: { backgroundColor: "rgba(16,185,129,.09)", color: "var(--emerald)", border: "1.5px solid rgba(16,185,129,.16)" },
  amb: { backgroundColor: "rgba(245,158,11,.09)", color: "var(--amber)", border: "1.5px solid rgba(245,158,11,.16)" },
};

export default function Services() {
  return (
    <section id="services" className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
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
                From first review to ongoing intelligence.
              </h2>
            </div>
            <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              Whether you need a single artwork review before print approval or a structured
              compliance programme across your full portfolio, Avidara scales to fit.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col gap-4">
            {/* Flagship — full width with checklist panel */}
            <div
              className="card-hover active rounded-xl border p-6 lg:p-8"
              style={{
                borderColor: "rgba(79,70,229,.22)",
                backgroundColor: "rgba(79,70,229,.05)",
              }}
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
                    <span
                      className="rounded px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                    >
                      Flagship
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-lg font-bold"
                    style={{ color: "var(--t)" }}
                  >
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

                {/* Checklist panel */}
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

            {/* Regular services — 2-col grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              {services.map((s) => (
                <div
                  key={s.code}
                  className="card-hover rounded-xl border p-6"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <div
                    className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                    style={iconStyles[s.color]}
                  >
                    {icons[s.color]}
                  </div>
                  <span className="mb-2 block font-mono text-xs" style={{ color: "var(--t3)" }}>{s.code}</span>
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{s.title}</h3>
                  <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
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
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
