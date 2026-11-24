import Image from "next/image";
import Link from "next/link";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { categories, productById, products } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const rank = new Map(categories.map((category, index) => [category.id, index]));
  const catalogue = [...products].sort(
    (a, b) => (rank.get(a.category) ?? 0) - (rank.get(b.category) ?? 0),
  );
  const heroProduct = productById("table-180");
  const heroName = heroProduct ? (lang === "en" ? heroProduct.en : heroProduct.pl) : copy.heroTitle;

  return (
    <div>
      <section className="mx-auto grid max-w-7xl border-b border-ink md:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-8 md:px-8 md:py-10">
          <p className="text-sm font-semibold">{copy.tagline}</p>
          <h1 className="mt-3 max-w-xl text-4xl font-semibold tracking-tight md:text-5xl">{copy.heroTitle}</h1>
          <p className="mt-4 max-w-md text-lg">{copy.heroBody}</p>
          <Link href="#oferta" className="btn mt-6 w-fit">
            {copy.heroCta}
          </Link>
        </div>
        {heroProduct ? (
          <Link
            href={`/equipment/${heroProduct.category}/${heroProduct.id}`}
            className="relative block min-h-72 bg-white md:min-h-[420px]"
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

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
        <h2 className="text-3xl font-semibold tracking-tight">{copy.categoriesTitle}</h2>
        <div className="mt-5">
          <CategoryTiles lang={lang} />
        </div>
      </section>

      <section id="oferta" className="scroll-mt-36 border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl font-semibold tracking-tight">{copy.offerTitle}</h2>
            <Link href="/equipment" className="text-sm font-semibold underline">
              {copy.navEquipment}
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {catalogue.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} lang={lang} large />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-5 md:py-10">
          <h2 className="text-3xl font-semibold tracking-tight">{copy.howTitle}</h2>
          <ol className="mt-6 grid border-t border-ink md:grid-cols-4">
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
          <h2 className="text-3xl font-semibold tracking-tight">{copy.optionsTitle}</h2>
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
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 md:grid-cols-12 md:px-5 md:py-10">
          <h2 className="text-3xl font-semibold tracking-tight md:col-span-3">{copy.aboutTitle}</h2>
          <div className="md:col-span-8">
            <p className="text-lg">{copy.aboutLead}</p>
            <p className="mt-3 max-w-2xl text-base leading-7">{copy.aboutBody}</p>
            <p className="mt-4 text-sm">{copy.historyMeta}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
