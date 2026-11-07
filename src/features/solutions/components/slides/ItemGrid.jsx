import { SlideIcon } from './icons';
import { headingTag } from './headingTag';
import { ACCENT } from '../accent';

export default function ItemGrid({ items, path, level, columns = 'sm:grid-cols-2' }) {
  const H = headingTag(level + 1);
  return (
    <ul className={`grid gap-3 ${columns}`}>
      {items.map((item) => (
        <li key={item.title} className="flex gap-3 p-4 lg:p-3 rounded-xl bg-white/70 border border-[#2C3340]/10">
          <span className={`shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-lg ${ACCENT[path].soft} ${ACCENT[path].text}`}>
            <SlideIcon name={item.icon} className="w-5 h-5" />
          </span>
          <div>
            <H className="font-display font-semibold text-[#2C3340]">{item.title}</H>
            <p className="text-sm text-[#4B5563] leading-relaxed mt-0.5">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
