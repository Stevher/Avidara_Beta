import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Problem from "@/components/landing/Problem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import Services from "@/components/landing/Services";
import Industries from "@/components/landing/Industries";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <WhatIsAvidara />
        <Services />
        <Industries />
        <HowItWorksDemo />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
