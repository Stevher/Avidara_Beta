"use client";

import Navbar from "@/components/landing/Navbar";
import WhyAvidara from "@/components/landing/WhyAvidara";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import FadeIn from "@/components/FadeIn";

// Compliance Consult accent — indigo-violet, matches the in-app tool (#6366f1).
const ACCENT = "#6366f1";
const ACCENT_LIGHT = "#818cf8";
const ACCENT_DEEP = "#4f46e5";

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Mock conversation for the hero ────────────────────────────────
const THREAD: { role: "user" | "assistant"; text: string }[] = [
  {
    role: "user",
    text: "We have a supplement registered as a foodstuff. Marketing wants to add \"supports immune function.\" Is that allowed?",
  },
  {
    role: "assistant",
    text: "Short answer: it depends on how the product is classified and how the claim is worded. Under the Foodstuffs Act labelling regulations, a foodstuff may carry certain function claims, but anything implying it prevents, treats, or cures disease moves you into complementary-medicine territory — a different regulatory pathway under the SAHPRA complementary medicines framework.\n\n\"Supports immune function\" is a structure/function claim, which is generally lower-risk than a disease claim — but it must be truthful, not misleading, and substantiated. I'd confirm the exact permissible wording against the current regulation with your regulatory specialist before print.\n\nWant me to point you to the right Avidara review for this?",
  },
];

const PILLARS = [
  {
    title: "Inside your perimeter",
    body: "Pre-launch product detail can't go into public AI tools. Compliance Consult runs inside your secure Avidara environment — your data stays within the compliance perimeter, never shared externally.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Grounded, never invented",
    body: "Every regulatory point is anchored to the named framework. It will not fabricate section numbers or thresholds — if a citation is uncertain, it says so and names the framework instead. A confident wrong answer is the one thing it won't give you.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: "Routes you to the review",
    body: "When a structured document review is the better next step, it points you to the right Avidara service — pharma, devices, consumer health, transport, and the rest — and helps you interpret the findings you get back.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
      </svg>
    ),
  },
  {
    title: "Decision-support, not a substitute",
    body: "It defers final accountability to you. For any material regulatory decision it recommends validation by a registered specialist — framed as professional accountability, because product-specific context a conversation can't capture still matters.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

export default function ConsultMarketingPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-24 pt-32" style={{ backgroundColor: "var(--bg)" }}>
          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 90% 70% at 50% 25%, black 5%, transparent 100%)",
            }}
          />
          {/* Glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-[160px]"
            style={{ backgroundColor: rgba(ACCENT, 0.16) }}
          />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
              style={{ borderColor: rgba(ACCENT, 0.25), backgroundColor: rgba(ACCENT, 0.08), color: ACCENT_LIGHT }}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--emerald)]" style={{ animation: "pulse 2s infinite" }} />
              Compliance Consult · Private Regulatory AI
            </div>

            <h1
              className="mb-6 text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-[68px]"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              A private regulatory{" "}
              <em
                className="not-italic"
                style={{
                  background: `linear-gradient(135deg, ${ACCENT_LIGHT} 0%, var(--emerald) 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                thinking partner.
              </em>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              Between reviews, regulatory questions still come up — classification, claims, labelling, market entry.
              Compliance Consult is the secure, private space to think them through, grounded in the applicable
              frameworks, without putting confidential product detail into a public AI tool.
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <a
                href="#book"
                className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-xl"
                style={{ backgroundColor: ACCENT, boxShadow: `0 4px 20px ${rgba(ACCENT, 0.38)}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT_DEEP; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = ACCENT; }}
              >
                Get started
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="/#industries"
                className="inline-flex h-12 items-center gap-2 rounded-xl border px-7 text-sm font-medium transition-all hover:border-[var(--b2)] hover:text-[var(--t)]"
                style={{ borderColor: "var(--b)", color: "var(--t2)" }}
              >
                Explore the reviews
              </a>
            </div>
          </div>

          {/* Chat mock */}
          <div className="relative z-10 mx-auto mt-16 max-w-2xl">
            <div
              className="overflow-hidden rounded-2xl border"
              style={{ borderColor: "var(--b)", boxShadow: "0 8px 60px rgba(0,0,0,.32)", backgroundColor: "var(--surf2)" }}
            >
              {/* Title bar */}
              <div className="flex items-center gap-3 border-b px-4 py-3" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
                <div
                  className="flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ background: rgba(ACCENT, 0.12), border: `1px solid ${rgba(ACCENT, 0.25)}`, color: ACCENT }}
                >
                  <svg width="15" height="15" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 4a1 1 0 011-1h10a1 1 0 011 1v6a1 1 0 01-1 1H6l-3 2.5V11H3a1 1 0 01-1-1V4z" /><path d="M5 6h6M5 8h4" />
                  </svg>
                </div>
                <div className="flex-1 text-left">
                  <p className="text-xs font-semibold" style={{ color: "var(--t)" }}>Compliance Consult</p>
                  <p className="text-[10px]" style={{ color: "var(--t3)" }}>Private · within your compliance perimeter</p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-3 px-4 py-5 text-left">
                {THREAD.map((m, i) => (
                  <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                    <div
                      className="max-w-[85%] whitespace-pre-line rounded-xl px-4 py-2.5 text-[12.5px] leading-relaxed"
                      style={
                        m.role === "user"
                          ? { background: ACCENT, color: "#fff" }
                          : { background: "var(--surf)", color: "var(--t2)", border: "1px solid var(--b)" }
                      }
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-[11px]" style={{ color: "var(--t3)" }}>
              Illustrative. Decision-support, not a substitute for a registered regulatory specialist.
            </p>
          </div>

          <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:.4;}}`}</style>
        </section>

        <div className="gradient-divider" />

        {/* ── Why it's different ───────────────────────────────── */}
        <section className="px-6 py-24" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-12 max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Why Compliance Consult
              </p>
              <h2
                className="mb-4 text-4xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                Not another chatbot. A regulatory advisor that knows its limits.
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
                Its value depends on being trustworthy, not on sounding authoritative — so it is built to ground
                every claim, flag uncertainty, and defer the final call to you.
              </p>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2">
              {PILLARS.map((p, i) => (
                <FadeIn key={p.title} delay={i * 100}>
                  <div className="flex h-full gap-4 rounded-2xl border p-6" style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}>
                    <div
                      className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: rgba(ACCENT, 0.09), border: `1.5px solid ${rgba(ACCENT, 0.18)}`, color: ACCENT }}
                    >
                      {p.icon}
                    </div>
                    <div>
                      <h3 className="mb-1.5 text-base font-bold" style={{ color: "var(--t)" }}>{p.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{p.body}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <div className="gradient-divider" />
        <WhyAvidara />
        <CTA />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
