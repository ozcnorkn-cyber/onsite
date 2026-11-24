import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import type { Lang } from "@/lib/i18n";
import { QuoteControls } from "./quote-controls";

export function ProductCard({ product, lang }: { product: Product; lang: Lang }) {
  const copy = t(lang);
  const name = lang === "en" ? product.en : product.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const description = lang === "en" ? product.descEn : product.descPl;
  const price = (lang === "en" ? product.priceEn : product.pricePl) || copy.pricePreparing;

  return (
    <article className="clip-card flex h-full flex-col border border-ink/10 bg-white p-3 [&_.btn]:rounded-2xl">
      <Link href={`/equipment/${product.category}/${product.id}`} className="block">
        <div className="clip-frame aspect-[4/3] bg-paper">
          <Image
            src={product.image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-contain"
          />
        </div>
        <h3 className="mt-3 text-base font-semibold leading-snug">{name}</h3>
      </Link>
      <p className="mt-1 text-sm text-steel-deep">{size || description}</p>
      <p className="mt-1 text-sm font-semibold">{price}</p>
      <div className="mt-auto pt-3">
        <QuoteControls id={product.id} lang={lang} fullWidth />
      </div>
    </article>
  );
}
