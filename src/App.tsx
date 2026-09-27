import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Contact } from './pages/Contact';
import { ThemeProvider } from './context/ThemeProvider';
import { Actualites } from './pages/Actualites';
import { ActualiteDetail } from './pages/ActualiteDetail';
import { Recrutement, RecrutementDetail } from './pages/Recrutement';
import { Candidature } from './pages/Candidature';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0 });
  }, [pathname, hash]);
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
      onAnimationComplete={() => {
        const target = hash && document.getElementById(hash.slice(1));
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
    <ThemeProvider>
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
              path="/produits/:slug"
              element={
                <PageTransition>
                  <ProductDetail />
                </PageTransition>
              }
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
              path="/actualites"
              element={
                <PageTransition>
                  <Actualites />
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
              path="/recrutement"
              element={
                <PageTransition>
                  <Recrutement />
                </PageTransition>
              }
            />
            <Route
              path="/recrutement/:slug/postuler"
              element={
                <PageTransition>
                  <Candidature />
                </PageTransition>
              }
            />
            <Route
              path="/recrutement/:slug"
              element={
                <PageTransition>
                  <RecrutementDetail />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
        <Footer />
      </>
    </ThemeProvider>
  );
}

export default App;
