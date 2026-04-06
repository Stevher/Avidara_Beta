import FadeIn from "@/components/FadeIn";

const services = [
  {
    code: "AVD-ART",
    flagship: true,
    title: "Artwork and Promotional Material Review",
    body: "Every promotional piece reviewed against the SAHPRA-approved Professional Information. Findings graded Critical, Major, or Minor with exact PI references, locations, and corrective recommendations. Structured for MLR submission.",
    tags: ["Critical / Major / Minor grading", "PI Cross-Reference", "MLR Ready", "Same-day turnaround"],
  },
  {
    code: "AVD-GAP-PI",
    flagship: false,
    title: "PI and PIL Gap Analysis",
    body: "Systematic comparison of your Professional Information and Patient Information Leaflet against SAHPRA templates and ICH requirements. Every structural and content gap identified before submission.",
    tags: ["SAHPRA template alignment", "ICH compliance", "Submission ready"],
  },
  {
    code: "AVD-MAR-PH",
    flagship: false,
    title: "Market Access Report",
    body: "End-to-end market access landscape analysis for pharmaceutical products entering or expanding in the South African market. Reimbursement pathways, formulary positioning, and access barriers.",
    tags: ["Formulary analysis", "Pricing landscape", "Access barriers"],
  },
  {
    code: "AVD-MAR-RE",
    flagship: false,
    title: "Reimbursement Access Report",
    body: "Detailed analysis of reimbursement eligibility, funding landscape, and strategic positioning for products seeking medical scheme coverage in South Africa.",
    tags: ["Scheme landscape", "PMB assessment", "Funding strategy"],
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0f172a] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
            Services
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            From first review to ongoing intelligence.
          </h2>
          <p className="max-w-xl text-lg text-slate-400">
            Whether you need a single artwork review before print approval or a structured
            compliance programme across your full portfolio, Avidara scales to fit.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col gap-4">
            {services.map((s) => (
              <div
                key={s.code}
                className={`rounded-xl border p-6 transition-colors ${
                  s.flagship
                    ? "border-[#4f46e5]/40 bg-[#4f46e5]/5"
                    : "border-white/[0.06] bg-[#1e293b]/30 hover:bg-[#1e293b]/60"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="rounded bg-[#1e293b] px-2 py-0.5 font-mono text-xs text-slate-400">
                        {s.code}
                      </span>
                      {s.flagship && (
                        <span className="rounded bg-[#10b981]/15 px-2 py-0.5 text-xs font-semibold text-[#10b981]">
                          Flagship
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-slate-400">{s.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/[0.08] px-3 py-1 text-xs text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="#book"
                      className={`inline-flex h-9 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors ${
                        s.flagship
                          ? "bg-[#4f46e5] text-white hover:bg-[#3730a3]"
                          : "border border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      Book a review
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
