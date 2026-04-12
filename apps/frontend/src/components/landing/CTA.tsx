"use client";

import { useState } from "react";

type Industry = "pharma" | "medical-devices" | "consumer-health" | "veterinary" | "transport";

interface TierConfig {
  type: string;
  badge: string;
  badgeColor: string;
  description: string;
  useCases: string[];
  note: string;
}

const TIERS: Record<Industry | "default", [TierConfig, TierConfig]> = {
  default: [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a single document. Avidara checks it against the relevant regulatory framework and returns a structured gap report.",
      useCases: ["Labelling & artwork sign-off", "Promotional material review", "Pre-release document checks", "Regulatory claim validation"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload a document package. Avidara cross-references across all documents to identify gaps, inconsistencies, and submission risks.",
      useCases: ["New product registrations", "Regulatory submission packages", "Variation & amendment sign-off", "Pre-submission compliance checks"],
      note: "Scoped per project · Turnaround agreed upfront",
    },
  ],
  pharma: [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a single PI or PIL. Avidara checks it against SAHPRA, ICH/CTD, and MCA requirements and returns a structured gap report.",
      useCases: ["PI/PIL gap analysis", "Artwork & label sign-off", "HCP promotional material", "Pre-batch release review"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload a document package — PI, SMPC, clinical summaries, CTD sections. Avidara cross-references claims and flags submission gaps.",
      useCases: ["New SAHPRA registrations", "Major dossier submissions", "Label variation sign-off", "Pre-submission CTD review"],
      note: "Scoped per project · Turnaround agreed upfront",
    },
  ],
  "medical-devices": [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a single IFU, label, or technical document. Avidara checks it against SAHPRA MD, ISO 13485, and IMDRF requirements.",
      useCases: ["IFU & labelling compliance", "Promotional material review", "ISO 13485 document checks", "CE/SAHPRA label review"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload your technical file package. Avidara cross-references clinical evidence, design documentation, and labelling for registration readiness.",
      useCases: ["SAHPRA device registration", "Technical file package review", "Clinical evaluation doc checks", "IMDRF submission preparation"],
      note: "Scoped per project · Turnaround agreed upfront",
    },
  ],
  "consumer-health": [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a label, insert, or marketing piece. Avidara checks claims, allergen declarations, and labelling against R146, SAHPRA, and Foodstuffs Act.",
      useCases: ["Label & claims compliance", "R146 health claim review", "Marketing material checks", "Allergen & nutrition labelling"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload a product registration package. Avidara cross-references claims against substantiation data and checks multi-regulation compliance.",
      useCases: ["Product registration packages", "Health claim dossier review", "Multi-regulation compliance", "Cosmetics notification prep"],
      note: "Scoped per project · Turnaround agreed upfront",
    },
  ],
  veterinary: [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a vet product label or promotional piece. Avidara checks it against Act 36/1947, SAHPRA veterinary requirements, and DAFF guidelines.",
      useCases: ["Vet product label review", "Promotional material checks", "Schedule classification check", "Pre-release labelling sign-off"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload a registration package — labels, data summaries, and supporting documentation. Avidara reviews the full set for submission readiness.",
      useCases: ["Act 36 registration packages", "Variation submission review", "Species & indication sign-off", "DAFF/SAHPRA submission prep"],
      note: "Scoped per project · Turnaround agreed upfront",
    },
  ],
  transport: [
    {
      type: "Document Review",
      badge: "Standard",
      badgeColor: "var(--indigo)",
      description: "Upload a single transport document. Avidara checks it against NRTA, SANS 10228/10232, RTMS, and SADC requirements and returns a gap report.",
      useCases: ["Consignment note review", "Dangerous goods declaration", "Waybill & manifest compliance", "SANS 10228 label check"],
      note: "Same-day turnaround · Flat per-document rate",
    },
    {
      type: "Dossier Review",
      badge: "Deep review",
      badgeColor: "var(--emerald)",
      description: "Upload your full consignment documentation package. Avidara cross-references permits, declarations, and certificates for end-to-end compliance.",
      useCases: ["Cross-border documentation set", "Full consignment package review", "Permit & route coverage audit", "RTMS compliance documentation"],
      note: "Scoped per consignment · Turnaround agreed upfront",
    },
  ],
};

interface CTAProps {
  industry?: Industry;
}

