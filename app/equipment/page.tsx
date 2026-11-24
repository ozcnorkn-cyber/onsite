import { CategoryIndex } from "@/components/category-index";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function EquipmentPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <h1 className="display text-5xl md:text-7xl">{copy.equipmentTitle}</h1>
      <p className="mt-6 max-w-xl text-lg">{copy.equipmentIntro}</p>
      <div id="katalog" className="mt-12">
        <CategoryIndex lang={lang} />
      </div>
    </div>
  );
}
