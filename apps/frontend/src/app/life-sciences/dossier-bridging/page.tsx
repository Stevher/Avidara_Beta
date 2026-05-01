import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FadeIn from "@/components/FadeIn";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dossier Bridging — SAHPRA Market Entry Gap Analysis | Avidara",
  description:
    "Analyse your existing regulatory dossier against SAHPRA's submission requirements before you file. Module-by-module gap report for products bridging from China, EU, USA, UK, and any other source market.",
};

const routes = [
  { from: "NMPA", fromFull: "China (NMPA)", to: "SAHPRA", flag: "🇨🇳" },
  { from: "EMA", fromFull: "European Union (EMA)", to: "SAHPRA", flag: "🇪🇺" },
  { from: "FDA", fromFull: "United States (FDA)", to: "SAHPRA", flag: "🇺🇸" },
  { from: "MHRA", fromFull: "United Kingdom (MHRA)", to: "SAHPRA", flag: "🇬🇧" },
  { from: "Other", fromFull: "Any market via ICH CTD baseline", to: "SAHPRA", flag: "🌍" },
];

const flags = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
      </svg>
    ),
    title: "Zone IVb Stability",
    body: "SA's hot/humid climate zone requires stability data many source dossiers omit entirely.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    ),
    title: "CPP & GMP Certificates",
    body: "SAHPRA requires current CPP and GMP certificates from the source authority — gaps here are immediate blockers.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
    title: "SA Bioequivalence",
    body: "SAHPRA requires local or SA-recognised bioequivalence studies for generics — foreign BE data is often insufficient.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    ),
    title: "Pregnancy Category Conversion",
    body: "SA uses a different pregnancy classification system. FDA categories A–X map non-trivially and require explicit conversion.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12h6M12 9v6"/>
      </svg>
    ),
    title: "SAHPRA Scheduling Symbol",
    body: "Scheduling under the Medicines Act may differ from source market classification. Determines label, dispensing, and advertising requirements.",
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    ),
    title: "MHSC Pricing Obligation",
    body: "Medicines subject to single exit price regulation must have pricing submitted to the MHSC before or alongside registration.",
  },
];

const productTypes = ["NCE", "Generic", "Biosimilar", "OTC", "Biological"];

const pathways = [
  {
    code: "Full",
    label: "Full Application",
    body: "Your product will need a complete CTD package prepared for SAHPRA — no prior approval to rely on. Avidara identifies every gap your dossier needs to close before you can file this route.",
    badge: "NCE · Novel biologicals",
    badgeBg: "rgba(239,68,68,.1)",
    badgeColor: "#f87171",
  },
  {
    code: "Abridged",
    label: "Abridged / Reliance",
    body: "Your product has an approval SAHPRA will recognise (EU, USA, UK, Australia). Avidara confirms reliance eligibility and flags the SA-specific data gaps your dossier still needs to address.",
    badge: "Generics · Approved products",
    badgeBg: "rgba(59,130,246,.1)",
    badgeColor: "#60a5fa",
    highlight: true,
  },
  {
    code: "ZAZIBONA",
    label: "ZAZIBONA Pathway",
    body: "Your product qualifies for joint SADC assessment. Avidara identifies which modules need additional localisation for simultaneous submission across Botswana, Namibia, Zimbabwe, Zambia, and South Africa.",
    badge: "Multi-SADC registration",
    badgeBg: "rgba(16,185,129,.1)",
    badgeColor: "#34d399",
  },
];

const personas = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "Business development teams",
    body: "Evaluating an in-licensing deal? Run the target product's dossier through Dossier Bridging before you commit. Know the SAHPRA readiness before you sign.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
      </svg>
    ),
    title: "Regulatory affairs leads",
    body: "Preparing your first SAHPRA submission for a foreign product? Know the exact gaps before you file — not during the SAHPRA review clock.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"/>
      </svg>
    ),
    title: "Importers & market entry partners",
    body: "Assessing a foreign manufacturer's dossier before committing to a market entry agreement? An objective gap report gives you the negotiating position.",
  },
];

