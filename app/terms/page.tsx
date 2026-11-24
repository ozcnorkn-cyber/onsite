import { company } from "@/lib/content";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";

export default async function TermsPage() {
  const copy = t(await getLang());
  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-medium tracking-tight">{copy.termsTitle}</h1>
      <p className="mt-8 max-w-[36rem] text-xl leading-8">{copy.termsBody}</p>
      <p className="mt-4 text-sm text-steel-deep">{company.legalName}</p>
    </article>
  );
}
