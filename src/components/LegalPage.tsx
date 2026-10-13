import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";
import { createSimpleBreadcrumbJsonLd } from "@/lib/seo";

export function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  const breadcrumbJsonLd = createSimpleBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: title, path },
  ]);
  return (
    <>
      <Header />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <main className="w-full bg-background">
        <section className="w-full bg-midnight px-6 py-10 text-white shadow-md">
          <div className="mx-auto max-w-shell">
            <nav className="mb-4 flex items-center gap-1.5 font-label-sm text-label-sm text-tertiary-fixed-dim" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <Icon name="chevron_right" className="h-3 w-3" />
              <span aria-current="page" className="font-semibold text-white">
                {title}
              </span>
            </nav>
            <h1 className="font-display font-headline-lg text-headline-lg-mobile tracking-tight text-white md:text-headline-lg">{title}</h1>
          </div>
        </section>
        <div className="mx-auto max-w-3xl px-6 py-10">
          <article className="rounded-xl border border-outline-variant/60 bg-surface-container-lowest p-6 shadow-card md:p-8 [&_h2]:mt-8 [&_h2]:font-display [&_h2]:font-headline-sm [&_h2]:text-headline-sm [&_h2]:text-on-surface [&_p]:mt-3 [&_p]:font-body-md [&_p]:text-body-md [&_p]:leading-[1.6] [&_p]:text-on-surface-variant [&_a]:text-primary [&_a]:underline">
            {children}
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
