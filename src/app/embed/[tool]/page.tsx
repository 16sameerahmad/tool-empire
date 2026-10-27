import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTool, tools } from "@/lib/tools";
import { ToolPanel } from "@/components/ToolPanel";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return tools.filter((tool) => tool.live).map((tool) => ({ tool: tool.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const { tool: toolId } = await params;
  try {
    const tool = getTool(toolId);
    return {
      title: `${tool.title} (Embed Widget) | Tulyro`,
      description: `Embeddable ${tool.title} widget. Free, in-browser execution.`,
      robots: { index: false, follow: true },
      alternates: {
        canonical: `${siteUrl}${tool.href}`,
      },
    };
  } catch {
    return { title: "Embed Widget | Tulyro", robots: { index: false, follow: false } };
  }
}

export default async function EmbedPage({ params }: { params: Promise<{ tool: string }> }) {
  const { tool: toolId } = await params;
  let tool;
  try {
    tool = getTool(toolId);
  } catch {
    notFound();
  }

  const canonicalUrl = `${siteUrl}${tool.href}`;

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 flex flex-col justify-between">
      <div className="w-full max-w-4xl mx-auto">
        <header className="mb-4 flex items-center justify-between border-b border-surface-container pb-3">
          <div className="flex items-center gap-2">
            <span className="font-display font-headline-sm text-base sm:text-lg font-bold text-on-surface">
              {tool.title}
            </span>
          </div>
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener"
            className="rounded-full bg-surface-container-low px-2.5 py-1 font-label-sm text-xs font-medium text-primary hover:text-primary-container hover:bg-surface-container transition-colors"
          >
            Open in Tulyro ↗
          </a>
        </header>

        <main className="w-full">
          <ToolPanel kind={tool.id} />
        </main>
      </div>

      <footer className="mt-6 border-t border-surface-container pt-3 text-center">
        <p className="font-body-sm text-xs text-on-surface-variant">
          Powered by{" "}
          <a
            href={canonicalUrl}
            target="_blank"
            rel="noopener"
            className="font-semibold text-primary hover:underline"
          >
            Tulyro
          </a>{" "}
          • 100% Client-Side &amp; Private
        </p>
      </footer>
    </div>
  );
}
