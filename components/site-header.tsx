"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { CatalogSearch } from "./catalog-search";
import { CategoryBar } from "./category-tiles";
import { LanguageSwitch } from "./language-switch";
import { useQuote } from "./quote-store";
import { Wordmark } from "./wordmark";

export function SiteHeader({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const pathname = usePathname();
  const { count } = useQuote();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [offerOpen, setOfferOpen] = useState(false);
  const open = openedAt === pathname;

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 md:px-5">
        <Link href="/" aria-label={copy.brand} className="shrink-0">
          <Wordmark />
        </Link>
        <div className="min-w-36 flex-1">
          <Suspense fallback={<div className="h-10 border border-ink bg-white" aria-hidden />}>
            <CatalogSearch lang={lang} id="catalog-search" />
          </Suspense>
        </div>
        <Link
          href="/quote"
          className="btn h-10 shrink-0 px-3 py-0"
          aria-current={pathname === "/quote" ? "page" : undefined}
          aria-label={copy.quoteTitle}
        >
          <span className="hidden sm:inline">{copy.quoteTitle}</span>
          <span className="inline-flex min-w-6 justify-center border border-white px-1 sm:ml-2">{count}</span>
        </Link>
        <button
          type="button"
          className="btn-line h-10 md:hidden"
          aria-expanded={open}
          onClick={() => setOpenedAt(open ? null : pathname)}
        >
          {copy.menu}
        </button>
      </div>
      <nav className="mx-auto hidden max-w-7xl items-center gap-6 border-t border-ink/15 px-5 py-2 md:flex">
        <div
          className="relative"
          onMouseEnter={() => setOfferOpen(true)}
          onMouseLeave={() => setOfferOpen(false)}
        >
          <Link
            href="/equipment"
            className="text-sm font-semibold"
            aria-expanded={offerOpen}
            onFocus={() => setOfferOpen(true)}
          >
            {copy.navEquipment}
          </Link>
          {offerOpen ? (
            <div className="absolute left-0 top-full z-40 w-[34rem] max-w-[calc(100vw-2.5rem)] border border-ink bg-paper p-3">
              <CategoryBar lang={lang} />
            </div>
          ) : null}
        </div>
        <Link href="/#dostawa" className="text-sm font-semibold">
          {copy.navDelivery}
        </Link>
        <Link href="/about" className="text-sm font-semibold">
          {copy.navAbout}
        </Link>
        <Link href="/contact" className="text-sm font-semibold">
          {copy.navContact}
        </Link>
        <div className="ml-auto">
          <LanguageSwitch lang={lang} />
        </div>
      </nav>
      {open ? (
        <nav className="border-t border-ink/15 px-4 py-3 md:hidden">
          <div className="flex items-center justify-between">
            <Link href="/equipment" className="py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
              {copy.navEquipment}
            </Link>
            <LanguageSwitch lang={lang} />
          </div>
          <div className="py-2" onClick={() => setOpenedAt(null)}>
            <CategoryBar lang={lang} />
          </div>
          <Link href="/#dostawa" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navDelivery}
          </Link>
          <Link href="/about" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navAbout}
          </Link>
          <Link href="/contact" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navContact}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
