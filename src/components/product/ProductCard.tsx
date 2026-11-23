import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/types/product";
import { productName } from "@/types/product";
import { availabilityLabel, canPurchase, categoryLabel, formatPrice } from "@/lib/format";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ConsultButton } from "@/components/product/ConsultButton";
import { ProductVisual } from "@/components/product/ProductVisual";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const purchasable = canPurchase(product);
  return (
    <article className="group relative flex flex-col">
      <Link
        href={`/products/${product.slug}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-[28px] border border-white/[0.05] bg-graphite"
        aria-label={`Ver ${productName(product)}`}
      >
        <ProductVisual
          product={product}
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="transition-transform duration-[1.2s] ease-premium group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/10 bg-ink/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-white/70 backdrop-blur-md">
          <span>{categoryLabel[product.category]}</span>
          {product.rank && (
            <>
              <span className="text-white/25">/</span>
              <span className={product.rank === 1 ? "text-accent-soft" : undefined}>Top {product.rank}</span>
            </>
          )}
        </div>
        <span className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-ink/70 text-white/70 opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100">
          <ArrowUpRight size={16} />
        </span>
      </Link>

      <div className="mt-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">{product.brand}</p>
          <h3 className="mt-1 font-display text-xl tracking-tight text-white">{product.model}</h3>
        </div>
        <p className="shrink-0 pt-4 text-sm tabular-nums text-white/70">
          {typeof product.price === "number" ? formatPrice(product.price) : "Precio a consultar"}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/products/${product.slug}`}
          className="inline-flex h-11 items-center rounded-full border border-white/15 px-5 text-sm text-white transition hover:border-white/40"
        >
          Ver producto
        </Link>
        {purchasable ? (
          <AddToCartButton product={product} className="h-11 px-5" />
        ) : (
          <ConsultButton product={product} className="h-11 px-5" />
        )}
      </div>
      {product.availability !== "consult" && (
        <p className="mt-3 text-xs text-white/40">{availabilityLabel[product.availability]}</p>
      )}
    </article>
  );
}
