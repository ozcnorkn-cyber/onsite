import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div>
      <header className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="kicker">{copy.navEquipment}</p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{name}</h1>
        </div>
      </header>
      <ul className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-3">
        {productsIn(category.id).map((product) => {
          const productName = lang === "en" ? product.en : product.pl;
          return (
            <li key={product.id}>
              <Link href={`/equipment/${category.id}/${product.id}`} className="block">
                <div className="relative aspect-[4/3] bg-white">
                  <Image
                    src={product.image}
                    alt={productName}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <h2 className="mt-4 text-xl font-semibold">{productName}</h2>
                <p className="mt-2 text-sm font-semibold uppercase tracking-wide underline">
                  {copy.details}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
