import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import whiteLogo from '../assets/img/logo-white.png';
import { nav } from '../data/soquibat';
import { EASE_OUT } from '../lib/motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { GlobalSearch } from './GlobalSearch';

export function Header() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';
  const isProductDetail = pathname.startsWith('/produits/');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollY } = useScroll();
  const bgOpacity = useSpring(useTransform(scrollY, [0, 240], [0, 1], { clamp: true }), {
    stiffness: 220,
    damping: 32,
  });

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 24);
  });

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="relative">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-black"
          style={{
            opacity: open || !isHomePage || isProductDetail ? 1 : reduceMotion ? (scrolled ? 1 : 0) : bgOpacity,
          }}
        />
        <div className="relative mx-auto flex max-w-[1400px] items-center justify-between px-6 py-3 lg:px-12 lg:py-4">
          <Link to="/" className="flex items-center" aria-label="Soquibat Group — accueil">
            <img
              src={whiteLogo}
              alt="Soquibat Group"
              className="h-10 w-32 object-cover lg:h-12 lg:w-40"
            />
          </Link>

          <nav className="hidden items-center gap-10 lg:flex" aria-label="Navigation principale">
            {nav.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="font-display text-sm tracking-[0.06em] uppercase text-paper/85 transition-colors hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:+21670131500"
              className="border border-line px-4 py-2 font-display text-sm tracking-[0.06em] uppercase transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              +216 70 131 500
            </a>
          </nav>

          <GlobalSearch />

          <button
            type="button"
            className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span
              className="h-[2px] w-7 bg-paper"
              animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="h-[2px] w-7 bg-paper"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-[2px] w-7 bg-paper"
              animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Navigation mobile"
            className="fixed inset-0 top-0 z-40 flex flex-col justify-center bg-ink px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item, index) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.5, ease: EASE_OUT }}
                >
                  <Link
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-4xl uppercase tracking-tight text-paper transition-colors hover:text-orange"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
