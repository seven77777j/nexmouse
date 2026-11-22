import { products } from "@/data/products";
import type { Connectivity, Product, ProductCategory } from "@/types/product";

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

export function getFeaturedProduct(): Product {
  return products.find((p) => p.featured && p.sequence) ?? products[0];
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const same = products.filter((p) => p.id !== product.id && p.category === product.category);
  const others = products.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}

export type PriceFilter = "all" | "under-75" | "75-125" | "over-125";
export type SortOption = "featured" | "price-asc" | "price-desc" | "name";

export interface ProductFilters {
  category?: ProductCategory | "all";
  connectivity?: Connectivity | "all";
  price?: PriceFilter;
  query?: string;
  sort?: SortOption;
}

export const priceRanges: Record<Exclude<PriceFilter, "all">, { label: string; min: number; max: number }> = {
  "under-75": { label: "Menos de $75", min: 0, max: 74.99 },
  "75-125": { label: "$75 – $125", min: 75, max: 125 },
  "over-125": { label: "Más de $125", min: 125.01, max: Infinity },
};

const normalize = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

export function searchProducts(list: Product[], query: string): Product[] {
  const q = normalize(query.trim());
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const hay = normalize(
      [p.name, p.category, p.connectivity, p.shortDescription, p.description, ...p.tags, ...p.highlights].join(" ")
    );
    return terms.every((t) => hay.includes(t));
  });
}

export function filterProducts(list: Product[], f: ProductFilters): Product[] {
  let out = list;
  if (f.category && f.category !== "all") out = out.filter((p) => p.category === f.category);
  if (f.connectivity && f.connectivity !== "all") out = out.filter((p) => p.connectivity === f.connectivity);
  if (f.price && f.price !== "all") {
    const r = priceRanges[f.price];
    out = out.filter((p) => p.price >= r.min && p.price <= r.max);
  }
  if (f.query) out = searchProducts(out, f.query);
  switch (f.sort) {
    case "price-asc":
      out = [...out].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      out = [...out].sort((a, b) => b.price - a.price);
      break;
    case "name":
      out = [...out].sort((a, b) => a.name.localeCompare(b.name));
      break;
    default:
      out = [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
  }
  return out;
}
