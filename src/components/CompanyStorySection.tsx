import { motion, useTransform } from 'framer-motion';
import heroImage from '../assets/img/hero-1.jpg';
import { company, stats } from '../data/soquibat';
import { Reveal, RevealLines } from './Reveal';
import { CTAButton } from './CTAButton';
import { StatCounter } from './StatCounter';
import { usePinnedScroll } from '../hooks/useSectionScroll';

/**
 * Major storytelling section: the company photo pins in place (desktop only)
 * while the reader scrolls through the narrative — first the history text,
 * then the stats grid — echoing Ferpinta's "sticky media, scrolling copy"
 * pattern. The image itself keeps drifting/settling via scroll progress
 * rather than sitting static once pinned.
 */
export function CompanyStorySection() {
  const { ref, scrollYProgress, reduceMotion } = usePinnedScroll<HTMLElement>();

  const imageScale = useTransform(scrollYProgress, [0, 0.5], reduceMotion ? [1, 1] : [1.1, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : ['-6%', '6%']);
  const cornerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);

  return (
    <section id="histoire" ref={ref} className="relative bg-ink px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative lg:sticky lg:top-32 lg:h-[70vh] lg:self-start">
          <div className="relative aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:h-full">
            <motion.img
              src={heroImage}
              alt="Site industriel Soquibat"
              className="absolute inset-x-0 -top-[10%] h-[120%] w-full object-cover"
              style={{ scale: imageScale, y: imageY }}
            />
            <motion.div
              className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-orange"
              style={{ opacity: cornerOpacity }}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex flex-col gap-24 lg:py-10">
          <div>
            <RevealLines
              as="h2"
              lines={['Notre histoire']}
              className="font-display text-4xl uppercase text-paper lg:text-5xl"
            />
            <Reveal delay={0.1} className="mt-6 max-w-lg text-base leading-relaxed text-paper/70 lg:text-lg">
              <p>{company.description}</p>
            </Reveal>
            <Reveal delay={0.2} className="mt-10">
              <CTAButton href="/groupe">
                En savoir plus
              </CTAButton>
            </Reveal>
          </div>

          <div>
            <Reveal as="h3" className="font-display text-sm uppercase tracking-[0.2em] text-orange">
              Soquibat en chiffres
            </Reveal>
            <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-10">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.06} className="flex flex-col gap-2">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                  <span className="text-sm text-paper/60">{stat.label}</span>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
