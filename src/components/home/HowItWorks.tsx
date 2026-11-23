import { MessageCircle, MousePointerClick, PackageCheck, ShieldCheck, Sparkles, Trophy } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { consultChannel } from "@/lib/format";

/** Proceso de compra en 3 pasos + compromisos de la tienda. */
export function HowItWorks() {
  const channel = consultChannel();
  const steps = [
    {
      icon: MousePointerClick,
      title: "Elige tu modelo",
      body: "Explora el ranking por marca y filtra por mouse o teclado hasta encontrar el tuyo.",
    },
    {
      icon: MessageCircle,
      title: "Consulta precio y stock",
      body: `Toca “Consultar precio” y te respondemos por ${channel} con precio, colores y disponibilidad.`,
    },
    {
      icon: PackageCheck,
      title: "Coordina tu compra",
      body: "Acordamos contigo el pago y la entrega antes de cerrar el pedido. Sin sorpresas.",
    },
  ];
  const promises = [
    { icon: Trophy, title: "Selección curada", body: "Solo el Top 3 de cada marca, comparado modelo por modelo." },
    { icon: ShieldCheck, title: "Información clara", body: "Precio y stock confirmados por una persona antes de pagar." },
    { icon: Sparkles, title: "Asesoría real", body: "Te ayudamos a elegir según tu mano, agarre y tipo de juego." },
  ];
  return (
    <section id="como-comprar" className="relative bg-ink py-28 md:py-40">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading eyebrow="Cómo comprar" title="Tres pasos. Cero complicaciones.">
          Comprar en la tienda es tan simple como escribirnos. Así funciona:
        </SectionHeading>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] md:grid-cols-3">
          {steps.map((s, i) => (
            <li data-reveal key={s.title} className="group relative bg-ink p-8 transition-colors duration-700 hover:bg-carbon md:p-10">
              <div className="flex items-center justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 text-white/80 transition-colors duration-500 group-hover:border-accent/50 group-hover:text-accent-soft">
                  <s.icon size={20} strokeWidth={1.5} />
                </span>
                <span className="font-mono text-[11px] tracking-[0.3em] text-white/25">0{i + 1}</span>
              </div>
              <h3 className="mt-10 font-display text-2xl tracking-tight text-white">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{s.body}</p>
            </li>
          ))}
        </ol>

        <ul className="mt-6 grid gap-6 md:grid-cols-3">
          {promises.map((p) => (
            <li data-reveal key={p.title} className="flex gap-4 rounded-[22px] border border-white/[0.05] bg-white/[0.015] p-6">
              <p.icon size={18} strokeWidth={1.5} className="mt-0.5 shrink-0 text-accent-soft" />
              <div>
                <p className="text-sm font-medium text-white">{p.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-white/45">{p.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
