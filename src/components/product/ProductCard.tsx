import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Wifi, Cable } from "lucide-react";
import type { Product } from "@/types/product";
import { availabilityLabel, formatPrice, cn } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";

const availabilityTone: Record<Product["availability"], string> = {
  in_stock: "bg-emerald-400",
  low_stock: "bg-amber-400",
  preorder: "bg-accent",
  out_of_stock: "bg-white/25",
};

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-square overflow-hidden rounded-[28px] bg-graphite"
        aria-label={`Ver ${product.name}`}
      >
        <Image
          src={product.images[0].src}
          alt={product.images[0].alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-70" />
        <div className="absolute left-5 top-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/60">
          <span>{product.category}</span>
          <span className="text-white/25">/</span>
          <span className="flex items-center gap-1">
            {product.connectivity === "wireless" ? <Wifi size={11} /> : <Cable size={11} />}
            {product.connectivity === "wireless" ? "Wireless" : "Wired"}
          </span>
        </div>
        <span className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink/40 text-white/70 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
        {product.isDemo && (
          <span className="absolute bottom-4 left-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">Producto demo</span>
        )}
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl tracking-tight text-white">{product.name}</h3>
          <p className="mt-1 text-sm leading-relaxed text-white/45">{product.shortDescription}</p>
        </div>
        <p className="shrink-0 font-display text-lg tabular-nums text-white">{formatPrice(product.price)}</p>
      </div>

      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/40">
        {product.highlights.slice(0, 3).map((h) => (
          <li key={h}>— {h}</li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm text-white transition hover:border-white/40"
        >
          View Product
        </Link>
        <AddToCartButton product={product} className="h-11 px-5" />
        <span className="ml-auto flex items-center gap-2 text-xs text-white/45">
          <span className={cn("h-1.5 w-1.5 rounded-full", availabilityTone[product.availability])} />
          {availabilityLabel[product.availability]}
        </span>
      </div>
    </article>
  );
}
