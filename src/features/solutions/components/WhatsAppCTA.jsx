import { FaWhatsapp } from 'react-icons/fa';
import { useLocale } from '../../../hooks/useLocale';
import { formatTemplate } from '../utils/formatTemplate';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { FOCUS_RING } from './accent';

const VARIANTS = {
  primary:
    'inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-full bg-[#2C3340] text-[#F1F0E8] text-sm font-semibold hover:bg-[#1f2530] transition-colors',
  large:
    'inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-4 rounded-full bg-[#2C3340] text-[#F1F0E8] text-base font-semibold hover:bg-[#1f2530] transition-colors',
  icon:
    'inline-flex items-center justify-center shrink-0 w-11 h-11 rounded-full bg-[#2C3340] text-[#F1F0E8] hover:bg-[#1f2530] transition-colors',
  link:
    'inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#2C3340] underline underline-offset-4 decoration-[#2C3340]/40 hover:decoration-[#2C3340]',
};

/**
 * Link de WhatsApp con mensaje precargado y ref de atribución (spec §8).
 * @param {'odoo'|'dux'} path
 * @param {string} refCode  p. ej. 'ODOO-S4' o 'HERO-DUX'
 * @param {'messageSlide'|'messageDoor'} messageKey
 */
export default function WhatsAppCTA({ path, refCode, messageKey = 'messageSlide', variant = 'primary', label, ariaLabel, onClick, className = '' }) {
  const { t } = useLocale();
  const s = t.solutions;
  const message = formatTemplate(s.whatsapp[messageKey], { product: s.section.switch[path], ref: refCode });
  const text = label ?? s.whatsapp.cta;

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? (variant === 'link' ? undefined : s.whatsapp.ariaLabel)}
      data-ref={refCode}
      onClick={() => onClick?.(path, refCode)}
      className={`${VARIANTS[variant]} ${FOCUS_RING} ${className}`}
    >
      <FaWhatsapp aria-hidden="true" className={variant === 'link' ? 'w-4 h-4' : 'w-5 h-5'} />
      {variant !== 'icon' && <span>{text}</span>}
    </a>
  );
}
