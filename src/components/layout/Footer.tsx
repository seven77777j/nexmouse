import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] bg-carbon">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <Logo className="text-white" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/45">
            Mouse premium diseñados para gamers y profesionales que exigen precisión, rendimiento y ergonomía.
          </p>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Categorías</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li><Link className="hover:text-white" href="/products?category=gaming">Gaming</Link></li>
            <li><Link className="hover:text-white" href="/products?category=professional">Professional</Link></li>
            <li><Link className="hover:text-white" href="/products?connectivity=wireless">Inalámbricos</Link></li>
            <li><Link className="hover:text-white" href="/products">Colección completa</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Contacto</h3>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            <li className="flex items-center gap-3"><Mail size={14} className="text-white/35" />{siteConfig.contact.email}</li>
            <li className="flex items-center gap-3"><Phone size={14} className="text-white/35" />{siteConfig.contact.phone}</li>
            <li className="flex items-center gap-3"><MapPin size={14} className="text-white/35" />{siteConfig.contact.address}</li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">Redes</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="inline-block rounded-full border border-white/10 px-4 py-2 text-xs text-white/60 transition hover:border-white/30 hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between md:px-10">
          <p>© {year} {siteConfig.name}. Sitio en desarrollo · catálogo de demostración.</p>
          <div className="flex gap-6">
            <Link href="/legal/privacy" className="hover:text-white">Política de privacidad</Link>
            <Link href="/legal/terms" className="hover:text-white">Términos y condiciones</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
