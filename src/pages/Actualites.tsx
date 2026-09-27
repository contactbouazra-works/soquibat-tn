import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { news } from '../data/soquibat';
import { formatFrenchDate, toDateTime } from '../lib/dates';
import { Seo } from '../components/Seo';

const categories = ['Tous', 'Communiqué de presse', 'Événement', 'RSE & Inclusivité'] as const;
type CategoryFilter = (typeof categories)[number];

export function Actualites() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('Tous');
  const filteredNews = news.filter(
    (item) => activeCategory === 'Tous' || item.categories.includes(activeCategory),
  );

  return (
    <>
      <Seo
        title="Actualités & événements | SOQUIBAT Group"
        description="Retrouvez les actualités, événements et initiatives de SOQUIBAT Group dans les secteurs de l’industrie et de la métallurgie."
        path="/actualites"
      />
      <section className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <p className="mb-4 font-display text-xs font-semibold uppercase tracking-[0.2em] text-orange sm:text-sm">
            SOQUIBAT Group
          </p>
          <h1 className="font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
            Actualités &amp; Événements
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
            Découvrez les temps forts, initiatives et actualités du groupe.
          </p>

          <div className="mt-10 flex flex-wrap gap-3" aria-label="Filtrer les actualités">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                  activeCategory === category
                    ? 'border-orange bg-orange text-slate-950'
                    : 'border-line text-paper/75 hover:border-orange hover:text-paper'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredNews.map((item) => (
                <motion.article
                  key={item.slug}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft"
                >
                  <Link
                    to={`/actualites/${encodeURIComponent(item.detailTitle)}`}
                    aria-label={`Lire l’article : ${item.detailTitle}`}
                    className="block overflow-hidden focus-visible:outline-2 focus-visible:outline-orange"
                  >
                    <img
                      src={item.image}
                      alt={item.detailTitle}
                      loading="lazy"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="rounded-full border border-orange/40 px-3 py-1 font-display text-[0.68rem] uppercase tracking-[0.12em] text-orange">
                        {item.categories.find((category) => category !== 'Communiqué de presse') ?? item.tag}
                      </span>
                      <time dateTime={toDateTime(item.date)} className="text-xs text-paper/55">
                        {formatFrenchDate(item.date)}
                      </time>
                    </div>
                    <h2 className="mt-4 font-display text-xl uppercase leading-snug text-paper sm:text-2xl">
                      {item.detailTitle}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/70">{item.excerpt}</p>
                    <Link
                      to={`/actualites/${encodeURIComponent(item.detailTitle)}`}
                      className="mt-6 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-orange transition-colors hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                    >
                      Lire la suite <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
          {filteredNews.length === 0 && (
            <p className="mt-12 rounded-xl border border-line p-6 text-paper/70">
              Aucune actualité ne correspond à cette catégorie.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
