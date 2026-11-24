import Link from "next/link";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function NotFound() {
  const copy = t(await getLang());
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-medium tracking-tight">{copy.notFoundTitle}</h1>
      <Link href="/" className="btn mt-8">
        {copy.notFoundCta}
      </Link>
    </article>
  );
}
