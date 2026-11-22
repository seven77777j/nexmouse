import { siteConfig } from "@/config/site";
import type { Availability } from "@/types/product";

const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: siteConfig.currency });

export function formatPrice(value: number): string {
  return fmt.format(value);
}

export const availabilityLabel: Record<Availability, string> = {
  in_stock: "En stock",
  low_stock: "Últimas unidades",
  preorder: "Preventa",
  out_of_stock: "Agotado",
};

export function canPurchase(a: Availability): boolean {
  return a !== "out_of_stock";
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
