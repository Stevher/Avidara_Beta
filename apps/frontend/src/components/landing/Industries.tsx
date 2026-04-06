import FadeIn from "@/components/FadeIn";

const industries = [
  {
    title: "Pharmaceuticals",
    primary: true,
    colorClass: "ind",
    body: "SAHPRA, ICH/CTD, MCA Code of Practice. Artwork review, PI/PIL gap analysis, and market access reports.",
    frameworks: ["SAHPRA SAHPGL-HPA-07", "ICH E3/E6", "MCA Code v18"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
  {
    title: "Medical Devices",
    primary: false,
    colorClass: "ind",
    body: "SAHPRA medical device registration, technical file review, and ISO 13485 compliance documentation.",
    frameworks: ["SAHPRA MD", "ISO 13485", "Technical file"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
  },
  {
    title: "Transport and Logistics",
    primary: false,
    colorClass: "amb",
    body: "Road transport compliance, dangerous goods documentation, and cross-border regulatory requirements.",
    frameworks: ["NRTA 93/1996", "SANS 10228/10232", "SADC protocols"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4a2 2 0 012 2v6a2 2 0 01-2 2h-1"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
  {
    title: "Cosmetics",
    primary: false,
    colorClass: "eme",
    body: "Claims substantiation, labelling compliance, and regulatory alignment for cosmetic products.",
    frameworks: ["SAHPRA cosmetics", "POPIA", "Labelling regs"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"/>
      </svg>
    ),
  },
  {
    title: "Foodstuffs",
    primary: false,
    colorClass: "eme",
    body: "Labelling, health claims, and nutritional information compliance for the South African market.",
    frameworks: ["R146 regulations", "Foodstuffs Act"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    ),
  },
  {
    title: "Chemicals and Plastics",
    primary: false,
    colorClass: "amb",
    body: "SDS review, GHS compliance, and EPR regulatory documentation for chemical and plastic products.",
    frameworks: ["OHSA 85/1993", "GHS/SDS", "EPR plastics"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
      </svg>
    ),
  },
  {
    title: "Financial Services",
    primary: false,
    colorClass: "ind",
    body: "FAIS Act, FICA, Board Notice 80, and POPIA compliance review for financial product communications.",
    frameworks: ["FAIS Act 37/2002", "FICA", "POPIA Act 4/2013"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
  },
  {
    title: "Legal Services",
    primary: false,
    colorClass: "ind",
    body: "Compliance documentation review and regulatory correspondence for legal practices and firms.",
    frameworks: ["Cape Bar standards", "LPA", "POPIA"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/>
      </svg>
    ),
  },
];

const iconStyles: Record<string, React.CSSProperties> = {
  ind: { backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.14)" },
  eme: { backgroundColor: "rgba(16,185,129,.09)", color: "var(--emerald)", border: "1.5px solid rgba(16,185,129,.14)" },
  amb: { backgroundColor: "rgba(245,158,11,.09)", color: "var(--amber)", border: "1.5px solid rgba(245,158,11,.14)" },
};

export default function Industries() {
  return (
    <section id="industries" className="px-6 py-32" style={{ backgroundColor: "var(--bg)" }}>
      <div className="mx-auto max-w-6xl">
        <FadeIn className="mb-12">
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
            Industries served
          </p>
          <h2
            className="mb-4 text-4xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            One methodology. Every industry.
          </h2>
          <p className="max-w-xl text-lg" style={{ color: "var(--t2)" }}>
            Avidara encodes the regulatory ruleset per vertical and stands fully outside the organisations
            it serves. The analytical framework is identical — only the rulebook changes.
          </p>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <div
                key={ind.title}
                className="flex flex-col gap-3 rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow)]"
                style={{
                  borderColor: ind.primary ? "rgba(79,70,229,.22)" : "var(--b)",
                  backgroundColor: ind.primary
                    ? "linear-gradient(135deg,rgba(79,70,229,.06),rgba(16,185,129,.03))"
                    : "var(--surf)",
                  background: ind.primary
                    ? "linear-gradient(135deg,rgba(79,70,229,.06),rgba(16,185,129,.03))"
                    : "var(--surf)",
                }}
              >
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={iconStyles[ind.colorClass]}
                >
                  {ind.icon}
                </div>
                <p className="text-sm font-bold" style={{ color: "var(--t)" }}>{ind.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{ind.body}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.frameworks.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border px-2 py-0.5 text-[10px]"
                      style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--bg)" }}
                    >
                      {f}
                    </span>
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
