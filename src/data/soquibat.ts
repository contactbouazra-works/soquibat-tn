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
  { label: 'Groupe', href: '/groupe' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Recrutement', href: '/recrutement' },
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

const referenceImage = (filename: string) => `https://soquibat.tn/public/public/produits/${filename}`;

export const products = [
  {
    name: 'Poutrelles',
    slug: 'Poutrelles',
    image: productPoutrelles,
    referenceCount: 4,
    description: 'Une gamme de poutrelles en acier au fer carbone, reconnues pour leur résistance mécanique et utilisées dans la construction métallique, le bâtiment et l’industrie.',
    references: [
      { name: 'Poutrelle HEB', image: referenceImage('20260410072624.png') },
      { name: 'Poutrelle HEA', image: referenceImage('20230317150840.JPG') },
      { name: 'Poutrelle IPE', image: referenceImage('20230317151041.JPG') },
      { name: 'Poutrelle UPN', image: referenceImage('20230317150737.JPG') },
    ],
  },
  {
    name: 'Tôles',
    slug: 'Tôles',
    image: productToles,
    referenceCount: 15,
    description: 'Des tôles soumises à des contrôles continus de qualité, avec des solutions de découpe adaptées aux besoins et aux spécificités de chaque projet.',
    references: [
      { name: 'Tôle laminée à chaud', image: referenceImage('20230407095640.JPG') },
      { name: 'Tôle forte laminée à chaud', image: referenceImage('20230407111906.png') },
      { name: 'Tôle laminée striée à chaud', image: referenceImage('20230329082059.JPG') },
      { name: 'Tôle larmée laminée à chaud', image: referenceImage('20230407112036.jpg') },
      { name: 'Tôle laminée à froid', image: referenceImage('20230407112142.jpg') },
      { name: 'Tôle galvanisée', image: referenceImage('20230407112455.JPG') },
      { name: 'Tôle électro-zinguée', image: referenceImage('20230323083354.jpg') },
      { name: 'Tôle trouée', image: referenceImage('20230323083852.png') },
      { name: 'Tôle nervurée', image: referenceImage('20230329081301.png') },
      { name: 'Tôle ondulée', image: referenceImage('20230323085058.png') },
      { name: 'Tôle micro-nervurée', image: referenceImage('20230329083401.JPG') },
      { name: 'Tôle prélaquée', image: referenceImage('20230329081017.png') },
      { name: 'Tôle Toitesco', image: referenceImage('20230329083050.png') },
      { name: 'Tôle perforée', image: referenceImage('20230329091743.JPG') },
      { name: 'Métal déployé', image: referenceImage('20240111133129.jpg') },
    ],
  },
  {
    name: 'Tubes soudés en acier',
    slug: 'Tubes-soudés-en-acier',
    image: productTubes,
    referenceCount: 6,
    description: 'Des tubes soudés par formage continu de feuillards laminés à chaud, à froid ou galvanisés, proposés dans plusieurs sections et nuances d’acier.',
    references: [
      { name: 'Tube carré', image: referenceImage('20230328111331.png') },
      { name: 'Tube rond', image: referenceImage('20230328111439.png') },
      { name: 'Tube rectangulaire', image: referenceImage('20230328111801.png') },
      { name: 'Tube ovale', image: referenceImage('20230328112226.png') },
      { name: 'Tube semi-ovale', image: referenceImage('20230328112432.png') },
      { name: 'Profilés spéciaux', image: referenceImage('20230328112921.png') },
    ],
  },
  {
    name: 'Panneaux Sandwich & Portes Frigorifiques',
    slug: 'Panneaux-Sandwich-Portes-Frigorifiques',
    image: productPanneaux,
    referenceCount: 7,
    description: 'Les panneaux sandwich TUNISCO et portes frigorifiques offrent des solutions légères et robustes pour les toitures, façades, cloisons isolées et chambres froides.',
    references: [
      { name: 'Panneaux de bardage fixation cachée', image: referenceImage('20230329080748.png') },
      { name: 'Panneaux de couverture', image: referenceImage('20230329080117.png') },
      { name: 'Panneaux froid de bardage', image: referenceImage('20230329075840.png') },
      { name: 'Porte va-et-vient PVV', image: referenceImage('20240829095200.png') },
      { name: 'Porte pivotante POP', image: referenceImage('20240829095318.png') },
      { name: 'Porte de service PSR', image: referenceImage('20240829095431.png') },
      { name: 'Porte coulissante POC', image: referenceImage('20240829095600.png') },
    ],
  },
  {
    name: 'Lames rideaux et accessoires portes',
    slug: 'Lames-rideaux-et-accessoires-portes',
    image: productLames,
    referenceCount: 10,
    description: 'Une sélection de lames de rideaux et d’accessoires de portes : lames finales, perforées, planes ou bombées de type C, ainsi que les éléments de guidage.',
    references: [
      { name: 'Boîte rideaux', image: referenceImage('20230328114600.png') },
      { name: 'Flasque', image: referenceImage('20230328115326.png') },
      { name: 'Glissière', image: referenceImage('20230328114644.png') },
      { name: 'Guide portail', image: referenceImage('20230328115046.png') },
      { name: 'Lame finale', image: referenceImage('20230328115524.png') },
      { name: 'Lame perforée', image: referenceImage('20230328120342.png') },
      { name: 'Lame rideau bombée type C', image: referenceImage('20230328121027.png') },
      { name: 'Lame rideau plane', image: referenceImage('20230328121439.png') },
      { name: 'Monorail', image: referenceImage('20230328123015.png') },
      { name: 'Tube rail', image: referenceImage('20230328125556.png') },
    ],
  },
  {
    name: 'Pannes C et Z',
    slug: 'Pannes-C-et-Z',
    image: productPannes,
    referenceCount: 2,
    description: 'Des profilés pannes C et Z proposés en différentes dimensions et épaisseurs pour répondre aux besoins des projets de construction.',
    references: [
      { name: 'Profilé panne C', image: referenceImage('20220903182635.jpg') },
      { name: 'Profilé panne Z', image: referenceImage('20230328135745.png') },
    ],
  },
  {
    name: 'Fer marchand',
    slug: 'Fer-marchands',
    image: productFer,
    referenceCount: 6,
    description: 'Une gamme de fers marchands laminés à chaud, appréciés pour leur soudabilité et leur aptitude à la mise en forme dans les domaines du bâtiment et de la forge.',
    references: [
      { name: 'Cornière', image: referenceImage('20230328130713.png') },
      { name: 'Fer carré', image: referenceImage('20220903182407.jpg') },
      { name: 'Fer plat', image: referenceImage('20230328131110.png') },
      { name: 'Fer rond', image: referenceImage('20230328131225.png') },
      { name: 'Fer T', image: referenceImage('20230328131345.png') },
      { name: 'Fer U', image: referenceImage('20230328131735.png') },
    ],
  },
  {
    name: 'Accessoires Charpente',
    slug: 'Accessoires-Charpente',
    image: productAccessoires,
    referenceCount: 4,
    description: 'Des accessoires de charpente métallique pour compléter les structures et répondre aux besoins spécifiques des chantiers.',
    references: [
      { name: 'Caillebotis', image: referenceImage('20230323084013.png') },
      { name: 'Bavette', image: referenceImage('20230328132311.png') },
      { name: 'Chéneaux', image: referenceImage('20230328132408.png') },
      { name: 'Faîtière', image: referenceImage('20230328132539.png') },
    ],
  },
  {
    name: 'Inox',
    slug: 'Inox',
    image: productInox,
    referenceCount: 6,
    description: 'Une gamme de produits inox comprenant des accessoires, profilés, tôles et tubes pour différents besoins de transformation et de construction.',
    references: [
      { name: 'Accessoires inox', image: referenceImage('20230328133945.png') },
      { name: 'Cornière inox', image: referenceImage('20230328132709.png') },
      { name: 'Fer plat inox', image: referenceImage('20230328133022.png') },
      { name: 'Rond plein inox', image: referenceImage('20230328133307.png') },
      { name: 'Tôle inox', image: referenceImage('20230328133556.png') },
      { name: 'Tubes inox', image: referenceImage('20230328133826.png') },
    ],
  },
  {
    name: 'Aluminium',
    slug: 'Aluminium',
    image: productAluminium,
    referenceCount: 2,
    description: 'Des tôles aluminium, proposées en version lisse ou striée, pour répondre aux besoins d’aménagement et de construction.',
    references: [
      { name: 'Tôle aluminium', image: referenceImage('20230328134529.png') },
      { name: 'Tôle striée aluminium', image: referenceImage('20260309083605.png') },
    ],
  },
  {
    name: 'Aciers Spéciaux',
    slug: 'Aciers-Spéciaux',
    image: productAciers,
    referenceCount: 3,
    description: 'Une sélection d’aciers spéciaux comprenant des ronds pleins aux caractéristiques distinctes, selon les exigences de chaque projet.',
    references: [
      { name: 'Fer rond acier 42 CD4', image: referenceImage('20260309083605.png') },
      { name: 'Fer rond acier étiré', image: referenceImage('20260202103836.jpg') },
      { name: 'Fer rond acier XC48', image: referenceImage('20250512075607.png') },
    ],
  },
  {
    name: 'Découpe Laser',
    slug: 'Découpe-Laser',
    image: productLaser,
    referenceCount: 0,
    description: 'Un service de découpe laser pour la réalisation de pièces métalliques adaptées aux besoins de votre projet.',
    references: [],
  },
  {
    name: 'Ossature métallique',
    slug: 'Ossature-métallique-pour-placoplâtre',
    image: productOssature,
    referenceCount: 4,
    description: 'Une gamme d’éléments d’ossature métallique conçus pour les plafonds et cloisons en plaques de plâtre.',
    references: [
      { name: 'Montant', image: referenceImage('20240913094213.png') },
      { name: 'Rail', image: referenceImage('20240913101923.png') },
      { name: 'Fourrure', image: referenceImage('20240913102050.png') },
      { name: 'Cornière', image: referenceImage('20240913102325.png') },
    ],
  },
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

export type CareerPosting = {
  slug: string;
  title: string;
  roleTitle: string;
  department: string;
  contractType: string;
  location: string;
  date: string;
  href?: string;
  image: string;
  status: 'archive' | 'unconfirmed';
  excerpt: string;
  responsibilities: string[];
  profile: string[];
  skills: string[];
};

export const careers: CareerPosting[] = [
  {
    slug: 'Transit',
    title: 'Transit',
    roleTitle: 'Chargé(e) Transit',
    department: 'Transit',
    contractType: 'Non précisé',
    location: 'Djebel El Ouest',
    date: '16-11-2023',
    href: 'https://soquibat.tn/recrutement/Transit',
    image: career1,
    status: 'archive',
    excerpt: 'SOQUIBAT Group recherchait une personne dynamique et autonome pour un poste à temps plein à Djebel El Ouest.',
    responsibilities: [],
    profile: ['Personne dynamique et autonome'],
    skills: [],
  },
  {
    slug: 'QHSE',
    title: 'QHSE',
    roleTitle: 'Responsable QHSE',
    department: 'QHSE',
    contractType: 'Non précisé',
    location: 'Djebel El Ouest',
    date: '16-11-2023',
    href: 'https://soquibat.tn/recrutement/QHSE',
    image: career2,
    status: 'archive',
    excerpt: 'Une ancienne annonce portant sur le déploiement de la politique qualité, hygiène, sécurité et environnement du groupe.',
    responsibilities: [
      'Coordonner les activités et les équipes QHSE.',
      'Contribuer à la politique du groupe et suivre les démarches d’amélioration continue.',
      'Suivre les indicateurs, organiser les formations et réaliser des audits de sécurité.',
    ],
    profile: ['Personne dynamique et autonome'],
    skills: [],
  },
  {
    slug: 'SI',
    title: 'SI',
    roleTitle: 'Responsable des Systèmes d’information',
    department: 'Systèmes d’information',
    contractType: 'Non précisé',
    location: 'Djebel El Ouest',
    date: '19-09-2023',
    href: 'https://soquibat.tn/recrutement/SI',
    image: career3,
    status: 'archive',
    excerpt: 'Une ancienne annonce consacrée au suivi de projets ERP, à l’accompagnement des utilisateurs et à l’évolution des systèmes d’information.',
    responsibilities: [
      'Suivre le déploiement des modules ERP et coordonner les intervenants.',
      'Analyser les besoins métier, accompagner les utilisateurs et contribuer à la formation.',
      'Participer aux interfaces, au reporting et au traitement des dysfonctionnements.',
    ],
    profile: [
      'Diplôme d’ingénieur.',
      'Connaissances générales en informatique et outils de développement.',
      'Expérience en administration ERP ; une expérience SAGE X3 est mentionnée comme préférable.',
      'Connaissance des outils de reporting, notamment Power BI et Excel.',
    ],
    skills: [],
  },
  {
    slug: 'ingenieur-genie-industriel',
    title: 'Ingénieur Génie Industriel',
    roleTitle: 'Ingénieur Génie Industriel',
    department: 'Génie industriel',
    contractType: 'À confirmer',
    location: 'À confirmer',
    date: 'Non précisée',
    image: career1,
    status: 'unconfirmed',
    excerpt: 'Intitulé de poste à confirmer auprès de SOQUIBAT Group. Les responsabilités et les critères de candidature ne sont pas encore publiés.',
    responsibilities: [],
    profile: [],
    skills: [],
  },
  {
    slug: 'agents-commerciaux',
    title: 'Agents Commerciaux',
    roleTitle: 'Agents Commerciaux',
    department: 'Commercial',
    contractType: 'À confirmer',
    location: 'À confirmer',
    date: 'Non précisée',
    image: career2,
    status: 'unconfirmed',
    excerpt: 'Intitulé de poste à confirmer auprès de SOQUIBAT Group. Les responsabilités et les critères de candidature ne sont pas encore publiés.',
    responsibilities: [],
    profile: [],
    skills: [],
  },
  {
    slug: 'technicien-de-maintenance',
    title: 'Technicien de Maintenance',
    roleTitle: 'Technicien de Maintenance',
    department: 'Maintenance',
    contractType: 'À confirmer',
    location: 'À confirmer',
    date: 'Non précisée',
    image: career3,
    status: 'unconfirmed',
    excerpt: 'Intitulé de poste à confirmer auprès de SOQUIBAT Group. Les responsabilités et les critères de candidature ne sont pas encore publiés.',
    responsibilities: [],
    profile: [],
    skills: [],
  },
];

export const news = [
  {
    slug: 'chez-soquibat-group-l-inclusion-se-vit-au-quotidien',
    detailTitle: 'Chez SOQUIBAT GROUP, l’inclusion se vit au quotidien',
    tag: 'Communiqué de presse',
    categories: ['Communiqué de presse', 'RSE & Inclusivité'],
    title: 'Les talents féminins au cœur de notre dynamique industrielle',
    date: '06-03-2026',
    excerpt:
      "À l'occasion de la Journée internationale des droits des femmes, Soquibat Group réaffirme son engagement...",
    image: news1,
    content: [
      'À l’occasion de la Journée internationale des droits des femmes, SOQUIBAT met en lumière la place grandissante des femmes dans les métiers de l’industrie et leur contribution à la vie du groupe.',
      'Leurs compétences s’expriment dans des domaines variés, de l’ingénierie et la production à la qualité, la gestion de projets et les fonctions support.',
      'Le groupe rappelle son engagement en faveur du respect, de l’égalité des opportunités et de la valorisation des parcours professionnels.',
    ],
  },
  {
    slug: 'retour-sur-notre-team-building-un-moment-de-partage-et-de-cohesion',
    detailTitle: 'Retour sur notre team building : un moment de partage et de cohésion',
    tag: 'Évènement',
    categories: ['Événement'],
    title: 'Retour sur notre team building : un moment de partage et de cohésion',
    date: '02-02-2026',
    excerpt:
      "Dans le cadre de notre engagement à renforcer l'esprit d'équipe et la collaboration, nous avons récemment...",
    image: news2,
    content: [
      'SOQUIBAT Group a réuni ses collaborateurs autour d’une journée de team building consacrée aux échanges, à la convivialité et à la cohésion.',
      'Cette rencontre a permis aux équipes de partager un moment hors du cadre professionnel habituel et de renforcer les liens qui soutiennent le travail collectif.',
    ],
  },
  {
    slug: 'tripoli-international-fair-libya',
    detailTitle: 'Tripoli International Fair, Libya',
    tag: 'Évènement',
    categories: ['Événement'],
    title: 'Tripoli International Fair, Libya',
    date: '12-05-2025',
    excerpt:
      "Notre filiale TUNISCO, productrice des panneaux isolants et portes de chambres froides, vous invite au salon international du bâtiment...",
    image: news3,
    content: [
      'TUNISCO, filiale spécialisée dans les panneaux isolants et les portes de chambres froides, a annoncé sa participation au salon international de la construction à Tripoli.',
      'L’annonce invitait les visiteurs à rencontrer l’équipe du 12 au 15 mai 2025, dans le hall 6, stand numéro 5, pour découvrir ses produits et services.',
    ],
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
  { label: 'Groupe', href: '/groupe' },
  { label: 'Produits', href: '/produits' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Carrière', href: '/recrutement' },
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
