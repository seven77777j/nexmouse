"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Truck, RotateCcw } from "lucide-react";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { availabilityLabel, canPurchase, formatPrice } from "@/lib/format";
import { maxPurchasable } from "@/lib/inventory";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { buttonClass } from "@/components/ui/Button";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add, close } = useCart();
  const router = useRouter();
  const max = maxPurchasable(product);
  const available = canPurchase(product.availability);

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="font-display text-4xl font-light tabular-nums text-white">{formatPrice(product.price)}</p>
        {product.compareAtPrice && <p className="text-white/35 line-through">{formatPrice(product.compareAtPrice)}</p>}
      </div>
      <p className="mt-2 text-sm text-white/45">
        {availabilityLabel[product.availability]}
        {product.availability === "low_stock" && ` · quedan ${product.stock}`}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} max={Math.max(1, max)} />
        <AddToCartButton product={product} quantity={qty} variant="outline" className="flex-1 sm:flex-none" />
        <button
          type="button"
          disabled={!available}
          onClick={() => {
            add(product.id, qty);
            close();
            router.push("/checkout");
          }}
          className={buttonClass("primary", "w-full sm:w-auto sm:flex-1")}
        >
          Comprar ahora
        </button>
      </div>

      <ul className="mt-10 grid gap-4 border-t border-white/[0.06] pt-8 text-sm text-white/50 sm:grid-cols-3">
        <li className="flex items-center gap-2"><Truck size={16} strokeWidth={1.5} /> Envío por definir</li>
        <li className="flex items-center gap-2"><RotateCcw size={16} strokeWidth={1.5} /> Devoluciones por definir</li>
        <li className="flex items-center gap-2"><ShieldCheck size={16} strokeWidth={1.5} /> Garantía por definir</li>
      </ul>
    </div>
  );
}
