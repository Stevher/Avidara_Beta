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
    body: "End-to-end market access landscape analysis for pharmaceutical products entering or expanding in the South African market. Reimbursement pathways, formulary positioning, and access barriers mapped.",
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
    <section id="services" className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            Services
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            From first review to ongoing intelligence.
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "var(--t2)" }}>
            Whether you need a single artwork review before print approval or a structured
            compliance programme across your full portfolio, Avidara scales to fit.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="flex flex-col gap-3">
            {services.map((s) => (
              <div
                key={s.code}
                className="rounded-xl border p-6 transition-all"
                style={{
                  borderColor: s.flagship ? "rgba(79,70,229,.35)" : "var(--b)",
                  backgroundColor: s.flagship ? "rgba(79,70,229,.05)" : "var(--surf)",
                }}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span
                        className="rounded px-2 py-0.5 font-mono text-xs"
                        style={{ backgroundColor: "var(--b)", color: "var(--t3)" }}
                      >
                        {s.code}
                      </span>
                      {s.flagship && (
                        <span
                          className="rounded px-2 py-0.5 text-xs font-semibold"
                          style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                        >
                          Flagship
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--t)" }}>{s.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{s.body}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-3 py-1 text-xs"
                          style={{ borderColor: "var(--b)", color: "var(--t3)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <a
                    href="#book"
                    className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg px-4 text-sm font-medium transition-colors"
                    style={
                      s.flagship
                        ? { backgroundColor: "var(--indigo)", color: "#fff" }
                        : { border: "1px solid var(--b)", color: "var(--t2)" }
                    }
                  >
                    Book a review
                    <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
