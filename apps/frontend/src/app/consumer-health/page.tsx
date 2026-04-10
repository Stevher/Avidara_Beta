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
  title: "Consumer Health Compliance Reviews | Avidara",
  description:
    "Health claim substantiation, labelling compliance, and regulatory review for nutraceuticals, cosmetics, OTC medicines, and functional foods in South Africa.",
};

const findings = [
  {
    code: "Critical" as const,
    title: "Unsubstantiated health claim",
    body: '"Clinically proven to boost immunity" on supplement packaging. No clinical study cited, no regulatory authorisation for that claim. Recall risk if flagged post-launch.',
  },
  {
    code: "Major" as const,
    title: "Prohibited ingredient not declared",
    body: "Active ingredient classified as a scheduled substance present in formulation but not reflected on the label. Triggers immediate regulatory action.",
  },
  {
    code: "Major" as const,
    title: 'Misleading "natural" claim',
    body: "Product marketed as \"100% natural\" contains a synthetic preservative. Claim is false under R146 regulations and the Consumer Protection Act.",
  },
  {
    code: "Minor" as const,
    title: "Net content labelling error",
    body: "Net content declared as grams without mandatory metric equivalents. Non-conformance with Regulation 146 labelling requirements.",
  },
];

export default function ConsumerHealthPage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Consumer Health · Nutraceuticals · Cosmetics"
          heading="Claims that hold up."
          headingAccent="Labelling that complies."
          sub="From health claims on supplement packaging to cosmetic ingredient disclosures, Avidara reviews every product communication against the applicable regulatory requirements — before your product hits shelves."
          accent="#10b981"
          accentLight="#34d399"
          accentDeep="#059669"
        />
        <div className="gradient-divider" />
        <IndustryProblem
          heading="One unsubstantiated claim can halt a product."
          body1="Consumer health is a high-stakes regulatory environment. Health claims, ingredient declarations, labelling formats, and marketing copy are all subject to specific regulatory requirements. A claim that feels acceptable to marketing can be a critical non-conformance in a SAHPRA review."
          body2="Avidara applies the applicable regulatory ruleset — whether R146, SAHPRA cosmetics guidelines, or the Foodstuffs Act — before your product lands in trouble."
          findings={findings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <HowItWorksDemo />
        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Consumer Health" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
