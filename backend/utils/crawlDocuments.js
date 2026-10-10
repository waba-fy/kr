const BASE = 'https://keyroutes.co';
const routes = ['/', '/strategy', '/strategy-consulting', '/services', '/supporting-services', '/products', '/product-solutions', '/about', '/careers', '/success-stories', '/case-studies', '/reviews-feedback', '/terms', '/privacy-policy', '/cookies-policy'];
const escapeXml = value => String(value).replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[character]));
const slugFor = value => {
  const slug = String(value || '').trim().replace(/^\/?(?:case-studies|success-stories)\//, '');
  return /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/.test(slug) ? slug : '';
};
function publicPages(entries = []) {
  const pages = new Map(routes.map(route => [route, {route,title:route === '/' ? 'Home' : route.slice(1).replaceAll('-', ' ')}]));
  for (const entry of entries) {
    if (entry.isActive !== true) continue;
    const data = entry.data || {};
    const path = entry.section === 'case-studies' ? '/case-studies' : entry.section === 'client-stories' ? '/success-stories' : null;
    if (path) {
      const slug = slugFor(data.slug); if (!slug) continue;
      const route = `${path}/${slug}`;
      pages.set(route,{route,title:String(data.title || data.cover?.title || data.hero?.title || entry.title || slug),updatedAt:entry.updatedAt});
    }
    const collections = {'case-studies':'/case-studies','client-stories':'/success-stories','success-stories':'/success-stories',reviews:'/reviews-feedback',services:'/services',strategy:'/strategy',products:'/products',about:'/about',careers:'/careers'};
    const page = pages.get(collections[entry.section]);
    if (page && entry.updatedAt && (!page.updatedAt || new Date(entry.updatedAt) > new Date(page.updatedAt))) page.updatedAt = entry.updatedAt;
  }
  return [...pages.values()];
}
function sitemap(entries) {
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + publicPages(entries).map(page => {
    const date = page.updatedAt && new Date(page.updatedAt);
    const lastmod = date && !Number.isNaN(date.getTime()) ? `<lastmod>${date.toISOString()}</lastmod>` : '';
    return `  <url><loc>${escapeXml(BASE + page.route)}</loc>${lastmod}</url>`;
  }).join('\n') + '\n</urlset>\n';
}
function llms(entries) {
  const lines = publicPages(entries).map(page => `- [${page.title.replace(/[\[\]\r\n]/g,' ')}](${BASE + page.route})`);
  return '# KeyRoutes\n\n> Real estate strategy, performance marketing, websites, CRM and automation by Sixedge Innovations.\n\nKeyRoutes supports builders, developers and property businesses. Published case studies and client stories describe specific engagements; results vary by project.\n\n## Public website pages\n\n' + lines.join('\n') + '\n\n## Optional\n\n- [Sitemap](https://keyroutes.co/sitemap.xml): Published public pages.\n\nContact information is available on the About page. Admin and client portals, leads, subscribers, invoices and support tickets are private and excluded from this index.\n';
}
const robots = 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /client\nDisallow: /api/\nDisallow: /thank-you\n\nSitemap: https://keyroutes.co/sitemap.xml\n';
module.exports = {publicPages,sitemap,llms,robots};
