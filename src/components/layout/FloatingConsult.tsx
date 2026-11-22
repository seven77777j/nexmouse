"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { cn, consultChannel, generalConsultUrl } from "@/lib/format";

/** Botón flotante de consulta. Aparece tras hacer scroll y se oculta en el checkout. */
export function FloatingConsult() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (pathname.startsWith("/checkout")) return null;
  return (
    <a
      href={generalConsultUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Consultar por ${consultChannel()}`}
      className={cn(
        "group fixed bottom-5 right-5 z-40 flex h-14 items-center gap-2 rounded-full border border-white/10 bg-white pl-4 pr-5 text-sm font-medium text-ink shadow-[0_20px_60px_-15px_rgba(76,141,255,0.55)] transition-all duration-700 ease-premium hover:bg-accent hover:text-white md:bottom-8 md:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      )}
    >
      <MessageCircle size={20} strokeWidth={1.75} />
      <span className="hidden sm:inline">Consultar</span>
    </a>
  );
}
