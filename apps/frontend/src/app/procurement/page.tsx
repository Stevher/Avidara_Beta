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
  title: "Public Procurement & Tender Compliance Review | Avidara",
  description:
    "Independent bid-document and tender compliance review for South African procurement. Verify bid responsiveness, B-BBEE certificates, SBD returnable forms, and SCM contract compliance against PPA 2024, PPPFA Regulations, and National Treasury requirements.",
};

const demoConfig: DemoConfig = {
  documentName: "ProcurementBid_DHET_2024_0234.pdf",
  documentMeta: "2.4 MB · PPA 2024 · R2.8m Value · Ready",
  checks: [
    "SBD returnable forms completeness",
    "Tax compliance status (SARS PIN)",
    "B-BBEE certificate validity",
    "Pricing schedule arithmetic",
    "CSD registration status",
    "Bid validity period",
    "Functionality threshold coverage",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "B-BBEE certificate expired 14 days ago — bid scored at Level 8 by default", loc: "SBD 6.1 · B-BBEE preference claim" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "SBD 9 (Independent Bid Determination) not signed — mandatory anti-collusion declaration", loc: "Returnable documents · SBD 9" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Pricing schedule subtotal arithmetic error — R2,760,000 vs declared R2,830,000", loc: "SBD 3.1 · Pricing schedule" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Bid validity period stated as 60 days — tender requires minimum 90 days", loc: "SBD 1 · Bid particulars" },
  ],
  outcome: "1 Critical · 2 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Expired B-BBEE certificate",
    body: "The B-BBEE verification certificate expired before the bid closing date. Under PPPFA Regulations, an invalid certificate defaults the bidder to the lowest preference points — directly affecting price competitiveness and award probability.",
  },
  {
    code: "Major" as const,
    title: "Unsigned mandatory declaration",
    body: "SBD 9 (Independent Bid Determination) is present but unsigned. This is a mandatory returnable document under the anti-collusion framework — an unsigned declaration is treated as non-responsive in most SCM units.",
  },
  {
    code: "Major" as const,
    title: "Pricing schedule discrepancy",
    body: "Line-item totals do not reconcile with the declared bid value. A pricing arithmetic error creates grounds for disqualification or a request for clarification that delays evaluation.",
  },
  {
    code: "Minor" as const,
    title: "Bid validity period shortfall",
    body: "The stated validity period of 60 days falls short of the tender's required 90-day minimum. A short validity period may require re-submission or invalidate the bid at the evaluation stage.",
  },
];

export default function ProcurementPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Public Procurement · Tender Compliance · SCM"
          heading="Regulatory compliance"
          headingAccent="for every tender."
          sub="South Africa's Public Procurement Act 2024 has raised the bar for both bidders and SCM units. Avidara reviews bid documents, tender packs, and SCM contracts against PPA 2024, PPPFA Regulations, and B-BBEE requirements — before submission or award."
          accent="#0369a1"
          accentLight="#38bdf8"
          accentDeep="#0c4a6e"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="A non-responsive bid cannot be awarded."
          body1="Public procurement compliance spans returnable forms, tax compliance, B-BBEE verification, pricing schedules, and functionality thresholds across multiple legislative frameworks. A single missing or invalid document renders the entire bid non-responsive — regardless of price or technical merit."
          body2="Avidara encodes the South African procurement regulatory ruleset — PPA 2024, PPPFA Regulations, National Treasury SCM instructions, and B-BBEE Codes — and reviews every mandatory requirement before you submit or evaluate."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Public Procurement" />
        <CTA industry="procurement" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
