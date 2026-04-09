"use client";

import { useState, useEffect, useRef } from "react";
import Logo from "@/components/Logo";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

export default function LoginModal({ open, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setEmail("");
      setPassword("");
      setError("");
      setTimeout(() => emailRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Simulate a brief loading state — will be replaced with real auth later
    setTimeout(() => {
      setLoading(false);
      setError("Access to the platform is coming soon. We'll be in touch at " + email);
    }, 1000);
  }

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50"
        style={{ backgroundColor: "rgba(0,0,0,.6)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-8 shadow-2xl"
        style={{
          backgroundColor: "var(--bg)",
          borderColor: "var(--b2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-lg transition-opacity hover:opacity-60"
          style={{ color: "var(--t3)" }}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <Logo height={32} />
        </div>

        <h2 className="mb-1 text-center text-xl font-bold" style={{ color: "var(--t)" }}>
          Sign in to Avidara
        </h2>
        <p className="mb-6 text-center text-sm" style={{ color: "var(--t2)" }}>
          Platform access for registered clients
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold" style={{ color: "var(--t2)" }}>
              Email address
            </label>
            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="rounded-lg border px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                borderColor: "var(--b2)",
                backgroundColor: "var(--surf)",
                color: "var(--t)",
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold" style={{ color: "var(--t2)" }}>
                Password
              </label>
              <button
                type="button"
                className="text-xs transition-opacity hover:opacity-70"
                style={{ color: "var(--indigo-light)" }}
              >
                Forgot password?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="rounded-lg border px-3 py-2.5 text-sm outline-none transition-all"
              style={{
                borderColor: "var(--b2)",
                backgroundColor: "var(--surf)",
                color: "var(--t)",
              }}
            />
          </div>

          {error && (
            <div
              className="rounded-lg border px-3 py-2.5 text-xs leading-relaxed"
              style={{
                borderColor: "rgba(79,70,229,.3)",
                backgroundColor: "rgba(79,70,229,.06)",
                color: "var(--t2)",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-lg py-2.5 text-sm font-semibold text-white transition-all disabled:opacity-60"
            style={{ backgroundColor: "var(--indigo)" }}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs" style={{ color: "var(--t3)" }}>
          No account?{" "}
          <a href="mailto:hello@avidara.co.za?subject=Platform Access Request" style={{ color: "var(--t2)" }} className="underline hover:opacity-80">
            Request access
          </a>
        </p>
      </div>
    </>
  );
}
