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
            <p className="kicker">{copy.brand}</p>
            <h1 className="display mt-4 text-4xl md:text-6xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-md text-lg">{copy.heroBody}</p>
            <Link href="/equipment" className="btn mt-8">
              {copy.heroCta}
            </Link>
          </div>
          <div className="relative aspect-[4/3] bg-white">
            <Image
              src="/photos/generator.jpg"
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-6xl px-5 py-14">
          <h2 className="display text-3xl">{copy.categoriesTitle}</h2>
          <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => {
              const name = lang === "en" ? category.en : category.pl;
              return (
                <li key={category.id}>
                  <Link href={`/equipment#${category.id}`} className="block">
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                    <p className="mt-3 text-lg font-semibold uppercase tracking-wide">
                      {name}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
