// Structured content layer for the Soquibat website.
// All text below is sourced from https://soquibat.tn/ (kept in the original French)
// so that no business information is invented or mistranslated.

import heroPartners from '../assets/img/hero-2.jpg';
import mapTunis from '../assets/img/maptunis.webp';

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
  { label: 'Accueil', href: '/' },
  { label: 'Nos produits', href: '/produits' },
  { label: 'Groupe', href: '/groupe' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Comptoirs', href: '/comptoirs' },
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
  '../assets/img/{accessoires,aciers-speciaux,aluminium,decoupe-laser,fers-merchands,inox,lames-rideaux,osature,panne-c,portes-frigorifiques,poutrelles,toles,tubes}/*.{jpg,jpeg,png,webp}',
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
  decoupeLaser: getProductPhotos('decoupe-laser', 'Découpe laser'),
  aciersSpeciaux: getProductPhotos('aciers-speciaux', 'Acier spécial', {
    excludedImages: ['IMG_0052.jpg'],
  }),
  ossature: getProductPhotos('osature', 'Ossature métallique'),
  portesFrigorifiques: getProductPhotos('portes-frigorifiques', 'Porte frigorifique'),
};

const panneauxSandwichReferences = [
  { name: 'Panneaux de bardage fixation cachée', image: referenceImage('20230329080748.png') },
  { name: 'Panneaux de couverture', image: referenceImage('20230329080117.png') },
  { name: 'Panneaux froid de bardage', image: referenceImage('20230329075840.png') },
];
const inoxReferences = [
  ...productPhotos.inox,
  { name: 'Accessoires inox', image: referenceImage('20230328133945.png') },
  { name: 'Cornière inox', image: referenceImage('20230328132709.png') },
  { name: 'Fer plat inox', image: referenceImage('20230328133022.png') },
  { name: 'Rond plein inox', image: referenceImage('20230328133307.png') },
  { name: 'Tôle inox', image: referenceImage('20230328133556.png') },
  { name: 'Tubes inox', image: referenceImage('20230328133826.png') },
];
const ossatureReferences = [
  ...productPhotos.ossature,
  { name: 'Montant', image: referenceImage('20240913094213.png') },
  { name: 'Rail', image: referenceImage('20240913101923.png') },
  { name: 'Fourrure', image: referenceImage('20240913102050.png') },
  { name: 'Cornière', image: referenceImage('20240913102325.png') },
];

