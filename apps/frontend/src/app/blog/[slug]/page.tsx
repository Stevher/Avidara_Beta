import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import CTA from "@/components/landing/CTA";
import { getAllPosts, getPost } from "@/content/blog";
import { notFound } from "next/navigation";
import Link from "next/link";
import { marked } from "marked";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.meta.title} | Avidara`,
    description: post.meta.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { meta, content } = post;
  const html = await marked(content, { gfm: true, breaks: false });

  return (
    <>
      <Navbar />
      <main>
        {/* Header */}
        <section className="relative overflow-hidden px-6 pb-16 pt-32" style={{ backgroundColor: "var(--bg)" }}>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, var(--b2) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse 70% 60% at 50% 10%, black 5%, transparent 100%)",
            }}
          />
          <div className="relative z-10 mx-auto max-w-3xl">
            <Link
              href="/blog"
              className="mb-6 inline-flex items-center gap-1.5 text-xs font-medium transition-opacity hover:opacity-70"
              style={{ color: "var(--t3)" }}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All articles
            </Link>

            <div className="mb-4 flex items-center gap-3">
              <span
                className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white"
                style={{ backgroundColor: "var(--indigo)" }}
              >
                {meta.category}
              </span>
              <span className="text-xs" style={{ color: "var(--t3)" }}>
                {new Date(meta.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                {" · "}
                {meta.readTime} read
              </span>
            </div>

            <h1
              className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
              style={{ fontFamily: "var(--font-fraunces), serif", color: "var(--t)" }}
            >
              {meta.title}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: "var(--t2)" }}>
              {meta.excerpt}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="px-6 py-16" style={{ backgroundColor: "var(--bg2)" }}>
          <div
            className="prose mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </section>

        <div className="gradient-divider" />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
