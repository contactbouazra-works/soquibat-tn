import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { news } from '../data/soquibat';
import { Reveal, RevealImage } from './Reveal';
import { CTAButton } from './CTAButton';
import { formatFrenchDate, toDateTime } from '../lib/dates';

export function NewsSection() {
  return (
    <motion.section
      id="actualites"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-20 h-auto min-h-screen w-full overflow-visible border-t border-slate-200 bg-slate-50 px-6 py-20 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 lg:px-12"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal as="h2" className="font-display text-4xl uppercase text-slate-900 dark:text-slate-100 lg:text-5xl">
            Actualités
          </Reveal>
          <Reveal delay={0.1}>
            <CTAButton href="/actualites" variant="ghost">
              Toutes les actualités
            </CTAButton>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {news.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08} className="flex flex-col">
              <Link to={`/actualites/${encodeURIComponent(item.detailTitle)}`} aria-label={`Lire l’article : ${item.detailTitle}`}>
                <RevealImage src={item.image} alt={item.detailTitle} className="aspect-square w-full rounded-2xl" />
              </Link>
              <span className="mt-5 font-display text-xs uppercase tracking-[0.1em] text-orange">{item.tag}</span>
              <Link to={`/actualites/${encodeURIComponent(item.detailTitle)}`} className="mt-2 font-display text-xl uppercase text-slate-900 hover:text-orange dark:text-slate-100">
                {item.title}
              </Link>
              <time dateTime={toDateTime(item.date)} className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {formatFrenchDate(item.date)}
              </time>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.excerpt}</p>
              <Link to={`/actualites/${encodeURIComponent(item.detailTitle)}`} className="mt-4 inline-flex font-display text-sm uppercase text-orange hover:text-orange-dark">
                Lire la suite <span className="ml-2" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