export const products = [
  {
    name: 'Poutrelles',
    slug: 'Poutrelles',
    image: productPhotos.poutrelles[0]?.image ?? heroPartners,
    referenceCount: productPhotos.poutrelles.length,
    description: 'SOQUIBAT Group, spécialiste en commercialisation des produits métallurgiques, propose une large gamme de poutrelles aciers conçues au fer carbone présentant un niveau minimal garanti de résistance à la traction. La poutrelle acier, outre son excellente résistance, offre une mise en œuvre rapide, un encombrement réduit et une longévité exceptionnelle. Les poutrelles en acier sont utilisées dans des différents domaines pour la fabrication de sous-ensembles ou ensembles mécano-soudés. Dans le bâtiment, elles sont couramment utilisées pour la fabrication de charpentes métalliques. Nous les retrouvons aussi comme outil de maintenance dans l’industrie lourde, éolienne et ferroviaire.',
    seoDescription: 'Poutrelles en acier pour la construction métallique et le bâtiment en Tunisie. Consultez les références SOQUIBAT et demandez un devis adapté à votre projet.',
    references: productPhotos.poutrelles,
  },
  {
    name: 'Tôles',
    slug: 'Tôles',
    image: productPhotos.toles[0]?.image ?? heroPartners,
    referenceCount: productPhotos.toles.length,
    description: 'SOQUIBAT Group, spécialiste en commercialisation des produits métallurgiques, propose une large gamme de poutrelles aciers conçues. Dans un souci de vous garantir ce qu’il y a de mieux en matières de tôles, ces dernières sont soumises à plusieurs contrôles de qualité et ce d’une manière continue. Ainsi, vous avez l’assurance d’une bonne qualité de produit, uniforme et constante. Le contrôle se fait essentiellement au niveau de l’épaisseur, des caractéristiques mécaniques et de la composition de l’acier. Contrôle visuel de l’état de surface et contrôle de l’épaisseur du zinc. Nos spécialistes de la découpe vous proposent un service innovant, sur-mesure, façonnant l’ensemble de vos besoins et répondant à chacune de vos spécificités.',
    seoDescription: 'Tôles métalliques et solutions de découpe pour vos projets en Tunisie. Découvrez les références du catalogue SOQUIBAT et demandez un devis.',
    references: productPhotos.toles,
  },
  {
    name: 'Tubes soudés en acier',
    slug: 'Tubes-soudés-en-acier',
    image: productPhotos.tubes[0]?.image ?? heroPartners,
    referenceCount: productPhotos.tubes.length,
    description: 'Les tubes soudés sont élaborés par formage et soudage en continu, sans apport de matière, d’un feuillard laminé à chaud, laminé à froid ou galvanisé. Norme : NF EN 10219 1 et 2. Nuances de l’acier : S 235, S 275, S 355. Acier selon NF EN 10025, apte à la galvanisation : courants : S235 JRH, S275 JOH, S355 J2H selon épaisseur ; certificat sur demande : 2.2 pour S235 et S275 / 3.1B pour S355. Le « S » désignant acier de construction : le nombre qui suit désignant la limite d’élasticité minimale en N/mm². La limite d’élasticité peut être suivie d’une terminologie « JR » signifiant l’essai de résistance ; JR = 27 Joules à +20°C, JO = 27 Joules à +0°C, J2 = 27 Joules à -20°C, K2 = 40 Joules à -20°C. Longueurs standards : 6 m, longueurs fixes et grandes longueurs sur demande. Épaisseurs : de 0,9 à 6 mm pour le laminé à chaud ; de 0,7 à 3 mm pour le laminé à froid ; de 0,8 à 3 mm pour le galvanisé.',
    seoDescription: 'Tubes soudés en acier, formés à partir de feuillards laminés à chaud, à froid ou galvanisés. Consultez les références SOQUIBAT en Tunisie.',
    references: productPhotos.tubes,
  },
  {
    name: 'Panneaux Sandwich',
    slug: 'Panneaux-Sandwich',
    image: referenceImage('20230329080748.png'),
    referenceCount: panneauxSandwichReferences.length,
    description: 'SOQUIBAT Group propose une large gamme de panneaux sandwich TUNISCO qui offre la solution la plus pratique et la plus économique pour une longue durée. Les panneaux sandwich sont utilisés comme éléments de construction modernes, légers et robustes, pour recouvrir les toits et les façades des bâtiments, pour créer des cloisons intérieures isolées ou des chambres froides. Les panneaux sandwich sont généralement utilisés dans les installations industrielles, les bâtiments commerciaux, les entrepôts frigorifiques, les bâtiments sociaux, les centrales électriques, l’agriculture et les bâtiments d’élevage. Les panneaux sandwich vous protègent contre les facteurs externes en prenant place tout autour de votre bâtiment et sur le toit ; ils sont produits en remplissant un matériau isolant épais et à faible densité entre deux surfaces métalliques minces à haute densité.',
    seoDescription: 'Panneaux sandwich TUNISCO pour toitures, façades, cloisons isolées et chambres froides. Consultez les références SOQUIBAT.',
    references: panneauxSandwichReferences,
  },
  {
    name: 'Lames rideaux et accessoires portes',
    slug: 'Lames-rideaux-et-accessoires-portes',
    image: productPhotos.lamesRideaux[0]?.image ?? heroPartners,
    referenceCount: productPhotos.lamesRideaux.length,
    description: 'Retrouvez les meilleures lames rideaux en Tunisie. SOQUIBAT Group se spécialise dans les lames rideaux : lame rideaux type C et accessoires de portes, lame finale, perforée, rideau plane, bombée type C.',
    seoDescription: 'Lames pour rideaux métalliques et accessoires de portes : modèles finaux, perforés, plans ou bombés, avec éléments de guidage. Catalogue SOQUIBAT.',
    references: productPhotos.lamesRideaux,
  },
  {
    name: 'Pannes C et Z',
    slug: 'Pannes-C-et-Z',
    image: productPhotos.pannes[0]?.image ?? heroPartners,
    referenceCount: productPhotos.pannes.length,
    description: 'SOQUIBAT propose une large gamme de profilés panne Z et C, disponibles selon des dimensions et des épaisseurs variées. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Profilés pannes C et Z pour les projets de construction en Tunisie. Consultez les références SOQUIBAT et contactez-nous pour votre demande.',
    references: productPhotos.pannes,
  },
  {
    name: 'Fer marchand',
    slug: 'Fer-marchands',
    image: productPhotos.fersMarchands[0]?.image ?? heroPartners,
    referenceCount: productPhotos.fersMarchands.length,
    description: 'SOQUIBAT propose une large gamme de fer marchand fabriquée par laminage à chaud, qui présente une bonne soudabilité et une aptitude à la déformation qui génère à son tour de bons matériaux pour des usages décoratifs. Idéal pour la forge, ce produit est utilisé dans de nombreux domaines pour la réalisation des travaux en matière de bâtiment. Fabriqué par laminage à chaud, son acier est facile à mettre en forme.',
    seoDescription: 'Fers marchands laminés à chaud pour le bâtiment et la forge. Découvrez le catalogue SOQUIBAT et demandez un devis pour votre projet en Tunisie.',
    references: productPhotos.fersMarchands,
  },
  {
    name: 'Accessoires Charpente',
    slug: 'Accessoires-Charpente',
    image: productPhotos.accessoires[0]?.image ?? heroPartners,
    referenceCount: productPhotos.accessoires.length,
    description: 'SOQUIBAT propose une large gamme d’accessoires charpente. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Accessoires de charpente métallique pour compléter vos structures et chantiers. Consultez les références SOQUIBAT en Tunisie.',
    references: productPhotos.accessoires,
  },
  {
    name: 'Inox',
    slug: 'Inox',
    image: productPhotos.inox[0]?.image ?? heroPartners,
    referenceCount: inoxReferences.length,
    description: 'SOQUIBAT, spécialiste en commercialisation des produits métallurgiques, propose une large gamme de produits en inox pour vos conceptions diversifiées. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Produits en inox : accessoires, profilés, tôles et tubes pour la transformation et la construction. Découvrez les références SOQUIBAT.',
    references: inoxReferences,
  },
  {
    name: 'Aluminium',
    slug: 'Aluminium',
    image: productPhotos.aluminium[0]?.image ?? heroPartners,
    referenceCount: productPhotos.aluminium.length,
    description: 'SOQUIBAT, spécialiste en commercialisation des produits métallurgiques, propose une large gamme de produits en aluminium pour vos conceptions diversifiées. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Tôles en aluminium lisses ou striées pour l’aménagement et la construction. Consultez le catalogue SOQUIBAT et demandez un devis.',
    references: productPhotos.aluminium,
  },
  {
    name: 'Aciers Spéciaux',
    slug: 'Aciers-Spéciaux',
    image: productPhotos.aciersSpeciaux[0]?.image ?? heroPartners,
    referenceCount: productPhotos.aciersSpeciaux.length,
    description: 'SOQUIBAT propose une large gamme d’aciers spéciaux. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Aciers spéciaux et ronds pleins pour répondre aux exigences de vos projets. Découvrez les références proposées par SOQUIBAT en Tunisie.',
    references: productPhotos.aciersSpeciaux,
  },
  {
    name: 'Découpe Laser',
    slug: 'Découpe-Laser',
    image: productPhotos.decoupeLaser[0]?.image ?? heroPartners,
    referenceCount: productPhotos.decoupeLaser.length,
    description: 'Le sur-mesure en toute simplicité. SOQUIBAT Group vous propose un service innovant et personnalisé de découpe laser. Pour toute demande spécifique, notre équipe de technico-commerciaux sera à votre disposition pour vous donner les meilleures solutions possibles.',
    seoDescription: 'Service de découpe laser de pièces métalliques en Tunisie. Présentez votre besoin à SOQUIBAT pour étudier une solution adaptée au projet.',
    references: productPhotos.decoupeLaser,
  },
  {
    name: 'Ossature métallique',
    slug: 'Ossature-métallique-pour-placoplâtre',
    image: productPhotos.ossature[0]?.image ?? heroPartners,
    referenceCount: ossatureReferences.length,
    description: 'Ce matériau s’adapte facilement et offre une souplesse architecturale intéressante. L’acier présente également l’avantage de n’avoir à subir aucun traitement contre les agressions extérieures. Rapidement installée, l’ossature métallique octroie un gain de temps considérable dans les travaux de construction. Prédécoupée et assemblée en atelier selon les plans du maître d’ouvrage, la charpente métallique est montée, souvent à sec, sur le terrain.',
    seoDescription: 'Éléments d’ossature métallique pour plafonds et cloisons en plaques de plâtre. Découvrez les références SOQUIBAT pour vos projets.',
    references: ossatureReferences,
  },
  {
    name: 'Portes frigorifiques',
    slug: 'Portes-frigorifiques',
    image: productPhotos.portesFrigorifiques[0]?.image ?? heroPartners,
    referenceCount: productPhotos.portesFrigorifiques.length,
    description: 'SOQUIBAT Group propose une large gamme de panneaux sandwich TUNISCO qui offre la solution la plus pratique et la plus économique pour une longue durée. Les panneaux sandwich sont utilisés comme éléments de construction modernes, légers et robustes, pour recouvrir les toits et les façades des bâtiments, pour créer des cloisons intérieures isolées ou des chambres froides. Les panneaux sandwich sont généralement utilisés dans les installations industrielles, les bâtiments commerciaux, les entrepôts frigorifiques, les bâtiments sociaux, les centrales électriques, l’agriculture et les bâtiments d’élevage. Les panneaux sandwich vous protègent contre les facteurs externes en prenant place tout autour de votre bâtiment et sur le toit ; ils sont produits en remplissant un matériau isolant épais et à faible densité entre deux surfaces métalliques minces à haute densité.',
    seoDescription: 'Portes frigorifiques TUNISCO pour chambres froides et espaces à température contrôlée. Consultez les références SOQUIBAT.',
    references: productPhotos.portesFrigorifiques,
  },
];

