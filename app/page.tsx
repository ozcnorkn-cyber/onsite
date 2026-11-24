import Image from "next/image";
import Link from "next/link";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { productById } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

const popularIds = [
  "table-180",
  "bench",
  "chair-plastic",
  "chair-wood",
  "chair-soft",
  "sofa-2",
  "tent-3x3",
];

export default async function HomePage() {
  const lang = await getLang();
  const copy = t(lang);
  const popular = popularIds.map((id) => productById(id)).filter((product) => product !== undefined);

  return (
    <div>
      <section className="relative h-[440px] overflow-hidden border-b border-ink">
        {/* stock: Pexels 16985136, a venue with tables and chairs. Not catalogue inventory. */}
        <Image
          src="/photos/stock-event-venue.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="relative z-10 flex h-full max-w-md flex-col justify-center bg-gradient-to-r from-black/55 via-black/20 to-transparent px-4 text-white md:px-8">
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
                <HowIcon index={index} />
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

function HowIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-7 w-7 text-ink",
    "aria-hidden": true,
  };
  if (index === 0) {
    return (
      <svg {...common}>
        <rect x="6" y="7" width="20" height="16" rx="1.5" />
        <path d="M6 12h20M12 12v11" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg {...common}>
        <path d="M5 20h15.5M7 20l2.5-5h9l3 5" />
        <path d="M20.5 20h3.2l2.3-4H23" />
        <circle cx="10" cy="22.5" r="1.6" />
        <circle cx="19" cy="22.5" r="1.6" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 8H8.5A3.5 3.5 0 0 0 5 11.5v9A3.5 3.5 0 0 0 8.5 24H20" />
      <path d="M18 5l5 5-5 5" />
      <path d="M23 10H13" />
    </svg>
  );
}
