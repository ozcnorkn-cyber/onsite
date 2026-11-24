/**
 * Event rental catalogue.
 *
 * Inventory check (read only, dyzurek-system on this machine):
 * supabase/migrations/001_initial_schema.sql seeds equipment_categories
 * Radiotelefony (RADIO), Generatory (GEN), Namioty (TENT), Ogrzewanie (HEAT),
 * Akcesoria (ACC). No product rows, brands, or quantities are stored there.
 *
 * docs/templates/catalog_import_template.csv is an import template. Its sample
 * rows (named models and quantities) are not a stock list and are not published.
 *
 * inventory "category" — the warehouse category name is confirmed. No model
 * and no count is published.
 * inventory "placeholder" — named for this catalogue and not confirmed in the
 * warehouse. The word is not shown on the page.
 *
 * Photos in /photos are generic catalogue images, not photographs of owned stock.
 *
 * Folding chairs: only the white plastic type was named, so other types are
 * not listed. Tents: only black was named, so other colours are not listed.
 */

export type Inventory = "category" | "placeholder";

export type Product = {
  id: string;
  category: string;
  pl: string;
  en: string;
  image: string;
  inventory: Inventory;
};

export type Category = {
  id: string;
  pl: string;
  en: string;
  image: string;
};

export const categories: Category[] = [
  {
    id: "zasilanie",
    pl: "Zasilanie",
    en: "Power",
    image: "/photos/generator.jpg",
  },
  {
    id: "meble",
    pl: "Meble",
    en: "Furniture",
    image: "/photos/chairs-white.jpg",
  },
  {
    id: "scena",
    pl: "Scena",
    en: "Stage",
    image: "/photos/stage.jpg",
  },
  {
    id: "efekty",
    pl: "Efekty",
    en: "Effects",
    image: "/photos/hazer.jpg",
  },
  {
    id: "klimat",
    pl: "Klimat",
    en: "Climate",
    image: "/photos/climate.jpg",
  },
  {
    id: "namioty",
    pl: "Namioty",
    en: "Tents",
    image: "/photos/tent-black.jpg",
  },
  {
    id: "lacznosc",
    pl: "Łączność",
    en: "Radios",
    image: "/photos/radios.jpg",
  },
];

export const products: Product[] = [
  {
    id: "generators",
    category: "zasilanie",
    pl: "Generatory",
    en: "Generators",
    image: "/photos/generator.jpg",
    inventory: "category",
  },
  {
    id: "chairs-white-plastic",
    category: "meble",
    pl: "Białe składane krzesła plastikowe",
    en: "White folding plastic chairs",
    image: "/photos/chairs-white.jpg",
    inventory: "placeholder",
  },
  {
    id: "tables-white",
    category: "meble",
    pl: "Białe stoły",
    en: "White tables",
    image: "/photos/tables-white.jpg",
    inventory: "placeholder",
  },
  {
    id: "tables-gray",
    category: "meble",
    pl: "Szare stoły",
    en: "Gray tables",
    image: "/photos/tables-gray.jpg",
    inventory: "placeholder",
  },
  {
    id: "stage",
    category: "scena",
    pl: "Scena",
    en: "Stage",
    image: "/photos/stage.jpg",
    inventory: "placeholder",
  },
  {
    id: "hazer",
    category: "efekty",
    pl: "Hazer",
    en: "Hazer",
    image: "/photos/hazer.jpg",
    inventory: "placeholder",
  },
  {
    id: "fog",
    category: "efekty",
    pl: "Wytwornice dymu",
    en: "Fog machines",
    image: "/photos/fog.jpg",
    inventory: "placeholder",
  },
  {
    id: "climate",
    category: "klimat",
    pl: "Jednostki klimatyzacji",
    en: "Climate control units",
    image: "/photos/climate.jpg",
    inventory: "placeholder",
  },
  {
    id: "heating",
    category: "klimat",
    pl: "Ogrzewanie",
    en: "Heating",
    image: "/photos/heater.jpg",
    inventory: "category",
  },
  {
    id: "tent-3x3-eco-black",
    category: "namioty",
    pl: "Namiot 3×3 eco, czarny",
    en: "Black 3×3 tent, eco",
    image: "/photos/tent-eco.jpg",
    inventory: "placeholder",
  },
  {
    id: "tent-3x3-premium-black",
    category: "namioty",
    pl: "Namiot 3×3 premium, czarny",
    en: "Black 3×3 tent, premium",
    image: "/photos/tent-black.jpg",
    inventory: "placeholder",
  },
  {
    id: "radios",
    category: "lacznosc",
    pl: "Radiotelefony",
    en: "Radios",
    image: "/photos/radios.jpg",
    inventory: "category",
  },
];

export function categoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function productsIn(categoryId: string) {
  return products.filter((product) => product.category === categoryId);
}
