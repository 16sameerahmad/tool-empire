import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/embed/"],
      },
      {
        // Malicious scrapers, content thieves, and vulnerability scanners
        userAgent: [
          "PetalBot",
          "AhrefsBot",
          "SemrushBot",
          "MJ12bot",
          "DotBot",
          "DataForSeoBot",
          "MegaIndex",
          "Seekport",
          "BLEXBot",
          "ZoominfoBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
