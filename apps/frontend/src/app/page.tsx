import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import Services from "@/components/landing/Services";
import Industries from "@/components/landing/Industries";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="gradient-divider" />
        <Problem />
        <WhatIsAvidara />
        <div className="gradient-divider" />
        <Services />
        <Industries />
        <div className="gradient-divider" />
        <HowItWorksDemo />
        <WhyAvidara />
        <div className="gradient-divider" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
