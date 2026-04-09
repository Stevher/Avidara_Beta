import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "FAQ — Pharmaceutical Regulatory Services",
  description: "Answers to common questions about Avidara's PI/PIL development, regulatory gap analysis, artwork review, AI usage, data security, and engagement process for pharma companies in South Africa.",
  alternates: { canonical: "https://avidara.co.za/faq" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { "@type": "Question", name: "What is Avidara and what do you actually do?", acceptedAnswer: { "@type": "Answer", text: "Avidara is a specialist pharma regulatory document services company. We help pharmaceutical companies develop, review, and maintain regulatory documents — primarily Package Inserts (PIs), Patient Information Leaflets (PILs), promotional materials, and regulatory gap analyses." } },
    { "@type": "Question", name: "Which regulatory frameworks do you work within?", acceptedAnswer: { "@type": "Answer", text: "Our primary regulatory context is South Africa (SAHPRA), and the broader SADC region. We also work with clients navigating NAFDAC (Nigeria), KEBS (Kenya), and other anglophone African markets." } },
    { "@type": "Question", name: "Does Avidara use AI in its work?", acceptedAnswer: { "@type": "Answer", text: "Yes. Avidara uses enterprise-grade AI tools as part of a structured, expert-supervised workflow. Every output generated with AI assistance is reviewed and approved by an experienced regulatory professional before it reaches you." } },
    { "@type": "Question", name: "Is Avidara POPIA compliant?", acceptedAnswer: { "@type": "Answer", text: "Yes. Avidara operates in full compliance with the Protection of Personal Information Act (POPIA). We have a registered Information Officer and documented AI Usage Policy." } },
    { "@type": "Question", name: "How does Avidara charge for its services?", acceptedAnswer: { "@type": "Answer", text: "We offer project-based pricing, portfolio retainer agreements, and advisory engagements. All pricing is quoted in South African Rand and provided in writing before work commences." } },
    { "@type": "Question", name: "Will you sign an NDA?", acceptedAnswer: { "@type": "Answer", text: "Yes — a mutual NDA is a standard part of our onboarding process. You do not need to request it separately." } },
  ],
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="pt-24">
        <div className="mx-auto max-w-3xl px-6 pb-4 pt-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
            FAQ
          </p>
          <h1 className="mb-3 text-4xl font-bold" style={{ color: "var(--t)", fontFamily: "var(--font-fraunces)" }}>
            Frequently asked questions
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
            From how we work and what we charge, to how we handle AI, data security, and confidentiality for pharma companies across South Africa and Africa.
          </p>
        </div>
        <FAQ standalone />
      </main>
      <Footer />
    </>
  );
}
