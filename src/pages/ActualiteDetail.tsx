import { Link, useParams } from 'react-router-dom';
import { actualites } from '../data/soquibat';
import { Seo } from '../components/Seo';
import { absoluteSeoUrl } from '../lib/seo';

export function ActualiteDetail() {
  const { slug } = useParams();
  const article = actualites.find((item) => item.slug === slug);

  if (!article) {
    return (
      <section className="min-h-[65vh] bg-ink px-6 pb-24 pt-36 text-paper lg:px-12">
        <Seo
          title="Actualité introuvable | SOQUIBAT Group"
          description="Cette actualité n’est pas disponible."
          path={`/actualites/${encodeURIComponent(slug ?? '')}`}
          noindex
        />
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-sm uppercase tracking-[0.18em] text-orange">SOQUIBAT Group</p>
          <h1 className="mt-3 font-display text-4xl">Actualité introuvable</h1>
          <p className="mt-4 text-paper/65">Cette actualité n’est pas disponible dans nos archives.</p>
          <Link className="mt-8 inline-flex font-semibold text-orange underline underline-offset-4" to="/actualites">
            Revenir aux actualités
          </Link>
        </div>
      </section>
    );
  }

  const articleUrl = `/actualites/${article.slug}`;
  const relatedArticles = actualites.filter((item) => item.slug !== article.slug).slice(0, 3);
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.title,
    description: article.description,
    image: [absoluteSeoUrl(article.image)],
    datePublished: article.date,
    articleSection: article.category,
    inLanguage: 'fr-TN',
    mainEntityOfPage: absoluteSeoUrl(articleUrl),
    publisher: {
      '@type': 'Organization',
      name: 'SOQUIBAT Group',
      url: absoluteSeoUrl('/'),
    },
  };

  return (
    <article className="min-h-screen bg-ink px-6 pb-24 pt-32 text-paper lg:px-12 lg:pb-32 lg:pt-40">
      <Seo
        title={`${article.title} | Actualités SOQUIBAT Group`}
        description={article.description}
        path={articleUrl}
        image={article.image}
        structuredData={articleSchema}
      />
      <div className="mx-auto max-w-[1100px]">
        <nav aria-label="Fil d’Ariane" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-paper/50 sm:text-sm">
          <Link to="/" className="transition hover:text-orange">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/actualites" className="transition hover:text-orange">Actualités</Link>
          <span aria-hidden="true">/</span>
          <span className="text-paper/80" aria-current="page">{article.title}</span>
        </nav>

        <div className="max-w-4xl">
          <p className="font-display text-sm uppercase tracking-[0.18em] text-orange">{article.category}</p>
          <h1 className="mt-3 font-display text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <time dateTime={article.date} className="mt-4 block text-sm text-paper/55">
            {article.dateLabel}
          </time>
        </div>

        <img
          src={article.image}
          alt={article.title}
          className="mt-8 max-h-[620px] w-full rounded-xl border border-line bg-ink-soft object-contain"
        />

        {article.content.length > 0 && (
          <div className="prose prose-invert mt-8 max-w-3xl prose-p:text-paper/80 prose-li:text-paper/80 prose-strong:text-paper">
            {article.content.map((paragraph, index) => (
              <p key={`${article.slug}-${index}`}>{paragraph}</p>
            ))}
          </div>
        )}

        <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-line pt-6">
          <Link
            to="/actualites"
            className="button-swipe inline-flex min-h-11 items-center gap-2 rounded-md bg-orange px-5 py-2.5 font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
          >
            <span aria-hidden="true">←</span> Toutes les actualités
          </Link>
        </div>

        <section className="mt-16 border-t border-line pt-10" aria-labelledby="latest-news">
          <h2 id="latest-news" className="font-display text-2xl uppercase text-paper lg:text-3xl">
            Dernières actualités
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {relatedArticles.map((item) => (
              <Link
                key={item.slug}
                to={`/actualites/${item.slug}`}
                className="group overflow-hidden rounded-xl border border-line bg-ink-soft transition-colors hover:border-orange"
              >
                <img src={item.image} alt="" loading="lazy" className="aspect-[16/9] w-full object-cover" />
                <div className="p-4">
                  <p className="text-xs text-paper/50">{item.dateLabel} · {item.category}</p>
                  <h3 className="mt-2 font-display text-base uppercase text-paper group-hover:text-orange">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
