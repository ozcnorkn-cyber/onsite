"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
    <header className="sticky top-0 z-20 border-b border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:gap-8 md:px-5">
        <Link href="/" aria-label={copy.brand} className="shrink-0">
          <Wordmark />
        </Link>
        <nav className="flex items-center gap-3 md:gap-6">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "hidden text-sm font-semibold uppercase tracking-wide text-ink md:inline"
                    : "hidden text-sm font-semibold uppercase tracking-wide text-steel-deep md:inline"
                }
              >
                {copy[link.pl]}
              </Link>
            );
          })}
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
        </nav>
      </div>
      {open ? (
        <nav className="border-t border-ink/15 px-4 py-4 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 text-sm font-semibold uppercase tracking-wide"
              onClick={() => setOpenedAt(null)}
            >
              {copy[link.pl]}
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
