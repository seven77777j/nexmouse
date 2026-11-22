import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/product/Catalog";

export const metadata: Metadata = { title: "Colección" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 md:px-10 md:pt-44">
      <header className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">Colección</p>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-[-0.03em] text-white md:text-7xl">Todo el catálogo.</h1>
        </div>
        <p className="max-w-xs text-sm text-white/40">Precios bajo consulta. Escríbenos y te respondemos con precio y disponibilidad.</p>
      </header>
      <Suspense fallback={<div className="h-96" />}>
        <Catalog />
      </Suspense>
    </div>
  );
}
