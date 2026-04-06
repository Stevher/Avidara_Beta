"use client";

import { useState } from "react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

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
          or leave your email below and we will reach out.
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 rounded-xl border px-4 py-3 text-sm outline-none transition-all"
              style={{
                borderColor: "var(--b2)",
                backgroundColor: "var(--surf)",
                color: "var(--t)",
              }}
            />
            <button
              type="submit"
              className="rounded-xl bg-[var(--indigo)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
            >
              Book a review
            </button>
          </form>
        )}

        <p className="mt-4 text-xs" style={{ color: "var(--t3)" }}>
          No commitment required. We will confirm scope and turnaround before any work begins.
        </p>
      </div>
    </section>
  );
}
