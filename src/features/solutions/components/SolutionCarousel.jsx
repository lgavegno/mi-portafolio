import { useEffect, useId, useState } from 'react';
// motion se usa vía JSX member expression (<motion.div>)
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLocale } from '../../../hooks/useLocale';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { springConfig } from '../../../config/motionConfig';
import { formatTemplate } from '../utils/formatTemplate';
import { resolveSwipe } from '../utils/swipe';
import { useSolutionTracking } from '../hooks/useSolutionTracking';
import ChapterNav from './ChapterNav';
import CarouselProgress from './CarouselProgress';
import WhatsAppCTA from './WhatsAppCTA';
import SlideRenderer from './SlideRenderer';
import { FOCUS_RING } from './accent';

const KEY_ACTIONS = { ArrowRight: 'next', ArrowLeft: 'prev', Home: 'first', End: 'last' };

/**
 * Carrusel por capítulos. Sin autoplay (FR-09). Solo se monta el slide activo (NFR-04).
 * Remontar con `key` para volver al slide 1 (cambio de camino o nueva apertura desde una puerta).
 */
export default function SolutionCarousel({ path, slides, headingLevel = 3, entry = 'home', onSwitchPath }) {
  const { t } = useLocale();
  const c = t.solutions.carousel;
  const reduced = useReducedMotion();
  // Dedupe de slide_view por montaje del carrusel (spec §9)
  const tracking = useSolutionTracking(entry);
  const idBase = useId().replace(/:/g, '');
  const [{ index, direction }, setState] = useState({ index: 0, direction: 0 });
  const total = slides.length;
  const slide = slides[index];

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(total - 1, next));
    if (clamped === index) return clamped;
    setState({ index: clamped, direction: clamped > index ? 1 : -1 });
    return clamped;
  };

  const { trackSlideView } = tracking;
  useEffect(() => {
    trackSlideView(path, slide.ref);
  }, [path, slide.ref, trackSlideView]);

  const onKeyDown = (e) => {
    const action = KEY_ACTIONS[e.key];
    if (!action || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
    if (e.target.closest?.('[data-inner-tabs], input, textarea, select')) return;
    e.preventDefault();
    const target = { next: index + 1, prev: index - 1, first: 0, last: total - 1 }[action];
    const landed = goTo(target);
    // Roving focus si el foco estaba en un capítulo
    if (e.target.getAttribute?.('role') === 'tab') {
      requestAnimationFrame(() => document.getElementById(`${idBase}-tab-${landed}`)?.focus());
    }
  };

  const onDragEnd = (_, info) => {
    const dir = resolveSwipe(info?.offset?.x, info?.velocity?.x);
    if (dir !== 0) goTo(index + dir);
  };

  const variants = reduced
    ? { enter: { opacity: 0 }, center: { opacity: 1, transition: { duration: 0.15 } }, exit: { opacity: 0, transition: { duration: 0.1 } } }
    : {
        enter: (d) => ({ opacity: 0, x: d * 40 }),
        center: { opacity: 1, x: 0, transition: springConfig.snappy },
        exit: (d) => ({ opacity: 0, x: d * -40, transition: { duration: 0.15 } }),
      };

  const progressText = formatTemplate(c.progress, { current: index + 1, total });
  const panelLabel = formatTemplate(c.slideLabel, { current: index + 1, total, chapter: slide.chapter });
  const arrowBtn = `inline-flex items-center justify-center w-11 h-11 rounded-full border border-[#2C3340]/20 text-[#2C3340] bg-[#F1F0E8] hover:bg-white disabled:opacity-35 disabled:cursor-not-allowed transition-colors ${FOCUS_RING}`;

  return (
    <div
      role="region"
      aria-roledescription={c.roleDescription}
      aria-label={t.solutions.section.switch[path]}
      onKeyDown={onKeyDown}
      className="space-y-5 lg:space-y-2 lg:flex-1 lg:min-h-0 lg:flex lg:flex-col"
    >
      <ChapterNav slides={slides} index={index} onSelect={goTo} path={path} idBase={idBase} label={c.chaptersLabel} />
      <CarouselProgress index={index} total={total} path={path} text={progressText} />

      {/* lg+: la tarjeta llena el alto disponible; flechas a los costados y WhatsApp fijo dentro de la tarjeta.
          Mobile: flechas + WhatsApp en una fila debajo (como antes). Un solo juego de botones. */}
      <div className="relative space-y-5 lg:space-y-0 lg:flex-1 lg:min-h-0">
      <div className="relative overflow-hidden rounded-2xl bg-[#F1F0E8] border border-[#2C3340]/10 shadow-sm lg:h-full">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={slide.id}
            id={`${idBase}-panel`}
            role="tabpanel"
            aria-roledescription={c.slideRoleDescription}
            aria-label={panelLabel}
            data-slide-ref={slide.ref}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragDirectionLock
            onDragEnd={onDragEnd}
            style={{ touchAction: 'pan-y' }}
            className="p-5 sm:p-8 md:min-h-[30rem] lg:min-h-0 lg:h-full lg:overflow-y-auto lg:px-12 lg:pt-6 lg:pb-20"
          >
            <SlideRenderer slide={slide} path={path} headingLevel={headingLevel} onSwitchPath={onSwitchPath} tracking={tracking} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3 lg:contents">
        {/* Orden DOM = orden de foco: anterior → siguiente → WhatsApp (lectura visual en desktop).
            En mobile `order-*` los muestra como anterior · WhatsApp · siguiente. */}
        <button
          type="button"
          className={`${arrowBtn} order-1 lg:absolute lg:z-10 lg:left-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:shadow-md`}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label={c.prev}
        >
          <FiChevronLeft aria-hidden="true" className="w-5 h-5" />
        </button>
        <button
          type="button"
          className={`${arrowBtn} order-3 lg:absolute lg:z-10 lg:right-0 lg:top-1/2 lg:translate-x-1/2 lg:-translate-y-1/2 lg:w-12 lg:h-12 lg:shadow-md`}
          onClick={() => goTo(index + 1)}
          disabled={index === total - 1}
          aria-label={c.next}
        >
          <FiChevronRight aria-hidden="true" className="w-5 h-5" />
        </button>
        <WhatsAppCTA
          path={path}
          refCode={slide.ref}
          onClick={tracking?.trackWhatsApp}
          className={`order-2 lg:absolute lg:z-10 lg:bottom-4 lg:right-6 lg:shadow-md ${slide.type === 'contact' ? 'lg:hidden' : ''}`}
        />
      </div>
      </div>
    </div>
  );
}
