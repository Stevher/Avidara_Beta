import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import IndustryHero from "@/components/industry/IndustryHero";
import IndustryProblem, { type Finding } from "@/components/industry/IndustryProblem";
import WhatIsAvidara from "@/components/landing/WhatIsAvidara";
import HowItWorksDemo, { type DemoConfig } from "@/components/landing/HowItWorksDemo";
import WhyAvidara from "@/components/landing/WhyAvidara";
import IndustryNudge from "@/components/industry/IndustryNudge";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import ChatWidget from "@/components/ChatWidget";
import CookieBanner from "@/components/CookieBanner";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Managed Healthcare Compliance - PMB Policy Review | Avidara",
  description:
    "Independent PMB compliance review for medical scheme policy, protocols, and rule amendments in South Africa - against the Medical Schemes Act and its Regulations, before the Registrar or a complaint finds the gap.",
  alternates: { canonical: "https://www.avidara.co.za/managed-healthcare" },
};

const ACCENT = "#701a75";
const ACCENT_LIGHT = "#e879f9";
const ACCENT_DEEP = "#4a1152";

function rgba(hex: string, a: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${a})`;
}

const audiences = [
  {
    title: "Scheme compliance & clinical governance teams",
    body: "The person who signs off on a funding policy, a rule amendment, or a clinical protocol before it goes live.",
  },
  {
    title: "Managed-care administrators & consultancies",
    body: "Firms that review scheme policies, develop SOPs, and build treatment algorithms against PMB requirements on a scheme's behalf.",
  },
];

const mhProblemFindings: Finding[] = [
  {
    code: "Critical",
    title: "Unlawful sub-limit on a fully-funded PMB benefit",
    body: "A scheme's funding policy imposed an R500,000 annual sub-limit on PMB oncology treatment - a benefit Regulation 8 requires funded in full, without a sub-limit.",
  },
  {
    code: "Critical",
    title: "Non-DSP co-payment exception incomplete",
    body: "A co-payment applied when a member used a non-Designated Service Provider, but the exception wording omitted the required 'no DSP reasonably accessible' ground.",
  },
  {
    code: "Critical",
    title: "Pre-authorisation clause could downgrade an emergency claim",
    body: "A 24-hour pre-authorisation requirement, applied without an emergency carve-out, would have downgraded a genuine emergency PMB claim.",
  },
];

interface MhService {
  title: string;
  body: string;
  tags: string[];
}

const mhServices: MhService[] = [
  {
    title: "PMB Policy Compliance",
    body: "A scheme's clinical or funding policy against PMB scope - the 271 DTPs, 27-condition CDL, no co-payment or sub-limit at a DSP, correct non-DSP exception wording.",
    tags: ["271 DTPs", "27-condition CDL", "Regulation 8"],
  },
  {
    title: "Protocol / Formulary Review",
    body: "A clinical protocol or drug formulary against Regulation 15H/15I - specifically whether the mandatory 15I(c) exception (fund a non-formulary alternative when the formulary drug isn't clinically appropriate) is present and correctly scoped.",
    tags: ["Regulation 15H", "Regulation 15I(c)", "Formulary"],
  },
  {
    title: "Rule Amendment Readiness",
    body: "A proposed rule amendment against the legal test the Registrar applies under section 31(3) - fairness to members, consistency with the Act - before it's submitted.",
    tags: ["Section 31(3)", "Registrar test", "Rule amendments"],
  },
  {
    title: "Clinical / Funding SOP",
    body: "A scheme's internal SOP against its own registered policy, checking the SOP doesn't contradict the policy on a PMB-relevant point.",
    tags: ["SOP consistency", "Policy alignment"],
  },
  {
    title: "Treatment Algorithm Alignment",
    body: "A clinical pathway against DTP-specified treatment - flags any branch that would de-prioritise or deny a PMB-eligible member funded care.",
    tags: ["DTP alignment", "Clinical pathways"],
  },
];

const demoConfig: DemoConfig = {
  documentName: "MedScheme_FundingPolicy_PMB_Review.pdf",
  documentMeta: "2.1 MB · Medical Schemes Act · Regulation 8/15H/15I · Ready",
  checks: [
    "PMB scope verification (Regulation 8)",
    "Regulation 15I(c) exception check",
    "DSP co-payment condition review",
    "Pre-authorisation clause safety check",
    "Rule amendment fairness test (s.31)",
    "CMS Circular alignment",
  ],
  findings: [
    { id: "F1", sev: "critical", sevLabel: "Critical", title: "R500,000 sub-limit on a fully-funded PMB benefit", loc: "Funding Policy · Oncology benefit · Regulation 8" },
    { id: "F2", sev: "critical", sevLabel: "Critical", title: "Non-DSP co-payment exception missing required ground", loc: "Funding Policy · DSP exception clause · Regulation 8" },
    { id: "F3", sev: "critical", sevLabel: "Critical", title: "Pre-authorisation clause has no emergency carve-out", loc: "Funding Policy · Pre-authorisation clause · PMB emergency provisions" },
  ],
  outcome: "3 Critical",
};

const boundaries = [
  "It's a supporting tool, not a replacement for the scheme's own clinical governance or the Registrar's approval authority.",
  "It does not adjudicate an individual member's claim or complaint.",
  "It does not assess the scheme's financial soundness or solvency - that's a different regulatory question entirely (Section 35), out of scope.",
  "Every finding cites the specific regulation - Regulation 8, 15H, 15I(c), section 31(3) - so a human reviewer can verify it, not just trust it.",
];

export default function ManagedHealthcarePage() {
  return (
    <>
      <Navbar />
      <main>
        <IndustryHero
          badge="Managed Healthcare · Medical Schemes"
          heading="PMB compliance review for medical scheme policy."
          headingAccent="Before the Registrar - or a complaint - finds the gap."
          sub="Avidara reads your scheme's clinical and funding policy, protocol, formulary, rule amendment, SOP, or treatment algorithm against what the Medical Schemes Act and its Regulations actually require - and returns severity-rated findings with the specific regulation cited."
          accent={ACCENT}
          accentLight={ACCENT_LIGHT}
          accentDeep={ACCENT_DEEP}
        />
        <div className="gradient-divider" />

        {/* Who it's for */}
        <section className="px-6 py-16" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-4xl">
            <FadeIn className="mb-8 text-center">
              <p className="mb-3 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT_LIGHT }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} />
                Who this is for
              </p>
              <p className="mx-auto max-w-2xl text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                Avidara serves 18 regulated industries, each with its own ruleset - and this one speaks a
                different language than most. If you think in PMB, DTPs, CDL, and CMS Circulars - not
                SAHPRA submissions - this is built for you.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="grid gap-4 sm:grid-cols-2">
                {audiences.map((a) => (
                  <div
                    key={a.title}
                    className="rounded-xl border p-6"
                    style={{ borderColor: rgba(ACCENT, 0.2), backgroundColor: rgba(ACCENT, 0.04) }}
                  >
                    <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{a.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{a.body}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        <IndustryProblem
          heading="Clause-level drift survives internal review."
          body1="Prescribed Minimum Benefits aren't optional and they aren't negotiable - but a scheme's own policy wording is where PMB entitlement most often quietly narrows. A co-payment clause that shouldn't apply at a DSP. A sub-limit on a benefit that's meant to be funded in full. A non-formulary exception that's missing entirely."
          body2="These aren't dramatic refusals - they're the kind of clause-level drift that survives internal review because nobody reads the whole policy against the regulation line by line. It's exactly the kind of finding the Council for Medical Schemes catches on complaint."
          findings={mhProblemFindings}
        />
        <WhatIsAvidara />
        <div className="gradient-divider" />

        {/* Five services */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-6xl">
            <FadeIn className="mb-10 max-w-2xl">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT_LIGHT }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} />
                Five services
              </p>
              <h2
                className="mb-3 text-4xl font-bold tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                One methodology, five ways it applies.
              </h2>
              <p className="max-w-lg text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                All five run on the same review engine, model, and quality rubric as every other Avidara service - the same standard every vertical on the platform ships at.
              </p>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {mhServices.map((s) => (
                <div
                  key={s.title}
                  className="flex flex-col rounded-xl border p-6"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                >
                  <h3 className="mb-2 text-sm font-bold" style={{ color: "var(--t)" }}>{s.title}</h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{s.body}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border px-2.5 py-0.5 text-[11px]"
                        style={{ borderColor: "var(--b)", color: "var(--t3)" }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm italic leading-relaxed" style={{ color: "var(--t3)" }}>
              All five optionally take a second reference document - your DSP provider directory, current scheme rules, or existing policy - never required, always used when supplied, never guessed at when it isn't.
            </p>
          </div>
        </section>

        <HowItWorksDemo config={demoConfig} />

        {/* Proof point */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
          <div className="mx-auto max-w-4xl">
            <FadeIn>
              <div
                className="rounded-2xl border p-8 lg:p-10"
                style={{ borderColor: rgba(ACCENT, 0.28), backgroundColor: rgba(ACCENT, 0.05) }}
              >
                <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT_LIGHT }}>
                  <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} />
                  Real result, not a demo
                </p>
                <h2
                  className="mb-4 text-3xl font-bold leading-tight tracking-tight"
                  style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                >
                  This exact review ran against production - not a demo environment.
                </h2>
                <p className="mb-6 text-base leading-relaxed" style={{ color: "var(--t2)" }}>
                  On 26 August 2026, the day this vertical shipped, Avidara ran a real end-to-end PMB Policy
                  Compliance review against a test document modelled on a realistic scheme funding policy,
                  with deliberately planted PMB violations - including the three findings shown above.
                </p>

                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span
                    className="rounded-full border px-4 py-1.5 text-sm font-bold uppercase tracking-wide"
                    style={{ borderColor: "rgba(248,113,113,.35)", backgroundColor: "rgba(239,68,68,.12)", color: "#f87171" }}
                  >
                    Non-Compliant
                  </span>
                  <span className="text-xl font-bold" style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}>
                    6 Critical · 2 Major · 2 Minor findings
                  </span>
                </div>

                <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
                  The review caught every planted issue - and surfaced one issue that hadn't been
                  deliberately planted. Evidence the model is reasoning about the actual policy text, not
                  pattern-matching a fixed list.
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Boundary / scope */}
        <section className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-3xl">
            <FadeIn className="mb-8">
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: ACCENT_LIGHT }}>
                <span className="block h-0.5 w-5 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} />
                What this is - and isn't
              </p>
              <h2
                className="text-3xl font-bold leading-tight tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                A supporting tool. Not a replacement for your clinical governance.
              </h2>
            </FadeIn>
            <FadeIn delay={100}>
              <ul className="flex flex-col gap-3">
                {boundaries.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)", color: "var(--t2)" }}
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: ACCENT_LIGHT }} />
                    {b}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </section>

        <WhyAvidara />
        <div className="gradient-divider" />
        <IndustryNudge current="Managed Healthcare" />
        <CTA industry="managed-healthcare" />
      </main>
      <Footer />
      <ChatWidget />
      <CookieBanner />
    </>
  );
}
