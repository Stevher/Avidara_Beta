"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";

const REGIONS = ["EU", "UK", "North America", "Other"];

const PROOF_POINTS = [
  {
    title: "The same engine, a new library.",
    body: "Every Avidara vertical runs on the same AI-comparison engine, driven by a researched regulatory checklist — not custom-built software per market. Extending into a new region means researching and encoding that region's framework, not rebuilding the platform.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ),
  },
  {
    title: "Already EU-resident infrastructure.",
    body: "All AI processing and data storage already runs on AWS in the EU (Ireland) — genuinely relevant for any EU-based conversation, not a claim we'd need to build toward.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Enterprise-ready from day one.",
    body: "DPA (POPIA + GDPR), MSA, SLA, security questionnaire — the enterprise contracting pack already exists and travels with any new regional build.",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
  },
];

const inputStyle = {
  width: "100%",
  padding: "10px 14px",
  borderRadius: 9,
  border: "1px solid var(--b2)",
  background: "var(--bg)",
  color: "var(--t)",
  fontSize: 14,
  outline: "none",
  fontFamily: "inherit",
} as const;

const labelStyle = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: "var(--t3)",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  marginBottom: 6,
};

function InternationalForm() {
  const [form, setForm] = useState({
    name: "", company: "", email: "", region: "", scope: "", notes: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.scope.trim()) return;
    setStatus("sending");
    try {
      const message = [
        `What they're looking to review: ${form.scope.trim()}`,
        form.notes.trim() ? `Additional notes: ${form.notes.trim()}` : null,
      ].filter(Boolean).join("\n\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          company: form.company,
          email: form.email,
          reviewType: `International — ${form.region || "Region not specified"}`,
          message,
        }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        style={{
          background: "var(--surf)",
          border: "1px solid var(--b2)",
          borderRadius: 16,
          padding: "48px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: 52, height: 52, borderRadius: "50%",
            background: "rgba(16,185,129,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="var(--emerald)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--t)", marginBottom: 10, fontFamily: "var(--font-fraunces)" }}>
          Thanks — we&apos;ll be in touch
        </h3>
        <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.6 }}>
          Someone from Avidara will reach out within one business day to talk through your market and what a build would look like.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      style={{
        background: "var(--surf)",
        border: "1px solid var(--b2)",
        borderRadius: 16,
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>Name <span style={{ color: "var(--indigo-light)" }}>*</span></label>
          <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Jane Smith" maxLength={100} required />
        </div>
        <div>
          <label style={labelStyle}>Company</label>
          <input style={inputStyle} value={form.company} onChange={set("company")} placeholder="Company name" maxLength={120} />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>Company email <span style={{ color: "var(--indigo-light)" }}>*</span></label>
          <input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" maxLength={200} required />
        </div>
        <div>
          <label style={labelStyle}>Region / market of interest</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.region} onChange={set("region")}>
            <option value="">Select a region…</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label style={labelStyle}>What are you looking to review? <span style={{ color: "var(--indigo-light)" }}>*</span></label>
        <input
          style={inputStyle}
          value={form.scope}
          onChange={set("scope")}
          placeholder="e.g. packaging & labelling, pharmacovigilance, medical devices"
          maxLength={200}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>Anything else we should know? <span style={{ color: "var(--t3)", textTransform: "none" as const, fontWeight: 400 }}>(optional)</span></label>
        <textarea
          style={{ ...inputStyle, resize: "vertical", minHeight: 100, lineHeight: 1.6 }}
          value={form.notes}
          onChange={set("notes")}
          placeholder="Timeline, scale, current process — whatever's useful context."
          maxLength={2000}
        />
      </div>

      {status === "error" && (
        <p style={{ fontSize: 13, color: "#f43f5e" }}>
          Something went wrong — please try again or email us at hello@avidara.co.za.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-85 disabled:opacity-50"
          style={{ background: "var(--indigo)", cursor: status === "sending" ? "not-allowed" : "pointer" }}
        >
          {status === "sending" ? "Sending…" : "Talk to us about your market"}
        </button>
        <p style={{ fontSize: 11, color: "var(--t3)", marginTop: 10, lineHeight: 1.5 }}>
          Your details are used only to respond to your enquiry and will not be shared with third parties.
        </p>
      </div>
    </form>
  );
}

export default function InternationalClient() {
  return (
    <main style={{ backgroundColor: "var(--bg)" }}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pb-20 pt-32" style={{ backgroundColor: "var(--bg)" }}>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, black 5%, transparent 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[160px]"
          style={{ backgroundColor: "rgba(79,70,229,0.14)" }}
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="mb-6 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
            <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
            International / Enterprise
          </p>

          <h1
            className="mb-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[52px]"
            style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
          >
            Built in South Africa. Ready to build with you, wherever you are.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
            Avidara&apos;s regulatory review platform is live today across 20+ verticals in South Africa and the SADC region.
            We&apos;re now working with select international enterprises — starting in the EU — to extend that same depth
            into their regulatory frameworks. If you&apos;re evaluating AI-assisted compliance review outside Africa,
            let&apos;s talk about what that build would look like for you.
          </p>

          <a
            href="#talk"
            className="inline-flex h-12 items-center gap-2 rounded-xl px-7 text-sm font-semibold text-white transition-all hover:shadow-xl"
            style={{ backgroundColor: "var(--indigo)", boxShadow: "0 4px 20px rgba(79,70,229,0.35)" }}
          >
            Talk to us about your market
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ── Proof points ─────────────────────────────────────── */}
      <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
        <div className="mx-auto max-w-6xl">
          <FadeIn className="mb-4 grid gap-4 sm:grid-cols-3">
            {PROOF_POINTS.map((p) => (
              <div key={p.title} className="flex h-full flex-col gap-4 rounded-2xl border p-6" style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}>
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: "rgba(79,70,229,0.09)", border: "1.5px solid rgba(79,70,229,0.18)", color: "var(--indigo-light)" }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="mb-1.5 text-base font-bold" style={{ color: "var(--t)" }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{p.body}</p>
                </div>
              </div>
            ))}
          </FadeIn>
        </div>
      </section>

      <div className="gradient-divider" />

      {/* ── Form ─────────────────────────────────────────────── */}
      <section id="talk" className="scroll-mt-20 px-6 py-20" style={{ backgroundColor: "var(--bg)" }}>
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_1.4fr]">
          <FadeIn className="flex flex-col gap-6">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
                <span className="block h-0.5 w-5 rounded-full bg-[var(--emerald)]" />
                Get in touch
              </p>
              <h2
                className="mb-4 text-3xl font-bold leading-[1.15] tracking-tight"
                style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
              >
                A short conversation, not an application.
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                Tell us about your market and what you&apos;re looking to review. We&apos;ll respond within one
                business day to talk through what an Avidara build for your region would involve.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: "var(--surf)", border: "1px solid var(--b)" }}
            >
              <p className="mb-1 text-sm font-semibold" style={{ color: "var(--t)" }}>Worth knowing up front</p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>
                Regulatory coverage outside South Africa and the SADC region is not live today — it&apos;s scoped and
                built per engagement. This form starts that conversation; it doesn&apos;t enrol you in a live product.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <InternationalForm />
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
