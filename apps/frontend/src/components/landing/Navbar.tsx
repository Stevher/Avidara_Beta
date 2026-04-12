"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import LoginModal from "@/components/LoginModal";

const links = [
  { label: "Platform", href: "/#platform" },
  { label: "Industries", href: "/#industries" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Why Avidara", href: "/#why" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
];

export default function Navbar({ alwaysOpaque = false }: { alwaysOpaque?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(alwaysOpaque);
  const [loginOpen, setLoginOpen] = useState(false);

  useEffect(() => {
    if (alwaysOpaque) return;
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [alwaysOpaque]);

  const opaque = alwaysOpaque || scrolled;

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 border-b transition-all"
        style={{
          borderColor: opaque ? "var(--b)" : "transparent",
          backgroundColor: opaque ? "color-mix(in srgb, var(--bg) 85%, transparent)" : "transparent",
          backdropFilter: opaque ? "blur(12px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center">
            <Logo height={44} />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:text-[var(--t)]"
                style={{ color: "var(--t2)" }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <button
              onClick={() => setLoginOpen(true)}
              className="text-sm transition-colors hover:text-[var(--t)]"
              style={{ color: "var(--t2)" }}
            >
              Log in
            </button>
            <a
              href="/#book"
              className="rounded-lg bg-[var(--indigo)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
            >
              Book a review
            </a>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
              style={{ borderColor: "var(--b)", color: "var(--t2)" }}
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t px-6 py-4 md:hidden" style={{ borderColor: "var(--b)", backgroundColor: "var(--bg)" }}>
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm transition-colors"
                  style={{ color: "var(--t2)" }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => { setOpen(false); setLoginOpen(true); }}
                className="rounded-lg px-3 py-2.5 text-left text-sm transition-colors"
                style={{ color: "var(--t2)" }}
              >
                Log in
              </button>
              <a
                href="/#book"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-[var(--indigo)] px-3 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[var(--indigo-deep)]"
              >
                Book a review
              </a>
            </div>
          </div>
        )}
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
