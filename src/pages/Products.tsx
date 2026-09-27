import { Link } from 'react-router-dom';
import { products } from '../data/soquibat';
import { motion } from 'framer-motion';
import { Reveal } from '../components/Reveal';

export function Products() {
  return (
    <section className="bg-ink px-6 pb-24 pt-36 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal as="h1" className="font-display text-4xl uppercase text-paper lg:text-6xl">
          Nos produits
        </Reveal>
        <Reveal delay={0.1} className="mt-4 max-w-xl text-base text-paper/70">
          Une large gamme de produits métallurgiques de toutes les nuances, adaptée à toutes les exigences.
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.slug} delay={(index % 6) * 0.05}>
              <motion.div
                initial="rest"
                whileHover="hover"
                className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
              >
                <Link
                  to={`/produits/${encodeURIComponent(product.slug)}`}
                  aria-label={`${product.name} — découvrir le produit`}
                  className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                >
                  <motion.img
                    src={product.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full rounded-2xl object-cover"
                    variants={{ rest: { scale: 1 }, hover: { scale: 1.05 } }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                    variants={{ rest: { opacity: 0.72 }, hover: { opacity: 1 } }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-6">
                    <span className="mb-2 h-0.5 w-10 bg-amber-500" />
                    <h2 className="font-display text-lg uppercase text-white sm:text-xl">
                      {product.name}
                    </h2>
                    <span className="mt-1 font-display text-xs uppercase tracking-[0.14em] text-white/70">
                      {product.referenceCount} {product.referenceCount === 1 ? 'référence' : 'références'}
                    </span>
                    <motion.p
                      className="mt-2 text-sm text-slate-200"
                      variants={{ rest: { y: 20, opacity: 0 }, hover: { y: 0, opacity: 1 } }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      Découvrez nos références de {product.name}, sélectionnées pour accompagner vos projets.
                    </motion.p>
                  </div>
                </Link>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
