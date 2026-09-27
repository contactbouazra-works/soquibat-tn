import { international } from '../data/soquibat';
import { Reveal, RevealLines } from './Reveal';
import { CTAButton } from './CTAButton';
import { ParallaxImage } from './motion/ParallaxImage';
import { SectionTransition } from './motion/SectionTransition';

export function InternationalSection() {
  return (
    <SectionTransition id="points-de-vente" className="bg-ink px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-2 lg:gap-20">
        <ParallaxImage src={international.image} alt="Site industriel Soquibat" className="aspect-4/3 w-full" />

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
            <CTAButton href={international.href} external>
              {international.cta}
            </CTAButton>
          </Reveal>
        </div>
      </div>
    </SectionTransition>
  );
}
