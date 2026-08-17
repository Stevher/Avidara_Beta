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
  title: "Competition Law Compliance Review | Avidara",
  description:
    "Independent competition-law review for South African businesses. Distribution agreements, dealer and pricing terms, and market conduct reviewed against the Competition Act 89 of 1998 for restrictive practice risk - before the Competition Commission does.",
  alternates: { canonical: "https://www.avidara.co.za/competition-law" },
};

const demoConfig: DemoConfig = {
  documentName: "DistributionAgreement_RegionalDealer_v2.pdf",
  documentMeta: "1.1 MB · Competition Act 89/1998 · Review Ready",
  checks: [
    "Resale price maintenance clauses",
    "Exclusive dealing & territory restrictions",
    "Competitor information exchange terms",
    "Non-compete & exclusivity duration",
    "Market allocation & customer restriction language",
    "Dominance & unilateral conduct exposure",
    "Termination & penalty clause fairness",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "High",   title: "Clause fixes dealer's minimum resale price - resale price maintenance is a per se prohibited practice", loc: "Pricing terms · Clause 7.2" },
    { id: "F2", sev: "critical", sevLabel: "High",   title: "Dealer required to disclose competitor pricing and discount data - risk of facilitating coordinated conduct", loc: "Reporting obligations · Clause 11.4" },
    { id: "F3", sev: "major",    sevLabel: "Medium", title: "Exclusive territory allocation with no stated efficiency rationale - market allocation exposure", loc: "Territory & exclusivity · Clause 4.1" },
    { id: "F4", sev: "minor",    sevLabel: "Low",    title: "Post-termination restraint duration left open-ended rather than time-bound", loc: "Restraint of trade · Clause 14.3" },
  ],
  outcome: "2 High · 1 Medium · 1 Low",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Resale price maintenance clause",
    body: "The agreement requires the dealer not to sell below a price stipulated by the supplier. Fixing a minimum resale price is treated as a per se prohibited restrictive practice under the Competition Act - no efficiency defence is available once the clause is established.",
  },
  {
    code: "Critical" as const,
    title: "Competitor pricing information exchange",
    body: "A reporting clause requires the dealer to share competitor pricing and discount information with the supplier on an ongoing basis. Routine exchange of this kind of commercially sensitive information can facilitate coordinated pricing conduct, independent of whether coordination was intended.",
  },
  {
    code: "Major" as const,
    title: "Unjustified exclusive territory allocation",
    body: "The agreement allocates an exclusive sales territory to the dealer with no stated efficiency rationale on record. Market allocation between parties, without a documented pro-competitive justification, carries restrictive practice risk under the Act.",
  },
  {
    code: "Minor" as const,
    title: "Open-ended post-termination restraint",
    body: "The restraint of trade clause applies after termination without a defined end date. An unreasonably long or undefined restraint period is harder to justify and increases the risk of the clause being challenged or struck down.",
  },
];

export default function CompetitionLawPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Competition Law · Restrictive Practices"
          heading="Compliance review"
          headingAccent="for competitive conduct."
          sub="Distribution agreements, dealer terms, pricing policies, and sales conduct can carry restrictive practice risk long before anyone notices. Avidara reviews these documents against the Competition Act 89 of 1998 for price fixing, market allocation, resale price maintenance, and abuse of dominance - before the Competition Commission or Competition Tribunal does."
          accent="#b91c1c"
          accentLight="#f87171"
          accentDeep="#991b1b"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Competition Act exposure usually sits in agreements no one has checked for restrictive practice risk."
          body1="Distribution agreements, dealer and supplier terms, pricing policies, and trade association communications are drafted for commercial terms first, competition-law risk second. Clauses on resale pricing, territory allocation, exclusivity, and information sharing can create restrictive practice exposure under the Competition Act 89 of 1998, long before the Competition Commission or Competition Tribunal ever reviews them."
          body2="Avidara reviews trade and distribution agreements, dealer and supplier terms, pricing policy documents, and marketing or sales conduct materials for restrictive practice risk - price fixing, market allocation, resale price maintenance, and abuse of dominance - before they're signed or acted on."
          findings={findings}
          severityLabels={{ Critical: "High priority", Major: "Medium priority", Minor: "Low priority" }}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Competition Law" />
        <CTA industry="competition-law" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
