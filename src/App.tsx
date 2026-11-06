import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { Groupe } from './pages/Groupe';
import { SearchResults } from './pages/SearchResults';
import { Actualites } from './pages/Actualites';
import { ActualiteDetail } from './pages/ActualiteDetail';
import { Comptoirs } from './pages/Comptoirs';

function ScrollToTop() {
  const { pathname, hash, key } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = previousRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    const samePath = previousPathname.current === pathname;
    previousPathname.current = pathname;

    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (samePath) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    }
  }, [pathname, hash, key]);

  return null;
}

function PageTransition({ children }: { children: ReactNode }) {
  const { hash } = useLocation();

  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onAnimationStart={() => {
        if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }}
      onAnimationComplete={() => {
        const target = hash && document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target) {
          target.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }
      }}
    >
      {children}
    </motion.main>
  );
}

function App() {
  const location = useLocation();

  return (
    <>
      <ScrollToTop />
      <Header />
      <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/produits"
              element={
                <PageTransition>
                  <Products />
                </PageTransition>
              }
            />
            <Route
              path="/actualites"
              element={
                <PageTransition>
                  <Actualites />
                </PageTransition>
              }
            />
            <Route
              path="/comptoirs"
              element={
                <PageTransition>
                  <Comptoirs />
                </PageTransition>
              }
            />
            <Route
              path="/actualites/:slug"
              element={
                <PageTransition>
                  <ActualiteDetail />
                </PageTransition>
              }
            />
            <Route
              path="/produits/:slug"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
            />
            <Route
              path="/produits/Panneaux-Sandwich-Portes-Frigorifiques"
              element={<Navigate to="/produits/Panneaux-Sandwich" replace />}
            />
            <Route
              path="/contact"
              element={
                <PageTransition>
                  <Contact />
                </PageTransition>
              }
            />
            <Route
              path="/search"
              element={
                <PageTransition>
                  <SearchResults />
                </PageTransition>
              }
            />
            <Route
              path="/groupe"
              element={
                <PageTransition>
                  <Groupe />
                </PageTransition>
              }
            />
          </Routes>
      </AnimatePresence>
      <Footer />
      <a
        href="https://wa.me/21698145656"
        target="_blank"
        rel="noreferrer"
        aria-label="Contacter SOQUIBAT sur WhatsApp au +216 98 145 656"
        className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
          <path d="M20.52 3.48A11.9 11.9 0 0 0 12.05 0C5.45 0 .08 5.37.08 11.97c0 2.11.55 4.17 1.59 5.99L0 24l6.19-1.62a11.93 11.93 0 0 0 5.86 1.49h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.2-3.51-8.42ZM12.06 21.84h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.67.96.98-3.58-.24-.37a9.87 9.87 0 0 1-1.52-5.29c0-5.47 4.45-9.92 9.93-9.92 2.65 0 5.14 1.03 7.01 2.91a9.87 9.87 0 0 1 2.91 7.02c0 5.47-4.45 9.92-9.92 9.92Zm5.45-7.43c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.48-1.77-1.65-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
        </svg>
      </a>
    </>
  );
}

export default App;
