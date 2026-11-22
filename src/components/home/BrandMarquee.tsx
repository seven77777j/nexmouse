import Link from "next/link";
import { getBrands } from "@/lib/products";

/** Franja de marcas en movimiento continuo. Se detiene al pasar el cursor. */
export function BrandMarquee() {
  const brands = getBrands();
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20" aria-hidden={hidden || undefined}>
      {brands.map((b) => (
        <li key={b}>
          <Link
            href={`/products?brand=${encodeURIComponent(b)}`}
            tabIndex={hidden ? -1 : undefined}
            className="whitespace-nowrap font-display text-2xl font-medium uppercase tracking-[-0.02em] text-white/25 transition-colors duration-500 hover:text-white md:text-3xl"
          >
            {b}
          </Link>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Marcas disponibles" className="relative border-y border-white/[0.06] bg-ink py-10 md:py-12">
      <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
        {brands.length} marcas · el Top 3 de cada una
      </p>
      <div className="group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
