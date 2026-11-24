"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { CatalogSearch } from "./catalog-search";
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
      <div className="border-b border-ink/15">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-sm md:px-5">
          <p>{copy.tagline}</p>
          <LanguageSwitch lang={lang} />
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-5">
        <Link href="/" aria-label={copy.brand} className="shrink-0">
          <Wordmark />
        </Link>
        <div className="hidden min-w-0 flex-1 md:block">
          <CatalogSearch lang={lang} id="catalog-search" />
        </div>
        <Link
          href="/quote"
          className="btn ml-auto whitespace-nowrap px-2 py-2 md:ml-0 md:px-3"
          aria-current={pathname === "/quote" ? "page" : undefined}
        >
          {copy.quoteTitle}
          <span className="ml-2 inline-flex min-w-6 justify-center border border-white px-1">{count}</span>
        </Link>
        <button
          type="button"
          className="btn-line md:hidden"
          aria-expanded={open}
          onClick={() => setOpenedAt(open ? null : pathname)}
        >
          {copy.menu}
        </button>
      </div>
      <div className="mx-auto px-4 pb-3 md:hidden">
        <CatalogSearch lang={lang} id="catalog-search-mobile" />
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
            <div className="absolute left-0 top-full z-40 w-[28rem] border border-ink bg-paper p-3">
              <ul className="grid grid-cols-2 gap-2">
                {categories.map((category) => {
                  const name = lang === "en" ? category.en : category.pl;
                  return (
                    <li key={category.id}>
                      <Link
                        href={`/equipment/${category.id}`}
                        className="flex items-center gap-3 px-1 py-1"
                        onClick={() => setOfferOpen(false)}
                      >
                        <span className="clip-frame h-14 w-16 shrink-0 bg-white">
                          {category.image ? (
                            <Image src={category.image} alt="" fill className="object-contain" sizes="64px" />
                          ) : null}
                        </span>
                        <span className="text-sm font-semibold">{name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </div>
        <Link href="/equipment" className="text-sm font-semibold">
          {copy.navHire}
        </Link>
        <Link href="/#dostawa" className="text-sm font-semibold">
          {copy.navDelivery}
        </Link>
        <Link href="/about" className="text-sm font-semibold">
          {copy.navAbout}
        </Link>
        <Link href="/contact" className="text-sm font-semibold">
          {copy.navContact}
        </Link>
      </nav>
      {open ? (
        <nav className="border-t border-ink/15 px-4 py-3 md:hidden">
          <Link href="/equipment" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navEquipment}
          </Link>
          <Link href="/equipment" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navHire}
          </Link>
          <Link href="/#dostawa" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navDelivery}
          </Link>
          <Link href="/about" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navAbout}
          </Link>
          <Link href="/contact" className="block py-2 text-base font-semibold" onClick={() => setOpenedAt(null)}>
            {copy.navContact}
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/equipment/${category.id}`}
              className="block py-1.5 text-sm"
              onClick={() => setOpenedAt(null)}
            >
              {lang === "en" ? category.en : category.pl}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
