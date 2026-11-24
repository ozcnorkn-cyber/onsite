import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryTiles } from "@/components/category-tiles";
import { ProductCard } from "@/components/product-card";
import { categoryById, productsIn } from "@/lib/catalogue";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ grupa?: string }>;
}) {
  const { category: categoryId } = await params;
  const { grupa = "" } = await searchParams;
  const category = categoryById(categoryId);
  if (!category) notFound();
  const lang = await getLang();
  const copy = t(lang);
  const name = lang === "en" ? category.en : category.pl;
  const filters = category.filters ?? [];
  const active = filters.some((filter) => filter.id === grupa) ? grupa : "";
  const items = productsIn(category.id).filter((product) => (active ? product.group === active : true));

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-5">
      <p className="text-sm">
        <Link href="/equipment" className="font-semibold underline">
          {copy.navEquipment}
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight">{name}</h1>
      {filters.length > 0 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <FilterChip href={`/equipment/${category.id}`} active={active === ""}>
            {copy.filterAll}
          </FilterChip>
          {filters.map((filter) => (
            <FilterChip
              key={filter.id}
              href={`/equipment/${category.id}?grupa=${filter.id}`}
              active={active === filter.id}
            >
              {lang === "en" ? filter.en : filter.pl}
            </FilterChip>
          ))}
        </div>
      ) : null}
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

function FilterChip({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      className={
        active
          ? "border border-ink bg-ink px-3 py-1 text-sm font-semibold text-white"
          : "border border-ink/30 px-3 py-1 text-sm font-semibold"
      }
      aria-current={active ? "true" : undefined}
    >
      {children}
    </Link>
  );
}
