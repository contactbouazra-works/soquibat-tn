import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { news } from '../data/soquibat';
import { formatFrenchDate, toDateTime } from '../lib/dates';
import { normalizeSlug } from '../lib/slug';

export function ActualiteDetail() {
  const { slug = '' } = useParams();
  const article = news.find((item) => item.slug === normalizeSlug(slug));

  if (!article) {
    return (
      <>
        <Seo
          title="Actualité introuvable | SOQUIBAT Group"
          description="Cette actualité n’est pas disponible. Consultez les dernières actualités de SOQUIBAT Group."
          path={`/actualites/${encodeURIComponent(slug)}`}
          noindex
        />
        <section className="min-h-[65vh] bg-ink px-6 pb-24 pt-36 text-paper lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-display text-4xl uppercase">Actualité introuvable</h1>
            <Link to="/actualites" className="mt-8 inline-flex text-orange underline underline-offset-4">
              Revenir aux actualités
            </Link>
          </div>
        </section>
      </>
    );
  }

  const relatedArticles = news.filter((item) => item.slug !== article.slug).slice(0, 2);
  const canonicalPath = `/actualites/${article.slug}`;

  return (
    <>
      <Seo
        title={`${article.detailTitle} | SOQUIBAT Group`}
        description={article.excerpt}
        path={canonicalPath}
        image={article.image}
      />
      <article className="min-h-screen bg-ink text-paper">
        <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-36 lg:px-12 lg:pb-28 lg:pt-44">
          <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-paper/55">
            <Link to="/" className="hover:text-orange">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/actualites" className="hover:text-orange">Actualités</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-paper/80">{article.detailTitle}</span>
          </nav>

          <Link
            to="/actualites"
            className="mb-8 inline-flex items-center gap-2 font-display text-sm uppercase tracking-wide text-orange hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-orange"
          >
            <span aria-hidden="true">←</span> Toutes les actualités
          </Link>

          <header className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-orange/40 px-3 py-1 font-display text-xs uppercase tracking-[0.12em] text-orange">
                {article.categories.includes('RH & Inclusivité') ? 'RH & Inclusivité' : article.tag}
              </span>
              <time dateTime={toDateTime(article.date)} className="text-sm text-paper/60">
                {formatFrenchDate(article.date)}
              </time>
            </div>
            <h1 className="mt-5 font-display text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">
              {article.detailTitle}
            </h1>
          </header>

          <div className="relative mt-10 overflow-hidden rounded-2xl border border-line">
            <img src={article.image} alt={article.detailTitle} className="max-h-[620px] min-h-64 w-full object-cover" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />
            <span className="absolute bottom-5 left-5 font-display text-sm uppercase tracking-[0.16em] text-white">
              SOQUIBAT Group
            </span>
          </div>

          <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16">
            <div className="space-y-6 text-base leading-8 text-paper/80">
              {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>

            <aside aria-labelledby="related-news-title">
              <h2 id="related-news-title" className="font-display text-xl uppercase">Articles similaires</h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
                {relatedArticles.map((related) => (
                  <motion.article
                    key={related.slug}
                    whileHover={{ y: -4 }}
                    className="overflow-hidden rounded-xl border border-line bg-ink-soft"
                  >
                    <Link to={`/actualites/${encodeURIComponent(related.detailTitle)}`} className="block">
                      <img src={related.image} alt={related.detailTitle} loading="lazy" className="aspect-[16/10] w-full object-cover" />
                      <div className="p-4">
                        <p className="font-display text-[0.68rem] uppercase tracking-[0.12em] text-orange">
                          {formatFrenchDate(related.date)}
                        </p>
                        <h3 className="mt-2 font-display text-base uppercase leading-snug text-paper">
                          {related.detailTitle}
                        </h3>
                        <span className="mt-4 inline-block font-display text-xs uppercase text-orange">
                          Lire la suite <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
