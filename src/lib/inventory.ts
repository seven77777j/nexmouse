import type { Product } from "@/types/product";
import { canPurchase } from "@/lib/format";

/**
 * Punto de integración para inventario. Hoy usa el campo `stock` del catálogo
 * local; en el futuro puede consultar un ERP o servicio de inventario.
 */
export function maxPurchasable(product: Product): number {
  if (!canPurchase(product)) return 0;
  if (product.availability === "preorder") return 5;
  return Math.max(0, Math.min(product.stock, 10));
}
