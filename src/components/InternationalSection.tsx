import { international, internationalLocations } from '../data/soquibat';
import { Reveal, RevealLines } from './Reveal';
import { CTAButton } from './CTAButton';
import { ParallaxImage } from './motion/ParallaxImage';
import { SectionTransition } from './motion/SectionTransition';

export function InternationalSection() {
  return (
    <SectionTransition id="points-de-vente" className="bg-ink px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
        <ParallaxImage
          src={international.image}
          alt="Carte de l’Afrique illustrant le développement international de SOQUIBAT"
          className="mx-auto aspect-[4/5] w-full max-w-[360px]"
          imgClassName="!top-0 !h-full !object-contain"
        />

        <div className="flex flex-col justify-center">
          <Reveal className="font-display text-sm uppercase tracking-[0.2em] text-orange">
            {international.kicker}
          </Reveal>
          <RevealLines
            as="h2"
            lines={[international.title]}
            className="mt-3 font-display text-4xl uppercase text-paper lg:text-5xl"
          />
          <Reveal delay={0.15} className="mt-6 max-w-lg text-base leading-relaxed text-paper/70 lg:text-lg">
            <p>{international.paragraph}</p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10">
            <CTAButton href={international.href}>
              {international.cta}
            </CTAButton>
          </Reveal>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-[1400px]">
        <Reveal as="h3" className="font-display text-2xl uppercase text-paper lg:text-3xl">
          Réseau des comptoirs en Côte d’Ivoire
        </Reveal>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {internationalLocations.map((location) => (
            <article key={location.name} className="rounded-xl border border-line bg-ink-soft p-5">
              <h4 className="font-display text-lg uppercase text-orange">{location.name}</h4>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">{location.address}</p>
              <a
                href={`tel:${location.phone}`}
                className="mt-4 inline-block text-sm font-semibold text-paper transition-colors hover:text-orange"
              >
                {location.phone}
              </a>
            </article>
          ))}
        </div>
      </div>
    </SectionTransition>
  );
}
