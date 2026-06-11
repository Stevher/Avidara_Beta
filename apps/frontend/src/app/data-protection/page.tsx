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
  title: "POPIA & Data Protection Compliance Review | Avidara",
  description:
    "Independent POPIA compliance review for South African organisations. Privacy policies, PAIA manuals, FICA Risk Management & Compliance Programmes, and processing records reviewed against the 8 conditions for lawful processing — before the Information Regulator does.",
};

const demoConfig: DemoConfig = {
  documentName: "PrivacyPolicy_CorpGroup_v3.pdf",
  documentMeta: "0.8 MB · POPIA 4/2013 · Review Ready",
  checks: [
    "Information Officer designation",
    "Lawful basis for each processing purpose",
    "Retention period statements",
    "Cross-border transfer safeguards",
    "Data subject rights procedures",
    "Security safeguard documentation",
    "Operator agreement requirements",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "No Information Officer designated or registered — mandatory under POPIA s.55", loc: "Accountability section · Officer details" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "No lawful processing basis for marketing communications — s.11 requirement not met", loc: "Processing purposes · Marketing section" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Personal data transferred to EU processors — no s.72 cross-border transfer basis documented", loc: "Third-party sharing · Cloud processing" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Retention periods absent for 3 of 7 declared processing purposes", loc: "Retention schedule · Section 4" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Unregistered Information Officer",
    body: "No Information Officer has been designated or registered with the Information Regulator. This is a mandatory obligation under POPIA s.55 — failure to comply is a direct regulatory breach independent of any other processing gaps.",
  },
  {
    code: "Critical" as const,
    title: "Unlawful marketing communications",
    body: "The organisation processes personal information for direct marketing without establishing a lawful basis under POPIA s.11. No evidence of consent, contract necessity, or legitimate interest assessment — creating enforcement and penalty exposure.",
  },
  {
    code: "Major" as const,
    title: "Cross-border transfer gap",
    body: "Personal data is transferred to cloud processors outside South Africa. No s.72 transfer basis is documented — neither the recipient country's adequacy, binding corporate rules, nor data subject consent. Each transfer without a basis is an unlawful processing act.",
  },
  {
    code: "Minor" as const,
    title: "Incomplete retention schedule",
    body: "Three of seven declared processing purposes carry no retention period. POPIA's purpose limitation condition requires data to be deleted or de-identified once its purpose is fulfilled — without a period, this obligation cannot be met.",
  },
];

export default function DataProtectionPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Data Protection · POPIA · FICA"
          heading="Compliance review"
          headingAccent="for personal data."
          sub="The Information Regulator is actively enforcing POPIA. Avidara reviews privacy policies, PAIA manuals, FICA compliance programmes, and data processing records against the 8 conditions for lawful processing — before your next audit or enforcement action."
          accent="#9d174d"
          accentLight="#f472b6"
          accentDeep="#831843"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="POPIA enforcement is active — and it applies to every organisation."
          body1="Data protection compliance spans eight conditions for lawful processing, mandatory Information Officer registration, cross-border transfer controls, data subject rights management, and — for accountable institutions — FICA Risk Management & Compliance Programme obligations. A gap in any of these creates direct enforcement and penalty exposure."
          body2="Avidara reviews your privacy programme documents — policies, PAIA manuals, RMCP frameworks, and processing records — against the Information Regulator's requirements and Financial Intelligence Centre guidance, before your next compliance deadline."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Data Protection" />
        <CTA industry="data-protection" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
