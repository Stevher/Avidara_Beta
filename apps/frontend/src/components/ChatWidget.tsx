"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hi! I'm Avidara's assistant. Ask me anything about what we do, how it works, or whether we're a good fit for your team.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
  }, [messages, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      // Anthropic API requires conversation to start with a user message — strip the greeting
      const apiMessages = next.filter((m, i) => !(i === 0 && m.role === "assistant"));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "Sorry, I couldn't get a response. Please try again." }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "Something went wrong. Please try again or email hello@avidara.co.za." }]);
    } finally {
      setLoading(false);
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
      {/* Chat panel */}
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
