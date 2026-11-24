import { QuoteScreen } from "@/components/quote-screen";
import { getLang } from "@/lib/i18n";

export default async function QuotePage() {
  const lang = await getLang();
  return <QuoteScreen lang={lang} />;
}
