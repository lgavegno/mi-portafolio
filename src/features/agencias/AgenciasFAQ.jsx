import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { trackEvent } from '../../utils/trackEvent'
import { staggerContainer, fadeInUp, viewportConfig, durationConfig } from '../../config/motionConfig'

export default function AgenciasFAQ() {
  const { t, locale } = useLocale()
  const s = locale === 'en' ? t.agencies.faq : t.agencias.faq
  const [openIndex, setOpenIndex] = useState(null)

  const handleToggle = (i) => {
    if (openIndex !== i) {
      trackEvent('agency_faq_expand', { question_index: i })
    }
    setOpenIndex(openIndex === i ? null : i)
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EEE0C9]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-[#2C3340] text-3xl sm:text-4xl mb-10"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.div variants={staggerContainer}>
            {s.items.map((item, i) => (
              <motion.div key={i} className="border-t border-[rgba(150,182,197,0.4)]" variants={fadeInUp}>
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4"
                  aria-expanded={openIndex === i}
                >
                  <span className="font-syne font-semibold text-[#2C3340] text-base">
                    {item.pregunta}
                  </span>
                  <FiChevronDown
                    size={18}
                    className={`text-[#96B6C5] flex-shrink-0 transition-transform duration-200 ${
                      openIndex === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.p
                      className="font-dm-sans text-[#4B5563] text-sm leading-relaxed pb-5"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0, transition: durationConfig.normal }}
                      exit={{ opacity: 0, y: -4, transition: durationConfig.fast }}
                    >
                      {item.respuesta}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
            <div className="border-t border-[rgba(150,182,197,0.4)]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
