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
  title: "Legal Publishing Compliance Reviews | Avidara",
  description:
    "Independent compliance verification for legal publishers in South Africa. Case law cross-referencing, legislative revision tracking, SALRC reform pipeline monitoring, and content gap analysis — verified against authoritative sources.",
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
    title: "Repealed legislation cited as current",
    body: "A section amended by Act 12 of 2023 is cited as authoritative. The amendment repealed the provision entirely. Missed across three editorial reviews.",
  },
  {
    code: "Major" as const,
    title: "Landmark judgment not captured",
    body: "An SCA judgment directly reshaping Chapter 6 commentary was handed down after the previous edition. Not cross-referenced. Readers relying on this chapter are working with incomplete law.",
  },
  {
    code: "Major" as const,
    title: "CCMA procedural timeline superseded",
    body: "Recent CCMA rule amendments changed the applicable timeline. The published commentary still reflects the superseded procedure — creating real risk for practitioners following the guidance.",
  },
  {
    code: "Minor" as const,
    title: "Government Gazette reference discrepancy",
    body: "Regulation number cited in Appendix B does not match the Gazette version published after the cited amendment. A minor error that undermines source credibility.",
  },
];

const publishingServices = [
  {
    code: "PUB-CMP",
    color: "amb",
    title: "Document Comparison",
    body: "Track exactly what changed between editions — legislation, case law citations, and regulatory references. Every material change identified and documented.",
    tags: ["Edition comparison", "Change report", "Amendment tracking"],
  },
  {
    code: "PUB-LEG",
    color: "amb",
    title: "Legislative Revision",
    body: "Verify all statutory references against current consolidated acts. Flag repealed provisions, substitutions, and amendments before publication.",
    tags: ["Consolidated acts", "Repeal flags", "Amendment status"],
  },
  {
    code: "PUB-CASE",
    color: "ind",
    title: "Case Law Summarisation",
    body: "Extract, verify, and summarise relevant judgments from SAFLII and superior court databases. Keep your commentaries current and legally accurate.",
    tags: ["SAFLII cross-ref", "SCA / CC judgments", "CCMA decisions"],
  },
  {
    code: "PUB-GAP",
    color: "ind",
    title: "Content Gap Analysis",
    body: "Identify regulatory developments, legislative reforms, and significant judgments your current edition hasn't captured. Know what's missing before your readers notice.",
    tags: ["Coverage audit", "Gap report", "Priority list"],
  },
  {
    code: "PUB-REF",
    color: "amb",
    title: "Reform Pipeline",
    body: "Map upcoming SALRC recommendations, draft bills, and gazette notices against your publication's coverage. Anticipate changes before they become errors in print.",
    tags: ["SALRC watch", "Draft bills", "Gazette notices"],
  },
  {
    code: "PUB-XR",
    color: "ind",
    title: "Cross-Reference",
    body: "Verify every internal and external reference for accuracy. Eliminate circular citations, broken references, and outdated section numbers across your full publication.",
    tags: ["Reference audit", "Section number check", "Circular citations"],
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

export default function PublishingPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Legal Publishing · Regulatory Intelligence"
          heading="Publications your readers can stand behind."
          headingAccent="Verified against authoritative sources."
          sub="Avidara cross-references your legal publications against SALRC, SAFLII, the Government Gazette, Parliament, and CCMA — finding what internal review misses before your readers do."
          accent="#d97706"
          accentLight="#fbbf24"
          accentDeep="#92400e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Published errors are permanent, until reprinted."
          body1="Legal publishing teams work under relentless deadline pressure. Legislation amends without warning. Judgments hand down between editions. CCMA rules change. A cited section gets repealed. A landmark case reshapes an entire chapter — and your commentary doesn't yet know it exists."
          body2="Your editors know the law. What they need is an independent layer that tracks every authoritative source continuously — and tells them exactly where the publication diverges from current authority."
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
                          <path d="M3 6h18M3 12h18M3 18h18"/>
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
                      Every legislative citation verified against the current consolidated act. Every case law reference cross-checked against SAFLII and superior court databases.
                      Every regulatory reference traced to the correct Gazette. Findings graded Critical, Major, or Minor — with exact location and corrective recommendation.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Critical / Major / Minor grading", "Source cross-reference", "Gazette verified", "Same-day turnaround"].map((tag) => (
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

        {/* Coming soon verticals */}
        <section className="px-6 py-16" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: "var(--t3)" }} />
                Expanding Publishing Coverage
              </p>
              <h2
                className="mb-4 text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Legal Publishing is live. More verticals are coming.
              </h2>
              <p className="mb-10 max-w-2xl text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                The same verification methodology — sources, citations, currency — applies across every
                publishing vertical where accuracy matters and errors have consequences.
              </p>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  className="rounded-xl border p-6"
                  style={{ borderColor: "rgba(217,119,6,.22)", backgroundColor: "rgba(217,119,6,.05)" }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="flex h-9 w-9 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(217,119,6,.09)", color: "#d97706", border: "1.5px solid rgba(217,119,6,.16)" }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                      </svg>
                    </div>
                    <span
                      className="rounded px-2 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: "rgba(217,119,6,.12)", color: "#d97706" }}
                    >
                      Active
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-bold" style={{ color: "var(--t)" }}>Legal Publishing</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
                    Legislation, case law, CCMA rules, SALRC reform pipeline — fully live.
                  </p>
                </div>

                {[
                  {
                    title: "Medical Publishing",
                    body: "Clinical guidelines, drug references, and treatment protocols verified against SAHPRA, current literature, and international standards.",
                  },
                  {
                    title: "Agricultural Publishing",
                    body: "Pest management guides, chemical registrations, and agri-regulatory references verified against DAFF, CLP, and current label approvals.",
                  },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="rounded-xl border p-6"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div className="mb-3 flex items-center gap-2">
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "var(--bg2)", color: "var(--t3)", border: "1.5px solid var(--b)" }}
                      >
                        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                      </div>
                      <span
                        className="rounded px-2 py-0.5 text-[11px] font-semibold"
                        style={{ backgroundColor: "var(--bg2)", color: "var(--t3)", border: "1px solid var(--b)" }}
                      >
                        Coming soon
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold" style={{ color: "var(--t)" }}>{v.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{v.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <IndustryNudge current="Legal Publishing" />
        <CTA industry="publishing" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
