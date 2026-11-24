import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function AboutPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-medium tracking-tight">{copy.aboutTitle}</h1>
      <p className="mt-6 text-lg">{copy.tagline}</p>
      <p className="mt-6 text-lg leading-8">{copy.aboutLead}</p>
      <p className="mt-4 text-lg leading-8">{copy.aboutBody}</p>
    </article>
  );
}
