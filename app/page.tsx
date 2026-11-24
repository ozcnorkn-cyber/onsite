import Image from "next/image";
import Link from "next/link";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { productById } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

const popularIds = [
  "table-180",
  "table-120",
  "chair-plastic",
  "chair-director",
  "stage-2x1",
  "tent-3x3",
  "hazer-unique",
  "honda-eu22i",
];

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const heroProduct = productById("table-180");
  const heroName = heroProduct ? (lang === "en" ? heroProduct.en : heroProduct.pl) : copy.heroTitle;
  const popular = popularIds.map((id) => productById(id)).filter((product) => product !== undefined);

  return (
    <div>
      <section className="mx-auto grid max-w-7xl border-b border-ink md:h-[520px] md:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-8 md:px-8">
          <p className="text-sm font-semibold">{copy.tagline}</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">{copy.heroTitle}</h1>
          <Link href="#kategorie" className="btn mt-6 w-fit">
            {copy.heroCta}
          </Link>
        </div>
        {heroProduct ? (
          <Link
            href={`/equipment/${heroProduct.category}/${heroProduct.id}`}
            className="relative block min-h-72 bg-white md:min-h-0"
          >
            <Image
              src={heroProduct.image}
              alt={heroName}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain p-8"
            />
          </Link>
        ) : null}
      </section>

      <section id="kategorie" className="scroll-mt-36 mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
        <h2 className="text-3xl font-semibold tracking-tight">{copy.categoriesTitle}</h2>
        <div className="mt-5">
          <CategoryTiles
            lang={lang}
            ids={["meble", "scena", "efekty", "klimat", "namioty", "zasilanie"]}
          />
        </div>
      </section>

      <section id="popularny" className="scroll-mt-36 border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight">{copy.popularTitle}</h2>
            <Link href="/equipment" className="text-sm font-semibold underline">
              {copy.navHire}
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {popular.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="dostawa" className="scroll-mt-36 border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <h2 className="text-3xl font-semibold tracking-tight">{copy.navDelivery}</h2>
          <ul className="mt-6 grid border-t border-ink md:grid-cols-3">
            {copy.options.map((option) => (
              <li
                key={option.title}
                className="border-b border-ink py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="text-xl font-semibold">{option.title}</h3>
                <p className="mt-2 text-base">{option.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <h2 className="text-3xl font-semibold tracking-tight">{copy.howTitle}</h2>
          <ol className="mt-6 grid border-t border-ink md:grid-cols-3">
            {copy.how.map((step, index) => (
              <li
                key={step}
                className="border-b border-ink py-5 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="text-3xl font-semibold">{index + 1}</span>
                <p className="mt-3 text-base">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <h2 className="text-3xl font-semibold tracking-tight">{copy.aboutIntro}</h2>
          <p className="mt-4 text-lg font-semibold">{copy.aboutPeople}</p>
          <div className="mt-4 max-w-3xl space-y-4 text-base leading-7">
            {copy.aboutParas.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-6 font-semibold">{copy.tagline}</p>
          <p className="mt-3 max-w-3xl leading-7">{copy.aboutOutro}</p>
          <p className="mt-3">{copy.aboutBye}</p>
        </div>
      </section>
    </div>
  );
}
