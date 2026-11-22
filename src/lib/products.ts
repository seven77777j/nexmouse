import { products } from "@/data/products";
import type { Product, ProductCategory } from "@/types/product";
import { productName } from "@/types/product";

/**
 * Capa de acceso a productos. Hoy lee del archivo local; mañana puede
 * llamar a una API sin cambiar los componentes que la consumen.
 */
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getBrands(category?: ProductCategory | "all"): string[] {
  const list = category && category !== "all" ? products.filter((p) => p.category === category) : products;
  return [...new Set(list.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const others = products.filter((p) => p.id !== product.id);
  const sameBrand = others.filter((p) => p.brand === product.brand && p.category === product.category);
  const sameCat = others.filter((p) => p.category === product.category && p.brand !== product.brand && p.rank === 1);
  return [...sameBrand, ...sameCat].slice(0, limit);
}

export type SortOption = "ranking" | "brand" | "name";

export interface ProductFilters {
  category?: ProductCategory | "all";
  brand?: string;
  query?: string;
  sort?: SortOption;
}

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function searchProducts(list: Product[], query: string): Product[] {
  const q = normalize(query.trim());
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const hay = normalize([productName(p), p.category === "keyboard" ? "teclado" : "mouse", p.description, ...p.tags].join(" "));
    return terms.every((t) => hay.includes(t));
  });
}

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  let out = list;
  if (f.category && f.category !== "all") out = out.filter((p) => p.category === f.category);
  if (f.brand && f.brand !== "all") out = out.filter((p) => p.brand === f.brand);
  if (f.query) out = searchProducts(out, f.query);
  switch (f.sort) {
    case "name":
      return [...out].sort((a, b) => productName(a).localeCompare(productName(b)));
    case "brand":
      return [...out].sort((a, b) => a.brand.localeCompare(b.brand) || (a.rank ?? 9) - (b.rank ?? 9));
    default:
      // Ranking: primero todos los #1, luego los #2… manteniendo el orden de publicación.
      return [...out].sort((a, b) => (a.rank ?? 9) - (b.rank ?? 9));
  }
}
