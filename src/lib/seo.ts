import type { Metadata } from "next";
import type { ToolDefinition } from "./tools";

export const siteUrl = "https://example.com";

export function createToolMetadata(tool: ToolDefinition): Metadata {
  const description = `${tool.description} Free, browser-only, with no signup or watermark.`;
  const metadata: Metadata = {
    title: `${tool.title} | Tool Empire`,
    description,
    alternates: {
      canonical: `${siteUrl}${tool.href}`,
    },
    openGraph: {
      title: `${tool.title} | Tool Empire`,
      description,
      url: `${siteUrl}${tool.href}`,
      siteName: "Tool Empire",
      type: "website",
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
