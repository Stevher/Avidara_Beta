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
    alternates: { canonical: `https://www.avidara.co.za/blog/${slug}` },
  };
}