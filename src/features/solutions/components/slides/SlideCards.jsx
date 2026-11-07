import SlideHeader from './SlideHeader';
import ItemGrid from './ItemGrid';

export default function SlideCards({ slide, path, level }) {
  return (
    <div className="space-y-6 lg:space-y-4">
      <SlideHeader slide={slide} path={path} level={level} />
      <ItemGrid items={slide.items} path={path} level={level} columns={slide.items.length > 4 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2'} />
    </div>
  );
}
