import { motion, useTransform } from 'framer-motion';
import { useSectionScroll } from '../../hooks/useSectionScroll';
import { EASE_OUT } from '../../lib/motion';

type ParallaxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  /** Parallax travel distance as a percentage of the image's own height. Keep small — this is meant to read as subtle depth, not a slideshow. */
  strength?: number;
};

/**
 * The site's signature "cinematic" image: a rectangular clip-path reveal that
 * plays once as the image enters the viewport, combined with a *continuous*
 * scroll-linked scale-settle (1.12 → 1) and a slow parallax drift that stays
 * linked to the scrollbar for as long as the image is in view. This is the
 * `useScroll` + `useTransform` pattern from the brief, not a one-shot
 * `whileInView` fade.
 */
export function ParallaxImage({ src, alt, className, imgClassName, strength = 8 }: ParallaxImageProps) {
  const { ref, scrollYProgress, reduceMotion } = useSectionScroll<HTMLDivElement>();

  // Continuous parallax: the image drifts opposite the scroll direction as the
  // section passes through the viewport, then clamps once it settles (handled
  // naturally by useTransform clamping outside the input range).
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduceMotion ? ['0%', '0%'] : [`-${strength}%`, `${strength}%`]);

  // Scale-settle: image starts slightly zoomed in and eases down to its
  // natural size across the first half of its scroll pass, then holds.
  const scale = useTransform(scrollYProgress, [0, 0.5], reduceMotion ? [1, 1] : [1.12, 1]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ''}`}
      initial={{ clipPath: reduceMotion ? 'inset(0% 0 0 0)' : 'inset(8% 6% 8% 6%)', opacity: reduceMotion ? 1 : 0 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0.2 : 1.1, ease: EASE_OUT }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        className={`absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover ${imgClassName ?? ''}`}
        style={{ y: parallaxY, scale }}
      />
    </motion.div>
  );
}
