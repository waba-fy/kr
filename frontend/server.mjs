import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render } from './server-build/entry-server.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), 'dist');
const api = (process.env.PUBLIC_API_URL || 'https://api.keyroutes.co/api').replace(/\/$/, '');
const pages = new Set(['/', '/strategy', '/strategy-consulting', '/services', '/supporting-services', '/products', '/product-solutions', '/about', '/careers', '/success-stories', '/case-studies', '/reviews-feedback', '/terms', '/privacy-policy', '/cookies-policy']);
const sections = ['services', 'strategy', 'products', 'about', 'careers', 'reviews', 'success-stories', 'case-studies', 'client-stories'];
const types = {'.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.svg':'image/svg+xml', '.webp':'image/webp', '.ico':'image/x-icon', '.woff2':'font/woff2', '.pdf':'application/pdf'};
const template = await readFile(resolve(root, '../server-build/index.html'), 'utf8');
async function getPublic(path) {
  const response = await fetch(`${api}${path}`, {signal: AbortSignal.timeout(10000)});
  if (!response.ok) throw new Error('Public content unavailable');
  return response;
}
export async function loadContent() {
  const entries = await Promise.all(sections.map(async section => {
    const result = await (await getPublic(`/content/${section}`)).json();
    if (!Array.isArray(result.data)) throw new Error('Invalid public content');
    return [section, result.data.map(entry => entry.data)];
  }));
  const jobs = await (await getPublic('/public/jobs')).json();
  if (!Array.isArray(jobs.data)) throw new Error('Invalid jobs');
  return {...Object.fromEntries(entries), __jobs: jobs.data.map(job => ({role:job.title, type:job.employmentType, location:job.location, desc:job.summary || job.description, skills:Array.isArray(job.skills) ? job.skills : []}))};
}
const slug = value => String(value || '').trim().replace(/^\/+/, '').replace(/^(?:case-studies|success-stories)\//, '').replace(/\/+$/, '');
export function publicStatus(path, content) {
  if (pages.has(path)) return 200;
  const match = path.match(/^\/(case-studies|success-stories)\/([^/]+)$/);
  if (!match) return 404;
  const collection = content[match[1] === 'case-studies' ? 'case-studies' : 'client-stories'];
  return collection.some(item => slug(item.slug) === match[2]) ? 200 : 404;
}
const send = (res, status, body, type='text/html; charset=utf-8') => { res.writeHead(status, {'Content-Type':type, 'X-Content-Type-Options':'nosniff', 'Cache-Control':'no-store'}); res.end(body); };
export const server = http.createServer(async (req, res) => {
  try {
    if (!['GET','HEAD'].includes(req.method)) return send(res,405,'Method not allowed','text/plain');
    const url = new URL(req.url, 'https://keyroutes.co');
    const path = decodeURIComponent(url.pathname);
    if (path.includes('\\') || path.includes('..')) return send(res,404,'Not found','text/plain');
    if (['/sitemap.xml','/robots.txt','/llms.txt'].includes(path)) {
      const response = await getPublic(`/public${path}`);
      return send(res,200,await response.text(),path.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8');
    }
    if (extname(path) && types[extname(path)] && !path.startsWith('/server/')) {
      const asset = resolve(root, `.${path}`);
      if (!asset.startsWith(`${root}/`)) return send(res,404,'Not found','text/plain');
      try { const data = await readFile(asset); res.writeHead(200, {'Content-Type':types[extname(path)], 'Cache-Control':path.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'public, max-age=300', 'X-Content-Type-Options':'nosniff'}); return res.end(data); }
      catch { return send(res,404,'Not found','text/plain'); }
    }
    if (path === '/thank-you' || /^\/(admin|client)(?:\/|$)/.test(path)) return send(res,200,template.replace(/<title>.*?<\/title>/s,'<title>KeyRoutes Portal</title><meta name="robots" content="noindex, nofollow" />'));
    const content = await loadContent();
    const status = publicStatus(path,content);
    const {body,head} = render(path,content);
    const seed = JSON.stringify(content).replace(/</g,'\\u003c');
    const html = template.replace(/<title>.*?<\/title>/s,head).replace('<div id="root"></div>',`<div id="root">${body}</div><script id="kr-public-content" type="application/json">${seed}</script>`);
    return send(res,status,html);
  } catch (error) {
    console.error('Public rendering failed:', error.message);
    res.setHeader('Retry-After','60');
    return send(res,503,'<!doctype html><html lang="en"><head><title>KeyRoutes temporarily unavailable</title><meta name="robots" content="noindex" /></head><body><h1>Temporarily unavailable</h1><p>Please try again shortly.</p></body></html>');
  }
});
server.listen(process.env.PORT || 3000);
