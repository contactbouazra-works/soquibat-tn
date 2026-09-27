import { motion, useTransform } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { useSectionScroll } from '../../hooks/useSectionScroll';

type SectionTransitionProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** How much the section should scale/dim while it is entering or leaving. Subtle by design. */
  intensity?: number;
};

/**
 * Wraps a whole section so it subtly breathes as it crosses the viewport —
 * settling into full scale/opacity as it becomes dominant and easing back as
 * the next section takes over. This is what turns a stack of independently
 * fading-in blocks into one continuous, scroll-linked sequence instead of a
 * series of hard cuts.
 */
export function SectionTransition({
  children,
  as: Tag = 'section',
  className,
  id,
  intensity = 0.04,
}: SectionTransitionProps) {
  const { ref, scrollYProgress, reduceMotion } = useSectionScroll<HTMLElement>(['start end', 'end start']);
  const MotionTag = motion.create(Tag as ElementType);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    reduceMotion ? [1, 1, 1, 1] : [1 - intensity, 1, 1, 1 - intensity],
  );
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], reduceMotion ? [1, 1, 1, 1] : [0.6, 1, 1, 0.6]);

  return (
    <MotionTag ref={ref} id={id} className={className} style={{ scale, opacity }}>
      {children}
    </MotionTag>
  );
}
