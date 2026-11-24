/**
 * Event rental lines that have a page on dyzurek.com.
 * Product photos are the hero images from those pages.
 * Homepage category tiles use separate free stock photos.
 * No stock counts and no prices.
 *
 * The 150 cm table has no page of its own. It is named in the
 * Duży Dyżur Van and Średni Dyżur Van kit lists.
 * The 3×3 tent page includes three side walls and a door.
 * There is no separate page for walls or weights.
 */

export type Product = {
  id: string;
  category: string;
  pl: string;
  en: string;
  /** Omitted when the line has no photograph of its own. */
  image?: string;
  /** dyzurek.com path. Not shown on the page. */
  source: string;
  /** Filter on the parent category page. Not its own page. */
  group?: string;
  sizePl: string;
  sizeEn: string;
  descPl: string;
  descEn: string;
  /** Extra fact that is not a description of the object. */
  notePl?: string;
  noteEn?: string;
  /** Gross price text, only when a real rate exists. Never invented. */
  pricePl?: string;
  priceEn?: string;
};

export type Category = {
  id: string;
  pl: string;
  en: string;
  /** Homepage tile. Free stock, not a product cut-out. */
  image?: string;
  /** Where the tile crop sits. Omitted keeps the centre. */
  imagePosition?: string;
  /** Same-page filters. Omitted when the category is one list. */
  filters?: { id: string; pl: string; en: string }[];
};

