import { Plus } from "lucide-react";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { siteConfig } from "@/config/site";
import { consultChannel } from "@/lib/format";

export function faqItems() {
  const channel = consultChannel();
  return [
    {
      q: "¿Por qué los precios son a consultar?",
      a: `Los precios y el stock cambian según el modelo, el color y la importación. Para darte siempre el dato correcto te lo confirmamos por ${channel} en el momento.`,
    },
    {
      q: "¿Cómo hago una consulta?",
      a: `Entra al producto que te interesa y toca “Consultar precio”. Se abrirá ${channel} para escribirnos directamente. También puedes encontrarnos en TikTok como ${siteConfig.consult.tiktokHandle}.`,
    },
    {
      q: "¿Qué significa “Top 1, Top 2, Top 3”?",
      a: "Para cada marca elegimos sus tres mejores modelos y los ordenamos. El Top 1 es nuestra recomendación principal de esa marca.",
    },
    {
      q: "¿Las fotos son del producto exacto?",
      a: "Son imágenes referenciales del modelo. El color o la versión pueden variar; al consultar te confirmamos exactamente qué unidad recibes.",
    },
    {
      q: "¿Me ayudan a elegir?",
      a: "Sí. Cuéntanos el tamaño de tu mano, tu tipo de agarre y a qué juegas, y te recomendamos las mejores opciones del catálogo.",
    },
  ];
}

export function Faq() {
  const items = faqItems();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section id="preguntas" className="relative bg-carbon py-28 md:py-40">
      <Reveal className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Preguntas frecuentes" title="Todo claro antes de comprar." />
        </div>
        <div className="divide-y divide-white/[0.07] border-y border-white/[0.07] lg:col-span-7">
          {items.map((i) => (
            <details data-reveal key={i.q} className="group py-2 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-5 text-left font-display text-lg tracking-tight text-white/85 transition-colors hover:text-white md:text-xl">
                {i.q}
                <Plus size={18} strokeWidth={1.5} className="shrink-0 text-white/40 transition-transform duration-500 ease-premium group-open:rotate-45 group-open:text-accent" />
              </summary>
              <p className="max-w-2xl pb-6 pr-10 text-sm leading-relaxed text-white/50 md:text-[15px]">{i.a}</p>
            </details>
          ))}
        </div>
      </Reveal>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