const localProductShowcaseImages: Record<string, string | undefined> = {
  Poutrelles: productPhotos.poutrelles[0]?.image,
  'Tôles': productPhotos.toles[0]?.image,
  'Tubes-soudés-en-acier': productPhotos.tubes[0]?.image,
  'Panneaux-Sandwich': panneauxSandwichReferences[0]?.image,
  Aluminium: productPhotos.aluminium[0]?.image,
  Inox: productPhotos.inox[0]?.image,
  'Lames-rideaux-et-accessoires-portes': productPhotos.lamesRideaux[0]?.image,
  'Pannes-C-et-Z': productPhotos.pannes[1]?.image ?? productPhotos.pannes[0]?.image,
  'Fer-marchands': productPhotos.fersMarchands[0]?.image,
  'Accessoires-Charpente': productPhotos.accessoires[0]?.image,
  'Découpe-Laser': productPhotos.decoupeLaser[0]?.image,
  'Aciers-Spéciaux': productPhotos.aciersSpeciaux[0]?.image,
  'Ossature-métallique-pour-placoplâtre': productPhotos.ossature[0]?.image,
  'Portes-frigorifiques': productPhotos.portesFrigorifiques[0]?.image,
};

export function getProductShowcaseImage(
  product: (typeof products)[number],
  fallbackImage = product.image,
) {
  return localProductShowcaseImages[product.slug] ?? fallbackImage;
}

