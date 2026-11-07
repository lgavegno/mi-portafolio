import { useLocale } from '../../../../hooks/useLocale';
import SlideHeader from './SlideHeader';
import WhatsAppCTA from '../WhatsAppCTA';

export default function SlideContact({ slide, path, level, tracking }) {
  const { t } = useLocale();
  return (
    <div className="flex flex-col items-start justify-center gap-8 min-h-[18rem]">
      <SlideHeader slide={slide} path={path} level={level} />
      <WhatsAppCTA path={path} refCode={slide.ref} variant="large" onClick={tracking?.trackWhatsApp} />
      <p className="text-xs text-[#4B5563] max-w-2xl">{t.solutions.disclaimer}</p>
    </div>
  );
}
