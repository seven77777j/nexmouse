import { Hero } from "@/components/home/Hero";
import { Categories } from "@/components/home/Categories";
import { CollectionPreview } from "@/components/home/CollectionPreview";
import { About } from "@/components/home/About";
import { BrandMarquee } from "@/components/home/BrandMarquee";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Faq } from "@/components/home/Faq";
import { ClosingCta } from "@/components/home/ClosingCta";
import { ScrollSequence } from "@/components/sequence/ScrollSequence";
import { heroSequence, homeChapters } from "@/config/sequence";
import { getAllProducts, getBrands } from "@/lib/products";

export default function HomePage() {
  const chapters = homeChapters({ models: getAllProducts().length, brands: getBrands().length });
  return (
    <>
      <Hero />
      <BrandMarquee />
      <ScrollSequence id="experience" config={{ ...heroSequence, chapters }} label="Experiencia 360°" />
      <Categories />
      <CollectionPreview />
      <HowItWorks />
      <About />
      <Faq />
      <ClosingCta />
    </>
  );
}
