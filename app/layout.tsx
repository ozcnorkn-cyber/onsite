import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import { QuoteProvider } from "@/components/quote-store";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company, siteOrigin } from "@/lib/content";
import { t } from "@/lib/copy";
import { getLang } from "@/lib/i18n";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body-face",
});

export const instant = false;

export const viewport: Viewport = {
  themeColor: "#F2F1ED",
};

export async function generateMetadata(): Promise<Metadata> {
  const copy = t(await getLang());
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const lang = await getLang();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.brand,
    legalName: company.legalName,
    foundingDate: company.since,
    url: siteOrigin(),
    address: {
      "@type": "PostalAddress",
      addressLocality: company.cityEn,
      addressCountry: "PL",
    },
  };

  return (
    <html lang={lang} className={`${outfit.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <QuoteProvider>
          <SiteHeader lang={lang} />
          <main className="flex-1">{children}</main>
          <SiteFooter lang={lang} />
        </QuoteProvider>
      </body>
    </html>
  );
}
