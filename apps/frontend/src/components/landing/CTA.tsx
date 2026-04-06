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
    <section id="book" className="bg-[#1e293b]/40 px-6 py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#10b981]">
          Book a review
        </p>
        <h2
          className="mb-4 text-4xl font-bold tracking-tight text-white"
          style={{ fontFamily: "var(--font-fraunces), serif" }}
        >
          Ready to close your compliance gaps?
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-slate-400">
          Send us your document and we will run the review. Same-day turnaround
          for artwork reviews. Get in touch at{" "}
          <a
            href="mailto:hello@avidara.co.za"
            className="text-[#818cf8] underline underline-offset-2 hover:text-white"
          >
            hello@avidara.co.za
          </a>{" "}
          or leave your email below and we will reach out.
        </p>

        {submitted ? (
          <div className="rounded-xl border border-[#10b981]/30 bg-[#10b981]/5 px-6 py-8">
            <div className="mb-3 flex items-center justify-center gap-2 text-[#10b981]">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-semibold">Message received</span>
            </div>
            <p className="text-sm text-slate-400">
              We will be in touch shortly. In the meantime, feel free to email us directly at hello@avidara.co.za
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
              className="flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-slate-500 outline-none transition-colors focus:border-[#4f46e5]/50 focus:ring-1 focus:ring-[#4f46e5]/30"
            />
            <button
              type="submit"
              className="rounded-lg bg-[#4f46e5] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3730a3]"
            >
              Book a review
            </button>
          </form>
        )}

        <p className="mt-4 text-xs text-slate-600">
          No commitment required. We will confirm scope and turnaround before any work begins.
        </p>
      </div>
    </section>
  );
}
