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
        <div className="relative aspect-square bg-white">
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain p-4"
          />
        </div>
        <h3 className="mt-3 text-base font-medium leading-snug">{name}</h3>
      </Link>
      {size ? <p className="mt-1 text-sm text-steel-deep">{size}</p> : null}
      {price ? <p className="mt-1 text-sm font-medium">{price}</p> : null}
      <div className="mt-3">
        <QuoteControls id={product.id} lang={lang} fullWidth />
      </div>
    </article>
  );
}
