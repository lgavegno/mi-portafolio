import { useLocale } from '../../../../hooks/useLocale';
import SlideHeader from './SlideHeader';
import { headingTag } from './headingTag';
import Bullets from './Bullets';
import { ACCENT, FOCUS_RING } from '../accent';

export default function SlideVersus({ slide, path, level, onSwitchPath }) {
  const { t } = useLocale();
  const H = headingTag(level + 1);
  const goLabel = { odoo: t.solutions.carousel.goToOdoo, dux: t.solutions.carousel.goToDux };

  return (
    <div className="space-y-6">
      <SlideHeader slide={slide} path={path} level={level} />
      <div className="grid gap-4 md:grid-cols-2">
        {slide.options.map((opt) => (
          <div key={opt.path} className={`p-5 rounded-xl bg-white/70 border-t-4 ${ACCENT[opt.path].border}`}>
            <H className={`font-display text-xl font-bold ${ACCENT[opt.path].text}`}>{opt.title}</H>
            <p className="font-medium text-[#2C3340] mt-1 mb-3">{opt.subtitle}</p>
            <Bullets points={opt.points} path={opt.path} className="text-sm" />
            {opt.path !== path && onSwitchPath && (
              <button
                type="button"
                onClick={() => onSwitchPath(opt.path)}
                className={`mt-4 inline-flex items-center min-h-[44px] px-4 py-2 rounded-full text-sm font-semibold ${ACCENT[opt.path].solid} ${FOCUS_RING}`}
              >
                {goLabel[opt.path]} →
              </button>
            )}
          </div>
        ))}
      </div>
      {slide.note && <p className="text-sm text-[#4B5563]">{slide.note}</p>}
    </div>
  );
}
