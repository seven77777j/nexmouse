"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductGallery({ images }: { images: Product["images"] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square overflow-hidden rounded-[32px] bg-graphite">
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={img.alt}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 55vw, 100vw"
            className={cn("object-cover transition-opacity duration-700 ease-premium", i === active ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
      <div className="grid grid-cols-4 gap-3" role="tablist" aria-label="Galería de imágenes">
        {images.map((img, i) => (
          <button
            key={img.src}
            role="tab"
            aria-selected={i === active}
            aria-label={`Ver imagen ${i + 1}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative aspect-square overflow-hidden rounded-2xl border bg-graphite transition-all duration-300",
              i === active ? "border-white/60" : "border-transparent opacity-60 hover:opacity-100"
            )}
          >
            <Image src={img.src} alt="" fill sizes="120px" className="object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
