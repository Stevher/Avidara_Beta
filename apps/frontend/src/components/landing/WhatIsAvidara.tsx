import FadeIn from "@/components/FadeIn";

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 7v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Speed beyond human capacity",
    body: "Every PI reference cross-checked, every claim validated, every mandatory element verified, in parallel, not sequentially.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 11h14M4 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="17" cy="16" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M19.5 18.5L21 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Exhaustive consistency",
    body: "No reviewer fatigue. No commercial pressure. The same rigour from finding one to finding fifty, every single time.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3L4 6.5v5L11 15l7-3.5v-5L11 3z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M4 6.5l7 3.5 7-3.5M11 15v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Independence preserved",
    body: "Avidara flags, analyses, and reports. Your team reviews, validates, and owns every decision. Accountability stays with you, always.",
  },
];

export default function WhatIsAvidara() {
  return (
    <section id="platform" className="bg-[#1e293b]/40 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left */}
          <FadeIn>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
              What is Avidara
            </p>
            <h2
              className="mb-6 text-4xl font-bold tracking-tight text-white"
              style={{ fontFamily: "var(--font-fraunces), serif" }}
            >
              Not a consultancy. A compliance intelligence layer.
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-slate-400">
              Avidara encodes the regulatory rulebook for your industry and applies it
              consistently, exhaustively, and independently every review. The methodology
              is universal. Only the ruleset changes per industry.
            </p>
            <blockquote className="border-l-2 border-[#4f46e5] pl-4 text-base italic text-slate-300">
              "The market invested in compliance infrastructure. Avidara addresses compliance intelligence. That is the gap."
            </blockquote>
            <p className="mt-6 text-sm text-slate-500">
              The findings are ours. The decisions are yours.
            </p>
          </FadeIn>

          {/* Right: three pillars */}
          <FadeIn delay={150}>
            <div className="flex flex-col gap-6">
              {pillars.map((p) => (
                <div key={p.title} className="flex gap-4 rounded-xl border border-white/[0.06] bg-[#0f172a] p-6">
                  <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#4f46e5]/10 text-[#818cf8]">
                    {p.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-semibold text-white">{p.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{p.body}</p>
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
