import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { siteConfig } from "@/config/site";

const values = [
  { n: "01", title: "Curaduría", body: "Revisamos el catálogo de cada marca y nos quedamos solo con su Top 3." },
  { n: "02", title: "Variedad", body: "Desde ultraligeros de competición hasta teclados magnéticos Hall Effect." },
  { n: "03", title: "Cercanía", body: "Hablas con una persona real que te asesora antes de comprar." },
  { n: "04", title: "Transparencia", body: "Precio, color y stock confirmados por escrito antes de cerrar tu pedido." },
];

export function About() {
  return (
    <section id="nosotros" className="relative bg-ink py-28 md:py-40">
      <Reveal className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Nosotros" title={<>Gamers eligiendo para gamers.</>}>
            {siteConfig.name} nace en TikTok como {siteConfig.consult.tiktokHandle}: rankings honestos de los mejores periféricos de cada marca. Hoy reunimos esa selección en una tienda para que encuentres tu próximo mouse o teclado sin perder horas comparando.
          </SectionHeading>
        </div>
        <dl className="grid gap-px overflow-hidden rounded-[28px] border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:col-span-7">
          {values.map((v) => (
            <div data-reveal key={v.n} className="bg-ink p-8 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.3em] text-accent-soft">{v.n}</span>
              <dt className="mt-6 font-display text-2xl text-white">{v.title}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-white/45">{v.body}</dd>
            </div>
          ))}
        </dl>
        <figure data-reveal className="relative overflow-hidden rounded-[32px] border border-white/[0.06] lg:col-span-12">
          <div className="relative aspect-[16/10] md:aspect-[16/7]">
            <Image
              src="/images/home/nosotros-setup.webp"
              alt="Setup gaming con el Logitech G Pro X Superlight 2 y el Wooting 80HE"
              fill
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          </div>
          <figcaption className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/60 md:bottom-10 md:left-10">
            Tu setup, a otro nivel
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
