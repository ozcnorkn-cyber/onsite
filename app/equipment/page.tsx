import { Catalogue } from "@/components/catalogue";
import { QuoteScreen } from "@/components/quote-screen";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function EquipmentPage() {
  const lang = await getLang();
  const copy = t(lang);

  return (
    <div>
      <header className="border-b border-ink/15">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <p className="kicker">{copy.brand}</p>
          <h1 className="display mt-4 text-4xl md:text-6xl">{copy.equipmentTitle}</h1>
          <p className="mt-5 max-w-xl text-lg">{copy.equipmentIntro}</p>
        </div>
      </header>
      <Catalogue lang={lang} />
      <QuoteScreen lang={lang} />
    </div>
  );
}
