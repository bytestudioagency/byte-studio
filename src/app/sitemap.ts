import type { MetadataRoute } from "next";
import { legal } from "@/lib/legal";
import { projects, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date(site.updated);
  const legalUpdated = new Date(`${legal.updated} UTC`); // "17 November 2026", read as UTC so the day doesn't shift
  return [
    { url: site.url, lastModified: updated, changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/work/${p.id}`,
      lastModified: updated,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${site.url}/privacy`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.2 },
  ];
}
