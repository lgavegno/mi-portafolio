import { useLocale } from '../../../../hooks/useLocale';

/** Mockup ilustrativo (HTML, sin imágenes). Datos ficticios. */
export default function DuxSalesPanelMock({ data }) {
  const { t } = useLocale();
  return (
    <figure aria-label={data.title} className="rounded-xl bg-white border border-[#2C3340]/10 p-4 lg:p-3 text-[#2C3340] shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#4B5563] mb-3 lg:mb-2">{data.title}</p>
      <dl className="grid grid-cols-3 gap-2 mb-3 lg:mb-2">
        {data.stats.map((s) => (
          <div key={s.label} className="rounded-lg bg-[#F1F0E8] p-2">
            <dt className="text-[10px] leading-tight text-[#4B5563]">{s.label}</dt>
            <dd className="font-display text-sm lg:text-xs font-bold tabular-nums whitespace-nowrap">{s.value}</dd>
          </div>
        ))}
      </dl>
      <ul className="space-y-1.5 lg:space-y-1 text-xs lg:text-[11px]">
        {data.orders.map((o) => (
          <li key={o.id} className="flex justify-between gap-2 border-b border-[#2C3340]/5 pb-1">
            <span className="tabular-nums truncate">{o.id} · {o.channel}</span>
            <span className="font-medium text-dux-ink shrink-0">{o.status}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 lg:mt-2 flex items-center gap-2 text-xs">
        <span aria-hidden="true" className="w-2 h-2 rounded-full bg-dux" />
        {data.sync}
      </p>
      <figcaption className="mt-3 lg:mt-2 text-[11px] italic text-[#4B5563]">{t.solutions.carousel.exampleData}</figcaption>
    </figure>
  );
}
