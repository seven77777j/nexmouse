"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Search, X } from "lucide-react";
import { getAllProducts, searchProducts } from "@/lib/products";
import { formatPrice, cn } from "@/lib/format";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = useMemo(() => (q.trim() ? searchProducts(getAllProducts(), q).slice(0, 5) : []), [q]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onClose();
    router.push(`/products?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] transition-opacity duration-400",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      )}
      aria-hidden={!open}
    >
      <div className="absolute inset-0 bg-ink/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative mx-auto max-w-3xl px-6 pt-28">
        <form onSubmit={submit} className="flex items-center gap-4 border-b border-white/15 pb-4" role="search">
          <Search className="text-white/40" size={22} strokeWidth={1.5} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar mouse, categoría, característica…"
            className="flex-1 bg-transparent font-display text-2xl font-light text-white placeholder:text-white/25 focus:outline-none md:text-3xl"
            aria-label="Buscar productos"
          />
          <button type="button" onClick={onClose} className="text-white/50 hover:text-white" aria-label="Cerrar búsqueda">
            <X size={22} strokeWidth={1.5} />
          </button>
        </form>

        <ul className="mt-6 divide-y divide-white/[0.06]">
          {results.map((p) => (
            <li key={p.id}>
              <Link href={`/products/${p.slug}`} onClick={onClose} className="group flex items-center gap-5 py-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-xl bg-graphite">
                  <Image src={p.images[0].src} alt="" fill sizes="56px" className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-white">{p.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    {p.category} · {p.connectivity === "wireless" ? "Inalámbrico" : "Con cable"}
                  </p>
                </div>
                <span className="text-sm text-white/60">{formatPrice(p.price)}</span>
                <ArrowRight size={16} className="text-white/30 transition group-hover:translate-x-1 group-hover:text-accent" />
              </Link>
            </li>
          ))}
          {q.trim() && results.length === 0 && <li className="py-6 text-white/40">Sin resultados para “{q}”.</li>}
        </ul>
      </div>
    </div>
  );
}