export default function DossierBridgingPage() {
  return (
    <>
      <Navbar alwaysOpaque />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32" style={{ backgroundColor: "var(--bg)" }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 5%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ backgroundColor: "rgba(59,130,246,.12)" }}
          />

          <div className="relative z-10 mx-auto max-w-4xl">
            <FadeIn>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <a
                  href="/life-sciences"
                  className="text-xs font-medium transition-colors hover:text-[var(--t2)]"
                  style={{ color: "var(--t3)" }}
                >
                  Pharmaceuticals
                </a>
                <span style={{ color: "var(--t3)" }}>/</span>
                <span className="text-xs font-medium" style={{ color: "var(--t3)" }}>Regulatory Intelligence</span>
              </div>

              <div
                className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{
                  borderColor: "rgba(59,130,246,.25)",
                  backgroundColor: "rgba(59,130,246,.08)",
                  color: "#60a5fa",
                }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" style={{ animation: "pulse 2s infinite" }} />
                Dossier Bridging · AVD-BRIDGE
              </div>

              <h1
                className="mb-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[60px]"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Bring your product to South Africa —{" "}
                <em
                  className="not-italic"
                  style={{
                    background: "linear-gradient(135deg, #60a5fa 0%, var(--emerald) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  without the submission surprises.
                </em>
              </h1>

              <p className="mb-10 max-w-3xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
                Avidara's Dossier Bridging service analyses your existing regulatory dossier against SAHPRA's submission requirements and tells you exactly what's missing before you file. Upload your CTD modules, select your source market, and receive a module-by-module gap report — critical blockers, major deficiencies, and minor corrections — with the specific regulation reference and corrective action for each.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="#book"
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-xl"
                  style={{ backgroundColor: "#3b82f6", boxShadow: "0 4px 20px rgba(59,130,246,.38)" }}
                >
                  Run your first gap analysis
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="/life-sciences"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
                  style={{ borderColor: "var(--b)", color: "var(--t2)" }}
                >
                  All pharma services
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Product type detection banner */}
        <div style={{ backgroundColor: "var(--surf2)", borderTop: "1px solid var(--b)", borderBottom: "1px solid var(--b)" }}>
          <div className="mx-auto max-w-6xl px-6 py-5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                Product type detected automatically
              </span>
              <div className="flex flex-wrap gap-2">
                {productTypes.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-3 py-0.5 text-xs font-medium"
                    style={{ borderColor: "rgba(59,130,246,.2)", color: "#60a5fa", backgroundColor: "rgba(59,130,246,.06)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <span className="text-xs" style={{ color: "var(--t3)" }}>Route-specific analysis applied automatically per product type.</span>
            </div>
          </div>
        </div>

        {/* Route coverage */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[#60a5fa]" />
                Route Coverage
              </p>
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <h2
                  className="text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  Every major source market. Any source market.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  Pre-built route analysis for the four most common origin markets, plus ICH CTD baseline coverage for anything else.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {routes.map((r) => (
                  <div
                    key={r.from}
                    className="flex flex-col gap-3 rounded-xl border p-5"
                    style={{ borderColor: r.from === "Other" ? "rgba(59,130,246,.2)" : "var(--b)", backgroundColor: r.from === "Other" ? "rgba(59,130,246,.04)" : "var(--surf)" }}
                  >
                    <span className="text-2xl">{r.flag}</span>
                    <div>
                      <p className="text-xs font-semibold" style={{ color: "var(--t3)" }}>{r.fromFull}</p>
                      <div className="my-2 flex items-center gap-1.5">
                        <span className="text-sm font-bold" style={{ color: "var(--t)" }}>{r.from}</span>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ color: "#60a5fa" }}>
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="text-sm font-bold" style={{ color: "#60a5fa" }}>SAHPRA</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* What gets flagged */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Gap Detection
              </p>
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <h2
                  className="text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  The gaps that stall South African submissions.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  Each flagged with the specific ICH, SAHPRA guideline, or Medicines Act provision — and the corrective action required to resolve it.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {flags.map((f) => (
                  <div
                    key={f.title}
                    className="rounded-xl border p-5"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(59,130,246,.09)", color: "#60a5fa", border: "1.5px solid rgba(59,130,246,.16)" }}
                    >
                      {f.icon}
                    </div>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{f.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{f.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Severity note */}
            <FadeIn delay={250}>
              <div
                className="mt-6 flex flex-wrap items-center gap-6 rounded-xl border p-5"
                style={{ borderColor: "var(--b)", backgroundColor: "var(--surf2)" }}
              >
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>All findings rated</p>
                {[
                  { label: "Critical", bg: "bg-red-500/10", text: "text-red-400" },
                  { label: "Major", bg: "bg-orange-500/10", text: "text-orange-400" },
                  { label: "Minor", bg: "bg-slate-500/10", text: "text-slate-400" },
                ].map((s) => (
                  <span key={s.label} className={`rounded-full px-3 py-1 text-xs font-semibold ${s.bg} ${s.text}`}>
                    {s.label}
                  </span>
                ))}
                <p className="text-xs" style={{ color: "var(--t3)" }}>
                  Each finding includes the specific ICH, SAHPRA guideline, or Medicines Act reference and corrective action.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Registration pathway */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#60a5fa" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[#60a5fa]" />
                Pathway Recommendation
              </p>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Avidara tells you which pathway to file — and what your dossier still needs to get there.
              </h2>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-4 sm:grid-cols-3">
                {pathways.map((p) => (
                  <div
                    key={p.code}
                    className="relative flex flex-col gap-4 rounded-xl border p-6"
                    style={{
                      borderColor: p.highlight ? "rgba(59,130,246,.3)" : "var(--b)",
                      backgroundColor: p.highlight ? "rgba(59,130,246,.05)" : "var(--surf)",
                    }}
                  >
                    {p.highlight && (
                      <div className="absolute inset-x-0 top-0 h-[3px] rounded-t-xl" style={{ background: "linear-gradient(90deg, #3b82f6, #60a5fa)" }} />
                    )}
                    <span className="font-mono text-xs" style={{ color: "var(--t3)" }}>{p.code}</span>
                    <h3 className="text-base font-bold" style={{ color: "var(--t)" }}>{p.label}</h3>
                    <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{p.body}</p>
                    <span
                      className="w-fit rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: p.badgeBg, color: p.badgeColor }}
                    >
                      {p.badge}
                    </span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* Who it's for */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Who It&apos;s For
              </p>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Built for every stage of market entry.
              </h2>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-4 sm:grid-cols-3">
                {personas.map((p) => (
                  <div
                    key={p.title}
                    className="rounded-xl border p-6"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div
                      className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(59,130,246,.09)", color: "#60a5fa", border: "1.5px solid rgba(59,130,246,.16)" }}
                    >
                      {p.icon}
                    </div>
                    <h3 className="mb-3 text-sm font-bold capitalize" style={{ color: "var(--t)" }}>{p.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{p.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* CTA */}
        <section id="book" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--surf2)", borderTop: "1px solid var(--b)" }}>
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <div
                className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
                style={{ borderColor: "rgba(59,130,246,.25)", backgroundColor: "rgba(59,130,246,.08)", color: "#60a5fa" }}
              >
                Get started
              </div>
              <h2
                className="mb-4 text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Run your first gap analysis.
              </h2>
              <p className="mb-8 text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                Upload a dossier module and get results in minutes. No commitment, no consultation required — just the gaps, ranked and referenced.
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="mailto:hello@avidara.co.za?subject=Dossier Bridging — Gap Analysis Request"
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-xl"
                  style={{ backgroundColor: "#3b82f6", boxShadow: "0 4px 20px rgba(59,130,246,.38)" }}
                >
                  Start your gap analysis
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="/life-sciences"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
                  style={{ borderColor: "var(--b)", color: "var(--t2)" }}
                >
                  All pharma services
                </a>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
      <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
    </>
  );
}
