import FadeIn from "@/components/FadeIn";

const steps = [
  {
    number: "01",
    title: "Submit your documents",
    description: "Upload your artwork, promotional material, PI, or PIL through the Avidara platform. Supported formats include PDF, Word, and image files. No formatting required on your side.",
  },
  {
    number: "02",
    title: "Avidara runs the review",
    description: "The platform cross-checks every claim, reference, and mandatory element against the applicable regulatory ruleset. PI references, indication statements, dosage figures, mandatory warnings, all verified in parallel.",
  },
  {
    number: "03",
    title: "Receive your findings report",
    description: "A structured report is delivered, graded Critical, Major, or Minor, with exact locations, PI references, and corrective recommendations. Formatted for MLR submission where applicable.",
  },
  {
    number: "04",
    title: "Your team owns the decision",
    description: "Avidara's role ends at delivery. You review the findings, validate the recommendations, and own every decision. Accountability stays with you, always.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0f172a] px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
            How it works
          </p>
          <h2
            className="text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            From submission to report in four steps.
          </h2>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="relative">
            {/* Vertical connector line */}
            <div className="absolute left-[27px] top-10 hidden h-[calc(100%-80px)] w-px bg-gradient-to-b from-[#4f46e5]/40 via-[#4f46e5]/10 to-transparent lg:block" />

            <div className="space-y-12">
              {steps.map((step, i) => (
                <div key={step.number} className="flex gap-8">
                  <div className="relative flex-shrink-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#4f46e5]/40 bg-[#4f46e5]/10 text-sm font-bold text-[#818cf8]"
                      style={{ fontFamily: "var(--font-fraunces), serif" }}
                    >
                      {step.number}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="absolute left-1/2 top-14 h-12 w-px -translate-x-1/2 bg-[#4f46e5]/20 lg:hidden" />
                    )}
                  </div>
                  <div className="pb-12 pt-2">
                    <h3 className="mb-3 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="max-w-lg leading-relaxed text-slate-400">{step.description}</p>
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
