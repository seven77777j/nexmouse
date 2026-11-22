"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/store/cart";
import { Logo } from "@/components/ui/Logo";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { cn } from "@/lib/format";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count, open, hydrated } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-premium",
          solid ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20 md:px-10" aria-label="Principal">
          <Logo className="text-white" />

          <ul className="hidden items-center gap-9 lg:flex">
            {siteConfig.nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="link-underline pb-1 text-[13px] tracking-wide text-white/60 hover:text-white"
                  aria-current={item.href === pathname ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
              aria-label="Buscar"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={open}
              className="relative grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white"
              aria-label={`Carrito (${count} artículos)`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {hydrated && count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[9px] font-semibold text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full text-white/70 transition hover:bg-white/5 hover:text-white lg:hidden"
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Menú móvil */}
        <div
          className={cn(
            "overflow-hidden transition-[max-height,opacity] duration-500 ease-premium lg:hidden",
            menuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <ul className="flex flex-col gap-1 px-6 pb-10 pt-4">
            {siteConfig.nav.map((item, i) => (
              <li key={item.label} style={{ transitionDelay: `${i * 40}ms` }}>
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="block py-3 font-display text-3xl font-light tracking-tight text-white/80 hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
