import { animate } from 'framer-motion';
import { useEffect, useRef, type RefObject } from 'react';

const TRANSITION_DURATION = 0.55;
const TRANSITION_LOCK_MS = 600;
const INPUT_THRESHOLD = 20;
const TOUCH_THRESHOLD = 40;

type SectionSlideNavigationOptions = {
  ref: RefObject<HTMLElement | null>;
  enabled: boolean;
};

export function useSectionSlideNavigation({ ref, enabled }: SectionSlideNavigationOptions) {
  const lockUntilRef = useRef(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const unlockTimeoutRef = useRef<number | null>(null);
  const restoreScrollBehaviorRef = useRef<(() => void) | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  useEffect(() => {
    const flow = ref.current;
    if (!flow || !enabled) return;

    const getPanels = () => Array.from(flow.querySelectorAll<HTMLElement>('[data-home-slide-panel]'));
    const getFlowTop = () => flow.getBoundingClientRect().top + window.scrollY;
    const isWithinFlow = () => {
      const flowTop = getFlowTop();
      const flowBottom = flowTop + flow.offsetHeight;
      return window.scrollY >= flowTop - 1 && window.scrollY <= flowBottom + 1;
    };
    const isScrollableInside = (panel: HTMLElement, direction: -1 | 1) => {
      if (direction > 0) return panel.scrollTop + panel.clientHeight < panel.scrollHeight - 2;
      return panel.scrollTop > 1;
    };

    const animateTo = (target: number) => {
      if (Date.now() < lockUntilRef.current) return true;
      lockUntilRef.current = Date.now() + TRANSITION_LOCK_MS;
      if (unlockTimeoutRef.current !== null) window.clearTimeout(unlockTimeoutRef.current);

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
          animationRef.current = null;
          restoreScrollBehaviorRef.current?.();
        },
      });
      unlockTimeoutRef.current = window.setTimeout(() => {
        restoreScrollBehaviorRef.current?.();
        unlockTimeoutRef.current = null;
      }, TRANSITION_LOCK_MS);
      return true;
    };

    const getPreviousProductStep = () => {
      const productSection = flow.previousElementSibling?.matches('[data-products-showcase]')
        ? flow.previousElementSibling as HTMLElement
        : null;
      if (!productSection) return null;

      const activeProduct = Number(productSection.dataset.activeProductIndex);
      const productCount = Number(productSection.dataset.productCount);
      if (!Number.isFinite(activeProduct) || activeProduct !== productCount - 1 || productCount < 1) return null;

      const productTop = productSection.getBoundingClientRect().top + window.scrollY;
      const productRange = Math.max(productSection.offsetHeight - window.innerHeight, 1);
      return productTop + productRange * ((productCount - 1) / productCount);
    };

    const step = (direction: -1 | 1, eventTarget?: EventTarget | null, delta?: number) => {
      if (Date.now() < lockUntilRef.current) return true;

      const panels = getPanels();
      if (panels.length === 0) return false;

      const flowTop = getFlowTop();
      const viewportHeight = window.innerHeight;
      const currentY = window.scrollY;
      const flowBottom = flowTop + flow.offsetHeight;

      if (currentY < flowTop - 1) {
        if (direction < 0) return false;
        const productSection = flow.previousElementSibling;
        const activeIndex = productSection instanceof HTMLElement
          ? Number(productSection.dataset.activeProductIndex)
          : Number.NaN;
        const productCount = productSection instanceof HTMLElement
          ? Number(productSection.dataset.productCount)
          : Number.NaN;

        if (activeIndex !== productCount - 1) return false;
        const productTop = productSection instanceof HTMLElement
          ? productSection.getBoundingClientRect().top + window.scrollY
          : Number.NaN;
        const productRange = productSection instanceof HTMLElement
          ? Math.max(productSection.offsetHeight - viewportHeight, 1)
          : 0;
        const lastProductStep = productTop + productRange * ((productCount - 1) / productCount);
        if (currentY < lastProductStep - 2) return false;
        return animateTo(flowTop);
      }

      if (currentY >= flowBottom - 1) {
        if (direction > 0) return false;
        if (currentY > flowBottom + 2) return false;
        return animateTo(flowTop + panels[panels.length - 1].offsetTop);
      }

      const panelIndex = panels.reduce((nearestIndex, panel, index) =>
        Math.abs(flowTop + panel.offsetTop - currentY) <
          Math.abs(flowTop + panels[nearestIndex].offsetTop - currentY)
          ? index
          : nearestIndex,
      0);
      const panel = panels[panelIndex];
      const targetElement = eventTarget instanceof Element ? eventTarget : null;
      const eventPanel = targetElement?.closest<HTMLElement>('[data-home-slide-panel]');
      const scrollPanel = eventPanel && flow.contains(eventPanel) ? eventPanel : panel;

      if (isScrollableInside(scrollPanel, direction)) {
        if (eventPanel === scrollPanel || delta === undefined) return false;
        const maxScroll = scrollPanel.scrollHeight - scrollPanel.clientHeight;
        scrollPanel.scrollTop = Math.max(0, Math.min(maxScroll, scrollPanel.scrollTop + delta));
        return true;
      }

      const nextIndex = panelIndex + direction;
      if (nextIndex < 0) {
        const previousProductStep = getPreviousProductStep();
        if (previousProductStep === null) return false;
        return animateTo(previousProductStep);
      }
      if (nextIndex >= panels.length) return false;
      return animateTo(flowTop + panels[nextIndex].offsetTop);
    };

    const onWheel = (event: WheelEvent) => {
      if (Date.now() < lockUntilRef.current) {
        if (isWithinFlow()) event.preventDefault();
        return;
      }
      if (Math.abs(event.deltaY) <= INPUT_THRESHOLD) return;
      if (step(event.deltaY > 0 ? 1 : -1, event.target, event.deltaY)) event.preventDefault();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const direction = ['ArrowDown', 'PageDown', ' '].includes(event.key)
        ? 1
        : ['ArrowUp', 'PageUp'].includes(event.key)
          ? -1
          : 0;
      if (!direction) return;
      if (Date.now() < lockUntilRef.current) {
        if (isWithinFlow()) event.preventDefault();
        return;
      }
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('a, button, input, select, textarea, [contenteditable="true"]')) return;
      if (step(direction, event.target)) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (Date.now() < lockUntilRef.current) {
        if (isWithinFlow()) event.preventDefault();
        return;
      }
      const startY = touchStartYRef.current;
      const currentY = event.touches[0]?.clientY;
      if (startY === null || currentY === undefined) return;
      const delta = startY - currentY;
      if (Math.abs(delta) <= TOUCH_THRESHOLD) return;
      if (step(delta > 0 ? 1 : -1, event.target, delta)) event.preventDefault();
      touchStartYRef.current = currentY;
    };

    const onTouchEnd = () => {
      touchStartYRef.current = null;
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
  }, [enabled, ref]);
}
