import { useScroll, useSpring, type MotionValue, type UseScrollOptions } from 'framer-motion';
import { useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';
import { SCROLL_SPRING, SECTION_SCROLL_OFFSET } from '../lib/motion';

type Offset = NonNullable<UseScrollOptions['offset']>;

type SectionScroll<T extends HTMLElement> = {
  /** Attach to the section/element whose scroll pass should drive the animation. */
  ref: React.RefObject<T | null>;
  /** Raw 0→1 progress as the target crosses the given offsets. */
  scrollYProgress: MotionValue<number>;
  /** Spring-smoothed progress — use this for anything that should feel fluid
   *  rather than perfectly 1:1 with the scrollbar. Falls back to the raw value
   *  when the user prefers reduced motion. */
  smoothProgress: MotionValue<number>;
  reduceMotion: boolean;
};

/**
 * The core primitive of the site's scroll-driven motion system: tracks how far
 * a section has travelled through the viewport (0 = just entering, 1 = just
 * leaving) so consuming components can map that progress onto transforms via
 * `useTransform`. This intentionally uses Framer's `useScroll` (backed by
 * IntersectionObserver/rAF) instead of a manual `window.addEventListener('scroll', ...)`.
 */
export function useSectionScroll<T extends HTMLElement>(offset: Offset = SECTION_SCROLL_OFFSET): SectionScroll<T> {
  const ref = useRef<T>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const smoothProgress = useSpring(scrollYProgress, SCROLL_SPRING);

  return {
    ref,
    scrollYProgress,
    smoothProgress: reduceMotion ? scrollYProgress : smoothProgress,
    reduceMotion,
  };
}

/**
 * Variant for "pinned storytelling" sections: tracks progress across the
 * *entire* tall wrapper (start start → end end) rather than a single viewport
 * pass, so a `position: sticky` panel inside it can react to how far the
 * reader has scrolled through the whole pinned story.
 */
export function usePinnedScroll<T extends HTMLElement>(): SectionScroll<T> {
  return useSectionScroll<T>(['start start', 'end end']);
}
