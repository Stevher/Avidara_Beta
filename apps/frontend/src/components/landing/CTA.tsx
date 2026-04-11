"use client";

import { useState } from "react";

export default function CTA() {
  const [form, setForm] = useState({ name: "", surname: "", company: "", email: "", reviewType: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    <section id="book" className="px-6 py-32" style={{ backgroundColor: "var(--bg2)" }}>
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
          {[
            {
              type: "Document Review",
              badge: "Standard",
              badgeColor: "var(--indigo)",
              description: "Upload a single PI or PIL. Avidara checks it against the relevant regulatory framework and returns a structured gap report.",
              useCases: ["Artwork & labelling sign-off", "HCP promotional material", "Claim compliance checks", "Pre-batch release review"],
              note: "Same-day turnaround · Flat per-document rate",
            },
            {
              type: "Dossier Review",
              badge: "Deep review",
              badgeColor: "var(--emerald)",
              description: "Upload a document package — PI, SMPC, clinical summaries, dossier sections. Avidara cross-references across all documents.",
              useCases: ["New product registrations", "Major SAHPRA submissions", "Label variation sign-off", "Pre-submission dossier checks"],
              note: "Scoped per project · Turnaround agreed upfront",
            },
          ].map((tier) => (
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
            className="rounded-xl border px-6 py-8"
            style={{ borderColor: "rgba(16,185,129,.3)", backgroundColor: "rgba(16,185,129,.05)" }}
          >
            <div className="mb-2 flex items-center justify-center gap-2" style={{ color: "var(--emerald)" }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold">Message received</span>
            </div>
            <p className="text-sm" style={{ color: "var(--t2)" }}>
              We will be in touch shortly. In the meantime, feel free to email us at hello@avidara.co.za
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
