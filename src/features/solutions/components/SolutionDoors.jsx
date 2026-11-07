import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiLayers } from 'react-icons/fi';
import { useLocale } from '../../../hooks/useLocale';
import { LOCALE_PREFIX } from '../../../utils/seoLocale';
import { trackDoorClick } from '../hooks/useSolutionTracking';
import { trackEvent } from '../../../utils/trackEvent';
import { buildRef } from '../utils/whatsapp';
import WhatsAppCTA from './WhatsAppCTA';
import { ACCENT, FOCUS_RING } from './accent';

const DOORS = [
  { path: 'dux', Icon: FiShoppingBag },
  { path: 'odoo', Icon: FiLayers },
];

/**
 * Franja "¿Tu empresa necesita un sistema de gestión?" del hero (spec §3.2). Eager: solo texto e íconos.
 * @param {(path) => void} [onOpen]  abre la sección en la home; sin él, navega a /odoo o /dux.
 */
export default function SolutionDoors({ onOpen }) {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const d = t.solutions.doors;

  const open = (path) => {
    trackDoorClick(path, locale);
    if (onOpen) onOpen(path);
    else navigate(`${LOCALE_PREFIX[locale] ?? ''}/${path}`);
  };

  return (
    <div className="space-y-3 max-w-xl" data-testid="solution-doors">
      <div>
        <p className="font-display text-lg font-semibold text-[#2C3340]">{d.heading}</p>
        <p className="text-sm text-[#4B5563]">{d.lead}</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2">
        {DOORS.map(({ path, Icon }) => {
          const door = d[path];
          return (
            <li key={path} className={`rounded-xl bg-[#F1F0E8]/80 border-l-4 ${ACCENT[path].border} border-y border-r border-y-[#2C3340]/10 border-r-[#2C3340]/10`}>
              <button
                type="button"
                onClick={() => open(path)}
                aria-controls={onOpen ? 'soluciones' : undefined}
                className={`group w-full text-left px-4 pt-3 pb-2 rounded-t-xl ${FOCUS_RING}`}
              >
                <span className="block text-xs text-[#4B5563]">{door.question}</span>
                <span className={`flex items-center gap-2 font-display text-base font-bold ${ACCENT[path].text}`}>
                  <Icon aria-hidden="true" className="w-4 h-4" />
                  {door.product}
                  <span className="sr-only">: </span>
                  <span className="font-sans text-sm font-normal text-[#2C3340]">{door.pitch}</span>
                </span>
                <span className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-[#2C3340]">
                  {door.cta}
                  <FiArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
              </button>
              <div className="px-4 pb-1">
                <WhatsAppCTA
                  path={path}
                  refCode={buildRef('hero', path)}
                  messageKey="messageDoor"
                  variant="link"
                  label={d.whatsapp}
                  className="text-xs"
                  onClick={(p, ref) =>
                    // mismo evento que los slides, con slide = HERO-*
                    trackEvent('solution_whatsapp_click', { path: p, slide: ref, locale, entry: 'home' })
                  }
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
