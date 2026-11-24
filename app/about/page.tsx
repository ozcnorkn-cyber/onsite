import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function AboutPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-semibold tracking-tight">{copy.aboutIntro}</h1>
      <p className="mt-6 text-lg font-semibold">{copy.aboutPeople}</p>
      {copy.aboutParas.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-lg leading-8">
          {paragraph}
        </p>
      ))}
      <p className="mt-8 text-lg font-semibold">{copy.tagline}</p>
      <p className="mt-4 text-lg leading-8">{copy.aboutOutro}</p>
      <p className="mt-4 text-lg">{copy.aboutBye}</p>
      <p className="mt-8 text-sm">{copy.historyMeta}</p>
    </article>
  );
}
