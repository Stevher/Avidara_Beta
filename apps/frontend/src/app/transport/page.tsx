import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transport & Logistics Compliance Reviews | Avidara",
  description:
    "Cross-border documentation, dangerous goods compliance, and NRTA/RTMS/AARTO regulatory review for transport and logistics operators in South Africa.",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Dangerous goods declaration error",
    body: "Consignment note classifies corrosive goods under incorrect UN number. SANS 10228 requires correct classification — incorrect declarations expose the operator to criminal liability.",
  },
  {
    code: "Major" as const,
    title: "Cross-border permit gap",
    body: "SADC cross-border road transport permit does not cover the declared route. Vehicle operating outside permit scope — identified before the load departs.",
  },
  {
    code: "Major" as const,
    title: "RTMS non-compliance",
    body: "Mass and dimension certification not current. Road Transport Management System requirements not met — operator at risk of roadside enforcement action.",
  },
  {
    code: "Minor" as const,
    title: "POPIA breach in logistics data",
    body: "Waybill contains personal information of the consignee transmitted without appropriate safeguards. POPIA compliance gap in standard documentation workflow.",
  },
];

export default function TransportPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Transport · Logistics · Dangerous Goods"
          heading="Regulatory compliance"
          headingAccent="for the road."
          sub="Cross-border documentation, dangerous goods declarations, and operator compliance — Avidara reviews your transport documents against NRTA 93/1996, SANS 10228/10232, RTMS, and SADC protocols before enforcement does."
          accent="#ea580c"
          accentLight="#fb923c"
          accentDeep="#c2410c"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="Non-compliant transport documents stop operations."
          body1="Transport and logistics compliance spans dangerous goods classifications, cross-border permits, mass and dimension certificates, driver licensing, and POPIA obligations across multiple regulatory frameworks. A single document error can ground a fleet."
          body2="Avidara encodes the South African transport regulatory ruleset — NRTA, SANS, RTMS, AARTO, SADC — and applies it to every document before it leaves your operations team."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Transport" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
