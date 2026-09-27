import { Children, type ReactNode, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useSectionSlideNavigation } from '../hooks/useSectionSlideNavigation';

export function SectionSlideFlow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  useSectionSlideNavigation({ ref, enabled: !reduceMotion });

  return (
    <div ref={ref} data-home-slide-flow className="relative">
      {Children.toArray(children).map((child, index) => (
        <div key={index} data-home-slide-panel className="home-slide-panel h-[100svh] overflow-y-auto overscroll-auto">
          {child}
        </div>
      ))}
    </div>
  );
}
