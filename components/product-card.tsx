import Image from "next/image";
import Link from "next/link";
import { categoryById, type Product } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";
import { QuoteControls } from "./quote-controls";

export function ProductCard({
  product,
  lang,
  large = false,
}: {
  product: Product;
  lang: Lang;
  large?: boolean;
}) {
  const name = lang === "en" ? product.en : product.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const price = lang === "en" ? product.priceEn : product.pricePl;
  const category = categoryById(product.category);
  const group = category ? (lang === "en" ? category.en : category.pl) : "";

  return (
    <article className="clip-card flex h-full flex-col border border-ink/10 bg-white p-3 [&_.btn]:rounded-2xl">
      <Link href={`/equipment/${product.category}/${product.id}`} className="block">
        <div className="clip-frame aspect-[4/3] bg-paper">
          <Image
            src={product.image}
            alt={name}
            fill
            sizes={large ? "(min-width: 1024px) 33vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
            className="object-contain"
          />
        </div>
        {large ? <p className="mt-3 text-sm text-steel-deep">{group}</p> : null}
        <h3 className={large ? "mt-1 text-lg font-semibold leading-snug" : "mt-2 text-[0.95rem] font-semibold leading-tight"}>
          {name}
        </h3>
      </Link>
      {size ? <p className="mt-1 text-sm text-steel-deep">{size}</p> : null}
      {price ? <p className="mt-1 text-sm font-semibold">{price}</p> : null}
      <div className={large ? "mt-auto pt-4" : "mt-2"}>
        <QuoteControls id={product.id} lang={lang} compact={!large} fullWidth={large} />
      </div>
    </article>
  );
}
