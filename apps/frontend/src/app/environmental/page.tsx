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
  title: "Environmental Authorisation Compliance Review | Avidara",
  description:
    "Independent review of EIA reports, water use licence applications, and waste management licence documentation against NEMA and its specific environmental management acts - before submission to the authorities.",
};

const demoConfig: DemoConfig = {
  documentName: "EIA_Report_QuarryExtension_Draft.pdf",
  documentMeta: "4.1 MB · NEMA EIA Regulations · Review Ready",
  checks: [
    "Scope of assessment against activity listing",
    "Public participation process completeness",
    "Specialist study coverage and gaps",
    "Environmental management programme (EMPr) alignment",
    "Water use licence trigger identification",
    "Waste classification and licensing requirements",
    "Conditions of authorisation traceability",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Listed water use activity not identified - no water use licence application lodged with the responsible authority", loc: "Impact assessment · Water resources section" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Public participation record missing proof of registered interested and affected party notification for two adjoining landowners", loc: "Public participation · I&AP register" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Environmental management programme lacks monitoring frequency for identified dust and noise impacts", loc: "EMPr · Mitigation and monitoring measures" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Waste stream classification not cross-referenced against NEM:WA licensing category thresholds", loc: "Waste management section · Classification table" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Unidentified water use licence trigger",
    body: "The EIA report describes activities that constitute a listed water use under the National Water Act, but no water use licence application has been lodged. Proceeding to authorisation without addressing this trigger creates a direct compliance gap the responsible authority is likely to flag.",
  },
  {
    code: "Critical" as const,
    title: "Incomplete public participation record",
    body: "Proof of notification is missing for registered interested and affected parties, including adjoining landowners. NEMA's public participation requirements are a procedural cornerstone of a valid environmental authorisation - gaps here expose the authorisation to review or appeal.",
  },
  {
    code: "Major" as const,
    title: "Insufficient monitoring detail in the EMPr",
    body: "The environmental management programme identifies dust and noise impacts but does not specify monitoring frequency or thresholds for corrective action. Without measurable commitments, the EMPr cannot demonstrate ongoing compliance once authorisation is granted.",
  },
  {
    code: "Minor" as const,
    title: "Waste classification not cross-referenced",
    body: "The waste streams described in the application are not mapped against NEM:WA licensing category thresholds. This gap makes it difficult to confirm whether the correct waste management licence category has been applied for.",
  },
];

export default function EnvironmentalPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Environmental · NEMA · EIA · Water & Waste Licensing"
          heading="Compliance review"
          headingAccent="for environmental authorisation."
          sub="Environmental authorisation documentation is procedurally unforgiving - a gap in public participation, a missed water use trigger, or an incomplete EMPr can derail a project timeline. Avidara reviews EIA reports, water use licence applications, and waste management licence documentation against NEMA and its specific environmental management acts before you submit."
          accent="#15803d"
          accentLight="#86efac"
          accentDeep="#166534"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Environmental authorisation gaps surface late - and they cost time."
          body1="An EIA report, water use licence application, or waste management licence submission draws on multiple specialist studies, a public participation record, and an environmental management programme that all have to align with each other and with the requirements of the National Environmental Management Act and its specific environmental management acts. A gap in any one of these can trigger a request for further information, an appeal, or a delayed decision."
          body2="Avidara reviews your environmental authorisation documentation against NEMA, the NEM: Waste Act, and the National Water Act before it reaches the Department of Forestry, Fisheries and the Environment, a provincial environmental department, or a compliance audit."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Environmental" />
        <CTA industry="environmental" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
