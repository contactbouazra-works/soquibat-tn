import { useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { careers, contact } from '../data/soquibat';
import { normalizeSlug } from '../lib/slug';

const MAX_CV_SIZE = 5 * 1024 * 1024;

export function Candidature() {
  const { slug = '' } = useParams();
  const job = careers.find((item) => normalizeSlug(item.slug) === normalizeSlug(slug));
  const [cv, setCv] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [mailNotice, setMailNotice] = useState('');

  if (!job) {
    return (
      <>
        <Seo
          title="Candidature indisponible | SOQUIBAT Group"
          description="Cette publication de recrutement n’est pas disponible."
          path={`/recrutement/${encodeURIComponent(slug)}/postuler`}
          noindex
        />
        <main className="min-h-[65vh] bg-ink px-6 pb-24 pt-36 text-paper lg:px-12">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-display text-4xl uppercase">Poste introuvable</h1>
            <Link to="/recrutement" className="mt-8 inline-flex text-orange underline underline-offset-4">
              Consulter les publications
            </Link>
          </div>
        </main>
      </>
    );
  }

  const handleFile = (file: File | undefined) => {
    setMailNotice('');
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'pdf' && extension !== 'docx') {
      setCv(null);
      setFileError('Choisissez un fichier PDF ou DOCX.');
      return;
    }
    if (file.size > MAX_CV_SIZE) {
      setCv(null);
      setFileError('Le fichier doit faire 5 Mo maximum.');
      return;
    }
    setCv(file);
    setFileError('');
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => handleFile(event.currentTarget.files?.[0]);
  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    handleFile(event.dataTransfer.files[0]);
  };

  const submitApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject = `Candidature - ${job.roleTitle}`;
    const body = [
      `Poste : ${job.roleTitle}`,
      `Nom : ${formData.get('fullName')}`,
      `Email : ${formData.get('email')}`,
      `Téléphone : ${formData.get('phone')}`,
      `Ville : ${formData.get('city')}`,
      '',
      'Lettre de motivation :',
      `${formData.get('coverLetter')}`,
      '',
      `CV sélectionné : ${cv?.name ?? 'non sélectionné'}`,
      'Veuillez joindre manuellement votre CV à cet e-mail avant de l’envoyer.',
    ].join('\n');

    setMailNotice('Votre logiciel de messagerie va préparer un brouillon. Le formulaire ne transmet ni le message ni le fichier : vérifiez l’adresse, joignez le CV au brouillon et envoyez-le vous-même.');
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Seo
        title={`Candidature ${job.roleTitle} | SOQUIBAT Group`}
        description={`Préparez une demande concernant l’ancienne annonce ${job.roleTitle} de SOQUIBAT Group. Vérifiez que le poste est toujours ouvert avant d’envoyer votre dossier.`}
        path={`/recrutement/${encodeURIComponent(job.slug)}/postuler`}
        noindex
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <nav aria-label="Fil d’Ariane" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-paper/55">
            <Link to="/" className="hover:text-orange">Accueil</Link>
            <span aria-hidden="true">/</span>
            <Link to="/recrutement" className="hover:text-orange">Recrutement</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/recrutement/${encodeURIComponent(job.slug)}`} className="hover:text-orange">{job.roleTitle}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-paper/80">Candidature</span>
          </nav>

          <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">Annonce archivée — disponibilité non confirmée</p>
          <h1 className="mt-3 font-display text-3xl uppercase sm:text-4xl">
            Candidature pour le poste de : {job.roleTitle}
          </h1>
          <p className="mt-4 leading-relaxed text-paper/70">
            Cette publication date de 2023. Contactez-nous pour vérifier que l’opportunité est toujours d’actualité avant de transmettre votre candidature.
          </p>

          <form onSubmit={submitApplication} className="mt-8 space-y-5 rounded-2xl border border-line bg-ink-soft p-5 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Nom complet" name="fullName" autoComplete="name" required />
              <FormField label="Adresse e-mail" name="email" type="email" autoComplete="email" required />
              <FormField label="Téléphone" name="phone" type="tel" autoComplete="tel" required />
              <FormField label="Ville" name="city" autoComplete="address-level2" required />
            </div>

            <label className="block text-sm text-paper/80">
              Lettre de motivation
              <textarea
                name="coverLetter"
                required
                rows={6}
                className="mt-2 w-full rounded-lg border border-line bg-ink px-3 py-2 text-paper placeholder:text-paper/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
                placeholder="Présentez brièvement votre parcours et votre intérêt pour ce poste."
              />
            </label>

            <div>
              <span className="block text-sm text-paper/80">CV (PDF ou DOCX, 5 Mo maximum)</span>
              <label
                htmlFor="cv-file"
                onDragOver={(event) => event.preventDefault()}
                onDrop={onDrop}
                className="mt-2 flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-line bg-ink px-5 py-6 text-center transition-colors hover:border-orange focus-within:border-orange"
              >
                <span className="font-display uppercase text-paper">{cv ? cv.name : 'Déposez votre CV ici ou cliquez pour choisir un fichier'}</span>
                <span className="mt-2 text-xs text-paper/55">PDF ou DOCX · 5 Mo maximum</span>
                <input
                  id="cv-file"
                  name="cv"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={onFileChange}
                  className="sr-only"
                  aria-describedby={fileError ? 'cv-error' : 'cv-help'}
                />
              </label>
              <p id="cv-help" className="mt-2 text-xs leading-relaxed text-paper/55">
                Le fichier reste sur votre appareil. Il ne sera pas envoyé automatiquement ; vous devrez le joindre au brouillon de courriel.
              </p>
              {fileError && <p id="cv-error" role="alert" className="mt-2 text-sm text-red-500">{fileError}</p>}
            </div>

            <p className="text-sm text-paper/65">
              Le bouton prépare un e-mail à <a className="text-orange underline underline-offset-4" href={`mailto:${contact.email}`}>{contact.email}</a>. Aucun envoi n’est effectué par le site.
            </p>
            <button
              type="submit"
              disabled={!cv}
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange disabled:cursor-not-allowed disabled:opacity-50"
            >
              Préparer l’e-mail de candidature
            </button>
            {mailNotice && <p role="status" className="text-sm leading-relaxed text-paper/75">{mailNotice}</p>}
          </form>
        </div>
      </main>
    </>
  );
}

function FormField({
  label,
  name,
  type = 'text',
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm text-paper/80">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 h-11 w-full rounded-lg border border-line bg-ink px-3 text-paper placeholder:text-paper/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
      />
    </label>
  );
}
