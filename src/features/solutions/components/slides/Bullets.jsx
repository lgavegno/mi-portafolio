import { ACCENT } from '../accent';

export default function Bullets({ points, path, className = '' }) {
  return (
    <ul className={`space-y-2 ${className}`}>
      {points.map((p) => (
        <li key={p} className="flex gap-3 text-[#2C3340] leading-relaxed">
          <span aria-hidden="true" className={`mt-2 w-2 h-2 rounded-full shrink-0 ${ACCENT[path].dot}`} />
          <span>{p}</span>
        </li>
      ))}
    </ul>
  );
}
