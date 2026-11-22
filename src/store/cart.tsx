"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { siteConfig } from "@/config/site";
import { getProductById } from "@/lib/products";
import { maxPurchasable } from "@/lib/inventory";
import type { Product } from "@/types/product";

/** En el carrito solo guardamos id + cantidad; el precio siempre se lee del catálogo. */
interface CartLine {
  productId: string;
  quantity: number;
}

type Action =
  | { type: "hydrate"; lines: CartLine[] }
  | { type: "add"; productId: string; quantity: number }
  | { type: "set"; productId: string; quantity: number }
  | { type: "remove"; productId: string }
  | { type: "clear" };

function clampQty(productId: string, qty: number) {
  const p = getProductById(productId);
  if (!p) return 0;
  return Math.max(0, Math.min(qty, maxPurchasable(p)));
}

function reducer(state: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case "hydrate":
      return action.lines
        .map((l) => ({ productId: l.productId, quantity: clampQty(l.productId, l.quantity) }))
        .filter((l) => l.quantity > 0);
    case "add": {
      const existing = state.find((l) => l.productId === action.productId);
      const next = clampQty(action.productId, (existing?.quantity ?? 0) + action.quantity);
      if (next <= 0) return state;
      if (existing) return state.map((l) => (l.productId === action.productId ? { ...l, quantity: next } : l));
      return [...state, { productId: action.productId, quantity: next }];
    }
    case "set": {
      const q = clampQty(action.productId, action.quantity);
      if (q <= 0) return state.filter((l) => l.productId !== action.productId);
      return state.map((l) => (l.productId === action.productId ? { ...l, quantity: q } : l));
    }
    case "remove":
      return state.filter((l) => l.productId !== action.productId);
    case "clear":
      return [];
  }
}

export interface CartItem {
  product: Product;
  quantity: number;
  lineTotal: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);

  // Persistencia: leer al montar…
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(siteConfig.cartStorageKey);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) dispatch({ type: "hydrate", lines: parsed });
      }
    } catch {
      /* almacenamiento no disponible */
    }
    setHydrated(true);
  }, []);

  // …y guardar en cada cambio.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(siteConfig.cartStorageKey, JSON.stringify(lines));
    } catch {
      /* ignorar */
    }
  }, [lines, hydrated]);

  // Sincronizar entre pestañas.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== siteConfig.cartStorageKey || !e.newValue) return;
      try {
        dispatch({ type: "hydrate", lines: JSON.parse(e.newValue) });
      } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const items = useMemo<CartItem[]>(
    () =>
      lines.flatMap((l) => {
        const product = getProductById(l.productId);
        return product ? [{ product, quantity: l.quantity, lineTotal: (product.price ?? 0) * l.quantity }] : [];
      }),
    [lines]
  );

  const add = useCallback((productId: string, quantity = 1) => {
    dispatch({ type: "add", productId, quantity });
    setOpen(true);
  }, []);

  const value: CartContextValue = {
    items,
    count: items.reduce((n, i) => n + i.quantity, 0),
    subtotal: items.reduce((n, i) => n + i.lineTotal, 0),
    hydrated,
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    add,
    setQuantity: (productId, quantity) => dispatch({ type: "set", productId, quantity }),
    remove: (productId) => dispatch({ type: "remove", productId }),
    clear: () => dispatch({ type: "clear" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
