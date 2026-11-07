import SlideHeader from './SlideHeader';
import { SlideIcon } from './icons';
import { ACCENT } from '../accent';

export default function SlideAppGrid({ slide, path, level }) {
  return (
    <div className="space-y-6 lg:space-y-4">
      <SlideHeader slide={slide} path={path} level={level} />
      <ul className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {slide.apps.map((app) => (
          <li key={app.label} className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/70 border border-[#2C3340]/10 text-center">
            <span className={`inline-flex items-center justify-center w-11 h-11 rounded-xl ${ACCENT[path].soft} ${ACCENT[path].text}`}>
              <SlideIcon name={app.icon} className="w-5 h-5" />
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#2C3340] leading-tight">{app.label}</span>
          </li>
        ))}
      </ul>
      {slide.more && <p className="font-display font-semibold text-[#2C3340]">{slide.more}</p>}
    </div>
  );
}
