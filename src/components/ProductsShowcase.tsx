import { AnimatePresence, motion, useMotionValueEvent, useTransform } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/soquibat';
import { useProductWheelNavigation } from '../hooks/useProductWheelNavigation';
import { usePinnedScroll } from '../hooks/useSectionScroll';
import { EASE_OUT } from '../lib/motion';

const PRODUCT_ROW_HEIGHT = 56;
// Compress the pinned travel so each product step needs less physical scroll.
const PRODUCT_STORY_HEIGHT_VH = 250;

function ProductsHeading({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.h2
      id="products-heading"
      className="font-display text-4xl uppercase text-paper lg:text-5xl"
      initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_OUT }}
    >
      Découvrez nos produits
    </motion.h2>
  );
}

function ProductLink({
  index,
  active,
  onHover,
  compact = false,
}: {
  index: number;
  active: boolean;
  onHover?: (index: number) => void;
  compact?: boolean;
}) {
  const product = products[index];

  return (
    <li className={compact ? 'border-b border-line' : 'h-14 border-b border-line'}>
      <Link
        to={`/produits/${encodeURIComponent(product.slug)}`}
        onMouseEnter={() => onHover?.(index)}
        onFocus={() => onHover?.(index)}
        className={`group relative flex h-full items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${
          compact ? 'py-5' : 'px-1'
        }`}
      >
        <span
          className={`min-w-0 font-display uppercase transition-colors duration-300 ${
            compact ? 'text-xl sm:text-2xl' : 'truncate text-xl sm:text-2xl lg:text-3xl'
          } ${active ? 'text-paper' : 'text-paper/35 group-hover:text-paper/70'}`}
        >
          {product.name}
        </span>
        <span className="shrink-0 font-display text-xl text-orange transition-transform duration-300 group-hover:translate-x-1">
          +
        </span>
        {active && !compact && (
          <motion.span
            layoutId="active-product-indicator"
            className="absolute inset-y-2 left-0 w-0.5 bg-orange"
            transition={{ duration: 0.45, ease: EASE_OUT }}
          />
        )}
      </Link>
    </li>
  );
}

function ProductImage({ active, reduceMotion }: { active: number; reduceMotion: boolean }) {
  const product = products[active];

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-ink-soft">
      <AnimatePresence mode="sync" initial={false}>
        {products.map((item, index) => index === active && (
          <motion.img
            key={item.slug}
            src={item.image}
            alt={item.name}
            className="absolute inset-0 h-full w-full rounded-2xl object-cover object-[center_70%]"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.025 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.99 }}
            transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT }}
          />
        ))}
      </AnimatePresence>
      <div className="pointer-events-none absolute left-4 top-4 h-7 w-7 border-l-2 border-t-2 border-orange" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-5 pb-5 pt-14">
        <p className="font-display text-xl uppercase text-white sm:text-2xl">{product.name}</p>
      </div>
    </div>
  );
}

function StaticProductsShowcase({ reduceMotion }: { reduceMotion: boolean }) {
  const [active, setActive] = useState(0);

  return (
    <section data-products-showcase className="relative bg-ink px-6 py-20 lg:px-12 lg:py-28" aria-labelledby="products-heading">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px]">
        <ProductsHeading reduceMotion={reduceMotion} />
        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ul className="flex flex-col divide-y divide-line">
            {products.map((product, index) => (
              <ProductLink key={product.slug} index={index} active={active === index} onHover={setActive} compact />
            ))}
          </ul>
          <div className="hidden lg:block">
            <ProductImage active={active} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Each viewport of the tall wrapper represents one product interval. The
 * sticky panel occupies the viewport; raw useScroll progress selects the
 * current product, so scrollbar dragging and touch scrolling stay in sync.
 */
export function ProductsShowcase() {
  const { ref, scrollYProgress, reduceMotion } = usePinnedScroll<HTMLElement>();
  const [active, setActive] = useState(0);
  const wheelSyncUntilRef = useRef(0);
  const handleActiveProductChange = useCallback((index: number) => {
    wheelSyncUntilRef.current = performance.now() + 600;
    setActive(index);
  }, []);
  useProductWheelNavigation({
    ref,
    enabled: !reduceMotion,
    onActiveProductChange: handleActiveProductChange,
  });
  const listY = useTransform(
    scrollYProgress,
    [0, (products.length - 1) / products.length, 1],
    [
      -PRODUCT_ROW_HEIGHT / 2,
      -PRODUCT_ROW_HEIGHT / 2 - (products.length - 1) * PRODUCT_ROW_HEIGHT,
      -PRODUCT_ROW_HEIGHT / 2 - (products.length - 1) * PRODUCT_ROW_HEIGHT,
    ],
  );
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.04, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (performance.now() < wheelSyncUntilRef.current) return;
    const nextActive = Math.min(products.length - 1, Math.round(progress * products.length));
    setActive((current) => current === nextActive ? current : nextActive);
  });

  if (reduceMotion) {
    return <StaticProductsShowcase reduceMotion={reduceMotion} />;
  }

  return (
    <section
      ref={ref}
      data-products-showcase
      data-active-product-index={active}
      data-product-count={products.length}
      className="relative"
      style={{
        height: `${PRODUCT_STORY_HEIGHT_VH}svh`,
      }}
      aria-labelledby="products-heading"
    >
      <motion.div
        className="sticky top-0 h-[100svh] overflow-hidden bg-ink px-6 pb-8 pt-24 lg:px-12 lg:pb-10 lg:pt-28"
      >
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <motion.div className="relative z-20 mx-auto flex h-full max-w-[1400px] flex-col">
          <ProductsHeading reduceMotion={reduceMotion} />

          <div className="mt-8 grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)_minmax(0,28svh)] items-stretch gap-8 lg:mt-10 lg:gap-16 md:grid-cols-[1.1fr_1fr] md:grid-rows-1">
            <div className="relative h-full min-h-0 overflow-hidden" aria-label="Catalogue produits">
              <motion.ul className="absolute inset-x-0 top-1/2 flex flex-col" style={{ y: listY }}>
                {products.map((product, index) => (
                  <ProductLink key={product.slug} index={index} active={active === index} />
                ))}
              </motion.ul>
            </div>

            <div className="relative mx-auto h-full max-h-[28svh] w-full max-w-[28svh] self-center overflow-hidden md:max-h-[min(70svh,680px)] md:max-w-[min(100%,70svh,680px)]">
              <motion.div className="h-full w-full" style={{ scale: imageScale }}>
                <ProductImage active={active} reduceMotion={reduceMotion} />
              </motion.div>
            </div>
          </div>
          <p className="pointer-events-none absolute bottom-1 left-0 font-display text-[10px] tracking-[0.18em] text-paper/40 uppercase">
            {String(active + 1).padStart(2, '0')} / {String(products.length).padStart(2, '0')}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
