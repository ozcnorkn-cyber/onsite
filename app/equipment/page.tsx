import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { searchProducts } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function EquipmentPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const lang = await getLang();
  const copy = t(lang);
  const found = searchProducts(query);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
      <h1 className="text-3xl font-semibold tracking-tight">
        {query ? `„${query}”` : copy.equipmentTitle}
      </h1>
      {query ? null : <p className="mt-2 max-w-2xl text-sm text-steel-deep">{copy.equipmentIntro}</p>}
      {query ? null : (
        <div id="katalog" className="mt-6">
          <CategoryTiles lang={lang} />
        </div>
      )}
      {query && found.length === 0 ? <p className="mt-8 text-lg">{copy.noResults}</p> : null}
      {found.length > 0 ? (
        <ul className={`${query ? "mt-6" : "mt-8"} grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4`}>
          {found.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} lang={lang} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
