import { CategoryTiles } from "@/components/category-tiles";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function EquipmentPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-medium tracking-tight">{copy.equipmentTitle}</h1>
      <p className="mt-4 max-w-xl text-lg">{copy.equipmentIntro}</p>
      <div id="katalog" className="mt-8">
        <CategoryTiles lang={lang} />
      </div>
    </div>
  );
}