export const subsidiaries = [
  { name: 'Metal Service Center', image: filiale1 },
  { name: 'TUNISCO', image: filiale2 },
  { name: 'SOQUIBAT', image: filiale3 },
  { name: 'SOQUIBAT CI', image: filiale4 },
  { name: 'STEEL FLEET', image: filiale5 },
];

export const international = {
  title: 'SOQUIBAT CI',
  kicker: "Développement à l'international",
  paragraph:
    "SOQUIBAT Group ayant une nouvelle stratégie de développement au local mais aussi à l'international, a opté pour une première implémentation business en Afrique de l'Ouest en restant fidèle au vecteur de croissance économique, de différenciation et d'innovation. Pour un 1er challenge réussi, notre groupe a inauguré 4 points de vente à la Côte d'Ivoire dans le but de répondre aux demandes locales ainsi que celles des pays voisins en produits métalliques et sidérurgiques.",
  cta: 'Découvrez nos points de vente',
  href: '/#points-de-vente',
  image: mapTunis,
};

export const internationalLocations = [
  {
    name: 'Site zone 4',
    address: 'Site SCD : Abidjan, Zone 4, Bietry rue du canal près de la pharmacie Sainte Marie Majeur',
    phone: '002250788876644',
  },
  {
    name: 'Site Bassam ville',
    address: 'Bassam Ville, Route International près de la banque SIB de Grand Bassam',
    phone: '002250767191765',
  },
  {
    name: 'Grand Bassam',
    address: 'Site SBA : Autoroute Grand Bassam, juste après le péage',
    phone: '002250788731106',
  },
  {
    name: 'Site Koumassi',
    address: 'Site SKO : Abidjan, Koumassi ligne 11 après l’agence Orange CI',
    phone: '002250788731682',
  },
];

