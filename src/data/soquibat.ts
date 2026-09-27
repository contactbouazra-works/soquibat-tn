// Structured content layer for the Soquibat website.
// All text below is sourced from https://soquibat.tn/ (kept in the original French)
// so that no business information is invented or mistranslated.

import heroOssature from '../assets/img/hero-1.jpg';
import heroPartenaires from '../assets/img/hero-2.jpg';
import heroQualite from '../assets/img/hero-3.jpg';
import heroDefis from '../assets/img/hero-4.jpg';

import productPoutrelles from '../assets/img/product-poutrelles.webp';
import productToles from '../assets/img/product-toles.jpg';
import productTubes from '../assets/img/product-tubes.jpg';
import productPanneaux from '../assets/img/product-panneaux.jpg';
import productLames from '../assets/img/product-lames.jpg';
import productPannes from '../assets/img/product-pannes.png';
import productFer from '../assets/img/product-fer.jpeg';
import productAccessoires from '../assets/img/product-accessoires.png';
import productInox from '../assets/img/product-inox.jpg';
import productAluminium from '../assets/img/product-aluminium.jpeg';
import productAciers from '../assets/img/product-aciers.jpeg';
import productLaser from '../assets/img/product-laser.png';
import productOssature from '../assets/img/product-ossature.png';

import filiale1 from '../assets/img/filiale-1.png';
import filiale2 from '../assets/img/filiale-2.png';
import filiale3 from '../assets/img/filiale-3.png';
import filiale4 from '../assets/img/filiale-4.png';
import filiale5 from '../assets/img/filiale-5.png';

import career1 from '../assets/img/career-1.jpg';
import career2 from '../assets/img/career-2.jpg';
import career3 from '../assets/img/career-3.jpg';

import news1 from '../assets/img/news-1.jpg';
import news2 from '../assets/img/news-2.jpg';
import news3 from '../assets/img/news-3.jpg';

export const company = {
  name: 'Soquibat',
  fullName: 'SOQUIBAT Group',
  tagline: 'Leader dans le domaine de la sidérurgie en Tunisie depuis plus de 40 ans',
  description:
    "SOQUIBAT Group est la holding tunisienne, leader dans le domaine de la sidérurgie en Tunisie depuis plus de 40 ans. Nous proposons une large gamme de produits de toutes les nuances, adaptée à toutes les exigences : Fer marchands, Poutrelles, Tubes soudés, Tôles, Panneaux sandwich...",
};

export const nav = [
  { label: 'Nos produits', href: '/produits' },
  { label: 'Groupe', href: '/#histoire' },
  { label: 'Actualités', href: '/#actualites' },
  { label: 'Recrutement', href: '/#recrutement' },
  { label: 'Contact', href: '/contact' },
];

export const heroSlides = [
  {
    kicker: 'NOUVEAU PRODUIT',
    title: 'Ossature métallique',
    subtitle: 'la solution idéale pour vos projets de plafonds et cloisons',
    image: heroOssature,
  },
  {
    kicker: 'AVEC NOS PARTENAIRES',
    title: 'Bâtir des relations',
    subtitle: 'de confiance',
    image: heroPartenaires,
  },
  {
    kicker: 'NOS MEILLEURS ATOUTS',
    title: 'Qualité et services',
    subtitle: 'inégalés',
    image: heroQualite,
  },
  {
    kicker: 'INNOVER POUR RELEVER',
    title: 'Les défis ambitieux',
    subtitle: 'de demain',
    image: heroDefis,
  },
];

export const stats = [
  { value: 40, suffix: '+', label: "ans d'expérience" },
  { value: 15, suffix: '+', label: 'comptoirs' },
  { value: 70000, suffix: '+', label: 'm² de capacité de stockage' },
  { value: 4000, suffix: '+', label: 'articles' },
  { value: 80, suffix: '%', label: "d'articles made in Tunisia" },
  { value: 5000, suffix: '+', label: 'clients' },
  { value: 300, suffix: '+', label: 'collaborateurs et 60 des meilleurs experts du secteur' },
];

