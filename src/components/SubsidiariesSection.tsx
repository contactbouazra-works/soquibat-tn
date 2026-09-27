import { motion } from 'framer-motion';
import { subsidiaries } from '../data/soquibat';
import { SectionTransition } from './motion/SectionTransition';

export function SubsidiariesSection() {
  const renderCard = (sub: (typeof subsidiaries)[number], index: number) => (
    <motion.a
      key={sub.name}
      href={sub.href}
      target={sub.href.startsWith('http') ? '_blank' : undefined}
      rel={sub.href.startsWith('http') ? 'noreferrer' : undefined}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        opacity: { duration: 0.55, delay: index * 0.08 },
        y: { duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] },
        scale: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
      }}
      className="group relative flex h-full min-h-0 flex-col items-center justify-center gap-1 overflow-hidden rounded-2xl border border-white/10 bg-black bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:16px_16px] px-1 py-1 text-center text-white shadow-xl transition-all duration-300 hover:border-amber-500 hover:shadow-2xl sm:gap-3 sm:px-3 sm:py-4"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100 dark:from-white/5"
      />
      <span className="relative z-10 flex aspect-square h-full max-h-[68%] w-auto max-w-[86%] items-center justify-center overflow-hidden rounded-xl bg-white/95 p-1 shadow-sm sm:max-h-[62%] sm:p-3">
        <img src={sub.image} alt={`${sub.name} logo`} className="h-full w-full rounded-xl object-contain transition-transform duration-500 group-hover:scale-105" />
      </span>
      <span className="relative z-10 font-display text-[8px] uppercase tracking-[0.06em] text-white/80 transition-colors group-hover:text-amber-400 sm:text-xs sm:tracking-[0.12em] lg:text-sm">
        {sub.name}
      </span>
    </motion.a>
  );

  return (
    <SectionTransition id="filiales" className="flex h-[100svh] min-h-[100svh] flex-col justify-center overflow-hidden bg-slate-50 px-6 py-12 dark:bg-black lg:px-12">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col justify-center">
        <h2 className="shrink-0 font-display text-sm font-semibold uppercase tracking-[0.2em] text-amber-600 dark:text-amber-500">
          Filiales
        </h2>
        <div className="mt-5 grid min-h-0 flex-1 grid-rows-2 gap-3 sm:mt-7 sm:gap-5">
          <div className="grid min-h-0 grid-cols-1 grid-rows-3 gap-3 md:grid-cols-3 md:grid-rows-1 sm:gap-5 lg:gap-6">
            {subsidiaries.slice(0, 3).map((sub, index) => renderCard(sub, index))}
          </div>
          <div className="mx-auto grid min-h-0 w-full max-w-4xl grid-cols-2 gap-3 sm:gap-5 lg:gap-6">
            {subsidiaries.slice(3).map((sub, index) => renderCard(sub, index + 3))}
          </div>
        </div>
      </div>
    </SectionTransition>
  );
}
