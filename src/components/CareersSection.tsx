import { motion } from 'framer-motion';
import { careers } from '../data/soquibat';
import { Reveal, RevealImage } from './Reveal';
import { CTAButton } from './CTAButton';

export function CareersSection() {
  return (
    <motion.section
      id="recrutement"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-auto min-h-screen w-full overflow-visible border-t border-neutral-800 bg-black px-6 py-20 text-white lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="font-display text-4xl uppercase text-white lg:text-5xl">
            Recrutement
          </Reveal>
          <Reveal delay={0.1}>
            <CTAButton href="https://soquibat.tn/recrutement" external variant="ghost">
              Toutes les offres
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {careers.map((job, index) => (
            <Reveal key={job.title} delay={index * 0.08}>
              <a
                href={job.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <RevealImage src={job.image} alt={`Offre d'emploi : ${job.title}`} className="aspect-square w-full" />
                <span className="mt-5 font-display text-2xl uppercase text-white transition-colors group-hover:text-orange lg:text-3xl">
                  {job.title}
                </span>
                <span className="mt-1 text-sm text-white/60">{job.date}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
