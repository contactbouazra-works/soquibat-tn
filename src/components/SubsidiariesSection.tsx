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
      className="group relative flex h-full min-h-0 flex-col items-center justify-center gap-1 overflow-hidden px-1 py-1 text-center text-white transition-opacity duration-300 hover:opacity-80 sm:gap-3 sm:px-3 sm:py-4"
    >
      <span className="flex h-full max-h-[68%] w-full max-w-[86%] items-center justify-center sm:max-h-[62%]">
        <img src={sub.image} alt={`${sub.name} logo`} className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105" />
      </span>
      <span className="font-display text-[8px] uppercase tracking-[0.06em] text-white sm:text-xs sm:tracking-[0.12em] lg:text-sm">
        {sub.name}
      </span>
    </motion.a>
  );

  return (
    <SectionTransition id="filiales" className="flex h-[100svh] min-h-[100svh] flex-col overflow-hidden bg-black px-6 pb-8 pt-24 lg:px-12 lg:pt-32">
      <div className="mx-auto flex h-full min-h-0 w-full max-w-[1400px] flex-col">
        <h2 className="shrink-0 font-display text-sm font-semibold uppercase tracking-[0.2em] text-orange">
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
