import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendRoot = path.resolve(__dirname, "..");
const outputPath = path.join(
  frontendRoot,
  "public",
  "sitemap.xml"
);

const BASE_URL = "https://keyroutes.co";

const staticRoutes = [
  "/",
  "/strategy",
  "/strategy-consulting",
  "/services",
  "/supporting-services",
  "/products",
  "/product-solutions",
  "/about",
  "/careers",
  "/success-stories",
  "/reviews-feedback",
  "/market-reports",
  "/terms",
  "/privacy-policy",
  "/cookies-policy",
];

const routeSettings = {
  "/": {
    changefreq: "weekly",
    priority: "1.0",
  },
  "/strategy": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/strategy-consulting": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/services": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/supporting-services": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/products": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/product-solutions": {
    changefreq: "monthly",
    priority: "0.9",
  },
  "/about": {
    changefreq: "monthly",
    priority: "0.8",
  },
  "/careers": {
    changefreq: "weekly",
    priority: "0.8",
  },
  "/success-stories": {
    changefreq: "weekly",
    priority: "0.9",
  },
  "/reviews-feedback": {
    changefreq: "weekly",
    priority: "0.8",
  },
  "/market-reports": {
    changefreq: "weekly",
    priority: "0.9",
  },
  "/terms": {
    changefreq: "yearly",
    priority: "0.3",
  },
  "/privacy-policy": {
    changefreq: "yearly",
    priority: "0.3",
  },
  "/cookies-policy": {
    changefreq: "yearly",
    priority: "0.3",
  },
};

const today = new Date().toISOString().split("T")[0];

const escapeXml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const urlEntries = staticRoutes
  .map((route) => {
    const settings = routeSettings[route];

    return `  <url>
    <loc>${escapeXml(`${BASE_URL}${route}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${settings.changefreq}</changefreq>
    <priority>${settings.priority}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urlEntries}
</urlset>
`;

fs.mkdirSync(path.dirname(outputPath), {
  recursive: true,
});

fs.writeFileSync(outputPath, sitemap, "utf8");

console.log(
  `Sitemap generated successfully: ${outputPath}`
);