import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.avidara.co.za";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl,                          lastModified: new Date(), changeFrequency: "weekly",  priority: 1   },
    { url: `${siteUrl}/life-sciences`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/medical-devices`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/consumer-health`,     lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/veterinary`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/transport`,           lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/blog`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${siteUrl}/faq`,                 lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${siteUrl}/terms`,               lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
