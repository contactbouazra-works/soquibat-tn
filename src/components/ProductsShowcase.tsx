import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getProductShowcaseImage, products } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { EASE_OUT } from '../lib/motion';

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
}: {
  index: number;
  active: boolean;
  onHover?: (index: number) => void;
}) {
  const product = products[index];

  return (
    <li className="border-b border-line">
      <Link
        to={`/produits/${encodeURIComponent(product.slug)}`}
        onMouseEnter={() => onHover?.(index)}
        onFocus={() => onHover?.(index)}
        className="group relative flex h-full items-center justify-between gap-4 py-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
      >
        <span
          className={`min-w-0 font-display text-xl uppercase transition-colors duration-300 sm:text-2xl ${
            active ? 'text-paper' : 'text-paper/35 group-hover:text-paper/70'
          }`}
        >
          {product.name}
        </span>
        <span className="shrink-0 font-display text-xl text-orange transition-transform duration-300 group-hover:translate-x-1">
          +
        </span>
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
            src={getProductShowcaseImage(item)}
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
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-white/95 via-white/60 to-transparent px-5 pb-5 pt-14 dark:from-slate-950/90 dark:via-slate-900/55">
        <p className="font-display text-xl uppercase text-slate-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.12)] dark:text-white dark:drop-shadow-none sm:text-2xl">
          {product.name}
        </p>
      </div>
    </div>
  );
}

export function ProductsShowcase() {
  const [active, setActive] = useState(0);
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="produits"
      data-products-showcase
      data-active-product-index={active}
      data-product-count={products.length}
      className="relative bg-ink px-6 py-20 lg:px-12 lg:py-28 lg:pb-0"
      aria-labelledby="products-heading"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1400px]">
        <ProductsHeading reduceMotion={reduceMotion} />
        <div className="mt-10 grid items-start gap-8 lg:mt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <ul className="flex flex-col divide-y divide-line lg:pb-28">
            {products.map((product, index) => (
              <ProductLink key={product.slug} index={index} active={active === index} onHover={setActive} />
            ))}
          </ul>
          <div className="sticky top-28 hidden self-start lg:block">
            <ProductImage active={active} reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}
