"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart } from "@/store/cart";
import { canPurchase, cn } from "@/lib/format";
import { buttonClass } from "@/components/ui/Button";
import type { Product } from "@/types/product";

export function AddToCartButton({
  product,
  quantity = 1,
  variant = "primary",
  className,
  label = "Add to Cart",
}: {
  product: Product;
  quantity?: number;
  variant?: "primary" | "outline";
  className?: string;
  label?: string;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const available = canPurchase(product.availability);

  return (
    <button
      type="button"
      disabled={!available}
      onClick={() => {
        add(product.id, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 1400);
      }}
      className={cn(buttonClass(variant), className)}
    >
      {!available ? (
        "Agotado"
      ) : added ? (
        <>
          <Check size={16} /> Añadido
        </>
      ) : (
        <>
          <Plus size={16} className="transition-transform duration-500 group-hover:rotate-90" /> {label}
        </>
      )}
    </button>
  );
}
