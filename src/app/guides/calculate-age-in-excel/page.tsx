import type { Metadata } from "next";
import { GuideLayout } from "@/components/GuideLayout";
import { getGuide } from "@/lib/guides";
import { siteUrl } from "@/lib/seo";

const guide = getGuide("calculate-age-in-excel");

export const metadata: Metadata = {
  title: guide.seoTitle,
  description: guide.seoDescription,
  alternates: { canonical: `${siteUrl}${guide.href}` },
  openGraph: {
    title: guide.seoTitle,
    description: guide.seoDescription,
    url: `${siteUrl}${guide.href}`,
    siteName: "Tulyro",
    type: "article",
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Tulyro — Free browser-only tools. No signup. No watermark." }],
  },
  twitter: {
    card: "summary_large_image",
    title: guide.seoTitle,
    description: guide.seoDescription,
    images: [`${siteUrl}/og-image.png`],
  },
};

export default function CalculateAgeInExcelPage() {
  return <GuideLayout guide={guide} />;
}
