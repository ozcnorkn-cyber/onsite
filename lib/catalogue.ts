/**
 * Event rental lines published on dyzurek.com. Photos are the hero images
 * from those pages, saved under public/photos. No stock counts.
 *
 * Not listed, because the site does not publish them:
 * white plastic folding chairs (the published plastic chair is a separate
 * line), gray-top tables, and separate eco and premium 3×3 tents.
 * The published tent is one 3×3 m tent.
 */

export type Product = {
  id: string;
  category: string;
  pl: string;
  en: string;
  image: string;
  /** dyzurek.com path. Not shown on the page. */
  source: string;
  sizePl: string;
  sizeEn: string;
  descPl: string;
  descEn: string;
  /** Gross price text, only when a real rate exists. Never invented. */
  pricePl?: string;
  priceEn?: string;
};

export type Category = {
  id: string;
  pl: string;
  en: string;
  /** Real catalogue photo. Omitted when none exists. */
  image?: string;
};

export const products: Product[] = [
  {
    id: "honda-eu22i",
    category: "zasilanie",
    pl: "Agregat Honda EU22i",
    en: "Honda EU22i generator",
    image: "/photos/eu22.jpg",
    source: "/wynajem-agregatu-honda-eu22i-2-2-kw/",
    sizePl: "2,2 kW",
    sizeEn: "2.2 kW",
    descPl: "Kompaktowy agregat inwertorowy.",
    descEn: "Compact inverter generator.",
  },
  {
    id: "honda-eu70is",
    category: "zasilanie",
    pl: "Agregat Honda EU70is",
    en: "Honda EU70is generator",
    image: "/photos/eu70.jpg",
    source: "/1295-2/",
    sizePl: "5,5 kW",
    sizeEn: "5.5 kW",
    descPl: "Agregat inwertorowy do większego zestawu.",
    descEn: "Inverter generator for a larger setup.",
  },
  {
    id: "dji-power-500",
    category: "zasilanie",
    pl: "Stacja zasilania DJI Power 500",
    en: "DJI Power 500 power station",
    image: "/photos/dji.jpg",
    source: "/dji-power-500-stacja-zasilania/",
    sizePl: "512 Wh, do 1000 W",
    sizeEn: "512 Wh, up to 1000 W",
    descPl: "Przenośna stacja zasilania, bez spalin.",
    descEn: "Portable power station, with no exhaust.",
  },
  {
    id: "chair-plastic",
    category: "krzesla",
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
    id: "chair-wood",
    category: "krzesla",
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
    id: "chair-director",
    category: "meble-eventowe",
    pl: "Krzesło reżyserskie wysokie",
    en: "Tall director’s chair",
    image: "/photos/chair-director.jpg",
    source: "/krzeslo-rezyserskie-wysokie/",
    sizePl: "",
    sizeEn: "",
    descPl: "Wysokie składane krzesło reżyserskie.",
    descEn: "Tall folding director’s chair.",
  },
  {
    id: "chair-soft",
    category: "meble-eventowe",
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
    id: "bench",
    category: "dodatkowe",
    pl: "Składana ławka cateringowa",
    en: "Folding catering bench",
    image: "/photos/bench.jpg",
    source: "/skladana-lawka-cateringowa/",
    sizePl: "",
    sizeEn: "",
    descPl: "Składana ławka do stołu. Mieści 3–4 osoby.",
    descEn: "Folding bench for a table. Seats 3–4 people.",
  },
  {
    id: "table-180",
    category: "stoly",
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
    id: "table-120",
    category: "stoly",
    pl: "Średni stół składany 120 cm",
    en: "Medium folding table, 120 cm",
    image: "/photos/table-120.jpg",
    source: "/stol-skladany120cm/",
    sizePl: "120 cm",
    sizeEn: "120 cm",
    descPl: "Składany stół z blatem 120 cm.",
    descEn: "Folding table with a 120 cm top.",
  },
  {
    id: "stage-2x1",
    category: "scena",
    pl: "Podest sceniczny 2×1 m",
    en: "Stage deck, 2×1 m",
    image: "/photos/stage.jpg",
    source: "/wynajem-podest-sceniczny-2x1m/",
    sizePl: "2 × 1 m",
    sizeEn: "2 × 1 m",
    descPl: "Modułowy podest sceniczny.",
    descEn: "Modular stage deck.",
  },
  {
    id: "hazer-unique",
    category: "efekty",
    pl: "Hazer Look Solutions Unique 2.1",
    en: "Look Solutions Unique 2.1 hazer",
    image: "/photos/hazer.png",
    source: "/wynajem-hazera-look-solutions-unique-2-1/",
    sizePl: "",
    sizeEn: "",
    descPl: "Hazer z DMX.",
    descEn: "Hazer with DMX.",
  },
  {
    id: "fog-ulanzi",
    category: "efekty",
    pl: "Ulanzi mini dymiarka",
    en: "Ulanzi mini fog machine",
    image: "/photos/fog-ulanzi.jpg",
    source: "/wynajem-ulanzi-filmog-ace-mini-fog-machine/",
    sizePl: "",
    sizeEn: "",
    descPl: "Przenośna wytwornica dymu.",
    descEn: "Portable fog machine.",
  },
  {
    id: "fog-1500",
    category: "efekty",
    pl: "Dymiarka 1500 W",
    en: "Fog machine, 1500 W",
    image: "/photos/fog-1500.jpg",
    source: "/dymiarka-2/",
    sizePl: "1500 W",
    sizeEn: "1500 W",
    descPl: "Wytwornica dymu o mocy 1500 W.",
    descEn: "Fog machine, 1500 W.",
  },
  {
    id: "fog-mf100",
    category: "efekty",
    pl: "Zamgławiacz termiczny MF-100",
    en: "MF-100 thermal fogger",
    image: "/photos/fog-mf.png",
    source: "/zamglawiacz-termiczny-mf-100/",
    sizePl: "",
    sizeEn: "",
    descPl: "Zamgławiacz do większych przestrzeni.",
    descEn: "Fogger for larger spaces.",
  },
  {
    id: "fral-supercool",
    category: "klimat",
    pl: "Klimatyzator Fral Supercool",
    en: "Fral Supercool air conditioner",
    image: "/photos/fral.png",
    source: "/1457-2/",
    sizePl: "chłodzenie 4,1 kW, grzanie 4,0 kW",
    sizeEn: "cooling 4.1 kW, heating 4.0 kW",
    descPl: "Wolnostojąca jednostka do chłodzenia i grzania.",
    descEn: "Freestanding unit for cooling and heating.",
  },
  {
    id: "heater-convector",
    category: "klimat",
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
    category: "klimat",
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
    id: "heater-3300",
    category: "klimat",
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
    category: "klimat",
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
    category: "klimat",
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
    category: "klimat",
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
    id: "heater-xl61",
    category: "klimat",
    pl: "Promiennik Master XL61",
    en: "Master XL61 heater",
    image: "/photos/heater-xl.jpg",
    source: "/master-xl61-mobilny-promiennik-olejowy-diesel-17-kw/",
    sizePl: "17 kW",
    sizeEn: "17 kW",
    descPl: "Mobilny promiennik olejowy.",
    descEn: "Mobile oil-fired heater.",
  },
  {
    id: "fan-floor",
    category: "klimat",
    pl: "Wentylator podłogowy",
    en: "Floor fan",
    image: "/photos/fan-floor.jpg",
    source: "/wentylator-podlogowy/",
    sizePl: "35 W, średnica 25 cm",
    sizeEn: "35 W, 25 cm diameter",
    descPl: "Wentylator podłogowy o dwóch biegach.",
    descEn: "Floor fan with two speeds.",
  },
  {
    id: "fan-stand",
    category: "klimat",
    pl: "Wentylator na stojaku",
    en: "Pedestal fan",
    image: "/photos/fan-stand.jpg",
    source: "/wentylator-stojak/",
    sizePl: "",
    sizeEn: "",
    descPl: "Wentylator na stojaku.",
    descEn: "Pedestal fan.",
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
    descPl: "Namiot 3 × 3 m, także do ustawienia w pomieszczeniu.",
    descEn: "3 × 3 m tent, including indoor use.",
  },
  {
    id: "radio-xt420",
    category: "lacznosc",
    pl: "Radiotelefon Motorola XT420",
    en: "Motorola XT420 radio",
    image: "/photos/radio.jpg",
    source: "/motorola-xt420/",
    sizePl: "8 kanałów",
    sizeEn: "8 channels",
    descPl: "Lekki radiotelefon.",
    descEn: "Light two-way radio.",
  },
  {
    id: "radio-r2",
    category: "lacznosc",
    pl: "Radiotelefon Motorola R2",
    en: "Motorola R2 radio",
    image: "/photos/radio-r2.png",
    source: "/wynajem-krotkofalowki-motorola-r2/",
    sizePl: "",
    sizeEn: "",
    descPl: "Radiotelefon Motorola R2.",
    descEn: "Motorola R2 two-way radio.",
  },
  {
    id: "eartec",
    category: "lacznosc",
    pl: "Eartec UltraLite",
    en: "Eartec UltraLite",
    image: "/photos/eartec.jpg",
    source: "/eartec/",
    sizePl: "",
    sizeEn: "",
    descPl: "Zestaw słuchawkowy do rozmowy w obie strony.",
    descEn: "Headset system for two-way talk.",
  },
];

