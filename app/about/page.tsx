import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function AboutPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 md:grid md:grid-cols-12">
      <div className="md:col-span-8">
        <p className="text-sm">{copy.historyMeta}</p>
        <h1 className="display mt-8 text-5xl md:text-7xl">{copy.aboutTitle}</h1>
        <p className="mt-8 text-sm tracking-[0.14em] uppercase">{copy.tagline}</p>
        <p className="mt-8 max-w-xl text-lg leading-8">{copy.aboutLead}</p>
        <p className="mt-4 max-w-xl text-lg leading-8">{copy.aboutBody}</p>
      </div>
    </article>
  );
}
