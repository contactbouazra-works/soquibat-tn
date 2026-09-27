import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import darkLogo from '../assets/img/logo-dark.png';
import whiteLogo from '../assets/img/logo-white.png';
import { contact, products, socials } from '../data/soquibat';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useTheme } from '../hooks/useTheme';

const companyLinks = [
  { label: 'Notre histoire', href: '/#histoire' },
  { label: 'Filiales', href: '/#filiales' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Carrière', href: '/recrutement' },
];

const supportLinks = [
  { label: 'Points de vente', href: '/#points-de-vente' },
  { label: 'Catalogue & fiches techniques', href: '/produits' },
  {
    label: 'Demander les mentions légales',
    href: `mailto:${contact.email}?subject=${encodeURIComponent('Demande de mentions légales')}`,
  },
  {
    label: 'Demander la politique de confidentialité',
    href: `mailto:${contact.email}?subject=${encodeURIComponent('Demande de politique de confidentialité')}`,
  },
];

type ContactIconName = 'phone' | 'mail' | 'pin' | 'clock';

function ContactIcon({ name }: { name: ContactIconName }) {
  const paths: Record<ContactIconName, ReactNode> = {
    phone: <path d="M5 3.5h2.2l1.1 3.1-1.5 1.5a13.6 13.6 0 0 0 5.1 5.1l1.5-1.5 3.1 1.1V15c0 .8-.7 1.5-1.5 1.5A12.5 12.5 0 0 1 3.5 4.9c0-.8.7-1.4 1.5-1.4Z" />,
    mail: <><rect x="3" y="4.5" width="14" height="11" rx="1.5" /><path d="m4 6 6 4.5L16 6" /></>,
    pin: <><path d="M16 8.2c0 4.1-6 9.3-6 9.3S4 12.3 4 8.2a6 6 0 1 1 12 0Z" /><circle cx="10" cy="8" r="1.8" /></>,
    clock: <><circle cx="10" cy="10" r="7" /><path d="M10 6v4l2.8 1.8" /></>,
  };

  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-amber-500">
      {paths[name]}
    </svg>
  );
}

function FooterLinkList({
  title,
  links,
  moreHref,
}: {
  title: string;
  links: { label: string; href: string }[];
  moreHref?: string;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 dark:text-slate-100">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.startsWith('mailto:') ? (
              <a href={link.href} className="text-sm leading-relaxed text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                {link.label}
              </a>
            ) : (
              <Link to={link.href} className="text-sm leading-relaxed text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
                {link.label}
              </Link>
            )}
          </li>
        ))}
        {moreHref && (
          <li>
            <Link to={moreHref} className="text-sm font-semibold text-amber-500 transition-colors hover:text-amber-400">
              Voir plus
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export function Footer() {
  const reduceMotion = usePrefersReducedMotion();
  const phoneNumbers = contact.phones.slice(0, 3);
  const { theme } = useTheme();

  return (
    <motion.footer
      id="site-footer"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30 m-0 flex h-auto min-h-screen w-full flex-col overflow-visible border-t border-slate-200 bg-slate-50 p-0 text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
    >
      <section className="border-b border-slate-200 bg-slate-50 px-6 pb-8 pt-24 dark:border-slate-800 dark:bg-slate-950 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex items-start gap-3">
              <ContactIcon name="phone" />
              <div>
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 dark:text-slate-100">Téléphone</h2>
                <ul className="mt-2 space-y-1">
                  {phoneNumbers.map((phone) => (
                    <li key={phone}>
                      <a href={`tel:${phone.replace(/\s+/g, '')}`} className="text-sm text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ContactIcon name="pin" />
              <div>
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 dark:text-slate-100">Adresse</h2>
                <p className="mt-2 max-w-[230px] text-sm leading-relaxed text-slate-600 dark:text-slate-400">{contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ContactIcon name="mail" />
              <div>
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 dark:text-slate-100">Email</h2>
                <a href={`mailto:${contact.email}`} className="mt-2 inline-block break-all text-sm text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
                  {contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ContactIcon name="clock" />
              <div>
                <h2 className="font-display text-xs font-semibold uppercase tracking-[0.14em] text-slate-900 dark:text-slate-100">Horaires</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  Lun - Ven: 07h30 - 17h00
                  <br />
                  Sam: 07h30 - 13h00
                </p>
              </div>
            </div>
          </div>

          <Link
            to="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-400 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-500"
          >
            Contactez-nous
          </Link>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-10 dark:bg-slate-950 lg:px-12 lg:py-14">
        <div className="mx-auto grid max-w-[1400px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.1fr_0.8fr_1.5fr_1fr_0.8fr] lg:gap-8">
          <div>
            <Link to="/" aria-label="Soquibat Group — accueil" className="inline-flex">
              <img src={theme === 'dark' ? whiteLogo : darkLogo} alt="Soquibat Group" className="h-10 w-auto object-contain" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              Leader dans le domaine de la sidérurgie en Tunisie depuis plus de 40 ans.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                >
                  {social.label}
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-amber-500">
                    <path d="M4 12 12 4M5 4h7v7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <FooterLinkList title="Groupe" links={companyLinks} />
          <FooterLinkList
            title="Produits"
            links={products.slice(0, 6).map((product) => ({
              label: product.name,
              href: `/produits/${encodeURIComponent(product.slug)}`,
            }))}
            moreHref="/produits"
          />
          <FooterLinkList title="Support & légal" links={supportLinks} />
          <div>
            <h2 className="font-display text-xs font-semibold uppercase tracking-[0.16em] text-slate-900 dark:text-slate-100">Contact</h2>
            <Link to="/contact" className="mt-4 inline-block text-sm text-slate-600 transition-colors hover:text-slate-950 dark:text-slate-400 dark:hover:text-white">
              Écrivez à notre équipe
            </Link>
          </div>
        </div>
      </section>

      <div className="mt-auto border-t border-slate-200 px-6 py-5 dark:border-slate-800 lg:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 text-xs text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © SOQUIBAT Group. All rights reserved.</p>
        </div>
      </div>
    </motion.footer>
  );
}
