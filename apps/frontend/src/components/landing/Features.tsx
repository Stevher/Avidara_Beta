const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 5h14M4 10h14M4 15h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19.5 17.5L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "AI Document Analysis",
    description:
      "Instantly surface compliance gaps across regulatory submissions. Our models are trained on thousands of FDA and EMA guidelines to flag issues before reviewers ever open a file.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15.5 12v7M12 15.5h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Review Workflows",
    description:
      "Coordinate multi-team reviews with structured handoffs, version tracking, and real-time commenting — built for the rigorous demands of pharmaceutical regulatory submissions.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 3h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 8h6M8 11h6M8 14h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M14 15l1.5 1.5L18 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Audit-Ready Reports",
    description:
      "Export regulatory-ready summaries at any stage. Every AI finding is traceable back to the source document, with full audit trails that satisfy FDA 21 CFR Part 11 requirements.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 3a8 8 0 1 0 0 16A8 8 0 0 0 11 3z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Real-Time Tracking",
    description:
      "Know exactly where every submission stands. Track review progress, deadline exposure, and reviewer assignments from a single dashboard — across all active projects.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 3L4 7v5c0 4 3.5 7 7 8 3.5-1 7-4 7-8V7l-7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 11l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Enterprise Security",
    description:
      "SOC 2 Type II certified. Data is encrypted in transit and at rest. Role-based access control, SSO support, and private deployment options for the most sensitive submissions.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 11h4l3 7 4-14 3 7h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Submission Intelligence",
    description:
      "Learn from every review cycle. Avidara surfaces patterns across your submission history to help teams write better first drafts and avoid recurring deficiencies.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#0b0b0f] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">Features</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            Everything your team needs to ship submissions faster
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Purpose-built for pharmaceutical regulatory affairs teams — not adapted from generic document tools.
          </p>
        </div>

        <div className="grid gap-px rounded-2xl border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3 overflow-hidden">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 bg-[#0b0b0f] p-8 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400">
                {feature.icon}
              </div>
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
