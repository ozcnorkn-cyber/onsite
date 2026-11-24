import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalogue";
import type { Lang } from "@/lib/i18n";
import { QuoteControls } from "./quote-controls";

export function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const name = lang === "en" ? product.en : product.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const price = lang === "en" ? product.priceEn : product.pricePl;

  return (
    <article className="flex flex-col">
      <Link href={`/equipment/${product.category}/${product.id}`} className="block">
        <div className="relative aspect-[4/3] bg-white">
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-2"
          />
        </div>
        <h3 className="mt-2 text-[0.95rem] font-semibold leading-tight">{name}</h3>
      </Link>
      {size ? <p className="mt-1 text-xs text-steel-deep">{size}</p> : null}
      {price ? <p className="mt-1 text-sm font-semibold">{price}</p> : null}
      <div className="mt-2">
        <QuoteControls id={product.id} lang={lang} compact />
      </div>
    </article>
  );
}
