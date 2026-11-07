// Clases literales por camino (Tailwind necesita strings completos).
// dux: el tono base solo para no-texto; texto y fondos con texto blanco usan dux-ink (spec §10).
export const ACCENT = {
  odoo: {
    text: 'text-odoo',
    solid: 'bg-odoo text-white',
    border: 'border-odoo',
    bar: 'bg-odoo',
    soft: 'bg-odoo/10',
    dot: 'bg-odoo',
    ring: 'focus-visible:ring-odoo',
  },
  dux: {
    text: 'text-dux-ink',
    solid: 'bg-dux-ink text-white',
    border: 'border-dux',
    bar: 'bg-dux',
    soft: 'bg-dux/10',
    dot: 'bg-dux',
    ring: 'focus-visible:ring-dux-ink',
  },
};

export const FOCUS_RING =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2C3340] focus-visible:ring-offset-[#EEE0C9]';
