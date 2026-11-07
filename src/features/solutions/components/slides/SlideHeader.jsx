import { ACCENT } from '../accent';
import { headingTag } from './headingTag';

export default function SlideHeader({ slide, path, level }) {
  const H = headingTag(level);
  return (
    <header className="space-y-3 lg:space-y-2 max-w-3xl lg:max-w-[calc(100%-15rem)]">
      {slide.kicker && (
        <p className={`text-xs font-semibold uppercase tracking-widest ${ACCENT[path].text}`}>{slide.kicker}</p>
      )}
      <H className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-2xl xl:text-3xl font-bold text-[#2C3340] leading-tight">{slide.title}</H>
      {slide.lead && <p className="text-base md:text-lg lg:text-base text-[#4B5563] leading-relaxed">{slide.lead}</p>}
    </header>
  );
}
