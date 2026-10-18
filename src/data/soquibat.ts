// Structured content layer for the Soquibat website.
// All text below is sourced from https://soquibat.tn/ (kept in the original French)
// so that no business information is invented or mistranslated.

import heroPartners from '../assets/img/hero-2.jpg';
import mapTunis from '../assets/img/maptunis.webp';
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
  { label: 'Contact', href: '/contact' },
];

export const stats = [
  { value: 40, suffix: '+', label: "ans d'expérience" },
  { value: 13, suffix: '', label: 'comptoirs' },
  { value: 70000, suffix: '+', label: 'm² de capacité de stockage' },
  { value: 4000, suffix: '+', label: 'articles' },
  { value: 80, suffix: '%', label: "d'articles made in Tunisia" },
  { value: 5000, suffix: '+', label: 'clients' },
  { value: 300, suffix: '+', label: 'collaborateurs et 60 des meilleurs experts du secteur' },
];

const referenceImage = (filename: string) => `https://soquibat.tn/public/public/produits/${filename}`;

const productPhotoFiles = import.meta.glob<string>(
  '../assets/img/{accessoires,aciers-speciaux,aluminium,fers-merchands,inox,lames-rideaux,panne-c,poutrelles,toles,tubes}/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
);

const getProductPhotos = (
  folder: string,
  productName: string,
  options?: { featuredImage?: string; excludedImages?: string[] },
) => {
  const photoEntries = Object.entries(productPhotoFiles)
    .filter(([path]) => path.startsWith(`../assets/img/${folder}/`))
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath, undefined, { numeric: true }))
    .filter(([path]) => !options?.excludedImages?.includes(path.split('/').pop() ?? ''));
  const featuredEntries = options?.featuredImage
    ? photoEntries.filter(([path]) => path.endsWith(`/${options.featuredImage}`))
    : [];
  const orderedEntries = [
    ...featuredEntries,
    ...photoEntries.filter(([path]) => !path.endsWith(`/${options?.featuredImage}`)),
  ];

  return orderedEntries.map(([, image], index) => ({
    name: `${productName} ${String(index + 1).padStart(2, '0')}`,
    image,
  }));
};

const productPhotos = {
  poutrelles: getProductPhotos('poutrelles', 'Poutrelle'),
  toles: getProductPhotos('toles', 'Tôle'),
  tubes: getProductPhotos('tubes', 'Tube'),
  aluminium: getProductPhotos('aluminium', 'Tôle aluminium', { featuredImage: 'IMG_3519.jpg' }),
  inox: getProductPhotos('inox', 'Inox'),
  lamesRideaux: getProductPhotos('lames-rideaux', 'Lame de rideau'),
  pannes: getProductPhotos('panne-c', 'Panne'),
  fersMarchands: getProductPhotos('fers-merchands', 'Fer marchand'),
  accessoires: getProductPhotos('accessoires', 'Accessoire'),
  aciersSpeciaux: getProductPhotos('aciers-speciaux', 'Acier spécial', {
    excludedImages: ['IMG_0052.jpg'],
  }),
};

