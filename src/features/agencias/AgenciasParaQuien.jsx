import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

export default function AgenciasParaQuien() {
  const { t, locale } = useLocale()
  const s = locale === 'en' ? t.agencies.paraQuien : t.agencias.paraQuien

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#EEE0C9]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-[#2C3340] text-3xl sm:text-4xl mb-6"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.div
            className="font-dm-sans text-[#4B5563] text-base lg:text-lg leading-relaxed mb-10 max-w-2xl whitespace-pre-line"
            variants={fadeInUp}
          >
            {s.cuerpo}
          </motion.div>

          <motion.ul className="flex flex-col gap-0" variants={staggerContainer}>
            {s.perfiles.map((perfil, i) => (
              <motion.li
                key={i}
                className="border-t border-[rgba(150,182,197,0.35)] py-4 font-dm-sans text-[#4B5563] text-base lg:text-lg"
                variants={fadeInUp}
              >
                {perfil}
              </motion.li>
            ))}
            <li className="border-t border-[rgba(150,182,197,0.35)]" />
          </motion.ul>
        </motion.div>
      </div>
    </section>
  )
}
