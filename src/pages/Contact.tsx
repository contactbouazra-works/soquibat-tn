import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';

export function Contact() {
  return (
    <>
      <Seo
        title="Contact et demande de devis | SOQUIBAT Group"
        description="Contactez SOQUIBAT pour vos besoins en acier, métallurgie et transformation. Retrouvez nos coordonnées vérifiées et envoyez votre demande de devis."
        path="/contact"
      />
      <section className="bg-ink px-6 pb-8 pt-36 lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <Reveal as="h1" className="font-display text-4xl uppercase text-paper lg:text-6xl">
            Contactez-nous
          </Reveal>
          <Reveal delay={0.1} className="mt-4 max-w-xl text-base text-paper/70">
            Une question, un projet, un devis ? Notre équipe vous répond.
          </Reveal>
        </div>
      </section>
    </>
  );
}
