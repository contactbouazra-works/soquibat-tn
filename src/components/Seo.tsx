import { Helmet } from 'react-helmet-async';
import defaultOgImage from '../assets/img/hero-1.jpg';

const SITE_NAME = 'SOQUIBAT Group';
// Target production domain from the SEO strategy — used to build absolute
// canonical/Open Graph URLs regardless of which host (Vercel preview, .tn)
// currently serves the app.
export const SITE_URL = 'https://soquibat.tn';

type SeoProps = {
  /** Full page title, already including the "SOQUIBAT Group" suffix where relevant. */
  title: string;
  description: string;
  /** Route path starting with "/", used to build the canonical and og:url. */
  path: string;
  /** Absolute URL or Vite-resolved asset path for the social preview image. */
  image?: string;
  /** Set true for pages that should not be indexed (e.g. a missing product). */
  noindex?: boolean;
};

function toAbsoluteUrl(pathOrUrl: string) {
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}

/**
 * Renders per-route <title> and <meta> tags (description, canonical, Open
 * Graph, Twitter card) via react-helmet-async so each page — not just the
 * static index.html shell — carries its own accurate search/share metadata.
 */
export function Seo({ title, description, path, image, noindex = false }: SeoProps) {
  const canonicalUrl = toAbsoluteUrl(path);
  const ogImage = toAbsoluteUrl(image ?? defaultOgImage);

  return (
    <Helmet htmlAttributes={{ lang: 'fr' }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="fr_TN" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
