import { motion, useTransform } from 'framer-motion';
import type { ElementType, ReactNode } from 'react';
import { useSectionScroll } from '../../hooks/useSectionScroll';

type SectionTransitionProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  id?: string;
  /** How much the section should scale while it is entering or leaving. Subtle by design. */
  intensity?: number;
};

/**
 * Wraps a whole section so it subtly scales as it crosses the viewport,
 * without dimming its content as it enters or leaves.
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
  return (
    <MotionTag ref={ref} id={id} className={className} style={{ scale }}>
      {children}
    </MotionTag>
  );
}
