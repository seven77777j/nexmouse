import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { DemoBadge } from "@/components/ui/DemoBadge";

export function CollectionPreview() {
  const items = getAllProducts().slice(0, 6);
  return (
    <section id="coleccion" className="bg-carbon py-28 md:py-40">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Colección" title="Elige tu instrumento.">
            Cada modelo, una intención. Todos con el mismo nivel de detalle.
          </SectionHeading>
          <div data-reveal className="flex flex-col items-start gap-4 md:items-end">
            <DemoBadge>Catálogo de demostración</DemoBadge>
            <ButtonLink href="/products" variant="outline">
              Ver todo <ArrowRight size={16} />
            </ButtonLink>
          </div>
        </div>
        <div className="mt-20 grid gap-x-8 gap-y-20 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <div data-reveal key={p.id}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
