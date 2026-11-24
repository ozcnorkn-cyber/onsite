import Link from "next/link";
import type { Lang } from "@/lib/i18n";
import { t } from "@/lib/copy";
import { company } from "@/lib/content";
import { Wordmark } from "./wordmark";

export function SiteFooter({ lang }: { lang: Lang }) {
  const copy = t(lang);
  const city = lang === "en" ? company.cityEn : company.cityPl;

  return (
    <footer className="border-t border-ink/15 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-[1.4fr_1fr]">
        <div>
          <Wordmark variant="footer" />
          <p className="mt-6 max-w-md text-sm leading-6">{copy.footer}</p>
          <p className="mt-4 text-sm text-steel-deep">
            {company.legalName}, {city}, {copy.since}
          </p>
          <p className="mt-2 text-sm text-steel-deep">
            {copy.emailLabel}: {copy.emailPlaceholder}
          </p>
          <p className="text-sm text-steel-deep">
            {copy.phoneLabel}: {copy.phonePlaceholder}
          </p>
        </div>
        <nav className="flex flex-col gap-2 text-sm font-semibold uppercase tracking-wide">
          <Link href="/equipment">{copy.navEquipment}</Link>
          <Link href="/about">{copy.navAbout}</Link>
          <Link href="/contact">{copy.navContact}</Link>
          <Link href="/privacy">{copy.navPrivacy}</Link>
          <Link href="/terms">{copy.navTerms}</Link>
        </nav>
      </div>
    </footer>
  );
}
