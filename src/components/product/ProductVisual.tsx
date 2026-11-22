import Image from "next/image";
import { Keyboard, Mouse } from "lucide-react";
import type { Product } from "@/types/product";
import { cn } from "@/lib/format";

/**
 * Imagen del producto. Si todavía no hay foto, muestra una ficha tipográfica
 * (marca + modelo) en lugar de una imagen que no corresponda al producto.
 */
export function ProductVisual({
  product,
  sizes,
  priority,
  variant = "card",
  className,
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  variant?: "card" | "thumb" | "hero";
  className?: string;
}) {
  const img = product.images[0];
  if (img) {
    return <Image src={img.src} alt={img.alt} fill sizes={sizes} priority={priority} className={cn("object-cover", className)} />;
  }
  const Icon = product.category === "keyboard" ? Keyboard : Mouse;
  if (variant === "thumb") {
    return (
      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-steel to-graphite">
        <Icon size={20} strokeWidth={1.25} className="text-white/45" />
      </div>
    );
  }
  return (
    <div className={cn("absolute inset-0 flex flex-col justify-between overflow-hidden bg-[radial-gradient(ellipse_80%_70%_at_70%_80%,rgba(76,141,255,0.16),transparent_60%),linear-gradient(160deg,#1b1b1f,#0d0d0f)] p-7", className)}>
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:32px_32px]" />
      <Icon
        strokeWidth={0.6}
        className={cn(
          "pointer-events-none absolute text-white/[0.07] transition-transform duration-[1.2s] ease-premium group-hover:scale-105",
          variant === "hero" ? "-bottom-16 -right-16 h-[85%] w-[85%]" : "-bottom-10 -right-10 h-[75%] w-[75%]"
        )}
      />
      {product.rank && (
        <span
          className={cn(
            "relative mt-8 font-display font-semibold leading-none tracking-tighter text-white/[0.08]",
            variant === "hero" ? "text-[180px]" : "text-[110px]"
          )}
        >
          #{product.rank}
        </span>
      )}
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{product.brand}</p>
        <p
          className={cn(
            "mt-2 font-display font-medium leading-[1.05] tracking-tight text-white",
            variant === "hero" ? "text-4xl md:text-5xl" : "text-2xl"
          )}
        >
          {product.model}
        </p>
      </div>
    </div>
  );
}
