import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo, { type DemoConfig } from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal & Employment Compliance Intelligence — LRA, BCEA & NMW | Avidara",
  description:
    "Independent review for labour law practitioners, HR teams, and labour consultants. Collective agreements, employment contracts, and policies reviewed against the LRA, BCEA, and National Minimum Wage Act — plus litigation support and general legal document analysis.",
  alternates: { canonical: "https://www.avidara.co.za/legal" },
};

const demoConfig: DemoConfig = {
  documentName: "NUMSA_MEIBC_CollectiveAgreement_2026.pdf",
  documentMeta: "2.1 MB · LRA · BCEA · National Minimum Wage Act · Ready",
  checks: [
    "Wage rates checked against current NMW (R27.58/hr)",
    "BCEA minimum conditions verified",
    "LRA procedural compliance",
    "Sectoral determination alignment",
    "Non-compliant clause detection",
    "Conflict with updated legislation",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Minimum wage clause below current NMW of R27.58/hr", loc: "Clause 7.2 · Wage schedule · NMW Act s4" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "Overtime provision conflicts with BCEA s10 daily limits", loc: "Clause 11.3 · Working time · BCEA s10" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Retrenchment procedure omits LRA s189A consultation steps", loc: "Clause 19 · Termination · LRA s189A" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Leave clause cites repealed BCEA threshold", loc: "Clause 14 · Annual leave · Regulatory reference" },
  ],
  outcome: "1 Critical · 2 Major · 1 Minor",
};

const legalFindings = [
  {
    code: "Critical" as const,
    title: "Wage rate below statutory minimum",
    body: "A wage schedule sets a rate below the current National Minimum Wage of R27.58/hr. A critical exposure that invalidates the clause and risks CCMA referral — missed in manual review.",
  },
  {
    code: "Major" as const,
    title: "Working-time clause breaches BCEA",
    body: "An overtime provision exceeds the daily and weekly limits set by the Basic Conditions of Employment Act. Enforceable as drafted, it places the employer in breach from day one.",
  },
  {
    code: "Major" as const,
    title: "Retrenchment procedure incomplete",
    body: "The termination clause omits mandatory LRA s189A consultation steps. A procedural gap that renders a large-scale retrenchment vulnerable to challenge as automatically unfair.",
  },
  {
    code: "Minor" as const,
    title: "Outdated legislative reference",
    body: "A leave clause cites a repealed BCEA threshold. Minor in isolation — but a signal the agreement has not been reviewed against current legislation.",
  },
];

const documentTypes = [
  {
    title: "Collective Agreement",
    body: "The flagship labour document. Avidara checks every wage rate against the current National Minimum Wage, verifies working-time and leave provisions against the BCEA, confirms LRA procedural compliance, and flags any clause that conflicts with updated legislation or applicable sectoral determinations.",
    tags: ["LRA", "BCEA", "NMW Act"],
    flagship: true,
  },
  {
    title: "Employment Contract",
    body: "Individual contracts of employment carry the same statutory floor as collective agreements. Avidara verifies minimum conditions, wage compliance, restraint and termination clauses, and consistency with the BCEA and any governing sectoral determination.",
    tags: ["BCEA minimums", "NMW compliance", "Clause review"],
    flagship: false,
  },
  {
    title: "Workplace Policy & Handbook",
    body: "Disciplinary codes, grievance procedures, and HR policies must align with the LRA and the Code of Good Practice. Avidara reviews the full set for procedural fairness, internal consistency, and conflict with current labour legislation.",
    tags: ["LRA codes", "Procedural fairness", "Consistency check"],
    flagship: false,
  },
  {
    title: "Sectoral Determination Check",
    body: "Many sectors carry their own prescribed minimums above the national floor. Avidara checks agreements and contracts against the applicable sectoral determination — wages, hours, and conditions — so nothing falls below the binding standard.",
    tags: ["Sectoral determination", "Wage schedules", "Sector minimums"],
    flagship: false,
  },
  {
    title: "Litigation Support",
    body: "Preparing for the CCMA, Labour Court, or a bargaining-council dispute? Avidara analyses the documents in issue against the governing legislation, surfacing the compliance gaps and procedural defects that matter to the case.",
    tags: ["CCMA prep", "Labour Court", "Gap analysis"],
    flagship: false,
  },
  {
    title: "General Legal Documents",
    body: "Commercial contracts, service agreements, and supplier terms. Avidara cross-references obligations, surfaces internal inconsistencies, and checks clauses against the relevant legal framework before the document is signed.",
    tags: ["Contract review", "Internal consistency", "Clause analysis"],
    flagship: false,
  },
];

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Legal · Employment · Contracts · Litigation"
          heading="Compliance intelligence for legal & labour."
          headingAccent="Before your agreement is signed or filed."
          sub="The LRA, BCEA, and National Minimum Wage Act encoded and applied to every document you produce — collective agreements, employment contracts, workplace policies, and the documents at issue in a dispute."
          accent="#7c3aed"
          accentLight="#a78bfa"
          accentDeep="#6d28d9"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Every agreement you draft carries statutory exposure."
          body1="Labour practitioners, HR teams, and labour consultants produce a constant stream of binding documents — collective agreements, contracts of employment, disciplinary codes, retrenchment notices. Each one must sit above the statutory floor set by the LRA, BCEA, and National Minimum Wage Act, and align with any applicable sectoral determination. Manual review checks whether the process was followed; it rarely verifies, line by line, whether every clause meets the current legal standard."
          body2="That is the gap. Avidara encodes the applicable ruleset — LRA, BCEA, NMW Act, and sectoral determinations — and applies it to your documents before they are signed, filed, or relied on in a dispute."
          findings={legalFindings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />

        {/* Documents Avidara reviews */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <div className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#a78bfa" }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: "#a78bfa" }} />
                Documents we review
              </p>
              <h2
                className="mb-3 text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Every document type. One methodology.
              </h2>
              <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                The same structured finding report — graded Critical, Major, or Minor — regardless of document type. The ruleset changes. The rigour does not.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {documentTypes.map((doc) => (
                <div
                  key={doc.title}
                  className="flex flex-col rounded-xl border p-6"
                  style={{
                    borderColor: doc.flagship ? "rgba(124,58,237,.25)" : "var(--b)",
                    backgroundColor: doc.flagship ? "rgba(124,58,237,.04)" : "var(--surf)",
                  }}
                >
                  {doc.flagship && (
                    <span
                      className="mb-3 inline-flex w-fit rounded px-2 py-0.5 text-xs font-semibold"
                      style={{ backgroundColor: "rgba(167,139,250,.12)", color: "#a78bfa" }}
                    >
                      Highest frequency
                    </span>
                  )}
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{doc.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{doc.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {doc.tags.map((tag) => (
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
          </div>
        </section>

        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Legal" />
        <CTA industry="legal" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
