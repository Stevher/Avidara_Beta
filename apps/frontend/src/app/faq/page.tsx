import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import FAQ from "@/components/landing/FAQ";

export const metadata: Metadata = {
  title: "FAQ — Avidara",
  description: "Answers to common questions about Avidara's services, regulatory expertise, AI usage, data security, and engagement process.",
};

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <div className="mx-auto max-w-3xl px-6 pb-4 pt-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
            FAQ
          </p>
          <h1 className="mb-3 text-4xl font-bold" style={{ color: "var(--t)", fontFamily: "var(--font-fraunces)" }}>
            Frequently asked questions
          </h1>
          <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
            From how we work and what we charge, to how we handle AI, data security, and confidentiality.
          </p>
        </div>
        <FAQ standalone />
      </main>
      <Footer />
    </>
  );
}
