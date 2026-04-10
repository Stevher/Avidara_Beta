"use client";

import { useState } from "react";

export default function CTA() {
  const [form, setForm] = useState({ name: "", surname: "", company: "", email: "" });
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
          Send us your document and we will run the review. Same-day turnaround for artwork reviews.
          Get in touch at{" "}
          <a
            href="mailto:hello@avidara.co.za"
            className="underline underline-offset-2 transition-colors hover:text-[var(--t)]"
            style={{ color: "var(--indigo-light)" }}
          >
            hello@avidara.co.za
          </a>{" "}
          or fill in the form below and we will reach out.
        </p>

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
                  {loading ? "Sending…" : "Book a review"}
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