export const products: Product[] = [
  {
    id: "table-180",
    category: "stoly-lawki",
    group: "stoly",
    pl: "Duży stół składany 180 cm",
    en: "Large folding table, 180 cm",
    image: "/photos/table-180.jpg",
    source: "/duzy-stol-skladany-180-cm/",
    sizePl: "180 cm",
    sizeEn: "180 cm",
    descPl: "Składany stół z blatem 180 cm.",
    descEn: "Folding table with a 180 cm top.",
  },
  {
    id: "table-150",
    category: "stoly-lawki",
    group: "stoly",
    pl: "Stół cateringowy 150 cm",
    en: "Catering table, 150 cm",
    source: "/duzy-dyzur-van/",
    sizePl: "150 cm",
    sizeEn: "150 cm",
    descPl: "Stół cateringowy 150 cm.",
    descEn: "Catering table, 150 cm.",
    notePl: "Nie ma osobnej strony. Stół 150 cm jest w pakietach Duży Dyżur Van i Średni Dyżur Van.",
    noteEn: "No separate page. The 150 cm table is listed in the Duży Dyżur Van and Średni Dyżur Van kits.",
  },
  {
    id: "bench",
    category: "stoly-lawki",
    group: "lawki",
    pl: "Składana ławka cateringowa",
    en: "Folding catering bench",
    image: "/photos/bench.jpg",
    source: "/skladana-lawka-cateringowa/",
    sizePl: "180 cm",
    sizeEn: "180 cm",
    descPl: "Składana ławka do stołu. Mieści 3–4 osoby.",
    descEn: "Folding bench for a table. Seats 3–4 people.",
  },
  {
    id: "chair-plastic",
    category: "krzesla",
    group: "twarde",
    pl: "Plastikowe krzesło składane",
    en: "Folding plastic chair",
    image: "/photos/chair-plastic.jpg",
    source: "/plastikowe-krzeslo-skladane/",
    sizePl: "",
    sizeEn: "",
    descPl: "Składane krzesło plastikowe, do środka i na zewnątrz.",
    descEn: "Folding plastic chair, for indoors and outdoors.",
  },
  {
    id: "chair-soft",
    category: "krzesla",
    group: "miekkie",
    pl: "Miękkie krzesła",
    en: "Soft chairs",
    image: "/photos/chair-soft.jpg",
    source: "/miekkie-krzesla/",
    sizePl: "",
    sizeEn: "",
    descPl: "Lekkie krzesła z miękkim siedziskiem.",
    descEn: "Light chairs with a soft seat.",
  },
  {
    id: "chair-wood",
    category: "krzesla",
    group: "drewniane",
    pl: "Drewniane krzesło składane",
    en: "Folding wooden chair",
    image: "/photos/chair-wood.jpg",
    source: "/drewniane-krzeslo-skladane/",
    sizePl: "",
    sizeEn: "",
    descPl: "Składane krzesło drewniane, do środka i na zewnątrz.",
    descEn: "Folding wooden chair, for indoors and outdoors.",
  },
  {
    id: "sofa-2",
    category: "meble-eventowe",
    group: "kanapy",
    pl: "Kanapa dwuosobowa",
    en: "Two-seat sofa",
    image: "/photos/sofa-2.png",
    source: "/kanapa-dwuosobowa/",
    sizePl: "",
    sizeEn: "",
    descPl: "Kanapa dwuosobowa.",
    descEn: "Two-seat sofa.",
  },
  {
    id: "sofa-3",
    category: "meble-eventowe",
    group: "kanapy",
    pl: "Kanapa trzyosobowa",
    en: "Three-seat sofa",
    image: "/photos/sofa-3.png",
    source: "/kanapa-trzyosobowa/",
    sizePl: "",
    sizeEn: "",
    descPl: "Kanapa trzyosobowa.",
    descEn: "Three-seat sofa.",
  },
  {
    id: "coffee-table",
    category: "meble-eventowe",
    group: "stoliki",
    pl: "Stolik kawowy",
    en: "Coffee table",
    image: "/photos/coffee-table.png",
    source: "/stolik-kawowy/",
    sizePl: "",
    sizeEn: "",
    descPl: "Stolik kawowy.",
    descEn: "Coffee table.",
  },
  {
    id: "work-table",
    category: "meble-eventowe",
    group: "stoliki",
    pl: "Mały stolik do pracy",
    en: "Small work table",
    image: "/photos/work-table.jpg",
    source: "/maly-stolik-do-pracy/",
    sizePl: "",
    sizeEn: "",
    descPl: "Mały stolik do pracy.",
    descEn: "Small work table.",
  },
  {
    id: "tent-3x3",
    category: "namioty",
    pl: "Namiot 3×3 m",
    en: "Tent, 3×3 m",
    image: "/photos/tent.jpg",
    source: "/namiot-2/",
    sizePl: "3 × 3 m",
    sizeEn: "3 × 3 m",
    descPl: "Namiot 3 × 3 m z trzema ścianami bocznymi i drzwiami. Można ustawić w pomieszczeniu.",
    descEn: "3 × 3 m tent with three side walls and a door. It can be set up indoors.",
  },
  {
    id: "filter-coffee",
    category: "catering-zaplecze",
    group: "kawa",
    pl: "Ekspres przelewowy",
    en: "Filter coffee machine",
    image: "/photos/filter-coffee.jpg",
    source: "/ekspres-do-kawy/",
    sizePl: "ok. 1,5 l",
    sizeEn: "about 1.5 l",
    descPl: "Ekspres przelewowy, około 1,5 litra.",
    descEn: "Filter coffee machine, about 1.5 litres.",
  },
  {
    id: "dolce-gusto",
    category: "catering-zaplecze",
    group: "kawa",
    pl: "Ekspres do kawy Dolce Gusto",
    en: "Dolce Gusto coffee machine",
    image: "/photos/dolce.jpg",
    source: "/ekspres-do-kawe-dolcegusto/",
    sizePl: "",
    sizeEn: "",
    descPl: "Ekspres do kawy Dolce Gusto.",
    descEn: "Dolce Gusto coffee machine.",
  },
  {
    id: "mini-fridge",
    category: "catering-zaplecze",
    group: "chlodzenie",
    pl: "Mini lodówka",
    en: "Mini fridge",
    image: "/photos/mini-fridge.png",
    source: "/mini-lodowka/",
    sizePl: "",
    sizeEn: "",
    descPl: "Mini lodówka.",
    descEn: "Mini fridge.",
  },
  {
    id: "yolco-gcx47",
    category: "catering-zaplecze",
    group: "chlodzenie",
    pl: "Lodówka Yolco GCX47",
    en: "Yolco GCX47 cooler",
    image: "/photos/yolco.jpg",
    source: "/yolco-gcx47/",
    sizePl: "47 l",
    sizeEn: "47 l",
    descPl: "Lodówka kompresorowa, 47 l. Może pracować z samochodu. Opcjonalna bateria zewnętrzna.",
    descEn: "Compressor cooler, 47 l. It can run from a car. An external battery is optional.",
  },
  {
    id: "clothes-rail",
    category: "catering-zaplecze",
    group: "garderoba",
    pl: "Składany wieszak",
    en: "Folding clothes rail",
    image: "/photos/rail.jpg",
    source: "/skladany-wieszak-na-ubrania/",
    sizePl: "do 15 kg",
    sizeEn: "up to 15 kg",
    descPl: "Składany wieszak na kółkach. Udźwig do 15 kg.",
    descEn: "Folding rail on wheels. Holds up to 15 kg.",
  },
  {
    id: "mirror",
    category: "catering-zaplecze",
    group: "garderoba",
    pl: "Lustro mobilne",
    en: "Portable mirror",
    image: "/photos/mirror.jpg",
    source: "/lustro-mobilne/",
    sizePl: "",
    sizeEn: "",
    descPl: "Lustro mobilne.",
    descEn: "Portable mirror.",
  },
  {
    id: "bin-popup",
    category: "organizacja",
    group: "odpady",
    pl: "Kosz pop-up",
    en: "Pop-up bin",
    image: "/photos/bin-popup.jpg",
    source: "/kosz-na-smieci-pop-up/",
    sizePl: "",
    sizeEn: "",
    descPl: "Lekki kosz pop-up. Otwiera się szybko. Worki można dokładać.",
    descEn: "Light pop-up bin. It opens quickly. Bags can be added.",
  },
  {
    id: "recycle-bins",
    category: "organizacja",
    group: "odpady",
    pl: "Kubeł plenerowy (recykling)",
    en: "Outdoor recycling bins",
    image: "/photos/recycle.jpg",
    source: "/kosze-na-smieci-do-recyklingu/",
    sizePl: "",
    sizeEn: "",
    descPl: "Kosze na szkło, plastik i papier.",
    descEn: "Bins for glass, plastic and paper.",
  },
  {
    id: "cable-ramp",
    category: "organizacja",
    group: "kable",
    pl: "Kabel najazdowy",
    en: "Cable ramp",
    image: "/photos/cable-ramp.jpg",
    source: "/kabel-najazdowy/",
    sizePl: "",
    sizeEn: "",
    descPl: "Kabel najazdowy.",
    descEn: "Cable ramp.",
  },
  {
    id: "heater-convector",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Grzejnik konwektorowy",
    en: "Convector heater",
    image: "/photos/heater-conv.jpg",
    source: "/grzejnik-konwektorowy/",
    sizePl: "2000 W",
    sizeEn: "2000 W",
    descPl: "Grzejnik elektryczny do pomieszczeń i namiotów.",
    descEn: "Electric heater for rooms and tents.",
  },
  {
    id: "heater-2000",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Nagrzewnica elektryczna 2000 W",
    en: "Electric heater, 2000 W",
    image: "/photos/heater-2000.jpg",
    source: "/nagrzewnica-elektryczna-2000w/",
    sizePl: "2000 W",
    sizeEn: "2000 W",
    descPl: "Nagrzewnica elektryczna.",
    descEn: "Electric fan heater.",
  },
  {
    id: "heater-gardyer",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Nagrzewnica Gardyer 2000 W",
    en: "Gardyer heater, 2000 W",
    image: "/photos/gardyer.jpg",
    source: "/nagrzewnica-elektryczna-2000w-1/",
    sizePl: "2000 W",
    sizeEn: "2000 W",
    descPl: "Nagrzewnica elektryczna. Rekomendowana powierzchnia do około 15–20 m².",
    descEn: "Electric heater. Recommended area up to about 15–20 m².",
  },
  {
    id: "heater-3300",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Nagrzewnica elektryczna 3300 W",
    en: "Electric heater, 3300 W",
    image: "/photos/heater-3300.png",
    source: "/nagrzewnica-elektryczna-3300w-1/",
    sizePl: "3300 W",
    sizeEn: "3300 W",
    descPl: "Nagrzewnica elektryczna z termostatem.",
    descEn: "Electric fan heater with a thermostat.",
  },
  {
    id: "heater-b2",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Nagrzewnica Master B 2 PTC",
    en: "Master B 2 PTC heater",
    image: "/photos/heater-b2.jpg",
    source: "/nagrzewnica-elektryczna-master-b-2-ptc/",
    sizePl: "2000 W, ok. 23 × 15 × 20 cm",
    sizeEn: "2000 W, about 23 × 15 × 20 cm",
    descPl: "Kompaktowa nagrzewnica elektryczna.",
    descEn: "Compact electric heater.",
  },
  {
    id: "heater-b9",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Nagrzewnica Master B 9",
    en: "Master B 9 heater",
    image: "/photos/heater-b9.jpg",
    source: "/nagrzewnica-elektryczna-master-b-9-eca/",
    sizePl: "9000 W",
    sizeEn: "9000 W",
    descPl: "Nagrzewnica elektryczna do większych przestrzeni.",
    descEn: "Electric heater for larger spaces.",
  },
  {
    id: "heater-ts3a",
    category: "ogrzewanie",
    group: "grzanie",
    pl: "Promiennik Master TS 3A",
    en: "Master TS 3A heater",
    image: "/photos/heater-ts.png",
    source: "/master-ts-3a/",
    sizePl: "0,8 / 1,6 / 2,4 kW, ok. 7,6 kg",
    sizeEn: "0.8 / 1.6 / 2.4 kW, about 7.6 kg",
    descPl: "Elektryczny promiennik podczerwieni, bez wentylatora.",
    descEn: "Electric infrared heater, with no fan.",
  },
  {
    id: "fral-supercool",
    category: "ogrzewanie",
    group: "klima",
    pl: "Klimatyzator Fral Supercool",
    en: "Fral Supercool air conditioner",
    image: "/photos/fral.png",
    source: "/1457-2/",
    sizePl: "chłodzenie 4,1 kW, grzanie 4,0 kW",
    sizeEn: "cooling 4.1 kW, heating 4.0 kW",
    descPl: "Wolnostojąca jednostka do chłodzenia i grzania.",
    descEn: "Freestanding unit for cooling and heating.",
  },
];

