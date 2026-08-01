import Navbar from "@/components/landing/Navbar";
import HowItWorksDemo from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import FadeIn from "@/components/FadeIn";
import IndustrySelectorGrid from "@/components/industry/IndustrySelectorGrid";
import { industries } from "@/data/industries";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avidara - Regulatory Documentation & Compliance Intelligence | South Africa",
  description:
    "Independent regulatory documentation review for pharmaceutical, medical device, consumer health, veterinary, transport, legal, and financial services companies in South Africa. AI-powered gap analysis, same-day turnaround, SAHPRA-aligned.",
  alternates: { canonical: "https://www.avidara.co.za" },
};


export default function Home() {
  return (
    <>
      <Navbar photoHero />
      <main>
        {/* ── Hero - edge-to-edge photo ────────────────────────────── */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/avidara_hero_v1.png"
            alt="An Avidara client team reviewing the platform dashboard together"
            width={1672}
            height={941}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "62% 42%" }}
          />
          {/* Scrim - heavier on the left where the headline sits, lighter over the photo's right side */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, rgba(5,9,20,.88) 0%, rgba(5,9,20,.88) 30%, rgba(8,13,28,.55) 52%, rgba(8,13,28,.18) 72%, rgba(8,13,28,.38) 100%), " +
                "linear-gradient(to top, rgba(5,9,20,.88) 0%, rgba(8,13,28,.25) 34%, rgba(8,13,28,0) 58%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0" style={{ backgroundColor: "rgba(79,70,229,.22)", mixBlendMode: "multiply", opacity: 0.5 }} />

          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32">
            <div className="max-w-xl">
              <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald-light)" }}>
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald-light)]" style={{ animation: "pulse 2s infinite" }} />
                Compliance Intelligence Platform
              </div>

              <h1
                className="mb-5 text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[58px]"
                style={{ fontFamily: "var(--font-fraunces), serif" }}
              >
                Compliance intelligence for regulated industries.
              </h1>

              <p className="mb-8 max-w-lg text-lg leading-relaxed" style={{ color: "rgba(255,255,255,.82)" }}>
                An independent external review layer that finds what internal teams miss, before regulators do.
                One methodology. Every regulated industry.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#book"
                  className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--indigo)] px-7 text-sm font-semibold text-white transition-all hover:bg-[var(--indigo-deep)] hover:shadow-xl"
                  style={{ boxShadow: "0 4px 20px rgba(79,70,229,.45)" }}
                >
                  Book a review
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a
                  href="#how-it-works"
                  className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/10"
                  style={{ borderColor: "rgba(255,255,255,.32)", backgroundColor: "rgba(255,255,255,.06)" }}
                >
                  See how it works
                </a>
              </div>

              <a
                href="/sample-report"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--indigo-light)" }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                </svg>
                See a sample report
                <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
        </section>

        {/* ── Industry selector ─────────────────────────────────── */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div id="industries" className="mx-auto max-w-6xl" style={{ scrollMarginTop: 88 }}>
            <p className="mb-6 text-center text-sm font-semibold" style={{ color: "var(--t2)" }}>
              One platform. {industries.length} regulated industries.
            </p>
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1" style={{ backgroundColor: "var(--b)" }} />
              <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--t3)" }}>
                Choose your industry
              </p>
              <div className="h-px flex-1" style={{ backgroundColor: "var(--b)" }} />
            </div>
            <IndustrySelectorGrid industries={industries} />
          </div>
        </section>

        <div className="gradient-divider" />

        {/* ── What is Avidara ────────────────────────────────────── */}
        <section id="platform" className="px-6 py-24" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">

              {/* Left - copy + quote */}
              <FadeIn>
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                  <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                  What is Avidara
                </p>
                <h2
                  className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  Not a consultancy. A compliance intelligence layer.
                </h2>
                <p className="mb-8 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
                  Avidara encodes the regulatory rulebook for your industry and applies it
                  consistently, exhaustively, and independently - every review.
                  The methodology is universal. Only the ruleset changes per vertical.
                </p>

                {/* Quote */}
                <div
                  className="relative rounded-2xl border p-6"
                  style={{ borderColor: "rgba(79,70,229,.18)", backgroundColor: "rgba(79,70,229,.05)" }}
                >
                  <span
                    className="absolute -top-5 left-5 text-7xl leading-none select-none"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "rgba(79,70,229,.2)" }}
                  >
                    &ldquo;
                  </span>
                  <blockquote className="relative text-base italic leading-relaxed" style={{ color: "var(--t2)" }}>
                    The market invested in compliance infrastructure. Avidara addresses compliance intelligence. That is the gap.
                  </blockquote>
                  <p className="mt-3 text-xs font-semibold" style={{ color: "var(--indigo-light)" }}>
                    The findings are ours. The decisions are yours.
                  </p>
                </div>
              </FadeIn>

              {/* Right - three pillars */}
              <FadeIn delay={150}>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      n: "01",
                      title: "Speed beyond human capacity",
                      body: "Every PI reference cross-checked, every claim validated, every mandatory element verified - in parallel, not sequentially.",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                        </svg>
                      ),
                    },
                    {
                      n: "02",
                      title: "Exhaustive consistency",
                      body: "No reviewer fatigue. No commercial pressure. The same rigour from finding one to finding fifty - every single time.",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      ),
                    },
                    {
                      n: "03",
                      title: "Independence preserved",
                      body: "Avidara flags, analyses, and reports. Your team reviews, validates, and owns every decision. Control stays with you - always.",
                      icon: (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12.75L11.25 15 15 9.75M3.598 6A11.959 11.959 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/>
                        </svg>
                      ),
                    },
                  ].map((p) => (
                    <div
                      key={p.n}
                      className="flex gap-4 rounded-xl border p-5"
                      style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                    >
                      <div
                        className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(79,70,229,.09)", border: "1.5px solid rgba(79,70,229,.16)", color: "var(--indigo)" }}
                      >
                        {p.icon}
                      </div>
                      <div>
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] font-bold" style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t3)" }}>{p.n}</span>
                          <h4 className="text-sm font-bold" style={{ color: "var(--t)" }}>{p.title}</h4>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{p.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

            </div>
          </div>
        </section>

        <div className="gradient-divider" />
        <HowItWorksDemo />

        {/* ── Compliance Consult promo band ──────────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-5xl">
            <div
              className="relative overflow-hidden rounded-3xl border p-8 sm:p-12"
              style={{ borderColor: "rgba(99,102,241,.22)", backgroundColor: "rgba(99,102,241,.05)" }}
            >
              <div
                className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full blur-[120px]"
                style={{ backgroundColor: "rgba(99,102,241,.18)" }}
              />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#818cf8" }}>
                    <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: "#818cf8" }} />
                    Beyond reviews
                  </p>
                  <h2
                    className="mb-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                  >
                    A private regulatory advisor, between reviews.
                  </h2>
                  <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                    Compliance Consult is a secure regulatory thinking-partner built into the platform.
                    Ask about classification, claims, labelling, or market entry - grounded in the applicable
                    frameworks, inside your own compliance perimeter. It will never invent a citation, and it
                    points you to the right review when a structured document check is the better next step.
                  </p>
                  <a
                    href="/consult"
                    className="inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all hover:shadow-xl"
                    style={{ backgroundColor: "#6366f1", boxShadow: "0 4px 20px rgba(99,102,241,.35)" }}
                  >
                    Explore Compliance Consult
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    "Confidential within your Avidara environment",
                    "Grounded in named frameworks - never fabricated citations",
                    "Routes you to the right structured review",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-xl border px-4 py-3"
                      style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                    >
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── What you receive - severity grading + PDF report ─── */}
        <section className="px-6 py-24" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-5xl">
            <FadeIn className="mb-10">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                What You Receive
              </p>
              <h2
                className="text-3xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Every finding graded. Delivered as a structured report.
              </h2>
            </FadeIn>

            <FadeIn delay={150}>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  {
                    label: "Critical",
                    c: "#ef4444",
                    bg: "rgba(239,68,68,.07)",
                    border: "rgba(239,68,68,.22)",
                    body: "Must be corrected before submission or release. Regulatory non-compliance that cannot proceed as-is.",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Major",
                    c: "#f97316",
                    bg: "rgba(249,115,22,.07)",
                    border: "rgba(249,115,22,.22)",
                    body: "Significant issue likely to cause a regulatory query, delay, or rejection. Should be resolved before submission.",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Minor",
                    c: "#94a3b8",
                    bg: "rgba(148,163,184,.07)",
                    border: "rgba(148,163,184,.22)",
                    body: "Smaller inconsistency. Good practice to address before finalising.",
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 16 14"/>
                      </svg>
                    ),
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="relative overflow-hidden rounded-xl border p-6"
                    style={{ borderColor: s.border, backgroundColor: s.bg }}
                  >
                    <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundColor: s.c }} />
                    <div className="mb-4 flex items-center gap-2.5">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg"
                        style={{ backgroundColor: "rgba(0,0,0,.05)", border: `1.5px solid ${s.border}`, color: s.c }}
                      >
                        {s.icon}
                      </div>
                      <span
                        className="rounded px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide"
                        style={{ color: s.c, border: `1px solid ${s.border}`, backgroundColor: "rgba(0,0,0,.03)" }}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{s.body}</p>
                  </div>
                ))}
              </div>

              <div
                className="mt-6 flex items-start gap-3 rounded-xl border p-4"
                style={{ borderColor: "rgba(16,185,129,.25)", backgroundColor: "rgba(16,185,129,.05)" }}
              >
                <div
                  className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: "rgba(16,185,129,.12)", border: "1.5px solid rgba(16,185,129,.3)" }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>
                  <span className="font-bold" style={{ color: "var(--t)" }}>A clean report is a good outcome, not an error.</span>{" "}
                  No findings means no significant discrepancies were detected - the report supports your compliance decision. It does not replace professional regulatory sign-off.
                </p>
              </div>
            </FadeIn>

            {/* PDF report - two-column */}
            <FadeIn delay={200} className="mt-8">
              <div
                className="overflow-hidden rounded-2xl border"
                style={{ borderColor: "rgba(79,70,229,.18)", backgroundColor: "var(--surf)" }}
              >
                <div className="grid lg:grid-cols-[1fr_1.1fr]">
                  {/* Left */}
                  <div
                    className="flex flex-col justify-center border-b p-8 lg:border-b-0 lg:border-r"
                    style={{ borderColor: "rgba(79,70,229,.12)", backgroundColor: "rgba(79,70,229,.04)" }}
                  >
                    <div
                      className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                      style={{ backgroundColor: "rgba(79,70,229,.1)", border: "1.5px solid rgba(79,70,229,.2)", color: "var(--indigo)" }}
                    >
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                      </svg>
                    </div>
                    <h3
                      className="mb-3 text-2xl font-bold leading-snug"
                      style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                    >
                      A structured PDF, immediately.
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      Available for download the moment the review completes - no waiting, no follow-up required.
                    </p>
                  </div>
                  {/* Right */}
                  <div className="flex flex-col justify-center divide-y p-8" style={{ borderColor: "var(--b)" }}>
                    {[
                      "Graded findings table (Critical · Major · Minor)",
                      "Exact regulatory reference for each finding",
                      "Location within the document",
                      "Specific recommendation for correction",
                      "Executive summary",
                      "Overall outcome statement",
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                        <svg className="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span className="text-sm" style={{ color: "var(--t2)" }}>{item}</span>
                      </div>
                    ))}
                    <div className="pt-5">
                      <a
                        href="/sample-report"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors hover:opacity-80"
                        style={{ color: "var(--indigo)" }}
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
                        </svg>
                        See a sample report
                        <svg width="11" height="11" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="gradient-divider" />
        <WhyAvidara />

        {/* 2.5 - Enterprise section */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-12 text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--indigo)]" />
                Enterprise - now available
              </p>
              <h2
                className="mx-auto mb-4 max-w-2xl text-4xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Built for teams. Embed it in your stack.
              </h2>
              <p className="mx-auto max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
                API access, single sign-on, audit trails, and concurrent review capacity - live today.
                Scale from a single reviewer to an enterprise compliance team without changing how it works.
              </p>
            </FadeIn>

            <FadeIn delay={120}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "REST API",
                    body: "Headless integration via avd_live_ keys, with HMAC-signed webhooks. Embed reviews directly into your DMS or workflow.",
                    icon: <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />,
                  },
                  {
                    title: "SSO / SAML 2.0",
                    body: "Single sign-on through Azure AD, Okta, and other corporate identity providers. No separate Avidara login.",
                    icon: <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />,
                  },
                  {
                    title: "Audit log",
                    body: "Full timestamped activity trail - demonstrate complete review history to auditors and regulators.",
                    icon: <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2z" />,
                  },
                  {
                    title: "Usage analytics",
                    body: "Per-tenant dashboard: review volumes, service breakdown, and outcomes by document type.",
                    icon: <path d="M3 3v18h18M18 9l-5 5-3-3-4 4" />,
                  },
                  {
                    title: "Concurrency tiers",
                    body: "Multiple team members running simultaneous reviews - capacity scales with your plan.",
                    icon: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />,
                  },
                  {
                    title: "Team workspaces",
                    body: "Separate, isolated environments per organisation or business unit.",
                    icon: <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4M9 9v.01M9 12v.01M9 15v.01M9 18v.01" />,
                  },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="group flex flex-col gap-3 rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-lg transition-colors duration-200"
                      style={{ backgroundColor: "rgba(79,70,229,.09)", border: "1.5px solid rgba(79,70,229,.18)", color: "var(--indigo-light)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {item.icon}
                      </svg>
                    </div>
                    <h4 className="text-sm font-bold" style={{ color: "var(--t)" }}>{item.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "var(--t3)" }}>{item.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 text-center">
                <a
                  href="#book"
                  className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:bg-[var(--indigo-deep)] hover:shadow-xl"
                  style={{ backgroundColor: "var(--indigo)", boxShadow: "0 4px 20px rgba(79,70,229,.25)" }}
                >
                  Talk to us about an enterprise arrangement
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <p className="text-xs" style={{ color: "var(--t3)" }}>
                  Or email <a href="mailto:hello@avidara.co.za" className="font-semibold hover:opacity-80" style={{ color: "var(--indigo-light)" }}>hello@avidara.co.za</a>
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── International / EU promo band ───────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-5xl">
            <div
              className="relative overflow-hidden rounded-3xl border p-8 sm:p-12"
              style={{ borderColor: "rgba(16,185,129,.25)", backgroundColor: "rgba(16,185,129,.05)" }}
            >
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full blur-[120px]"
                style={{ backgroundColor: "rgba(16,185,129,.18)" }}
              />
              <div className="relative grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" style={{ animation: "pulse 2s infinite" }} />
                    International - now open
                  </p>
                  <h2
                    className="mb-4 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                  >
                    Built in South Africa. Now opening our doors to the EU.
                  </h2>
                  <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                    Avidara is live today across {industries.length} regulated industries in South Africa and the SADC region.
                    We&apos;re working with select international enterprises - starting in the EU - to extend
                    that same depth into new regulatory frameworks.
                  </p>
                  <a
                    href="/international"
                    className="inline-flex h-11 items-center gap-2 rounded-xl px-6 text-sm font-semibold text-white transition-all hover:shadow-xl"
                    style={{ backgroundColor: "var(--emerald)", boxShadow: "0 4px 20px rgba(16,185,129,.35)" }}
                  >
                    Talk to us about your market
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    "EU-resident infrastructure - AWS, Ireland",
                    "Same engine, a new regulatory library",
                    "Enterprise pack ready - DPA (POPIA + GDPR), MSA, SLA",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-start gap-3 rounded-xl border px-4 py-3"
                      style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                    >
                      <svg className="mt-0.5 shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--emerald)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      <span className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
        </section>

        <div className="gradient-divider" />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
