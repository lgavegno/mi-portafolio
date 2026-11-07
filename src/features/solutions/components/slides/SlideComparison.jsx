import SlideHeader from './SlideHeader';
import { ACCENT } from '../accent';

export default function SlideComparison({ slide, path, level }) {
  const [first, ...others] = slide.columns;
  return (
    <div className="space-y-6">
      <SlideHeader slide={slide} path={path} level={level} />

      {/* ≥ sm: tabla */}
      <div className="hidden sm:block overflow-hidden rounded-xl border border-[#2C3340]/10">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-[#2C3340] text-[#F1F0E8]">
              <td className="p-3" />
              <th scope="col" className="p-3 font-display font-semibold">{first}</th>
              {others.map((col) => (
                <th key={col} scope="col" className="p-3 font-display font-semibold text-[#F1F0E8]/85">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slide.rows.map((row) => (
              <tr key={row.criterion} className="border-t border-[#2C3340]/10 bg-white/70 align-top">
                <th scope="row" className="p-3 font-semibold text-[#2C3340]">{row.criterion}</th>
                <td className={`p-3 font-medium text-[#2C3340] ${ACCENT[path].soft}`}>{row.values[0]}</td>
                {row.values.slice(1).map((v) => (
                  <td key={v} className="p-3 text-[#4B5563]">{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* < sm: tarjetas por criterio */}
      <div className="sm:hidden space-y-3">
        {slide.rows.map((row) => (
          <div key={row.criterion} className="p-4 rounded-xl bg-white/70 border border-[#2C3340]/10">
            <p className="font-display font-semibold text-[#2C3340] mb-2">{row.criterion}</p>
            <dl className="space-y-1.5 text-sm">
              {slide.columns.map((col, i) => (
                <div key={col}>
                  <dt className={i === 0 ? `font-semibold ${ACCENT[path].text}` : 'font-medium text-[#2C3340]'}>{col}</dt>
                  <dd className="text-[#4B5563]">{row.values[i]}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {slide.note && <p className="text-xs text-[#4B5563]">{slide.note}</p>}
    </div>
  );
}
