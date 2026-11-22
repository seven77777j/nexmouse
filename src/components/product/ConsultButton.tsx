import { MessageCircle } from "lucide-react";
import type { Product } from "@/types/product";
import { consultUrl, cn } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";

/** Sustituye a "Add to Cart" cuando el producto no tiene precio publicado. */
export function ConsultButton({
  product,
  variant = "primary",
  className,
}: {
  product: Product;
  variant?: "primary" | "outline";
  className?: string;
}) {
  return (
    <a href={consultUrl(product)} target="_blank" rel="noopener noreferrer" className={cn(buttonClass(variant), className)}>
      <MessageCircle size={16} strokeWidth={1.75} /> Consultar precio
    </a>
  );
}
