import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/product/Catalog";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata: Metadata = { title: "Colección" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 md:px-10 md:pt-44">
      <header className="mb-20 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">Colección</p>
          <h1 className="mt-5 font-display text-5xl font-medium tracking-[-0.03em] text-white md:text-7xl">Todos los modelos.</h1>
        </div>
        <DemoBadge>Productos y especificaciones de demostración</DemoBadge>
      </header>
      <Suspense fallback={<div className="h-96" />}>
        <Catalog />
      </Suspense>
    </div>
  );
}
