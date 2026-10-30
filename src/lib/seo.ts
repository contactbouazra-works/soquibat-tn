export const SITE_URL = 'https://soquibat.tn';

export function absoluteSeoUrl(pathOrUrl: string) {
  return pathOrUrl.startsWith('http') ? pathOrUrl : `${SITE_URL}${pathOrUrl}`;
}
