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
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{copy.heroTitle}</h1>
        <p className="text-sm font-medium">{copy.tagline}</p>
      </div>
      <p className="mt-1 max-w-2xl text-sm text-steel-deep">{copy.heroBody}</p>

      <section id="katalog" className="mt-6 scroll-mt-36">
        <CategoryTiles lang={lang} />
      </section>

      <section className="mt-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-semibold">{furnitureName}</h2>
          <Link href="/equipment/meble" className="text-sm font-semibold underline">
            {copy.navEquipment}
          </Link>
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">
          {furniture.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} lang={lang} />
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 border-t border-ink/20 pt-6">
        <h2 className="text-lg font-semibold">{copy.optionsTitle}</h2>
        <ul className="mt-3 grid gap-4 md:grid-cols-3">
          {copy.options.map((option) => (
            <li key={option.title}>
              <h3 className="font-semibold">{option.title}</h3>
              <p className="mt-1 text-sm">{option.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8 grid gap-8 border-t border-ink/20 pt-6 md:grid-cols-3">
        <div>
          <h2 className="font-semibold">{copy.howTitle}</h2>
          <ol className="mt-2 space-y-1 text-sm">
            {copy.how.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h2 className="font-semibold">{copy.whoTitle}</h2>
          <p className="mt-2 text-sm">{copy.who.join(". ")}.</p>
          <h2 className="mt-5 font-semibold">{copy.contactTitle}</h2>
          <p className="mt-2 text-sm">{copy.contactBody}</p>
          <Link href="/contact" className="mt-2 inline-block text-sm font-semibold underline">
            {copy.heroCtaSecondary}
          </Link>
        </div>
        <div>
          <h2 className="font-semibold">{copy.aboutTitle}</h2>
          <p className="mt-2 text-sm leading-6">{copy.aboutLead}</p>
          <p className="mt-2 text-sm leading-6">{copy.aboutBody}</p>
        </div>
      </section>
    </div>
  );
}
