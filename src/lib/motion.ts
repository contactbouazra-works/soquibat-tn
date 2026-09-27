// Shared motion system: every animated component in the site pulls its easing,
// durations and movement distances from here so the whole experience feels
// like one coherent, cinematic system rather than ad-hoc per-component tuning.

/** Primary "ease out" curve — used for anything entering/settling into place. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Symmetric ease — used for continuous, scroll-linked transforms. */
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
} as const;

/** Spring tuned to feel weighty/industrial rather than bouncy. */
export const SOFT_SPRING = { stiffness: 90, damping: 22, mass: 0.6 } as const;

/** Spring used to smooth raw scroll progress into a slightly trailing value. */
export const SCROLL_SPRING = { stiffness: 120, damping: 26, mass: 0.4 } as const;

/** Standard distances used for translateY entrance movement, in pixels. */
export const DISTANCE = {
  sm: 16,
  md: 32,
  lg: 64,
} as const;

/** Standard offset used for elements that animate across their own viewport pass. */
export const SECTION_SCROLL_OFFSET: Array<'start end' | 'end start'> = ['start end', 'end start'];
