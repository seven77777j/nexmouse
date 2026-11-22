import { siteConfig } from "@/config/site";
import type { Availability, Product } from "@/types/product";
import { productName } from "@/types/product";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: siteConfig.currency });

export function formatPrice(value: number): string {
  return fmt.format(value);
}

export const availabilityLabel: Record<Availability, string> = {
  consult: "Consultar disponibilidad",
  in_stock: "En stock",
  low_stock: "Últimas unidades",
  preorder: "Preventa",
  out_of_stock: "Agotado",
};

export const categoryLabel = { mouse: "Mouse", keyboard: "Teclado" } as const;

/** Solo se puede añadir al carrito si el producto tiene precio y no está agotado. */
export function canPurchase(p: Pick<Product, "availability" | "price">): boolean {
  return typeof p.price === "number" && p.availability !== "out_of_stock" && p.availability !== "consult";
}

/** Enlace para consultar el precio (WhatsApp si está configurado; si no, TikTok). */
export function consultUrl(p: Pick<Product, "brand" | "model">): string {
  const wa: string = siteConfig.consult.whatsapp;
  if (wa) {
    const msg = `Hola, quiero consultar el precio del ${productName(p)} que vi en ${siteConfig.name}.`;
    return `https://wa.me/${wa}?text=${encodeURIComponent(msg)}`;
  }
  return siteConfig.consult.tiktokUrl;
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
