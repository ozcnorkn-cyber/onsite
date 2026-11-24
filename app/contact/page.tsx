import Link from "next/link";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function ContactPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="kicker">{copy.tagline}</p>
      <h1 className="display mt-4 text-4xl md:text-6xl">{copy.contactTitle}</h1>
      <p className="mt-6 max-w-xl text-lg leading-8">{copy.contactBody}</p>
      <p className="mt-6">
        {copy.emailLabel}: {copy.emailPlaceholder}
      </p>
      <p>
        {copy.phoneLabel}: {copy.phonePlaceholder}
      </p>
      <Link href="/quote" className="btn mt-8">
        {copy.contactCta}
      </Link>
    </article>
  );
}
