"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-notice-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("cookie-notice-dismissed", "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-28 left-4 right-4 z-40 mx-auto max-w-xl rounded-2xl border p-4 shadow-lg sm:bottom-24 sm:left-6 sm:right-auto sm:max-w-sm"
      style={{
        backgroundColor: "var(--surf)",
        borderColor: "var(--b2)",
        boxShadow: "var(--shadow-lg)",
      }}
    >
      <p className="mb-3 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
        This site uses privacy-friendly, cookieless analytics to understand how it's used - no tracking cookies, nothing to opt into.{" "}
        <a href="/privacy" className="underline hover:opacity-80" style={{ color: "var(--t)" }}>
          Privacy Policy
        </a>
      </p>
      <button
        onClick={dismiss}
        className="w-full rounded-lg bg-[var(--indigo)] px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
      >
        Got it
      </button>
    </div>
  );
}
