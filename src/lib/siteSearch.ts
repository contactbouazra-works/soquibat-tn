import heroImage from '../assets/img/hero-1.jpg';
import { careers, company, international, news, products, subsidiaries } from '../data/soquibat';

export type SearchCategory = 'Produits' | 'Actualités' | 'Recrutement' | 'Groupe';

export type SearchResult = {
  id: string;
  category: SearchCategory;
  title: string;
  metadata: string;
  description: string;
  image: string;
  href: string;
  searchText: string;
};

const searchIndex: SearchResult[] = [
  ...products.map((product) => {
    const references = product.references.map((reference) => reference.name).join(' ');
    return {
      id: `product-${product.slug}`,
      category: 'Produits' as const,
      title: product.name,
      metadata: product.references.length
        ? `${product.references.length} références · ${product.references.slice(0, 3).map((reference) => reference.name).join(' · ')}`
        : 'Service de transformation métallique',
      description: product.description,
      image: product.image,
      href: `/produits/${encodeURIComponent(product.slug)}`,
      searchText: `${product.name} ${product.slug} ${product.description} ${references}`,
    };
  }),
  ...news.map((article) => ({
    id: `news-${article.slug}`,
    category: 'Actualités' as const,
    title: article.detailTitle,
    metadata: `${article.tag} · ${article.date}`,
    description: article.content.join(' '),
    image: article.image,
    href: `/actualites/${encodeURIComponent(article.detailTitle)}`,
    searchText: `${article.detailTitle} ${article.title} ${article.tag} ${article.categories.join(' ')} ${article.excerpt} ${article.content.join(' ')}`,
  })),
  ...careers.map((job) => ({
    id: `career-${job.slug}`,
    category: 'Recrutement' as const,
    title: job.roleTitle,
    metadata: `${job.department} · ${job.location} · ${job.status === 'archive' ? 'Annonce archivée' : 'Détails à confirmer'}`,
    description: `${job.excerpt} ${job.responsibilities.join(' ')} ${job.profile.join(' ')}`,
    image: job.image,
    href: `/recrutement/${encodeURIComponent(job.slug)}`,
    searchText: `${job.title} ${job.roleTitle} ${job.department} ${job.location} ${job.contractType} ${job.excerpt} ${job.responsibilities.join(' ')} ${job.profile.join(' ')} ${job.skills.join(' ')}`,
  })),
  {
    id: 'group-soquibat',
    category: 'Groupe' as const,
    title: 'SOQUIBAT Group — Notre histoire',
    metadata: 'Depuis 1983 · Fabrication · Commercialisation · Transformation',
    description: `${company.description} ${international.paragraph}`,
    image: heroImage,
    href: '/groupe',
    searchText: `${company.name} ${company.fullName} ${company.tagline} ${company.description} ${international.title} ${international.kicker} ${international.paragraph} ${subsidiaries.map((item) => item.name).join(' ')}`,
  },
];

function normalizeSearchText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('fr')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function wordMatches(queryWord: string, contentWord: string) {
  const singularQuery = queryWord.replace(/[sx]$/, '');
  const singularContent = contentWord.replace(/[sx]$/, '');
  if (singularQuery === singularContent) return true;
  if (singularQuery.length >= 4 && singularContent.startsWith(singularQuery)) return true;
  return false;
}

function scoreResult(query: string, result: SearchResult) {
  const queryWords = normalizeSearchText(query).split(/\s+/).filter(Boolean);
  const title = normalizeSearchText(result.title);
  const metadata = normalizeSearchText(result.metadata);
  const description = normalizeSearchText(result.description);
  const allText = normalizeSearchText(result.searchText);
  const titleWords = title.split(' ');
  const metadataWords = metadata.split(' ');
  const descriptionWords = description.split(' ');
  const contentWords = allText.split(' ');
  let score = 0;
  let matchedWords = 0;

  for (const queryWord of queryWords) {
    if (titleWords.some((word) => wordMatches(queryWord, word))) {
      score += 8;
      matchedWords += 1;
    } else if (metadataWords.some((word) => wordMatches(queryWord, word))) {
      score += 5;
      matchedWords += 1;
    } else if (descriptionWords.some((word) => wordMatches(queryWord, word))) {
      score += 3;
      matchedWords += 1;
    } else if (contentWords.some((word) => wordMatches(queryWord, word))) {
      score += 1;
      matchedWords += 1;
    }
  }

  if (matchedWords !== queryWords.length) return 0;
  if (title.includes(normalizeSearchText(query))) score += 5;
  return score;
}

export function searchSiteContent(query: string) {
  if (!normalizeSearchText(query)) return [];

  return searchIndex
    .map((result) => ({ result, score: scoreResult(query, result) }))
    .filter((match) => match.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title, 'fr'))
    .map(({ result }) => result);
}
