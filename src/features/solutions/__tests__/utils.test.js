import { describe, it, expect } from 'vitest';
import { formatTemplate } from '../utils/formatTemplate';
import { buildRef, buildWhatsAppUrl, REF_PATTERN } from '../utils/whatsapp';
import { resolveSwipe } from '../utils/swipe';
import { WHATSAPP_NUMBER } from '../../../config/contact';

describe('formatTemplate', () => {
  it('reemplaza claves', () => {
    expect(formatTemplate('Hola {a}, ref {b}', { a: 'Leo', b: 'X' })).toBe('Hola Leo, ref X');
  });
  it('deja intactas las claves faltantes', () => {
    expect(formatTemplate('Hola {a} {b}', { a: 1 })).toBe('Hola 1 {b}');
  });
  it('devuelve string vacío si no es string', () => {
    expect(formatTemplate(undefined)).toBe('');
  });
});

describe('buildRef', () => {
  it('arma refs de slides', () => {
    expect(buildRef('odoo', 1)).toBe('ODOO-S1');
    expect(buildRef('odoo', 7)).toBe('ODOO-S7');
    expect(buildRef('dux', 5)).toBe('DUX-S5');
  });
  it('arma refs de puertas', () => {
    expect(buildRef('hero', 'odoo')).toBe('HERO-ODOO');
    expect(buildRef('hero', 'dux')).toBe('HERO-DUX');
  });
  it('rechaza entradas inválidas', () => {
    expect(() => buildRef('odoo', 8)).toThrow();
    expect(() => buildRef('dux', 0)).toThrow();
    expect(() => buildRef('sap', 1)).toThrow();
    expect(() => buildRef('hero', 'sap')).toThrow();
  });
  it('todos los refs posibles cumplen el patrón', () => {
    const refs = [
      ...[1, 2, 3, 4, 5, 6, 7].map((n) => buildRef('odoo', n)),
      ...[1, 2, 3, 4, 5].map((n) => buildRef('dux', n)),
      buildRef('hero', 'odoo'),
      buildRef('hero', 'dux'),
    ];
    refs.forEach((r) => expect(r).toMatch(REF_PATTERN));
    expect(new Set(refs).size).toBe(14);
  });
});

describe('buildWhatsAppUrl', () => {
  it('usa el número central y codifica el mensaje', () => {
    const url = buildWhatsAppUrl('Hola Leo (ref: ODOO-S4)');
    expect(url).toBe(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola%20Leo%20(ref%3A%20ODOO-S4)`);
  });
});

describe('resolveSwipe', () => {
  it('siguiente al arrastrar a la izquierda', () => {
    expect(resolveSwipe(-50, 0)).toBe(1);
    expect(resolveSwipe(-10, -600)).toBe(1);
  });
  it('anterior al arrastrar a la derecha', () => {
    expect(resolveSwipe(80, 0)).toBe(-1);
    expect(resolveSwipe(5, 700)).toBe(-1);
  });
  it('sin cambio por debajo de los umbrales', () => {
    expect(resolveSwipe(-49, -499)).toBe(0);
    expect(resolveSwipe(0, 0)).toBe(0);
    expect(resolveSwipe()).toBe(0);
  });
});
