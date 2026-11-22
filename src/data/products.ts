import type { Product } from "@/types/product";
import { heroSequence } from "@/config/sequence";

/**
 * CATÁLOGO DE DEMOSTRACIÓN
 * ------------------------------------------------------------------
 * Todos los productos, precios y especificaciones son FICTICIOS y sirven
 * solo para maquetar la tienda (isDemo: true). Sustitúyelos por los datos
 * reales de cada modelo antes de publicar. Esta es la única fuente de verdad
 * del catálogo: en el futuro puede reemplazarse por una API / CMS / ERP
 * manteniendo el tipo `Product`.
 */

const gallery = (key: string, name: string) =>
  [1, 2, 3, 4].map((n) => ({
    src: `/images/products/${key}-${n}.webp`,
    alt: `${name} — render de demostración, vista ${n}`,
  }));

export const products: Product[] = [
  {
    id: "nx-phantom-x",
    slug: "phantom-x",
    name: "Phantom X",
    category: "gaming",
    connectivity: "wireless",
    price: 149,
    shortDescription: "Buque insignia inalámbrico para competición.",
    description:
      "Modelo de demostración pensado para juego competitivo: carcasa simétrica de perfil bajo, botones con separación central y una línea de luz perimetral que marca su silueta.",
    highlights: ["Perfil ultraligero", "Inalámbrico de baja latencia", "DPI configurable", "Sensor óptico de alta precisión"],
    specs: [
      { label: "Sensor", value: "Óptico (valor demo)" },
      { label: "DPI", value: "100 – 26.000 (demo)" },
      { label: "Polling rate", value: "Hasta 4.000 Hz (demo)" },
      { label: "Peso", value: "58 g (demo)" },
      { label: "Conectividad", value: "2,4 GHz + Bluetooth (demo)" },
      { label: "Autonomía", value: "Hasta 90 h (demo)" },
      { label: "Botones", value: "5 programables (demo)" },
    ],
    images: gallery("phantom", "Phantom X"),
    availability: "in_stock",
    stock: 24,
    tags: ["esports", "ligero", "fps"],
    isDemo: true,
    featured: true,
    sequence: {
      ...heroSequence,
      chapters: [
        {
          from: 0,
          to: 30,
          eyebrow: "01 — Diseño",
          title: "Forma esculpida para desaparecer en tu mano.",
          body: "Una silueta continua, sin aristas innecesarias. Cada curva existe por una razón.",
          align: "left",
        },
        {
          from: 31,
          to: 60,
          eyebrow: "02 — Ergonomía",
          title: "Construido ligero. Construido para durar.",
          body: "Estructura interna optimizada y superficies con agarre para sesiones largas sin fatiga.",
          stats: [
            { label: "Peso", value: "58 g" },
            { label: "Botones", value: "5" },
          ],
          align: "right",
        },
        {
          from: 61,
          to: 90,
          eyebrow: "03 — Sensor",
          title: "Precisión al píxel. Latencia mínima.",
          body: "Seguimiento óptico de alta precisión y frecuencia de sondeo elevada para cada micro-ajuste.",
          stats: [
            { label: "DPI máx.", value: "26K" },
            { label: "Polling", value: "4K Hz" },
          ],
          align: "left",
        },
        {
          from: 91,
          to: 120,
          eyebrow: "04 — Phantom X",
          title: "Precision is everything.",
          body: "El nuevo estándar de NEXMOUSE para quienes exigen más.",
          align: "right",
        },
      ],
    },
  },
  {
    id: "nx-spectre-pro",
    slug: "spectre-pro",
    name: "Spectre Pro",
    category: "gaming",
    connectivity: "wireless",
    price: 129,
    shortDescription: "Compacto, rápido y equilibrado para todos los agarres.",
    description:
      "Modelo de demostración de perfil bajo y acabado satinado, orientado a jugadores que alternan entre agarre claw y fingertip.",
    highlights: ["Formato compacto", "Inalámbrico", "Acabado satinado", "Switches ópticos"],
    specs: [
      { label: "Sensor", value: "Óptico (valor demo)" },
      { label: "DPI", value: "100 – 20.000 (demo)" },
      { label: "Polling rate", value: "Hasta 1.000 Hz (demo)" },
      { label: "Peso", value: "63 g (demo)" },
      { label: "Conectividad", value: "2,4 GHz (demo)" },
      { label: "Autonomía", value: "Hasta 70 h (demo)" },
    ],
    images: gallery("spectre", "Spectre Pro"),
    availability: "low_stock",
    stock: 4,
    tags: ["compacto", "claw", "fps"],
    isDemo: true,
  },
  {
    id: "nx-pulse-mini",
    slug: "pulse-mini",
    name: "Pulse Mini",
    category: "gaming",
    connectivity: "wired",
    price: 69,
    shortDescription: "Cable ultraflexible y respuesta inmediata.",
    description:
      "Modelo de demostración con cable paracord y carcasa mínima, pensado para quien prefiere conexión directa sin baterías.",
    highlights: ["Cable paracord", "Sin batería", "Muy ligero", "Plug & play"],
    specs: [
      { label: "Sensor", value: "Óptico (valor demo)" },
      { label: "DPI", value: "200 – 16.000 (demo)" },
      { label: "Polling rate", value: "1.000 Hz (demo)" },
      { label: "Peso", value: "55 g (demo)" },
      { label: "Conectividad", value: "USB-C con cable (demo)" },
    ],
    images: gallery("pulse", "Pulse Mini"),
    availability: "in_stock",
    stock: 40,
    tags: ["cable", "ligero", "budget"],
    isDemo: true,
  },
  {
    id: "nx-atelier-ergo",
    slug: "atelier-ergo",
    name: "Atelier Ergo",
    category: "professional",
    connectivity: "wireless",
    price: 119,
    shortDescription: "Ergonomía esculpida para jornadas completas.",
    description:
      "Modelo de demostración con apoyo de palma elevado y rueda de desplazamiento silenciosa, pensado para diseño, edición y desarrollo.",
    highlights: ["Apoyo de palma elevado", "Multi-dispositivo", "Clics silenciosos", "Carga USB-C"],
    specs: [
      { label: "Sensor", value: "Óptico para múltiples superficies (demo)" },
      { label: "DPI", value: "200 – 8.000 (demo)" },
      { label: "Dispositivos", value: "Hasta 3 emparejados (demo)" },
      { label: "Peso", value: "128 g (demo)" },
      { label: "Conectividad", value: "Bluetooth + receptor (demo)" },
      { label: "Autonomía", value: "Hasta 70 días (demo)" },
    ],
    images: gallery("atelier", "Atelier Ergo"),
    availability: "in_stock",
    stock: 18,
    tags: ["ergonómico", "diseño", "productividad", "silencioso"],
    isDemo: true,
    featured: true,
    sequence: {
      basePath: "/images/sequences/atelier",
      frameCount: 72,
      prefix: "frame_",
      pad: 3,
      extension: "webp",
      aspect: 1200 / 750,
      isPlaceholder: true,
      chapters: [
        { from: 0, to: 23, eyebrow: "Forma", title: "Diseñado alrededor de tu palma.", body: "Un perfil alto que reparte la presión de forma natural.", align: "left" },
        { from: 24, to: 47, eyebrow: "Flujo", title: "Tres dispositivos. Un gesto.", body: "Cambia entre equipos sin desconectar nada.", stats: [{ label: "Dispositivos", value: "3" }], align: "right" },
        { from: 48, to: 71, eyebrow: "Autonomía", title: "Semanas de trabajo con una carga.", body: "Carga rápida por USB-C cuando lo necesites.", stats: [{ label: "Autonomía", value: "70 d" }], align: "left" },
      ],
    },
  },
  {
    id: "nx-nimbus-flow",
    slug: "nimbus-flow",
    name: "Nimbus Flow",
    category: "professional",
    connectivity: "wireless",
    price: 89,
    shortDescription: "Silencioso, portátil y preciso en cualquier superficie.",
    description:
      "Modelo de demostración de tamaño medio para trabajar desde cualquier lugar, con acabado mineral cálido.",
    highlights: ["Portátil", "Clics silenciosos", "Bluetooth", "Acabado mineral"],
    specs: [
      { label: "Sensor", value: "Óptico (valor demo)" },
      { label: "DPI", value: "400 – 4.000 (demo)" },
      { label: "Dispositivos", value: "Hasta 2 emparejados (demo)" },
      { label: "Peso", value: "96 g (demo)" },
      { label: "Conectividad", value: "Bluetooth (demo)" },
      { label: "Autonomía", value: "Hasta 4 meses (demo)" },
    ],
    images: gallery("nimbus", "Nimbus Flow"),
    availability: "preorder",
    stock: 0,
    tags: ["portátil", "silencioso", "oficina"],
    isDemo: true,
  },
  {
    id: "nx-vector-studio",
    slug: "vector-studio",
    name: "Vector Studio",
    category: "professional",
    connectivity: "wired",
    price: 59,
    shortDescription: "Precisión con cable para estaciones de trabajo.",
    description:
      "Modelo de demostración con cable y acabado claro, pensado para puestos fijos de diseño y programación.",
    highlights: ["Conexión con cable", "Rueda de precisión", "Acabado claro", "Sin baterías"],
    specs: [
      { label: "Sensor", value: "Óptico (valor demo)" },
      { label: "DPI", value: "400 – 6.400 (demo)" },
      { label: "Peso", value: "88 g (demo)" },
      { label: "Conectividad", value: "USB-C con cable (demo)" },
    ],
    images: gallery("vector", "Vector Studio"),
    availability: "out_of_stock",
    stock: 0,
    tags: ["cable", "oficina", "programación"],
    isDemo: true,
  },
];
