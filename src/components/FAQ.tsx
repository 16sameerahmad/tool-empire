import { Icon } from "@/components/icons";
import { createFaqJsonLd } from "@/lib/seo";
import type { FAQItem } from "@/lib/content";

export function FAQ({ items }: { items: FAQItem[] }) {
  const jsonLd = createFaqJsonLd(items);
  return (
    <section aria-labelledby="faq-heading" className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-secondary/10 text-secondary">
          <Icon name="quiz" className="h-4 w-4" />
        </span>
        <h2 id="faq-heading" className="font-display font-headline-sm text-headline-sm text-on-surface">
          Frequently Asked Questions
        </h2>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.question} className="group cursor-pointer rounded-xl bg-surface-container-low p-4">
            <summary className="flex list-none items-center justify-between gap-3 font-display font-headline-sm text-sm text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container">
              {item.question}
              <Icon name="keyboard_arrow_down" className="h-5 w-5 shrink-0 text-on-surface-variant transition-transform group-open:rotate-180" />
            </summary>
            <p className="mt-3 max-w-[720px] border-t border-surface-container pt-2 font-body-sm text-body-sm leading-[1.6] text-on-surface-variant">{item.answer}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
