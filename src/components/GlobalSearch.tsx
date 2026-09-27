import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchResultCard } from './SearchResultCard';
import { searchSiteContent } from '../lib/siteSearch';

const RESULT_LIMIT = 5;
const SEARCH_DEBOUNCE_MS = 200;

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();
  const results = searchSiteContent(debouncedQuery);
  const isSearching = query.trim() !== debouncedQuery.trim();

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsOpen(true);
      } else if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        setQuery('');
        setDebouncedQuery('');
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    inputRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const keepFocusInsideDialog = (event: globalThis.KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableElements = Array.from(
        dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled])'),
      ).filter((element) => element.offsetParent !== null);
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) {
        event.preventDefault();
        inputRef.current?.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener('keydown', keepFocusInsideDialog);
    return () => window.removeEventListener('keydown', keepFocusInsideDialog);
  }, [isOpen]);

  useEffect(() => {
    const timeout = window.setTimeout(() => setDebouncedQuery(query), SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timeout);
  }, [query]);

  const close = () => {
    setIsOpen(false);
    setQuery('');
    setDebouncedQuery('');
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  };

  const goToAllResults = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    setIsOpen(false);
    setQuery('');
    setDebouncedQuery('');
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query.trim()) {
      event.preventDefault();
      goToAllResults();
    }
  };

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) close();
  };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir la recherche"
        title="Rechercher (⌘K / Ctrl+K)"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-paper transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      >
        <SearchIcon className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto bg-black/50 px-4 pb-8 pt-[8vh] backdrop-blur-md sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={handleBackdropClick}
          >
            <motion.section
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="global-search-title"
              className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 id="global-search-title" className="sr-only">Recherche globale</h2>
              <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 p-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:p-5">
                <label className="flex items-center gap-3">
                  <SearchIcon className="h-5 w-5 shrink-0 text-slate-500 dark:text-slate-400" />
                  <input
                    ref={inputRef}
                    type="search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={handleInputKeyDown}
                    placeholder="Rechercher produits, actualités, offres…"
                    autoComplete="off"
                    className="h-10 min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500 sm:text-lg"
                  />
                  {isSearching ? (
                    <Spinner />
                  ) : query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery('');
                        setDebouncedQuery('');
                        inputRef.current?.focus();
                      }}
                      aria-label="Effacer la recherche"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  ) : null}
                  <button
                    type="button"
                    onClick={close}
                    className="shrink-0 rounded-md border border-slate-200 px-2 py-1 font-mono text-[0.65rem] text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400 dark:hover:border-slate-500"
                  >
                    ESC
                  </button>
                </label>
                <p className="mt-2 pl-8 text-[0.68rem] text-slate-500 dark:text-slate-400">
                  Recherchez dans les produits, actualités, pages du groupe et recrutements.
                </p>
              </div>

              <div className="max-h-[60vh] space-y-3 overflow-y-auto p-4 sm:p-5">
                {!query.trim() ? (
                  <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Saisissez un mot-clé pour lancer la recherche.
                  </p>
                ) : isSearching ? (
                  <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400" role="status">
                    Recherche en cours…
                  </p>
                ) : results.length ? (
                  <>
                    <p className="px-1 pb-1 text-xs text-slate-500 dark:text-slate-400">
                      {results.length} résultat{results.length > 1 ? 's' : ''}
                    </p>
                    {results.slice(0, RESULT_LIMIT).map((result) => (
                      <SearchResultCard key={result.id} result={result} onSelect={close} />
                    ))}
                  </>
                ) : (
                  <p className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
                    Aucun résultat pour « {debouncedQuery} ».
                  </p>
                )}
              </div>

              {!isSearching && results.length > RESULT_LIMIT && (
                <button
                  type="button"
                  onClick={goToAllResults}
                  className="flex w-full items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-indigo-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-800 dark:focus-visible:outline-amber-400"
                >
                  <span>Voir tous les {results.length} résultats pour « {query.trim()} »</span>
                  <span aria-hidden="true">→</span>
                </button>
              )}
              <div className="sr-only" aria-live="polite">
                {isSearching ? 'Recherche en cours' : `${results.length} résultat(s)`}
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path strokeLinecap="round" d="m16 16 4.5 4.5" />
    </svg>
  );
}

function CloseIcon({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg aria-label="Recherche en cours" role="status" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 animate-spin text-indigo-600 dark:text-amber-400">
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3" />
    </svg>
  );
}
