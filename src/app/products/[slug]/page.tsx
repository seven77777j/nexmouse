import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronLeft, Handshake, MessageCircle } from "lucide-react";
import { ConsultButton } from "@/components/product/ConsultButton";
import { siteConfig } from "@/config/site";
import { getAllProducts, getProductBySlug, getRelatedProducts } from "@/lib/products";
import { productName } from "@/types/product";
import { categoryLabel } from "@/lib/format";
import { ProductVisual } from "@/components/product/ProductVisual";
import { PurchasePanel } from "@/components/product/PurchasePanel";
import { ProductCard } from "@/components/product/ProductCard";
import { ScrollSequence } from "@/components/sequence/ScrollSequence";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const title = productName(p);
  const images = p.images[0] ? [{ url: p.images[0].src, alt: title }] : undefined;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/products/${p.slug}` },
    openGraph: { title, description: p.description, url: `/products/${p.slug}`, images },
    twitter: { card: "summary_large_image", title, description: p.description, images: images?.map((i) => i.url) },
  };
}

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = getRelatedProducts(product);
  const name = productName(product);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name,
      brand: { "@type": "Brand", name: product.brand },
      category: categoryLabel[product.category],
      description: product.description,
      image: product.images.map((i) => (i.src.startsWith("http") ? i.src : `${siteConfig.url}${i.src}`)),
      url: `${siteConfig.url}/products/${product.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Colección", item: `${siteConfig.url}/products` },
        { "@type": "ListItem", position: 2, name: categoryLabel[product.category], item: `${siteConfig.url}/products?category=${product.category}` },
        { "@type": "ListItem", position: 3, name },
      ],
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Ruta de navegación" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-white/40">
          <Link href="/products" className="inline-flex items-center gap-1 hover:text-white">
            <ChevronLeft size={16} /> Colección
          </Link>
          <span className="text-white/20">/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-white">
            {categoryLabel[product.category]}
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/70" aria-current="page">{name}</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative aspect-square overflow-hidden rounded-[32px] border border-white/[0.05]">
              <ProductVisual product={product} sizes="(min-width: 1024px) 55vw, 100vw" variant="hero" priority />
            </div>
            {product.images.length > 0 && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                Imagen referencial del modelo · colores y versión pueden variar
              </p>
            )}
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-white/45">
              <Link href={`/products?category=${product.category}`} className="text-accent hover:underline">
                {categoryLabel[product.category]}
              </Link>
              <span>·</span>
              <Link href={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:text-white">
                {product.brand}
              </Link>
              {product.rank && (
                <>
                  <span>·</span>
                  <span>Top {product.rank}</span>
                </>
              )}
            </div>
            <h1 className="mt-5 font-display text-5xl font-medium tracking-[-0.03em] text-white md:text-6xl">{name}</h1>
            <p className="mt-5 text-base leading-relaxed text-white/55">{product.description}</p>

            <ul className="mt-8 flex flex-wrap gap-2">
              {product.highlights.map((h) => (
                <li key={h} className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/60">
                  {h}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <PurchasePanel product={product} />
            </div>

            <ul className="mt-10 grid gap-3 border-t border-white/[0.06] pt-8 text-sm text-white/55">
              <li className="flex items-center gap-3"><MessageCircle size={16} strokeWidth={1.5} className="text-accent" />Respuesta directa de una persona, no de un bot</li>
              <li className="flex items-center gap-3"><BadgeCheck size={16} strokeWidth={1.5} className="text-accent" />Precio, color y stock confirmados antes de pagar</li>
              <li className="flex items-center gap-3"><Handshake size={16} strokeWidth={1.5} className="text-accent" />Pago y entrega coordinados contigo</li>
            </ul>
          </div>
        </div>
      </div>

      {product.sequence && <ScrollSequence config={product.sequence} scrollLength={2.4} label={`${name} en 360°`} />}

      <section className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-accent">Especificaciones</p>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight text-white">Características técnicas</h2>
            <p className="mt-5 text-sm leading-relaxed text-white/40">
              Te confirmamos la ficha técnica completa al consultar el producto.
            </p>
          </div>
          {product.specs.some((s) => s.value !== "Por confirmar") ? (
            <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06] lg:col-span-8">
              {product.specs.map((s) => (
                <div key={s.label} className="grid grid-cols-2 gap-6 py-5 text-sm">
                  <dt className="text-white/45">{s.label}</dt>
                  <dd className={s.value === "Por confirmar" ? "text-white/35" : "text-white"}>{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="rounded-[28px] border border-white/[0.06] bg-white/[0.015] p-8 md:p-10 lg:col-span-8">
              <p className="text-sm text-white/55">Al consultar te enviamos la ficha técnica oficial con estos datos:</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {product.specs.map((s) => (
                  <li key={s.label} className="rounded-full border border-white/10 px-4 py-2 text-xs text-white/70">{s.label}</li>
                ))}
              </ul>
              <div className="mt-8">
                <ConsultButton product={product} variant="outline" />
              </div>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="border-t border-white/[0.06] bg-carbon py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <h2 className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl">También te puede interesar</h2>
            <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
