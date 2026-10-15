import type { MetadataRoute } from "next";
import { getPublishedProjects } from "@/data/projects";
import { getSiteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  return [
    { url: new URL("/", base).toString(), changeFrequency: "monthly", priority: 1 },
    ...getPublishedProjects().map((project) => ({
      url: new URL(`/projects/${project.slug}`, base).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
