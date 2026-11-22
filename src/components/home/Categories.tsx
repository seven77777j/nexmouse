import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crosshair, Gauge, Zap, Cpu, Hand, Trophy, Briefcase, Armchair, Bluetooth, Target, Clock } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

const gaming = [
  { icon: Crosshair, label: "Alta precisión" },
  { icon: Gauge, label: "DPI configurable" },
  { icon: Zap, label: "Baja latencia" },
  { icon: Cpu, label: "Sensores avanzados" },
  { icon: Hand, label: "Diseño ergonómico" },
  { icon: Trophy, label: "Rendimiento competitivo" },
];

const professional = [
  { icon: Briefcase, label: "Productividad" },
  { icon: Hand, label: "Ergonomía" },
  { icon: Armchair, label: "Comodidad" },
  { icon: Bluetooth, label: "Conectividad" },
  { icon: Target, label: "Precisión" },
  { icon: Clock, label: "Uso prolongado" },
];

export function Categories() {
  return (
    <section id="categorias" className="relative bg-ink py-28 md:py-40">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Dos mundos" title={<>Una obsesión:<br />la precisión.</>}>
          Dos líneas de producto con un mismo estándar de ingeniería. Elige la que habla tu idioma.
        </SectionHeading>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {/* GAMING — frío, técnico, acento eléctrico */}
          <Link
            data-reveal
            href="/products?category=gaming"
            className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0b0c10] p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(76,141,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(76,141,255,0.08)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_70%_60%,#000,transparent_70%)]" />
            <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
              <span>01 / Gaming</span>
              <span className="text-white/30">Esports ready</span>
            </div>
            <h3 className="relative mt-8 font-display text-5xl font-semibold uppercase leading-none tracking-[-0.03em] text-white md:text-7xl">
              Gaming
            </h3>
            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Para gamers y competidores que viven en el milisegundo.
            </p>
            <div className="relative -mx-8 my-4 flex-1 md:-mx-12">
              <Image
                src="/images/products/phantom-2.webp"
                alt="Mouse gaming de demostración"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain mix-blend-lighten transition-transform duration-[1.4s] ease-premium group-hover:scale-105 [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_72%)]"
              />
            </div>
            <ul className="relative grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {gaming.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-white/60">
                  <Icon size={14} className="text-accent" strokeWidth={1.5} /> {label}
                </li>
              ))}
            </ul>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm text-white">
              Ver mouse gaming <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </Link>

          {/* PROFESSIONAL — cálido, sereno, tipografía ligera */}
          <Link
            data-reveal
            href="/products?category=professional"
            className="group relative flex min-h-[640px] flex-col overflow-hidden rounded-[32px] border border-white/[0.06] bg-gradient-to-b from-[#17171a] to-[#101012] p-8 md:p-12"
          >
            <div className="relative flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
              <span>02 / Professional</span>
              <span className="text-white/30">Work, refined</span>
            </div>
            <h3 className="relative mt-8 font-display text-5xl font-light leading-none tracking-[-0.03em] text-white md:text-7xl">
              Professional
            </h3>
            <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Para diseñadores, programadores y profesionales que trabajan horas sin pausa.
            </p>
            <div className="relative -mx-8 my-4 flex-1 md:-mx-12">
              <Image
                src="/images/products/atelier-1.webp"
                alt="Mouse profesional de demostración"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain mix-blend-lighten transition-transform duration-[1.4s] ease-premium group-hover:scale-105 [mask-image:radial-gradient(ellipse_at_center,#000_45%,transparent_72%)]"
              />
            </div>
            <ul className="relative grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {professional.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2 text-xs text-white/60">
                  <Icon size={14} className="text-white/40" strokeWidth={1.5} /> {label}
                </li>
              ))}
            </ul>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm text-white">
              Ver mouse profesionales <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1.5" />
            </span>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
