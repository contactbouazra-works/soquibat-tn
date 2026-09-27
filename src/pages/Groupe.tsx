import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { Seo } from '../components/Seo';
import { StatCounter } from '../components/StatCounter';
import { company, products, stats } from '../data/soquibat';
import groupImage from '../assets/img/hero-1.jpg';

const groupPillars = [
  {
    number: '01',
    title: 'Comprendre',
    description: 'Comprendre les besoins de nos clients et partenaires pour proposer des réponses adaptées.',
  },
  {
    number: '02',
    title: 'Accompagner',
    description: 'Mettre notre expérience et notre conseil au service des projets, avec réactivité et disponibilité.',
  },
  {
    number: '03',
    title: 'Innover',
    description: 'Faire évoluer nos solutions et nos méthodes avec modernité, fiabilité et innovation.',
  },
];

export function Groupe() {
  return (
    <>
      <Seo
        title="Le Groupe SOQUIBAT | Notre histoire et nos engagements"
        description="Fondé en 1983, SOQUIBAT Group est un acteur tunisien de la fabrication, de la commercialisation et de la transformation des produits métalliques."
        path="/groupe"
        image={groupImage}
      />
      <main className="min-h-screen bg-ink text-paper">
        <section className="px-6 pb-20 pt-36 lg:px-12 lg:pb-28 lg:pt-44">
          <div className="mx-auto max-w-[1400px]">
            <nav aria-label="Fil d’Ariane" className="mb-10 flex items-center gap-2 text-sm text-paper/55">
              <Link to="/" className="transition-colors hover:text-orange">Accueil</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-paper/80">Le Groupe</span>
            </nav>

            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.2em] text-orange sm:text-sm">
                  SOQUIBAT Group · Fondé en 1983
                </p>
                <h1 className="mt-5 font-display text-4xl uppercase leading-[0.98] sm:text-5xl lg:text-7xl">
                  Notre force est notre capital humain
                </h1>
                <p className="mt-7 max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">
                  Fondé en 1983, SOQUIBAT Group est un acteur majeur en Tunisie dans la fabrication, la commercialisation et la transformation des produits métalliques.
                </p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-paper/65 sm:text-base">
                  {company.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/produits"
                    className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                  >
                    Découvrir nos produits
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex min-h-12 items-center justify-center rounded-md border border-line px-5 py-3 font-semibold transition-colors hover:border-orange hover:text-orange focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative overflow-hidden rounded-2xl border border-line"
              >
                <img
                  src={groupImage}
                  alt="Site industriel du Groupe SOQUIBAT"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-white/10 dark:from-slate-950/80 dark:via-transparent dark:to-slate-950/10"
                />
                <span className="absolute bottom-5 left-5 font-display text-sm uppercase tracking-[0.16em] text-slate-900 dark:text-white">
                  Depuis 1983
                </span>
                <span className="absolute right-5 top-5 h-8 w-8 border-r-2 border-t-2 border-orange" aria-hidden="true" />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-y border-line bg-ink-soft px-6 py-20 lg:px-12 lg:py-24" aria-labelledby="groupe-chiffres">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-display text-xs uppercase tracking-[0.2em] text-orange">Notre parcours</p>
            <Reveal
              as="h2"
              id="groupe-chiffres"
              className="mt-3 font-display text-3xl uppercase sm:text-4xl"
            >
              SOQUIBAT en chiffres
            </Reveal>
            <p className="mt-4 max-w-2xl text-paper/65">
              Des capacités et une expérience au service des professionnels et des projets en Tunisie.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-9 md:grid-cols-3 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <Reveal key={stat.label} delay={index * 0.04} className="border-l border-orange/60 pl-4">
                  <StatCounter value={stat.value} suffix={stat.suffix} />
                  <p className="mt-2 max-w-48 text-sm leading-relaxed text-paper/60">{stat.label}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-12 lg:py-28" aria-labelledby="groupe-engagements">
          <div className="mx-auto max-w-[1400px]">
            <div className="max-w-3xl">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-orange">Notre engagement</p>
              <h2 id="groupe-engagements" className="mt-3 font-display text-3xl uppercase sm:text-4xl">
                Une relation à forte valeur ajoutée
              </h2>
              <p className="mt-5 text-base leading-relaxed text-paper/70 sm:text-lg">
                Le Groupe collabore étroitement avec ses clients et partenaires. Compréhension des besoins, force de proposition, conseil, réactivité, disponibilité, innovation, modernité et fiabilité guident cette relation.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {groupPillars.map((pillar, index) => (
                <Reveal key={pillar.number} delay={index * 0.08}>
                  <article className="h-full rounded-2xl border border-line bg-ink-soft p-6 transition-colors hover:border-orange/60 sm:p-8">
                    <span className="font-display text-sm text-orange">{pillar.number}</span>
                    <h3 className="mt-5 font-display text-2xl uppercase">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-paper/65">{pillar.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-line bg-ink-soft px-6 py-20 lg:px-12 lg:py-24" aria-labelledby="groupe-activites">
          <div className="mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.2em] text-orange">Nos métiers</p>
                <h2 id="groupe-activites" className="mt-3 font-display text-3xl uppercase sm:text-4xl">
                  Des solutions métalliques pour vos projets
                </h2>
              </div>
              <Link to="/produits" className="font-display text-sm uppercase tracking-wide text-orange underline underline-offset-4 hover:text-orange-dark">
                Tout le catalogue
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((product) => (
                <li key={product.slug}>
                  <Link
                    to={`/produits/${encodeURIComponent(product.slug)}`}
                    className="group flex h-full items-center justify-between gap-4 rounded-xl border border-line bg-ink px-5 py-4 transition-colors hover:border-orange/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                  >
                    <span className="font-display text-lg uppercase">{product.name}</span>
                    <span className="text-orange transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
