import { motion, type Variants } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { DURATION, EASE_OUT } from '../lib/motion';

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  id?: string;
  [key: `aria-${string}`]: string | boolean | undefined;
};

/**
 * Fades and slides content into place as it enters the viewport, the base
 * building block for the site's scroll-reveal motion language.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  className,
  delay = 0,
  y = 32,
  once = true,
  ...rest
}: RevealProps) {
  const reduceMotion = usePrefersReducedMotion();
  const MotionTag = motion.create(Tag as ElementType);

  const variants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : DURATION.base, delay, ease: EASE_OUT },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25 }}
      variants={variants}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type RevealLinesProps = {
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
};

/**
 * Reveals a heading line by line, masked and lifted upward. Pass `immediate`
 * for above-the-fold content (e.g. the hero) that should animate in on mount
 * rather than waiting for a scroll-triggered viewport intersection.
 */
export function RevealLines({
  lines,
  as: Tag = 'div',
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: RevealLinesProps & { immediate?: boolean }) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, index) => {
        // Defined per-line (delay depends on index) but as stable variant
        // labels rather than raw inline animation targets — passing a fresh
        // object literal to `whileInView`/`animate` on every render makes
        // Framer Motion treat it as a new target and can cause an
        // already-revealed line to silently re-hide on an unrelated re-render.
        // The trigger/observed element must be the *outer* (clipping)
        // wrapper, not the inner span that itself gets translated: once
        // hidden, a translated inner span sits outside its own
        // overflow-hidden box, so an IntersectionObserver watching it
        // directly would see ~0% visibility and `whileInView` would never
        // fire. The outer wrapper carries no transform of its own (a no-op
        // variant) and only exists to observe/trigger; the inner span
        // inherits the "visible" label via Framer Motion's parent → child
        // variant propagation and carries the actual move/fade.
        const triggerVariants: Variants = { hidden: {}, visible: {} };
        const lineVariants: Variants = {
          hidden: { y: reduceMotion ? 0 : '100%', opacity: reduceMotion ? 1 : 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: {
              duration: reduceMotion ? 0.2 : 0.9,
              delay: delay + index * 0.1,
              ease: EASE_OUT,
            },
          },
        };

        return (
          <motion.span
            key={line}
            className="block overflow-hidden"
            variants={triggerVariants}
            initial="hidden"
            {...(immediate ? { animate: 'visible' } : { whileInView: 'visible', viewport: { once: true, amount: 0.3 } })}
          >
            <motion.span className={`block ${lineClassName ?? ''}`} variants={lineVariants}>
              {line}
            </motion.span>
          </motion.span>
        );
      })}
    </Tag>
  );
}

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  parallax?: boolean;
};

/** Clip-path + scale reveal for images, with an optional subtle parallax drift. */
export function RevealImage({ src, alt, className, imgClassName, parallax = false }: RevealImageProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ''}`}
      initial={{ clipPath: reduceMotion ? 'inset(0% 0 0 0)' : 'inset(8% 8% 8% 8%)', opacity: reduceMotion ? 1 : 0 }}
      whileInView={{ clipPath: 'inset(0% 0 0 0)', opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: EASE_OUT }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover ${imgClassName ?? ''}`}
        initial={{ scale: reduceMotion ? 1 : 1.18 }}
        whileInView={{ scale: parallax ? 1.06 : 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: reduceMotion ? 0.2 : 1.4, ease: EASE_OUT }}
      />
    </motion.div>
  );
}