export const actualites = [
  {
    slug: '2026-talents-feminins',
    category: 'Communiqué de presse',
    title: 'Les talents féminins au cœur de notre dynamique industrielle',
    date: '2026-03-06',
    dateLabel: '06-03-2026',
    image: 'https://soquibat.tn/public/public/images/20260309083605.png',
    description: 'À l’occasion de la Journée internationale des droits des femmes, SOQUIBAT Group réaffirme son engagement en faveur d’une industrie plus inclusive et rend hommage aux femmes qui contribuent chaque jour à son développement.',
    content: [
      'À l’occasion de la Journée internationale des droits des femmes, Soquibat Group réaffirme son engagement en faveur d’une industrie plus inclusive, où la diversité des talents constitue un véritable levier de progrès et de performance durable.',
      'Dans un secteur industriel en constante évolution, marqué par l’innovation, la technicité et la transformation des modes de production, la richesse des compétences et des parcours est un atout essentiel. Longtemps perçu comme majoritairement masculin, le domaine industriel connaît aujourd’hui une évolution positive, avec une présence féminine croissante dans des métiers aussi variés que l’ingénierie, la gestion de projets, la production, la qualité ou encore les fonctions support et stratégiques.',
      'Au sein de Soquibat Group, les femmes participent activement au développement et à la dynamique de l’entreprise. Par leur expertise et leur engagement, elles contribuent chaque jour à enrichir les pratiques, à renforcer l’esprit d’équipe et à soutenir la performance collective.',
      'Aujourd’hui, le groupe peut compter sur un capital féminin, présent dans différents métiers et niveaux de responsabilité. Ce vivier de talents reflète la volonté de l’entreprise de promouvoir la mixité et de valoriser les compétences féminines au cœur de ses activités industrielles.',
      'L’inclusion ne se limite pas à la représentation : elle repose sur une culture d’entreprise fondée sur le respect, l’égalité des opportunités et la valorisation des compétences.',
      'À travers ses valeurs et sa vision, le groupe œuvre pour construire un cadre de travail où la mixité devient une source d’innovation et de progrès. Encourager les parcours professionnels, promouvoir le leadership au féminin et soutenir les talents à tous les niveaux de l’organisation participent à bâtir une industrie plus équilibrée et plus performante.',
      'En cette Journée internationale des droits des femmes, Soquibat Group rend hommage à toutes les femmes qui, par leur talent, leur détermination et leur contribution quotidienne, participent à façonner l’industrie d’aujourd’hui et à construire celle de demain.',
    ],
  },
  {
    slug: '2026-team-building',
    category: 'Évènement',
    title: 'Retour sur notre team building : un moment de partage et de cohésion',
    date: '2026-02-02',
    dateLabel: '02-02-2026',
    image: 'https://soquibat.tn/public/public/images/20260202103836.jpg',
    description: 'SOQUIBAT Group a organisé une journée de team building réunissant ses collaborateurs pour partager des moments de convivialité, renforcer les liens et célébrer l’esprit d’équipe.',
    content: [
      'Dans le cadre de notre engagement à renforcer l’esprit d’équipe et la collaboration, nous avons récemment organisé un team building réunissant l’ensemble de nos collaborateurs.',
      'Cette journée a été marquée par des moments de convivialité, d’échange et de solidarité, permettant à chacun de mieux se connaître dans un cadre différent du quotidien professionnel.',
      'Au-delà des activités proposées, ce team building a été l’occasion de consolider les liens, de valoriser l’esprit collectif et de renforcer les valeurs qui nous rassemblent. Nous sommes convaincus que ces moments de cohésion contribuent directement à un environnement de travail plus dynamique, plus humain et plus performant.',
      'Un grand merci à toutes les équipes de SOQUIBAT GROUP pour leur énergie, leur implication et leur esprit positif.',
    ],
  },
  {
    slug: '2025-tripoli-international-fair',
    category: 'Évènement',
    title: 'Tripoli International Fair, Libya',
    date: '2025-05-12',
    dateLabel: '12-05-2025',
    image: 'https://soquibat.tn/public/public/images/20250512075607.png',
    description: 'TUNISCO vous invite à découvrir ses produits et services au salon Tripoli International Fair en Libye, du 12 au 15 mai 2025, Hall 6, stand n° 5.',
    content: [
      'تتشرف شركة تونسكو المنتجة للألواح العازلة وأبواب غرف التبريد بدعوتكم إلى الصالون الدولي للبناء والإنشاءات بطرابلس للتعرّف على منتوجاتنا وخدماتنا، وذلك بداية من يوم 12 ماي إلى يوم 15 ماي 2025، جناح رقم 5، Hall 6.',
      'We have the great pleasure to invite you to visit our stand from 12th to 15th of May 2025 at Hall 6 – Stand No. 5 at the Tripoli International Fair, Libya. We would be delighted to meet you there and discuss TUNISCO products and services.',
    ],
  },
  {
    slug: '2025-batimatec',
    category: 'Évènement',
    title: 'Retrouvez-nous au salon BATIMATEC 2025',
    date: '2025-04-29',
    dateLabel: '29-04-2025',
    image: 'https://soquibat.tn/public/public/images/20250429153312.png',
    description: 'SOQUIBAT Group vous invite à son stand Hall 1 – S51 au Salon Batimatec International de la Construction et de l’Habitat, du 4 au 8 mai 2025 au Palais des Expositions d’Alger.',
    content: [
      'SOQUIBAT Group au salon BATIMATEC !',
      'SOQUIBAT Group a le grand plaisir de vous inviter à son stand au Hall 1 – S51 au Salon Batimatec International de la Construction et de l’Habitat qui se tiendra du 04 au 08 Mai 2025 au Palais des Expositions d’Alger - Safex. Cette édition sera l’occasion de se rencontrer et d’échanger sur l’ensemble de nos activités.',
      'Notre équipe commerciale sera à votre disposition pour vous accueillir et traiter vos demandes. Au plaisir de vous rencontrer.',
    ],
  },
  {
    slug: '2024-horaires-double-seance',
    category: 'Info Générique',
    title: 'Horaires double séance',
    date: '2024-09-02',
    dateLabel: '02-09-2024',
    image: 'https://soquibat.tn/public/public/images/20240902102128.png',
    description: 'SOQUIBAT Group informe son aimable clientèle que nos comptoirs seront ouverts du lundi au vendredi en double séance.',
    content: [
      'SOQUIBAT Group informe son aimable clientèle que nos comptoirs seront ouverts :',
      'Du lundi au vendredi : de 08h00 à 17h30.',
      'Samedi : de 08h00 à 13h30.',
      'Pour en savoir plus sur les adresses de nos comptoirs, consultez la rubrique Points de vente.',
    ],
  },
  {
    slug: '2024-seance-unique',
    category: 'Info Générique',
    title: 'Horaires de Travail durant la séance unique',
    date: '2024-06-28',
    dateLabel: '28-06-2024',
    image: 'https://soquibat.tn/public/public/images/20240628080225.jpg',
    description: 'À partir du 1er juillet, les comptoirs adoptent le régime de la séance unique : du lundi au vendredi de 7h30 à 15h00 et le samedi de 7h30 à 13h00.',
    content: [
      'Nous portons à la connaissance de notre chère clientèle qu’à partir du 01 Juillet, nos comptoirs adopteront le régime de la séance unique.',
      'Horaires de travail durant la séance unique :',
      'Du Lundi au Vendredi : 7h30 à 15h00.',
      'Samedi : 7h30 à 13h.00.',
    ],
  },
  {
    slug: '2024-batimatec',
    category: 'Évènement',
    title: 'Retrouvez-nous au salon BATIMATEC 2024',
    date: '2024-04-30',
    dateLabel: '30-04-2024',
    image: 'https://soquibat.tn/public/public/images/20240430140550.png',
    description: 'SOQUIBAT Group vous invite à son stand Pavillon A – S57 au salon Batimatec Expo, du 5 au 9 mai 2024, pour échanger sur ses activités.',
    content: [
      'SOQUIBAT Group au salon BATIMATEC !',
      'SOQUIBAT Group a le grand plaisir de vous inviter à son stand au Pavillon A – S57 au Salon Batimatec Expo qui se tiendra du 05 au 09 Mai 2024. Cette édition sera l’occasion de se rencontrer et d’échanger sur l’ensemble de nos activités.',
      'Notre équipe commerciale sera à votre disposition pour vous accueillir et traiter vos demandes. Au plaisir de vous rencontrer.',
    ],
  },
  {
    slug: '2024-libya-build',
    category: 'Évènement',
    title: 'Retrouvez-nous au salon Libya Build 2024',
    date: '2024-04-24',
    dateLabel: '24-04-2024',
    image: 'https://soquibat.tn/public/public/images/20240424105655.jpg',
    description: 'TUNISCO vous invite à découvrir ses produits et services au salon Libya Build à Tripoli, du 29 avril au 2 mai 2024, Hall 5, stand 13.',
    content: [
      'We have the great pleasure to invite you to visit our stand from 29th April to 2nd of May 2024 at Hall 5 - 13 Libya Build, the international Trade of Building and Construction. We would be delighted to meet you there; it would be an opportunity to discuss TUNISCO Products and Services.',
      'تشرف شركة تونسكو المنتجة للألواح العازلة وأبواب غرف التبريد بدعوتكم إلى الصالون الدولي للبناء والإنشاءات بطرابلس للتعرّف على منتوجاتنا وخدماتنا وذلك بداية من يوم 29 أفريل إلى يوم 02 ماي 2024.',
      'جناح رقم H3.15',
    ],
  },
  {
    slug: '2024-tube-dusseldorf',
    category: 'Évènement',
    title: 'Retrouvez-nous au salon Tube Düsseldorf 2024',
    date: '2024-04-15',
    dateLabel: '15-04-2024',
    image: 'https://soquibat.tn/public/public/images/20240415110503.jpg',
    description: 'SOQUIBAT Group vous invite à son stand Hall 1 – F45 au salon international Tube Düsseldorf, du 15 au 19 avril 2024.',
    content: [
      'DAY 1 - Tubes Düsseldorf 2024, the international Trade fair for Tube.',
      'We have the great pleasure to invite you to visit our stand from 15th to 19th of April 2024 at Hall 1 - F45 Tubes Düsseldorf, the international Trade fair for Tube. We would be delighted to meet you.',
      'Nous avons le grand plaisir de vous inviter à nous rendre visite à notre stand au Hall 1 - F45 Tubes Düsseldorf du 15 au 19 avril 2024. Nous serions ravis de vous rencontrer.',
    ],
  },
  {
    slug: '2023-medibat',
    category: 'Évènement',
    title: 'Participation au Salon Méditerranéen du Bâtiment Medibat',
    date: '2023-09-28',
    dateLabel: '28-09-2023',
    image: 'https://soquibat.tn/public/public/images/20230928133725.jpg',
    description: 'SOQUIBAT Group vous invite à son stand n° 22, Hall 3, au Salon Méditerranéen MEDIBAT à Sfax, du 4 au 7 octobre 2023.',
    content: [
      'SOQUIBAT Group Tunisie aura le grand plaisir de vous inviter à son stand N°22, Hall-3 au Salon Méditerranéen MEDIBAT Sfax et ceci du 04 au 07 Octobre 2023.',
      'Cette édition sera l’occasion de se rencontrer et d’échanger sur l’ensemble de nos activités. Notre équipe commerciale sera à votre disposition pour vous accueillir et répondre à toutes vos questions.',
    ],
  },
  {
    slug: '2023-keejob',
    category: 'Évènement',
    title: 'Participation au Salon Keejob 2023',
    date: '2023-09-18',
    dateLabel: '18-09-2023',
    image: 'https://soquibat.tn/public/public/images/20230918144842.jpg',
    description: 'SOQUIBAT Group participe au salon de l’emploi en partenariat avec Keejob, les 21 et 22 septembre 2023 au Palais des Congrès de Tunis.',
    content: [
      'SOQUIBAT Group participe au salon de l’emploi en partenariat avec Keejob.com, qui se tiendra du 21 au 22 septembre 2023 au Palais des Congrès de Tunis.',
      'Soyez les bienvenus !',
    ],
  },
  {
    slug: '2023-horaires-double-seance',
    category: 'Info Générique',
    title: 'Horaires double séance',
    date: '2023-09-01',
    dateLabel: '01-09-2023',
    image: 'https://soquibat.tn/public/public/images/20230901093157.jpg',
    description: 'SOQUIBAT Group informe son aimable clientèle des horaires d’ouverture de ses comptoirs.',
    content: [
      'SOQUIBAT Group informe son aimable clientèle que nos comptoirs seront ouverts :',
      'Du Lundi au Vendredi : de 7H30 à 12H30 et de 13H30 à 17H00.',
      'Samedi : de 7H30 à 13H00.',
      'Pour en savoir plus sur les adresses de nos comptoirs rendez-vous sur Points de vente Soquibat Group Tunisie.',
    ],
  },
  {
    slug: '2023-batimatec',
    category: 'Évènement',
    title: 'BATIMATEC 20230',
    date: '2023-05-05',
    dateLabel: '05-05-2023',
    image: 'https://soquibat.tn/public/public/images/20230505161637.png',
    description: 'SOQUIBAT Group vous invite à découvrir son stand à N15, pavillon A, lors de la 25ème édition du salon BATIMATEC.',
    content: [
      "SOQUIBAT Group a l'immense plaisir de vous inviter à venir et à découvrir notre stand à N15 pavillon A.",
    ],
  },
  {
    slug: '2022-sousse',
    category: 'Évènement',
    title: 'Inauguration nouveau point de vente : Sousse',
    date: '2022-09-03',
    dateLabel: '03-09-2022',
    image: 'https://soquibat.tn/public/public/images/20220903172914.jpg',
    description: 'SOQUIBAT Group annonce l’ouverture de son nouveau point de vente à Sousse. L’équipe commerciale est à votre disposition à Messadine.',
    content: [
      'Notre équipe s’agrandit pour être plus proche de vous.',
      'Nous avons le plaisir de vous annoncer l’ouverture officielle de notre nouveau point de vente à Sousse.',
      'Notre équipe commerciale sur place est à votre disposition du lundi au samedi, garantissant un traitement rapide et efficace de vos demandes aux meilleurs prix.',
      'Téléphone : (+216) 70 131 590.',
      'Téléphone : (+216) 98 184 245.',
      'Adresse : Boulevard Dr Taieb Hachicha, Messadine 4071.',
    ],
  },
  {
    slug: '2022-tubes-acier',
    category: 'Nouveauté produits',
    title: 'Tubes ACIER : L’excellent rapport résistance et poids',
    date: '2022-09-03',
    dateLabel: '03-09-2022',
    image: 'https://soquibat.tn/public/public/images/20220903172043.jpg',
    description: 'Les tubes en acier offrent un excellent rapport résistance/poids : ils permettent d’alléger les murs et les structures tout en assurant la résistance nécessaire.',
    content: [
      'Saviez-vous que les tubes en acier offrent un excellent rapport résistance/poids, ce qui signifie qu’il faut moins d’acier en poids pour accomplir le travail dont vous aurez besoin ? Cette résistance vous permet d’alléger les murs et les structures, ce qui serait impossible en utilisant d’autres matériaux.',
      'Pour plus de détails, nous sommes joignables au +216 70 131 500 et au +216 98 184 258, ou par e-mail à commercial@soquibat.tn.',
      'Horaires de travail : du lundi au vendredi de 7h30 à 12h30 et de 13h30 à 17h00. Samedi : 7h30 à 13h00.',
    ],
  },
  {
    slug: '2022-salon-carthage',
    category: 'Évènement',
    title: 'Participation au Salon Carthage 2022',
    date: '2022-07-20',
    dateLabel: '20-07-2022',
    image: 'https://soquibat.tn/public/public/images/20220810153148.jpeg',
    description: 'SOQUIBAT Group et ses filiales participent au Salon international de la Construction et du Bâtiment Carthage, du 23 au 29 mai 2022, stand n° 1411, Hall I.',
    content: [
      'SOQUIBAT Group et ses filiales seront présents à la nouvelle édition du Salon international de la Construction et du Bâtiment « Carthage » qui se déroulera du 23 au 29 mai 2022 au Parc des Expositions au Kram.',
      'Rendez-vous à notre stand n° 1411 au Hall I pour vous présenter notre gamme de produits :',
      'Panneaux Sandwichs · Fer Marchand · Lames rideaux · Accessoires portes · Aciers spéciaux · Tôles ondulées · Tôles nervurées · Poutrelles · Accessoires · Charpente.',
      'À bientôt, l’équipe SOQUIBAT Group.',
    ],
  },
  {
    slug: '2022-decoupe-laser',
    category: 'Nouveauté produits',
    title: 'Laser Le service HAUTE QUALITE',
    date: '2022-07-20',
    dateLabel: '20-07-2022',
    image: 'https://soquibat.tn/public/public/images/20220903122231.png',
    description: '',
    content: [],
  },
  {
    slug: '2022-avantages-toles',
    category: 'Nouveauté produits',
    title: 'Les avantages de nos tôles',
    date: '2022-07-20',
    dateLabel: '20-07-2022',
    image: 'https://soquibat.tn/public/public/images/20220810154958.jpeg',
    description: 'Les tôles SOQUIBAT sont certifiées, légères et faciles à poser, pratiques et économiques pour les toitures, esthétiques et disponibles en plusieurs couleurs et épaisseurs.',
    content: [
      '+40 ans d’expérience, d’expertise et d’excellence : Soquibat Group vous propose des tôles :',
      'Certifiées.',
      'Légères et faciles à poser.',
      'Revêtement de toitures pratiques et économiques.',
      'Esthétiques, disponibles en plusieurs couleurs et variantes d’épaisseurs.',
      'Adaptables à tous types de toitures arrondies ou en pente.',
      'N’hésitez pas à poser vos questions en nous contactant sur Messenger ou directement au +216 70 131 500 ou à commercial@soquibat.tn.',
      'Horaires de travail : du lundi au vendredi de 7h30 à 12h30 et de 13h30 à 17h00. Samedi : 7h30 à 13h00.',
    ],
  },
];

