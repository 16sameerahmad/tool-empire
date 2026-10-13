import { ToolLayout } from "@/components/ToolLayout";
import { ToolPanel } from "@/components/ToolPanel";
import { getContent } from "./content";
import { getTool } from "./tools";

export function ToolPage({ toolId }: { toolId: string }) {
  const tool = getTool(toolId);
  const page = getContent(toolId);
  return <ToolLayout tool={tool} intro={page.intro} howTo={page.howTo} content={page.content} faq={page.faq}><ToolPanel kind={toolId} /></ToolLayout>;
}
