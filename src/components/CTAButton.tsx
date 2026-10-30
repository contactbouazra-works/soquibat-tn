import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  variant?: 'orange' | 'ghost';
  className?: string;
  external?: boolean;
};

/** Industrial CTA button: orange square marker + label + arrow, matching the site's link style. */
export function CTAButton({ href, children, variant = 'orange', className, external }: CTAButtonProps) {
  const isGhost = variant === 'ghost';

  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      className={`group inline-flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange ${className ?? ''}`}
      whileHover="hover"
      initial="rest"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center text-lg font-bold transition-colors ${
          isGhost ? 'border border-current text-current' : 'bg-orange text-white'
        }`}
      >
        <motion.span
          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          &rarr;
        </motion.span>
      </span>
      <span className="font-display text-sm tracking-[0.08em] uppercase">{children}</span>
    </motion.a>
  );
}
