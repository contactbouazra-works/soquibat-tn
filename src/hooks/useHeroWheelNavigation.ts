import { animate } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';

const HERO_STAGES = 3;
// Keep each discrete hero snap smooth while preventing additional wheel input.
const TRANSITION_DURATION = 0.75;
// Ignore small trackpad deltas so inertia does not skip a hero stage.
const WHEEL_THRESHOLD = 20;
const TOUCH_THRESHOLD = 40;

type HeroWheelNavigationOptions = {
  ref: RefObject<HTMLElement | null>;
  enabled: boolean;
};

export function useHeroWheelNavigation({ ref, enabled }: HeroWheelNavigationOptions) {
  const isAnimatingRef = useRef(false);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const restoreScrollBehaviorRef = useRef<(() => void) | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchTriggeredRef = useRef(false);

  useEffect(() => {
    const section = ref.current;
    if (!section || !enabled) return;

    const getBounds = () => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      const lastStagePosition = top + range * ((HERO_STAGES - 1) / HERO_STAGES);
      return { top, range, lastStagePosition };
    };

    const isInStory = () => {
      const { top, lastStagePosition } = getBounds();
      return window.scrollY >= top - 1 && window.scrollY <= lastStagePosition + 1;
    };

    const transitionTo = (target: number) => {
      isAnimatingRef.current = true;
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      restoreScrollBehaviorRef.current = () => {
        root.style.scrollBehavior = previousScrollBehavior;
        restoreScrollBehaviorRef.current = null;
      };

      animationRef.current?.stop();
      animationRef.current = animate(window.scrollY, target, {
        duration: TRANSITION_DURATION,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (scrollPosition) => window.scrollTo(0, scrollPosition),
        onComplete: () => {
          restoreScrollBehaviorRef.current?.();
          animationRef.current = null;
          isAnimatingRef.current = false;
        },
      });
    };

    const moveStage = (direction: -1 | 1) => {
      if (isAnimatingRef.current) return true;
      if (!isInStory()) return false;

      const { top, range, lastStagePosition } = getBounds();
      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / range));
      const currentStage = Math.min(HERO_STAGES - 1, Math.round(progress * HERO_STAGES));
      const nextStage = currentStage + direction;

      if (nextStage < 0 || nextStage >= HERO_STAGES) return false;
      transitionTo(Math.min(top + range * (nextStage / HERO_STAGES), lastStagePosition));
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) <= WHEEL_THRESHOLD) return;
      if (moveStage(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;

      if (isAnimatingRef.current && isInStory()) {
        event.preventDefault();
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;
      if (moveStage(direction as -1 | 1)) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchTriggeredRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isInStory()) return;
      if (isAnimatingRef.current || touchTriggeredRef.current) {
        event.preventDefault();
        return;
      }

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY === null || currentY === undefined) return;
      const delta = startY - currentY;
      if (Math.abs(delta) <= TOUCH_THRESHOLD) return;

      if (moveStage(delta > 0 ? 1 : -1)) {
        touchTriggeredRef.current = true;
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchTriggeredRef.current = false;
    };

    section.addEventListener('wheel', onWheel, { passive: false });
    section.addEventListener('touchstart', onTouchStart, { passive: true });
    section.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      section.removeEventListener('wheel', onWheel);
      section.removeEventListener('touchstart', onTouchStart);
      section.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      animationRef.current?.stop();
      animationRef.current = null;
      restoreScrollBehaviorRef.current?.();
      isAnimatingRef.current = false;
    };
  }, [enabled, ref]);
}
