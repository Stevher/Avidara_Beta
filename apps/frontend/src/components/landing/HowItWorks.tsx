import FadeIn from "@/components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Upload your documents",
    description:
      "Drag and drop CTDs, INDs, NDAs, or any regulatory submission. Avidara accepts PDF, Word, and structured eCTD packages.",
  },
  {
    number: "02",
    title: "AI runs a compliance scan",
    description:
      "Within minutes, our models cross-reference your documents against current FDA, EMA, and ICH guidelines — flagging gaps, inconsistencies, and missing sections.",
  },
  {
    number: "03",
    title: "Review with your team",
    description:
      "Assign findings to reviewers, add comments, resolve issues, and track progress. Full version history at every step.",
  },
  {
    number: "04",
    title: "Export & submit with confidence",
    description:
      "Generate a final audit-ready report. Every finding is sourced and traceable. Submit knowing your document has been comprehensively reviewed.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0f0f14] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-indigo-400">How it works</p>
          <h2 className="text-4xl font-bold tracking-tight text-white">
            From upload to submission in four steps
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-[27px] top-10 hidden h-[calc(100%-80px)] w-px bg-gradient-to-b from-indigo-500/40 via-indigo-500/20 to-transparent lg:block" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-8">
                <div className="relative flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-indigo-500/40 bg-indigo-500/10 text-sm font-bold text-indigo-400">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 top-14 h-12 w-px -translate-x-1/2 bg-indigo-500/20 lg:hidden" />
                  )}
                </div>
                <div className="pb-12 pt-2">
                  <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
                  <p className="max-w-lg text-slate-400 leading-relaxed">{step.description}</p>
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
