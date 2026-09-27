import { Reveal } from '../components/Reveal';

export function Contact() {
  return (
    <>
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
