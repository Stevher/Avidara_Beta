import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Speed beyond human capacity",
    body: "Every PI reference cross-checked, every claim validated, every mandatory element verified, in parallel, not sequentially.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 11h14M4 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Exhaustive consistency",
    body: "No reviewer fatigue. No commercial pressure. The same rigour from finding one to finding fifty, every single time.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L4 6.5v5L11 15l7-3.5v-5L11 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 6.5l7 3.5 7-3.5M11 15v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Independence preserved",
    body: "Avidara flags, analyses, and reports. Your team reviews, validates, and owns every decision. Accountability stays with you, always.",
  },
];

export default function WhatIsAvidara() {
  return (
    <section id="platform" className="px-6 py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              What is Avidara
            </p>
            <h2
              className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              Not a consultancy. A compliance intelligence layer.
            </h2>
            <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              Avidara encodes the regulatory rulebook for your industry and applies it
              consistently, exhaustively, and independently every review. The methodology
              is universal. Only the ruleset changes per industry.
            </p>
            <blockquote
              className="mb-6 border-l-2 pl-5 text-base italic"
              style={{ borderColor: "var(--indigo)", color: "var(--t2)" }}
            >
              "The market invested in compliance infrastructure. Avidara addresses compliance intelligence. That is the gap."
            </blockquote>
            <p className="text-sm font-semibold" style={{ color: "var(--indigo-light)" }}>
              The findings are ours. The decisions are yours.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="flex flex-col gap-4">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="flex gap-4 rounded-xl border p-5"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <div
                    className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "rgba(79,70,229,.1)", color: "var(--indigo-light)" }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold" style={{ color: "var(--t)" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
