import { motion } from 'framer-motion';
import { useState, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Seo } from '../components/Seo';

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const reduceMotion = usePrefersReducedMotion();
  const [activeReferenceIndex, setActiveReferenceIndex] = useState(0);
  const [zoomLens, setZoomLens] = useState<{
    x: number;
    y: number;
    size: number;
    backgroundSize: string;
    backgroundPosition: string;
  } | null>(null);

  if (!product) {
    return (
      <section className="min-h-[65vh] bg-ink px-6 pb-24 pt-36 text-paper lg:px-12">
        <Seo
          title="Produit introuvable | SOQUIBAT Group"
          description="Ce produit n’est pas disponible dans le catalogue SOQUIBAT Group. Consultez l’ensemble de nos produits métallurgiques en Tunisie."
          path={`/produits/${encodeURIComponent(slug ?? '')}`}
          noindex
        />
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-sm uppercase tracking-[0.18em] text-orange">Catalogue SOQUIBAT</p>
          <h1 className="mt-3 font-display text-4xl">Produit introuvable</h1>
          <p className="mt-4 text-paper/65">Ce produit n’est pas disponible dans le catalogue affiché.</p>
          <Link className="mt-8 inline-flex font-semibold text-orange underline underline-offset-4" to="/produits">
            Revenir aux produits
          </Link>
        </div>
      </section>
    );
  }

  const activeReference = product.references[activeReferenceIndex];
  const image = activeReference?.image ?? product.image;
  const hasMultipleReferences = product.references.length > 1;
  const showPreviousReference = () => {
    setActiveReferenceIndex((index) => (index - 1 + product.references.length) % product.references.length);
  };
  const showNextReference = () => {
    setActiveReferenceIndex((index) => (index + 1) % product.references.length);
  };
  const updateZoomLens = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== 'mouse') {
      setZoomLens(null);
      return;
    }

    const imageElement = event.currentTarget.querySelector('img');
    if (!imageElement?.naturalWidth || !imageElement.naturalHeight) return;

    const stageRect = event.currentTarget.getBoundingClientRect();
    const imageRect = imageElement.getBoundingClientRect();
    const scale = Math.min(
      imageRect.width / imageElement.naturalWidth,
      imageRect.height / imageElement.naturalHeight,
    );
    const imageWidth = imageElement.naturalWidth * scale;
    const imageHeight = imageElement.naturalHeight * scale;
    const imageLeft = imageRect.left - stageRect.left + (imageRect.width - imageWidth) / 2;
    const imageTop = imageRect.top - stageRect.top + (imageRect.height - imageHeight) / 2;
    const pointerX = event.clientX - stageRect.left - imageLeft;
    const pointerY = event.clientY - stageRect.top - imageTop;
    if (pointerX < 0 || pointerX > imageWidth || pointerY < 0 || pointerY > imageHeight) {
      setZoomLens(null);
      return;
    }

    const lensSize = Math.min(120, imageWidth, imageHeight);
    const lensLeft = Math.min(imageWidth - lensSize, Math.max(0, pointerX - lensSize / 2));
    const lensTop = Math.min(imageHeight - lensSize, Math.max(0, pointerY - lensSize / 2));
    const zoom = 2.5;

    setZoomLens({
      x: imageLeft + lensLeft,
      y: imageTop + lensTop,
      size: lensSize,
      backgroundSize: `${imageWidth * zoom}px ${imageHeight * zoom}px`,
      backgroundPosition: `-${lensLeft * zoom}px -${lensTop * zoom}px`,
    });
  };

  return (
    <section className="min-h-screen bg-ink px-6 pb-24 pt-32 text-paper lg:px-12 lg:pb-32 lg:pt-40" aria-labelledby="product-title">
      <Seo
        title={`${product.name} en Tunisie | SOQUIBAT Group`}
        description={product.description}
        path={`/produits/${encodeURIComponent(product.slug)}`}
        image={product.image}
      />
      <div className="mx-auto max-w-[1400px]">
        <nav aria-label="Fil d’Ariane" className="mb-10 flex flex-wrap items-center gap-2 text-xs text-paper/50 sm:text-sm">
          <Link to="/" className="transition hover:text-orange">Accueil</Link>
          <span aria-hidden="true">/</span>
          <Link to="/produits" className="transition hover:text-orange">Nos produits</Link>
          <span aria-hidden="true">/</span>
          <span className="text-paper/80" aria-current="page">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
          <div className="min-w-0">
            <motion.div
              onPointerMove={updateZoomLens}
              onPointerLeave={() => setZoomLens(null)}
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex aspect-[4/3] min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-line bg-slate-100 dark:bg-slate-950"
            >
              <motion.img
                key={image}
                src={image}
                alt={activeReference?.name ?? product.name}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className="absolute inset-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] select-none object-contain sm:inset-10 sm:h-[calc(100%-5rem)] sm:w-[calc(100%-5rem)]"
                draggable={false}
              />
              {zoomLens && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute z-10 border-2 border-orange bg-no-repeat shadow-[0_0_0_9999px_rgba(0,0,0,0.08)]"
                  style={{
                    left: zoomLens.x,
                    top: zoomLens.y,
                    width: zoomLens.size,
                    height: zoomLens.size,
                    backgroundImage: `url("${image}")`,
                    backgroundSize: zoomLens.backgroundSize,
                    backgroundPosition: zoomLens.backgroundPosition,
                  }}
                />
              )}
              {hasMultipleReferences && (
                <>
                  <button
                    type="button"
                    onClick={showPreviousReference}
                    aria-label="Image précédente"
                    className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur transition hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={showNextReference}
                    aria-label="Image suivante"
                    className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white backdrop-blur transition hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                </>
              )}
              <span className="absolute bottom-4 left-4 z-20 max-w-[70%] truncate rounded-full border border-white/10 bg-black/75 px-3 py-1.5 text-xs text-white/75 backdrop-blur">
                {activeReference?.name ?? product.name}
              </span>
              {hasMultipleReferences && (
                <span className="absolute bottom-4 right-4 z-20 rounded-full border border-white/10 bg-black/75 px-3 py-1.5 font-display text-xs text-white/75 backdrop-blur" aria-live="polite">
                  {String(activeReferenceIndex + 1).padStart(2, '0')} / {String(product.references.length).padStart(2, '0')}
                </span>
              )}
            </motion.div>

            {product.references.length > 0 && (
              <div className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <h2 className="font-display text-sm uppercase tracking-[0.14em] text-paper/60">Images disponibles</h2>
                  <span className="font-display text-xs text-paper/40">
                    Faites défiler pour tout voir
                  </span>
                </div>
                <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3">
                  {product.references.map((reference, index) => (
                    <button
                      key={`${reference.name}-${reference.image}`}
                      type="button"
                      onClick={() => setActiveReferenceIndex(index)}
                      aria-label={`Afficher ${reference.name}`}
                      aria-pressed={activeReferenceIndex === index}
                      className={`group w-28 shrink-0 snap-start overflow-hidden rounded-lg border bg-white text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange dark:bg-slate-950 sm:w-32 ${
                        activeReferenceIndex === index ? 'border-orange' : 'border-line hover:border-slate-400 dark:hover:border-white/40'
                      }`}
                    >
                      <span className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-slate-100 p-2 dark:bg-neutral-900">
                        <img
                          src={reference.image}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </span>
                      <span className="block truncate px-2 py-2 font-display text-xs uppercase text-slate-700 dark:text-white/75">
                        {reference.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <p className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
              <span className="h-px w-8 bg-orange" />
              Produits métallurgiques
            </p>
            <h1 id="product-title" className="font-display text-4xl uppercase leading-[1.02] sm:text-5xl lg:text-6xl">{product.name}</h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
              {product.description}
            </p>
            <p className="mt-8 font-display text-sm uppercase tracking-[0.14em] text-paper/50">
              {product.referenceCount} {product.referenceCount === 1 ? 'référence' : 'références'}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
