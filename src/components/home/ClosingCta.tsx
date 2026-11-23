import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink, buttonClass } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { AmbientGlow } from "@/components/ui/AmbientGlow";
import { consultChannel, generalConsultUrl } from "@/lib/format";

export function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-28 md:py-40">
      <AmbientGlow />
      <Reveal className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent-soft">¿Listo para mejorar tu setup?</p>
        <h2 data-reveal className="mt-6 font-display text-5xl font-medium leading-[0.98] tracking-[-0.04em] text-white md:text-7xl">
          Tu próximo mouse
          <br />
          <span className="text-white/45">está a un mensaje.</span>
        </h2>
        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={generalConsultUrl()} target="_blank" rel="noopener noreferrer" className={buttonClass("primary")}>
            <MessageCircle size={16} strokeWidth={1.75} /> Escríbenos por {consultChannel()}
          </a>
          <ButtonLink href="/products" variant="outline">
            Ver colección <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
