import { ToolLayout } from "@/components/ToolLayout";
import { ToolPanel } from "@/components/ToolPanel";
import { getContent } from "./content";
import { getTool } from "./tools";
import {
  createBreadcrumbJsonLd,
  createFaqJsonLd,
  createHowToJsonLd,
  createSoftwareApplicationJsonLd,
} from "./seo";

export function ToolPage({ toolId }: { toolId: string }) {
  const tool = getTool(toolId);
  const page = getContent(toolId);
  const appJsonLd = createSoftwareApplicationJsonLd(tool);
  const breadcrumbJsonLd = createBreadcrumbJsonLd(tool);
  const howToJsonLd = page.howTo && page.howTo.length > 0 ? createHowToJsonLd(tool, page.howTo) : null;
  const faqJsonLd = page.faq && page.faq.length > 0 ? createFaqJsonLd(page.faq) : null;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {howToJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      )}
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}
      <ToolLayout tool={tool} intro={page.intro} definition={page.definition} howTo={page.howTo} content={page.content} faq={page.faq} sources={page.sources} guides={page.guides}>
        <ToolPanel kind={toolId} />
      </ToolLayout>
    </>
  );
}
