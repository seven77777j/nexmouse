import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { About } from "@/components/home/About";
import { ScrollSequence } from "@/components/sequence/ScrollSequence";
import { heroSequence, homeChapters } from "@/config/sequence";
import { getAllProducts, getBrands } from "@/lib/products";

export default function HomePage() {
  const chapters = homeChapters({ models: getAllProducts().length, brands: getBrands().length });
  return (
    <>
      <Hero />
      <ScrollSequence id="experience" config={{ ...heroSequence, chapters }} label="Experiencia 360°" />
      <Categories />
      <CollectionPreview />
      <About />
    </>
  );
}
