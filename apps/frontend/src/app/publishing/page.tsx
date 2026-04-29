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
    "Independent accuracy verification for legal and medical publishers. Verify publications against authoritative sources — legislation, case law, clinical guidelines, and regulatory standards. Inaccuracies, outdated references, and content gaps surfaced before publication.",
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

const legalServices = [
  { code: "PUB-L-CMP", title: "Document Comparison",      body: "Track exactly what changed between editions. Every material amendment, substitution, and repeal identified and documented with a structured change report." },
  { code: "PUB-L-LEG", title: "Legislative Revision",      body: "Verify all statutory references against the current consolidated act. Flag repealed provisions, amendments, and substitutions before publication." },
  { code: "PUB-L-CASE", title: "Case Law Summarisation",   body: "Extract and verify relevant judgments from SAFLII and superior court databases. Keep commentaries current, accurate, and complete." },
  { code: "PUB-L-GAP",  title: "Content Gap Analysis",     body: "Identify legislative reforms, regulatory developments, and significant judgments your current edition hasn't captured — before your readers notice." },
  { code: "PUB-L-REF",  title: "Reform Pipeline",          body: "Map upcoming SALRC recommendations, draft bills, and gazette notices against your publication's existing coverage. Anticipate before they become errors." },
  { code: "PUB-L-XR",   title: "Regulatory Cross-Reference", body: "Verify every internal and external reference for accuracy. Eliminate circular citations, broken references, and outdated section numbers." },
];

const medicalServices = [
  { code: "PUB-M-MAN", title: "Manuscript Review",         body: "Full scientific manuscript reviewed against journal submission requirements, clinical accuracy standards, and applicable regulatory guidelines." },
  { code: "PUB-M-CSR", title: "Clinical Study Report",     body: "ICH E3-structured CSRs reviewed for completeness, statistical accuracy, and regulatory submission readiness before filing." },
  { code: "PUB-M-PAT", title: "Patient Summary",           body: "Plain-language patient summaries verified against source clinical data for accuracy, completeness, and plain-language compliance standards." },
  { code: "PUB-M-REG", title: "Regulatory Writing",        body: "CTD modules, briefing documents, and regulatory submissions reviewed for structure, completeness, and submission readiness." },
  { code: "PUB-M-SOP", title: "SOP / Protocol Review",     body: "Standard operating procedures and clinical protocols reviewed against GCP, GMP, and institutional requirements for compliance and accuracy." },
  { code: "PUB-M-EDU", title: "Medical Education",         body: "CME materials and medical education content verified for clinical accuracy, guideline alignment, and appropriate source referencing." },
];

const legalSources  = ["SALRC", "SAFLII", "Government Gazette", "Parliament", "CCMA"];
const medicalSources = ["ICH E3", "SAHPRA", "GCP / GMP", "Clinical guidelines", "Journal standards"];

