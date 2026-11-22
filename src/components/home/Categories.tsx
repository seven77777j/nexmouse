import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Keyboard } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { getAllProducts, getBrands } from "@/lib/products";

export function Categories() {
  const all = getAllProducts();
  const mice = all.filter((p) => p.category === "mouse").length;
  const keyboards = all.filter((p) => p.category === "keyboard").length;
  const mouseBrands = getBrands("mouse");
  const keyboardBrands = getBrands("keyboard");

  return (
    <section id="categorias" className="relative bg-ink py-28 md:py-40">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Categorías" title={<>Todo para<br />tu setup.</>}>
          Mouse y teclados gaming de las marcas que marcan el ritmo. Elige por dónde empezar.
        </SectionHeading>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {/* MOUSE — frío, técnico, acento eléctrico */}
          <Link
            data-reveal
            href="/products?category=mouse"
            className="group relative flex min-h-[600px] flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0b0c10] p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(76,141,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(76,141,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_60%,#000,transparent_70%)]" />
            <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              <span>01 / Mouse</span>
              <span className="text-white/30">{mice} modelos</span>
            </div>
            <h3 className="relative mt-8 font-display text-5xl font-semibold uppercase leading-none tracking-[-0.03em] text-white md:text-7xl">
              Mouse
            </h3>
            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Ultraligeros, inalámbricos y de competición. El Top 3 de {mouseBrands.length} marcas.
            </p>
            <div className="relative -mx-8 my-4 flex-1 md:-mx-12">
              <Image
                src="/images/home/categoria-mouse.webp"
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain mix-blend-lighten transition-transform duration-[1.4s] ease-premium group-hover:scale-105 [mask-image:radial-gradient(ellipse_at_center,#000_60%,transparent_88%)]"
              />
            </div>
            <p className="relative text-xs leading-relaxed text-white/40">{mouseBrands.slice(0, 12).join(" · ")} …</p>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm text-white">
              Ver mouse <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </Link>

          {/* TECLADOS — cálido, sereno */}
          <Link
            data-reveal
            href="/products?category=keyboard"
            className="group relative flex min-h-[600px] flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#17171a] to-[#101012] p-8 md:p-12"
          >
            <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              <span>02 / Teclados</span>
              <span className="text-white/30">{keyboards} modelos</span>
            </div>
            <h3 className="relative mt-8 font-display text-5xl font-light leading-none tracking-[-0.03em] text-white md:text-7xl">
              Teclados
            </h3>
            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Magnéticos, Hall Effect y low-profile. El Top 3 de {keyboardBrands.length} marcas.
            </p>
            <div className="relative my-4 flex flex-1 items-center justify-center">
              <Keyboard
                strokeWidth={0.5}
                className="h-56 w-56 text-white/15 transition-transform duration-[1.4s] ease-premium group-hover:scale-105 md:h-72 md:w-72"
              />
            </div>
            <p className="relative text-xs leading-relaxed text-white/40">{keyboardBrands.join(" · ")}</p>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm text-white">
              Ver teclados <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
