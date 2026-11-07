import { useCallback, useRef } from 'react';
import { trackEvent } from '../../../utils/trackEvent';
import { useLocale } from '../../../hooks/useLocale';

export function trackDoorClick(path, locale) {
  trackEvent('solution_door_click', { path, locale });
}

/**
 * Eventos GA4 de la presentación (spec §9).
 * `solution_slide_view` se emite una sola vez por ref mientras el componente que usa el hook esté montado.
 */
export function useSolutionTracking(entry) {
  const { locale } = useLocale();
  const seen = useRef(new Set());

  const trackSlideView = useCallback(
    (path, ref) => {
      if (seen.current.has(ref)) return;
      seen.current.add(ref);
      trackEvent('solution_slide_view', { path, slide: ref, locale, entry });
    },
    [locale, entry]
  );

  const trackWhatsApp = useCallback(
    (path, ref) => trackEvent('solution_whatsapp_click', { path, slide: ref, locale, entry }),
    [locale, entry]
  );

  return { trackSlideView, trackWhatsApp };
}
