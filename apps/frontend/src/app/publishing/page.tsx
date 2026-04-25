import type { CSSProperties } from "react";
import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo, { type DemoConfig } from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import FadeIn from "@/components/FadeIn";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publishing Compliance & Accuracy Reviews | Avidara",
  description:
    "Independent accuracy verification for publishers in regulated and knowledge-intensive industries. Verify legal, medical, and agricultural publications against authoritative sources — or upload your own. Inaccuracies, outdated references, and content gaps surfaced before publication.",
};

const demoConfig: DemoConfig = {
  documentName: "LaborLaw_Commentary_Vol12_2024.pdf",
  documentMeta: "3.7 MB · LRA 66/1995 · GG 47531 · Ready",
  checks: [
    "Current legislation version verified",
    "Case law citation cross-reference",
    "CCMA procedural rule check",
    "Government Gazette alignment",
    "SALRC reform pipeline review",
    "Cross-reference integrity check",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Repealed section cited — s.189A(1)(b) amended by Act 12 of 2023", loc: "Chapter 4 · Page 87 · Retrenchment procedure" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Missing SCA judgment — NUMSA v Assign Services [2022]", loc: "Chapter 6 · Page 134 · Temporary employment commentary" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "CCMA con/arb timeline superseded — 30 days, not 14 days", loc: "Chapter 8 · Page 201 · Dispute resolution" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Gazette reference mismatch — GN R.1234 vs GN R.1345 in GG 47531", loc: "Appendix B · Regulation table" },
  ],
  outcome: "2 Critical · 3 Major · 1 Minor",
};

const publishingFindings = [
  {
    code: "Critical" as const,
    title: "Superseded source cited as current",
    body: "A provision amended by Act 12 of 2023 appears as authoritative. The amendment repealed it entirely. Missed across three editorial reviews — by professionals who knew the subject.",
  },
  {
    code: "Major" as const,
    title: "Significant ruling not captured",
    body: "A landmark judgment that directly reshapes Chapter 6 commentary was handed down after the previous edition. Not cross-referenced. Readers relying on this chapter are working with incomplete law.",
  },
  {
    code: "Major" as const,
    title: "Procedural guidance superseded",
    body: "A regulatory amendment changed the applicable timeline. The published guidance still reflects the old procedure — creating real risk for practitioners following it in good faith.",
  },
  {
    code: "Minor" as const,
    title: "Reference number discrepancy",
    body: "The citation in Appendix B does not match the authoritative source version published after the cited amendment. A minor error that quietly erodes source credibility.",
  },
];

const publishingServices = [
  {
    code: "PUB-CMP",
    color: "amb",
    title: "Edition Comparison",
    body: "Track exactly what changed between editions — source references, citations, and regulatory text. Every material change identified and documented with a structured change report.",
    tags: ["Edition comparison", "Change report", "Amendment tracking"],
  },
  {
    code: "PUB-SRC",
    color: "amb",
    title: "Source Currency Check",
    body: "Verify all references against the current authoritative version. Flag superseded, amended, or withdrawn sources — from legislation and case law to clinical guidelines and standards.",
    tags: ["Currency audit", "Superseded flags", "Amendment status"],
  },
  {
    code: "PUB-CIT",
    color: "ind",
    title: "Citation Verification",
    body: "Cross-check every citation against authoritative databases. Ensure accuracy, completeness, and currency across every reference — before readers find the errors.",
    tags: ["Source cross-ref", "Database verified", "Completeness check"],
  },
  {
    code: "PUB-GAP",
    color: "ind",
    title: "Content Gap Analysis",
    body: "Identify authoritative developments, updates, and rulings your current edition hasn't captured. Know exactly what's missing — and how significant each gap is — before going to print.",
    tags: ["Coverage audit", "Gap report", "Priority list"],
  },
  {
    code: "PUB-MON",
    color: "amb",
    title: "Change Pipeline Monitoring",
    body: "Track upcoming changes in your field — draft legislation, revised guidelines, new rulings — and map them against your publication's existing coverage. Anticipate before they become errors.",
    tags: ["Pipeline watch", "Draft tracking", "Forward planning"],
  },
  {
    code: "PUB-XR",
    color: "ind",
    title: "Cross-Reference Audit",
    body: "Verify every internal and external reference for accuracy. Eliminate circular citations, broken references, and outdated section numbers across your full publication.",
    tags: ["Reference audit", "Internal links", "Section numbers"],
  },
];

