import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Política de privacidad" };

export default function Page() {
  return (
    <article className="mx-auto max-w-3xl px-6 pb-32 pt-36 md:pt-44">
      <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">Legal</p>
      <h1 className="mt-5 font-display text-5xl font-medium tracking-tight text-white">Política de privacidad</h1>
      <p className="mt-10 text-white/55 leading-relaxed">
        Documento pendiente de redacción. {siteConfig.name} debe publicar aquí el texto legal definitivo, revisado por un profesional,
        antes de aceptar pedidos reales.
      </p>
    </article>
  );
}
