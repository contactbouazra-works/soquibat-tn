import { writeFile } from 'node:fs/promises';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { products } = await server.ssrLoadModule('/src/data/soquibat.ts');
  const paths = [
    '/',
    '/produits',
    '/groupe',
    '/contact',
    ...products.map((product) => `/produits/${encodeURIComponent(product.slug)}`),
  ];
  const urls = paths
    .map((path) => `  <url><loc>https://soquibat.tn${path}</loc></url>`)
    .join('\n');
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

  await writeFile(new URL('../public/sitemap.xml', import.meta.url), sitemap, 'utf8');
} finally {
  await server.close();
}
