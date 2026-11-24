import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuoteControls } from "@/components/quote-controls";
import { categoryById, productById } from "@/lib/catalogue";
import { getLang } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}): Promise<Metadata> {
  const { product: productId } = await params;
  const product = productById(productId);
  const lang = await getLang();
  if (!product) return {};
  const name = lang === "en" ? product.en : product.pl;
  return { title: `${name} — ON SITE` };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; product: string }>;
}) {
  const { category: categoryId, product: productId } = await params;
  const product = productById(productId);
  const category = categoryById(categoryId);
  if (!product || !category || product.category !== category.id) notFound();
  const lang = await getLang();
  const name = lang === "en" ? product.en : product.pl;
  const group = lang === "en" ? category.en : category.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const description = lang === "en" ? product.descEn : product.descPl;
  const price = lang === "en" ? product.priceEn : product.pricePl;

  return (
    <article className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-10 md:grid-cols-2">
      <div className="relative aspect-square bg-white">
        <Image
          src={product.image}
          alt={name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain p-8"
        />
      </div>
      <div>
        <p className="text-sm">
          <Link href={`/equipment/${category.id}`} className="underline">
            {group}
          </Link>
        </p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight">{name}</h1>
        {size ? <p className="mt-4 text-steel-deep">{size}</p> : null}
        {price ? <p className="mt-3 text-lg font-medium">{price}</p> : null}
        <p className="mt-4 max-w-md text-lg">{description}</p>
        <div className="mt-6">
          <QuoteControls id={product.id} lang={lang} />
        </div>
      </div>
    </article>
  );
}
