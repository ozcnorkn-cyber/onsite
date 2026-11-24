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
    <article className="mx-auto grid max-w-7xl items-start gap-8 px-4 py-6 md:grid-cols-2 md:px-5">
      <div className="clip-frame aspect-[4/3] bg-white">
        <Image
          src={product.image}
          alt={name}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      <div className="md:pt-4">
        <p className="text-sm">
          <Link href={`/equipment/${category.id}`} className="font-semibold underline">
            {group}
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{name}</h1>
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
