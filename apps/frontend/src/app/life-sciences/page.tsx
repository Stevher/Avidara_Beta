import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import Services from "@/components/landing/Services";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmaceutical Compliance Reviews | Avidara",
  description:
    "Independent artwork review, PI/PIL gap analysis, and MLR-structured compliance reports for pharmaceutical companies in South Africa. SAHPRA-aligned, same-day turnaround.",
};

const pharmaFindings = [
  {
    code: "Critical" as const,
    title: "Wrong dosing on artwork",
    body: "Initiation shown as 5 mg BD. PI requires 10 mg BD. Missed across three internal reviews.",
  },
  {
    code: "Major" as const,
    title: "Off-label indication creep",
    body: "Promotional claim extends beyond the approved indication. Not caught before the print run.",
  },
  {
    code: "Major" as const,
    title: "Non-PI comparative claim",
    body: "Superiority language used without supporting data in the approved label.",
  },
  {
    code: "Minor" as const,
    title: "Address discrepancy",
    body: "Promotional material address differs from the SAHPRA certificate holder address.",
  },
];

export default function LifeSciencesPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Pharmaceuticals · Life Sciences"
          heading="Your compliance layer."
          headingAccent="Independent, intelligent, precise."
          sub="Avidara stands outside every pharma business it serves — an independent external review layer that finds what internal teams miss, before SAHPRA does."
          accent="#4f46e5"
          accentLight="#818cf8"
          accentDeep="#3730a3"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Compliance gaps are invisible, until they are not."
          body1="Regulatory teams are stretched. Internal reviewers face commercial pressure. Rulebooks never stop growing. One overlooked finding — a wrong dosing figure, a non-PI claim — can delay a launch, trigger a recall, or draw SAHPRA action."
          body2="You know your products better than anyone. What you need is a second set of eyes that answers to no one but the rulebook."
          findings={pharmaFindings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <Services />
        <div className="gradient-divider" />
        <HowItWorksDemo />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Pharmaceuticals" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
