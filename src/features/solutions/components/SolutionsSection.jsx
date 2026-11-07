import { useEffect, useRef, useState } from 'react';
import { useLocale } from '../../../hooks/useLocale';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import PathSwitch from './PathSwitch';
import SolutionCarousel from './SolutionCarousel';

// ADR-015: el contenido llega en un chunk por locale, solo cuando se abre la presentación.
const LOADERS = {
  es: () => import('../data/slides.es.js'),
  en: () => import('../data/slides.en.js'),
  pt: () => import('../data/slides.pt.js'),
};

/**
 * Encabezado + switch Odoo/Dux + carrusel.
 * @param {'odoo'|'dux'} path         camino visible (controlado por el padre)
 * @param {(p) => void} onPathChange
 * @param {'home'|'direct'} entry     para GA4
 * @param {'home'|'page'} variant      home: h2 propio y slides h3 · page: slides h2 (el h1 es de la página)
 * @param {number} focusToken          al cambiar, hace scroll y foco al heading (apertura desde una puerta)
 */
export default function SolutionsSection({ path, onPathChange, entry = 'home', variant = 'home', focusToken = 0 }) {
  const { locale, t } = useLocale();
  const s = t.solutions;
  const reduced = useReducedMotion();
  const [deck, setDeck] = useState({ locale: null, slides: null });
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    let alive = true;
    LOADERS[locale]?.().then((m) => alive && setDeck({ locale, slides: m.slides }));
    return () => {
      alive = false;
    };
  }, [locale]);

  const ready = deck.locale === locale && deck.slides;

  useEffect(() => {
    if (!focusToken || variant !== 'home') return;
    sectionRef.current?.scrollIntoView?.({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [focusToken, variant, reduced]);

  const isHome = variant === 'home';
  const headingId = 'soluciones-titulo';

  return (
    <section
      ref={sectionRef}
      id={isHome ? 'soluciones' : undefined}
      aria-labelledby={isHome ? headingId : undefined}
      // lg+: la sección ocupa exactamente la pantalla menos el menú (h-20) — "fit to viewport".
      // Mobile queda como estaba (alto según contenido).
      className={`bg-[#EEE0C9] scroll-mt-20 ${isHome ? 'py-16 md:py-20' : 'pb-16 md:pb-20'} lg:py-4 lg:h-[calc(100dvh-5rem)] lg:min-h-[560px] lg:flex lg:flex-col`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl space-y-8 lg:space-y-3 lg:flex-1 lg:min-h-0 lg:flex lg:flex-col">
        {isHome ? (
          <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 lg:items-center lg:gap-4">
            <div className="space-y-3 max-w-2xl lg:max-w-none lg:space-y-0 lg:flex lg:items-baseline lg:gap-4 lg:flex-wrap">
              <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2C3340] text-[#F1F0E8] text-xs font-medium tracking-widest uppercase lg:hidden">
                {s.section.badge}
              </p>
              <h2 id={headingId} ref={headingRef} tabIndex={-1} className="font-display text-3xl md:text-4xl lg:text-2xl font-bold text-[#2C3340] focus:outline-none">
                {s.section.title}
              </h2>
              <p className="text-lg lg:text-sm text-[#4B5563]">{s.section.lead}</p>
            </div>
            <PathSwitch path={path} onChange={onPathChange} label={s.section.switchLabel} labels={s.section.switch} />
          </header>
        ) : (
          <PathSwitch path={path} onChange={onPathChange} label={s.section.switchLabel} labels={s.section.switch} />
        )}

        {ready ? (
          <SolutionCarousel
            // Remonta (vuelve al slide 1) al cambiar de camino y en cada apertura desde una puerta,
            // aunque sea la misma puerta (FR-02).
            key={`${path}-${focusToken}`}
            path={path}
            slides={deck.slides[path]}
            headingLevel={isHome ? 3 : 2}
            entry={entry}
            onSwitchPath={onPathChange}
          />
        ) : (
          <p role="status" className="min-h-[30rem] lg:min-h-0 lg:flex-1 text-[#4B5563]">{s.section.loading}</p>
        )}

        <p className="text-xs lg:text-[11px] text-[#4B5563] max-w-3xl lg:max-w-none lg:truncate" title={s.disclaimer}>{s.disclaimer}</p>
      </div>
    </section>
  );
}
