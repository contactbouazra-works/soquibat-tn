# SOQUIBAT Group SEO Strategy

**Market:** Tunisia first; qualified regional B2B opportunities second  
**Primary language:** French (Tunisia)  
**Business focus:** Steel, metallurgy, metal transformation, industrial and construction supply  
**Prepared:** 27 September 2026

## Executive direction

Build organic visibility around verified products, specifications, quote requests, and real service locations. Treat the product catalogue as the primary commercial landing-page system, with technically useful guides supporting it. Do not optimize for unrelated retail categories such as tiles or sanitary ware.

No strategy can guarantee a #1 Google position. Search volumes, current rankings, conversions, branch details, and customer demand were not available in this audit. Keyword priorities below are hypotheses based on commercial intent and the supplied brief; validate and reorder them with Google Search Console, Keyword Planner, and real quote data.

## 1. Vercel preview and repository audit

### Verified findings for `https://soquibat-tn.vercel.app/`

| Priority | Finding | Evidence | Recommended action |
|---|---|---|---|
| P0 | Direct requests to app routes returned Vercel `404 NOT_FOUND`, even though the homepage loads. | Browser-tested `/produits`; direct fetches to `/produits`, `/produits/Poutrelles`, and `/contact` returned 404 on 27 September 2026. | A Vercel SPA fallback has now been added in `vercel.json`, rewriting app paths to `/`. Redeploy the project and retest each exact deep URL in a fresh browser and with HTTP requests. This config change is not live until the new deployment succeeds. For SEO production, consider prerendering/SSR so routes return their own HTML and metadata. |
| P1 | `/robots.txt` and `/sitemap.xml` both return 404 on the Vercel preview. | Direct fetch on 27 September 2026. | Add a valid robots file and sitemap to the deployed project. Use the canonical production domain in sitemap URLs at launch; preview URLs should not be submitted as the production sitemap. Check status, content type, and all sitemap destinations after deployment. |
| P1 | ~~The homepage initial response is a client-rendered app shell with one static title and meta description; product routes have no route-specific head metadata in the checked source.~~ **Resolved.** | Raw HTML from `https://soquibat-tn.vercel.app/`, `index.html`, `src/App.tsx`, `src/pages/Products.tsx`, `src/pages/ProductDetail.tsx`. | Added a shared `Seo` component (`src/components/Seo.tsx`) using `react-helmet-async`, rendered on Home, `/produits`, each product detail route, and `/contact`, with a unique title, description, canonical URL, Open Graph, and Twitter card tags per route (product pages also set `og:image` to that product's photo). The not-found product state now renders `noindex, nofollow`. This still runs client-side only (no SSR/pre-rendering yet); verify with Google URL Inspection after deployment that Googlebot's render sees these tags, since crawlers that don't execute JavaScript would still only see the generic shell `<title>`. |
| P1 | ~~`index.html` declares `lang="en"` while the visible page content is French.~~ **Resolved.** | Checked repository `index.html`. | `index.html` now declares `lang="fr"`, and the `Seo` component keeps `<html lang="fr">` in sync via Helmet's `htmlAttributes` on every route. |
| P1 | Product detail copy is broad and usually does not state dimensions, grades, standards, availability, delivery, or technical-document links. | Checked product data in `src/data/soquibat.ts` and detail template. | Work with product owners to add verifiable specifications and inquiry paths; do not invent standards or stock claims. |
| P1 | Product reference imagery is configured with a remote `/public/public/produits/` URL prefix, which should be checked for successful responses, crawlability, and image stability. | `referenceImage()` in `src/data/soquibat.ts`. | Crawl every referenced image URL, repair failures, and migrate to stable first-party optimized assets where appropriate. |
| P1 | The contact route currently contains a heading and short introduction, but no visible form, phone, address, map, or branch selector in the checked page component. | `src/pages/Contact.tsx`; contact facts exist separately in `src/data/soquibat.ts`. | Provide a usable quote/contact path with verified business details and a clear response expectation. Track submitted leads. |
| P2 | The checked data contains 13 product categories, but only one Tunisia street address and three phone numbers; it does not substantiate 15+ Tunisian branch records or coordinates. | `products` and `contact` in `src/data/soquibat.ts`. | Verify the real branch inventory with operations before publishing location pages, local schema, or Google Business Profiles. |
| P2 | The checked product images include large raster assets; run a full asset-weight and mobile-performance audit before deciding which assets to replace. | `src/assets/img/`, including large news and product files. | Convert/compress and serve responsive images, prioritizing above-the-fold images and slow mobile connections. |

### Existing `.tn` domain is a separate deployment

The application is currently deployed on Vercel for testing and has not yet been deployed to `https://soquibat.tn/`. The direct checks of `https://soquibat.tn/robots.txt` (which returned unrelated Laravel setup instructions) and `/sitemap.xml` (404) describe the existing `.tn` host response, not the Vercel test deployment. They are not evidence about Vercel. Conversely, the Vercel route/robots/sitemap results above must not be assumed to describe the existing `.tn` website.

Treat `.tn` observations only as a pre-launch domain/deployment handoff: once the new site is ready to replace or coexist with the current `.tn` site, verify DNS, hosting ownership, routing, and redirects with the responsible team, then test robots, sitemap, canonical host, and important URLs on the actual target deployment. Do not overwrite or change the existing domain configuration based on this test-site audit.

The repository still contains no `public/robots.txt` or sitemap, consistent with the Vercel 404 responses. The Vercel rewrite has been added locally but its deployed effect remains unverified until redeployment. Lighthouse, CrUX, Search Console, Analytics, backlink, ranking, and keyword-volume data were not available. Performance, indexing, and route metadata still need verification after the deployment fix.

## 2. Keyword architecture and intent map

Use one primary commercial intent per page. Include natural French variants and technical synonyms in useful copy; do not create near-identical doorway pages for every spelling, grade, city, or acronym. Accents may be omitted in query research, but use standard French spelling in page copy and headings.

### Core landing-page map

| Page / route | Primary query cluster | Supporting queries and intent | Priority |
|---|---|---|---|
| Home `/` | `fournisseur acier Tunisie`, `sidérurgie Tunisie`, `SOQUIBAT` | `vente acier Tunisie`, `produits métallurgiques Tunisie`, `fournisseur produits métallurgiques Tunisie`; commercial and navigational | P1 |
| Catalogue `/produits` | `produits métallurgiques Tunisie` | `matériaux de construction Tunisie` (broad; support only if page clearly qualifies), `catalogue acier Tunisie`, `prix acier Tunisie`; category discovery | P1 |
| Poutrelles | `poutrelle acier Tunisie` | `poutrelle HEB Tunisie prix`, `poutrelle HEA`, `IPE Tunisie`, `IPN Tunisie`, `UPN acier`; quote/commercial | P1 |
| Tôles | `tôle acier Tunisie` | `tôle galvanisée Tunisie`, `tôle inox`, `tôle striée`, `tôle laminée à chaud Tunisie`; quote/commercial | P1 |
| Tubes soudés | `tube acier Tunisie` | `tube carré acier Tunisie`, `tube rectangulaire acier`, `tube rond acier`, `tube galvanisé Tunisie`; quote/commercial | P1 |
| Panneaux sandwich & portes frigorifiques | `panneau sandwich Tunisie` | `prix panneau sandwich Tunisie`, `panneau sandwich toiture`, `porte frigorifique Tunisie`, `porte chambre froide`; quote/commercial | P1 |
| Lames rideaux et accessoires | `lame rideau métallique Tunisie` | `lame finale rideau`, `lame perforée`, `accessoires porte métallique`; commercial | P2 |
| Pannes C et Z | `panne C Z Tunisie` | `profilé C acier`, `panne Z charpente métallique`, dimensions only when confirmed; commercial | P2 |
| Fer marchand | `fer marchand Tunisie` | `cornière acier Tunisie`, `fer plat`, `fer carré`, `fer rond`, `fer U`; commercial | P2 |
| Accessoires charpente | `accessoires charpente métallique Tunisie` | `caillebotis acier`, `chéneau métallique`, `faîtière acier`; commercial | P2 |
| Inox | `inox Tunisie` | `tube inox Tunisie`, `tôle inox Tunisie`, `cornière inox`, `fer plat inox`; commercial | P2 |
| Aluminium | `tôle aluminium Tunisie` | `tôle aluminium striée`, sheet dimensions only when confirmed; commercial | P2 |
| Aciers spéciaux | `acier spécial Tunisie` | `acier 42CD4 Tunisie`, `rond acier XC48`, `acier étiré`; commercial/technical | P2 |
| Découpe laser | `découpe laser métal Tunisie` | `découpe laser tôle Tunisie`, `découpe laser acier devis`; service/quote | P1 |
| Ossature métallique | `ossature métallique Tunisie` | `ossature plafond métallique`, `rail montant placo Tunisie`, `fourrure plafond`; commercial | P2 |
| Contact / quote | `devis acier Tunisie`, `contact fournisseur acier` | `SOQUIBAT téléphone`, `SOQUIBAT adresse`, verified city + product queries; lead intent | P1 |

`SOQUIBAT prix` is primarily navigational/commercial. Answer pricing intent with a transparent quote workflow and clear factors (grade, dimensions, quantity, cutting, transport, destination). Do not publish made-up prices. `Matériaux de construction Tunisie` is broad and may attract low-fit demand; qualify it through actual offerings rather than over-optimizing the home page for it.

### On-page target map and sample metadata

Keep titles concise, unique, product-first, and branded. Descriptions should accurately describe the offer and invite a quote; search engines may rewrite snippets. Examples are drafts and must be checked against actual inventory and services.

| Page | H1 | Suggested title | Suggested meta description |
|---|---|---|---|
| Home | Fournisseur de produits métallurgiques en Tunisie | `SOQUIBAT Group | Fournisseur acier en Tunisie` | `Découvrez les produits métallurgiques SOQUIBAT : poutrelles, tôles, tubes, panneaux sandwich et services de transformation. Contactez-nous pour un devis.` |
| Catalogue | Produits métallurgiques et acier | `Produits métallurgiques en Tunisie | SOQUIBAT` | `Consultez le catalogue SOQUIBAT : poutrelles, tôles, tubes acier, panneaux sandwich, inox et découpe laser. Demandez un devis adapté à votre projet.` |
| Poutrelles | Poutrelles acier HEB, HEA, IPE et UPN | `Poutrelles HEB, HEA, IPE en Tunisie | SOQUIBAT` | `Besoin de poutrelles acier en Tunisie ? Découvrez les profils disponibles et transmettez vos dimensions et quantités à SOQUIBAT pour un devis.` |
| Tôles | Tôles acier, galvanisées et inox | `Tôles acier et galvanisées en Tunisie | SOQUIBAT` | `Tôles laminées, galvanisées, striées et autres références selon disponibilité. Contactez SOQUIBAT avec l’épaisseur, le format et la quantité souhaités.` |
| Tubes | Tubes soudés carrés, ronds et rectangulaires | `Tubes acier carrés et soudés en Tunisie | SOQUIBAT` | `Consultez les sections de tubes soudés en acier et demandez un devis en précisant la forme, les dimensions, l’épaisseur et la quantité.` |
| Panneaux | Panneaux sandwich et portes frigorifiques | `Panneaux sandwich en Tunisie | SOQUIBAT` | `Solutions de panneaux sandwich et portes frigorifiques pour vos projets. Décrivez l’application, les dimensions et les besoins d’isolation pour un devis.` |
| Découpe laser | Découpe laser de pièces métalliques | `Découpe laser métal en Tunisie | SOQUIBAT` | `SOQUIBAT propose un service de découpe laser pour pièces métalliques. Envoyez matière, épaisseur, plan et quantité afin d’étudier votre demande.` |
| Contact | Contact et demande de devis | `Contact SOQUIBAT | Demande de devis acier` | `Contactez SOQUIBAT pour vos besoins en acier, métallurgie et transformation. Retrouvez les coordonnées vérifiées et envoyez votre demande de devis.` |

The example `Poutrelle HEB 200` title should only be used on a dedicated HEB 200 page if SOQUIBAT confirms this exact item and has useful unique content for it. The current data has category-level product pages, not verified size/SKU-level pages.

### Product-detail content template

- One visible, descriptive H1 naming the product family and Tunisia where natural.
- A concise original introduction: what is supplied, intended applications, and how to request a quote.
- H2 sections as appropriate: `Dimensions et caractéristiques`, `Nuances et normes`, `Applications`, `Disponibilité et livraison`, `Demander un devis`, `Documents techniques`.
- Publish dimensions, grades, standards (EN/NF/ISO), tolerances, certificates, stock, delivery terms, and technical files only after verification by product/quality owners. State when specifications vary by reference.
- Include related products with crawlable HTML links, breadcrumb navigation, real image alt text, and a clear quote CTA.
- Do not create a thin indexable page for every image/reference. Create an individual SKU/grade page only when it has unique, verified search value and stable stock/specification details.

### Supporting editorial cluster

Publish fewer, expert-reviewed resources rather than mass-producing generic keyword pages:

1. **Comment choisir une poutrelle HEB, HEA, IPE ou UPN ?** — profile use, reading dimensions, selection constraints, and request checklist; engineering caveat.
2. **Tôle galvanisée, laminée à chaud ou à froid : quelles différences ?** — process, corrosion considerations, applications, and limits.
3. **Comment choisir un panneau sandwich pour toiture ou chambre froide en Tunisie ?** — use case, insulation, facing, thickness, installation questions; no unsupported performance claims.
4. **Tube carré, rond ou rectangulaire : critères de choix pour un projet métallique** — dimensions, wall thickness, grade, load/design caveat.
5. **Préparer une demande de découpe laser métal : fichiers, matière, épaisseur et quantité** — practical checklist and quote CTA.
6. **Nuances S275JR et S355JR : comparaison et points à vérifier** — publish only after a qualified metallurgist validates standards, current product availability, and all claims.

Each guide links to relevant product pages and a quote/contact route. Add a named technical reviewer, reviewed/updated dates, original diagrams or downloadable documents, and citations for technical claims. Do not imply SOQUIBAT stocks a grade unless confirmed.

## 3. Technical SEO implementation blueprint

### Crawl, render, and index

1. **Resolve production ownership first:** confirm the deployment serving `soquibat.tn` is the intended application before replacing its robots or sitemap files.
2. Return a clean `robots.txt` at `/robots.txt`, with only necessary crawl directives and `Sitemap: https://soquibat.tn/sitemap.xml`. Keep important content and assets crawlable. `robots.txt` manages crawling; it is not a reliable noindex mechanism.
3. Generate `/sitemap.xml` from actual indexable production routes, with absolute HTTPS URLs, canonical URLs only, meaningful `lastmod` values, and no hash fragments, redirects, errors, duplicate parameters, or noindex URLs. Include product detail routes. Submit and monitor in Search Console.
4. Ensure every intended route returns a successful response and a useful rendered page. Unknown product slugs should return a real 404 response/page, not a success-shaped generic app shell.
5. Prefer SSR or static pre-rendering for home, catalogue, product details, contact, location pages, and published guides. At minimum verify that each route's rendered HTML contains its own title, description, canonical, H1, primary copy, links, and structured data. Google can render JavaScript, but rendering is a separate and potentially delayed stage and not every crawler executes it.
6. Set one self-referencing canonical per indexable page. Normalize host (`https` and one preferred hostname), trailing slash, case, and percent-encoded route conventions; 301 redirect duplicates. Avoid canonicalizing distinct useful product pages to `/produits`.
7. Keep filters, sorting, and tracking parameters out of the index unless they represent deliberate landing pages with unique content and canonical strategy. Do not block URLs needed to render the canonical page.
8. Configure Search Console for the domain property; submit the sitemap, inspect representative home/category/product/contact URLs, review indexing and enhancements, and monitor manual actions/security reports. Use Bing Webmaster Tools as a secondary channel.

### Head tags and social sharing

For every indexable route, render:

- Unique `<title>` and `meta name="description"`.
- Absolute, self-referencing `<link rel="canonical">`.
- Correct `<html lang>` (currently French content with `lang="en"` in source).
- Open Graph `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, plus Twitter/X card metadata using a crawlable, absolute image URL.
- A useful per-page share image; test WhatsApp, Facebook, and LinkedIn previews after deployment.
- No global `noindex`; only apply intentional route-specific robots directives.

### International targeting

- Keep French (`fr-TN`) as the primary version until a reviewed English product catalogue and lead journey exist.
- Do not add `en-TN` hreflang pointing to French pages. For each genuinely translated equivalent, provide fully qualified reciprocal alternate links (including self-reference) and a self-canonical on each localized page.
- Add `x-default` only for a real language-selection/fallback page. Keep locale switchers as crawlable links.
- Translate technical terminology with a qualified reviewer; separately research Arabic-script and Tunisian Arabic / Franco-Arabic query demand before investing. Do not mix languages artificially into French landing copy.

### Structured data

Use JSON-LD that matches visible, verified page content. Structured data can clarify entities; it does not guarantee rankings or rich-result display.

- **Home:** `Organization` (name, canonical URL, logo, verified sameAs social profiles, real contact details).
- **Real branch/location page:** `LocalBusiness` or an accurate subtype such as `Store`, with that location's actual name, address, telephone, hours, coordinates, URL, and image. Never use invented coordinates, a head-office address on every branch, or the parent company schema as a substitute for individual premises.
- **Product detail:** `Product` for a real identifiable product/reference with accurate name, description, image, category, and real identifiers when available. A price/availability `Offer` may only be included when that exact value is public, current, and visible to users.
- **Quote-only products:** do not fabricate `price`, `lowPrice`, `highPrice`, ratings, or stock. `AggregateOffer` is not a workaround for “price on request”; use a visible quote CTA and omit unsupported offer properties. A service page such as laser cutting can be described as a `Service`.
- **Product and location detail pages:** `BreadcrumbList` matching the visible breadcrumb trail.
- Validate in Rich Results Test and Schema Markup Validator, then verify rendered structured data in Search Console URL Inspection.

### Performance and Core Web Vitals

Measure actual mobile and desktop users at the 75th percentile, by template and country when data allows. Targets: **LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1**.

- Establish a Lighthouse/PageSpeed baseline for home, `/produits`, a long-reference product, contact, and future location pages under mobile throttling.
- Compress large images and serve AVIF/WebP plus responsive `srcset`/`sizes`; set intrinsic width/height. Prioritize the LCP hero/product image; do not lazy-load the LCP image. Lazy-load below-the-fold content.
- Audit current remote product-reference images for request latency, cache headers, failures, and image dimensions; use stable first-party delivery or a reliable CDN.
- Reduce initial JavaScript and animation work; split routes, defer non-critical scripts, and avoid shipping oversized image galleries above the fold.
- Preload only genuinely critical fonts/images; subset fonts, use `font-display: swap`, and limit third-party requests.
- Prevent layout shifts with reserved image/container dimensions, stable fonts, and correctly sized embedded media.
- Check field data in CrUX/Search Console after release; lab scores alone are not the final acceptance criterion.

## 4. Local SEO and branch programme

### Ground-truth branch register

Before optimizing “15+ comptoirs,” operations must deliver one authoritative record per customer-facing branch:

`branch_id, public_name, legal_entity, full_address, governorate, city, postal_code, latitude, longitude, local_phone, opening_hours, landing_page, primary_category, services/products, photos, opening_status, GBP_URL, source_of_truth, last_verified`.

The checked repository only provides the Ariana head-office address. It does not support 15+ Tunisia location records. Do not publish locations or profiles until each is confirmed as a real staffed location serving customers.

### Google Business Profile checklist

- Claim/verify one profile per eligible real location; remove duplicates and do not use virtual offices or unstaffed addresses.
- Use the real-world business name without keyword stuffing. Choose the closest accurate primary/secondary categories.
- Keep address, local phone, hours/holiday hours, URL, and service description consistent across the site, GBP, invoices/directories, and signage.
- Create a useful location landing page for each confirmed branch with unique access details, products/services actually available, map/directions, phone, hours, and local quote CTA.
- Add authentic, recent exterior/interior/team/product photos with descriptive filenames and alt text on the site. Maintain an ethical review request process for all customers; never buy reviews, gate review requests, or offer rewards for positive ratings.
- Respond to reviews professionally without exposing customer or project-confidential details. Track GBP calls, website clicks, direction requests, and qualified quote leads with UTMs where supported.
- Monitor duplicate/suspension issues and update profiles when address, hours, or operating status changes.

### Location-page targeting

Create location pages only for verified branches and genuine local service coverage. Example pattern: `/points-de-vente/ariana/`, `/points-de-vente/sousse/` only if a real branch exists. Target a combined intent such as `fournisseur acier [ville]` and relevant product terms, but include unique local proof and branch information. Do not make mass-generated city doorway pages.

## 5. Measurement and operating plan

### 0–30 days: fix preview crawling and establish truth

- Redeploy the added `vercel.json` SPA fallback, then retest direct routes such as `/produits`, `/produits/Poutrelles`, and `/contact`; publish valid robots/sitemap endpoints and verify all sitemap destinations before further indexing work.
- Audit the Vercel preview for route metadata, canonicals, and mobile experience after the deployment fix.
- Confirm the eventual canonical domain and deployment owner. After launch planning, verify the target domain's existing setup and coordinate any robots, sitemap, DNS, or redirect changes with its owner.
- Verify domain ownership and current sitemap/index coverage in Search Console.
- Set `lang="fr-TN"` and agree on the French-first content policy.
- Build the verified product, specification, price/quote, branch, and contact fact sheet.
- Instrument quote submissions, telephone/email clicks, product-page engagement, and brochure downloads (if present); connect GA4 or an equivalent privacy-compliant analytics setup.
- Record baseline query/page impressions, clicks, CTR, average position, index coverage, and lead conversions.

### 31–60 days: technical templates and highest-intent pages

- Implement SSR/pre-rendering or another verified route-rendering approach.
- Add per-route titles, descriptions, canonicals, OG tags, sitemap routes, and breadcrumbs.
- Improve `/produits` and the top commercial product templates (poutrelles, tôles, tubes, panels, laser cutting) with approved technical detail and prominent quote paths.
- Fix broken/misconfigured product images; compress major image assets.
- Build and validate organization and product JSON-LD only for facts actually published.

### 61–90 days: local and content rollout

- Launch branch landing pages and GBP optimization after receiving the verified branch register.
- Publish two or three technical guides reviewed by SOQUIBAT product/engineering staff.
- Improve related-product links and guide-to-product-to-quote internal paths.
- Re-measure mobile CWV and Search Console indexing; prioritize issues affecting the highest-intent URLs.

### Quarterly

- Re-map queries to landing pages using Search Console. Find pages with impressions but weak CTR, high impressions but low positions, and high traffic but low qualified leads.
- Expand only proven query clusters; merge overlapping pages and repair cannibalization.
- Refresh specs, availability, certificates, delivery information, branch hours, and editorial content from accountable owners.
- Review backlinks, competitor SERP changes, local profile quality, CWV field data, and quote conversion by landing page.

### KPIs

- Qualified organic quote requests and phone/email leads (primary outcome).
- Organic conversions and conversion rate by landing page/product/location.
- Search Console non-brand clicks/impressions/CTR/position for target clusters.
- Indexed/canonical product and location URLs; sitemap processing; crawl errors.
- Number of verified, complete, active eligible GBP profiles (not a target profile count unsupported by operations).
- Mobile CWV pass rate at the 75th percentile and image/page-weight trends.
- Guide-assisted conversions and internal click-through to product/quote pages.

## 6. Research inputs still required

1. Search Console access and at least 12 months of query/page/country/device data.
2. Keyword Planner or another Tunisia-capable keyword dataset; validate French, Arabic-script, and transliterated demand rather than assuming volumes.
3. Current Analytics/CRM data tying organic landing pages to qualified quotes and eventual sales.
4. Confirmed branch register, GBP ownership, service territories, and public contact details.
5. Product master data: grades, standards, dimensions, tolerances, certificates, stock status, delivery, technical PDFs, and quote/pricing policy.
6. Production route/HTTP status inventory, rendered-HTML crawl, robots/sitemap response and redirect testing, CWV/PageSpeed baselines, and image URL checks.
7. Competitor SERP review for priority product/city clusters and a qualified backlink/citation gap analysis.

## Reference documentation

- [Google: JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)
- [Google: robots.txt introduction](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google: sitemap overview](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview)
- [Google: localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: Product structured data](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: Breadcrumb structured data](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
