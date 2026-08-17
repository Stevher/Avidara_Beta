"use client";

import { useState } from "react";
import { categories, faqs } from "@/data/faq";

export default function FAQ({ standalone = false }: { standalone?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? faqs : faqs.filter((f) => f.category === filter);

  return (
    <section id="faq" className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-3xl">
        {/* Header - only shown when embedded on homepage */}
        {!standalone && (
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--indigo-light)" }}>
              FAQ
            </p>
            <h2
              className="mb-4 text-4xl font-bold leading-tight"
              style={{ color: "var(--t)", fontFamily: "var(--font-fraunces)" }}
            >
              Everything you need to know
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed" style={{ color: "var(--t2)" }}>
              From how we work and what we charge, to how we handle AI, data security, and confidentiality.
            </p>
          </div>
        )}

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
            style={{
              borderColor: filter === "all" ? "var(--indigo)" : "var(--b2)",
              backgroundColor: filter === "all" ? "var(--indigo)" : "transparent",
              color: filter === "all" ? "#fff" : "var(--t2)",
            }}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setFilter(c.id)}
              className="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
              style={{
                borderColor: filter === c.id ? "var(--indigo)" : "var(--b2)",
                backgroundColor: filter === c.id ? "var(--indigo)" : "transparent",
                color: filter === c.id ? "#fff" : "var(--t2)",
              }}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* FAQ items */}
        <div className="divide-y" style={{ borderColor: "var(--b)" }}>
          {filtered.map((item, i) => {
            const key = `${item.category}-${i}`;
            const isOpen = active === key;
            return (
              <div key={key} style={{ borderColor: "var(--b)" }}>
                <button
                  className="flex w-full items-start justify-between gap-6 py-5 text-left"
                  onClick={() => setActive(isOpen ? null : key)}
                >
                  <span className="text-sm font-semibold leading-relaxed" style={{ color: "var(--t)" }}>
                    {item.q}
                  </span>
                  <span
                    className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border transition-all"
                    style={{
                      borderColor: isOpen ? "var(--indigo)" : "var(--b2)",
                      backgroundColor: isOpen ? "var(--indigo)" : "transparent",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d={isOpen ? "M2 5h6" : "M5 2v6M2 5h6"}
                        stroke={isOpen ? "#fff" : "var(--t3)"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-6">
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      {item.a}
                    </p>
                    {item.callout && (
                      <div
                        className="mt-4 rounded-r-lg border-l-2 px-4 py-3 text-sm italic leading-relaxed"
                        style={{
                          borderColor: "var(--indigo)",
                          backgroundColor: "color-mix(in srgb, var(--indigo) 8%, transparent)",
                          color: "var(--t2)",
                        }}
                      >
                        {item.callout}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-sm" style={{ color: "var(--t2)" }}>
            Still have questions?
          </p>
          <a
            href="mailto:hello@avidara.co.za"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ borderColor: "var(--b2)", color: "var(--t)" }}
          >
            Email us at hello@avidara.co.za
          </a>
        </div>
      </div>
    </section>
  );
}
