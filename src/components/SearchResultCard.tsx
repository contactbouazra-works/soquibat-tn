import { Link } from 'react-router-dom';
import type { SearchResult } from '../lib/siteSearch';

const categoryLabels: Record<SearchResult['category'], string> = {
  Produits: '#Produits',
  Groupe: '#Groupe',
  Actualités: '#Actualités',
};

export function SearchResultCard({
  result,
  onSelect,
}: {
  result: SearchResult;
  onSelect?: () => void;
}) {
  return (
    <Link
      to={result.href}
      onClick={onSelect}
      className="group flex min-w-0 items-center gap-4 rounded-xl border border-white/10 bg-[#111111] p-3 text-slate-100 transition-all duration-200 hover:border-orange/70 hover:bg-[#17120f] hover:shadow-md hover:shadow-orange/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange sm:gap-5 sm:p-4"
    >
      <span className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-black sm:h-20 sm:w-20">
        <img src={result.image} alt="" loading="lazy" className="h-full w-full object-cover" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex min-w-0 items-start justify-between gap-3">
          <span className="line-clamp-1 font-display text-base uppercase leading-snug sm:text-lg">
            {result.title}
          </span>
          <span className="shrink-0 rounded-full border border-orange/25 bg-orange/10 px-2 py-1 font-display text-[0.6rem] uppercase tracking-wide text-orange sm:px-2.5 sm:text-[0.65rem]">
            {categoryLabels[result.category]}
          </span>
        </span>
        <span className="mt-1 block truncate text-xs text-slate-400">
          {result.metadata}
        </span>
        <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-slate-300 sm:text-sm">
          {result.description}
        </span>
      </span>
    </Link>
  );
}
