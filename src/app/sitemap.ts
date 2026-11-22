import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteConfig.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...getAllProducts().map((p) => ({
      url: `${siteConfig.url}/products/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p.rank === 1 ? 0.8 : 0.6,
    })),
  ];
}
