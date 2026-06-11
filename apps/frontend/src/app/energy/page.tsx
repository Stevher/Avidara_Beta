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
  title: "Energy & IPP Regulatory Compliance Review | Avidara",
  description:
    "Independent compliance review for IPP bid documents, NERSA generation licence applications, grid-code documentation, and NEMA environmental authorisation packages. Covers REIPPPP, ERA, IFC Performance Standards, and pan-African energy markets.",
};

const demoConfig: DemoConfig = {
  documentName: "REIPPPP_BW6_SolarIPP_100MW.pdf",
  documentMeta: "12.4 MB · REIPPPP BW6 · ERA 4/2006 · Ready",
  checks: [
    "Environmental Authorisation stage",
    "Grid-connection agreement status",
    "Local content threshold compliance",
    "Financial model completeness",
    "Community ownership documentation",
    "Bid validity and security instrument",
    "IRP allocation compliance",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Environmental Authorisation not issued — Scoping Report stage insufficient for BW6 submission", loc: "Environmental section · EA documentation" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "No grid-connection agreement — Eskom Conditional Connection Agreement required at bid", loc: "Technical section · Grid-connection docs" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Local content commitment at 30% — BW6 threshold requires 40% local manufacturing value", loc: "Economic development section" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "SPV community beneficiary deed referenced but not attached to bid pack", loc: "Community ownership annexure" },
  ],
  outcome: "1 Critical · 2 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Environmental Authorisation gap",
    body: "REIPPPP Bid Window 6 requires an Environmental Authorisation to be in place at bid submission. A Scoping Report alone does not satisfy this requirement — without the EA, the bid is non-responsive and cannot proceed to financial evaluation.",
  },
  {
    code: "Major" as const,
    title: "Missing grid-connection agreement",
    body: "No Conditional Connection Agreement or equivalent commitment from Eskom or the relevant network operator is included. Grid-connection confirmation is a mandatory bid requirement — its absence disqualifies the bid regardless of the project's technical or financial quality.",
  },
  {
    code: "Major" as const,
    title: "Local content shortfall",
    body: "The bid commits to 30% local manufacturing content. BW6 requires a minimum of 40% — the 10% shortfall means the bid does not meet the economic development threshold and may be scored accordingly or disqualified.",
  },
  {
    code: "Minor" as const,
    title: "Beneficiary deed not attached",
    body: "The community ownership SPV structure is described and the beneficiary deed is referenced in the economic development narrative, but the deed itself is missing from the annexures. This is an administrative gap that will draw a clarification request.",
  },
];

export default function EnergyPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Energy · IPP · Renewable Generation"
          heading="Regulatory compliance"
          headingAccent="for energy projects."
          sub="From REIPPPP bid documents to NERSA generation licences and NEMA environmental authorisations, Avidara reviews energy project documentation against ERA 4/2006, NERSA licensing rules, grid-code requirements, and IFC Performance Standards — across South African and pan-African markets."
          accent="#0d9488"
          accentLight="#2dd4bf"
          accentDeep="#0f766e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="A bid without the right documents cannot proceed to evaluation."
          body1="Energy project compliance spans environmental authorisations, grid-connection agreements, generation licensing, local content thresholds, community ownership structures, financial close documentation, and IFC safeguards for DFI-financed projects. A missing document at bid submission is fatal — regardless of the quality of the project behind it."
          body2="Avidara reviews IPP bid packs, NERSA licence applications, and project compliance documentation against REIPPPP requirements, ERA licensing rules, grid-code standards, and IFC Performance Standards — across South African and pan-African energy markets."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Energy & IPP" />
        <CTA industry="energy" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