export const categories: Category[] = [
  { id: "stoly", pl: "Stoły", en: "Tables", image: "/photos/table-180.jpg" },
  { id: "krzesla", pl: "Krzesła", en: "Chairs", image: "/photos/chair-plastic.jpg" },
  { id: "meble-eventowe", pl: "Meble eventowe", en: "Event furniture", image: "/photos/chair-director.jpg" },
  { id: "namioty", pl: "Namioty i zadaszenia", en: "Tents and canopies", image: "/photos/tent.jpg" },
  { id: "dodatkowe", pl: "Wyposażenie dodatkowe", en: "Additional equipment", image: "/photos/bench.jpg" },
  { id: "scena", pl: "Scena", en: "Stage", image: "/photos/stage.jpg" },
  { id: "efekty", pl: "Efekty", en: "Effects", image: "/photos/hazer.png" },
  { id: "klimat", pl: "Klimat", en: "Climate", image: "/photos/fral.png" },
  { id: "lacznosc", pl: "Łączność", en: "Radios", image: "/photos/radio.jpg" },
  { id: "zasilanie", pl: "Zasilanie", en: "Power", image: "/photos/eu22.jpg" },
  { id: "catering", pl: "Catering", en: "Catering" },
  { id: "makeup", pl: "Makeup i garderoba", en: "Makeup and wardrobe" },
];

/** Homepage and Oferta order. Empty categories stay hidden. */
const offerOrder = ["stoly", "krzesla", "meble-eventowe", "namioty", "dodatkowe", "catering", "makeup"];

export function categoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function productsIn(categoryId: string) {
  return products.filter((product) => product.category === categoryId);
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

export function searchProducts(query: string) {
  const needle = fold(query.trim());
  if (!needle) return products;
  return products.filter((product) =>
    fold([product.pl, product.en, product.sizePl, product.sizeEn, product.descPl, product.descEn].join(" ")).includes(
      needle,
    ),
  );
}

/** Live search. An empty query matches nothing. */
export function catalogueMatches(query: string) {
  const needle = fold(query.trim());
  if (!needle) return { categories: [] as Category[], products: [] as Product[] };
  return {
    categories: categories.filter(
      (category) => productsIn(category.id).length > 0 && fold(`${category.pl} ${category.en}`).includes(needle),
    ),
    products: products.filter((product) =>
      fold(
        [product.pl, product.en, product.sizePl, product.sizeEn, product.descPl, product.descEn].join(" "),
      ).includes(needle),
    ),
  };
}
