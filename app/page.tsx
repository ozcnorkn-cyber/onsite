import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <div>
      <section className="border-b border-ink/15">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="kicker">{copy.tagline}</p>
            <h1 className="display mt-4 text-4xl md:text-6xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-md text-lg">{copy.heroBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/equipment" className="btn">
                {copy.heroCta}
              </Link>
              <Link href="/contact" className="btn-line">
                {copy.heroCtaSecondary}
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] bg-white">
            <Image
              src="/photos/table-180.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="display text-3xl">{copy.optionsTitle}</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3">
            {copy.options.map((option, index) => (
              <li key={option.title}>
                <p className="kicker">0{index + 1}</p>
                <h3 className="mt-2 text-xl font-semibold">{option.title}</h3>
                <p className="mt-2">{option.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="display text-3xl">{copy.offerTitle}</h2>
          <p className="mt-4 max-w-xl text-lg">{copy.offerBody}</p>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const name = lang === "en" ? category.en : category.pl;
              return (
                <li key={category.id}>
                  <Link href={`/equipment/${category.id}`} className="block">
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-contain"
                      />
                    </div>
                    <p className="mt-3 text-lg font-semibold uppercase tracking-wide">{name}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <section className="border-b border-ink/15">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-2">
          <div>
            <h2 className="display text-3xl">{copy.howTitle}</h2>
            <ol className="mt-6 space-y-3">
              {copy.how.map((step, index) => (
                <li key={step}>
                  <span className="kicker">0{index + 1}</span>
                  <span className="mt-1 block text-lg">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h2 className="display text-3xl">{copy.whoTitle}</h2>
            <ul className="mt-6 space-y-2 text-lg">
              {copy.who.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
