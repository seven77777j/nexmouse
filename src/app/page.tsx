import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { About } from "@/components/home/About";
import { ScrollSequence } from "@/components/sequence/ScrollSequence";
import { getFeaturedProduct } from "@/lib/products";

export default function HomePage() {
  const featured = getFeaturedProduct();
  return (
    <>
      <Hero />
      {featured.sequence && <ScrollSequence id="experience" config={featured.sequence} label={`${featured.name} en 360°`} />}
      <Categories />
      <CollectionPreview />
      <About />
    </>
  );
}
