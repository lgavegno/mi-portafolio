import { useEffect, useRef } from 'react';
import { ACCENT, FOCUS_RING } from './accent';

/** Capítulos con nombre como tablist (WAI-ARIA APG, carrusel con pestañas). */
export default function ChapterNav({ slides, index, onSelect, path, idBase, label }) {
  const activeRef = useRef(null);
  const accent = ACCENT[path];

  useEffect(() => {
    activeRef.current?.scrollIntoView?.({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  return (
    <div
      role="tablist"
      aria-label={label}
      data-chapter-nav
      className="flex gap-2 overflow-x-auto pb-2 lg:pb-1 -mx-1 px-1 snap-x [scrollbar-width:thin]"
    >
      {slides.map((slide, i) => {
        const selected = i === index;
        return (
          <button
            key={slide.id}
            ref={selected ? activeRef : undefined}
            id={`${idBase}-tab-${i}`}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-controls={`${idBase}-panel`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onSelect(i)}
            className={`snap-start shrink-0 min-h-[44px] px-4 lg:px-3 py-2 lg:py-1 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${FOCUS_RING} ${
              selected
                ? `${accent.solid} border-transparent`
                : 'bg-[#F1F0E8] text-[#2C3340] border-[#2C3340]/15 hover:border-[#2C3340]/40'
            }`}
          >
            <span aria-hidden="true" className="mr-1.5 opacity-70 tabular-nums">{i + 1}.</span>
            {slide.chapter}
          </button>
        );
      })}
    </div>
  );
}
