import SlideHeader from './SlideHeader';
import { headingTag } from './headingTag';
import { ACCENT, FOCUS_RING } from '../accent';

export default function SlideProcess({ slide, path, level, onSwitchPath }) {
  const H = headingTag(level + 1);
  return (
    <div className="space-y-6 lg:space-y-4">
      <SlideHeader slide={slide} path={path} level={level} />
      <ol className="grid gap-3 md:grid-cols-5">
        {slide.steps.map((step, i) => (
          <li key={step.title} className="p-4 lg:p-3 rounded-xl bg-white/70 border border-[#2C3340]/10">
            <span aria-hidden="true" className={`inline-flex items-center justify-center w-8 h-8 lg:w-7 lg:h-7 rounded-full text-sm font-bold mb-2 lg:mb-1.5 ${ACCENT[path].solid}`}>{i + 1}</span>
            <H className="font-display font-semibold text-[#2C3340]">{step.title}</H>
            <p className="text-sm text-[#4B5563] leading-relaxed mt-1">{step.body}</p>
          </li>
        ))}
      </ol>
      {slide.chips && (
        <div>
          <p className="text-sm font-medium text-[#2C3340] mb-2">{slide.chipsLabel}</p>
          <ul className="flex flex-wrap gap-2">
            {slide.chips.map((chip) => (
              <li key={chip.label}>
                {chip.switchTo && onSwitchPath ? (
                  <button
                    type="button"
                    onClick={() => onSwitchPath(chip.switchTo)}
                    className={`min-h-[44px] px-3 py-1.5 rounded-full text-sm border border-[#2C3340]/25 text-[#2C3340] underline underline-offset-2 hover:bg-white ${FOCUS_RING}`}
                  >
                    {chip.label} →
                  </button>
                ) : (
                  <span className="inline-flex items-center min-h-[36px] px-3 py-1.5 rounded-full text-sm bg-white/70 border border-[#2C3340]/10 text-[#2C3340]">{chip.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
