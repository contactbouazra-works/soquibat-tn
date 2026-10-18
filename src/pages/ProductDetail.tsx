import { motion } from 'framer-motion';
import { useRef, useState, type PointerEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { Seo } from '../components/Seo';

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const reduceMotion = usePrefersReducedMotion();
  const [activeReferenceIndex, setActiveReferenceIndex] = useState(0);
  const [imageZoom, setImageZoom] = useState(1);
  const [imagePan, setImagePan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragState = useRef<{ pointerId: number; x: number; y: number; panX: number; panY: number } | null>(null);
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
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
    setZoomLens(null);
  };
  const showNextReference = () => {
    setActiveReferenceIndex((index) => (index + 1) % product.references.length);
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
    setZoomLens(null);
  };
  const showReference = (index: number) => {
    setActiveReferenceIndex(index);
    setImageZoom(1);
    setImagePan({ x: 0, y: 0 });
    setZoomLens(null);
  };
  const changeZoom = (direction: -1 | 1) => {
    const nextZoom = Math.min(4, Math.max(1, imageZoom + direction * 0.5));
    setImageZoom(nextZoom);
    if (nextZoom === 1) setImagePan({ x: 0, y: 0 });
    else if (imageZoom > 1) {
      const zoomRatio = nextZoom / imageZoom;
      setImagePan((pan) => ({ x: pan.x * zoomRatio, y: pan.y * zoomRatio }));
    }
  };
  const startImageDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (imageZoom === 1 || event.pointerType !== 'mouse' || !(event.target instanceof HTMLImageElement)) return;
    event.preventDefault();
    dragState.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      panX: imagePan.x,
      panY: imagePan.y,
    };
    setIsDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const dragImage = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragState.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const imageElement = event.currentTarget.querySelector('img');
    if (!imageElement?.naturalWidth || !imageElement.naturalHeight) return;
    const stage = event.currentTarget;
    const maxX = Math.max(0, (imageElement.clientWidth * imageZoom - stage.clientWidth) / 2);
    const maxY = Math.max(0, (imageElement.clientHeight * imageZoom - stage.clientHeight) / 2);
    const x = drag.panX + event.clientX - drag.x;
    const y = drag.panY + event.clientY - drag.y;

    setImagePan({
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    });
  };
  const stopImageDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (dragState.current?.pointerId !== event.pointerId) return;
    dragState.current = null;
    setIsDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const updateZoomLens = (event: PointerEvent<HTMLDivElement>) => {
    if (imageZoom > 1) {
      setZoomLens(null);
      return;
    }
    if (event.pointerType !== 'mouse') {
      setZoomLens(null);
      return;
    }

    const imageElement = event.currentTarget.querySelector('img');
    if (!imageElement?.naturalWidth || !imageElement.naturalHeight) return;
    if (event.target !== imageElement) {
      setZoomLens(null);
      return;
    }

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
    const zoom = 2.5;

    setZoomLens({
      x: imageLeft + pointerX - lensSize / 2,
      y: imageTop + pointerY - lensSize / 2,
      size: lensSize,
      backgroundSize: `${imageWidth * zoom}px ${imageHeight * zoom}px`,
      backgroundPosition: `${lensSize / 2 - pointerX * zoom}px ${lensSize / 2 - pointerY * zoom}px`,
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
              onPointerDown={startImageDrag}
              onPointerMoveCapture={dragImage}
              onPointerUp={stopImageDrag}
              onPointerCancel={stopImageDrag}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex aspect-[4/3] min-h-64 items-center justify-center overflow-hidden rounded-2xl border border-line bg-slate-100 dark:bg-black"
            >
              <motion.img
                key={image}
                src={image}
                alt={activeReference?.name ?? product.name}
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.3 }}
                className={`absolute inset-5 h-[calc(100%-2.5rem)] w-[calc(100%-2.5rem)] select-none object-contain sm:inset-10 sm:h-[calc(100%-5rem)] sm:w-[calc(100%-5rem)] ${
                  imageZoom > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
                }`}
                style={{
                  scale: imageZoom,
                  x: imagePan.x,
                  y: imagePan.y,
                  transformOrigin: 'center',
                  touchAction: 'none',
                }}
                draggable={false}
              />
              <div className="absolute right-4 top-4 z-20 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => changeZoom(1)}
                  disabled={imageZoom >= 4}
                  aria-label="Zoom avant"
                  title="Zoom avant"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 4.5 4.5M10.8 7.8v6M7.8 10.8h6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => changeZoom(-1)}
                  disabled={imageZoom <= 1}
                  aria-label="Zoom arrière"
                  title="Zoom arrière"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white backdrop-blur transition hover:border-orange hover:text-orange disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="10.8" cy="10.8" r="6.8" />
                    <path d="m16 16 4.5 4.5M7.8 10.8h6" />
                  </svg>
                </button>
              </div>
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
                      onClick={() => showReference(index)}
                      aria-label={`Afficher ${reference.name}`}
                      aria-pressed={activeReferenceIndex === index}
                      className={`group w-28 shrink-0 snap-start overflow-hidden rounded-lg border bg-white text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange dark:bg-black sm:w-32 ${
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
