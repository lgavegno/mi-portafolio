import { useId, useRef, useState } from 'react';
import SlideHeader from './SlideHeader';
import { headingTag } from './headingTag';
import Bullets from './Bullets';
import { SlideIcon } from './icons';
import { ACCENT, FOCUS_RING } from '../accent';

/** Pestañas internas (APG Tabs, activación automática). Las flechas no cambian de slide. */
export default function SlideTabs({ slide, path, level }) {
  const [active, setActive] = useState(0);
  const idBase = useId().replace(/:/g, '');
  const tabRefs = useRef([]);
  const tabs = slide.tabs;
  const tab = tabs[active];
  const H = headingTag(level + 1);

  const onKeyDown = (e) => {
    const map = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (!(e.key in map)) return;
    e.preventDefault();
    e.stopPropagation();
    const next = (map[e.key] + tabs.length) % tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="space-y-6 lg:space-y-4">
      <SlideHeader slide={slide} path={path} level={level} />
      <div data-inner-tabs role="tablist" aria-label={slide.kicker} onKeyDown={onKeyDown} className="flex flex-wrap gap-2">
        {tabs.map((tb, i) => (
          <button
            key={tb.id}
            ref={(el) => (tabRefs.current[i] = el)}
            id={`${idBase}-t-${tb.id}`}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-controls={`${idBase}-p`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${FOCUS_RING} ${
              i === active ? `${ACCENT[path].solid} border-transparent` : 'bg-white/70 text-[#2C3340] border-[#2C3340]/15 hover:border-[#2C3340]/40'
            }`}
          >
            <SlideIcon name={tb.icon} className="w-4 h-4" />
            {tb.label}
          </button>
        ))}
      </div>
      <div id={`${idBase}-p`} role="tabpanel" aria-labelledby={`${idBase}-t-${tab.id}`} className={`p-5 rounded-xl bg-white/70 border-l-4 ${ACCENT[path].border}`}>
        <H className="font-display text-lg md:text-xl font-semibold text-[#2C3340] mb-3">{tab.title}</H>
        <Bullets points={tab.points} path={path} />
      </div>
    </div>
  );
}
