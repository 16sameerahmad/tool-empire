import { ToolLayout } from "@/components/ToolLayout";
import { ToolPanel } from "@/components/ToolPanel";
import { getContent } from "./content";
import { getTool } from "./tools";
import { createSoftwareApplicationJsonLd } from "./seo";

export function ToolPage({ toolId }: { toolId: string }) {
  const tool = getTool(toolId);
  const page = getContent(toolId);
  const appJsonLd = createSoftwareApplicationJsonLd(tool);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }} />
      <ToolLayout tool={tool} intro={page.intro} definition={page.definition} howTo={page.howTo} content={page.content} faq={page.faq} sources={page.sources} guides={page.guides}>
        <ToolPanel kind={toolId} />
      </ToolLayout>
    </>
  );
}
