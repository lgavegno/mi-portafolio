import { useEffect, useId, useState } from 'react';
// motion se usa vía JSX member expression (<motion.div>)
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLocale } from '../../../hooks/useLocale';
import { useReducedMotion } from '../../../hooks/useReducedMotion';
import { springConfig } from '../../../config/motionConfig';
import { formatTemplate } from '../utils/formatTemplate';
import { resolveSwipe } from '../utils/swipe';
import ChapterNav from './ChapterNav';
import CarouselProgress from './CarouselProgress';
import WhatsAppCTA from './WhatsAppCTA';
import SlideRenderer from './SlideRenderer';
import { FOCUS_RING } from './accent';

const KEY_ACTIONS = { ArrowRight: 'next', ArrowLeft: 'prev', Home: 'first', End: 'last' };

/**
 * Carrusel por capítulos. Sin autoplay (FR-09). Solo se monta el slide activo (NFR-04).
 * Remontar con `key={path}` para volver al slide 1 al cambiar de camino.
 */
export default function SolutionCarousel({ path, slides, headingLevel = 3, tracking, onSwitchPath }) {
  const { t } = useLocale();
  const c = t.solutions.carousel;
  const reduced = useReducedMotion();
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

  useEffect(() => {
    tracking?.trackSlideView(path, slide.ref);
  }, [path, slide.ref, tracking]);

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
      aria-roledescription={c.roleDescription}
      aria-label={t.solutions.section.switch[path]}
      onKeyDown={onKeyDown}
      className="space-y-5"
    >
      <ChapterNav slides={slides} index={index} onSelect={goTo} path={path} idBase={idBase} label={c.chaptersLabel} />
      <CarouselProgress index={index} total={total} path={path} text={progressText} />

      <div className="relative overflow-hidden rounded-2xl bg-[#F1F0E8] border border-[#2C3340]/10 shadow-sm">
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
            className="p-5 sm:p-8 md:min-h-[30rem]"
          >
            <SlideRenderer slide={slide} path={path} headingLevel={headingLevel} onSwitchPath={onSwitchPath} tracking={tracking} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button type="button" className={arrowBtn} onClick={() => goTo(index - 1)} disabled={index === 0} aria-label={c.prev}>
          <FiChevronLeft aria-hidden="true" className="w-5 h-5" />
        </button>
        <WhatsAppCTA path={path} refCode={slide.ref} onClick={tracking?.trackWhatsApp} />
        <button type="button" className={arrowBtn} onClick={() => goTo(index + 1)} disabled={index === total - 1} aria-label={c.next}>
          <FiChevronRight aria-hidden="true" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
