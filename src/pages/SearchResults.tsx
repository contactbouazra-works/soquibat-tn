import { useMemo, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchResultCard } from '../components/SearchResultCard';
import { Seo } from '../components/Seo';
import { searchSiteContent, type SearchCategory } from '../lib/siteSearch';

const categories = ['Tous', 'Produits', 'Actualités', 'Recrutement', 'Groupe'] as const;
type CategoryFilter = (typeof categories)[number];

export function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q')?.trim() ?? '';
  const [draftState, setDraftState] = useState({ query, value: query });
  const draftQuery = draftState.query === query ? draftState.value : query;
  const [category, setCategory] = useState<CategoryFilter>('Tous');
  const allResults = useMemo(() => searchSiteContent(query), [query]);
  const results = category === 'Tous'
    ? allResults
    : allResults.filter((result) => result.category === category as SearchCategory);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = draftQuery.trim();
    setSearchParams(trimmedQuery ? { q: trimmedQuery } : {});
  };

  return (
    <>
      <Seo
        title={query ? `Recherche « ${query} » | SOQUIBAT Group` : 'Recherche | SOQUIBAT Group'}
        description="Recherchez dans le catalogue produits, les actualités, les pages du groupe et les publications de recrutement de SOQUIBAT."
        path="/search"
        noindex
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1100px]">
          <p className="font-display text-xs uppercase tracking-[0.2em] text-orange">Recherche globale</p>
          <h1 className="mt-3 font-display text-3xl uppercase sm:text-4xl lg:text-5xl">
            {query ? <>Résultats de recherche pour « {query} »</> : 'Que recherchez-vous ?'}
          </h1>
          <p className="mt-3 text-sm text-paper/60">
            {query ? `${allResults.length} résultat${allResults.length === 1 ? '' : 's'}` : 'Produits, actualités, groupe et recrutement.'}
          </p>

          <form onSubmit={submitSearch} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="search-results-query" className="sr-only">Rechercher dans le site</label>
            <input
              id="search-results-query"
              type="search"
              value={draftQuery}
              onChange={(event) => setDraftState({ query, value: event.target.value })}
              placeholder="Saisir votre recherche"
              className="h-12 min-w-0 flex-1 rounded-xl border border-line bg-ink-soft px-4 text-paper placeholder:text-paper/45 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange px-6 font-semibold text-slate-950 transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
            >
              Rechercher
            </button>
          </form>

          {query && (
            <>
              <div className="mt-8 flex flex-wrap gap-2" aria-label="Filtrer les résultats par catégorie">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
                      category === item
                        ? 'border-orange bg-orange text-slate-950'
                        : 'border-line text-paper/75 hover:border-orange hover:text-paper'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {results.length ? (
                <div className="mt-6 space-y-3">
                  {results.map((result) => <SearchResultCard key={result.id} result={result} />)}
                </div>
              ) : (
                <p className="mt-8 rounded-xl border border-line bg-ink-soft p-6 text-paper/70">
                  Aucun résultat pour « {query} »{category !== 'Tous' ? ` dans la catégorie ${category}` : ''}. Essayez un autre mot-clé.
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}
