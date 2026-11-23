import type { ImageSequenceConfig } from "@/types/product";

/**
 * Secuencia principal de la home.
 * Para usar frames reales: reemplaza los archivos en /public/images/mouse-sequence
 * manteniendo la nomenclatura frame_000.webp … y ajusta frameCount / aspect.
 */
export const heroSequence: Omit<ImageSequenceConfig, "chapters"> = {
  basePath: "/images/sequences/ying-forged",
  frameCount: 120,
  prefix: "frame_",
  pad: 3,
  extension: "webp",
  aspect: 960 / 600,
  isPlaceholder: false,
};

export function frameSrc(cfg: Pick<ImageSequenceConfig, "basePath" | "prefix" | "pad" | "extension">, i: number) {
  const n = String(i).padStart(cfg.pad ?? 3, "0");
  return `${cfg.basePath}/${cfg.prefix ?? "frame_"}${n}.${cfg.extension ?? "webp"}`;
}

/** Textos de la secuencia 360° de la home (rangos en frames). */
export function homeChapters(stats: { models: number; brands: number }): NonNullable<ImageSequenceConfig["chapters"]> {
  return [
    {
      from: 0,
      to: 30,
      eyebrow: "01 — Diseño",
      title: "Formas pensadas para desaparecer en tu mano.",
      body: "Siluetas limpias, materiales ligeros y agarres para cada estilo de juego.",
      align: "left",
    },
    {
      from: 31,
      to: 60,
      eyebrow: "02 — Selección",
      title: "Solo lo mejor de cada marca.",
      body: "Comparamos los modelos de cada fabricante y nos quedamos con su Top 3.",
      stats: [
        { label: "Modelos", value: String(stats.models) },
        { label: "Marcas", value: String(stats.brands) },
      ],
      align: "right",
    },
    {
      from: 61,
      to: 90,
      eyebrow: "03 — Rendimiento",
      title: "Precisión al píxel. Respuesta inmediata.",
      body: "Sensores de última generación y conexiones de baja latencia para cada micro-ajuste.",
      align: "left",
    },
    {
      from: 91,
      to: 119,
      eyebrow: "04 — Tu setup",
      title: "Precision is everything.",
      body: "Lo mejor para tu setup, en un solo lugar.",
      align: "right",
    },
  ];
}
