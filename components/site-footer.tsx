import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { company } from "@/lib/content";

export function SiteFooter({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const city = lang === "en" ? company.cityEn : company.cityPl;

  return (
    <footer className="border-t border-ink bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-2 md:px-5">
        <div>
          <p className="text-lg font-semibold">{copy.brand}</p>
          <p className="mt-2">{copy.tagline}</p>
          <p className="mt-4 text-sm">
            {company.legalName}, {city}, {copy.since}
          </p>
        </div>
        <nav className="flex flex-col gap-2 md:items-end">
          <Link href="/equipment">{copy.navEquipment}</Link>
          <Link href="/about">{copy.navAbout}</Link>
          <Link href="/contact">{copy.navContact}</Link>
          <Link href="/quote">{copy.quoteTitle}</Link>
          <Link href="/privacy">{copy.navPrivacy}</Link>
          <Link href="/terms">{copy.navTerms}</Link>
        </nav>
      </div>
    </footer>
  );
}
