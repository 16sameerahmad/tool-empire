import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Only /api/ is blocked: /_next/ holds the CSS/JS render resources
        // Googlebot needs, and /embed/ must stay crawlable so its noindex +
        // canonical are honoured (a disallowed URL's noindex is never seen).
        disallow: ["/api/"],
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
          "Barkrowler",
          "AspiegelBot",
          "CriteoBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
