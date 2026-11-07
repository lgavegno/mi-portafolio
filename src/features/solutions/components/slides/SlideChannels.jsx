import SlideHeader from './SlideHeader';
import Bullets from './Bullets';
import DuxSalesPanelMock from '../mockups/DuxSalesPanelMock';
import DuxPosTicketMock from '../mockups/DuxPosTicketMock';
import { ACCENT } from '../accent';

export default function SlideChannels({ slide, path, level }) {
  return (
    <div className="space-y-6">
      <SlideHeader slide={slide} path={path} level={level} />
      <ul className="flex flex-wrap gap-2">
        {slide.channels.map((ch) => (
          <li key={ch} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${ACCENT[path].border} text-[#2C3340] bg-white/70`}>{ch}</li>
        ))}
      </ul>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] items-start">
        <Bullets points={slide.points} path={path} />
        {slide.mockups && (
          <div className="grid gap-4 sm:grid-cols-2">
            <DuxSalesPanelMock data={slide.mockups.panel} />
            <DuxPosTicketMock data={slide.mockups.ticket} />
          </div>
        )}
      </div>
    </div>
  );
}
