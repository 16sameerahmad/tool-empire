import type { MetadataRoute } from "next";
import { contentUpdated, siteUrl } from "@/lib/seo";
import { tools } from "@/lib/tools";
import { guides } from "@/lib/guides";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Hubs are listed explicitly: hub membership must not depend on how many
  // tools a cluster happens to hold. lastModified reuses contentUpdated —
  // the date site copy last changed — never the build timestamp.
  const pages = [
    "/",
    "/tools/",
    "/guides/",
    "/calculators/",
    "/text/",
    "/dev/",
    "/fun/",
    "/media/",
    ...guides.map((guide) => guide.href),
    "/about/",
    "/privacy/",
    "/terms/",
    "/contact/",
    ...tools.filter((tool) => tool.live).map((tool) => tool.href),
  ];
  return pages.map((path) => ({ url: `${siteUrl}${path}`, lastModified: new Date(contentUpdated) }));
}
