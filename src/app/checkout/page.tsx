"use client";

import { ProductVisual } from "@/components/product/ProductVisual";
import { productName } from "@/types/product";
import { useState, useTransition } from "react";
import { Lock, Info } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatPrice, cn } from "@/lib/format";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { startCheckout } from "./actions";

const fields = [
  { name: "email", label: "Email", type: "email", span: 2, autoComplete: "email" },
  { name: "fullName", label: "Nombre completo", type: "text", span: 2, autoComplete: "name" },
  { name: "address", label: "Dirección", type: "text", span: 2, autoComplete: "street-address" },
  { name: "city", label: "Ciudad", type: "text", span: 1, autoComplete: "address-level2" },
  { name: "postalCode", label: "Código postal", type: "text", span: 1, autoComplete: "postal-code" },
  { name: "country", label: "País", type: "text", span: 2, autoComplete: "country-name" },
] as const;

export default function CheckoutPage() {
  const { items, subtotal, hydrated } = useCart();
  const [message, setMessage] = useState<{ tone: "info" | "error"; text: string } | null>(null);
  const [pending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const customer = Object.fromEntries(fields.map((f) => [f.name, String(fd.get(f.name) ?? "")])) as Record<(typeof fields)[number]["name"], string>;
    startTransition(async () => {
      const res = await startCheckout(
        items.map((i) => ({ productId: i.product.id, quantity: i.quantity })),
        customer
      );
      if (res.status === "redirect") {
        window.location.href = res.url;
      } else if (res.status === "unavailable") {
        setMessage({ tone: "info", text: res.reason });
      } else {
        setMessage({ tone: "error", text: res.reason });
      }
    });
  };

  if (hydrated && items.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-4xl text-white">No hay nada que pagar todavía.</h1>
        <ButtonLink href="/products" className="mt-8">Explorar colección</ButtonLink>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 pb-32 pt-36 md:px-10 md:pt-44">
      <h1 className="font-display text-5xl font-medium tracking-[-0.03em] text-white md:text-6xl">Checkout</h1>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-amber-300/20 bg-amber-300/[0.04] p-5 text-sm text-amber-100/80">
        <Info size={18} className="mt-0.5 shrink-0" />
        <p>
          Checkout en modo preparación: la pasarela de pago aún no está integrada. No se realizará ningún cargo ni se creará ningún pedido.
        </p>
      </div>

      <div className="mt-14 grid gap-14 lg:grid-cols-12">
        <form onSubmit={onSubmit} className="lg:col-span-7">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">Datos de envío</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {fields.map((f) => (
              <label key={f.name} className={cn("flex flex-col gap-2", f.span === 2 && "col-span-2")}>
                <span className="text-xs text-white/50">{f.label}</span>
                <input
                  name={f.name}
                  type={f.type}
                  required
                  autoComplete={f.autoComplete}
                  className="h-12 rounded-xl border border-white/10 bg-white/[0.02] px-4 text-sm text-white focus:border-white/35 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <h2 className="mt-12 font-mono text-[11px] uppercase tracking-[0.3em] text-white/45">Pago</h2>
          <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-8 text-center">
            <Lock size={20} strokeWidth={1.5} className="mx-auto text-white/35" />
            <p className="mt-3 text-sm text-white/60">Aquí se mostrará el formulario seguro de la pasarela de pago.</p>
            <p className="mt-1 text-xs text-white/35">Pendiente de integración (ver src/lib/checkout/payment-provider.ts).</p>
          </div>

          {message && (
            <p
              role="status"
              className={cn(
                "mt-6 rounded-xl border p-4 text-sm",
                message.tone === "error" ? "border-red-400/30 text-red-200" : "border-white/15 text-white/70"
              )}
            >
              {message.text}
            </p>
          )}

          <button type="submit" disabled={pending || !hydrated} className={buttonClass("primary", "mt-8 w-full")}>
            {pending ? "Verificando…" : "Continuar al pago"}
          </button>
        </form>

        <aside className="h-fit rounded-[28px] border border-white/[0.06] bg-carbon p-8 lg:sticky lg:top-28 lg:col-span-5">
          <h2 className="font-display text-xl text-white">Tu pedido</h2>
          <ul className="mt-6 divide-y divide-white/[0.06]">
            {items.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex items-center gap-4 py-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-graphite">
                  <ProductVisual product={product} sizes="56px" variant="thumb" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-white">{productName(product)}</p>
                  <p className="text-white/40">× {quantity}</p>
                </div>
                <p className="text-sm tabular-nums text-white">{formatPrice(lineTotal)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-3 border-t border-white/[0.06] pt-6 text-sm">
            <div className="flex justify-between"><dt className="text-white/50">Subtotal</dt><dd className="tabular-nums text-white">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-white/50">Envío e impuestos</dt><dd className="text-white/40">Pendiente</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
