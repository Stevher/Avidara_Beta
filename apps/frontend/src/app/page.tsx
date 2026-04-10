import Navbar from "@/components/landing/Navbar";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import FadeIn from "@/components/FadeIn";
import IndustrySelectorGrid from "@/components/industry/IndustrySelectorGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avidara — Compliance Intelligence for Regulated Industries",
  description:
    "Independent compliance review for pharmaceuticals, medical devices, consumer health, veterinary, and transport. AI-powered gap analysis, same-day turnaround.",
};

const industries = [
  {
    href: "/life-sciences",
    label: "Pharmaceuticals",
    sub: "Life Sciences",
    accent: "#4f46e5",
    accentLight: "#818cf8",
    description:
      "SAHPRA artwork review, PI/PIL gap analysis, MLR-structured reports, and dossier submissions.",
    frameworks: ["SAHPRA", "ICH/CTD", "MCA Code v18"],
    wide: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
      </svg>
    ),
  },
  {
    href: "/medical-devices",
    label: "Medical Devices",
    sub: "Devices & Diagnostics",
    accent: "#0891b2",
    accentLight: "#22d3ee",
    description:
      "SAHPRA device registration, technical file review, and ISO 13485 compliance documentation.",
    frameworks: ["SAHPRA MD", "ISO 13485", "IMDRF"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/>
      </svg>
    ),
  },
  {
    href: "/consumer-health",
    label: "Consumer Health",
    sub: "Nutraceuticals · Cosmetics · OTC",
    accent: "#10b981",
    accentLight: "#34d399",
    description:
      "Claims substantiation, labelling compliance, and health claim review for consumer-facing products.",
    frameworks: ["R146 regs", "SAHPRA cosmetics", "Foodstuffs Act"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
      </svg>
    ),
  },
  {
    href: "/veterinary",
    label: "Veterinary",
    sub: "Animal Health",
    accent: "#f43f5e",
    accentLight: "#fb7185",
    description:
      "Veterinary product labelling, promotional material review, and DAFF/SAHPRA compliance.",
    frameworks: ["Act 36/1947", "SAHPRA vet", "DAFF"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
  },
  {
    href: "/transport",
    label: "Transport",
    sub: "Logistics · Dangerous Goods",
    accent: "#ea580c",
    accentLight: "#fb923c",
    description:
      "Cross-border documents, dangerous goods declarations, and NRTA/RTMS/AARTO compliance review.",
    frameworks: ["NRTA 93/1996", "SANS 10228", "SADC"],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="2"/>
        <path d="M16 8h4a2 2 0 012 2v6a2 2 0 01-2 2h-1"/>
        <circle cx="5.5" cy="18.5" r="2.5"/>
        <circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ──────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32" style={{ backgroundColor: "var(--bg)" }}>
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 40%, black 5%, transparent 100%)",
            }}
          />
          {/* Multi-industry glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[160px]"
            style={{ background: "radial-gradient(ellipse, rgba(79,70,229,.12) 0%, rgba(16,185,129,.06) 60%, transparent 100%)" }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{
                borderColor: "rgba(79,70,229,.25)",
                backgroundColor: "rgba(79,70,229,.08)",
                color: "var(--indigo-light)",
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" style={{ animation: "pulse 2s infinite" }} />
              Compliance Intelligence Platform
            </div>

            <h1
              className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[72px]"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              Compliance intelligence{" "}
              <em
                className="not-italic"
                style={{
                  background: "linear-gradient(135deg, var(--indigo-light) 0%, var(--emerald) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                for regulated industries.
              </em>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              Avidara stands outside every industry it serves — an independent external review layer
              that finds what internal teams miss, before regulators do.
              One methodology. Every regulated industry.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#industries"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--indigo)] px-7 text-sm font-semibold text-white transition-all hover:bg-[var(--indigo-deep)] hover:shadow-xl"
                style={{ boxShadow: "0 4px 20px rgba(79,70,229,.38)" }}
              >
                Choose your industry
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#how-it-works"
                className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
                style={{ borderColor: "var(--b)", color: "var(--t2)" }}
              >
                See how it works
              </a>
            </div>
          </div>

          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
        </section>

        <div className="gradient-divider" />

        {/* ── Industry Selector ─────────────────────────────────── */}
        <section id="industries" className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-12 text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Industries served
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
              </p>
              <h2
                className="mb-4 text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Select your industry
              </h2>
              <p className="mx-auto max-w-xl text-lg" style={{ color: "var(--t2)" }}>
                The same analytical framework, the same rigour — only the encoded regulatory ruleset changes per vertical.
              </p>
            </FadeIn>

            <FadeIn delay={150}>
              <IndustrySelectorGrid industries={industries} />
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />

        {/* ── What is Avidara teaser ────────────────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                What is Avidara
              </p>
              <h2
                className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Not a consultancy. A compliance intelligence layer.
              </h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
                Avidara encodes the regulatory rulebook for your industry and applies it consistently,
                exhaustively, and independently — every review. The methodology is universal.
                Only the ruleset changes per vertical.
              </p>
              <blockquote
                className="mb-8 border-l-2 pl-5 text-left text-base italic leading-relaxed"
                style={{ borderColor: "var(--indigo)", color: "var(--t2)" }}
              >
                "The market invested in compliance infrastructure. Avidara addresses compliance intelligence. That is the gap."
              </blockquote>
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#industries"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-[var(--indigo)] px-6 text-sm font-semibold text-white transition-all hover:bg-[var(--indigo-deep)]"
                >
                  Select your industry
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border px-6 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
                  style={{ borderColor: "var(--b)", color: "var(--t2)" }}
                >
                  How it works
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

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