const iconStyles: Record<string, CSSProperties> = {
  ind: { backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.16)" },
  amb: { backgroundColor: "rgba(217,119,6,.09)", color: "#d97706", border: "1.5px solid rgba(217,119,6,.16)" },
};

function ServiceIcon({ color }: { color: string }) {
  if (color === "amb") {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    );
  }
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
    </svg>
  );
}

const verticals = [
  {
    label: "Legal Publishing",
    example: true,
    body: "Legislation, case law, CCMA rules, SALRC reform pipeline — with legal as the primary worked example.",
    sources: ["SALRC", "SAFLII", "Government Gazette", "Parliament", "CCMA"],
  },
  {
    label: "Medical Publishing",
    example: false,
    body: "Clinical guidelines, drug references, and treatment protocols verified against current literature and regulatory standards.",
    sources: ["SAHPRA", "Clinical guidelines", "Treatment protocols"],
  },
  {
    label: "Agricultural Publishing",
    example: false,
    body: "Pest management, chemical registrations, and agri-regulatory references verified against DAFF and current label approvals.",
    sources: ["DAFF", "Chemical registrations", "Label approvals"],
  },
  {
    label: "Historical Publishing",
    example: false,
    body: "Archival accuracy, primary source verification, and factual cross-referencing across historical records and established scholarship.",
    sources: ["Primary sources", "Archival records", "Published scholarship"],
  },
];

