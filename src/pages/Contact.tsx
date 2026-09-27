import { useState, type FormEvent } from 'react';
import { Seo } from '../components/Seo';
import { contact } from '../data/soquibat';

export function Contact() {
  const [mailNotice, setMailNotice] = useState('');

  const prepareContactEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = String(formData.get('firstName') ?? '').trim();
    const lastName = String(formData.get('lastName') ?? '').trim();
    const subject = `Demande de contact - ${firstName} ${lastName}`;
    const body = [
      `Nom : ${lastName}`,
      `Prénom : ${firstName}`,
      `Email : ${formData.get('email')}`,
      `Adresse : ${formData.get('address')}`,
      `Téléphone : ${formData.get('phone')}`,
      `Fax : ${formData.get('fax') || 'Non renseigné'}`,
      '',
      'Message :',
      `${formData.get('message')}`,
    ].join('\n');

    setMailNotice(`Un brouillon va être préparé pour ${contact.email}. Le site ne transmet pas automatiquement le formulaire : vérifiez le message et envoyez-le depuis votre logiciel de messagerie.`);
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <Seo
        title="Contactez SOQUIBAT Group | Formulaire de contact"
        description="Contactez SOQUIBAT Group pour vos questions, projets et demandes concernant les produits métallurgiques. Remplissez notre formulaire de contact."
        path="/contact"
      />
      <main className="min-h-screen bg-ink px-6 pb-24 pt-36 text-paper lg:px-12 lg:pt-44">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xs uppercase tracking-[0.18em] text-orange">SOQUIBAT Group</p>
          <h1 className="mt-3 font-display text-3xl uppercase sm:text-4xl">Formulaire de contact</h1>
          <p className="mt-4 max-w-2xl leading-relaxed text-paper/70">
            Une question, un projet ou une demande de devis ? Écrivez-nous, notre équipe vous répondra.
          </p>

          <section className="mt-8 rounded-2xl border border-line bg-ink-soft p-5 sm:p-8">
            <form onSubmit={prepareContactEmail} className="space-y-5">
              <div
                className="grid sm:grid-cols-2"
                style={{ columnGap: '2rem', rowGap: '1.5rem' }}
              >
                <ContactField
                  label="Nom"
                  name="lastName"
                  placeholder="Nom *"
                  autoComplete="family-name"
                  required
                />
                <ContactField
                  label="Prénom"
                  name="firstName"
                  placeholder="Prénom *"
                  autoComplete="given-name"
                  required
                />
                <ContactField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Email *"
                  autoComplete="email"
                  required
                />
                <ContactField
                  label="Adresse"
                  name="address"
                  placeholder="Adresse *"
                  autoComplete="street-address"
                  required
                />
                <ContactField
                  label="Téléphone"
                  name="phone"
                  type="tel"
                  placeholder="Téléphone *"
                  autoComplete="tel"
                  required
                />
                <ContactField
                  label="Fax"
                  name="fax"
                  type="tel"
                  placeholder="Fax"
                  autoComplete="off"
                />
              </div>

              <label htmlFor="contact-message" className="block text-sm text-paper/80">
                Votre message <span aria-hidden="true">*</span>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Votre message *"
                  className="mt-2 min-h-32 w-full resize-y rounded-lg border border-line bg-ink px-3 py-2 text-paper placeholder:text-paper/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30 sm:min-h-40"
                />
              </label>

              <p className="text-sm leading-relaxed text-paper/70">
                Pour connaître vos droits de rectification et d’effacement de vos données personnelles, cliquez{' '}
                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent('Exercice de mes droits sur mes données personnelles')}`}
                  className="text-orange underline underline-offset-2 hover:text-orange-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange"
                >
                  ici
                </a>.
              </p>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center gap-4 rounded-md bg-orange px-6 py-3 font-semibold text-slate-950 transition-colors hover:bg-orange-dark focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange"
              >
                Envoyer
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
                  <path d="M3 5.5h14v9H3z" stroke="currentColor" strokeWidth="1.4" />
                  <path d="m4 6.5 6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                </svg>
              </button>

              {mailNotice && (
                <p role="status" className="max-w-lg text-sm leading-relaxed text-paper/70">
                  {mailNotice}
                </p>
              )}
            </form>
          </section>
        </div>
      </main>
    </>
  );
}

function ContactField({
  label,
  name,
  placeholder,
  type = 'text',
  autoComplete,
  required = false,
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={`contact-${name}`} className="block text-sm text-paper/80">
      {label}{required && <span aria-hidden="true"> *</span>}
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className="mt-2 h-11 w-full rounded-lg border border-line bg-ink px-3 text-paper placeholder:text-paper/40 focus:border-orange focus:outline-none focus:ring-2 focus:ring-orange/30"
      />
    </label>
  );
}
