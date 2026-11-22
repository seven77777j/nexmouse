"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/types/product";
import { useCart } from "@/store/cart";
import { availabilityLabel, canPurchase, formatPrice } from "@/lib/format";
import { maxPurchasable } from "@/lib/inventory";
import { siteConfig } from "@/config/site";
import { QuantitySelector } from "@/components/product/QuantitySelector";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ConsultButton } from "@/components/product/ConsultButton";
import { buttonClass } from "@/components/ui/Button";

export function PurchasePanel({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { add, close } = useCart();
  const router = useRouter();
  const max = maxPurchasable(product);

  if (!canPurchase(product)) {
    return (
      <div>
        <p className="font-display text-3xl font-light text-white">Precio a consultar</p>
        <p className="mt-2 text-sm text-white/45">
          Escríbenos y te confirmamos precio, colores y disponibilidad.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <ConsultButton product={product} className="w-full sm:w-auto" />
          {product.sourceUrl && (
            <a
              href={product.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonClass("outline", "w-full sm:w-auto")}
            >
              Ver en TikTok {siteConfig.consult.tiktokHandle}
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="font-display text-4xl font-light tabular-nums text-white">{formatPrice(product.price!)}</p>
      <p className="mt-2 text-sm text-white/45">
        {availabilityLabel[product.availability]}
        {product.availability === "low_stock" && ` · quedan ${product.stock}`}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <QuantitySelector value={qty} onChange={setQty} max={Math.max(1, max)} />
        <AddToCartButton product={product} quantity={qty} variant="outline" className="flex-1 sm:flex-none" />
        <button
          type="button"
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
    </div>
  );
}
