import { useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

type StatCounterProps = {
  value: number;
  suffix?: string;
};

/** Animates a number counting up to its final value once it scrolls into view. */
export function StatCounter({ value, suffix = '' }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = usePrefersReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1600, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(reduceMotion ? value : value);
  }, [inView, motionValue, reduceMotion, value]);

  useEffect(() => {
    const unsub = spring.on('change', (latest) => setDisplay(Math.round(latest)));
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="font-display text-4xl text-paper lg:text-5xl">
      {reduceMotion ? value : display}
      {suffix}
    </span>
  );
}
