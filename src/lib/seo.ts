import type { Metadata } from "next";
import type { ToolDefinition } from "./tools";
import { tools } from "./tools";

export const siteUrl = "https://tulyro.online";

/**
 * Date the site content was last substantively updated (YYYY-MM-DD).
 * Bump ONLY when tool-page copy, FAQs, or site copy actually change.
 * Never auto-generate per build — a dateModified that moves on every
 * deploy without a content change is dishonest.
 */
export const contentUpdated = "2026-11-13";

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

  return metadata;
}

/** Shared OG/Twitter metadata for hub, directory, and homepage pages: own title/description/URL, never the layout defaults. */
export function createPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}${path}` },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
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
}

export function createBreadcrumbJsonLd(tool: ToolDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
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

/** WebApplication JSON-LD. Browser-only tool, no download, no price, no invented ratings or counts. */
export function createWebApplicationJsonLd(tool: ToolDefinition) {
  const url = `${siteUrl}${tool.href}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": url,
    name: tool.title,
    applicationCategory: "UtilitiesApplication",
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    url,
    description: tool.seoDescription ?? tool.description,
    dateModified: contentUpdated,
    author: { "@id": `${siteUrl}/#sameer-ahmad` },
    publisher: { "@id": `${siteUrl}/#organization` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}

/** Article JSON-LD for guide pages. Author is Sameer Ahmad, founder — a real person, no invented credentials. */
export function createArticleJsonLd(article: { headline: string; description: string; path: string }) {
  const url = `${siteUrl}${article.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": url,
    headline: article.headline,
    description: article.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    dateModified: contentUpdated,
    author: {
      "@type": "Person",
      "@id": `${siteUrl}/#sameer-ahmad`,
      name: "Sameer Ahmad",
      url: `${siteUrl}/about/`,
      jobTitle: "Founder & Lead Developer",
    },
    publisher: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Tulyro",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo.svg` },
    },
  };
}

/** AboutPage JSON-LD. The page content is the Organization's about text. */
export function createAboutPageJsonLd() {
  const url = `${siteUrl}/about/`;
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": url,
    url,
    name: "About Tulyro",
    mainEntity: { "@id": `${siteUrl}/#organization` },
  };
}

/** ContactPage JSON-LD. Email only — the site has no phone, address, or contact form. */
export function createContactPageJsonLd() {
  const url = `${siteUrl}/contact/`;
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": url,
    url,
    name: "Contact Tulyro",
    mainEntity: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      email: "Tulyrotools@gmail.com",
    },
  };
}

/** CollectionPage + ItemList JSON-LD for hub, directory, and guide-index pages.
 *  Items are generated from the live catalogue / guide list so the list cannot
 *  go stale. Same `item` pattern as the homepage ItemList. */
export function createCollectionPageJsonLd(page: {
  path: string;
  name: string;
  items: { name: string; url: string; type: string }[];
}) {
  const url = `${siteUrl}${page.path}`;
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: page.name,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: page.items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": item.type,
          "@id": item.url,
          name: item.name,
          url: item.url,
        },
      })),
    },
  };
}

/** WebSite + Organization entity info for the homepage. No invented contact details. */
export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: "Tulyro Tools",
        alternateName: "Tulyro",
        url: siteUrl,
        description: "Free browser-only tools. No signup. No watermark. Nothing you enter is sent to a server.",
        dateModified: contentUpdated,
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Tulyro",
        alternateName: "Tulyro Tools",
        url: siteUrl,
        logo: `${siteUrl}/logo.svg`,
        sameAs: [
          "https://www.producthunt.com/products/tulyro",
          "https://github.com/16sameerahmad/tool-empire",
          "https://dev.to/tulyro",
        ],
        email: "Tulyrotools@gmail.com",
        description: "Open-source, free browser-only utility tools and calculators. Zero server uploads, zero tracking.",
        founder: {
          "@type": "Person",
          "@id": `${siteUrl}/#sameer-ahmad`,
          name: "Sameer Ahmad",
          jobTitle: "Founder & Lead Developer",
          sameAs: ["https://github.com/16sameerahmad"],
        },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#tools`,
        name: "Tulyro Free Tools",
        itemListElement: tools
          .filter((tool) => tool.live)
          .map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "WebApplication",
              "@id": `${siteUrl}${tool.href}`,
              name: tool.title,
              url: `${siteUrl}${tool.href}`,
            },
          })),
      },
    ],
  };
}
