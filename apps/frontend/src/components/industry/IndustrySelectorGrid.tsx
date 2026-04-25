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
  index: number;
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function IndustryCard({ ind }: { ind: Industry }) {
  const [hovered, setHovered] = useState(false);
  const num = String(ind.index + 1).padStart(2, "0");

  return (
    <a
      href={ind.href}
      className="group relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-1"
      style={{
        borderColor: hovered ? hexToRgba(ind.accent, 0.35) : "var(--b)",
        backgroundColor: hovered ? hexToRgba(ind.accent, 0.04) : "var(--surf)",
        boxShadow: hovered ? `0 12px 40px ${hexToRgba(ind.accent, 0.12)}, 0 2px 8px rgba(0,0,0,.08)` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Colored top accent bar */}
      <div
        className="absolute inset-x-0 top-0 h-[3px] transition-opacity duration-200"
        style={{
          background: `linear-gradient(90deg, ${ind.accent}, ${ind.accentLight})`,
          opacity: hovered ? 1 : 0.25,
        }}
      />

      <div className="flex flex-1 flex-col gap-5 p-6 pt-7">
        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200"
            style={{
              backgroundColor: hovered ? hexToRgba(ind.accent, 0.15) : hexToRgba(ind.accent, 0.09),
              color: ind.accent,
              border: `1.5px solid ${hexToRgba(ind.accent, hovered ? 0.35 : 0.18)}`,
            }}
          >
            {ind.icon}
          </div>

          {/* Number → Arrow swap */}
          <div className="relative h-6 w-8 overflow-hidden">
            <span
              className="absolute right-0 top-0 text-[11px] font-bold tabular-nums transition-all duration-200"
              style={{
                color: "var(--t3)",
                opacity: hovered ? 0 : 1,
                transform: hovered ? "translateY(-8px)" : "translateY(0)",
                fontFamily: "var(--font-fraunces), serif",
              }}
            >
              {num}
            </span>
            <svg
              className="absolute right-0 top-0.5 transition-all duration-200"
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              style={{
                color: ind.accentLight,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(8px)",
              }}
            >
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p
            className="mb-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: ind.accentLight }}
          >
            {ind.sub}
          </p>
          <h3
            className="mb-3 text-xl font-bold leading-snug"
            style={{ color: "var(--t)" }}
          >
            {ind.label}
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
            {ind.description}
          </p>
        </div>

        {/* Framework tags */}
        <div
          className="flex flex-wrap gap-1.5 border-t pt-4"
          style={{ borderColor: hovered ? hexToRgba(ind.accent, 0.15) : "var(--b)" }}
        >
          {ind.frameworks.map((f) => (
            <span
              key={f}
              className="rounded-full border px-2.5 py-0.5 text-[11px] transition-colors duration-200"
              style={{
                borderColor: hovered ? hexToRgba(ind.accent, 0.2) : "var(--b)",
                color: hovered ? ind.accentLight : "var(--t3)",
                backgroundColor: "transparent",
              }}
            >
              {f}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
}

export default function IndustrySelectorGrid({ industries }: { industries: Omit<Industry, "index">[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <IndustryCard key={ind.href} ind={{ ...ind, index: i }} />
      ))}
    </div>
  );
}
