import { AnimatePresence, motion, type Variants } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { products } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const phoneNumber = '+21670131500';
const salesEmail = 'commercial@soquibat.com.tn';
const regions = ['Tunis', 'Ariana', 'Sousse', 'Sfax'];
const tabNames = ['Spécifications', 'Fiches Techniques', 'Applications'] as const;
type DetailTab = (typeof tabNames)[number];

type QuoteDetails = {
  company: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const emptyQuote: QuoteDetails = { company: '', name: '', email: '', phone: '', notes: '' };
const entranceVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0], staggerChildren: 0.12 },
  },
};
const entranceItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] } },
};

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const reduceMotion = usePrefersReducedMotion();
  const [tab, setTab] = useState<DetailTab>('Spécifications');
  const [showDiagram, setShowDiagram] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [length, setLength] = useState('standard');
  const [finish, setFinish] = useState('À préciser');
  const [region, setRegion] = useState(regions[0]);
  const [quote, setQuote] = useState(emptyQuote);

  if (!product) {
    return (
      <section className="product-detail min-h-[65vh] px-6 pb-24 pt-36 lg:px-12">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-sm uppercase tracking-[0.18em] text-orange">Catalogue SOQUIBAT</p>
          <h1 className="mt-3 text-4xl">Produit introuvable</h1>
          <p className="mt-4 text-slate-600">Ce produit n’est pas disponible dans le catalogue affiché.</p>
          <Link className="mt-8 inline-flex font-semibold text-orange underline underline-offset-4" to="/produits">
            Revenir aux produits
          </Link>
        </div>
      </section>
    );
  }

  const selectedProduct = product;
  const relatedProducts = products.filter((item) => item.slug !== selectedProduct.slug).slice(0, 4);
  function updateQuote(field: keyof QuoteDetails, value: string) {
    setQuote((current) => ({ ...current, [field]: value }));
  }

  function sendQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = [
      `Bonjour, je souhaite recevoir un devis pour ${selectedProduct.name}.`,
      `Quantité estimée : ${quantity} tonne(s).`,
      `Longueur : ${length === 'standard' ? 'Standard' : 'Découpe sur mesure'}.`,
      `Finition : ${finish}.`,
      `Comptoir souhaité : ${region}.`,
      `Société : ${quote.company}`,
      `Nom : ${quote.name}`,
      `E-mail : ${quote.email}`,
      `Téléphone : ${quote.phone}`,
      `Détails du besoin : ${quote.notes}`,
    ].join('\n');
    window.location.href = `mailto:${salesEmail}?subject=${encodeURIComponent(`Demande de devis — ${selectedProduct.name}`)}&body=${encodeURIComponent(body)}`;
    setQuoteOpen(false);
  }

  return (
    <div className="product-detail pb-20">
      <div className="product-detail-page-surface border-b border-slate-200 bg-white px-6 pb-5 pt-28 dark:bg-black lg:px-12 lg:pt-32">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-xs text-slate-500 sm:text-sm">
            <Link to="/" className="hover:text-orange">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/produits" className="hover:text-orange">Nos produits</Link>
            <span aria-hidden="true">/</span>
            <span className="font-medium text-slate-800" aria-current="page">{selectedProduct.name}</span>
          </nav>
          <a href={`tel:${phoneNumber}`} className="hidden items-center gap-2 text-sm font-semibold text-[#17324d] sm:inline-flex">
            <PhoneIcon />
            +216 70 131 500
          </a>
        </div>
      </div>

      <div className="product-detail-page-surface sticky top-[68px] z-30 border-b border-slate-200 bg-white/95 px-6 py-3 shadow-sm backdrop-blur dark:bg-black/95 lg:top-[76px] lg:px-12">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3">
          <span className="hidden min-w-0 truncate font-semibold text-[#17324d] sm:block">{selectedProduct.name}</span>
          <div className="ml-auto flex items-center gap-2 sm:ml-0">
            <button
              type="button"
              onClick={() => {
                setTab('Fiches Techniques');
                window.setTimeout(() => document.getElementById('product-tab-panel')?.scrollIntoView({ behavior: 'smooth' }), 0);
              }}
              className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#17324d] sm:inline-flex"
            >
              <DownloadIcon /> Fiche technique
            </button>
            <a href={`tel:${phoneNumber}`} className="hidden items-center gap-2 rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-[#17324d] md:inline-flex">
              <PhoneIcon /> +216 70 131 500
            </a>
            <button
              type="button"
              onClick={() => setQuoteOpen(true)}
              className="rounded-lg bg-orange px-4 py-2.5 text-xs font-bold text-white transition hover:bg-orange-dark sm:text-sm"
            >
              Demander un devis
            </button>
          </div>
        </div>
      </div>

      <div>
        <section className="px-6 py-8 lg:px-12 lg:py-12">
          <motion.div
            className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:gap-12"
            variants={entranceVariants}
            initial={reduceMotion ? false : 'hidden'}
            animate="visible"
          >
            <motion.div variants={entranceItemVariants}>
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5">
                <AnimatePresence mode="wait">
                  {showDiagram ? (
                    <motion.div
                      key="diagram"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3 }}
                      className="w-full"
                    >
                      <CrossSectionDiagram />
                      <p className="mt-4 text-center text-xs font-medium text-slate-500">Illustration indicative — dimensions à confirmer selon référence.</p>
                    </motion.div>
                  ) : (
                    <motion.img
                      key={selectedProduct.image}
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="max-h-[510px] w-full cursor-zoom-in object-contain transition-transform duration-300"
                      style={{ scale: zoomed ? 1.35 : 1 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.35 }}
                      onClick={() => setZoomed((value) => !value)}
                      title="Cliquer pour agrandir ou réduire"
                    />
                  )}
                </AnimatePresence>

                <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#17324d] px-3 py-1.5 text-[11px] font-bold tracking-wide text-white">CATALOGUE SOQUIBAT</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[11px] font-bold text-emerald-800">Disponibilité à confirmer</span>
                </div>
                <button
                  type="button"
                  onClick={() => { setShowDiagram((value) => !value); setZoomed(false); }}
                  className="absolute bottom-4 left-4 rounded-lg border border-slate-300 bg-white/95 px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:border-[#17324d]"
                  aria-pressed={showDiagram}
                >
                  {showDiagram ? 'Voir la photo' : 'Vue technique indicative'}
                </button>
                {!showDiagram && (
                  <button
                    type="button"
                    aria-label={zoomed ? 'Réduire l’image' : 'Agrandir l’image'}
                    aria-pressed={zoomed}
                    onClick={() => setZoomed((value) => !value)}
                    className="absolute bottom-4 right-4 grid h-10 w-10 place-items-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm hover:border-[#17324d]"
                  >
                    <ZoomIcon />
                  </button>
                )}
              </div>
              <div className="mt-3 flex gap-2" aria-label="Vues produit">
                <button
                  type="button"
                  onClick={() => { setShowDiagram(false); setZoomed(false); }}
                  className={`aspect-square h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 ${!showDiagram ? 'border-orange' : 'border-slate-200'}`}
                  aria-label="Afficher la photo produit"
                  aria-pressed={!showDiagram}
                >
                  <img src={selectedProduct.image} alt="" className="h-full w-full rounded-md object-cover" />
                </button>
                <button
                  type="button"
                  onClick={() => { setShowDiagram(true); setZoomed(false); }}
                  className={`grid aspect-square h-16 w-16 shrink-0 place-items-center rounded-lg border-2 bg-white ${showDiagram ? 'border-orange' : 'border-slate-200'}`}
                  aria-label="Afficher la vue technique indicative"
                  aria-pressed={showDiagram}
                >
                  <CrossSectionDiagram compact />
                </button>
                <span className="self-center text-xs text-slate-500">Photo produit · Schéma indicatif</span>
              </div>
            </motion.div>

            <motion.div className="flex flex-col" variants={entranceItemVariants}>
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-orange">
                <span className="h-px w-7 bg-orange" /> Produits métallurgiques
              </div>
              <h1 className="font-display text-4xl leading-tight text-[#142d45] sm:text-5xl">{selectedProduct.name}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                Découvrez notre gamme de {selectedProduct.name.toLowerCase()}, sélectionnée pour répondre aux besoins des professionnels, entreprises et projets de construction. Les caractéristiques et références disponibles sont confirmées par notre équipe commerciale selon votre cahier des charges.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Nuance selon référence', 'Longueur à préciser', 'Finition selon besoin'].map((label) => (
                  <span key={label} className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600">{label}</span>
                ))}
              </div>

              <form
                className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_35px_rgba(15,23,42,0.06)] sm:p-6"
                onSubmit={(event) => { event.preventDefault(); setQuoteOpen(true); }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl text-[#17324d]">Préparer une demande</h2>
                    <p className="mt-1 text-sm text-slate-500">Indiquez les grandes lignes, nous confirmerons les détails.</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-orange/10 text-orange"><QuoteIcon /></span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-semibold text-slate-600">
                    Quantité estimée (tonnes)
                    <input
                      type="number"
                      min="0.1"
                      step="0.1"
                      required
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                      className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-orange focus:ring-2 focus:ring-orange/20"
                    />
                  </label>
                  <label className="text-xs font-semibold text-slate-600">
                    Longueur / découpe
                    <select value={length} onChange={(event) => setLength(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-orange">
                      <option value="standard">Longueur standard</option>
                      <option value="custom">Découpe sur mesure à préciser</option>
                    </select>
                  </label>
                  <label className="text-xs font-semibold text-slate-600">
                    Finition souhaitée
                    <select value={finish} onChange={(event) => setFinish(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-orange">
                      <option>À préciser</option>
                      <option>Brut</option>
                      <option>Galvanisé, si disponible</option>
                    </select>
                  </label>
                  <label className="text-xs font-semibold text-slate-600">
                    Comptoir souhaité
                    <select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-orange">
                      {regions.map((name) => <option key={name}>{name}</option>)}
                    </select>
                  </label>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-500">Le stock, les dimensions disponibles et les finitions sont confirmés par le comptoir avant validation.</p>
                <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <button type="submit" className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-orange px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-dark">
                    <QuoteIcon /> Ajouter au devis
                  </button>
                  <a href={`tel:${phoneNumber}`} className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-5 py-3.5 text-sm font-bold text-[#17324d] transition hover:border-[#17324d]">
                    <PhoneIcon /> Contacter un commercial
                  </a>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </section>

        <section className="product-detail-page-surface border-y border-slate-200 bg-white px-6 py-14 dark:bg-black lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Informations produit</p>
              <h2 className="mt-2 font-display text-3xl text-[#17324d] sm:text-4xl">Données techniques & services</h2>
            </div>
            <div className="mt-8 flex gap-2 overflow-x-auto border-b border-slate-200" role="tablist" aria-label="Informations produit">
              {tabNames.map((name) => (
                <button
                  key={name}
                  id={`tab-${name}`}
                  type="button"
                  role="tab"
                  aria-selected={tab === name}
                  aria-controls="product-tab-panel"
                  onClick={() => setTab(name)}
                  className={`relative shrink-0 px-4 py-3 text-sm font-semibold transition ${tab === name ? 'text-[#17324d]' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  {name}
                  {tab === name && <motion.span layoutId="activeTab" className="absolute inset-x-0 bottom-0 h-0.5 bg-orange" />}
                </button>
              ))}
            </div>
            <div id="product-tab-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="min-h-[290px] py-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.2 }}
                >
                  {tab === 'Spécifications' && <Specifications productName={selectedProduct.name} reduceMotion={reduceMotion} />}
                  {tab === 'Applications' && <Applications productName={selectedProduct.name} />}
                  {tab === 'Fiches Techniques' && (
                    <div className="space-y-7">
                      <Standards />
                      <Documents onRequest={() => setQuoteOpen(true)} />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">L’accompagnement SOQUIBAT</p>
            <h2 className="mt-2 font-display text-3xl text-[#17324d] sm:text-4xl">Un partenaire à chaque étape</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <ServiceCard icon={<CutIcon />} title="Découpe sur mesure" copy="Étudions ensemble les besoins de coupe et de préparation de votre commande." />
              <ServiceCard icon={<DeliveryIcon />} title="Livraison chantier" copy="Parlez-nous de votre chantier et de vos contraintes de livraison." />
              <ServiceCard icon={<SupportIcon />} title="Conseil technique dédié" copy="Notre équipe commerciale vous accompagne pour identifier les références adaptées." />
            </div>
          </div>
        </section>

        <section className="product-detail-page-surface border-y border-slate-200 bg-white px-6 py-14 dark:bg-black lg:px-12 lg:py-20">
          <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Réseau SOQUIBAT</p>
              <h2 className="mt-2 font-display text-3xl text-[#17324d] sm:text-4xl">Disponibilité à proximité</h2>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate-600">Le groupe dispose de plus de 15 comptoirs. Choisissez une zone indicative pour transmettre votre demande ; le stock et le délai sont confirmés directement par l’équipe du comptoir.</p>
              <label className="mt-5 block max-w-sm text-xs font-semibold text-slate-600">
                Zone souhaitée
                <select value={region} onChange={(event) => setRegion(event.target.value)} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm text-slate-900 outline-none focus:border-orange">
                  {regions.map((name) => <option key={name}>{name}</option>)}
                </select>
              </label>
              <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-[#17324d]"><span className="h-2.5 w-2.5 rounded-full bg-orange" /> {region} — disponibilité à confirmer</p>
            </div>
            <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-[#e9eef2] p-5 sm:min-h-[350px]">
              <TunisiaNetwork />
              <div className="absolute bottom-4 left-4 rounded-lg bg-white/95 px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm">
                Réseau national · stocks sur demande
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-14 lg:px-12 lg:py-20">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Compléter votre sélection</p>
                <h2 className="mt-2 font-display text-3xl text-[#17324d] sm:text-4xl">Produits associés</h2>
              </div>
              <Link to="/produits" className="text-sm font-bold text-[#17324d] underline decoration-orange underline-offset-4">Tout le catalogue</Link>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <Link key={item.slug} to={`/produits/${encodeURIComponent(item.slug)}`} className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="aspect-square overflow-hidden rounded-t-xl bg-white">
                    <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">
                    <span className="font-display text-lg text-[#17324d]">{item.name}</span>
                    <span aria-hidden="true" className="text-orange">↗</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="product-detail-page-surface bg-[#17324d] px-6 py-12 text-white dark:bg-black lg:px-12 lg:py-16">
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Parlons de votre projet</p>
              <h2 className="mt-2 max-w-3xl font-display text-3xl leading-tight sm:text-4xl">Un projet spécifique ? Nos équipes vous accompagnent.</h2>
              <p className="mt-3 text-sm text-white/70">Un interlocuteur commercial pour préciser les références, quantités et délais.</p>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={`https://wa.me/${phoneNumber.replace('+', '')}`} target="_blank" rel="noreferrer" className="rounded-lg bg-[#20a464] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#188451]">WhatsApp</a>
              <a href={`tel:${phoneNumber}`} className="rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white transition hover:border-white"><PhoneIcon /> +216 70 131 500</a>
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur sm:hidden">
        <button type="button" onClick={() => setQuoteOpen(true)} className="w-full rounded-lg bg-orange px-4 py-3 text-sm font-bold text-white">
          Demander un devis · {selectedProduct.name}
        </button>
      </div>

      <AnimatePresence>
        {quoteOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Fermer la demande de devis"
              className="fixed inset-0 z-[60] cursor-default bg-slate-950/55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuoteOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-labelledby="quote-title"
              className="fixed inset-y-0 right-0 z-[61] w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl sm:p-8"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange">Demande commerciale</p>
                  <h2 id="quote-title" className="mt-2 font-display text-3xl text-[#17324d]">Ajouter au devis</h2>
                  <p className="mt-2 text-sm text-slate-600">{selectedProduct.name} · {quantity} tonne(s) · {region}</p>
                </div>
                <button type="button" onClick={() => setQuoteOpen(false)} aria-label="Fermer" className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50">×</button>
              </div>
              <form className="mt-8 space-y-4" onSubmit={sendQuote}>
                <label className="block text-xs font-semibold text-slate-600">Société
                  <input value={quote.company} onChange={(event) => updateQuote('company', event.target.value)} required className="quote-input" autoComplete="organization" />
                </label>
                <label className="block text-xs font-semibold text-slate-600">Nom et prénom
                  <input value={quote.name} onChange={(event) => updateQuote('name', event.target.value)} required className="quote-input" autoComplete="name" />
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-semibold text-slate-600">E-mail
                    <input type="email" value={quote.email} onChange={(event) => updateQuote('email', event.target.value)} required className="quote-input" autoComplete="email" />
                  </label>
                  <label className="block text-xs font-semibold text-slate-600">Téléphone
                    <input type="tel" value={quote.phone} onChange={(event) => updateQuote('phone', event.target.value)} required className="quote-input" autoComplete="tel" />
                  </label>
                </div>
                <label className="block text-xs font-semibold text-slate-600">Précisions sur votre besoin
                  <textarea value={quote.notes} onChange={(event) => updateQuote('notes', event.target.value)} rows={4} className="quote-input resize-y" placeholder="Référence, nuance, dimensions, délai souhaité…" />
                </label>
                <p className="text-xs leading-relaxed text-slate-500">Votre application e-mail s’ouvrira avec les informations saisies pour transmettre votre demande à l’équipe SOQUIBAT.</p>
                <button type="submit" className="w-full rounded-lg bg-orange px-5 py-3.5 text-sm font-bold text-white transition hover:bg-orange-dark">Continuer par e-mail</button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function Specifications({ productName, reduceMotion }: { productName: string; reduceMotion: boolean }) {
  const rows = [
    { label: 'Produit', value: productName, detail: 'Référence sélectionnée dans le catalogue SOQUIBAT.' },
    { label: 'Dimensions et sections', value: 'À confirmer selon référence', detail: 'Les dimensions exactes dépendent de la référence et sont à valider auprès de l’équipe commerciale.' },
    { label: 'Poids unitaire / linéaire', value: 'À confirmer selon référence', detail: 'Une valeur vérifiée peut être fournie avec la fiche technique correspondant au produit retenu.' },
    { label: 'Nuance / matière', value: 'À définir selon le cahier des charges', detail: 'Précisez les exigences de votre projet afin que la nuance disponible soit confirmée.' },
    { label: 'Longueurs disponibles', value: 'À confirmer auprès du comptoir', detail: 'Les longueurs standard et les possibilités de découpe dépendent du stock et de la référence.' },
    { label: 'Finition', value: 'Selon références disponibles', detail: 'Demandez confirmation de la finition proposée pour la référence sélectionnée.' },
  ];
  const [expanded, setExpanded] = useState<number | null>(null);
  return (
    <div className="max-w-4xl overflow-hidden rounded-xl border border-slate-200">
      <p className="border-b border-slate-200 px-5 py-4 text-xs leading-relaxed text-slate-500">Les données exactes varient selon la référence et le lot. Ouvrez une caractéristique pour voir les détails à confirmer.</p>
      <div>
        {rows.map(({ label, value, detail }, index) => {
          const isExpanded = expanded === index;
          const panelId = `product-spec-${index}`;
          return (
            <div key={label} className="border-b border-slate-200 last:border-b-0">
              <button
                type="button"
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => setExpanded(isExpanded ? null : index)}
                className={`flex w-full items-center justify-between gap-6 px-5 py-4 text-left transition hover:bg-slate-50 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
              >
                <span>
                  <span className="block text-sm font-semibold text-[#17324d]">{label}</span>
                  <span className="mt-1 block text-sm text-slate-600">{value}</span>
                </span>
                <span aria-hidden="true" className="text-lg text-orange">{isExpanded ? '−' : '+'}</span>
              </button>
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-sm leading-relaxed text-slate-500">{detail}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Applications({ productName }: { productName: string }) {
  const examples = [
    'Approvisionnement de chantiers de construction et de rénovation',
    'Projets industriels et ouvrages nécessitant des produits métallurgiques',
    'Sélection de références selon les plans et contraintes du projet',
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
      <div>
        <h3 className="font-display text-2xl text-[#17324d]">Usages à étudier selon le projet</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">Les produits de la gamme {productName.toLowerCase()} peuvent répondre à différents besoins professionnels. La compatibilité et le dimensionnement doivent être validés par le bureau d’études ou le prescripteur du projet.</p>
        <ul className="mt-5 space-y-3">
          {examples.map((text) => <li key={text} className="flex gap-3 text-sm text-slate-700"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-orange" />{text}</li>)}
        </ul>
      </div>
      <div className="rounded-xl border border-orange/20 bg-orange/5 p-5">
        <h3 className="font-semibold text-[#17324d]">Besoin d’une validation technique ?</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">Transmettez vos plans, références ou contraintes à notre équipe commerciale pour être orienté vers les caractéristiques adaptées.</p>
      </div>
    </div>
  );
}

function Standards() {
  return (
    <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6">
      <h3 className="font-display text-2xl text-[#17324d]">Conformité selon référence</h3>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">Les normes, certificats qualité et documents de conformité dépendent du produit et du lot sélectionnés. Aucune certification particulière n’est présumée sur cette page : demandez les documents associés à votre référence avant commande.</p>
      <p className="mt-4 text-sm font-semibold text-[#17324d]">Besoin d’un certificat ou d’une norme précise ? Mentionnez-la dans votre demande de devis.</p>
    </div>
  );
}

function Documents({ onRequest }: { onRequest: () => void }) {
  return (
    <div id="documents" className="grid gap-4 md:grid-cols-3">
      {[
        ['Fiche technique', 'Disponible sur demande selon la référence sélectionnée.'],
        ['Document qualité', 'À demander avec les informations du produit et du lot.'],
        ['Informations sécurité', 'Transmises par l’équipe selon la nature du produit.'],
      ].map(([title, copy]) => (
        <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#17324d]/5 text-[#17324d]"><DownloadIcon /></div>
          <h3 className="mt-4 font-display text-xl text-[#17324d]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
          <button type="button" onClick={onRequest} className="mt-4 text-sm font-bold text-orange underline underline-offset-4">Demander le document</button>
        </div>
      ))}
    </div>
  );
}

function ServiceCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-orange/10 text-orange">{icon}</div>
      <h3 className="mt-4 font-display text-xl text-[#17324d]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{copy}</p>
    </div>
  );
}

function CrossSectionDiagram({ compact = false }: { compact?: boolean }) {
  return (
    <svg viewBox="0 0 440 260" role="img" aria-label="Schéma technique indicatif" className={compact ? 'h-10 w-14' : 'mx-auto h-auto max-h-[360px] w-full'}>
      <defs>
        <pattern id="cad-grid" width="18" height="18" patternUnits="userSpaceOnUse">
          <path d="M 18 0 L 0 0 0 18" fill="none" stroke="#363a40" strokeWidth="1" />
        </pattern>
      </defs>
          <rect width="440" height="260" rx="16" fill="#17181b" />
      <rect width="440" height="260" rx="16" fill="url(#cad-grid)" />
          <g fill="#30363d" stroke="#d4d8de" strokeWidth="4" strokeLinejoin="round">
        <path d="M128 54h184v30H236v122h76v30H128v-30h76V84h-76z" />
      </g>
      <g stroke="#f47b20" strokeWidth="2" fill="none">
        <path d="M128 35h184M128 29v12M312 29v12" />
        <path d="M330 54v182M324 54h12M324 236h12" />
      </g>
      {!compact && (
        <g fill="#b7bdc5" fontFamily="Inter, sans-serif" fontSize="12">
          <text x="204" y="25" textAnchor="middle">Dimension indicative</text>
          <text x="342" y="150" transform="rotate(90 342 150)" textAnchor="middle">Section schématique</text>
        </g>
      )}
    </svg>
  );
}

function TunisiaNetwork() {
  return (
    <svg viewBox="0 0 600 320" role="img" aria-label="Schéma du réseau de comptoirs SOQUIBAT en Tunisie" className="absolute inset-0 h-full w-full">
      <path d="M280 20 317 31 327 55 354 67 344 93 369 111 357 135 371 159 351 180 358 209 330 230 332 258 304 281 283 276 266 298 246 281 233 262 220 242 205 225 210 203 198 184 215 161 205 143 218 126 208 108 225 92 218 74 236 59 235 43 259 35Z" fill="#282b30" stroke="#737b85" strokeWidth="2" />
      <path d="m250 68 37 14M238 116l60 18M226 163l82 19M237 213l66 20" stroke="#4e555e" strokeWidth="1.5" strokeDasharray="4 5" />
      {[
        { x: 270, y: 74, label: 'Tunis' },
        { x: 258, y: 91, label: 'Ariana' },
        { x: 326, y: 156, label: 'Sousse' },
        { x: 287, y: 234, label: 'Sfax' },
      ].map((point) => (
        <g key={point.label}>
          <circle cx={point.x} cy={point.y} r="7" fill="#f47b20" stroke="white" strokeWidth="3" />
          <text x={point.x + 13} y={point.y + 4} fill="#f5f4f1" fontFamily="Inter, sans-serif" fontSize="12" fontWeight="600">{point.label}</text>
        </g>
      ))}
      <text x="24" y="290" fill="#aeb4bc" fontFamily="Inter, sans-serif" fontSize="11">Repères de sélection — stock confirmé par le comptoir</text>
    </svg>
  );
}

function PhoneIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-8-8l2-2-2-5Z" strokeLinejoin="round" /></svg>;
}

function DownloadIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v3h16v-3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ZoomIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5M10.5 7v7m-3.5-3.5h7" strokeLinecap="round" /></svg>;
}

function QuoteIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v12H8l-4 3V5Z" strokeLinejoin="round" /><path d="M8 9h8M8 13h5" strokeLinecap="round" /></svg>;
}

function CutIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="m8.2 8.2 11.6 11.6M8.2 15.8 20 4M14 6l2-2" strokeLinecap="round" /></svg>;
}

function DeliveryIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M3 6h11v11H3zM14 10h4l3 3v4h-7z" strokeLinejoin="round" /><circle cx="7.5" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>;
}

function SupportIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M4 13v-2a8 8 0 0 1 16 0v2M4 13H3v4h4v-5H4Zm16 0h1v4h-4v-5h3ZM12 21h3" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}
