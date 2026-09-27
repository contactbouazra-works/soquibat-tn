import { animate, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { company, heroSlides } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { CTAButton } from './CTAButton';

const firstFrame = heroSlides[1];
const secondFrame = heroSlides[0];
type ActiveStoryText = 'first' | 'products' | 'second';
const IMAGE_EXPANSION_START = 0.1;
const IMAGE_EXPANSION_END = 0.25;
const PRODUCT_PANEL_START = 0.25;
const PRODUCT_PANEL_VISIBLE = 0.5;
const PRODUCT_PANEL_EXIT = 0.62;
const FIRST_TEXT_EXIT_START = 0.62;
const FIRST_TEXT_EXIT = 0.9;
const NEW_PRODUCT_START = 0.62;
const NEW_PRODUCT_VISIBLE = 0.9;
const HERO_SCROLL_STEPS: number[] = [0, 0.25, 0.5, 1];
const HERO_STEP_DURATION = 0.7;
const HERO_STEP_DEBOUNCE = 750;
const WHEEL_THRESHOLD = 18;
const heroNavigation = [
  { label: 'Produits', to: '/#produits' },
  { label: 'Le groupe', to: '/groupe' },
  { label: 'Implantations', to: '/#points-de-vente' },
  { label: 'Actualités', to: '/actualites' },
  { label: 'Carrière', to: '/recrutement' },
  { label: 'Contact', to: '/contact' },
];

function mapStops(progress: number, input: number[], output: number[]) {
  if (progress <= input[0]) return output[0];

  for (let index = 1; index < input.length; index += 1) {
    if (progress <= input[index]) {
      const segmentProgress = (progress - input[index - 1]) / (input[index] - input[index - 1]);
      return output[index - 1] + (output[index] - output[index - 1]) * segmentProgress;
    }
  }

  return output[output.length - 1];
}

function mapSmoothStops(progress: number, input: number[], output: number[]) {
  if (progress <= input[0]) return output[0];

  for (let index = 1; index < input.length; index += 1) {
    if (progress <= input[index]) {
      const segmentProgress = (progress - input[index - 1]) / (input[index] - input[index - 1]);
      const easedProgress = segmentProgress * segmentProgress * (3 - 2 * segmentProgress);
      return output[index - 1] + (output[index] - output[index - 1]) * easedProgress;
    }
  }

  return output[output.length - 1];
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeStoryText, setActiveStoryText] = useState<ActiveStoryText>('first');
  const activeStoryTextRef = useRef<ActiveStoryText>('first');
  const isAnimatingRef = useRef(false);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  const unlockTimerRef = useRef<number | null>(null);
  const restoreScrollBehaviorRef = useRef<(() => void) | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    const nextText: ActiveStoryText = progress < PRODUCT_PANEL_START
      ? 'first'
      : progress < PRODUCT_PANEL_EXIT
        ? 'products'
        : 'second';
    if (activeStoryTextRef.current !== nextText) {
      activeStoryTextRef.current = nextText;
      setActiveStoryText(nextText);
    }
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener('change', updateViewport);
    return () => mediaQuery.removeEventListener('change', updateViewport);
  }, []);

  const stepHero = useCallback((direction: -1 | 1) => {
    const section = sectionRef.current;
    if (!section || isAnimatingRef.current) return false;

    const top = section.getBoundingClientRect().top + window.scrollY;
    const range = Math.max(section.offsetHeight - window.innerHeight, 1);
    const progress = Math.min(1, Math.max(0, (window.scrollY - top) / range));
    const lastStep = HERO_SCROLL_STEPS[HERO_SCROLL_STEPS.length - 1];

    if (progress > lastStep + 0.005) return false;
    if (direction > 0 && progress >= lastStep - 0.005) return false;
    if (direction < 0 && progress <= 0.005) return false;

    let nearestStepIndex = 0;
    for (let index = 1; index < HERO_SCROLL_STEPS.length; index += 1) {
      if (Math.abs(HERO_SCROLL_STEPS[index] - progress) < Math.abs(HERO_SCROLL_STEPS[nearestStepIndex] - progress)) {
        nearestStepIndex = index;
      }
    }
    const nextStepIndex = nearestStepIndex + direction;
    if (nextStepIndex < 0 || nextStepIndex >= HERO_SCROLL_STEPS.length) return false;

    const target = top + range * (HERO_SCROLL_STEPS[nextStepIndex] ?? lastStep);
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    isAnimatingRef.current = true;
    animationRef.current?.stop();
    animationRef.current = animate(window.scrollY, target, {
      duration: HERO_STEP_DURATION,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (scrollPosition) => window.scrollTo(0, scrollPosition),
      onComplete: () => {
        animationRef.current = null;
      },
    });
    restoreScrollBehaviorRef.current = () => {
      root.style.scrollBehavior = previousScrollBehavior;
      restoreScrollBehaviorRef.current = null;
    };
    if (unlockTimerRef.current !== null) window.clearTimeout(unlockTimerRef.current);
    unlockTimerRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      unlockTimerRef.current = null;
      restoreScrollBehaviorRef.current?.();
    }, HERO_STEP_DEBOUNCE);
    return true;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }
      if (stepHero(event.deltaY > 0 ? 1 : -1)) event.preventDefault();
    };

    section.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      section.removeEventListener('wheel', onWheel);
      animationRef.current?.stop();
      animationRef.current = null;
      isAnimatingRef.current = false;
      if (unlockTimerRef.current !== null) window.clearTimeout(unlockTimerRef.current);
      unlockTimerRef.current = null;
      restoreScrollBehaviorRef.current?.();
    };
  }, [reduceMotion, stepHero]);

  // The 400svh track provides three viewports of pinned scroll travel.
  const cardLeft = useTransform(scrollYProgress, (progress) =>
    `${mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [isMobile ? 42 : 40, 0])}vw`,
  );
  const cardTop = useTransform(scrollYProgress, (progress) =>
    `${mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [15, 0])}vh`,
  );
  const cardWidth = useTransform(scrollYProgress, (progress) =>
    `${mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [isMobile ? 58 : 60, 100])}vw`,
  );
  const cardHeight = useTransform(scrollYProgress, (progress) =>
    `${mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [70, 100])}vh`,
  );
  const cardRadius = useTransform(scrollYProgress, (progress) =>
    mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [24, 0]),
  );
  const firstImageOpacity = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [NEW_PRODUCT_START, NEW_PRODUCT_VISIBLE], [1, 0]),
  );
  const secondImageOpacity = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [NEW_PRODUCT_START, NEW_PRODUCT_VISIBLE], [0, 1]),
  );
  const firstTextOpacity = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [FIRST_TEXT_EXIT_START, FIRST_TEXT_EXIT], [1, 0]),
  );
  const firstTextScrimOpacity = useTransform(scrollYProgress, (progress) =>
    mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [0, 0.3]),
  );
  const secondTextOpacity = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [NEW_PRODUCT_START, NEW_PRODUCT_VISIBLE], [0, 1]),
  );
  const secondTextY = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [NEW_PRODUCT_START, NEW_PRODUCT_VISIBLE], [48, 0]),
  );
  const secondTextScrimOpacity = useTransform(scrollYProgress, (progress) =>
    mapSmoothStops(progress, [NEW_PRODUCT_START, NEW_PRODUCT_VISIBLE], [0, 1]),
  );
  const imageScrimOpacity = useTransform(scrollYProgress, (progress) =>
    mapStops(progress, [IMAGE_EXPANSION_START, IMAGE_EXPANSION_END], [0, 0.25]),
  );
  const productPanelX = useTransform(
    scrollYProgress,
    [PRODUCT_PANEL_START, PRODUCT_PANEL_VISIBLE, PRODUCT_PANEL_EXIT],
    ['100%', '0%', '100%'],
  );
  const productPanelOpacity = useTransform(
    scrollYProgress,
    [PRODUCT_PANEL_START, PRODUCT_PANEL_VISIBLE, PRODUCT_PANEL_EXIT],
    [0, 1, 0],
  );
  const scrollCueOpacity = useTransform(scrollYProgress, (progress) => mapStops(progress, [0, 0.15], [1, 0]));

  if (reduceMotion) {
    return (
      <section className="bg-ink px-6 pb-16 pt-28 lg:px-12 lg:pt-32" aria-label="Soquibat, notre histoire en images">
        <div className="mx-auto grid max-w-[1400px] gap-16">
          <StaticFrame
            image={firstFrame.image}
            imageAlt={firstFrame.title}
            kicker={firstFrame.kicker}
            title={firstFrame.title}
            subtitle={firstFrame.subtitle}
            description={company.description}
            ctaHref="/produits"
            ctaLabel="Nos produits"
            headingLevel="h1"
          />
          <StaticFrame
            image={secondFrame.image}
            imageAlt={secondFrame.title}
            kicker={secondFrame.kicker}
            title={secondFrame.title}
            subtitle={secondFrame.subtitle}
            description="Qualité et services inégalés. Innover pour relever les défis ambitieux de demain."
            ctaHref="/groupe"
            ctaLabel="Découvrir le groupe"
            headingLevel="h2"
          />
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative bg-ink"
      style={{ height: '400svh' }}
      aria-label="Soquibat, notre histoire en images"
      data-hero-story
    >
      <div className="sticky top-0 overflow-hidden" style={{ height: '100svh' }}>
        <div
          className="dot-grid pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 opacity-40 lg:block"
          style={{ zIndex: 0 }}
        />

        <motion.div
          className="absolute z-0 overflow-hidden border border-white/15 shadow-2xl shadow-black/30"
          style={{ left: cardLeft, top: cardTop, width: cardWidth, height: cardHeight, borderRadius: cardRadius, zIndex: 0 }}
        >
          <motion.img
            src={firstFrame.image}
            alt={firstFrame.title}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            style={{ opacity: firstImageOpacity }}
            draggable={false}
          />
          <motion.img
            src={secondFrame.image}
            alt={secondFrame.title}
            className="absolute inset-0 z-0 h-full w-full object-cover"
            style={{ opacity: secondImageOpacity }}
            draggable={false}
          />
          <motion.div
            aria-hidden="true"
            className="hero-image-overlay--left absolute inset-0 z-10"
            style={{ opacity: firstImageOpacity }}
          />
          <motion.div
            aria-hidden="true"
            className="hero-image-overlay--right absolute inset-0 z-10"
            style={{ opacity: secondImageOpacity }}
          />
          <div aria-hidden="true" className="hero-image-vignette absolute inset-0 z-10" />
          <motion.div
            aria-hidden="true"
            className="hero-image-expansion-scrim absolute inset-0 z-10"
            style={{ opacity: imageScrimOpacity }}
          />
          <div className="absolute left-4 top-4 z-20 h-7 w-7 border-l-2 border-t-2 border-orange lg:left-8 lg:top-8 lg:h-9 lg:w-9" aria-hidden="true" />
        </motion.div>

        <motion.div
          className={`hero-image-copy hero-image-copy--intro absolute z-30 flex max-w-xl ${activeStoryText === 'first' ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={activeStoryText !== 'first'}
          inert={activeStoryText !== 'first'}
          style={{
            left: isMobile ? '6vw' : '7vw',
            right: isMobile ? '6vw' : 'auto',
            top: 0,
            bottom: 0,
            width: isMobile ? '40vw' : '40vw',
            alignItems: isMobile ? 'flex-start' : 'center',
            paddingTop: isMobile ? '11vh' : 0,
            zIndex: activeStoryText === 'first' ? 30 : 19,
            visibility: 'visible',
            opacity: firstTextOpacity,
          }}
        >
          <motion.div
            aria-hidden="true"
            className="hero-image-copy-scrim pointer-events-none absolute -inset-x-5 -inset-y-4 z-0 rounded-2xl backdrop-blur-sm sm:-inset-x-7 sm:-inset-y-6"
            style={{ opacity: firstTextScrimOpacity }}
          />
          <div className="relative z-20 w-full pointer-events-auto">
            <p className="mb-4 font-display text-xs tracking-[0.2em] text-orange uppercase sm:text-sm">{firstFrame.kicker}</p>
            <h1 className="font-display text-3xl leading-[0.96] text-slate-900 uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:text-white dark:drop-shadow-none sm:text-5xl lg:text-6xl xl:text-7xl">
              {firstFrame.title}
            </h1>
            <p className="mt-3 font-display text-base leading-snug text-slate-700 uppercase dark:text-slate-300 sm:text-xl lg:text-2xl">
              {firstFrame.subtitle}
            </p>
            <p className="mt-3 max-w-lg text-xs leading-relaxed text-slate-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:text-slate-300 dark:drop-shadow-none sm:mt-5 sm:text-base lg:mt-7">
              {company.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4 sm:mt-9">
              <CTAButton href="/produits">Nos produits</CTAButton>
              <CTAButton href="/groupe" variant="ghost">Le groupe</CTAButton>
            </div>
          </div>
        </motion.div>

        <motion.aside
          aria-label="Liens rapides"
          aria-hidden={activeStoryText !== 'products'}
          inert={activeStoryText !== 'products'}
          className={`absolute inset-y-0 right-0 z-30 flex w-[75vw] items-center border-l border-orange/50 bg-white/90 px-5 text-slate-900 shadow-xl backdrop-blur-md dark:bg-slate-950/90 dark:text-slate-100 sm:px-10 lg:px-16 ${activeStoryText === 'products' ? 'pointer-events-auto' : 'pointer-events-none'}`}
          style={{ x: productPanelX, opacity: productPanelOpacity }}
        >
          <div className="w-full">
            <p className="mb-6 font-display text-xs tracking-[0.24em] text-orange uppercase sm:mb-10 sm:text-sm">
              Explorer Soquibat
            </p>
            <ul className="space-y-3 sm:space-y-5">
              {heroNavigation.map((item, index) => (
                <li key={item.label}>
                  <a
                    href={item.to}
                    className="group flex items-center gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange sm:gap-5"
                  >
                    <span className="font-display text-xs text-orange/70 sm:text-sm">0{index + 1}</span>
                    <span
                      className="font-display text-xl uppercase text-transparent transition-colors duration-300 group-hover:text-slate-900 dark:group-hover:text-white sm:text-3xl lg:text-5xl"
                      style={{ WebkitTextStroke: '1px var(--hero-nav-stroke)' }}
                    >
                      {item.label}
                    </span>
                    <span className="ml-auto text-lg text-orange opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.aside>

        <motion.div
          className={`hero-image-copy hero-image-copy--product absolute z-20 flex max-w-xl text-paper ${activeStoryText === 'second' ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={activeStoryText !== 'second'}
          inert={activeStoryText !== 'second'}
          style={{
            left: isMobile ? '6vw' : 'auto',
            right: '7vw',
            top: 0,
            bottom: 0,
            width: isMobile ? '88vw' : '40vw',
            alignItems: 'center',
            textAlign: 'left',
            paddingTop: isMobile ? '11vh' : 0,
            zIndex: 20,
            visibility: activeStoryText === 'second' ? 'visible' : 'hidden',
            opacity: secondTextOpacity,
            y: secondTextY,
          }}
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-5 -inset-y-4 z-0 rounded-2xl bg-ink/40 backdrop-blur-sm sm:-inset-x-7 sm:-inset-y-6"
            style={{ opacity: secondTextScrimOpacity }}
          />
          <div className="pointer-events-auto relative z-20 w-full">
            <p className="mb-4 font-display text-xs tracking-[0.2em] text-orange uppercase sm:text-sm">{secondFrame.kicker}</p>
            <h2 className="font-display text-3xl leading-[0.96] uppercase sm:text-5xl lg:text-6xl xl:text-7xl">
              {secondFrame.title}
            </h2>
            <p className="mt-3 font-display text-base leading-snug text-slate-700 uppercase dark:text-slate-300 sm:text-xl lg:text-2xl">
              {secondFrame.subtitle}
            </p>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-slate-700 drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] dark:text-slate-300 dark:drop-shadow-none sm:text-base">
              Qualité et services inégalés. Innover pour relever les défis ambitieux de demain.
            </p>
            <div className="mt-8">
              <CTAButton href="/groupe">Découvrir le groupe</CTAButton>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute z-20 flex items-center gap-3 text-xs tracking-[0.2em] text-paper/70 uppercase"
          style={{ left: isMobile ? '6vw' : '7vw', bottom: '28px', zIndex: 20, opacity: scrollCueOpacity }}
          aria-hidden="true"
        >
          <span className="h-8 w-px bg-paper/60" />
          Faire défiler
        </motion.div>
      </div>
    </section>
  );
}

type StaticFrameProps = {
  image: string;
  imageAlt: string;
  kicker: string;
  title: string;
  subtitle: string;
  description: string;
  ctaHref: string;
  ctaLabel: string;
  headingLevel: 'h1' | 'h2';
};

function StaticFrame({
  image,
  imageAlt,
  kicker,
  title,
  subtitle,
  description,
  ctaHref,
  ctaLabel,
  headingLevel,
}: StaticFrameProps) {
  const Heading = headingLevel;

  return (
    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
      <div className="order-2 lg:order-1">
        <p className="mb-4 font-display text-xs tracking-[0.2em] text-orange uppercase sm:text-sm">{kicker}</p>
        <Heading className="font-display text-4xl leading-[0.96] text-paper uppercase sm:text-5xl lg:text-6xl">
          {title}
        </Heading>
        <p className="mt-3 font-display text-lg leading-snug text-paper/75 uppercase sm:text-xl">{subtitle}</p>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-paper/75 sm:text-base">{description}</p>
        <div className="mt-7">
          <CTAButton href={ctaHref}>{ctaLabel}</CTAButton>
        </div>
      </div>
      <img
        src={image}
        alt={imageAlt}
        className="order-1 aspect-square w-full rounded-2xl border border-white/15 object-cover shadow-2xl shadow-black/30 lg:order-2"
      />
    </div>
  );
}
