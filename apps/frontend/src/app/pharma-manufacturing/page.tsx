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
  title: "GMP Compliance Review for Batch Manufacturing | Avidara",
  description:
    "Independent GMP compliance review for South African pharmaceutical manufacturers and CMOs. Batch manufacturing records, validation protocols, deviations, and CAPA documentation reviewed against SAHPRA's GMP guideline, PIC/S, and the Medicines and Related Substances Act 101 of 1965 - before your next inspection.",
  alternates: { canonical: "https://www.avidara.co.za/pharma-manufacturing" },
};

const demoConfig: DemoConfig = {
  documentName: "BMR_Amoxicillin500mg_Batch24-118.pdf",
  documentMeta: "1.2 MB · SAHPRA GMP · Review Ready",
  checks: [
    "Batch record completeness",
    "Deviation documentation and closure",
    "In-process control results vs. specification",
    "Equipment qualification and cleaning status",
    "Signature and date verification",
    "Yield reconciliation",
    "CAPA cross-reference",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Batch disposed to release with an open deviation - no CAPA reference on file", loc: "Section 6 · Deviation log" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "In-process pH result outside validated range - no documented investigation", loc: "Section 4 · In-process controls" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "No cleaning verification record for shared line before product changeover", loc: "Section 3 · Equipment log" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Operator initials undated on two processing steps", loc: "Section 2 · Processing steps" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Batch released with an open deviation",
    body: "The batch was dispositioned for release while a recorded deviation remained open, with no CAPA reference linking it to a closed investigation. SAHPRA's GMP guideline requires deviations to be investigated and closed, with impact on product quality assessed, before disposition - releasing ahead of closure is a direct finding.",
  },
  {
    code: "Critical" as const,
    title: "Undocumented out-of-specification result",
    body: "An in-process pH reading fell outside the validated range with no documented investigation or justification attached to the batch record. Under PIC/S GMP expectations, any out-of-specification result requires a recorded investigation before the batch can proceed - the absence of one leaves the result unexplained and the batch's status unresolved.",
  },
  {
    code: "Major" as const,
    title: "Missing cleaning verification",
    body: "No cleaning verification record was on file for a shared manufacturing line ahead of a product changeover. Without it, there is no documented evidence that cross-contamination risk was controlled between products - a gap a SAHPRA GMP inspector would flag on sight.",
  },
  {
    code: "Minor" as const,
    title: "Incomplete signature trail",
    body: "Operator initials on two processing steps were not dated. Good documentation practice requires every entry to be attributable and time-stamped - an undated initial breaks the record's audit trail even when the step itself was performed correctly.",
  },
];

export default function PharmaManufacturingPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Pharma Manufacturing · GMP"
          heading="GMP compliance review"
          headingAccent="for every batch record."
          sub="SAHPRA GMP inspections leave no room for unresolved deviations or undocumented out-of-specification results. Avidara reviews batch manufacturing records, validation protocols, and quality management system documentation against SAHPRA's GMP guideline and PIC/S requirements, before your next inspection."
          accent="#475569"
          accentLight="#94a3b8"
          accentDeep="#334155"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Batch records don't fail at the inspection. They fail long before it."
          body1="GMP compliance runs through batch manufacturing records, process and cleaning validation protocols, equipment qualification, deviation and CAPA management, and the quality management system that ties them together. An open deviation, an unexplained out-of-specification result, or a missing cleaning verification record is a finding waiting to surface - whether it's caught internally or by a SAHPRA inspector."
          body2="Avidara reviews your BMRs, validation master plans, deviation and CAPA records, and QMS documentation against SAHPRA's GMP guideline, the PIC/S GMP Guide, and the Medicines and Related Substances Act 101 of 1965 - before your next inspection or as part of ongoing QMS maintenance."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Pharma Manufacturing" />
        <CTA industry="pharma-manufacturing" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
