"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { LanguageSwitch } from "./language-switch";
import { Wordmark } from "./wordmark";

const links = [
  { href: "/equipment", pl: "navEquipment", en: "navEquipment" },
  { href: "/about", pl: "navAbout", en: "navAbout" },
  { href: "/contact", pl: "navContact", en: "navContact" },
] as const;

export function SiteHeader({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const open = openedAt === pathname;

  return (
    <header className="sticky top-0 z-20 border-b border-ink/15 bg-paper">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-5 py-4">
        <Link href="/" aria-label={copy.brand}>
          <Wordmark />
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={
                    active
                      ? "text-sm font-semibold uppercase tracking-wide text-ink"
                      : "text-sm font-semibold uppercase tracking-wide text-steel-deep"
                  }
                >
                  {copy[link.pl]}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitch lang={lang} />
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
      {open ? (
        <nav className="border-t border-ink/15 px-5 py-4 md:hidden">
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
        </nav>
      ) : null}
    </header>
  );
}
