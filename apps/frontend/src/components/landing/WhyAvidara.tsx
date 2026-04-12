import FadeIn from "@/components/FadeIn";

const differentiators = [
  {
    title: "No internal bias",
    body: "Avidara answers only to the regulatory rulebook, not to commercial timelines, marketing budgets, or launch pressure.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
  },
  {
    title: "Intelligence, not checklists",
    body: "Findings come with context — the exact PI section, why it matters, and what correction is required. Not a flag, a path forward.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    ),
  },
  {
    title: "Accountability stays with your team",
    body: "Avidara produces findings. Your team reviews, validates, and owns every decision. We are a prerequisite to your compliance decision, never a substitute.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
  },
  {
    title: "Universal methodology, vertical rulesets",
    body: "The same analytical framework whether the document is a pharma PI, a transport permit, or a chemical SDS. Only the encoded ruleset changes.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
  },
  {
    title: "Consistent at scale",
    body: "No reviewer fatigue, no variation between team members. The same rigour from review one to review one thousand.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
      </svg>
    ),
  },
  {
    title: "Structured for your MLR file",
    body: "Every report formatted for direct inclusion in your Medical, Legal and Regulatory record — with version control, outcome status, and sign-off blocks.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
  },
  {
    title: "Zero Data Retention — by design",
    body: "All AI processing runs under Anthropic's Zero Data Retention agreement. Your documents are never stored, logged, or used to train any model — by contract, not just policy.",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
  },
];

export default function WhyAvidara() {
  return (
    <section id="why" className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-12 max-w-lg">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
            Why Avidara
          </p>
          <h2
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            Built differently, by design.
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-3 sm:grid-cols-2">
            {differentiators.map((d) => (
              <div
                key={d.title}
                className="flex gap-4 rounded-xl border p-6 transition-all hover:-translate-y-0.5 hover:border-[rgba(79,70,229,.24)] hover:shadow-[var(--shadow)]"
                style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
              >
                <div
                  className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "rgba(79,70,229,.09)",
                    border: "1.5px solid rgba(79,70,229,.15)",
                    color: "var(--indigo)",
                  }}
                >
                  {d.icon}
                </div>
                <div>
                  <h4 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{d.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{d.body}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
