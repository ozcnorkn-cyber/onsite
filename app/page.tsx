import Image from "next/image";
import Link from "next/link";
import { CategoryIndex } from "@/components/category-index";
import { productById } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const table = productById("table-180");
  const tableName = table ? (lang === "en" ? table.en : table.pl) : "";

  return (
    <div>
      <section className="mx-auto max-w-6xl px-5 pb-8 pt-14 md:pt-20">
        <p className="text-sm">{copy.historyMeta}</p>
        <h1 className="display mt-12 max-w-5xl text-5xl md:text-8xl">{copy.heroTitle}</h1>
        <p className="mt-8 max-w-md text-xl leading-snug">{copy.heroBody}</p>
        <p className="mt-6 text-sm tracking-[0.14em] uppercase">{copy.tagline}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/equipment" className="btn">
            {copy.heroCta}
          </Link>
          <Link href="/contact" className="btn-line">
            {copy.heroCtaSecondary}
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16">
        <h2 className="kicker">{copy.optionsTitle}</h2>
        <ol className="mt-4">
          {copy.options.map((option, index) => (
            <li
              key={option.title}
              className="grid gap-1 border-t border-ink py-5 md:grid-cols-[4rem_16rem_1fr] md:items-baseline md:gap-6"
            >
              <span className="kicker">0{index + 1}</span>
              <span className="text-xl font-medium">{option.title}</span>
              <span>{option.body}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto grid max-w-6xl items-start gap-10 px-5 pb-20 md:grid-cols-12">
        <figure className="md:col-span-7 md:mt-16">
          {table ? (
            <Link href={`/equipment/${table.category}/${table.id}`} className="block">
              <div className="relative aspect-[5/4]">
                <Image
                  src={table.image}
                  alt={tableName}
                  fill
                  priority
                  sizes="(min-width: 768px) 55vw, 100vw"
                  className="plate object-contain object-left"
                />
              </div>
              <figcaption className="mt-3 text-sm">
                {tableName}
                {table.sizePl ? ` · ${lang === "en" ? table.sizeEn : table.sizePl}` : ""}
              </figcaption>
            </Link>
          ) : null}
        </figure>
        <div className="md:col-span-5">
          <h2 className="display text-4xl">{copy.offerTitle}</h2>
          <p className="mt-4 max-w-sm text-lg">{copy.offerBody}</p>
          <div className="mt-8">
            <CategoryIndex lang={lang} />
          </div>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16 md:grid md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-4">
            <h2 className="display text-4xl">{copy.aboutTitle}</h2>
            <p className="mt-6 text-lg leading-8">{copy.aboutLead}</p>
            <p className="mt-4 text-lg leading-8">{copy.aboutBody}</p>
          </div>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <h2 className="display text-4xl">{copy.howTitle}</h2>
          <ol className="mt-8 max-w-2xl">
            {copy.how.map((step) => (
              <li key={step} className="border-t border-ink/30 py-3 text-lg">
                {step}
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-lg">{copy.who.join(" · ")}</p>
          <p className="kicker mt-2">{copy.whoTitle}</p>
        </div>
      </section>
    </div>
  );
}
