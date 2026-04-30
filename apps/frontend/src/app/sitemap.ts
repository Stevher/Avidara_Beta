import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avidara.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPosts = getAllPosts().map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: siteUrl,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${siteUrl}/life-sciences`,                    lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/life-sciences/dossier-bridging`,   lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${siteUrl}/medical-devices`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/consumer-health`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/veterinary`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/transport`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/publishing`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/blog`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${siteUrl}/sample-report`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/faq`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${siteUrl}/terms`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    ...blogPosts,
  ];
}
