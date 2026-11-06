import { lazy, Suspense, useRef, useState } from 'react';
import { Seo } from '../components/Seo';
import { comptoirs } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { absoluteSeoUrl } from '../lib/seo';

const ComptoirsMap = lazy(() => import('../components/ComptoirsMap'));

export function Comptoirs() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const mapSectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  const showLocationOnMap = (locationId: string) => {
    setSelectedId(locationId);
    mapSectionRef.current?.scrollIntoView({
      behavior: reduceMotion ? 'instant' : 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <Seo
        title="Nos comptoirs | SOQUIBAT Group"
        description="Retrouvez les adresses, téléphones et emplacements de nos 12 comptoirs SOQUIBAT Group en Tunisie."
        path="/comptoirs"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Comptoirs SOQUIBAT Group en Tunisie',
          url: absoluteSeoUrl('/comptoirs'),
          numberOfItems: comptoirs.length,
          itemListElement: comptoirs.map((location, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Store',
              name: location.name,
              telephone: location.phone,
              address: {
                '@type': 'PostalAddress',
                streetAddress: location.address,
                addressCountry: 'TN',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: location.latitude,
                longitude: location.longitude,
              },
            },
          })),
        }}
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-8 max-w-3xl">
            <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">SOQUIBAT Group</p>
            <h1 className="mt-3 font-display text-3xl uppercase sm:text-4xl">Nos points de vente</h1>
            <p className="mt-4 leading-relaxed text-paper/70">
              Retrouvez les coordonnées de nos {comptoirs.length} comptoirs et localisez-les sur la carte.
            </p>
          </div>

          <section
            ref={mapSectionRef}
            aria-label="Carte des comptoirs"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-orange/30 bg-ink-soft"
          >
            <Suspense
              fallback={
                <div className="flex h-[420px] items-center justify-center bg-[#e8e4dc] text-sm text-slate-700 sm:h-[540px]">
                  Chargement de la carte…
                </div>
              }
            >
              <ComptoirsMap selectedId={selectedId} onSelect={setSelectedId} />
            </Suspense>
          </section>

          <section className="mt-14" aria-labelledby="comptoirs-list-title">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">Notre réseau</p>
                <h2 id="comptoirs-list-title" className="mt-2 font-display text-2xl uppercase">
                  Tous nos comptoirs
                </h2>
              </div>
              <p className="text-sm text-paper/60">{comptoirs.length} adresses en Tunisie</p>
            </div>

            <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {comptoirs.map((location, index) => {
                const isSelected = selectedId === location.id;
                return (
                  <li key={location.id}>
                    <article
                      className={`h-full rounded-xl border p-5 transition-colors ${
                        isSelected
                          ? 'border-orange/70 bg-orange/10'
                          : 'border-white/10 bg-ink-soft hover:border-orange/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm font-semibold text-ink">
                          {index + 1}
                        </span>
                        <h3 className="pt-1 font-display text-base uppercase leading-snug">{location.name}</h3>
                      </div>
                      <dl className="mt-5 space-y-3 pl-11 text-sm">
                        <div>
                          <dt className="font-semibold text-paper/80">Adresse</dt>
                          <dd className="mt-1 leading-relaxed text-paper/60">{location.address}</dd>
                        </div>
                        <div>
                          <dt className="font-semibold text-paper/80">Téléphone</dt>
                          <dd className="mt-1">
                            <a
                              className="transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                              href={`tel:${location.phone.startsWith('+') ? location.phone.replace(/[^\d+]/g, '') : `+216${location.phone.replace(/\D/g, '')}`}`}
                            >
                              {location.phone}
                            </a>
                          </dd>
                        </div>
                      </dl>
                      <button
                        type="button"
                        onClick={() => showLocationOnMap(location.id)}
                        aria-pressed={isSelected}
                        className="ml-11 mt-5 font-display text-xs uppercase tracking-wide text-orange underline decoration-orange/40 underline-offset-4 transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                      >
                        {isSelected ? 'Emplacement sélectionné' : 'Voir sur la carte'}
                      </button>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </main>
    </>
  );
}
