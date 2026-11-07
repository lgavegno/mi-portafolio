import { useLocale } from '../../../../hooks/useLocale';

/** Mockup ilustrativo de ticket de punto de venta. Datos ficticios. */
export default function DuxPosTicketMock({ data }) {
  const { t } = useLocale();
  return (
    <figure aria-label={data.title} className="rounded-xl bg-white border border-[#2C3340]/10 p-4 lg:p-3 text-[#2C3340] shadow-sm font-mono">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-[#4B5563] mb-3 lg:mb-2">{data.title}</p>
      <ul className="space-y-1.5 lg:space-y-1 text-xs lg:text-[11px]">
        {data.lines.map((l) => (
          <li key={l.item} className="flex justify-between gap-2">
            <span className="truncate">{l.item}</span>
            <span className="tabular-nums shrink-0">{l.amount}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 pt-2 border-t border-dashed border-[#2C3340]/30 text-[11px] text-[#4B5563]">{data.invoice}</p>
      <p className="mt-1 flex justify-between text-sm font-bold">
        <span>{data.totalLabel}</span>
        <span className="tabular-nums">{data.total}</span>
      </p>
      <figcaption className="mt-3 lg:mt-2 font-sans text-[11px] italic text-[#4B5563]">{t.solutions.carousel.exampleData}</figcaption>
    </figure>
  );
}
