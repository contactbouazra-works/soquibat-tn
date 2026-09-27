import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { contact, careers } from '../data/soquibat';
import { formatFrenchDate, toDateTime } from '../lib/dates';
import { normalizeSlug } from '../lib/slug';

export function Recrutement() {
  const [query, setQuery] = useState('');
  const [department, setDepartment] = useState('Tous');
  const [contractType, setContractType] = useState('Tous');
  const [location, setLocation] = useState('Tous');
  const departments = [...new Set(careers.map((job) => job.department))];
  const contractTypes = [...new Set(careers.map((job) => job.contractType))];
  const locations = [...new Set(careers.map((job) => job.location))];

  const matchingJobs = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('fr');
    return careers.filter((job) => (
      (!normalizedQuery || `${job.roleTitle} ${job.department}`.toLocaleLowerCase('fr').includes(normalizedQuery))
      && (department === 'Tous' || job.department === department)
      && (contractType === 'Tous' || job.contractType === contractType)
      && (location === 'Tous' || job.location === location)
    ));
  }, [contractType, department, location, query]);

  return (
    <>
      <Seo
        title="Recrutement | Rejoignez SOQUIBAT Group"
        description="Consultez les publications de recrutement de SOQUIBAT Group et contactez notre équipe pour connaître les opportunités actuellement ouvertes."
        path="/recrutement"
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <section className="relative overflow-hidden rounded-3xl border border-line bg-ink-soft px-6 py-12 sm:px-10 sm:py-16 lg:px-16">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
            <div className="relative max-w-3xl">
              <p className="font-display text-xs uppercase tracking-[0.2em] text-orange sm:text-sm">Carrières</p>
              <h1 className="mt-4 font-display text-4xl uppercase leading-tight sm:text-5xl lg:text-6xl">
                Rejoignez SOQUIBAT Group
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-paper/70 sm:text-lg">
                Retrouvez les publications de recrutement du groupe. Les annonces affichées ci-dessous sont des archives ; leur disponibilité actuelle n’est pas confirmée.
              </p>
            </div>
          </section>

          <section className="mt-14" aria-labelledby="offers-title">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">Opportunités</p>
                <h2 id="offers-title" className="mt-2 font-display text-3xl uppercase sm:text-4xl">
                  Publications de recrutement
                </h2>
              </div>
              <a
                href={`mailto:${contact.email}?subject=${encodeURIComponent('Demande concernant les opportunités de recrutement')}`}
                className="font-display text-sm uppercase tracking-wide text-orange underline underline-offset-4 hover:text-orange-dark"
              >
                Demander les offres actuelles
              </a>
            </div>

            <p className="mt-5 rounded-xl border border-orange/30 bg-ink-soft px-4 py-3 text-sm leading-relaxed text-paper/70">
              Les annonces visibles sont des archives publiées en 2023 ; aucune offre active n’est confirmée ici. Contactez-nous pour connaître les recrutements en cours.
            </p>

            <div className="mt-7 grid gap-4 rounded-2xl border border-line bg-ink-soft p-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="text-sm text-paper/70">
                Rechercher
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Intitulé du poste"
                  className="mt-2 h-11 w-full rounded-lg border border-line bg-ink px-3 text-paper placeholder:text-paper/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
                />
              </label>
              <FilterSelect label="Service" value={department} onChange={setDepartment} options={departments} />
              <FilterSelect label="Type de contrat" value={contractType} onChange={setContractType} options={contractTypes} />
              <FilterSelect label="Lieu" value={location} onChange={setLocation} options={locations} />
            </div>

            {matchingJobs.length > 0 ? (
              <ul className="mt-7 grid gap-5 lg:grid-cols-2">
                {matchingJobs.map((job, index) => (
                  <motion.li
                    key={job.slug}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.04 }}
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-ink-soft sm:flex-row">
                      <img
                        src={job.image}
                        alt=""
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover sm:aspect-auto sm:w-44"
                      />
                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="rounded-full border border-orange/40 px-3 py-1 text-xs text-orange">
                            {job.department}
                          </span>
                          <span className="rounded-full border border-line px-3 py-1 text-xs text-paper/60">Archive</span>
                        </div>
                        <h3 className="mt-4 font-display text-xl uppercase">{job.roleTitle}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-paper/70">{job.excerpt}</p>
                        <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-paper/60">
                          <div><dt className="sr-only">Contrat</dt><dd>{job.contractType}</dd></div>
                          <div><dt className="sr-only">Lieu</dt><dd>{job.location}</dd></div>
                          <div>
                            <dt className="sr-only">Date de publication</dt>
                            <dd><time dateTime={toDateTime(job.date)}>{formatFrenchDate(job.date)}</time></dd>
                          </div>
                        </dl>
                        <Link
                          to={`/recrutement/${encodeURIComponent(job.slug)}`}
                          className="mt-5 inline-flex items-center gap-2 self-start font-display text-sm uppercase tracking-wide text-orange hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
                        >
                          Voir l’archive <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </article>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="mt-7 rounded-xl border border-line p-6 text-paper/70">
                Aucun résultat pour ces filtres. Essayez d’autres critères ou contactez-nous pour connaître les postes actuellement ouverts.
              </p>
            )}
          </section>

          <section className="mt-16 rounded-2xl border border-orange/30 bg-ink-soft p-6 sm:p-8" aria-labelledby="spontaneous-application">
            <h2 id="spontaneous-application" className="font-display text-2xl uppercase sm:text-3xl">
              Candidature spontanée
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-paper/70">
              Vous souhaitez rejoindre SOQUIBAT Group ? Contactez notre équipe pour vous renseigner sur les opportunités en cours.
            </p>
            <a
              href={`mailto:${contact.email}?subject=${encodeURIComponent('Candidature spontanée')}`}
              className="mt-5 inline-flex rounded-md bg-orange px-5 py-3 font-semibold text-slate-950 transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
            >
              Écrire à {contact.email}
            </a>
          </section>
        </div>
      </main>
    </>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="text-sm text-paper/70">
      {label}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 h-11 w-full rounded-lg border border-line bg-ink px-3 text-paper focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
      >
        <option value="Tous">Tous</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}

export function RecrutementDetail() {
  const { slug = '' } = useParams();
  const job = careers.find((item) => normalizeSlug(item.slug) === normalizeSlug(slug));

  if (!job) {
    return (
      <>
        <Seo
          title="Offre introuvable | SOQUIBAT Group"
          description="Cette publication de recrutement n’est pas disponible."
          path={`/recrutement/${encodeURIComponent(slug)}`}
          noindex
        />
        <main className="min-h-[65vh] bg-ink px-6 pb-24 pt-36 text-paper lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-display text-4xl uppercase">Publication introuvable</h1>
            <Link to="/recrutement" className="mt-8 inline-flex text-orange underline underline-offset-4">
              Revenir au recrutement
            </Link>
          </div>
        </main>
      </>
    );
  }

  const canonicalPath = `/recrutement/${encodeURIComponent(job.slug)}`;
  return (
    <>
      <Seo
        title={`${job.roleTitle} | Recrutement SOQUIBAT Group`}
        description={`${job.excerpt} Publication du ${formatFrenchDate(job.date)}. Consultez les détails et contactez SOQUIBAT Group.`}
        path={canonicalPath}
        image={job.image}
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-[1200px]">
          <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-paper/55">
            <Link to="/" className="hover:text-orange">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/recrutement" className="hover:text-orange">Recrutement</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-paper/80">{job.roleTitle}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article>
              <span className="inline-flex rounded-full border border-orange/40 px-3 py-1 font-display text-xs uppercase tracking-[0.12em] text-orange">
                Publication archivée — disponibilité non confirmée
              </span>
              <h1 className="mt-5 font-display text-3xl uppercase leading-tight sm:text-4xl lg:text-5xl">{job.roleTitle}</h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-paper/70">{job.excerpt}</p>

              <dl className="mt-8 grid gap-4 rounded-2xl border border-line bg-ink-soft p-5 sm:grid-cols-2 lg:grid-cols-3">
                <JobFact label="Service" value={job.department} />
                <JobFact label="Type de contrat" value={job.contractType} />
                <JobFact label="Lieu" value={job.location} />
                <JobFact label="Publication" value={formatFrenchDate(job.date)} />
                <JobFact label="Disponibilité" value="Poste non confirmé comme ouvert" />
              </dl>

              <DetailList title="Missions principales" items={job.responsibilities} />
              <DetailList title="Profil recherché" items={job.profile} />
              {job.skills.length > 0 ? (
                <DetailList title="Compétences mentionnées" items={job.skills} />
              ) : (
                <section className="mt-9">
                  <h2 className="font-display text-2xl uppercase">Compétences exigées</h2>
                  <p className="mt-3 text-paper/65">Les compétences détaillées ne sont pas précisées dans cette publication archivée.</p>
                </section>
              )}
            </article>

            <aside className="h-fit rounded-2xl border border-line bg-ink-soft p-5 lg:sticky lg:top-28">
              <p className="font-display text-lg uppercase">Cette annonce date de 2023</p>
              <p className="mt-3 text-sm leading-relaxed text-paper/70">
                Nous ne pouvons pas confirmer que le poste est toujours disponible. Contactez-nous avant de préparer une candidature pour cette offre.
              </p>
              <Link
                to={`/recrutement/${encodeURIComponent(job.slug)}/postuler`}
                className="mt-5 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-orange px-4 py-3 text-center text-sm font-semibold text-slate-950 hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                Vérifier et postuler
              </Link>
              <Link to="/recrutement" className="mt-4 inline-flex text-sm text-orange underline underline-offset-4">
                Toutes les publications
              </Link>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function JobFact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-paper/50">{label}</dt>
      <dd className="mt-1 font-medium text-paper">{value}</dd>
    </div>
  );
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="mt-9">
      <h2 className="font-display text-2xl uppercase">{title}</h2>
      {items.length > 0 ? (
        <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-paper/75">
          {items.map((item) => <li key={item}>{item}</li>)}
        </ul>
      ) : (
        <p className="mt-3 text-paper/65">Ces éléments détaillés ne sont pas précisés dans la publication archivée.</p>
      )}
    </section>
  );
}
