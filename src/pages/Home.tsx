import { Hero } from '../components/Hero';
import { ProductsShowcase } from '../components/ProductsShowcase';
import { SectionSlideFlow } from '../components/SectionSlideFlow';
import { CompanyStorySection } from '../components/CompanyStorySection';
import { SubsidiariesSection } from '../components/SubsidiariesSection';
import { InternationalSection } from '../components/InternationalSection';
import { Seo } from '../components/Seo';
import { absoluteSeoUrl } from '../lib/seo';
import logo from '../assets/img/logo.png';
import { company, contact, socials } from '../data/soquibat';

export function Home() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.fullName,
    url: absoluteSeoUrl('/'),
    logo: absoluteSeoUrl(logo),
    description: company.description,
    email: contact.email,
    telephone: contact.phones[0],
    contactPoint: contact.phones.map((telephone) => ({
      '@type': 'ContactPoint',
      telephone,
      contactType: 'customer service',
      availableLanguage: 'French',
    })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: contact.address,
      addressLocality: 'Tunis',
      addressCountry: 'TN',
    },
    sameAs: socials.map(({ href }) => href),
  };
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.fullName,
    url: absoluteSeoUrl('/'),
    inLanguage: 'fr-TN',
  };

  return (
    <>
      <Seo
        title="SOQUIBAT Group | Fournisseur de produits métallurgiques en Tunisie"
        description="SOQUIBAT Group, leader de la sidérurgie en Tunisie depuis plus de 40 ans : poutrelles, tôles, tubes soudés, panneaux sandwich, fer marchand et découpe laser. Demandez un devis."
        path="/"
        structuredData={[organizationSchema, websiteSchema]}
      />
      <Hero />
      <ProductsShowcase />
      <SectionSlideFlow>
        <CompanyStorySection />
        <SubsidiariesSection />
        <InternationalSection />
      </SectionSlideFlow>
    </>
  );
}
