"use client";

import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { INDUSTRY_GROUPS, type Industry as BaseIndustry } from "@/data/industries";

interface Industry extends BaseIndustry {
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
  const [focused, setFocused] = useState(false);
  const active = hovered || focused;

  return (
    <a
      href={ind.href}
      className="group relative flex h-full items-center gap-3 overflow-hidden rounded-xl border py-3 pl-4 pr-3 transition-all duration-200 hover:-translate-y-0.5 focus-visible:-translate-y-0.5 focus:outline-none"
      style={{
        borderColor: active ? hexToRgba(ind.accent, 0.35) : "var(--b)",
        backgroundColor: active ? hexToRgba(ind.accent, 0.04) : "var(--surf)",
        boxShadow: active
          ? `0 8px 24px ${hexToRgba(ind.accent, 0.14)}, 0 0 0 1px ${hexToRgba(ind.accent, 0.1)}`
          : "none",
        outline: focused ? `2px solid ${hexToRgba(ind.accent, 0.55)}` : "none",
        outlineOffset: 2,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {/* Left accent bar */}
      <div
        className="absolute inset-y-0 left-0 w-[3px] transition-opacity duration-200"
        style={{
          background: `linear-gradient(180deg, ${ind.accent}, ${ind.accentLight})`,
          opacity: active ? 1 : 0.3,
        }}
      />

      {/* Icon */}
      <div
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all duration-200"
        style={{
          backgroundColor: active ? hexToRgba(ind.accent, 0.15) : hexToRgba(ind.accent, 0.09),
          color: ind.accent,
          border: `1.5px solid ${hexToRgba(ind.accent, active ? 0.35 : 0.18)}`,
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
          style={{ color: active ? ind.accentLight : "var(--t3)" }}
        >
          {ind.sub}
        </p>
      </div>

      {/* Arrow */}
      <svg
        className="shrink-0 transition-all duration-200"
        width="15" height="15" viewBox="0 0 16 16" fill="none"
        style={{
          color: active ? ind.accentLight : "var(--t3)",
          opacity: active ? 1 : 0.4,
          transform: active ? "translateX(2px)" : "translateX(0)",
        }}
      >
        <path d="M3 8H13M9 4L13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

export default function IndustrySelectorGrid({ industries }: { industries: Omit<Industry, "index">[] }) {
  let flatIndex = 0;

  return (
    <div className="flex flex-col gap-6">
      {INDUSTRY_GROUPS.map((group) => {
        const groupIndustries = industries.filter((ind) => ind.group === group);
        if (!groupIndustries.length) return null;

        return (
          <div key={group}>
            <p
              className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em]"
              style={{ color: "var(--t3)" }}
            >
              {group}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
              {groupIndustries.map((ind) => {
                const i = flatIndex++;
                return (
                  <FadeIn key={ind.href} delay={Math.min(i * 40, 400)} className="h-full">
                    <IndustryCard ind={{ ...ind, index: i }} />
                  </FadeIn>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
