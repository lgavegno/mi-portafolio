import { ACCENT, FOCUS_RING } from './accent';
import { SOLUTION_PATHS } from '../utils/whatsapp';

export default function PathSwitch({ path, onChange, label, labels }) {
  return (
    <div role="group" aria-label={label} className="inline-flex p-1 rounded-full bg-[#F1F0E8] border border-[#2C3340]/15">
      {SOLUTION_PATHS.map((p) => {
        const active = p === path;
        return (
          <button
            key={p}
            type="button"
            aria-pressed={active}
            onClick={() => !active && onChange(p)}
            className={`min-h-[44px] min-w-[88px] px-5 rounded-full text-sm font-semibold transition-colors ${FOCUS_RING} ${
              active ? ACCENT[p].solid : 'text-[#2C3340] hover:bg-white'
            }`}
          >
            {labels[p]}
          </button>
        );
      })}
    </div>
  );
}
