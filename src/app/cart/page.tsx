"use client";

import { ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice } from "@/lib/format";
import { ButtonLink, Button } from "@/components/ui/Button";
import { CartLineItem } from "@/components/cart/CartLineItem";

export default function CartPage() {
  const { items, subtotal, hydrated, clear } = useCart();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-36 md:px-10 md:pt-44">
      <h1 className="font-display text-5xl font-medium tracking-[-0.03em] text-white md:text-6xl">Carrito</h1>

      {!hydrated ? (
        <div className="mt-16 h-40 animate-pulse rounded-[28px] bg-white/[0.02]" />
      ) : items.length === 0 ? (
        <div className="mt-16 rounded-[28px] border border-white/[0.06] p-16 text-center">
          <p className="text-white/50">Tu carrito está vacío.</p>
          <ButtonLink href="/products" className="mt-8">Explorar colección</ButtonLink>
        </div>
      ) : (
        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          <div className="divide-y divide-white/[0.06] border-y border-white/[0.06] lg:col-span-8">
            {items.map((item) => (
              <CartLineItem key={item.product.id} item={item} />
            ))}
          </div>
          <aside className="h-fit rounded-[28px] border border-white/[0.06] bg-carbon p-8 lg:sticky lg:top-28 lg:col-span-4">
            <h2 className="font-display text-xl text-white">Resumen</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-white/50">Subtotal</dt><dd className="tabular-nums text-white">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-white/50">Envío</dt><dd className="text-white/40">Se calcula después</dd></div>
              <div className="flex justify-between"><dt className="text-white/50">Impuestos</dt><dd className="text-white/40">Se calculan después</dd></div>
            </dl>
            <ButtonLink href="/checkout" className="mt-8 w-full">
              Ir al checkout <ArrowRight size={16} />
            </ButtonLink>
            <Button variant="ghost" onClick={clear} className="mt-2 w-full text-xs">Vaciar carrito</Button>
          </aside>
        </div>
      )}
    </div>
  );
}
