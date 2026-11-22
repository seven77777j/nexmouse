import type { Product, ProductCategory } from "@/types/product";

/**
 * CATÁLOGO — fuente: rankings "Top 3 por marca" publicados en TikTok por @yamli_store.
 * ------------------------------------------------------------------------------
 * - Nombres y puestos tal como aparecen en las publicaciones.
 * - Sin precio (`price` vacío) → la web muestra "Consultar precio".
 *   Cuando tengas precio, añade `price: 199` al producto y se activa "Añadir al carrito".
 * - Especificaciones técnicas: no aparecen en las publicaciones, por eso figuran
 *   "Por confirmar". No se han inventado datos.
 * - Fotos: añade rutas en `images` (p. ej. "/images/products/ajazz-am3-max.webp").
 *   Mientras esté vacío se muestra una ficha tipográfica.
 */

const SOURCES = {
  mouse1: "https://www.tiktok.com/@yamli_store/photo/7673347791485226260",
  mouse2: "https://www.tiktok.com/@yamli_store/photo/7674274232930422033",
  mouse3: "https://www.tiktok.com/@yamli_store/photo/7679576364344724757",
  keyboards: "https://www.tiktok.com/@yamli_store/photo/7677334865288760596",
} as const;

type Ranking = { brand: string; source: keyof typeof SOURCES; category: ProductCategory; models: string[] };

/** Cada lista va en orden de ranking: [puesto 1, puesto 2, puesto 3]. */
const rankings: Ranking[] = [
  // ——— Mouse · Top 3 por marca (parte 1)
  { brand: "WLMOUSE", source: "mouse1", category: "mouse", models: ["YING Forged", "× The Swords", "Strider"] },
  { brand: "Lamzu", source: "mouse1", category: "mouse", models: ["× Reject Paro", "Tachi", "Maya Doodle"] },
  { brand: "ATK", source: "mouse1", category: "mouse", models: ["Zero Extreme", "Ghost Extreme", "A9 Air+"] },
  { brand: "MCHOSE", source: "mouse1", category: "mouse", models: ["A7X Ultra", "K7 V2 Ultra+", "L7 Ultra+"] },
  { brand: "Attack Shark", source: "mouse1", category: "mouse", models: ["R11 Ultra", "R5 Ultra", "V8 Ultra"] },
  { brand: "Delux", source: "mouse1", category: "mouse", models: ["M900 Ultra", "M800 Mini Ultra", "M700 Ultra"] },
  { brand: "Aula", source: "mouse1", category: "mouse", models: ["X9", "V9", "SC900"] },
  { brand: "Scyrox", source: "mouse1", category: "mouse", models: ["V8", "V6"] },
  { brand: "Irok", source: "mouse1", category: "mouse", models: ["HE 6 Ultra"] },
  { brand: "Rapoo", source: "mouse1", category: "mouse", models: ["VT0 Air Max", "VT7 Max Gen-2", "VT2 Max Gen"] },
  { brand: "Monsgeek", source: "mouse1", category: "mouse", models: ["Echo", "Nest", "Dash"] },
  // ——— Mouse · Top 3 por marca (parte 2)
  { brand: "Finalmouse", source: "mouse2", category: "mouse", models: ["Starlight X (SLX)", "UltralightX (ULX) Competition Series", "UltralightX Pro Series"] },
  { brand: "Logitech", source: "mouse2", category: "mouse", models: ["X2 Superstrike", "G Pro X Superlight 2", "G Pro Superlight"] },
  { brand: "Razer", source: "mouse2", category: "mouse", models: ["Viper V4 Pro", "Viper V3 Pro", "Viper Mini Signature Edition"] },
  { brand: "VGN", source: "mouse2", category: "mouse", models: ["Dragonfly F1 V5 Turbo+", "Dragonfly Y2 V2 MasterGT", "Dragonfly 3 Ultra"] },
  { brand: "Incott", source: "mouse2", category: "mouse", models: ["G23 V2 Pro", "G24 Pro", "039 V2"] },
  { brand: "Royal Kludge", source: "mouse2", category: "mouse", models: ["M3", "MG6", "MG5"] },
  { brand: "Pwnage", source: "mouse2", category: "mouse", models: ["Vanta", "Trinity", "Stormbreaker"] },
  { brand: "Rawm", source: "mouse2", category: "mouse", models: ["Leviathan V4"] },
  // ——— Mouse · Top 3 por marca (parte 3)
  { brand: "Ajazz", source: "mouse3", category: "mouse", models: ["AM3 Max", "AJ179 Apex", "AJ159 Apex"] },
  { brand: "Ninjutso", source: "mouse3", category: "mouse", models: ["Sora V3", "Sora Ten Max", "X Vaxxe 4K"] },
  { brand: "Glorious", source: "mouse3", category: "mouse", models: ["Model O3", "Model O2 Pro", "Model D2 Pro"] },
  { brand: "Smailwolf", source: "mouse3", category: "mouse", models: ["RS6", "M9", "M8"] },
  { brand: "IPI", source: "mouse3", category: "mouse", models: ["Hazex Fog", "Fly", "QI Pro"] },
  { brand: "Eweadn", source: "mouse3", category: "mouse", models: ["Z7", "S9 V2 Ultimate", "S9+ Ultimate"] },
  { brand: "Kysona", source: "mouse3", category: "mouse", models: ["Jupiter Ultra", "Jupiter X Ultra", "Uranus Ultra"] },
  { brand: "Gravastar", source: "mouse3", category: "mouse", models: ["Mercury X Air", "Mercury X Pro"] },
  { brand: "Dareu", source: "mouse3", category: "mouse", models: ["A950 Air Wing", "AE6", "A980 Pro Max"] },
  // ——— Teclados · Top 3 por marca
  { brand: "Irok", source: "keyboards", category: "keyboard", models: ["RA68 M-DCE", "ND68 Pro", "FE87 V2"] },
  { brand: "Wooting", source: "keyboards", category: "keyboard", models: ["80HE", "60HE V2", "Two"] },
  { brand: "Aula", source: "keyboards", category: "keyboard", models: ["Win68 HE Ultra", "AG60 Pro", "Hero 68 HE"] },
  { brand: "MCHOSE", source: "keyboards", category: "keyboard", models: ["Ace 68 Turbo", "Mix 87", "Jet 75"] },
  { brand: "SteelSeries", source: "keyboards", category: "keyboard", models: ["Apex Pro Wireless (Gen 3)", "Apex Pro Mini (Gen 3)", "Apex Pro (Gen 3)"] },
  { brand: "ATK", source: "keyboards", category: "keyboard", models: ["RS7 V2 Ultra", "68 V3", "RS6 Air"] },
  { brand: "Razer", source: "keyboards", category: "keyboard", models: ["Huntsman V3 Pro Low-Profile", "BlackWidow V4 Pro 75%", "Huntsman V3 Pro Mini"] },
  { brand: "Akko", source: "keyboards", category: "keyboard", models: ["5075 V5 TMR", "MOD 007 V5 HE", "5087 V3 HE"] },
  { brand: "Epomaker", source: "keyboards", category: "keyboard", models: ["HE75 V2 TMR", "HE65 V2 TMR"] },
];

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const categoryLabel: Record<ProductCategory, string> = { mouse: "mouse", keyboard: "teclados" };

