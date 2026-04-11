import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo, { type DemoConfig } from "@/components/landing/HowItWorksDemo";

const demoConfig: DemoConfig = {
  documentName: "TechFile_InfusionPump_Pro3_Rev4.pdf",
  documentMeta: "1.8 MB · Reference Standard: ISO 13485 · Ready",
  checks: [
    "Device classification verified",
    "Essential performance requirements",
    "Clinical evaluation data completeness",
    "IFU labelling compliance",
    "Risk management file review",
    "Post-market surveillance plan",
    "SAHPRA registration scope",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Clinical evidence missing for paediatric indication", loc: "Section 6 · Clinical Evaluation Report" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "IFU omits mandatory contraindication for cardiac devices", loc: "Section 9 · Instructions for Use" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Risk management file missing post-production review", loc: "Section 5 · ISO 14971 File" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: "Shelf life stated in months — standard requires years", loc: "Section 4 · Labelling" },
  ],
  outcome: "1 Critical · 2 Major · 1 Minor",
};
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Medical Device Regulatory Documentation & Technical File Review | Avidara",
  description:
    "Independent regulatory documentation review for medical device manufacturers in South Africa. Technical file gap analysis, SAHPRA registration support, ISO 13485 compliance documentation, and IFU labelling review.",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Essential performance data missing",
    body: "Technical file submitted without bench test data supporting the essential performance claims. SAHPRA requires objective evidence before registration.",
  },
  {
    code: "Major" as const,
    title: "IFU labelling non-compliance",
    body: "Instructions for Use do not include mandatory contraindication statements required by the applicable standard. Cannot ship in current state.",
  },
  {
    code: "Major" as const,
    title: "Risk management file incomplete",
    body: "ISO 14971 risk management process documented but post-production review section absent. Gap identified before technical file submission.",
  },
  {
    code: "Minor" as const,
    title: "Classification justification gap",
    body: "Device classification rationale references superseded SAHPRA guidance. Current classification document not referenced in the technical file.",
  },
];

export default function MedicalDevicesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Medical Devices · Diagnostics"
          heading="Technical files regulators"
          headingAccent="expect to approve."
          sub="SAHPRA medical device registrations demand complete, precise technical files. Avidara cross-references every section against the applicable standard before your submission goes in."
          accent="#0891b2"
          accentLight="#22d3ee"
          accentDeep="#0e7490"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Technical file gaps block registrations."
          body1="Medical device regulatory submissions fail for avoidable reasons — missing performance data, incorrect classification justification, incomplete risk management files. Every gap identified post-submission adds months to market entry."
          body2="Avidara reviews your technical file against SAHPRA requirements, ISO 13485, and applicable harmonised standards before you submit — giving your team a clear action list, not a rejection letter."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Medical Devices" />
        <CTA industry="medical-devices" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
