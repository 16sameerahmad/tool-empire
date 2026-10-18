import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { clusters, getToolsByCluster, tools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const indexableClusters = clusters.filter((cluster) => getToolsByCluster(cluster).length >= 2);
  const pages = [
    "/",
    "/tools/",
    "/guides/",
    ...guides.map((guide) => guide.href),
    ...indexableClusters.map((cluster) => `/${cluster.toLowerCase()}/`),
    "/about/",
    "/privacy/",
    "/terms/",
    "/contact/",
    ...tools.filter((tool) => tool.live).map((tool) => tool.href),
  ];
  return pages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date() }));
}
