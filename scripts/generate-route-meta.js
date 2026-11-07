// scripts/generate-route-meta.js — FEATURE-12 (spec §5.3)
// Los crawlers de WhatsApp/redes no ejecutan JS: sin esto, /odoo y /dux mostrarían
// la vista previa de la home. Después de `vite build`, copia dist/index.html a
// dist/{,en/,pt/}{odoo,dux}/index.html con título, descripción y OG propios.
// No toca vercel.json: Vercel sirve archivos estáticos antes del rewrite catch-all.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import es from '../src/locales/es/solutions.js';
import en from '../src/locales/en/solutions.js';
import pt from '../src/locales/pt/solutions.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(__dirname, '../dist');
const LOCALES = { es: { t: es, prefix: '' }, en: { t: en, prefix: 'en' }, pt: { t: pt, prefix: 'pt' } };
const PATHS = ['odoo', 'dux'];

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${key.replace(':', '\\:')}"\\s+content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`No se encontró <meta ${attr}="${key}"> en dist/index.html`);
  return html.replace(re, `$1${esc(value)}$2`);
}

export function buildRouteHtml(base, locale, p) {
  const meta = LOCALES[locale].t.pages[p].meta;
  let html = base.replace(/<html lang="[^"]*"/, `<html lang="${locale}"`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`);
  html = setMeta(html, 'name', 'description', meta.description);
  html = setMeta(html, 'property', 'og:title', meta.ogTitle);
  html = setMeta(html, 'property', 'og:description', meta.ogDescription);
  html = setMeta(html, 'name', 'twitter:title', meta.ogTitle);
  html = setMeta(html, 'name', 'twitter:description', meta.ogDescription);
  return html;
}

function main() {
  const base = fs.readFileSync(path.join(dist, 'index.html'), 'utf-8');
  let count = 0;
  for (const [locale, { prefix }] of Object.entries(LOCALES)) {
    for (const p of PATHS) {
      const dir = path.join(dist, prefix, p);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, 'index.html'), buildRouteHtml(base, locale, p), 'utf-8');
      count++;
    }
  }
  console.log(`✓ Route meta: ${count} páginas estáticas de soluciones`);
}

main();
