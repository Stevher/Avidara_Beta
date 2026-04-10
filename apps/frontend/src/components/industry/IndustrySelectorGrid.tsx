"use client";

import { useState } from "react";
import type { ReactNode } from "react";

interface Industry {
  href: string;
  label: string;
  sub: string;
  accent: string;
  accentLight: string;
  description: string;
  frameworks: string[];
  icon: ReactNode;
  wide?: boolean;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function IndustryCard({ ind }: { ind: Industry }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={ind.href}
      className={`group flex flex-col gap-4 rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-lg)] ${ind.wide ? "lg:col-span-2" : ""}`}
      style={{
        borderColor: hovered ? hexToRgba(ind.accent, 0.3) : "var(--b)",
        backgroundColor: "var(--surf)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: hexToRgba(ind.accent, 0.1),
            color: ind.accent,
            border: `1.5px solid ${hexToRgba(ind.accent, 0.2)}`,
          }}
        >
          {ind.icon}
        </div>
        <svg
          className="mt-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{ color: ind.accentLight }}
        >
          <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <div>
        <p className="mb-0.5 text-xs font-semibold uppercase tracking-widest" style={{ color: ind.accentLight }}>
          {ind.sub}
        </p>
        <h3 className="mb-2 text-lg font-bold" style={{ color: "var(--t)" }}>{ind.label}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--t3)" }}>{ind.description}</p>
      </div>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {ind.frameworks.map((f) => (
          <span
            key={f}
            className="rounded-full border px-2.5 py-0.5 text-[11px]"
            style={{ borderColor: "var(--b)", color: "var(--t3)", backgroundColor: "var(--bg)" }}
          >
            {f}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function IndustrySelectorGrid({ industries }: { industries: Industry[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind) => (
        <IndustryCard key={ind.href} ind={ind} />
      ))}
    </div>
  );
}
