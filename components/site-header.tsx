"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { LanguageSwitch } from "./language-switch";
import { useQuote } from "./quote-store";
import { Wordmark } from "./wordmark";

const links = [
  { href: "/equipment", pl: "navEquipment", en: "navEquipment" },
  { href: "/about", pl: "navAbout", en: "navAbout" },
  { href: "/contact", pl: "navContact", en: "navContact" },
] as const;

export function SiteHeader({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const pathname = usePathname();
  const { count } = useQuote();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-paper">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-2.5 md:px-5">
        <Link href="/" aria-label={copy.brand} className="shrink-0">
          <Wordmark />
        </Link>
        <nav className="hidden items-center gap-5 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={active ? "text-sm font-semibold text-ink" : "text-sm font-semibold text-steel-deep"}
              >
                {copy[link.pl]}
              </Link>
            );
          })}
        </nav>
        <form action="/equipment" className="hidden min-w-0 flex-1 md:block">
          <label className="sr-only" htmlFor="catalog-search">
            {copy.searchLabel}
          </label>
          <input
            id="catalog-search"
            type="search"
            name="q"
            placeholder={copy.searchPlaceholder}
            className="w-full border border-ink bg-white px-3 py-2 text-sm text-ink"
          />
        </form>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/quote"
            className="btn whitespace-nowrap px-2 py-2 md:px-3"
            aria-current={pathname === "/quote" ? "page" : undefined}
          >
            {copy.quoteTitle}
            <span className="ml-2 inline-flex min-w-6 justify-center border border-white px-1">
              {count}
            </span>
          </Link>
          <span className="hidden md:inline-flex">
            <LanguageSwitch lang={lang} />
          </span>
          <button
            type="button"
            className="btn-line md:hidden"
            aria-expanded={open}
            onClick={() => setOpenedAt(open ? null : pathname)}
          >
            {copy.menu}
          </button>
        </div>
      </div>
      <form action="/equipment" className="mx-auto max-w-7xl px-4 pb-3 md:hidden">
        <label className="sr-only" htmlFor="catalog-search-mobile">
          {copy.searchLabel}
        </label>
        <input
          id="catalog-search-mobile"
          type="search"
          name="q"
          placeholder={copy.searchPlaceholder}
          className="w-full border border-ink bg-white px-3 py-2 text-sm text-ink"
        />
      </form>
      <nav className="mx-auto hidden max-w-7xl gap-x-5 border-t border-ink/20 px-5 py-2 md:flex">
        {categories.map((category) => {
          const href = `/equipment/${category.id}`;
          const active = pathname === href;
          const name = lang === "en" ? category.en : category.pl;
          return (
            <Link
              key={category.id}
              href={href}
              className={active ? "text-sm font-semibold" : "text-sm text-steel-deep"}
            >
              {name}
            </Link>
          );
        })}
      </nav>
      {open ? (
        <nav className="border-t border-ink/20 px-4 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-base font-semibold"
              onClick={() => setOpenedAt(null)}
            >
              {copy[link.pl]}
            </Link>
          ))}
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
          <div className="pt-3">
            <LanguageSwitch lang={lang} />
          </div>
        </nav>
      ) : null}
    </header>
  );
}
