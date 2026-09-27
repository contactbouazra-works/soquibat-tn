import { animate } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';
import { products } from '../data/soquibat';

// Short lock keeps product selection responsive while allowing its image cross-fade to finish.
const TRANSITION_DURATION = 0.38;
const TRANSITION_UNLOCK_DELAY = 450;
const ENTRANCE_DURATION = 0.6;
const WHEEL_THRESHOLD = 20;
const TOUCH_THRESHOLD = 40;

type ProductWheelNavigationOptions = {
  ref: RefObject<HTMLElement | null>;
  enabled: boolean;
  onActiveProductChange: (index: number) => void;
};

export function useProductWheelNavigation({
  ref,
  enabled,
  onActiveProductChange,
}: ProductWheelNavigationOptions) {
  const lockUntilRef = useRef(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const unlockTimeoutRef = useRef<number | null>(null);
  const restoreScrollBehaviorRef = useRef<(() => void) | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchTriggeredRef = useRef(false);

  useEffect(() => {
    const section = ref.current;
    if (!section || !enabled) return;

    const getBounds = () => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const range = Math.max(section.offsetHeight - window.innerHeight, 1);
      return { top, range, end: top + range };
    };

    const getActiveStepPosition = (top: number, range: number, index: number) =>
      top + range * (index / products.length);

    const isInsideStory = () => {
      const { top, end } = getBounds();
      return window.scrollY >= top - 1 && window.scrollY <= end + 1;
    };

    const transitionTo = (target: number, duration = TRANSITION_DURATION) => {
      const unlockDelay = Math.max(TRANSITION_UNLOCK_DELAY, duration * 1000 + 50);
      lockUntilRef.current = Date.now() + unlockDelay;
      if (unlockTimeoutRef.current !== null) window.clearTimeout(unlockTimeoutRef.current);
      const root = document.documentElement;
      const previousScrollBehavior = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      restoreScrollBehaviorRef.current = () => {
        root.style.scrollBehavior = previousScrollBehavior;
        restoreScrollBehaviorRef.current = null;
      };

      animationRef.current?.stop();
      const finishTransition = () => {
        if (unlockTimeoutRef.current !== null) {
          window.clearTimeout(unlockTimeoutRef.current);
          unlockTimeoutRef.current = null;
        }
        restoreScrollBehaviorRef.current?.();
        animationRef.current = null;
        lockUntilRef.current = 0;
      };

      animationRef.current = animate(window.scrollY, target, {
        duration,
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (scrollPosition) => window.scrollTo(0, scrollPosition),
        onComplete: finishTransition,
      });
      unlockTimeoutRef.current = window.setTimeout(() => {
        restoreScrollBehaviorRef.current?.();
        unlockTimeoutRef.current = null;
      }, unlockDelay);
    };

    const moveProduct = (direction: -1 | 1) => {
      if (Date.now() < lockUntilRef.current) return true;
      const { top, range } = getBounds();
      const currentScrollY = window.scrollY;
      const end = top + range;

      if (direction > 0 && currentScrollY < top - 1 && currentScrollY >= top - window.innerHeight - 2) {
        transitionTo(top, ENTRANCE_DURATION);
        return true;
      }
      if (currentScrollY < top - 1 || currentScrollY > end + 1) return false;

      const progress = Math.min(1, Math.max(0, (window.scrollY - top) / range));
      const currentIndex = Math.min(products.length - 1, Math.round(progress * products.length));
      const nextIndex = currentIndex + direction;

      if (nextIndex < 0 || nextIndex >= products.length) return false;
      onActiveProductChange(nextIndex);
      transitionTo(getActiveStepPosition(top, range, nextIndex));
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (Date.now() < lockUntilRef.current) {
        if (isInsideStory()) event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) <= WHEEL_THRESHOLD) return;
      if (moveProduct(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;

      if (Date.now() < lockUntilRef.current) {
        if (isInsideStory()) event.preventDefault();
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;
      if (moveProduct(direction as -1 | 1)) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
      touchTriggeredRef.current = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (Date.now() < lockUntilRef.current) {
        if (isInsideStory()) event.preventDefault();
        return;
      }
      if (touchTriggeredRef.current) {
        if (isInsideStory()) event.preventDefault();
        return;
      }

      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY === null || currentY === undefined) return;
      const delta = startY - currentY;
      if (Math.abs(delta) <= TOUCH_THRESHOLD) return;

      if (moveProduct(delta > 0 ? 1 : -1)) {
        touchTriggeredRef.current = true;
        event.preventDefault();
      }
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchTriggeredRef.current = false;
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      animationRef.current?.stop();
      animationRef.current = null;
      if (unlockTimeoutRef.current !== null) window.clearTimeout(unlockTimeoutRef.current);
      unlockTimeoutRef.current = null;
      restoreScrollBehaviorRef.current?.();
      lockUntilRef.current = 0;
    };
  }, [enabled, onActiveProductChange, ref]);
}
