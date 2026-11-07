import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiShoppingBag, FiLayers } from 'react-icons/fi';
import { useLocale } from '../../../hooks/useLocale';
import { LOCALE_PREFIX } from '../../../utils/seoLocale';
import { trackDoorClick } from '../hooks/useSolutionTracking';
import { trackEvent } from '../../../utils/trackEvent';
import { buildRef } from '../utils/whatsapp';
import { formatTemplate } from '../utils/formatTemplate';
import WhatsAppCTA from './WhatsAppCTA';
import { ACCENT, FOCUS_RING } from './accent';

const DOORS = [
  { path: 'dux', Icon: FiShoppingBag },
  { path: 'odoo', Icon: FiLayers },
];

/**
 * Franja "¿Tu empresa necesita un sistema de gestión?" del hero (spec §3.2). Eager: solo texto e íconos.
 * @param {(path) => void} [onOpen]  abre la sección en la home; sin él, navega a /odoo o /dux.
 * @param {boolean} [centered]  encabezado centrado (hero en modo soluciones).
 */
export default function SolutionDoors({ onOpen, centered = false }) {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const d = t.solutions.doors;

  const open = (path) => {
    trackDoorClick(path, locale);
    if (onOpen) onOpen(path);
    else navigate(`${LOCALE_PREFIX[locale] ?? ''}/${path}`);
  };

  return (
    <div className={`space-y-4 max-w-2xl ${centered ? 'mx-auto w-full' : ''}`} data-testid="solution-doors">
      <div className={centered ? 'text-center' : undefined}>
        <p className="font-display text-xl md:text-2xl font-semibold text-[#2C3340]">{d.heading}</p>
        <p className="text-sm md:text-base text-[#4B5563] mt-1">{d.lead}</p>
      </div>
      {/* lg: una columna (el hero usa media pantalla); xl: dos */}
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {DOORS.map(({ path, Icon }) => {
          const door = d[path];
          return (
            <li
              key={path}
              className={`flex items-stretch rounded-xl bg-[#F1F0E8] border-l-4 ${ACCENT[path].border} border-y border-r border-y-[#2C3340]/10 border-r-[#2C3340]/10 hover:shadow-md transition-shadow motion-reduce:transition-none`}
            >
              <button
                type="button"
                onClick={() => open(path)}
                className={`group flex-1 min-w-0 text-left px-4 py-2.5 sm:py-3 rounded-l-lg ${FOCUS_RING}`}
              >
                <span className="block text-xs text-[#4B5563]">{door.question}</span>
                <span className={`sm:mt-1 flex items-center gap-2 font-display text-lg sm:text-xl font-bold ${ACCENT[path].text}`}>
                  <Icon aria-hidden="true" className="w-5 h-5" />
                  {door.product}
                  {/* Mobile: flecha en lugar de la fila "Ver presentación" (puerta más baja) */}
                  <FiArrowRight aria-hidden="true" className="sm:hidden w-4 h-4 text-[#2C3340]" />
                </span>
                <span className="block text-sm text-[#2C3340] leading-snug">
                  <span className="sr-only">: </span>
                  {door.pitch}
                </span>
                <span className="mt-2 hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#2C3340]">
                  {door.cta}
                  <FiArrowRight aria-hidden="true" className="w-4 h-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" />
                </span>
              </button>
              <div className="flex items-center sm:items-end p-2.5 sm:p-3">
                <WhatsAppCTA
                  path={path}
                  refCode={buildRef('hero', path)}
                  messageKey="messageDoor"
                  variant="icon"
                  ariaLabel={formatTemplate(d.whatsappAria, { product: door.product })}
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
