# Frontend deployment

The frontend uses server rendering so descriptions, headings and structured data are present before JavaScript runs. Public content is fetched from the existing API on each request. Admin/client portals remain browser rendered and noindex. Missing or hidden public detail URLs return 404; unavailable public content returns 503.

Build: `npm ci` then `npm run build`.

Plesk Node.js application root: `/frontend-ssr`.
Document root: `/frontend-ssr/dist`.
Startup file: `app.cjs`.
Node.js: 24; application mode: production.
Install dependencies with `npm install --omit=dev` after extracting the deployment package. The package contains the prebuilt client `dist`, private `server-build`, `server.mjs`, `app.cjs`, and package files. Do not place server-build under the document root. Do not copy the static SPA `.htaccess`, `crawl.php`, or static sitemap/robots/llms documents into this Node deployment; the server supplies current crawler documents through the public API.

Optional backend URL setting: `PUBLIC_API_URL=https://api.keyroutes.co/api` (default). No MongoDB credentials or backend secrets belong in this frontend app.

After deployment, check raw HTML for each public page, both portals, sitemap.xml, robots.txt, llms.txt, and a missing detail URL. `/contact` is deliberately excluded.
