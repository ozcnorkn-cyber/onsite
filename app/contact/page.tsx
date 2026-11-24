import Link from "next/link";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function ContactPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:grid md:grid-cols-12">
      <div className="md:col-span-7 md:col-start-6">
        <h1 className="display text-5xl md:text-7xl">{copy.contactTitle}</h1>
        <p className="mt-8 max-w-md text-lg leading-8">{copy.contactBody}</p>
        <p className="mt-6">
          {copy.emailLabel}: {copy.emailPlaceholder}
        </p>
        <p>
          {copy.phoneLabel}: {copy.phonePlaceholder}
        </p>
        <Link href="/quote" className="btn mt-8">
          {copy.contactCta}
        </Link>
      </div>
    </article>
  );
}
