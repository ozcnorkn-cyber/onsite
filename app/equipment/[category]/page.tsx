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
    <div className="mx-auto max-w-6xl px-5 py-14">
      <p className="kicker">
        <Link href="/equipment">{copy.navEquipment}</Link>
      </p>
      <h1 className="display mt-6 text-5xl md:text-7xl">{name}</h1>
      <ul className="mt-12 border-t border-ink">
        {productsIn(category.id).map((product) => {
          const productName = lang === "en" ? product.en : product.pl;
          const size = lang === "en" ? product.sizeEn : product.sizePl;
          return (
            <li key={product.id} className="border-b border-ink">
              <Link
                href={`/equipment/${category.id}/${product.id}`}
                className="grid items-end gap-4 py-6 sm:grid-cols-[9rem_1fr] md:grid-cols-[14rem_1fr]"
              >
                <span className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="220px"
                    className="plate object-contain object-left"
                  />
                </span>
                <span>
                  <span className="block text-2xl font-medium tracking-tight md:text-4xl">{productName}</span>
                  {size ? <span className="mt-2 block text-sm">{size}</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