export const products = [
  { name: 'Poutrelles', slug: 'Poutrelles', image: productPoutrelles },
  { name: 'Tôles', slug: 'Tôles', image: productToles },
  { name: 'Tubes soudés en acier', slug: 'Tubes-soudés-en-acier', image: productTubes },
  {
    name: 'Panneaux Sandwich & Portes Frigorifiques',
    slug: 'Panneaux-Sandwich-Portes-Frigorifiques',
    image: productPanneaux,
  },
  {
    name: 'Lames rideaux et accessoires portes',
    slug: 'Lames-rideaux-et-accessoires-portes',
    image: productLames,
  },
  { name: 'Pannes C et Z', slug: 'Pannes-C-et-Z', image: productPannes },
  { name: 'Fer marchand', slug: 'Fer-marchands', image: productFer },
  { name: 'Accessoires Charpente', slug: 'Accessoires-Charpente', image: productAccessoires },
  { name: 'Inox', slug: 'Inox', image: productInox },
  { name: 'Aluminium', slug: 'Aluminium', image: productAluminium },
  { name: 'Aciers Spéciaux', slug: 'Aciers-Spéciaux', image: productAciers },
  { name: 'Découpe Laser', slug: 'Découpe-Laser', image: productLaser },
  { name: 'Ossature métallique', slug: 'Ossature-métallique-pour-placoplâtre', image: productOssature },
];

export const subsidiaries = [
  { name: 'Metal Service Center', href: 'https://www.msc.tn/', image: filiale1 },
  { name: 'TUNISCO', href: 'https://tunisco.tn/', image: filiale2 },
  { name: 'SOQUIBAT', href: '/', image: filiale3 },
  { name: 'SOQUIBAT CI', href: 'https://soquibat-ci.com', image: filiale4 },
  { name: 'STEEL FLEET', href: '#', image: filiale5 },
];

export const international = {
  title: 'SOQUIBAT CI',
  kicker: "Développement à l'international",
  paragraph:
    "SOQUIBAT Group ayant une nouvelle stratégie de développement au local mais aussi à l'international, a opté pour une première implémentation business en Afrique de l'Ouest en restant fidèle au vecteur de croissance économique, de différenciation et d'innovation. Pour un 1er challenge réussi, notre groupe a inauguré 4 points de vente à la Côte d'Ivoire dans le but de répondre aux demandes locales ainsi que celles des pays voisins en produits métalliques et sidérurgiques.",
  cta: 'Découvrez nos points de vente',
  href: 'https://soquibat.tn/soquibat-ci',
  image: heroOssature,
};

export const careers = [
  { title: 'Transit', date: '16-11-2023', href: 'https://soquibat.tn/recrutement/Transit', image: career1 },
  { title: 'QHSE', date: '16-11-2023', href: 'https://soquibat.tn/recrutement/QHSE', image: career2 },
  { title: 'SI', date: '19-09-2023', href: 'https://soquibat.tn/recrutement/SI', image: career3 },
];

export const news = [
  {
    tag: 'Communiqué de presse',
    title: 'Les talents féminins au cœur de notre dynamique industrielle',
    date: '06-03-2026',
    excerpt:
      "À l'occasion de la Journée internationale des droits des femmes, Soquibat Group réaffirme son engagement...",
    image: news1,
  },
  {
    tag: 'Évènement',
    title: 'Retour sur notre team building : un moment de partage et de cohésion',
    date: '02-02-2026',
    excerpt:
      "Dans le cadre de notre engagement à renforcer l'esprit d'équipe et la collaboration, nous avons récemment...",
    image: news2,
  },
  {
    tag: 'Évènement',
    title: 'Tripoli International Fair, Libya',
    date: '12-05-2025',
    excerpt:
      "Notre filiale TUNISCO, productrice des panneaux isolants et portes de chambres froides, vous invite au salon international du bâtiment...",
    image: news3,
  },
];

export const contact = {
  address: '6, Rue Sanhaja, Borj Louzir, 2073, Ariana, Tunisie',
  phones: ['+216 70 131 500', '+216 58 512 618', '+216 58 512 619'],
  hours: [
    { label: 'Du Lundi au Vendredi', value: '07h30 à 12h30 et 13h30 à 17h' },
    { label: 'Samedi', value: '7h30 à 13h' },
  ],
  email: 'commercial@soquibat.com.tn',
};

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/soquibat' },
  { label: 'Facebook', href: 'https://www.facebook.com/SoquibatGroup/' },
  { label: 'Instagram', href: 'https://www.instagram.com/soquibat.tn/' },
  { label: 'Twitter', href: 'https://twitter.com/soquibat' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC4pBDAZVyPGBuAhM8M3pqBQ' },
];

export const footerLinks = [
  { label: 'Groupe', href: '/#histoire' },
  { label: 'Produits', href: '/produits' },
  { label: 'Actualités', href: '/#actualites' },
  { label: 'Carrière', href: '/#recrutement' },
];

export const soquibatData = {
  company,
  nav,
  heroSlides,
  stats,
  products,
  subsidiaries,
  international,
  careers,
  news,
  contact,
  socials,
  footerLinks,
};

export default soquibatData;
