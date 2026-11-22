import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { siteConfig } from "@/config/site";

const values = [
  { n: "01", title: "Exclusividad", body: "Series cuidadas y acabados que no encontrarás en un lineal genérico." },
  { n: "02", title: "Innovación", body: "Cada generación parte de una pregunta: ¿qué puede ser más preciso?" },
  { n: "03", title: "Precisión", body: "Ingeniería al detalle, desde el sensor hasta la última curva de la carcasa." },
  { n: "04", title: "Calidad", body: "Materiales y procesos elegidos para durar años de uso intensivo." },
];

export function About() {
  return (
    <section id="nosotros" className="relative bg-ink py-28 md:py-40">
      <Reveal className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Nosotros" title={<>Hecho por obsesivos del detalle.</>}>
            {siteConfig.name} nace para quienes sienten la diferencia entre bueno y exacto. Diseñamos herramientas, no accesorios.
          </SectionHeading>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:col-span-7">
          {values.map((v) => (
            <div data-reveal key={v.n} className="bg-ink p-8 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent">{v.n}</span>
              <dt className="mt-6 font-display text-2xl text-white">{v.title}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-white/45">{v.body}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