export default function PublishingPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Publishing · Compliance Intelligence"
          heading="Keep your publications authoritative."
          headingAccent="Verified against the sources that matter."
          sub="In law, medicine, and agriculture, published errors have real consequences for the people relying on them. Avidara verifies your content against authoritative reference sources — surfacing inaccuracies, outdated references, and content gaps before your readers find them."
          accent="#d97706"
          accentLight="#fbbf24"
          accentDeep="#92400e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Published content goes stale. Gaps creep in. Credibility erodes."
          body1="Publishing teams work under deadline pressure. Sources update without warning. Rulings hand down between editions. Guidelines get revised. A cited provision gets repealed. A landmark judgment reshapes an entire chapter — and your publication doesn't yet know it exists."
          body2="Your editors know the subject. What they need is an independent layer that tracks every authoritative source continuously — and tells them exactly where the publication diverges from current authority."
          findings={publishingFindings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />

        {/* Publishing services */}
        <section id="services" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-12">
              <div className="grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                    <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                    Services
                  </p>
                  <h2
                    className="text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                  >
                    From one edition check to ongoing intelligence.
                  </h2>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  Whether you need a pre-publication accuracy review or a continuous monitoring programme
                  across your full catalogue, Avidara scales to fit.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              {/* Flagship */}
              <div
                className="card-hover active mb-4 rounded-xl border p-6 lg:p-8"
                style={{ borderColor: "rgba(217,119,6,.22)", backgroundColor: "rgba(217,119,6,.05)" }}
              >
                <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
                  <div>
                    <div className="mb-4 flex flex-wrap items-center gap-2">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(217,119,6,.09)", color: "#d97706", border: "1.5px solid rgba(217,119,6,.16)" }}
                      >
                        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                        </svg>
                      </div>
                      <span className="font-mono text-xs" style={{ color: "var(--t3)" }}>PUB-ACC</span>
                      <span
                        className="rounded px-2 py-0.5 text-xs font-semibold"
                        style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                      >
                        Flagship
                      </span>
                    </div>
                    <h3 className="mb-3 text-lg font-bold" style={{ color: "var(--t)" }}>
                      Accuracy and Currency Review
                    </h3>
                    <p className="mb-5 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      Every source reference verified against the current authoritative version. Every citation cross-checked. Every regulatory reference traced to the correct source.
                      Findings graded Critical, Major, or Minor — with exact location and corrective recommendation. Works against Avidara&apos;s built-in source stacks or your own uploaded references.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Critical / Major / Minor grading", "Source cross-reference", "Built-in or custom sources", "Same-day turnaround"].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-3 py-0.5 text-xs"
                          style={{ borderColor: "rgba(217,119,6,.18)", color: "#fbbf24", backgroundColor: "rgba(217,119,6,.06)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    className="rounded-xl border p-5"
                    style={{ borderColor: "rgba(217,119,6,.15)", backgroundColor: "rgba(217,119,6,.06)" }}
                  >
                    <p className="mb-4 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                      What you receive
                    </p>
                    <div className="flex flex-col divide-y" style={{ borderColor: "var(--b)" }}>
                      {[
                        "Branded PDF accuracy report",
                        "Finding summary table with severities",
                        "Exact source reference per finding",
                        "Actionable corrective recommendations",
                        "Approved or Not Approved outcome",
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-3 py-3 text-sm first:pt-0 last:pb-0" style={{ color: "var(--t2)" }}>
                          <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 6 services grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {publishingServices.map((s) => (
                  <div
                    key={s.code}
                    className="card-hover rounded-xl border p-6"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div
                      className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg"
                      style={iconStyles[s.color]}
                    >
                      <ServiceIcon color={s.color} />
                    </div>
                    <span className="mb-2 block font-mono text-xs" style={{ color: "var(--t3)" }}>{s.code}</span>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{s.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border px-2.5 py-0.5 text-[11px]"
                          style={{ borderColor: "var(--b)", color: "var(--t3)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />

        {/* Verticals + bring-your-own-sources */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <div className="mb-12 grid gap-6 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                    <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                    Publishing Verticals
                  </p>
                  <h2
                    className="text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                  >
                    One engine. Every knowledge-intensive field.
                  </h2>
                </div>
                <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  Legal, medical, agricultural, and historical are all available now. The legal vertical includes a built-in curated source stack and serves as the worked example — every other vertical follows the same methodology.
                  Any publisher can also load their own sources.
                </p>
              </div>

              {/* Verticals grid */}
              <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {verticals.map((v) => (
                  <div
                    key={v.label}
                    className="rounded-xl border p-5"
                    style={{
                      borderColor: v.example ? "rgba(217,119,6,.22)" : "var(--b)",
                      backgroundColor: v.example ? "rgba(217,119,6,.05)" : "var(--surf)",
                    }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                      >
                        Available
                      </span>
                      {v.example && (
                        <span
                          className="rounded px-2 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: "rgba(217,119,6,.12)", color: "#d97706" }}
                        >
                          Worked example
                        </span>
                      )}
                    </div>
                    <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{v.label}</h3>
                    <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{v.body}</p>
                    <div className="flex flex-wrap gap-1">
                      {v.sources.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border px-2 py-0.5 text-[10px]"
                          style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--bg)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bring your own sources callout */}
              <div
                className="rounded-xl border p-6 lg:p-8"
                style={{ borderColor: "rgba(79,70,229,.18)", backgroundColor: "rgba(79,70,229,.04)" }}
              >
                <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.16)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                    </svg>
                  </div>
                  <div>
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold" style={{ color: "var(--t)" }}>Bring your own sources</h3>
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: "rgba(79,70,229,.1)", color: "var(--indigo-light)", border: "1px solid rgba(79,70,229,.18)" }}
                      >
                        Available for all verticals
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      No built-in source stack for your field? Upload your own authoritative references — style guides, primary sources, regulatory documents, institutional standards.
                      Avidara verifies your content against them with the same rigour it applies to its built-in source libraries.
                      The engine is universal. The sources are yours.
                    </p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <IndustryNudge current="Publishing" />
        <CTA industry="publishing" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
