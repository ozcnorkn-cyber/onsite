import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RentalPanel } from "@/components/rental-panel";
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
  const name = lang === "en" ? product.en : product.pl;
  const group = lang === "en" ? category.en : category.pl;
  const size = lang === "en" ? product.sizeEn : product.sizePl;
  const description = lang === "en" ? product.descEn : product.descPl;
  const note = lang === "en" ? product.noteEn : product.notePl;
  const copy = t(lang);
  const price = (lang === "en" ? product.priceEn : product.pricePl) || copy.pricePreparing;
  const groupName = category.filters?.find((filter) => filter.id === product.group);
  const groupLabel = groupName ? (lang === "en" ? groupName.en : groupName.pl) : "";

  return (
    <article
      className={`mx-auto grid max-w-7xl items-start gap-8 px-4 py-6 md:px-5 ${product.image ? "md:grid-cols-2" : ""}`}
    >
      {product.image ? (
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
      ) : null}
      <div className="md:pt-4">
        <p className="text-sm">
          <Link href={`/equipment/${category.id}`} className="font-semibold underline">
            {group}
          </Link>
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{name}</h1>
        {groupLabel ? <p className="mt-3 text-steel-deep">{groupLabel}</p> : null}
        <p className="mt-3">{copy.qtyNotOnFile}</p>
        <dl className="max-w-md">
          {size ? (
            <div className="mt-3">
              <dt className="text-sm text-steel-deep">{copy.sizeLabel}</dt>
              <dd>{size}</dd>
            </div>
          ) : null}
          <div className="mt-3">
            <dt className="text-sm text-steel-deep">{copy.priceLabel}</dt>
            <dd className="text-lg font-medium">{price}</dd>
          </div>
          <div className="mt-3">
            <dt className="text-sm text-steel-deep">{copy.depositLabel}</dt>
            <dd className="text-lg font-medium">{copy.depositPreparing}</dd>
          </div>
          <div className="mt-3">
            <dt className="text-sm text-steel-deep">{copy.details}</dt>
            <dd className="text-lg">{description}</dd>
            {note ? <dd className="mt-2 text-lg">{note}</dd> : null}
          </div>
        </dl>
        <RentalPanel id={product.id} lang={lang} />
      </div>
    </article>
  );
}
