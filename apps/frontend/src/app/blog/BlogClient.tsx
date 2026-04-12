"use client";

import { useState } from "react";
import Link from "next/link";
import type { PostMeta } from "@/content/blog";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  SAHPRA:           { bg: "#ede9fe", text: "#4f46e5" },  // indigo  — pharma
  "Medical Devices":{ bg: "#e0f2fe", text: "#0891b2" },  // cyan    — medical devices
  "Consumer Health":{ bg: "#d1fae5", text: "#059669" },  // emerald — consumer health
  Veterinary:       { bg: "#ffe4e6", text: "#f43f5e" },  // rose    — veterinary
  Transport:        { bg: "#ffedd5", text: "#ea580c" },  // orange  — transport
  Compliance:       { bg: "#e0e7ff", text: "#4338ca" },  // indigo  — compliance
};

function CategoryPill({ cat }: { cat: string }) {
  const c = CATEGORY_COLORS[cat] ?? { bg: "#e0e7ff", text: "#3730a3" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 700,
      padding: "3px 9px", borderRadius: 999, letterSpacing: "0.04em", whiteSpace: "nowrap" as const }}>
      {cat}
    </span>
  );
}

export default function BlogClient({ posts }: { posts: PostMeta[] }) {
  const [active, setActive] = useState("All");

  const categories = ["All", ...Array.from(new Set(posts.map(p => p.category)))];
  const filtered = active === "All" ? posts : posts.filter(p => p.category === active);

  return (
    <section className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
      <div className="mx-auto max-w-6xl">

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {categories.map(cat => {
            const isActive = cat === active;
            const c = cat === "All" ? null : (CATEGORY_COLORS[cat] ?? null);
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  padding: "7px 18px", borderRadius: 999, fontSize: 13, fontWeight: 600,
                  cursor: "pointer", transition: "all .15s",
                  border: isActive ? "none" : "1px solid var(--b)",
                  background: isActive
                    ? (c ? c.bg : "var(--indigo)")
                    : "var(--surf)",
                  color: isActive
                    ? (c ? c.text : "#fff")
                    : "var(--t2)",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="mb-8 text-sm" style={{ color: "var(--t3)" }}>
          {filtered.length} article{filtered.length !== 1 ? "s" : ""}
          {active !== "All" ? ` in ${active}` : ""}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p style={{ color: "var(--t3)" }}>No articles in this category yet.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg"
                style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)", textDecoration: "none" }}
              >
                {/* Card top accent by category */}
                <div style={{
                  height: 4, borderRadius: "12px 12px 0 0",
                  background: (CATEGORY_COLORS[post.category] ?? { text: "#4f46e5" }).text,
                }} />

                <div className="flex flex-1 flex-col gap-3 p-6">
                  {/* Meta row */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <CategoryPill cat={post.category} />
                    <span className="text-xs" style={{ color: "var(--t3)" }}>
                      {new Date(post.date).toLocaleDateString("en-ZA", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg font-bold leading-snug transition-colors group-hover:text-[var(--indigo-light)]"
                    style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                  >
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="flex-1 text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--b)" }}>
                    <span className="text-xs" style={{ color: "var(--t3)" }}>{post.readTime} read</span>
                    <span className="text-xs font-semibold transition-colors group-hover:text-[var(--indigo)]"
                      style={{ color: "var(--t3)" }}>
                      Read article →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
