"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useImageSequence } from "@/hooks/useImageSequence";
import type { ImageSequenceConfig } from "@/types/product";
import { cn } from "@/lib/format";

interface Props {
  config: ImageSequenceConfig;
  /** Distancia de scroll de la animación, en alturas de viewport. */
  scrollLength?: number;
  /** Altura de la escena fijada. */
  heightClass?: string;
  label?: string;
  id?: string;
}

/**
 * Sección con scroll pinning: el scroll controla directamente el frame de la
 * secuencia (avanza y retrocede con el usuario). Sin reproducción automática.
 */
export function ScrollSequence({ config, scrollLength = 3.2, heightClass = "h-[100svh]", label, id }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const { setFrame, loaded, total, ready } = useImageSequence(canvasRef, config);
  const chapters = config.chapters ?? [];
  const last = config.frameCount - 1;

  useGSAP(
    () => {
      const state = { frame: 0 };
      setFrame(0);
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * scrollLength}`,
          pin: stageRef.current,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(
        state,
        {
          frame: last,
          duration: 1,
          onUpdate: () => {
            setFrame(state.frame);
            const f = Math.round(state.frame);
            if (counterRef.current) counterRef.current.textContent = String(f).padStart(3, "0");
            if (barRef.current) barRef.current.style.transform = `scaleX(${state.frame / last})`;
          },
        },
        0
      );

      // Capítulos de texto sincronizados con rangos de frames.
      const els = gsap.utils.toArray<HTMLElement>("[data-chapter]", sectionRef.current);
      els.forEach((el, i) => {
        const ch = chapters[i];
        const inAt = ch.from / last;
        const outAt = ch.to / last;
        const fade = 0.035;
        const isLast = i === chapters.length - 1;
        gsap.set(el, { autoAlpha: 0, y: 24 });
        tl.to(el, { autoAlpha: 1, y: 0, duration: fade, ease: "power2.out" }, Math.max(0, inAt === 0 ? 0.01 : inAt));
        if (!isLast) tl.to(el, { autoAlpha: 0, y: -24, duration: fade, ease: "power2.in" }, Math.max(inAt + fade, outAt - fade));
      });

    },
    { scope: sectionRef, dependencies: [config.basePath, last, scrollLength] }
  );

  const pct = Math.round((loaded / total) * 100);

  return (
    <section ref={sectionRef} id={id} className="relative bg-ink" aria-label={label ?? "Experiencia interactiva del producto"}>
      <div ref={stageRef} className={cn("relative w-full overflow-hidden", heightClass)}>
        {/* Halo de luz detrás del producto */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_55%,rgba(164,44,66,0.07),transparent_70%)]" />

        <canvas
          ref={canvasRef}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-700 sequence-mask",
            ready ? "opacity-100" : "opacity-0"
          )}
          role="img"
          aria-label="Rotación 360° del producto controlada por el scroll"
        />

        {/* Velos laterales para que el texto se lea sin tapar el producto */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-[32vw] bg-gradient-to-r from-ink/80 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[32vw] bg-gradient-to-l from-ink/80 to-transparent md:block" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink/90 to-transparent md:hidden" />

        {/* Capítulos */}
        <div className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl px-6 md:px-10">
          {chapters.map((ch, i) => (
            <div
              key={i}
              data-chapter
              className={cn(
                "invisible absolute bottom-16 left-6 right-6 md:bottom-auto md:top-1/2 md:w-[min(26vw,340px)] md:-translate-y-1/2",
                ch.align === "right" ? "md:left-auto md:right-10 md:text-right" : "md:left-10 md:right-auto"
              )}
            >
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-accent-soft">{ch.eyebrow}</p>
              <h3 className="font-display text-[26px] font-medium leading-tight tracking-tight text-white md:text-4xl">{ch.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 md:text-base">{ch.body}</p>
              {ch.stats && (
                <dl className={cn("mt-6 flex gap-8", ch.align === "right" && "md:justify-end")}>
                  {ch.stats.map((s) => (
                    <div key={s.label}>
                      <dd className="font-display text-3xl font-light text-white md:text-4xl">{s.value}</dd>
                      <dt className="mt-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{s.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        {/* HUD inferior */}
        <div className="absolute inset-x-0 bottom-6 mx-auto flex max-w-7xl items-center gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35 md:px-10">
          <span>
            <span ref={counterRef}>000</span> / {String(last).padStart(3, "0")}
          </span>
          <div className="relative h-px flex-1 overflow-hidden bg-white/10">
            <div ref={barRef} className="absolute inset-0 origin-left scale-x-0 bg-accent" />
          </div>
          <span>{pct < 100 ? `Cargando ${pct}%` : "360°"}</span>
        </div>

        {config.isPlaceholder && (
          <p className="absolute right-6 top-24 rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-white/35 md:right-10">
            Frames provisionales
          </p>
        )}
      </div>
    </section>
  );
}
