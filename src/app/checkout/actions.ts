"use server";

import { getProductById } from "@/lib/products";
import { maxPurchasable } from "@/lib/inventory";
import { getPaymentProvider, type CheckoutCustomer, type CheckoutLineItem, type CheckoutResult } from "@/lib/checkout/payment-provider";

/**
 * Punto de entrada del checkout en servidor.
 * - Revalida productos, cantidades y precios con el catálogo (nunca confía en el cliente).
 * - Delega en el proveedor de pago configurado.
 * Hoy no hay pasarela integrada, así que siempre devuelve "unavailable".
 */
export async function startCheckout(
  lines: { productId: string; quantity: number }[],
  customer: CheckoutCustomer
): Promise<CheckoutResult | { status: "invalid"; reason: string }> {
  const items: CheckoutLineItem[] = [];
  for (const l of lines) {
    const p = getProductById(l.productId);
    if (!p) return { status: "invalid", reason: "Un producto del carrito ya no existe." };
    const qty = Math.floor(l.quantity);
    if (qty < 1 || qty > maxPurchasable(p)) return { status: "invalid", reason: `Cantidad no disponible para ${p.name}.` };
    items.push({ productId: p.id, quantity: qty, unitPrice: p.price });
  }
  if (!items.length) return { status: "invalid", reason: "El carrito está vacío." };
  if (!/^\S+@\S+\.\S+$/.test(customer.email)) return { status: "invalid", reason: "Email no válido." };

  return getPaymentProvider().createCheckoutSession(items, customer);
}
