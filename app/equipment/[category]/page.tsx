import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { categoryById, productsIn } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = await params;
  const category = categoryById(categoryId);
  if (!category) notFound();
  const lang = await getLang();
  const copy = t(lang);
  const name = lang === "en" ? category.en : category.pl;
  const items = productsIn(category.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
      <p className="text-sm">
        <Link href="/equipment" className="font-semibold underline">
          {copy.navEquipment}
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{name}</h1>
      <div className="mt-5">
        <CategoryTiles lang={lang} current={category.id} />
      </div>
      {items.length === 0 ? (
        <p className="mt-8 text-lg">{copy.preparingOffer}</p>
      ) : (
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} lang={lang} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
