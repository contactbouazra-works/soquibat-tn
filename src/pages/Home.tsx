import { Hero } from '../components/Hero';
import { ProductsShowcase } from '../components/ProductsShowcase';
import { SectionSlideFlow } from '../components/SectionSlideFlow';
import { CompanyStorySection } from '../components/CompanyStorySection';
import { SubsidiariesSection } from '../components/SubsidiariesSection';
import { InternationalSection } from '../components/InternationalSection';
import { CareersSection } from '../components/CareersSection';
import { NewsSection } from '../components/NewsSection';
import { Seo } from '../components/Seo';

export function Home() {
  return (
    <>
      <Seo
        title="SOQUIBAT Group | Fournisseur de produits métallurgiques en Tunisie"
        description="SOQUIBAT Group, leader de la sidérurgie en Tunisie depuis plus de 40 ans : poutrelles, tôles, tubes soudés, panneaux sandwich, fer marchand et découpe laser. Demandez un devis."
        path="/"
      />
      <Hero />
      <ProductsShowcase />
      <SectionSlideFlow>
        <CompanyStorySection />
        <SubsidiariesSection />
        <InternationalSection />
      </SectionSlideFlow>
      <CareersSection />
      <NewsSection />
    </>
  );
}
