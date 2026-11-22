"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice, cn } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { CartLineItem } from "@/components/cart/CartLineItem";

export function CartDrawer() {
  const { items, isOpen, close, subtotal, count } = useCart();
  const pathname = usePathname();

  // Cerrar al navegar.
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  return (
    <div className={cn("fixed inset-0 z-[70]", isOpen ? "pointer-events-auto" : "pointer-events-none")} aria-hidden={!isOpen}>
      <div
        onClick={close}
        className={cn("absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0")}
      />
      <aside
        role="dialog"
        aria-label="Carrito"
        className={cn(
          "absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/[0.06] bg-carbon transition-transform duration-500 ease-premium",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <p className="font-display text-lg">
            Carrito <span className="text-white/40">({count})</span>
          </p>
          <button onClick={close} className="text-white/50 hover:text-white" aria-label="Cerrar carrito">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag size={28} strokeWidth={1} className="text-white/25" />
            <p className="text-white/50">Tu carrito está vacío.</p>
            <ButtonLink href="/products" variant="outline" className="mt-2">
              Explorar colección
            </ButtonLink>
          </div>
        ) : (
          <>
            <div className="flex-1 divide-y divide-white/[0.06] overflow-y-auto px-6">
              {items.map((item) => (
                <CartLineItem key={item.product.id} item={item} onNavigate={close} />
              ))}
            </div>
            <div className="border-t border-white/[0.06] px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/50">Subtotal</span>
                <span className="tabular-nums text-white">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-white/35">Envío e impuestos se calcularán en el checkout.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <ButtonLink href="/cart" variant="outline" className="w-full">
                  Ver carrito
                </ButtonLink>
                <ButtonLink href="/checkout" className="w-full">
                  Checkout
                </ButtonLink>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
