import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { company } from "@/lib/content";

export function SiteFooter({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const city = lang === "en" ? company.cityEn : company.cityPl;

  return (
    <footer className="px-5 pb-12 pt-20 text-sm leading-6">
      <p>
        {company.legalName}, {city}, {copy.since}
      </p>
      <p>
        {copy.emailLabel}: {copy.emailPlaceholder}
      </p>
      <p>
        {copy.phoneLabel}: {copy.phonePlaceholder}
      </p>
      <p className="mt-4 max-w-md">{copy.footer}</p>
      <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
        <Link href="/equipment">{copy.navEquipment}</Link>
        <Link href="/about">{copy.navAbout}</Link>
        <Link href="/contact">{copy.navContact}</Link>
        <Link href="/privacy">{copy.navPrivacy}</Link>
        <Link href="/terms">{copy.navTerms}</Link>
      </nav>
    </footer>
  );
}
