// FEATURE-12 — Integridad de datos de slides y locales (AC-13, AC-21).
import { describe, it, expect } from 'vitest';
import { slides as es } from '../data/slides.es';
import { slides as en } from '../data/slides.en';
import { slides as pt } from '../data/slides.pt';
import solutionsEs from '../../../locales/es/solutions';
import solutionsEn from '../../../locales/en/solutions';
import solutionsPt from '../../../locales/pt/solutions';
import { buildRef, REF_PATTERN, SLIDE_COUNT, SOLUTION_PATHS } from '../utils/whatsapp';

const byLocale = { es, en, pt };
const SOURCE_HOSTS = ['www.odoo.com', 'odoo.com', 'www.duxsoftware.com.ar', 'duxsoftware.com.ar'];
const shape = (deck) => deck.map(({ id, ref, type }) => ({ id, ref, type }));

const keyPaths = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' && !Array.isArray(v) ? keyPaths(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  ).sort();

describe('slides — estructura', () => {
  SOLUTION_PATHS.forEach((p) => {
    it(`${p}: cantidad de slides y refs correctos en ES`, () => {
      expect(es[p]).toHaveLength(SLIDE_COUNT[p]);
      es[p].forEach((slide, i) => {
        expect(slide.ref).toMatch(REF_PATTERN);
        expect(slide.ref).toBe(buildRef(p, i + 1));
      });
    });

    it(`${p}: EN y PT espejan id/ref/type de ES`, () => {
      expect(shape(en[p])).toEqual(shape(es[p]));
      expect(shape(pt[p])).toEqual(shape(es[p]));
    });
  });

  it('no hay refs duplicados', () => {
    const refs = [...es.odoo, ...es.dux].map((s) => s.ref);
    expect(new Set(refs).size).toBe(refs.length);
  });

  it.each(Object.keys(byLocale))('%s: capítulos cortos (≤ 18 caracteres)', (l) => {
    [...byLocale[l].odoo, ...byLocale[l].dux].forEach((s) => {
      expect(s.chapter.length, s.chapter).toBeLessThanOrEqual(18);
    });
  });

  it.each(Object.keys(byLocale))('%s: toda cifra tiene fuente oficial y verifiedAt válido o null', (l) => {
    [...byLocale[l].odoo, ...byLocale[l].dux]
      .flatMap((s) => s.facts ?? [])
      .forEach((f) => {
        expect(SOURCE_HOSTS).toContain(new URL(f.source.url).hostname);
        if (f.source.verifiedAt !== null) {
          expect(f.source.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        }
      });
  });

  it('el verifiedAt de cada cifra coincide entre locales', () => {
    const facts = (d) => [...d.odoo, ...d.dux].flatMap((s) => s.facts ?? []).map((f) => [f.id, f.source.verifiedAt]);
    expect(facts(en)).toEqual(facts(es));
    expect(facts(pt)).toEqual(facts(es));
  });
});

describe('locales solutions.js', () => {
  it('EN y PT tienen las mismas claves que ES', () => {
    expect(keyPaths(solutionsEn)).toEqual(keyPaths(solutionsEs));
    expect(keyPaths(solutionsPt)).toEqual(keyPaths(solutionsEs));
  });

  it.each([['es', solutionsEs], ['en', solutionsEn], ['pt', solutionsPt]])(
    '%s: las plantillas de WhatsApp incluyen {product} y {ref}',
    (_, t) => {
      ['messageSlide', 'messageDoor'].forEach((k) => {
        expect(t.whatsapp[k]).toContain('{product}');
        expect(t.whatsapp[k]).toContain('(ref: {ref})');
      });
    }
  );
});
