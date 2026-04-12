import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    n: "01",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    ),
    title: "Speed beyond human capacity",
    body: "Every PI reference cross-checked, every claim validated, every mandatory element verified — in parallel, not sequentially.",
  },
  {
    n: "02",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "Exhaustive consistency",
    body: "No reviewer fatigue. No commercial pressure. The same rigour from finding one to finding fifty — every single time.",
  },
  {
    n: "03",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12.75L11.25 15 15 9.75M3.598 6A11.959 11.959 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
      </svg>
    ),
    title: "Independence preserved",
    body: "Avidara flags, analyses, and reports. Your team reviews, validates, and owns every decision. Accountability stays with you — always.",
  },
];

export default function WhatIsAvidara() {
  return (
    <section id="platform" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-12 max-w-2xl">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
            What is Avidara
          </p>
          <h2
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            Not a consultancy. A compliance intelligence layer.
          </h2>
          <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
            Avidara encodes the regulatory rulebook for your industry and applies it consistently,
            exhaustively, and independently every review. The methodology is universal.
            Only the ruleset changes per industry.
          </p>
          <blockquote
            className="mb-6 border-l-2 pl-5 text-base italic leading-relaxed"
            style={{ borderColor: "var(--indigo)", color: "var(--t2)" }}
          >
            "The market invested in compliance infrastructure. Avidara addresses compliance intelligence.
            That is the gap."
          </blockquote>
          <p className="text-sm font-semibold" style={{ color: "var(--indigo-light)" }}>
            The findings are ours. The decisions are yours.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          {/* Connected pillars grid */}
          <div
            className="grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3"
            style={{ backgroundColor: "var(--b)" }}
          >
            {pillars.map((p) => (
              <div
                key={p.n}
                className="flex flex-col p-8 transition-colors hover:bg-[var(--surf2)]"
                style={{ backgroundColor: "var(--surf)" }}
              >
                <div
                  className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: "rgba(79,70,229,.09)",
                    border: "1.5px solid rgba(79,70,229,.16)",
                    color: "var(--indigo)",
                  }}
                >
                  {p.icon}
                </div>
                <p
                  className="mb-4 text-4xl font-bold leading-none"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--b2)" }}
                >
                  {p.n}
                </p>
                <h3 className="mb-3 text-base font-bold" style={{ color: "var(--t)" }}>{p.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{p.body}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
