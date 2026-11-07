import { ACCENT } from './accent';

export default function CarouselProgress({ index, total, path, text }) {
  const pct = ((index + 1) / total) * 100;
  return (
    <div className="flex items-center gap-3">
      <div aria-hidden="true" className="flex-1 h-1.5 rounded-full bg-[#2C3340]/10 overflow-hidden">
        <div className={`h-full rounded-full ${ACCENT[path].bar} transition-[width] duration-300 motion-reduce:transition-none`} style={{ width: `${pct}%` }} />
      </div>
      <p aria-live="polite" aria-atomic="true" className="text-xs font-medium text-[#4B5563] tabular-nums whitespace-nowrap">
        {text}
      </p>
    </div>
  );
}
