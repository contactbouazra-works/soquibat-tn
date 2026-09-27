import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { careers } from '../data/soquibat';
import { Reveal, RevealImage } from './Reveal';
import { CTAButton } from './CTAButton';
import { formatFrenchDate } from '../lib/dates';

export function CareersSection() {
  return (
    <motion.section
      id="recrutement"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-auto min-h-screen w-full overflow-visible border-t border-slate-200 bg-slate-50 px-6 py-20 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="font-display text-4xl uppercase text-slate-900 dark:text-slate-100 lg:text-5xl">
            Recrutement
          </Reveal>
          <Reveal delay={0.1}>
            <CTAButton href="/recrutement" variant="ghost">
              Tous les postes publiés
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {careers.map((job, index) => (
            <Reveal key={job.title} delay={index * 0.08}>
              <Link
                to={`/recrutement/${encodeURIComponent(job.slug)}`}
                className="group flex flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                <RevealImage src={job.image} alt={`Offre d'emploi : ${job.title}`} className="aspect-square w-full" />
                <span className="mt-5 font-display text-2xl uppercase text-slate-900 transition-colors group-hover:text-orange dark:text-slate-100 lg:text-3xl">
                  {job.roleTitle}
                </span>
                <span className="mt-1 text-sm text-slate-600 dark:text-slate-400">{formatFrenchDate(job.date)} · Archive</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
