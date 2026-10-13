import type { Metadata } from "next";
import type { ToolDefinition } from "./tools";

export const siteUrl = "https://example.com";

/**
 * Date the site content was last substantively updated (YYYY-MM-DD).
 * Bump ONLY when tool-page copy, FAQs, or site copy actually change.
 * Never auto-generate per build — a dateModified that moves on every
 * deploy without a content change is dishonest.
 */
export const contentUpdated = "2026-10-13";

const ogImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Tulyro — Free browser-only tools. No signup. No watermark.",
};

export function createToolMetadata(tool: ToolDefinition): Metadata {
  const title = tool.seoTitle ?? `${tool.title} | Tulyro`;
  const description = tool.seoDescription ?? `${tool.description} Free, browser-only, with no signup or watermark.`;
  const metadata: Metadata = {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}${tool.href}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${tool.href}`,
      siteName: "Tulyro",
      type: "website",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${siteUrl}/og-image.png`],
    },
  };

  if (tool.id === "emi-calculator") {
    metadata.alternates = {
      canonical: `${siteUrl}${tool.href}`,
      languages: {
        "en-IN": `${siteUrl}${tool.href}`,
        "en-US": `${siteUrl}/calculators/mortgage-calculator/`,
      },
    };
  }
  if (tool.id === "mortgage-calculator") {
    metadata.alternates = {
      canonical: `${siteUrl}${tool.href}`,
      languages: {
        "en-IN": `${siteUrl}/calculators/emi-calculator/`,
        "en-US": `${siteUrl}${tool.href}`,
      },
    };
  }

  return metadata;
}

export function createBreadcrumbJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: tool.cluster, item: `${siteUrl}/${tool.cluster.toLowerCase()}/` },
      { "@type": "ListItem", position: 3, name: tool.title, item: `${siteUrl}${tool.href}` },
    ],
  };
}

/** BreadcrumbList for hub / directory / legal pages (visual breadcrumb must match). */
export function createSimpleBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function createFaqJsonLd(faq: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** HowTo JSON-LD. Steps must match the visible "How to use" list exactly. */
export function createHowToJsonLd(tool: ToolDefinition, steps: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to use the ${tool.title}`,
    step: steps.map((text) => ({ "@type": "HowToStep", text })),
  };
}

/** SoftwareApplication JSON-LD. Free tool, no price, no invented ratings or counts. */
export function createSoftwareApplicationJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    url: `${siteUrl}${tool.href}`,
    description: tool.seoDescription ?? tool.description,
    dateModified: contentUpdated,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

/** WebSite + Organization entity info for the homepage. No invented contact details. */
export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Tulyro",
        url: siteUrl,
        description: "Free browser-only tools. No signup. No watermark. Nothing you enter is sent to a server.",
        dateModified: contentUpdated,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Tulyro",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        description: "Free browser-only tools. No signup. No watermark.",
      },
    ],
  };
}