export default function PublishingPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Publishing · Compliance Intelligence"
          heading="Keep your publications authoritative."
          headingAccent="Verified against the sources that matter."
          sub="In law and medicine, published errors have real consequences for the people relying on them. Avidara verifies your content against authoritative reference sources — surfacing inaccuracies, outdated references, and content gaps before your readers find them."
          accent="#d97706"
          accentLight="#fbbf24"
          accentDeep="#92400e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Published content goes stale. Gaps creep in. Credibility erodes."
          body1="Publishing teams work under deadline pressure. Legislation amends without warning. Judgments hand down between editions. Clinical guidelines get revised. A cited provision gets repealed. A landmark case reshapes an entire chapter — and your publication doesn't yet know it exists."
          body2="Your editors know the subject. What they need is an independent layer that tracks every authoritative source continuously — and tells them exactly where the publication diverges from current authority."
          findings={publishingFindings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />

        {/* Vertical selector */}
        <section id="services" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Publishing Verticals
              </p>
              <div className="grid gap-4 sm:grid-cols-[1.2fr_1fr] sm:items-end">
                <h2
                  className="text-4xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  Two verticals. One engine.
                </h2>
                <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  Legal and Medical Publishing are both live — each with a dedicated service set and built-in source stack. The same methodology, the same output format, the same rigour.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-6 lg:grid-cols-2">

                {/* Legal Publishing */}
                <div
                  className="flex flex-col overflow-hidden rounded-2xl border"
                  style={{ borderColor: "rgba(217,119,6,.25)", backgroundColor: "var(--surf)" }}
                >
                  {/* Accent bar */}
                  <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #d97706, #fbbf24)" }} />

                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-5">
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                        >
                          Active
                        </span>
                        <span
                          className="rounded px-2 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: "rgba(217,119,6,.12)", color: "#d97706" }}
                        >
                          Worked example
                        </span>
                      </div>
                      <div className="mb-1 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: "rgba(217,119,6,.09)", color: "#d97706", border: "1.5px solid rgba(217,119,6,.18)" }}
                        >
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "var(--t)" }}>Legal Publishing</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                        Legislation, case law, CCMA rules, and SALRC reform pipeline — every reference verified against authoritative South African legal sources.
                      </p>
                    </div>

                    {/* Sources */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {legalSources.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border px-2.5 py-0.5 text-[11px]"
                          style={{ borderColor: "rgba(217,119,6,.2)", color: "#d97706", backgroundColor: "rgba(217,119,6,.06)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Services */}
                    <div
                      className="flex flex-1 flex-col divide-y"
                      style={{ borderColor: "var(--b)" }}
                    >
                      {legalServices.map((s) => (
                        <div key={s.code} className="flex gap-3 py-3.5 first:pt-0">
                          <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <div>
                            <p className="mb-0.5 text-sm font-semibold" style={{ color: "var(--t)" }}>{s.title}</p>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Output note */}
                    <div
                      className="mt-5 rounded-lg border px-4 py-3 text-xs leading-relaxed"
                      style={{ borderColor: "rgba(217,119,6,.15)", backgroundColor: "rgba(217,119,6,.04)", color: "var(--t2)" }}
                    >
                      Delivered as a <strong style={{ color: "var(--t)" }}>branded PDF report</strong> or as a <strong style={{ color: "var(--t)" }}>Word document with tracked changes</strong> in your manuscript.
                    </div>
                  </div>
                </div>

                {/* Medical Publishing */}
                <div
                  className="flex flex-col overflow-hidden rounded-2xl border"
                  style={{ borderColor: "rgba(124,58,237,.25)", backgroundColor: "var(--surf)" }}
                >
                  {/* Accent bar */}
                  <div className="h-[3px]" style={{ background: "linear-gradient(90deg, #7c3aed, #a78bfa)" }} />

                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    {/* Header */}
                    <div className="mb-5">
                      <div className="mb-3 flex items-center gap-2">
                        <span
                          className="rounded px-2 py-0.5 text-[11px] font-semibold"
                          style={{ backgroundColor: "rgba(16,185,129,.12)", color: "var(--emerald)" }}
                        >
                          Active
                        </span>
                      </div>
                      <div className="mb-1 flex items-center gap-3">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: "rgba(124,58,237,.09)", color: "#7c3aed", border: "1.5px solid rgba(124,58,237,.18)" }}
                        >
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            <path d="M12 12v4m-2-2h4"/>
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold" style={{ color: "var(--t)" }}>Medical Publishing</h3>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                        Manuscripts, CSRs, patient summaries, SOPs, and medical education content verified against ICH standards, SAHPRA requirements, and clinical guidelines.
                      </p>
                    </div>

                    {/* Sources */}
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {medicalSources.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border px-2.5 py-0.5 text-[11px]"
                          style={{ borderColor: "rgba(124,58,237,.2)", color: "#7c3aed", backgroundColor: "rgba(124,58,237,.06)" }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    {/* Services */}
                    <div
                      className="flex flex-1 flex-col divide-y"
                      style={{ borderColor: "var(--b)" }}
                    >
                      {medicalServices.map((s) => (
                        <div key={s.code} className="flex gap-3 py-3.5 first:pt-0">
                          <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                          <div>
                            <p className="mb-0.5 text-sm font-semibold" style={{ color: "var(--t)" }}>{s.title}</p>
                            <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Output note */}
                    <div
                      className="mt-5 rounded-lg border px-4 py-3 text-xs leading-relaxed"
                      style={{ borderColor: "rgba(124,58,237,.15)", backgroundColor: "rgba(124,58,237,.04)", color: "var(--t2)" }}
                    >
                      Delivered as a <strong style={{ color: "var(--t)" }}>branded PDF report</strong> or as a <strong style={{ color: "var(--t)" }}>Word document with tracked changes</strong> in your manuscript.
                    </div>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />

        {/* Coming soon + bring your own */}
        <section className="px-6 py-16" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: "var(--t3)" }} />
                Expanding Coverage
              </p>
              <h2
                className="mb-10 text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                More verticals. More sources. Same engine.
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Agricultural — coming soon */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="rounded px-2 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: "var(--bg2)", color: "var(--t3)", border: "1px solid var(--b)" }}
                    >
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>Agricultural Publishing</h3>
                  <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--t3)" }}>
                    Pest management guides, chemical registrations, and agri-regulatory references verified against DAFF and current label approvals.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["DAFF", "Chemical registrations", "Label approvals"].map((s) => (
                      <span key={s} className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--bg)" }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Historical — coming soon */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="rounded px-2 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: "var(--bg2)", color: "var(--t3)", border: "1px solid var(--b)" }}
                    >
                      Coming soon
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>Historical Publishing</h3>
                  <p className="mb-3 text-xs leading-relaxed" style={{ color: "var(--t3)" }}>
                    Archival accuracy, primary source verification, and factual cross-referencing across historical records and established scholarship.
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {["Primary sources", "Archival records", "Published scholarship"].map((s) => (
                      <span key={s} className="rounded-full border px-2 py-0.5 text-[10px]" style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--bg)" }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Bring your own */}
                <div
                  className="rounded-xl border p-5"
                  style={{ borderColor: "rgba(79,70,229,.18)", backgroundColor: "rgba(79,70,229,.04)" }}
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ backgroundColor: "rgba(79,70,229,.09)", color: "var(--indigo)", border: "1.5px solid rgba(79,70,229,.16)" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                    </div>
                    <span
                      className="rounded px-2 py-0.5 text-[11px] font-semibold"
                      style={{ backgroundColor: "rgba(79,70,229,.1)", color: "var(--indigo-light)", border: "1px solid rgba(79,70,229,.18)" }}
                    >
                      All verticals
                    </span>
                  </div>
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>Bring your own sources</h3>
                  <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>
                    No built-in stack for your field? Upload your own authoritative references. Avidara verifies your content against them with the same rigour it applies to its built-in libraries. The engine is universal. The sources are yours.
                  </p>
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
