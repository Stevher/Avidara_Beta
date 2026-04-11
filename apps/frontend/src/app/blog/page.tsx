import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getAllPosts } from "@/content/blog";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulatory Insights & Compliance Blog | Avidara",
  description:
    "Practical guidance on SAHPRA submissions, pharmaceutical labelling, medical device compliance, and regulatory documentation for South African regulated industries.",
};

const CATEGORY_COLORS: Record<string, string> = {
  SAHPRA: "var(--indigo)",
  "Medical Devices": "var(--emerald)",
  "Consumer Health": "#10b981",
  Veterinary: "#f43f5e",
  Transport: "#ea580c",
  Compliance: "var(--indigo)",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-20 pt-32" style={{ backgroundColor: "var(--bg)" }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 5%, transparent 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: "var(--emerald)" }}>
              Regulatory Insights
            </p>
            <h1
              className="mb-4 text-5xl font-bold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              Compliance intelligence,
              <br />
              <em className="not-italic" style={{ color: "var(--indigo-light)" }}>in plain language.</em>
            </h1>
            <p className="mx-auto max-w-xl text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              Practical guidance on SAHPRA submissions, pharmaceutical labelling, and regulatory documentation for South African regulated industries.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="px-6 py-20" style={{ backgroundColor: "var(--bg2)" }}>
          <div className="mx-auto max-w-3xl">
            {posts.length === 0 ? (
              <p style={{ color: "var(--t3)" }}>No articles yet — check back soon.</p>
            ) : (
              <div className="flex flex-col gap-6">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border p-6 transition-all hover:border-[var(--b2)]"
                    style={{ borderColor: "var(--b)", backgroundColor: "var(--surf)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white"
                        style={{ backgroundColor: CATEGORY_COLORS[post.category] ?? "var(--indigo)" }}
                      >
                        {post.category}
                      </span>
                      <span className="text-xs" style={{ color: "var(--t3)" }}>
                        {new Date(post.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                        {" · "}
                        {post.readTime} read
                      </span>
                    </div>
                    <h2
                      className="text-xl font-bold leading-snug transition-colors group-hover:text-[var(--indigo-light)]"
                      style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
                    >
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--t2)" }}>
                      {post.excerpt}
                    </p>
                    <span className="text-xs font-semibold" style={{ color: "var(--indigo-light)" }}>
                      Read article →
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
