import Link from "next/link";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function ContactPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-medium tracking-tight">{copy.contactTitle}</h1>
      <p className="mt-6 max-w-xl text-lg leading-8">{copy.contactBody}</p>
      <Link href="/quote" className="btn mt-8">
        {copy.contactCta}
      </Link>
    </article>
  );
}
