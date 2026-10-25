import { ToolLayout } from "@/components/ToolLayout";
import { ToolPanel } from "@/components/ToolPanel";
import { getContent } from "./content";
import { getTool } from "./tools";
import { createFaqJsonLd, createHowToJsonLd, createSoftwareApplicationJsonLd } from "./seo";

export function ToolPage({ toolId }: { toolId: string }) {
  const tool = getTool(toolId);
  const page = getContent(toolId);
  const howToJsonLd = createHowToJsonLd(tool, page.howTo);
  const appJsonLd = createSoftwareApplicationJsonLd(tool);
  const faqJsonLd = createFaqJsonLd(page.faq);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <ToolLayout tool={tool} intro={page.intro} definition={page.definition} howTo={page.howTo} content={page.content} faq={page.faq} sources={page.sources} guides={page.guides}>
        <ToolPanel kind={toolId} />
      </ToolLayout>
    </>
  );
}
