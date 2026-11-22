"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart, type CartItem } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { maxPurchasable } from "@/lib/inventory";
import { QuantitySelector } from "@/components/product/QuantitySelector";

export function CartLineItem({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  const { setQuantity, remove } = useCart();
  const { product, quantity, lineTotal } = item;
  return (
    <div className="flex gap-4 py-5">
      <Link href={`/products/${product.slug}`} onClick={onNavigate} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-graphite">
        <Image src={product.images[0].src} alt={product.images[0].alt} fill sizes="96px" className="object-cover" />
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} onClick={onNavigate} className="text-white hover:text-accent-soft">
              {product.name}
            </Link>
            <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {product.category} · {formatPrice(product.price)}
            </p>
          </div>
          <p className="text-sm tabular-nums text-white">{formatPrice(lineTotal)}</p>
        </div>
        <div className="mt-auto flex items-center justify-between pt-3">
          <QuantitySelector size="sm" value={quantity} max={Math.max(1, maxPurchasable(product))} onChange={(v) => setQuantity(product.id, v)} />
          <button
            onClick={() => remove(product.id)}
            className="flex items-center gap-1.5 text-xs text-white/40 transition hover:text-red-300"
            aria-label={`Eliminar ${product.name} del carrito`}
          >
            <Trash2 size={14} /> Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
