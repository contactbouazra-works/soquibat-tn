import { Hero } from '../components/Hero';
import { ProductsShowcase } from '../components/ProductsShowcase';
import { SectionSlideFlow } from '../components/SectionSlideFlow';
import { CompanyStorySection } from '../components/CompanyStorySection';
import { SubsidiariesSection } from '../components/SubsidiariesSection';
import { InternationalSection } from '../components/InternationalSection';
import { CareersSection } from '../components/CareersSection';
import { NewsSection } from '../components/NewsSection';

export function Home() {
  return (
    <>
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
