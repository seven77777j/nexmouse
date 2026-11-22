"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { filterProducts, getAllProducts, priceRanges, type PriceFilter, type SortOption } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { cn } from "@/lib/format";
import type { Connectivity, ProductCategory } from "@/types/product";

type Opt<T extends string> = { value: T; label: string };

const categoryOpts: Opt<ProductCategory | "all">[] = [
  { value: "all", label: "Todos" },
  { value: "gaming", label: "Gaming" },
  { value: "professional", label: "Professional" },
];
const connOpts: Opt<Connectivity | "all">[] = [
  { value: "all", label: "Todos" },
  { value: "wireless", label: "Wireless" },
  { value: "wired", label: "Wired" },
];
const priceOpts: Opt<PriceFilter>[] = [
  { value: "all", label: "Cualquiera" },
  ...(Object.entries(priceRanges) as [Exclude<PriceFilter, "all">, { label: string }][]).map(([value, r]) => ({ value, label: r.label })),
];
const sortOpts: Opt<SortOption>[] = [
  { value: "featured", label: "Destacados" },
  { value: "price-asc", label: "Precio: menor a mayor" },
  { value: "price-desc", label: "Precio: mayor a menor" },
  { value: "name", label: "Nombre" },
];

function pick<T extends string>(value: string | null, opts: Opt<T>[], fallback: T): T {
  return (opts.find((o) => o.value === value)?.value ?? fallback) as T;
}

function Chips<T extends string>({ label, opts, value, onChange }: { label: string; opts: Opt<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <fieldset>
      <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {opts.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            aria-pressed={value === o.value}
            className={cn(
              "h-9 rounded-full border px-4 text-xs transition-all duration-300",
              value === o.value ? "border-white bg-white text-ink" : "border-white/12 text-white/60 hover:border-white/35 hover:text-white"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const category = pick(params.get("category"), categoryOpts, "all");
  const connectivity = pick(params.get("connectivity"), connOpts, "all");
  const price = pick(params.get("price"), priceOpts, "all");
  const sort = pick(params.get("sort"), sortOpts, "featured");
  const query = params.get("q") ?? "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all" || (key === "sort" && value === "featured")) next.delete(key);
    else next.set(key, value);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const results = useMemo(
    () => filterProducts(getAllProducts(), { category, connectivity, price, sort, query }),
    [category, connectivity, price, sort, query]
  );
  const active = category !== "all" || connectivity !== "all" || price !== "all" || !!query;

  return (
    <div className="grid gap-14 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-8 lg:sticky lg:top-28 lg:self-start">
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/50">
          <SlidersHorizontal size={13} /> Filtros
        </div>
        <label className="flex h-11 items-center gap-3 rounded-full border border-white/12 px-4 focus-within:border-white/35">
          <Search size={15} className="text-white/35" />
          <input
            defaultValue={query}
            key={query}
            onKeyDown={(e) => e.key === "Enter" && update("q", (e.target as HTMLInputElement).value.trim())}
            onBlur={(e) => e.target.value.trim() !== query && update("q", e.target.value.trim())}
            placeholder="Buscar…"
            className="w-full bg-transparent text-sm text-white placeholder:text-white/30 focus:outline-none"
            aria-label="Buscar en el catálogo"
          />
        </label>
        <Chips label="Categoría" opts={categoryOpts} value={category} onChange={(v) => update("category", v)} />
        <Chips label="Conexión" opts={connOpts} value={connectivity} onChange={(v) => update("connectivity", v)} />
        <Chips label="Precio" opts={priceOpts} value={price} onChange={(v) => update("price", v)} />
        <fieldset>
          <legend className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Ordenar</legend>
          <select
            value={sort}
            onChange={(e) => update("sort", e.target.value)}
            className="h-11 w-full rounded-full border border-white/12 bg-ink px-4 text-sm text-white focus:border-white/35 focus:outline-none"
          >
            {sortOpts.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </fieldset>
        {active && (
          <button
            onClick={() => router.replace(pathname, { scroll: false })}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white"
          >
            <X size={13} /> Limpiar filtros
          </button>
        )}
      </aside>

      <div>
        <p className="mb-10 text-sm text-white/40" aria-live="polite">
          {results.length} {results.length === 1 ? "producto" : "productos"}
          {query && <> para “<span className="text-white">{query}</span>”</>}
        </p>
        {results.length ? (
          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 3} />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] border border-white/[0.06] p-16 text-center text-white/45">
            Ningún producto coincide con estos filtros.
          </div>
        )}
      </div>
    </div>
  );
}
