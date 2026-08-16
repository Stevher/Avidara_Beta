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
  title: "Pharmacovigilance & Safety Reporting Review | Avidara",
  description:
    "Independent pharmacovigilance documentation review for pharma companies and MAHs in South Africa. ICSRs, PSURs, and Risk Management Plans checked against SAHPRA and ICH E2 requirements - before submission.",
};

const demoConfig: DemoConfig = {
  documentName: "PSUR_Amlorex_ReportingInterval-04.pdf",
  documentMeta: "3.1 MB · ICH E2C(R2) · Review Ready",
  checks: [
    "Reference safety information consistency",
    "ICSR case narrative completeness",
    "Signal detection methodology",
    "Cumulative exposure data reconciliation",
    "Risk minimisation measure status",
    "Benefit-risk conclusion alignment",
    "Line listing and summary tabulation match",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Reference Safety Information out of date - PSUR assessed against superseded core data sheet", loc: "Section 5 · Reference information" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Signal under evaluation not disclosed in PSUR narrative", loc: "Section 16 · Safety signals" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Cumulative case count in narrative does not match line listing total", loc: "Section 12 · Cumulative summary" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Risk minimisation measure status not updated for one market", loc: "Section 17 · RMP annex" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Outdated reference safety information",
    body: "The PSUR's safety assessment is benchmarked against a superseded core data sheet rather than the current Reference Safety Information. Every listedness determination in the report is built on the wrong reference point, which undermines the entire signal evaluation.",
  },
  {
    code: "Critical" as const,
    title: "Undisclosed safety signal",
    body: "A signal already under evaluation elsewhere in the safety system does not appear in the PSUR's signal section. Omitting a known signal from the periodic report is a direct pharmacovigilance compliance gap, not a documentation oversight.",
  },
  {
    code: "Major" as const,
    title: "Case count mismatch",
    body: "The cumulative case total stated in the narrative summary does not reconcile with the underlying line listing. Reviewers and regulators rely on this figure to gauge exposure and reporting rate - an unreconciled mismatch undermines the report's credibility.",
  },
  {
    code: "Minor" as const,
    title: "Incomplete RMP status update",
    body: "The Risk Management Plan annex has not been updated to reflect the current status of a risk minimisation measure in one market. A small gap on its own, but one that compounds if it recurs across reporting cycles.",
  },
];

export default function PharmacovigilancePage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Pharmacovigilance · Safety Reporting · PSUR · Risk Management"
          heading="Safety reporting"
          headingAccent="checked before it's submitted."
          sub="Individual case safety reports, PSURs, and Risk Management Plans carry direct regulatory exposure. Avidara reviews your pharmacovigilance documentation against SAHPRA's requirements and the ICH E2 series - before it reaches a regulator or a periodic deadline."
          accent="#b45309"
          accentLight="#fbbf24"
          accentDeep="#92400e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="A gap in a safety report is not a formatting issue."
          body1="Pharmacovigilance teams work under continuous reporting pressure - individual case safety reports on tight clocks, PSUR narratives that must reconcile against line listings and reference safety information, and Risk Management Plans that need to stay current across every market a product is sold in. A missed signal, an unreconciled case count, or a stale reference data sheet does not surface until a regulator asks about it."
          body2="Avidara reviews your ICSRs, PSURs, and RMP documentation against SAHPRA's pharmacovigilance guideline and the ICH E2 series - E2A definitions, E2B reporting format, E2C PSUR structure - so inconsistencies are caught before submission, not after."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Pharmacovigilance" />
        <CTA industry="pharmacovigilance" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
