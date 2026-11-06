import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { actualites } from '../data/soquibat';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { absoluteSeoUrl } from '../lib/seo';

export function Actualites() {
  const newsSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Actualités SOQUIBAT Group',
    description: 'Les actualités, informations et évènements de SOQUIBAT Group.',
    url: absoluteSeoUrl('/actualites'),
    inLanguage: 'fr-TN',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: actualites.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'NewsArticle',
          headline: item.title,
          datePublished: item.date,
          url: absoluteSeoUrl(`/actualites/${item.slug}`),
        },
      })),
    },
  };

  return (
    <section className="bg-ink px-6 pb-24 pt-36 lg:px-12 lg:pt-44">
      <Seo
        title="Actualités | SOQUIBAT Group"
        description="Retrouvez les actualités, informations et évènements de SOQUIBAT Group."
        path="/actualites"
        structuredData={newsSchema}
      />
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="p" className="font-display text-sm uppercase tracking-[0.2em] text-orange">
          SOQUIBAT Group
        </Reveal>
        <Reveal as="h1" className="mt-3 font-display text-4xl uppercase text-paper lg:text-6xl">
          Actualités
        </Reveal>
        <Reveal delay={0.1} className="mt-4 max-w-xl text-base text-paper/70">
          Informations, nouveautés et évènements du groupe.
        </Reveal>

        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {actualites.map((item, index) => (
            <Reveal key={`${item.date}-${item.title}`} delay={(index % 3) * 0.06}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="h-full overflow-hidden rounded-xl border border-line bg-ink-soft"
              >
                <Link
                  to={`/actualites/${item.slug}`}
                  aria-label={`${item.title} — lire l’actualité sur soquibat.tn`}
                  className="group flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  <img
                    src={item.image}
                    alt=""
                    loading="lazy"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.12em]">
                      <span className="text-orange">{item.category}</span>
                      <time dateTime={item.date} className="text-paper/50">{item.dateLabel}</time>
                    </div>
                    <h2 className="mt-4 font-display text-xl uppercase text-paper">{item.title}</h2>
                    {item.description && (
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-paper/65">{item.description}</p>
                    )}
                    <span className="mt-6 font-display text-sm uppercase tracking-[0.1em] text-orange">
                      Voir l’actualité <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
