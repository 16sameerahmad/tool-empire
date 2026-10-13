import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="grid min-h-[60vh] place-items-center bg-background px-4 py-16 text-center">
        <div className="max-w-md rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-8 shadow-card">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary-fixed text-primary-container">
            <Icon name="search" className="h-6 w-6" />
          </span>
          <p className="mt-4 font-label-md text-label-md font-semibold uppercase tracking-wider text-primary">404</p>
          <h1 className="mt-2 font-display font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg">Page not found</h1>
          <p className="mt-3 font-body-md text-body-md text-on-surface-variant">The page you requested does not exist.</p>
          <Link
            href="/"
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary-container px-4 font-label-md text-label-md text-white shadow-button-glow transition-colors hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
          >
            Go home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
