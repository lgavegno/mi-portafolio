import SlideCards from './slides/SlideCards';
import SlideFacts from './slides/SlideFacts';
import SlideAppGrid from './slides/SlideAppGrid';
import SlideTabs from './slides/SlideTabs';
import SlideComparison from './slides/SlideComparison';
import SlideProcess from './slides/SlideProcess';
import SlideChannels from './slides/SlideChannels';
import SlideVersus from './slides/SlideVersus';
import SlideContact from './slides/SlideContact';

const BY_TYPE = {
  cards: SlideCards,
  facts: SlideFacts,
  appGrid: SlideAppGrid,
  tabs: SlideTabs,
  comparison: SlideComparison,
  process: SlideProcess,
  channels: SlideChannels,
  versus: SlideVersus,
  contact: SlideContact,
};

export default function SlideRenderer({ slide, path, headingLevel, onSwitchPath, tracking }) {
  const Component = BY_TYPE[slide.type];
  if (!Component) return null;
  return <Component slide={slide} path={path} level={headingLevel} onSwitchPath={onSwitchPath} tracking={tracking} />;
}
