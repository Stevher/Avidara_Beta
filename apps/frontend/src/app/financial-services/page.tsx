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
  title: "Financial Services Compliance Intelligence — FAIS, CoFI & FSCA | Avidara",
  description:
    "Independent compliance review for South African financial advisers and asset managers. Records of advice, minimum disclosure documents, fair conduct programmes, and client communications reviewed against FAIS, CoFI, and FSCA requirements.",
};

const demoConfig: DemoConfig = {
  documentName: "Momentum_WM_ROA_ClientJ_v2.pdf",
  documentMeta: "1.4 MB · FAIS General Code · CoFI Conduct Standards · Ready",
  checks: [
    "Mandatory FAIS disclosures verified",
    "Recommendation vs needs analysis alignment",
    "Conflict of interest disclosure check",
    "Risk profile documentation",
    "Return claim accuracy",
    "CoFI fair conduct obligations",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Recommendation not supported by stated needs analysis", loc: "Section 3 · Recommendation · FAIS Code s8(1)(c)" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "Conflict of interest disclosure absent — adviser holds product provider shares", loc: "Section 1 · Disclosures · FAIS Code s3(1)(b)" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Performance claim not aligned to ASISA prescribed methodology", loc: "Section 4 · Product comparison · ASISA Std" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Board Notice reference — BN 80/2003 cited vs current BN 58/2010", loc: "Section 1 · Regulatory reference" },
  ],
  outcome: "1 Critical · 2 Major · 1 Minor",
};

const fsFindings = [
  {
    code: "Critical" as const,
    title: "Unsupported recommendation",
    body: "ROA recommends a product the stated needs analysis does not support. A critical FAIS exposure under s8(1)(c) — missed across two internal reviews.",
  },
  {
    code: "Major" as const,
    title: "Conflict of interest undisclosed",
    body: "The adviser holds shares in the product provider. No disclosure made. A mandatory FAIS requirement, absent entirely.",
  },
  {
    code: "Major" as const,
    title: "Non-compliant performance claim",
    body: "Return figure quoted using a methodology not aligned to the ASISA standard. Distributed to over 3,000 clients before the error surfaced.",
  },
  {
    code: "Minor" as const,
    title: "Outdated regulatory reference",
    body: "Document cites a superseded Board Notice. Minor in isolation — but signals the document has not been reviewed against current requirements.",
  },
];

const documentTypes = [
  {
    title: "Record of Advice (ROA)",
    body: "The most frequent high-risk document in the advice industry. Avidara verifies mandatory FAIS disclosures are present, the recommendation is supported by the stated needs analysis, conflicts of interest are disclosed, and all product information is accurate.",
    tags: ["FAIS General Code", "s8(1) compliance", "Recommendation support"],
    flagship: true,
  },
  {
    title: "Minimum Disclosure Document (MDD)",
    body: "ASISA and CISCA prescribe the content of MDDs for collective investment schemes. Avidara checks completeness, accuracy of performance figures, risk disclosures, and benchmark representation against the prescribed standard.",
    tags: ["ASISA standard", "CISCA", "Performance claims"],
    flagship: false,
  },
  {
    title: "Fair Conduct Programme",
    body: "CoFI requires institutions to design, maintain, and evidence fair conduct programmes. Avidara reviews the FCP against CoFI obligations — identifying which requirements are addressed, partially addressed, or absent — before the FSCA sees it.",
    tags: ["CoFI Act", "FSCA requirements", "Gap analysis"],
    flagship: false,
  },
  {
    title: "Target Market Determination (TMD)",
    body: "CoFI requires TMDs to be accurate and evidenced. Avidara assesses internal consistency and whether stated target market criteria are actually reflected in the product documentation.",
    tags: ["CoFI Act", "Product governance", "Consistency check"],
    flagship: false,
  },
  {
    title: "Replacement Advice",
    body: "A high-risk document with mandatory comparison and disclosure requirements. Avidara identifies every gap against the prescribed standard before the document reaches a client.",
    tags: ["FAIS replacement", "Mandatory comparisons", "Disclosure checklist"],
    flagship: false,
  },
  {
    title: "Client Communications & Marketing",
    body: "Investment return claims, product promotions, and market commentary sent to clients. CoFI’s fair promotion rules apply. Avidara reviews accuracy, completeness, and compliance before distribution.",
    tags: ["CoFI fair promotion", "Return claims", "Client-facing"],
    flagship: false,
  },
];

export default function FinancialServicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Financial Services · Advice & Asset Management"
          heading="Compliance intelligence for financial services."
          headingAccent="Before your documents reach a client."
          sub="FAIS, CoFI, and FSCA requirements encoded and applied to every document you produce — records of advice, disclosure documents, fair conduct programmes, and marketing material."
          accent="#7c3aed"
          accentLight="#a78bfa"
          accentDeep="#5b21b6"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Every document you produce carries regulatory exposure."
          body1="Financial advisers and asset managers produce a continuous stream of client-facing documents — records of advice, replacement justifications, minimum disclosure documents, promotional material. Every one carries FAIS and CoFI exposure. Most practices rely on internal review or outsourced compliance functions that check whether the process was followed. Neither consistently verifies whether the document itself meets the regulatory standard in content."
          body2="That is the gap. Avidara encodes the applicable regulatory ruleset — FAIS General Code, CoFI conduct standards, FSCA requirements — and applies it to your documents before they reach a client or a regulator."
          findings={fsFindings}
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
        <IndustryNudge current="Financial Services" />
        <CTA industry="financial-services" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