export const products = [
  {
    name: 'Poutrelles',
    slug: 'Poutrelles',
    image: productPoutrelles,
    referenceCount: productPhotos.poutrelles.length,
    description: 'Une gamme de poutrelles en acier au fer carbone, reconnues pour leur résistance mécanique et utilisées dans la construction métallique, le bâtiment et l’industrie.',
    references: productPhotos.poutrelles,
  },
  {
    name: 'Tôles',
    slug: 'Tôles',
    image: productToles,
    referenceCount: productPhotos.toles.length,
    description: 'Des tôles soumises à des contrôles continus de qualité, avec des solutions de découpe adaptées aux besoins et aux spécificités de chaque projet.',
    references: productPhotos.toles,
  },
  {
    name: 'Tubes soudés en acier',
    slug: 'Tubes-soudés-en-acier',
    image: productTubes,
    referenceCount: productPhotos.tubes.length,
    description: 'Des tubes soudés par formage continu de feuillards laminés à chaud, à froid ou galvanisés, proposés dans plusieurs sections et nuances d’acier.',
    references: productPhotos.tubes,
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
    referenceCount: productPhotos.lamesRideaux.length,
    description: 'Une sélection de lames de rideaux et d’accessoires de portes : lames finales, perforées, planes ou bombées de type C, ainsi que les éléments de guidage.',
    references: productPhotos.lamesRideaux,
  },
  {
    name: 'Pannes C et Z',
    slug: 'Pannes-C-et-Z',
    image: productPannes,
    referenceCount: productPhotos.pannes.length,
    description: 'Des profilés pannes C et Z proposés en différentes dimensions et épaisseurs pour répondre aux besoins des projets de construction.',
    references: productPhotos.pannes,
  },
  {
    name: 'Fer marchand',
    slug: 'Fer-marchands',
    image: productFer,
    referenceCount: productPhotos.fersMarchands.length,
    description: 'Une gamme de fers marchands laminés à chaud, appréciés pour leur soudabilité et leur aptitude à la mise en forme dans les domaines du bâtiment et de la forge.',
    references: productPhotos.fersMarchands,
  },
  {
    name: 'Accessoires Charpente',
    slug: 'Accessoires-Charpente',
    image: productAccessoires,
    referenceCount: productPhotos.accessoires.length,
    description: 'Des accessoires de charpente métallique pour compléter les structures et répondre aux besoins spécifiques des chantiers.',
    references: productPhotos.accessoires,
  },
  {
    name: 'Inox',
    slug: 'Inox',
    image: productInox,
    referenceCount: productPhotos.inox.length || 6,
    description: 'Une gamme de produits inox comprenant des accessoires, profilés, tôles et tubes pour différents besoins de transformation et de construction.',
    references: productPhotos.inox.length ? productPhotos.inox : [
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
    referenceCount: productPhotos.aluminium.length || 2,
    description: 'Des tôles aluminium, proposées en version lisse ou striée, pour répondre aux besoins d’aménagement et de construction.',
    references: productPhotos.aluminium.length ? productPhotos.aluminium : [
      { name: 'Tôle aluminium', image: referenceImage('20230328134529.png') },
      { name: 'Tôle striée aluminium', image: referenceImage('20260309083605.png') },
    ],
  },
  {
    name: 'Aciers Spéciaux',
    slug: 'Aciers-Spéciaux',
    image: productAciers,
    referenceCount: productPhotos.aciersSpeciaux.length,
    description: 'Une sélection d’aciers spéciaux comprenant des ronds pleins aux caractéristiques distinctes, selon les exigences de chaque projet.',
    references: productPhotos.aciersSpeciaux,
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

const localProductShowcaseImages: Record<string, string | undefined> = {
  Poutrelles: productPhotos.poutrelles[0]?.image,
  'Tôles': productPhotos.toles[0]?.image,
  'Tubes-soudés-en-acier': productPhotos.tubes[0]?.image,
  Aluminium: productPhotos.aluminium[0]?.image,
  Inox: productPhotos.inox[0]?.image,
  'Lames-rideaux-et-accessoires-portes': productPhotos.lamesRideaux[0]?.image,
  'Pannes-C-et-Z': productPhotos.pannes[1]?.image ?? productPhotos.pannes[0]?.image,
  'Fer-marchands': productPhotos.fersMarchands[0]?.image,
  'Accessoires-Charpente': productPhotos.accessoires[0]?.image,
  'Aciers-Spéciaux': productPhotos.aciersSpeciaux[0]?.image,
  'Ossature-métallique-pour-placoplâtre': heroPartners,
};

export function getProductShowcaseImage(
  product: (typeof products)[number],
  fallbackImage = product.image,
) {
  return localProductShowcaseImages[product.slug] ?? fallbackImage;
}

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
  image: mapTunis,
};

export const contact = {
  address: 'Immeuble Mezghani, Rue Lac Wendermer, Les berges du Lac Tunis.',
  phones: ['+216 70 131 500', '+216 58 512 618', '+216 58 512 619'],
  hours: [
    { label: 'Du Lundi au Vendredi', value: '08h00 à 18h00' },
    { label: 'Samedi', value: '08h00 à 13h30' },
  ],
  email: 'commercial@soquibat.com.tn',
};

export const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/soquibat' },
  { label: 'Facebook', href: 'https://www.facebook.com/SoquibatGroup/' },
  { label: 'Instagram', href: 'https://www.instagram.com/soquibat_group/' },
  { label: 'Twitter', href: 'https://twitter.com/soquibat' },
  { label: 'YouTube', href: 'https://www.youtube.com/channel/UC4pBDAZVyPGBuAhM8M3pqBQ' },
];

export const soquibatData = {
  company,
  nav,
  stats,
  products,
  subsidiaries,
  international,
  contact,
  socials,
};

export default soquibatData;
