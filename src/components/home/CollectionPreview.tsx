import { ArrowRight } from "lucide-react";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/home/Reveal";
import { SectionHeading } from "@/components/home/SectionHeading";

export function CollectionPreview() {
  const items = getAllProducts().filter((p) => p.rank === 1).slice(0, 6);
  return (
    <section id="coleccion" className="bg-carbon py-28 md:py-40">
      <Reveal className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Top 1 de cada marca" title="Elige tu instrumento.">
            Los ganadores de nuestros rankings por marca. Consulta precio y disponibilidad sin compromiso.
          </SectionHeading>
          <div data-reveal className="flex flex-col items-start gap-4 md:items-end">
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