export const contact = {
  address: 'Immeuble Mezghani, Rue Lac Wendermer, Les berges du Lac Tunis.',
  phones: ['+216 70 131 500', '+216 58 512 618', '+216 58 512 619'],
  hours: [
    { label: 'Du lundi au vendredi', value: '08h00 à 17h30' },
    { label: 'Samedi', value: '08h00 à 13h30' },
  ],
  email: 'commercial@soquibat.com.tn',
};

export const comptoirs = [
  {
    id: 'soquibat-siege',
    name: 'SOQUIBAT Group siège',
    address: 'Rue du Lac Windemere, Lac 1, Tunis, Tunisie',
    phone: '70 131 500',
    latitude: 36.8364999,
    longitude: 10.2457443,
  },
  {
    id: 'soquibat-ariana-borj-louzir',
    name: 'SOQUIBAT ARIANA / BORJ LOUZIR',
    address: '6, Rue Sanhajz, Borj Louzir, 2073, Ariana, Tunis',
    phone: '+216 70 131 500',
    latitude: 36.872646,
    longitude: 10.18887,
  },
  {
    id: 'soquibat-menzel-bourguiba',
    name: 'SOQUIBAT MENZEL BOURGUIBA',
    address: "Avenue de l'indépendance, Menzel Bourguiba, Bizerte BP-7050 Bizerte Tunisie",
    phone: '+216 70 131 520',
    latitude: 37.153784,
    longitude: 9.797815,
  },
  {
    id: 'superfer-boujardgua',
    name: 'SUPERFER BOUJARDGUA',
    address: 'Ben Arous Mournag Boujardga',
    phone: '+216 70 131 545',
    latitude: 36.7172144,
    longitude: 10.262033,
  },
  {
    id: 'soquibat-fahs',
    name: 'SOQUIBAT FAHS',
    address: 'Route de Tunis, El Fahs 1140',
    phone: '+216 58 512 631',
    latitude: 36.3858213,
    longitude: 9.9071383,
  },
  {
    id: 'soquibat-djebel-el-ouest',
    name: 'SOQUIBAT SHOWROOM DJEBEL EL OUEST',
    address: 'Zone Industrielle Djebel Ouest, Bir Mchergua 1111, Zaghouan, Tunisie',
    phone: '+216 98 757 758',
    latitude: 36.5438992,
    longitude: 10.0472057,
  },
  {
    id: 'soquibat-sousse',
    name: 'SOQUIBAT SOUSSE',
    address: 'Boulevard Docteur Taieb Hachicha, Messadine 4071',
    phone: '+216 98 184 245',
    latitude: 35.7613215,
    longitude: 10.5966672,
  },
  {
    id: 'superfer-sfax-ville',
    name: 'SUPERFER SFAX VILLE',
    address: 'Route El Mahdia KM 10, Sakiet Eddayer, 2073',
    phone: '+216 58 512 629',
    latitude: 34.8213693,
    longitude: 10.7934403,
  },
  {
    id: 'soquibat-sfax-route-gabes',
    name: 'SOQUIBAT SFAX / ROUTE GABES',
    address: 'Route de Gabes Km 5.5, Sfax, Tunisie',
    phone: '+216 98 184 250',
    latitude: 34.6984345,
    longitude: 10.7152477,
  },
  {
    id: 'soquibat-mornaguia',
    name: 'SOQUIBAT MORNAGUIA',
    address: '07, Avenue Habib Bourguiba, Tunis 1116',
    phone: '70 131 580',
    latitude: 36.7571648,
    longitude: 10.014927,
  },
  {
    id: 'soquibat-manzel-temime',
    name: 'SOQUIBAT MANZEL TEMIME',
    address: 'Avenue Farhat Hached, Manzel Temime, 8080, Nabeul, Tunisie',
    phone: '+216 58 512 831',
    latitude: 36.7877289,
    longitude: 10.9873025,
  },
  {
    id: 'soquibat-mghira',
    name: 'SOQUIBAT MGHIRA',
    address: "RTE PRINCIPALE, M'GHIRA, 2082",
    phone: '+216 58 512 632',
    latitude: 36.7094572,
    longitude: 10.1689617,
  },
];

export const soquibatData = {
  company,
  nav,
  stats,
  products,
  subsidiaries,
  international,
  internationalLocations,
  actualites,
  contact,
  comptoirs,
};

export default soquibatData;
