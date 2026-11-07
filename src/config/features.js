// src/config/features.js
// Interruptores de funcionalidades del sitio.

export const FEATURES = {
  /**
   * FEATURE-12 — Sistemas de gestión (Odoo / Dux).
   * true  → el hero muestra las puertas Odoo/Dux centradas y oculta visualmente
   *         la marca (ONGEVAG, rol y descripción quedan como texto para SEO y
   *         lectores de pantalla). Services muestra la tarjeta "Sistemas de gestión".
   * false → alianza terminada: el hero vuelve a mostrar la marca, sin puertas; Services sin
   *         esa tarjeta; /odoo y /dux (y /en, /pt) redirigen a la home del mismo idioma; el build
   *         deja de incluirlas en el sitemap y de generar su HTML estático. No se captan más leads.
   */
  solutions: true,
};