export const categories: Category[] = [
  {
    id: "stoly-lawki",
    pl: "Stoły i ławki",
    en: "Tables and benches",
    // Pexels 1395967. Long banquet tables. No logo.
    image: "/photos/categories/tables.jpg",
    filters: [
      { id: "stoly", pl: "Stoły", en: "Tables" },
      { id: "lawki", pl: "Ławki", en: "Benches" },
    ],
  },
  {
    id: "krzesla",
    pl: "Krzesła",
    en: "Chairs",
    // Pexels 3964344. Folding wooden chair. No logo.
    image: "/photos/categories/chairs.jpg",
    imagePosition: "18% 78%",
    filters: [
      { id: "twarde", pl: "Twarde", en: "Hard" },
      { id: "miekkie", pl: "Miękkie", en: "Soft" },
      { id: "drewniane", pl: "Drewniane", en: "Wooden" },
    ],
  },
  {
    id: "meble-eventowe",
    pl: "Meble eventowe",
    en: "Event furniture",
    // Pexels 1571468. Sofa and coffee table. No logo.
    image: "/photos/categories/lounge.jpg",
    filters: [
      { id: "kanapy", pl: "Kanapy", en: "Sofas" },
      { id: "stoliki", pl: "Stoliki", en: "Side tables" },
    ],
  },
  {
    id: "namioty",
    pl: "Namioty i zadaszenia",
    en: "Tents and canopies",
    // rawpixel px944329, CC0. White event canopy. No logo.
    image: "/photos/categories/canopy.jpg",
  },
  {
    id: "catering-zaplecze",
    pl: "Catering i zaplecze",
    en: "Catering and service",
    // Pexels 312418. Coffee cup. No logo.
    image: "/photos/categories/catering.jpg",
    filters: [
      { id: "kawa", pl: "Kawa", en: "Coffee" },
      { id: "chlodzenie", pl: "Chłodzenie", en: "Cooling" },
      { id: "garderoba", pl: "Garderoba", en: "Wardrobe" },
    ],
  },
  {
    id: "organizacja",
    pl: "Organizacja przestrzeni",
    en: "Organising the space",
    // Wikimedia Commons, Three Metal Trash Cans, Lee Ann Ratledge, CC BY 4.0. No logo.
    image: "/photos/categories/bins.jpg",
    filters: [
      { id: "odpady", pl: "Odpady", en: "Waste" },
      { id: "kable", pl: "Kable", en: "Cables" },
    ],
  },
  {
    id: "ogrzewanie",
    pl: "Ogrzewanie i klimatyzacja",
    en: "Heating and air conditioning",
    // Crop of Wikimedia Commons, Oil heater 135940, لا روسا, CC BY-SA 4.0. Fins and a wheel. Control panel left out.
    image: "/photos/categories/heater.jpg",
    filters: [
      { id: "grzanie", pl: "Ogrzewanie", en: "Heating" },
      { id: "klima", pl: "Klimatyzacja", en: "Air conditioning" },
    ],
  },
];

