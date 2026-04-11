import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo, { type DemoConfig } from "@/components/landing/HowItWorksDemo";

const demoConfig: DemoConfig = {
  documentName: "VetoPro_Canine_Label_v2.pdf",
  documentMeta: "1.1 MB · Reference: Act 36 of 1947 · Ready",
  checks: [
    "Withdrawal period declaration",
    "Species and indication scope",
    "Schedule classification check",
    "Dosing by weight verification",
    "Registration number format",
    "Storage and disposal wording",
    "Emergency contact details",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "Withdrawal period absent — food-producing animal product", loc: "Main label · Act 36 requirement" },
    { id: "F2", sev: "major",    sevLabel: "Major",    title: "Indication includes felines — not covered by registration", loc: "Indications section" },
    { id: "F3", sev: "major",    sevLabel: "Major",    title: "Schedule 4 declaration missing from label", loc: "Front panel · Scheduling box" },
    { id: "F4", sev: "minor",    sevLabel: "Minor",    title: 'Storage: "cool place" — regulation requires temperature range', loc: "Storage conditions panel" },
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
  title: "Veterinary Regulatory Documentation & Compliance Reviews | Avidara",
  description:
    "Independent regulatory documentation review for animal health companies in South Africa. Veterinary product labelling, promotional material review, and SAHPRA/DAFF compliance under Act 36 of 1947.",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Withdrawal period missing",
    body: "Food-producing animal product label omits mandatory withdrawal period. A critical non-conformance with Act 36/1947 labelling requirements — product cannot be released.",
  },
  {
    code: "Major" as const,
    title: "Restricted schedule claim on promotional material",
    body: "Marketing brochure references prescription-only indications without appropriate scheduling disclaimer. Cannot be distributed to lay audiences.",
  },
  {
    code: "Major" as const,
    title: "Off-label species claim",
    body: "Promotional material implies efficacy in a species not listed in the approved registration. Unregistered use claim identified before print approval.",
  },
  {
    code: "Minor" as const,
    title: "Storage condition inconsistency",
    body: "Label states \"store below 25°C\" but registration certificate specifies \"store below 30°C\". Discrepancy flagged for correction before batch release.",
  },
];

export default function VeterinaryPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Veterinary · Animal Health"
          heading="Veterinary compliance,"
          headingAccent="without the guesswork."
          sub="Veterinary products carry their own regulatory rulebook. Avidara reviews labels, prescriptions, and promotional materials against Act 36 of 1947, SAHPRA veterinary requirements, and DAFF guidelines — independently, every time."
          accent="#f43f5e"
          accentLight="#fb7185"
          accentDeep="#e11d48"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Veterinary labelling errors carry serious risk."
          body1="Veterinary product compliance is as exacting as human medicines — withdrawal periods, species restrictions, scheduling declarations, and species-specific dosing all carry regulatory and consumer safety implications. The margin for error is zero."
          body2="Avidara encodes the veterinary regulatory ruleset and applies it consistently to every label, insert, and promotional piece — so your team catches errors before they reach the field."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo config={demoConfig} />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Veterinary" />
        <CTA industry="veterinary" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
