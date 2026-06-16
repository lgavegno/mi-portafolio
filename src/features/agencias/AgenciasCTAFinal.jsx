import { FiMail } from 'react-icons/fi'
import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { trackEvent } from '../../utils/trackEvent'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
const SUBJECT = encodeURIComponent('Partner técnico — [nombre de agencia]')
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${SUBJECT}`

export default function AgenciasCTAFinal() {
  const { t, locale } = useLocale()
  const s = locale === 'en' ? t.agencies.ctaFinal : t.agencias.ctaFinal

  const handleClick = () => {
    trackEvent('agency_cta_email', { position: 'final' })
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#2C3340]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-transparent rounded-xl px-8 py-12 text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-[#F1F0E8] text-3xl sm:text-4xl mb-4"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.p
            className="font-dm-sans text-[rgba(241,240,232,0.65)] text-base leading-relaxed mb-8"
            variants={fadeInUp}
          >
            {s.cuerpo}
          </motion.p>

          <motion.div variants={fadeInUp}>
            <a
              href={MAILTO_URL}
              onClick={handleClick}
              className="inline-flex items-center justify-center gap-2 bg-[#EEE0C9] hover:bg-[#F1F0E8] text-[#2C3340] font-syne font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              <FiMail size={18} />
              {s.ctaPrimario}
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
