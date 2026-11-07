import { WHATSAPP_NUMBER } from '../../../config/contact';

export const SOLUTION_PATHS = ['odoo', 'dux'];

/** Cantidad de slides por camino (spec §8). */
export const SLIDE_COUNT = { odoo: 7, dux: 5 };

export const REF_PATTERN = /^(ODOO-S[1-7]|DUX-S[1-5]|HERO-(ODOO|DUX))$/;

/**
 * Arma el código de atribución.
 * buildRef('odoo', 4)    → 'ODOO-S4'
 * buildRef('hero', 'dux') → 'HERO-DUX'
 */
export function buildRef(source, value) {
  if (source === 'hero') {
    if (!SOLUTION_PATHS.includes(value)) throw new Error(`Camino inválido: ${value}`);
    return `HERO-${value.toUpperCase()}`;
  }
  if (!SOLUTION_PATHS.includes(source)) throw new Error(`Camino inválido: ${source}`);
  if (!Number.isInteger(value) || value < 1 || value > SLIDE_COUNT[source]) {
    throw new Error(`Slide inválido para ${source}: ${value}`);
  }
  return `${source.toUpperCase()}-S${value}`;
}

/** URL de wa.me con el mensaje precargado. */
export function buildWhatsAppUrl(message, number = WHATSAPP_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message ?? '')}`;
}
