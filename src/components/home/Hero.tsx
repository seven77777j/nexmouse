"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "@/components/ui/Button";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from("[data-hero-line]", { yPercent: 110, duration: 1.4, stagger: 0.12 }, 0.15)
          .from("[data-hero-fade]", { autoAlpha: 0, y: 16, duration: 1.2, stagger: 0.08 }, 0.6)
          .from("[data-hero-product]", { autoAlpha: 0, scale: 0.92, y: 40, duration: 2.2 }, 0.2)
          .from("[data-hero-glow]", { autoAlpha: 0, duration: 2.5 }, 0.4);

        // Parallax suave al salir de la sección
        gsap.to("[data-hero-product]", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to("[data-hero-copy]", {
          autoAlpha: 0,
          y: -60,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "60% top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink pt-24 md:pt-28">
      {/* Luz cenital cinematográfica */}
      <div
        data-hero-glow
        className="pointer-events-none absolute left-1/2 top-[38%] h-[70vh] w-[110vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(164,44,66,0.10),transparent_62%)]"
      />

      <div data-hero-copy className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center md:px-10">
        <p data-hero-fade className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45 md:text-[11px] md:tracking-[0.4em]">
          Mouse y teclados gaming · Selección @yamli_store
        </p>
        <h1 className="mt-6 font-display text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] text-white md:text-[7.6vw] xl:text-[112px]">
          <span className="block overflow-hidden">
            <span data-hero-line className="block">PRECISION IS</span>
          </span>
          <span className="block overflow-hidden">
            <span data-hero-line className="block text-white/90">
              EVERYTHING<span className="text-accent-soft">.</span>
            </span>
          </span>
        </h1>
        <p data-hero-fade className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-white/50 md:text-base">
          El Top 3 de las mejores marcas del mundo gamer, elegido modelo por modelo. Encuentra el tuyo y consulta precio al instante.
        </p>
        <div data-hero-fade className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/products">
            Ver colección <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </ButtonLink>
          <ButtonLink href="#experience" variant="outline">
            Explorar en 360°
          </ButtonLink>
        </div>
      </div>

      <div data-hero-product className="relative z-0 mx-auto -mt-[12vw] w-full max-w-6xl flex-1 md:-mt-[17vw] xl:-mt-56">
        <div className="relative aspect-[16/10] w-full sequence-mask">
          <Image
            src="/images/home/portada-mouse-v2.webp"
            alt="Logitech G Pro X Superlight 2"
            fill
            priority
            sizes="(min-width: 1280px) 1152px, 100vw"
            className="object-contain"
          />
        </div>
      </div>

      <a
        href="#experience"
        data-hero-fade
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white"
        aria-label="Desplázate para descubrir"
      >
        Descubre
        <span className="relative h-10 w-px overflow-hidden bg-white/10">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-white/70" />
        </span>
        <ChevronDown size={12} className="sr-only" />
      </a>
    </section>
  );
}
