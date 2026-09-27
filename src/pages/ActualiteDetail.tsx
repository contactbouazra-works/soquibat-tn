import { useRef } from 'react';
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
                {article.categories.find((category) => category !== 'Communiqué de presse') ?? article.tag}
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
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/85 via-transparent to-white/20 dark:from-slate-950/75 dark:via-transparent dark:to-slate-950/20" />
            <span className="absolute bottom-5 left-5 font-display text-sm uppercase tracking-[0.16em] text-slate-900 dark:text-white">
              SOQUIBAT Group
            </span>
          </div>

          <div className="mt-10 max-w-4xl">
            <div className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-display prose-headings:uppercase prose-a:text-orange prose-strong:text-slate-900 dark:prose-strong:text-white">
              {article.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </div>

          {relatedArticles.length > 0 && (
            <RelatedNewsCarousel articles={relatedArticles} />
          )}
        </div>
      </article>
    </>
  );
}

function RelatedNewsCarousel({ articles }: { articles: typeof news }) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: -1 | 1) => {
    const track = carouselRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * track.clientWidth * 0.8,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  return (
    <section className="mt-16 border-t border-line pt-10" aria-labelledby="related-news-title">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">À découvrir également</p>
          <h2 id="related-news-title" className="mt-2 font-display text-2xl uppercase sm:text-3xl">
            Autres actualités
          </h2>
        </div>
        {articles.length > 1 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scroll(-1)}
              aria-label="Actualités précédentes"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-orange"
            >
              <span aria-hidden="true">←</span>
            </button>
            <button
              type="button"
              onClick={() => scroll(1)}
              aria-label="Actualités suivantes"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-orange"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
      <div
        ref={carouselRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        aria-label="Autres actualités"
      >
        {articles.map((related) => (
          <motion.article
            key={related.slug}
            whileHover={{ y: -4 }}
            className="w-[min(82vw,360px)] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-ink-soft"
          >
            <Link to={`/actualites/${encodeURIComponent(related.detailTitle)}`} className="block h-full">
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
    </section>
  );
}
