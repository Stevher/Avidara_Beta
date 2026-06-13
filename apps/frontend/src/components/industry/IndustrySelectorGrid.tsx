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

  return (
    <a
      href={ind.href}
      className="group relative flex h-full items-center gap-3 overflow-hidden rounded-xl border py-3 pl-4 pr-3 transition-all duration-200 hover:-translate-y-0.5"
      style={{
        borderColor: hovered ? hexToRgba(ind.accent, 0.35) : "var(--b)",
        backgroundColor: hovered ? hexToRgba(ind.accent, 0.04) : "var(--surf)",
        boxShadow: hovered
          ? `0 8px 24px ${hexToRgba(ind.accent, 0.14)}, 0 0 0 1px ${hexToRgba(ind.accent, 0.1)}`
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute inset-y-0 left-0 w-[3px] transition-opacity duration-200"
        style={{
          background: `linear-gradient(180deg, ${ind.accent}, ${ind.accentLight})`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
        style={{
          backgroundColor: hovered ? hexToRgba(ind.accent, 0.15) : hexToRgba(ind.accent, 0.09),
          color: ind.accent,
          border: `1.5px solid ${hexToRgba(ind.accent, hovered ? 0.35 : 0.18)}`,
        }}
      >
        {ind.icon}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-bold leading-tight" style={{ color: "var(--t)" }}>
          {ind.label}
        </h3>
        <p
          className="truncate text-[11px] leading-tight transition-colors duration-200"
          style={{ color: hovered ? ind.accentLight : "var(--t3)" }}
        >
          {ind.sub}
        </p>
      </div>

      {/* Arrow */}
      <svg
        className="shrink-0 transition-all duration-200"
        width="15" height="15" viewBox="0 0 16 16" fill="none"
        style={{
          color: hovered ? ind.accentLight : "var(--t3)",
          opacity: hovered ? 1 : 0.4,
          transform: hovered ? "translateX(2px)" : "translateX(0)",
        }}
      >
        <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

export default function IndustrySelectorGrid({ industries }: { industries: Omit<Industry, "index">[] }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {industries.map((ind, i) => (
        <FadeIn key={ind.href} delay={Math.min(i * 40, 400)} className="h-full">
          <IndustryCard ind={{ ...ind, index: i }} />
        </FadeIn>
      ))}
    </div>
  );
}
