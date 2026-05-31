"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";

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
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-1"
      style={{
        borderColor: hovered ? hexToRgba(ind.accent, 0.35) : "var(--b)",
        backgroundColor: hovered ? hexToRgba(ind.accent, 0.04) : "var(--surf)",
        boxShadow: hovered
          ? `0 10px 32px ${hexToRgba(ind.accent, 0.16)}, 0 0 0 1px ${hexToRgba(ind.accent, 0.12)}, 0 2px 6px rgba(0,0,0,.06)`
          : "none",
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

      <div className="flex flex-1 flex-col gap-3 p-4 pt-5">
        {/* Icon row */}
        <div className="flex items-start justify-between">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200"
            style={{
              backgroundColor: hovered ? hexToRgba(ind.accent, 0.15) : hexToRgba(ind.accent, 0.09),
              color: ind.accent,
              border: `1.5px solid ${hexToRgba(ind.accent, hovered ? 0.35 : 0.18)}`,
            }}
          >
            {ind.icon}
          </div>

          {/* Number → Arrow swap */}
          <div className="relative h-5 w-7 overflow-hidden">
            <span
              className="absolute right-0 top-0 text-[10px] font-bold tabular-nums transition-all duration-200"
              style={{
                color: "var(--t3)",
                opacity: hovered ? 0 : 1,
                transform: hovered ? "translateY(-7px)" : "translateY(0)",
                fontFamily: "var(--font-fraunces), serif",
              }}
            >
              {num}
            </span>
            <svg
              className="absolute right-0 top-0 transition-all duration-200"
              width="14" height="14" viewBox="0 0 16 16" fill="none"
              style={{
                color: ind.accentLight,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0)" : "translateY(7px)",
              }}
            >
              <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="flex-1">
          <p
            className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.12em]"
            style={{ color: ind.accentLight }}
          >
            {ind.sub}
          </p>
          <h3
            className="mb-1.5 text-sm font-bold leading-snug"
            style={{ color: "var(--t)" }}
          >
            {ind.label}
          </h3>
          <p className="text-xs leading-relaxed" style={{ color: "var(--t2)" }}>
            {ind.description}
          </p>
        </div>

        {/* Framework tags */}
        <div
          className="flex flex-wrap gap-1 border-t pt-3"
          style={{ borderColor: hovered ? hexToRgba(ind.accent, 0.15) : "var(--b)" }}
        >
          {ind.frameworks.map((f) => (
            <span
              key={f}
              className="rounded-full border px-2 py-0.5 text-[10px] transition-colors duration-200"
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
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {industries.map((ind, i) => (
        <FadeIn key={ind.href} delay={i * 60} className="h-full">
          <IndustryCard ind={{ ...ind, index: i }} />
        </FadeIn>
      ))}
    </div>
  );
}
