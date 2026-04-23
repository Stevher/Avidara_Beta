import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Avidara",
  description: "Get in touch with Avidara. Ask about our compliance review services, request a quote, or book a review call for pharmaceutical, medical device, consumer health, veterinary, or transport documentation.",
  alternates: { canonical: "https://avidara.co.za/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Navbar alwaysOpaque />
      <main className="min-h-screen pt-28 pb-20 px-6" style={{ background: "var(--bg)" }}>
        <div className="mx-auto max-w-5xl">

          {/* Header */}
          <div className="mb-12 max-w-xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              <span className="block h-0.5 w-5 rounded-full" style={{ background: "var(--emerald)" }} />
              Contact
            </p>
            <h1
              className="mb-4 text-4xl font-bold tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--t)" }}
            >
              Get in touch
            </h1>
            <p className="text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              Whether you have a question about our services, want to discuss a review, or are ready to get started — we&apos;ll respond within one business day.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">

            {/* Left — info */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>Email</p>
                <a
                  href="mailto:hello@avidara.co.za"
                  className="text-sm transition-colors hover:text-[var(--t)]"
                  style={{ color: "var(--indigo-light)" }}
                >
                  hello@avidara.co.za
                </a>
              </div>

              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--t3)" }}>Services</p>
                <ul className="flex flex-col gap-2">
                  {[
                    "Artwork Review",
                    "Package Insert / PIL Development",
                    "Dossier Gap Analysis",
                    "Medical Device Documentation",
                    "Consumer Health & Nutraceuticals",
                    "Veterinary Products",
                    "Transport & Dangerous Goods",
                  ].map(s => (
                    <li key={s} className="flex items-center gap-2 text-sm" style={{ color: "var(--t2)" }}>
                      <span className="h-1 w-1 rounded-full flex-shrink-0" style={{ background: "var(--indigo-light)" }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-xl p-5"
                style={{ background: "var(--surf)", border: "1px solid var(--b)" }}
              >
                <p className="mb-1 text-sm font-semibold" style={{ color: "var(--t)" }}>Response time</p>
                <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
                  We respond to all enquiries within one business day. For urgent reviews, mention it in your message.
                </p>
              </div>
            </div>

            {/* Right — form */}
            <ContactForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
