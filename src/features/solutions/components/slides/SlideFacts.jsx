import { useLocale } from '../../../../hooks/useLocale';
import SlideHeader from './SlideHeader';
import ItemGrid from './ItemGrid';
import { ACCENT } from '../accent';

/** Cifras con fuente: solo se muestran las que tienen `verifiedAt` (FR-16). */
export default function SlideFacts({ slide, path, level }) {
  const { t } = useLocale();
  const facts = (slide.facts ?? []).filter((f) => f.source?.verifiedAt);
  const sources = [...new Map(facts.map((f) => [f.source.url, f.source])).values()];

  return (
    <div className="space-y-6 lg:space-y-4">
      <SlideHeader slide={slide} path={path} level={level} />
      {facts.length > 0 && (
        <div>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {facts.map((f) => (
              <div key={f.id} className="p-4 rounded-xl bg-[#2C3340] text-[#F1F0E8]">
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-display text-2xl md:text-3xl font-bold">{f.value}</dd>
                <dd aria-hidden="true" className="text-xs uppercase tracking-wide text-[#F1F0E8]/80 mt-1">{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="text-xs text-[#4B5563] mt-2">
            {t.solutions.carousel.sourceLabel}:{' '}
            {sources.map((s, i) => (
              <span key={s.url}>
                {i > 0 && ' · '}
                <a href={s.url} target="_blank" rel="noopener noreferrer" className={`underline underline-offset-2 ${ACCENT[path].text}`}>{s.label}</a>
              </span>
            ))}
          </p>
        </div>
      )}
      {slide.items && <ItemGrid items={slide.items} path={path} level={level} columns={slide.items.length === 3 ? 'md:grid-cols-3' : 'sm:grid-cols-2'} />}
    </div>
  );
}
