"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hi! I'm Avidara's assistant. Ask me anything about what we do, how it works, or whether we're a good fit for your team.";
const LEAD_THRESHOLD = 10;

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [loading, setLoading] = useState(false);

  // Lead capture
  const [leadShown, setLeadShown] = useState(false);
  const [leadStep, setLeadStep] = useState<"prompt" | "form" | "done">("prompt");
  const [leadForm, setLeadForm] = useState({ name: "", surname: "", email: "", consent: false });
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState("");

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: GREETING }]);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, leadShown, leadStep]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const apiMessages = next.filter((m, i) => !(i === 0 && m.role === "assistant"));

      if (!sessionIdRef.current) {
        sessionIdRef.current = crypto.randomUUID();
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: apiMessages,
          _hp: honeypot,
          sessionId: sessionIdRef.current,
          page: window.location.pathname,
        }),
      });
      const data = await res.json();
      const replied: Message[] = [
        ...next,
        { role: "assistant", content: data.reply || "Sorry, I couldn't get a response. Please try again." },
      ];
      setMessages(replied);

      // Show lead form when bot asks about booking/follow-up
      const replyLower = (data.reply || "").toLowerCase();
      const bookingTriggers = ["book a call", "book a review", "get in touch", "follow up", "contact us", "reach out", "schedule"];
      const hasTrigger = bookingTriggers.some((t) => replyLower.includes(t));

      if (!leadShown && hasTrigger) {
        setLeadShown(true);
        setLeadStep("form");
      } else if (!leadShown && replied.filter((m) => m.role === "user").length >= LEAD_THRESHOLD) {
        setLeadShown(true);
      }
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Please try again or email hello@avidara.co.za." }]);
    } finally {
      setLoading(false);
    }
  }

  async function submitLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadError("");
    if (!leadForm.name.trim() || !leadForm.surname.trim() || !leadForm.email.trim()) {
      setLeadError("Please fill in all fields.");
      return;
    }
    if (!leadForm.consent) {
      setLeadError("Please tick the consent box to continue.");
      return;
    }
    setLeadSubmitting(true);
    try {
      await fetch("/api/chat/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...leadForm,
          sessionId: sessionIdRef.current,
          page: window.location.pathname,
        }),
      });
      setLeadStep("done");
    } catch {
      setLeadStep("done"); // Still show confirmation — don't block the user
    } finally {
      setLeadSubmitting(false);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl border overflow-hidden"
          style={{
            width: "min(380px, calc(100vw - 48px))",
            height: "min(520px, calc(100vh - 120px))",
            backgroundColor: "var(--bg)",
            borderColor: "var(--b2)",
            boxShadow: "0 24px 64px rgba(0,0,0,.4)",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 border-b flex-shrink-0"
            style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--indigo)", opacity: 0.9 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--t)" }}>Avidara Assistant</p>
                <p className="text-xs" style={{ color: "var(--t2)" }}>Ask me anything</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-7 w-7 items-center justify-center rounded-lg transition-colors hover:opacity-70"
              style={{ color: "var(--t2)" }}
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                  style={
                    msg.role === "user"
                      ? { backgroundColor: "var(--indigo)", color: "#fff" }
                      : { backgroundColor: "var(--surf2)", color: "var(--t)", border: "1px solid var(--b)" }
                  }
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-3"
                  style={{ backgroundColor: "var(--surf2)", border: "1px solid var(--b)" }}
                >
                  <div className="flex gap-1.5 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="block h-1.5 w-1.5 rounded-full"
                        style={{
                          backgroundColor: "var(--t3)",
                          animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Lead capture card */}
            {leadShown && (
              <div
                className="rounded-2xl p-4 text-sm"
                style={{ backgroundColor: "var(--surf2)", border: "1px solid var(--b)", color: "var(--t)" }}
              >
                {leadStep === "prompt" && (
                  <>
                    <p className="mb-3 font-medium" style={{ color: "var(--t)" }}>
                      Would you like someone from Avidara to follow up with you directly?
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLeadStep("form")}
                        className="flex-1 rounded-lg py-2 text-sm font-semibold transition-opacity hover:opacity-80"
                        style={{ backgroundColor: "var(--indigo)", color: "#fff" }}
                      >
                        Yes, contact me
                      </button>
                      <button
                        onClick={() => setLeadShown(false)}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                        style={{ border: "1px solid var(--b)", color: "var(--t2)" }}
                      >
                        No thanks
                      </button>
                    </div>
                  </>
                )}

                {leadStep === "form" && (
                  <form onSubmit={submitLead} noValidate>
                    <p className="mb-3 font-medium" style={{ color: "var(--t)" }}>
                      Leave your details and we&apos;ll be in touch.
                    </p>
                    <div className="space-y-2 mb-3">
                      <input
                        type="text"
                        placeholder="First name"
                        value={leadForm.name}
                        onChange={(e) => setLeadForm((f) => ({ ...f, name: e.target.value }))}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                          border: "1px solid var(--b2)",
                          backgroundColor: "var(--bg)",
                          color: "var(--t)",
                        }}
                        maxLength={80}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        value={leadForm.surname}
                        onChange={(e) => setLeadForm((f) => ({ ...f, surname: e.target.value }))}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                          border: "1px solid var(--b2)",
                          backgroundColor: "var(--bg)",
                          color: "var(--t)",
                        }}
                        maxLength={80}
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm((f) => ({ ...f, email: e.target.value }))}
                        className="w-full rounded-lg px-3 py-2 text-sm outline-none"
                        style={{
                          border: "1px solid var(--b2)",
                          backgroundColor: "var(--bg)",
                          color: "var(--t)",
                        }}
                        maxLength={200}
                        required
                      />
                    </div>

                    {/* POPIA consent */}
                    <label className="flex items-start gap-2 mb-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={leadForm.consent}
                        onChange={(e) => setLeadForm((f) => ({ ...f, consent: e.target.checked }))}
                        className="mt-0.5 flex-shrink-0"
                        style={{ accentColor: "var(--indigo)", width: 14, height: 14 }}
                      />
                      <span className="text-xs leading-snug" style={{ color: "var(--t3)" }}>
                        I consent to Avidara contacting me to follow up on this conversation. My details will only be used for this purpose and will not be shared with third parties.
                      </span>
                    </label>

                    {leadError && (
                      <p className="mb-2 text-xs" style={{ color: "#f43f5e" }}>{leadError}</p>
                    )}

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={leadSubmitting}
                        className="flex-1 rounded-lg py-2 text-sm font-semibold transition-opacity hover:opacity-80 disabled:opacity-40"
                        style={{ backgroundColor: "var(--indigo)", color: "#fff" }}
                      >
                        {leadSubmitting ? "Sending…" : "Submit"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setLeadShown(false)}
                        className="rounded-lg px-4 py-2 text-sm font-medium transition-opacity hover:opacity-70"
                        style={{ border: "1px solid var(--b)", color: "var(--t2)" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {leadStep === "done" && (
                  <p className="font-medium" style={{ color: "var(--t)" }}>
                    Thanks! Someone from Avidara will be in touch shortly.
                  </p>
                )}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div
            className="flex-shrink-0 border-t px-3 py-3"
            style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
          >
            <div
              className="flex items-end gap-2 rounded-xl border px-3 py-2"
              style={{ borderColor: "var(--b2)", backgroundColor: "var(--bg)" }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask a question..."
                className="flex-1 resize-none bg-transparent text-sm outline-none"
                style={{
                  color: "var(--t)",
                  maxHeight: "96px",
                  lineHeight: "1.5",
                }}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg transition-opacity disabled:opacity-30"
                style={{ backgroundColor: "var(--indigo)" }}
                aria-label="Send"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                  <path d="M14 8L2 2l2.5 6L2 14l12-6z" fill="white" />
                </svg>
              </button>
            </div>
            {/* Honeypot */}
            <input
              type="text"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              aria-hidden="true"
              tabIndex={-1}
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
            />
            <p className="mt-1.5 text-center text-xs" style={{ color: "var(--t3)" }}>
              Powered by Avidara · <a href="mailto:hello@avidara.co.za" style={{ color: "var(--t2)" }}>hello@avidara.co.za</a>
            </p>
          </div>
        </div>
      )}

      {/* Bubble button */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ backgroundColor: "var(--indigo)" }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: .4; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
