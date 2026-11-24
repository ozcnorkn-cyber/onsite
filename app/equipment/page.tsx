import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { categoryById, navCategories, productsIn, searchProducts } from "@/lib/catalogue";
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
  const found = query ? searchProducts(query) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
      <h1 className="text-3xl font-semibold tracking-tight">
        {query ? `„${query}”` : copy.equipmentTitle}
      </h1>
      {query ? null : <p className="mt-2 max-w-2xl text-sm text-steel-deep">{copy.equipmentIntro}</p>}
      {query ? null : (
        <div id="katalog" className="mt-6">
          <CategoryTiles lang={lang} compact />
        </div>
      )}
      {query && found.length === 0 ? <p className="mt-8 text-lg">{copy.noResults}</p> : null}
      {query ? (
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">
          {found.map((product) => {
            const category = categoryById(product.category);
            const categoryName = category ? (lang === "en" ? category.en : category.pl) : "";
            return (
              <li key={product.id}>
                <p className="mb-2 text-xs font-semibold">{categoryName}</p>
                <ProductCard product={product} lang={lang} />
              </li>
            );
          })}
        </ul>
      ) : (
        navCategories().map((category) => {
          const name = lang === "en" ? category.en : category.pl;
          const items = productsIn(category.id);
          return (
            <section key={category.id} className="mt-8 border-t border-ink pt-4">
              <h2 className="text-2xl font-semibold tracking-tight">{name}</h2>
              {items.length === 0 ? (
                <p className="mt-4 text-lg">{copy.preparingOffer}</p>
              ) : (
                <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-6 lg:grid-cols-4">
                  {items.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} lang={lang} />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          );
        })
      )}
    </div>
  );
}
