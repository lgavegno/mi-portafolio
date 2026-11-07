// FEATURE-12 — Exclusiones de contenido (spec §2, AC-19/20/22).
// Los términos sensibles del partner NO se escriben acá (repo público):
// se leen de docs/reference/forbidden-terms.json, ignorado por git, si existe.
import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { WHATSAPP_NUMBER } from '../../../config/contact';

const root = process.cwd();
const LOCALES = ['es', 'en', 'pt'];
const files = [
  ...LOCALES.map((l) => `src/features/solutions/data/slides.${l}.js`),
  ...LOCALES.map((l) => `src/locales/${l}/solutions.js`),
];
const read = (f) => fs.readFileSync(path.join(root, f), 'utf-8');

// Armados por partes para que este archivo no contenga los términos literales.
const PUBLIC_FORBIDDEN = [
  ['Stu', 'dio'].join(''),
  ['Sil', 'ver'].join(''),
  ['odoo', 'cdn'].join(''),
  '+50 empresas',
  '+10 años',
];

const ALLOWED_HOSTS = ['www.odoo.com', 'odoo.com', 'www.duxsoftware.com.ar', 'duxsoftware.com.ar', 'wa.me'];

const privateList = (() => {
  const p = path.join(root, 'docs/reference/forbidden-terms.json');
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, 'utf-8')).terms ?? [];
})();

describe('contenido de soluciones — exclusiones', () => {
  it.each(files)('%s no contiene términos públicos prohibidos', (f) => {
    const text = read(f);
    PUBLIC_FORBIDDEN.forEach((term) => {
      expect(text.includes(term), `"${term}" en ${f}`).toBe(false);
    });
  });

  it.each(files)('%s solo enlaza dominios permitidos', (f) => {
    const urls = read(f).match(/https?:\/\/[^\s'"`)]+/g) ?? [];
    urls.forEach((u) => {
      expect(ALLOWED_HOSTS, u).toContain(new URL(u).hostname);
    });
  });

  it.each(files)('%s no contiene otros números de teléfono', (f) => {
    const phones = read(f).match(/\d[\d\s-]{9,}\d/g) ?? [];
    phones
      .map((p) => p.replace(/\D/g, ''))
      .filter((p) => p.length >= 10)
      .forEach((p) => expect(p).toBe(WHATSAPP_NUMBER));
  });

  it.skipIf(!privateList)('no aparece ningún término de la lista privada', () => {
    files.forEach((f) => {
      const text = read(f).toLowerCase();
      privateList.forEach((term) => {
        expect(text.includes(term.toLowerCase()), `término privado en ${f}`).toBe(false);
      });
    });
  });
});