const PENDING = "Por confirmar";
const pendingSpecs = (c: ProductCategory) =>
  c === "mouse"
    ? ["Sensor", "DPI", "Polling rate", "Peso", "Conectividad", "Autonomía"].map((label) => ({ label, value: PENDING }))
    : ["Formato", "Switches", "Conectividad", "Polling rate", "Retroiluminación"].map((label) => ({ label, value: PENDING }));

export const products: Product[] = rankings.flatMap((r) =>
  r.models.map((model, i) => {
    const rank = (i + 1) as 1 | 2 | 3;
    const name = `${r.brand} ${model}`;
    return {
      id: slugify(`${r.category}-${name}`),
      slug: slugify(name) + (r.category === "keyboard" ? "-teclado" : ""),
      brand: r.brand,
      model,
      category: r.category,
      description: `Puesto #${rank} en el Top 3 de ${categoryLabel[r.category]} ${r.brand} de @yamli_store. Consúltanos precio, colores y disponibilidad.`,
      highlights: [`Top ${rank} ${r.brand}`, r.category === "mouse" ? "Mouse gaming" : "Teclado gaming"],
      specs: pendingSpecs(r.category),
      images: [],
      availability: "consult" as const,
      stock: 0,
      tags: [r.brand, r.category === "mouse" ? "mouse" : "teclado", "gaming", "setup"],
      rank,
      sourceUrl: SOURCES[r.source],
      featured: rank === 1,
    } satisfies Product;
  })
);
