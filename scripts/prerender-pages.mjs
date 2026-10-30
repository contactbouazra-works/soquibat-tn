import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const [{ default: App }, { products }] = await Promise.all([
    server.ssrLoadModule('/src/App.tsx'),
    server.ssrLoadModule('/src/data/soquibat.ts'),
  ]);
  const indexPath = new URL('../dist/index.html', import.meta.url);
  const template = await readFile(indexPath, 'utf8');
  const manifest = JSON.parse(await readFile(new URL('../dist/.vite/manifest.json', import.meta.url), 'utf8'));
  const assetUrls = new Map();
  for (const [source, entry] of Object.entries(manifest)) {
    if (!entry.file || !source.startsWith('src/assets/')) continue;
    const sourcePath = `/${source}`;
    assetUrls.set(sourcePath, `/${entry.file}`);
    assetUrls.set(encodeURI(sourcePath), `/${entry.file}`);
  }
  const routes = [
    '/',
    '/produits',
    '/groupe',
    '/contact',
    '/search',
    ...products.map((product) => `/produits/${product.slug}`),
  ];

  for (const route of routes) {
    const helmetContext = {};
    const appHtml = renderToString(
      createElement(
        HelmetProvider,
        { context: helmetContext },
        createElement(StaticRouter, { location: route }, createElement(App)),
      ),
    );
    const renderedHtml = appHtml.replace(/\/src\/assets\/[^"'\s)]+/g, (sourcePath) => {
      const assetUrl = assetUrls.get(sourcePath);
      if (!assetUrl) throw new Error(`No built asset found for ${sourcePath} while prerendering ${route}`);
      return assetUrl;
    });
    const headTags = [];
    const pageHtml = renderedHtml.replace(
      /<title\b[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>|<script\b[^>]*>[\s\S]*?<\/script>/g,
      (tag) => {
        if (tag.startsWith('<link') && tag.includes('rel="preload"')) return '';
        headTags.push(tag);
        return '';
      },
    );
    const html = template
      .replace(/<title>.*?<\/title>/, '')
      .replace('</head>', `    ${headTags.join('\n    ')}\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${pageHtml}</div>`);
    const outputPath = route === '/'
      ? new URL('../dist/index.html', import.meta.url)
      : new URL(`../dist${route}/index.html`, import.meta.url);

    await mkdir(new URL('./', outputPath), { recursive: true });
    await writeFile(outputPath, html, 'utf8');
  }
} finally {
  await server.close();
}
