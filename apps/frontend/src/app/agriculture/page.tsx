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
  title: "Agricultural Compliance & Export Documentation Review | Avidara",
  description:
    "Independent agrochemical label, export certification, and produce standards compliance review for South African agriculture. Act 36 registration, PPECB export compliance, and destination-market MRL review — before inspection or border rejection.",
};

const demoConfig: DemoConfig = {
  documentName: "AgroLabel_FolicureFlex_v4.pdf",
  documentMeta: "0.4 MB · Act 36 of 1947 · PPECB Ready",
  checks: [
    "Act 36 registration number format",
    "WHO hazard classification band",
    "Pre-harvest interval (PHI) by crop",
    "Target crop and pest scope",
    "Re-entry interval (REI)",
    "Environmental precautions",
    "Resistance management statement",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Pre-harvest interval absent for grapes — EU MRL breach risk at point of export", loc: "Application section · Grapes" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Registration number format invalid — L-prefix required for Act 36 agricultural remedies", loc: "Front panel · Registration details" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "WHO hazard classification band II — signal word 'CAUTION' used, must be 'WARNING'", loc: "Safety information panel" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Resistance management group code (FRAC) not stated — industry stewardship requirement", loc: "Application instructions" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Missing pre-harvest interval",
    body: "The pre-harvest interval for the grape crop is absent from the label. A missing PHI means the product may be applied too close to harvest, creating an MRL breach at EU port inspection — causing consignment rejection and potentially blacklisting the exporter.",
  },
  {
    code: "Critical" as const,
    title: "Invalid Act 36 registration format",
    body: "The registration number on the label does not conform to the Act 36 format. An incorrectly formatted registration number raises questions about product legality and can trigger a stop-sale order or recall.",
  },
  {
    code: "Major" as const,
    title: "Wrong hazard signal word",
    body: "The WHO hazard classification band requires the signal word 'WARNING' for Class II products. 'CAUTION' understates the hazard — a regulatory non-compliance that can result in product withdrawal.",
  },
  {
    code: "Minor" as const,
    title: "Missing resistance management code",
    body: "The FRAC resistance management group code is absent. While not strictly mandatory under Act 36, it is required by most export-market buyers and is standard practice for integrated pest management compliance.",
  },
];

export default function AgriculturePage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Agriculture · Agrochemicals · Export Compliance"
          heading="Compliance review"
          headingAccent="from field to export."
          sub="A single missing pre-harvest interval can strand an entire export consignment at the EU border. Avidara reviews agrochemical labels, produce grading documents, and PPECB export certification against Act 36, APS Act standards, and destination-market MRL requirements."
          accent="#3f6212"
          accentLight="#84cc16"
          accentDeep="#365314"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Export rejection starts with a label error."
          body1="Agricultural compliance spans Act 36 registration requirements, WHO hazard classification, pre-harvest intervals by crop and market, target-species declarations, withdrawal periods, and destination-market MRL compliance. A single error can stop a full consignment at the border — with no recourse once the shipment has left."
          body2="Avidara encodes the South African and export-market agricultural regulatory ruleset — Act 36, APS Act grading standards, PPECB protocols, and EU/UK/Codex MRL tables — and reviews every label and compliance document before it reaches inspection."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Agriculture" />
        <CTA industry="agriculture" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
