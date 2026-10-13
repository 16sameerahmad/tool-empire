import Link from "next/link";
import type { ToolDefinition } from "@/lib/tools";
import { Icon } from "@/components/icons";
import { createBreadcrumbJsonLd } from "@/lib/seo";

export function Breadcrumb({ tool }: { tool: ToolDefinition }) {
  const jsonLd = createBreadcrumbJsonLd(tool);
  return (
    <>
      <nav aria-label="Breadcrumb" className="font-label-sm text-label-sm text-on-surface-variant">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link className="flex items-center gap-1 rounded text-primary transition-colors hover:text-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container" href="/">
              <Icon name="home" className="h-[14px] w-[14px]" />
              Home
            </Link>
          </li>
          <li aria-hidden="true">
            <Icon name="chevron_right" className="h-3 w-3 text-outline-variant" />
          </li>
          <li>
            <Link
              className="rounded text-primary transition-colors hover:text-primary-container focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
              href={`/${tool.cluster.toLowerCase()}/`}
            >
              {tool.cluster}
            </Link>
          </li>
          <li aria-hidden="true">
            <Icon name="chevron_right" className="h-3 w-3 text-outline-variant" />
          </li>
          <li aria-current="page" className="font-semibold text-on-surface">
            {tool.title}
          </li>
        </ol>
      </nav>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
