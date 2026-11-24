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
  "chair-wood",
  "chair-director",
  "chair-soft",
  "bench",
];

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const heroProduct = productById("table-180");
  const plasticChairs = productById("chair-plastic");
  const directorChair = productById("chair-director");
  const nameOf = (product: { pl: string; en: string } | undefined) =>
    product ? (lang === "en" ? product.en : product.pl) : "";
  const heroName = nameOf(heroProduct) || copy.heroTitle;
  const popular = popularIds.map((id) => productById(id)).filter((product) => product !== undefined);

  return (
    <div>
      <section className="relative h-[440px] overflow-hidden border-b border-ink bg-white">
        <div className="absolute inset-y-0 right-0 flex w-[64%] items-end justify-end gap-1 pr-3">
          <div className="relative h-[92%] w-[50%] overflow-hidden">
            <Image
              src="/photos/table-180.jpg"
              alt={heroName}
              fill
              priority
              sizes="40vw"
              className="origin-bottom object-contain object-bottom scale-[1.7]"
            />
          </div>
          <div className="relative h-[70%] w-[26%] overflow-hidden">
            <Image
              src="/photos/chair-plastic.jpg"
              alt={nameOf(plasticChairs)}
              fill
              sizes="18vw"
              className="origin-bottom object-contain object-bottom scale-[1.45]"
            />
          </div>
          <div className="relative h-[78%] w-[22%] overflow-hidden">
            <Image
              src="/photos/chair-director.jpg"
              alt={nameOf(directorChair)}
              fill
              sizes="16vw"
              className="origin-bottom object-contain object-bottom scale-125"
            />
          </div>
        </div>
        <div className="relative z-10 flex h-full max-w-md flex-col justify-center px-4 md:px-8">
          <p className="text-sm font-semibold">{copy.tagline}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">{copy.heroTitle}</h1>
          <Link href="#kategorie" className="btn mt-6 w-fit">
            {copy.heroCta}
          </Link>
        </div>
      </section>

      <section id="kategorie" className="scroll-mt-28 mx-auto max-w-7xl px-4 py-6 md:px-5">
        <h2 className="text-3xl font-semibold tracking-tight">{copy.categoriesTitle}</h2>
        <div className="mt-4">
          <CategoryTiles lang={lang} />
        </div>
      </section>

      <section id="popularny" className="scroll-mt-28 border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
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

      <section id="dostawa" className="scroll-mt-28 border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-5">
          <h2 className="text-2xl font-semibold tracking-tight">{copy.navDelivery}</h2>
          <ul className="mt-3 grid border-t border-ink md:grid-cols-3">
            {copy.options.map((option) => (
              <li
                key={option.title}
                className="border-b border-ink py-3 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <h3 className="text-lg font-semibold">{option.title}</h3>
                <p className="mt-2 text-base">{option.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-ink">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-5">
          <h2 className="text-2xl font-semibold tracking-tight">{copy.howTitle}</h2>
          <ol className="mt-3 grid border-t border-ink md:grid-cols-3">
            {copy.how.map((step, index) => (
              <li
                key={step}
                className="border-b border-ink py-3 md:border-b-0 md:border-r md:px-5 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <span className="text-2xl font-semibold">{index + 1}</span>
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
