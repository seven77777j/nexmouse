"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { frameSrc } from "@/config/sequence";
import type { ImageSequenceConfig } from "@/types/product";

/**
 * Orden de precarga "progresivo": primero el frame 0, luego frames cada vez
 * más densos (cada 16, 8, 4, 2, 1). Así toda la rotación es utilizable muy
 * pronto en baja resolución temporal y se va refinando.
 */
function progressiveOrder(n: number): number[] {
  const seen = new Set<number>();
  const order: number[] = [];
  const push = (i: number) => {
    if (i >= 0 && i < n && !seen.has(i)) {
      seen.add(i);
      order.push(i);
    }
  };
  push(0);
  push(n - 1);
  for (let step = 16; step >= 1; step = step / 2) {
    for (let i = 0; i < n; i += step) push(i);
  }
  return order;
}

interface Options {
  /** Empezar a cargar solo cuando el canvas esté cerca del viewport. */
  lazy?: boolean;
  /** Peticiones simultáneas. */
  concurrency?: number;
  /** Escala del producto dentro del canvas en escritorio (1 = contain). */
  productScale?: number;
}

/**
 * Gestiona la carga de frames y el dibujado en un <canvas>.
 * Devuelve `setFrame(i)`, que se puede llamar a cada evento de scroll: el
 * dibujado se agrupa en un único requestAnimationFrame.
 */
export function useImageSequence(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  config: Pick<ImageSequenceConfig, "basePath" | "frameCount" | "prefix" | "pad" | "extension">,
  { lazy = true, concurrency = 6, productScale = 0.74 }: Options = {}
) {
  const frames = useRef<(HTMLImageElement | null)[]>([]);
  const target = useRef(0);
  const drawn = useRef(-1);
  const raf = useRef(0);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const { basePath, frameCount, prefix, pad, extension } = config;

  /** Busca el frame cargado más cercano para no mostrar nunca un hueco. */
  const nearest = useCallback((i: number) => {
    const list = frames.current;
    if (list[i]) return i;
    for (let d = 1; d < list.length; d++) {
      if (list[i - d]) return i - d;
      if (list[i + d]) return i + d;
    }
    return -1;
  }, []);

  const draw = useCallback(() => {
    raf.current = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const idx = nearest(target.current);
    if (idx < 0) return;
    const img = frames.current[idx]!;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Ajustar resolución interna al tamaño CSS * DPR (máx. 2 para ahorrar memoria).
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    let resized = false;
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      resized = true;
    }
    if (idx === drawn.current && !resized) return;

    // Encaje tipo "contain": el producto siempre completo y centrado.
    // En pantallas anchas se reduce para dejar aire a los textos laterales.
    // En móvil se amplía (los frames tienen margen lateral) y se sube para dejar sitio al texto inferior.
    const mobile = canvas.clientWidth < 768;
    const fit = mobile ? 1.45 : productScale;
    const scale = Math.min(w / img.naturalWidth, h / img.naturalHeight) * fit;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    const cy = mobile ? h * 0.38 : h / 2;
    ctx.fillStyle = "#0b0a0a";
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (w - dw) / 2, cy - dh / 2, dw, dh);

    // Viñeta elíptica: funde los bordes del frame con el fondo (#0b0a0a)
    // para que nunca se perciba el rectángulo de la imagen.
    ctx.save();
    ctx.translate(w / 2, cy);
    ctx.scale(1, dh / dw);
    const g = ctx.createRadialGradient(0, 0, dw * 0.3, 0, 0, dw * 0.5);
    g.addColorStop(0, "rgba(8,8,8,0)");
    g.addColorStop(1, "rgba(8,8,8,1)");
    ctx.fillStyle = g;
    ctx.fillRect(-w, -h * (dw / dh), w * 2, h * 2 * (dw / dh));
    ctx.restore();
    drawn.current = idx;
  }, [canvasRef, nearest, productScale]);

  const schedule = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(draw);
  }, [draw]);

  const setFrame = useCallback(
    (i: number) => {
      const clamped = Math.max(0, Math.min(frameCount - 1, Math.round(i)));
      if (clamped === target.current && drawn.current === clamped) return;
      target.current = clamped;
      schedule();
    },
    [frameCount, schedule]
  );

  // Carga de imágenes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    frames.current = new Array(frameCount).fill(null);
    drawn.current = -1;
    let cancelled = false;
    let started = false;
    const pending: HTMLImageElement[] = [];
    const cfg = { basePath, prefix, pad, extension };

    const start = () => {
      if (started) return;
      started = true;
      const queue = progressiveOrder(frameCount);
      let count = 0;
      const next = () => {
        if (cancelled) return;
        const i = queue.shift();
        if (i === undefined) return;
        const img = new Image();
        img.decoding = "async";
        img.src = frameSrc(cfg, i);
        pending.push(img);
        const done = (ok: boolean) => {
          if (cancelled) return;
          if (ok) {
            frames.current[i] = img;
            count++;
            if (i === 0) setReady(true);
            // Actualizar el contador sin re-renderizar en cada frame.
            if (count % 8 === 0 || count === frameCount) setLoaded(count);
            // Si este frame está más cerca del objetivo que el dibujado, redibujar.
            if (Math.abs(i - target.current) < Math.abs(drawn.current - target.current) || drawn.current < 0) {
              schedule();
            }
          }
          next();
        };
        img
          .decode()
          .then(() => done(true))
          .catch(() => done(img.complete && img.naturalWidth > 0));
      };
      for (let k = 0; k < concurrency; k++) next();
    };

    let io: IntersectionObserver | null = null;
    if (lazy && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            start();
            io?.disconnect();
          }
        },
        { rootMargin: "150% 0px" }
      );
      io.observe(canvas);
    } else {
      start();
    }

    const ro = new ResizeObserver(() => {
      drawn.current = -1;
      schedule();
    });
    ro.observe(canvas);

    return () => {
      // Liberar recursos: cancelar descargas y soltar referencias a imágenes.
      cancelled = true;
      io?.disconnect();
      ro.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = 0;
      pending.forEach((img) => {
        img.src = "";
      });
      frames.current = [];
    };
  }, [canvasRef, basePath, frameCount, prefix, pad, extension, lazy, concurrency, schedule]);

  return { setFrame, loaded, total: frameCount, ready };
}
