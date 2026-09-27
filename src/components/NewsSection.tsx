import { motion } from 'framer-motion';
import { news } from '../data/soquibat';
import { Reveal, RevealImage } from './Reveal';
import { CTAButton } from './CTAButton';

export function NewsSection() {
  return (
    <motion.section
      id="actualites"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 h-auto min-h-screen w-full overflow-visible bg-black px-6 py-20 text-white lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="font-display text-4xl uppercase text-white lg:text-5xl">
            Actualités
          </Reveal>
          <Reveal delay={0.1}>
            <CTAButton href="https://soquibat.tn/actualites" external variant="ghost">
              Toute l'actualité
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {news.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="flex flex-col">
              <RevealImage src={item.image} alt={item.title} className="aspect-square w-full rounded-2xl" />
              <span className="mt-5 font-display text-xs uppercase tracking-[0.1em] text-orange">{item.tag}</span>
              <h3 className="mt-2 font-display text-xl uppercase text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-white/60">{item.date}</p>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{item.excerpt}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
