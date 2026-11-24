import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function AboutPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="kicker">{copy.tagline}</p>
      <h1 className="display mt-4 text-4xl md:text-6xl">{copy.aboutTitle}</h1>
      <p className="mt-6 text-lg leading-8">{copy.aboutLead}</p>
      <p className="mt-4 text-lg leading-8">{copy.aboutBody}</p>
    </article>
  );
}
