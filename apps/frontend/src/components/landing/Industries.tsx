import FadeIn from "@/components/FadeIn";

const industries = [
  {
    title: "Pharmaceuticals",
    primary: true,
    body: "SAHPRA, ICH/CTD, MCA Code of Practice. Artwork review, PI/PIL gap analysis, and market access reports.",
    frameworks: ["SAHPRA SAHPGL-HPA-07", "ICH E3/E6", "MCA Code v18"],
  },
  {
    title: "Financial Services",
    primary: false,
    body: "FAIS Act, FICA, Board Notice 80, and POPIA compliance review for financial product communications.",
    frameworks: ["FAIS Act 37/2002", "FICA", "POPIA Act 4/2013"],
  },
  {
    title: "Transport and Logistics",
    primary: false,
    body: "Road transport compliance, dangerous goods documentation, and cross-border regulatory requirements.",
    frameworks: ["NRTA 93/1996", "SANS 10228/10232", "SADC protocols"],
  },
  {
    title: "Cosmetics",
    primary: false,
    body: "Claims substantiation, labelling compliance, and regulatory alignment for cosmetic products.",
    frameworks: ["SAHPRA cosmetics", "POPIA"],
  },
  {
    title: "Foodstuffs",
    primary: false,
    body: "Labelling, health claims, and nutritional information compliance for the South African market.",
    frameworks: ["R146 regulations", "Foodstuffs Act"],
  },
  {
    title: "Chemicals and Plastics",
    primary: false,
    body: "SDS review, GHS compliance, and EPR regulatory documentation for chemical and plastic products.",
    frameworks: ["OHSA 85/1993", "GHS/SDS", "EPR plastics"],
  },
  {
    title: "Legal",
    primary: false,
    body: "Compliance documentation review and regulatory correspondence for legal practices.",
    frameworks: ["Cape Bar standards", "LPA"],
  },
];

export default function Industries() {
  return (
    <section id="industries" className="px-6 py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-16">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            Industries
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            One methodology. Every rulebook.
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "var(--t2)" }}>
            The same independent review framework applied across every industry.
            Only the regulatory ruleset changes.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <div
                key={ind.title}
                className="rounded-xl border p-5"
                style={{
                  borderColor: ind.primary ? "rgba(16,185,129,.3)" : "var(--b)",
                  backgroundColor: ind.primary ? "rgba(16,185,129,.04)" : "var(--surf)",
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold" style={{ color: "var(--t)" }}>{ind.title}</h3>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-xs font-medium"
                    style={
                      ind.primary
                        ? { backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }
                        : { backgroundColor: "rgba(79,70,229,.1)", color: "var(--indigo-light)" }
                    }
                  >
                    {ind.primary ? "Fully encoded" : "Active"}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{ind.body}</p>
                <div className="flex flex-col gap-1">
                  {ind.frameworks.map((f) => (
                    <span key={f} className="text-xs" style={{ color: "var(--t3)" }}>{f}</span>
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
