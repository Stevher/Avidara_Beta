"use client";

import { useState } from "react";

const SUBJECTS = [
  "General Enquiry",
  "Artwork Review",
  "Package Insert / PIL Development",
  "Dossier Gap Analysis",
  "Medical Device Documentation",
  "Consumer Health & Nutraceuticals",
  "Veterinary Products",
  "Transport & Dangerous Goods",
  "Other",
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

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "", surname: "", company: "", email: "",
    phone: "", reviewType: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          Message sent
        </h3>
        <p style={{ fontSize: 14, color: "var(--t2)", lineHeight: 1.6 }}>
          Thanks for reaching out. Someone from Avidara will be in touch within one business day.
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
      {/* Name row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>First name <span style={{ color: "var(--indigo-light)" }}>*</span></label>
          <input style={inputStyle} value={form.name} onChange={set("name")} placeholder="Jane" maxLength={80} required />
        </div>
        <div>
          <label style={labelStyle}>Last name</label>
          <input style={inputStyle} value={form.surname} onChange={set("surname")} placeholder="Smith" maxLength={80} />
        </div>
      </div>

      {/* Company + Email row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>Company</label>
          <input style={inputStyle} value={form.company} onChange={set("company")} placeholder="Pharma Co." maxLength={120} />
        </div>
        <div>
          <label style={labelStyle}>Email <span style={{ color: "var(--indigo-light)" }}>*</span></label>
          <input style={inputStyle} type="email" value={form.email} onChange={set("email")} placeholder="jane@company.com" maxLength={200} required />
        </div>
      </div>

      {/* Phone + Subject row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={labelStyle}>Phone</label>
          <input style={inputStyle} type="tel" value={form.phone} onChange={set("phone")} placeholder="+27 XX XXX XXXX" maxLength={30} />
        </div>
        <div>
          <label style={labelStyle}>Subject</label>
          <select style={{ ...inputStyle, cursor: "pointer" }} value={form.reviewType} onChange={set("reviewType")}>
            <option value="">Select a topic…</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Message <span style={{ color: "var(--indigo-light)" }}>*</span></label>
        <textarea
          style={{ ...inputStyle, resize: "vertical", minHeight: 120, lineHeight: 1.6 }}
          value={form.message}
          onChange={set("message")}
          placeholder="Tell us what you're working on…"
          maxLength={2000}
          required
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
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p style={{ fontSize: 11, color: "var(--t3)", marginTop: 10, lineHeight: 1.5 }}>
          Your details are used only to respond to your enquiry and will not be shared with third parties — in accordance with POPIA.
        </p>
      </div>
    </form>
  );
}
