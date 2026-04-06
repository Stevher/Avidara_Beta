import FadeIn from "@/components/FadeIn";

const industries = [
  {
    title: "Pharmaceuticals",
    status: "primary",
    statusLabel: "Fully encoded",
    body: "SAHPRA, ICH/CTD, MCA Code of Practice. Artwork review, PI/PIL gap analysis, and market access reports.",
    frameworks: ["SAHPRA SAHPGL-HPA-07", "ICH E3/E6", "MCA Code v18"],
  },
  {
    title: "Financial Services",
    status: "active",
    statusLabel: "Active",
    body: "FAIS Act, FICA, Board Notice 80, and POPIA compliance review for financial product communications.",
    frameworks: ["FAIS Act 37/2002", "FICA", "POPIA Act 4/2013"],
  },
  {
    title: "Transport and Logistics",
    status: "active",
    statusLabel: "Active",
    body: "Road transport compliance, dangerous goods documentation, and cross-border regulatory requirements.",
    frameworks: ["NRTA 93/1996", "SANS 10228/10232", "SADC protocols"],
  },
  {
    title: "Cosmetics",
    status: "active",
    statusLabel: "Active",
    body: "Claims substantiation, labelling compliance, and regulatory alignment for cosmetic products.",
    frameworks: ["SAHPRA cosmetics", "POPIA"],
  },
  {
    title: "Foodstuffs",
    status: "active",
    statusLabel: "Active",
    body: "Labelling, health claims, and nutritional information compliance for the South African market.",
    frameworks: ["R146 regulations", "Foodstuffs Act"],
  },
  {
    title: "Chemicals and Plastics",
    status: "active",
    statusLabel: "Active",
    body: "SDS review, GHS compliance, and EPR regulatory documentation for chemical and plastic products.",
    frameworks: ["OHSA 85/1993", "GHS/SDS", "EPR plastics"],
  },
  {
    title: "Legal",
    status: "active",
    statusLabel: "Active",
    body: "Compliance documentation review and regulatory correspondence for legal practices.",
    frameworks: ["Cape Bar standards", "LPA"],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="bg-[#1e293b]/40 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
            Industries
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight text-white"
            style={{ fontFamily: "var(--font-fraunces), serif" }}
          >
            One methodology. Every rulebook.
          </h2>
          <p className="max-w-xl text-lg text-slate-400">
            The same independent review framework applied across every industry.
            Only the regulatory ruleset changes.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.title}
                className={`rounded-xl border p-6 ${
                  ind.status === "primary"
                    ? "border-[#10b981]/30 bg-[#10b981]/5"
                    : "border-white/[0.06] bg-[#0f172a]"
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{ind.title}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      ind.status === "primary"
                        ? "bg-[#10b981]/15 text-[#10b981]"
                        : "bg-[#4f46e5]/10 text-[#818cf8]"
                    }`}
                  >
                    {ind.statusLabel}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{ind.body}</p>
                <div className="flex flex-col gap-1">
                  {ind.frameworks.map((f) => (
                    <span key={f} className="text-xs text-slate-600">{f}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
