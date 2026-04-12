import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { getAllPosts } from "@/content/blog";
import BlogClient from "./BlogClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Regulatory Insights & Compliance Blog | Avidara",
  description:
    "Practical guidance on SAHPRA submissions, pharmaceutical labelling, medical device compliance, and regulatory documentation for South African regulated industries.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32" style={{ backgroundColor: "var(--bg)" }}>
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

        <BlogClient posts={posts} />
      </main>
      <Footer />
    </>
  );
}
