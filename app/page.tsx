import Link from "next/link";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { productsIn } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const furniture = productsIn("meble");
  const furnitureName = lang === "en" ? "Furniture" : "Meble";

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <p className="text-sm">{copy.tagline}</p>
      <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight md:text-5xl">{copy.heroTitle}</h1>
      <p className="mt-4 max-w-xl text-lg">{copy.heroBody}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="#katalog" className="btn">
          {copy.heroCta}
        </Link>
        <Link href="/contact" className="btn-line">
          {copy.heroCtaSecondary}
        </Link>
      </div>

      <section id="katalog" className="mt-14 scroll-mt-24">
        <h2 className="text-2xl font-medium">{copy.categoriesTitle}</h2>
        <div className="mt-5">
          <CategoryTiles lang={lang} />
        </div>
      </section>

      <section className="mt-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-2xl font-medium">{furnitureName}</h2>
          <Link href="/equipment/meble" className="text-sm underline">
            {copy.navEquipment}
          </Link>
        </div>
        <p className="mt-2 max-w-xl">{copy.offerBody}</p>
        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
          {furniture.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-16 border-t border-ink/15 pt-10">
        <h2 className="text-2xl font-medium">{copy.optionsTitle}</h2>
        <ul className="mt-6 grid gap-8 md:grid-cols-3">
          {copy.options.map((option) => (
            <li key={option.title}>
              <h3 className="text-lg font-medium">{option.title}</h3>
              <p className="mt-2">{option.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-medium">{copy.howTitle}</h2>
          <ol className="mt-4 space-y-2 text-lg">
            {copy.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <h2 className="mt-10 text-2xl font-medium">{copy.whoTitle}</h2>
          <p className="mt-4 text-lg">{copy.who.join(". ")}.</p>
        </div>
        <div>
          <h2 className="text-2xl font-medium">{copy.aboutTitle}</h2>
          <p className="mt-4 text-lg leading-8">{copy.aboutLead}</p>
          <p className="mt-4 text-lg leading-8">{copy.aboutBody}</p>
        </div>
      </section>

      <section className="mt-14 border-t border-ink/15 pt-10">
        <h2 className="text-2xl font-medium">{copy.contactTitle}</h2>
        <p className="mt-4 max-w-xl text-lg">{copy.contactBody}</p>
        <Link href="/contact" className="mt-4 inline-block underline">
          {copy.heroCtaSecondary}
        </Link>
      </section>
    </div>
  );
}
