"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookie-consent");
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-24 left-4 right-4 z-40 mx-auto max-w-xl rounded-2xl border p-4 shadow-lg sm:left-6 sm:right-auto sm:max-w-sm"
      style={{
        backgroundColor: "var(--surf)",
        borderColor: "var(--b2)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
        We use cookies to ensure the site works correctly and to understand how it is used.{" "}
        <a href="/privacy" className="underline hover:opacity-80" style={{ color: "var(--t)" }}>
          Privacy Policy
        </a>
      </p>
      <div className="flex gap-2">
        <button
          onClick={accept}
          className="flex-1 rounded-lg bg-[var(--indigo)] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition-colors hover:opacity-70"
          style={{ borderColor: "var(--b2)", color: "var(--t2)" }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}
