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
  title: "Mining Health, Safety & Environmental Compliance Review | Avidara",
  description:
    "Independent compliance review for South African mining operations. Mine Health and Safety Act Codes of Practice, Social & Labour Plans, and environmental authorisation packages reviewed against MHSA, MPRDA, and NEMA — before DMRE inspection or s.54 action.",
};

const demoConfig: DemoConfig = {
  documentName: "COP_HangingwallStability_Mine_v2.pdf",
  documentMeta: "5.2 MB · MHSA 29/1996 · DMRE Review",
  checks: [
    "DMRE guideline structure compliance",
    "Hazard identification and risk assessment",
    "Control measures hierarchy (HIRAC)",
    "Legal appointments and competencies",
    "Training and trigger-action plans",
    "Monitoring and audit cycle",
    "Health & safety committee consultation",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Engineering control measures absent — no fall-of-ground barrier specification in COP", loc: "Section 4 · Control measures" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Competency requirements for rock mechanics officer not defined — MHSA s.5 appointment gap", loc: "Section 6 · Legal appointments" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Risk assessment not updated after recent geotechnical change — COP review cycle overdue", loc: "Section 3 · Risk assessment" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Health & safety committee consultation not documented for this COP version", loc: "Document control · Consultation record" },
  ],
  outcome: "2 Critical · 1 Major · 1 Minor",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Missing engineering controls",
    body: "The Code of Practice does not specify fall-of-ground barrier systems as an engineering control. Under the MHSA control hierarchy, engineering controls must precede administrative measures — their absence is a direct s.54 stoppage risk on inspection.",
  },
  {
    code: "Critical" as const,
    title: "Undefined legal appointment competencies",
    body: "The COP does not define competency requirements for the appointed rock mechanics officer. MHSA s.5 requires appointments to specify minimum qualifications and experience — an undefined appointment cannot be defensibly filled or audited.",
  },
  {
    code: "Major" as const,
    title: "Stale risk assessment",
    body: "A geotechnical condition change occurred 6 weeks ago but the Code of Practice risk assessment has not been updated. The MHSA requires COPs to reflect current conditions — operating against an outdated COP creates enforcement exposure.",
  },
  {
    code: "Minor" as const,
    title: "Consultation record absent",
    body: "MHSA s.9 requires COPs to be developed in consultation with the health and safety committee. No consultation record is attached to this version — the COP cannot be defended as procedurally compliant without evidence of consultation.",
  },
];

export default function MiningPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Mining · Health, Safety & Environmental"
          heading="Compliance review"
          headingAccent="for mining operations."
          sub="Section 54 stoppages are preventable. Avidara reviews Codes of Practice, Social & Labour Plans, and environmental authorisation packages against the Mine Health and Safety Act, MPRDA, and NEMA requirements — surfacing gaps before DMRE inspection finds them."
          accent="#78350f"
          accentLight="#b45309"
          accentDeep="#451a03"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="An incomplete Code of Practice can stop the mine."
          body1="Mining health, safety, and environmental compliance spans mandatory Codes of Practice for every hazard category, Social & Labour Plan commitments, environmental authorisation conditions, and financial provision for rehabilitation. Each framework carries its own documentary obligations — and DMRE inspectors check all of them."
          body2="Avidara reviews your COP documents, SLPs, and environmental management programmes against MHSA, MPRDA, and NEMA requirements — identifying gaps before inspection, appeal, or s.54 action."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Mining" />
        <CTA industry="mining" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
