import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../../hooks/useLocale';

/**
 * TechExperience.jsx
 *
 * Sección "Experiencia técnica" — trabajo de implementación/desarrollo Odoo
 * y sistemas de gestión, mostrado sin nombrar clientes ni exponer datos de
 * negocio (SKUs, CUITs, nombres de sistemas legados, entornos).
 *
 * Contenido (header/toolGroups/cases) vive en src/locales/{es,en,pt}/experience.js
 * y se consume vía useLocale() siguiendo el patrón i18n del resto del repo.
 *
 * Paleta ONGEVAG (rebrand EPIC-07 / v3.1.0):
 *   cream       #F1F0E8
 *   sand        #EEE0C9
 *   mist-blue   #ADC4CE
 *   steel-blue  #96B6C5
 *   navy        #2C3340
 *
 * Tipografía: Space Grotesk (display) + Inter (body)
 */

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 110, damping: 18 },
  },
};

function CaseRow({ c, index, isOpen, onToggle }) {
  return (
    <motion.div variants={item} className="border-t border-[#2C3340]/15 py-8">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="group flex w-full items-start justify-between gap-6 text-left"
      >
        <div className="flex-1">
          <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
            {String(index + 1).padStart(2, '0')} — {c.label}
          </span>
          <h3 className="mt-2 font-['Space_Grotesk'] text-2xl font-medium leading-snug text-[#2C3340] md:text-3xl">
            {c.title}
          </h3>
          <p className="mt-3 max-w-2xl font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/70">
            {c.summary}
          </p>
        </div>

        <span
          aria-hidden="true"
          className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#2C3340]/20 text-[#2C3340] transition-transform duration-300 ${
            isOpen ? 'rotate-45' : 'group-hover:rotate-90'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </span>
      </button>

      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="overflow-hidden"
      >
        <div className="mt-6 grid gap-8 pl-0 md:grid-cols-[1fr,220px] md:pl-1">
          <ul className="space-y-3">
            {c.points.map((p, i) => (
              <li key={i} className="flex gap-3 font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/80">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#96B6C5]" />
                {p}
              </li>
            ))}
          </ul>

          <div>
            <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
              Stack
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[#96B6C5]/40 bg-[#96B6C5]/10 px-3 py-1 font-['Inter'] text-xs text-[#2C3340]/80"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechExperience() {
  const { t } = useLocale();
  const { header, toolGroups, cases } = t.experience;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F1F0E8] px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-2xl">
          <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
            {header.eyebrow}
          </span>
          <h2 className="mt-3 font-['Space_Grotesk'] text-4xl font-medium leading-tight text-[#2C3340] md:text-5xl">
            {header.title}
          </h2>
          <p className="mt-5 font-['Inter'] text-[15px] leading-relaxed text-[#2C3340]/70">
            {header.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-6 border-t border-[#2C3340]/15 pt-8 sm:grid-cols-3">
          {toolGroups.map((g) => (
            <div key={g.group}>
              <span className="font-['Inter'] text-xs uppercase tracking-[0.14em] text-[#2C3340]/50">
                {g.group}
              </span>
              <ul className="mt-3 space-y-1.5">
                {g.tools.map((tool) => (
                  <li
                    key={tool}
                    className="font-['Space_Grotesk'] text-lg text-[#2C3340]"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14"
        >
          {cases.map((c, i) => (
            <CaseRow
              key={c.title}
              c={c}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
          <div className="border-t border-[#2C3340]/15" />
        </motion.div>
      </div>
    </section>
  );
}