export default function CTA({ industry }: CTAProps) {
  const [form, setForm] = useState({ name: "", surname: "", company: "", email: "", reviewType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tiers = TIERS[industry ?? "default"];

  function update(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at hello@avidara.co.za");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    borderColor: "var(--b2)",
    backgroundColor: "var(--surf)",
    color: "var(--t)",
  };

  return (
    <section id="book" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
          Book a review
        </p>
        <h2
          className="mb-4 text-4xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
        >
          Ready to close your compliance gaps?
        </h2>
        <p className="mb-10 text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
          Two ways to engage — pick the one that fits your situation, or tell us what you need and
          we will recommend the right approach.
        </p>

        {/* Review type cards */}
        <div className="mb-10 grid gap-4 text-left sm:grid-cols-2">
          {tiers.map((tier) => (
            <button
              key={tier.type}
              type="button"
              onClick={() => setForm((f) => ({ ...f, reviewType: f.reviewType === tier.type ? "" : tier.type }))}
              className="flex flex-col gap-3 rounded-2xl border p-5 text-left transition-all"
              style={{
                borderColor: form.reviewType === tier.type ? tier.badgeColor : "var(--b)",
                backgroundColor: form.reviewType === tier.type ? `${tier.badgeColor}08` : "var(--surf)",
                boxShadow: form.reviewType === tier.type ? `0 0 0 1px ${tier.badgeColor}40` : "none",
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold" style={{ color: "var(--t)" }}>{tier.type}</span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                  style={{ backgroundColor: tier.badgeColor }}
                >
                  {tier.badge}
                </span>
              </div>
              <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>{tier.description}</p>
              <ul className="flex flex-col gap-1">
                {tier.useCases.map((uc) => (
                  <li key={uc} className="flex items-center gap-1.5 text-xs" style={{ color: "var(--t3)" }}>
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {uc}
                  </li>
                ))}
              </ul>
              <p className="text-[10px] font-medium" style={{ color: "var(--t3)" }}>{tier.note}</p>
            </button>
          ))}
        </div>

        {submitted ? (
          <div
            className="rounded-2xl border px-6 py-8 text-left"
            style={{ borderColor: "rgba(16,185,129,.3)", backgroundColor: "rgba(16,185,129,.05)" }}
          >
            <div className="mb-6 flex items-center gap-2" style={{ color: "var(--emerald)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold">Request received — here is what happens next</span>
            </div>
            <ol className="flex flex-col gap-4">
              {[
                { n: "1", title: "We review your request", body: "We will look at your details and confirm we are the right fit for what you need — usually within a few hours." },
                { n: "2", title: "Short scope call", body: "We will reach out to understand your document, the regulatory framework it needs to be checked against, and your timeline." },
                { n: "3", title: "Review begins", body: "Once scope is agreed, we run the review and deliver your structured gap report — same day for Document Reviews." },
              ].map((step) => (
                <li key={step.n} className="flex gap-4">
                  <div
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--emerald)" }}
                  >
                    {step.n}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--t)" }}>{step.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed" style={{ color: "var(--t2)" }}>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-xs" style={{ color: "var(--t3)" }}>
              Questions in the meantime? Email us at{" "}
              <a href="mailto:hello@avidara.co.za" style={{ color: "var(--indigo-light)" }}>hello@avidara.co.za</a>
            </p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              {form.reviewType && (
                <div
                  className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium"
                  style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)", color: "var(--t2)" }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="var(--emerald)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {form.reviewType} selected
                  <button
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, reviewType: "" }))}
                    className="ml-auto opacity-50 hover:opacity-100"
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                      <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="First name"
                  required
                  className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                  style={inputStyle}
                />
                <input
                  type="text"
                  value={form.surname}
                  onChange={(e) => update("surname", e.target.value)}
                  placeholder="Last name"
                  required
                  className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                  style={inputStyle}
                />
              </div>
              <input
                type="text"
                value={form.company}
                onChange={(e) => update("company", e.target.value)}
                placeholder="Company"
                required
                className="w-full rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                style={inputStyle}
              />
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-all"
                  style={inputStyle}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-[var(--indigo)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)] disabled:opacity-60 whitespace-nowrap"
                >
                  {loading ? "Sending…" : form.reviewType ? `Book a ${form.reviewType}` : "Book a review"}
                </button>
              </div>
            </form>
            {error && (
              <p className="mt-3 text-xs" style={{ color: "#f87171" }}>{error}</p>
            )}
          </>
        )}

        {/* Trust signals */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {[
            {
              label: "Zero Data Retention",
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
            },
            {
              label: "NDA as standard",
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>,
            },
            {
              label: "POPIA compliant",
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
            },
            {
              label: "No document storage",
              icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6m4-6v6"/><path d="M9 6V4h6v2"/></svg>,
            },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs"
              style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--surf)" }}
            >
              {icon}
              {label}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--t3)" }}>
          No commitment required. We will confirm scope and turnaround before any work begins.
        </p>
      </div>
    </section>
  );
}
