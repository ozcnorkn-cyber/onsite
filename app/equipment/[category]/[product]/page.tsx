import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { QuoteControls } from "@/components/quote-controls";
import { categoryById, productById } from "@/lib/catalogue";
import { t } from "@/lib/copy";
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
  const copy = t(lang);
  const name = lang === "en" ? product.en : product.pl;
  const group = lang === "en" ? category.en : category.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const description = lang === "en" ? product.descEn : product.descPl;

  return (
    <article className="mx-auto grid max-w-6xl items-start gap-10 px-5 py-14 md:grid-cols-12">
      <div className="relative aspect-[4/3] md:col-span-7">
        <Image
          src={product.image}
          alt={name}
          fill
          priority
          sizes="(min-width: 768px) 55vw, 100vw"
          className="plate object-contain object-left"
        />
      </div>
      <div className="md:col-span-5 md:pt-10">
        <p className="kicker">{group}</p>
        <h1 className="display mt-3 text-4xl md:text-6xl">{name}</h1>
        {size ? (
          <p className="mt-6 text-sm">
            <span className="kicker">{copy.sizeLabel}</span>
            <span className="mt-1 block text-base">{size}</span>
          </p>
        ) : null}
        <p className="mt-6 max-w-md text-lg">{description}</p>
        <div className="mt-8">
          <QuoteControls id={product.id} lang={lang} />
        </div>
        <Link
          href={`/equipment/${category.id}`}
          className="mt-8 inline-block text-sm font-semibold underline"
        >
          {copy.backCategory}
        </Link>
      </div>
    </article>
  );
}