const offerOrder = [
  "stoly-lawki",
  "krzesla",
  "meble-eventowe",
  "namioty",
  "catering-zaplecze",
  "organizacja",
  "ogrzewanie",
];

export function categoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function productsIn(categoryId: string) {
  const items = products.filter((product) => product.category === categoryId);
  const order = categoryById(categoryId)?.filters?.map((filter) => filter.id) ?? [];
  if (order.length === 0) return items;
  return items
    .map((product, index) => ({ product, index }))
    .sort((a, b) => {
      const rank = (group: string | undefined) => {
        if (!group) return order.length;
        const at = order.indexOf(group);
        return at === -1 ? order.length : at;
      };
      const delta = rank(a.product.group) - rank(b.product.group);
      return delta === 0 ? a.index - b.index : delta;
    })
    .map((item) => item.product);
}

export function navCategories() {
  return offerOrder
    .map((id) => categories.find((category) => category.id === id))
    .filter((category): category is Category => category !== undefined && productsIn(category.id).length > 0);
}

function fold(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function listed() {
  const ids = new Set(offerOrder);
  return products.filter((product) => ids.has(product.category));
}

function blob(product: Product) {
  return [
    product.pl,
    product.en,
    product.sizePl,
    product.sizeEn,
    product.descPl,
    product.descEn,
    product.notePl ?? "",
    product.noteEn ?? "",
  ].join(" ");
}

export function searchProducts(query: string) {
  const pool = listed();
  const needle = fold(query.trim());
  if (!needle) return pool;
  return pool.filter((product) => fold(blob(product)).includes(needle));
}

/** Live search. An empty query matches nothing. Only published lines. */
export function catalogueMatches(query: string) {
  const needle = fold(query.trim());
  if (!needle) return { categories: [] as Category[], products: [] as Product[] };
  return {
    categories: navCategories().filter((category) => {
      const filters = (category.filters ?? []).map((filter) => `${filter.pl} ${filter.en}`).join(" ");
      return fold(`${category.pl} ${category.en} ${filters}`).includes(needle);
    }),
    products: listed().filter((product) => fold(blob(product)).includes(needle)),
  };
}
