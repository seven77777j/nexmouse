import type { ImageSequenceConfig } from "@/types/product";

/**
 * Secuencia principal de la home.
 * Para usar frames reales: reemplaza los archivos en /public/images/mouse-sequence
 * manteniendo la nomenclatura frame_000.webp … y ajusta frameCount / aspect.
 */
export const heroSequence: Omit<ImageSequenceConfig, "chapters"> = {
  basePath: "/images/mouse-sequence",
  frameCount: 121,
  prefix: "frame_",
  pad: 3,
  extension: "webp",
  aspect: 1440 / 900,
  isPlaceholder: true,
};

export function frameSrc(cfg: Pick<ImageSequenceConfig, "basePath" | "prefix" | "pad" | "extension">, i: number) {
  const n = String(i).padStart(cfg.pad ?? 3, "0");
  return `${cfg.basePath}/${cfg.prefix ?? "frame_"}${n}.${cfg.extension ?? "webp"}`;
}
