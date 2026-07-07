import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

export default function AgenciasProceso() {
  const { t, locale } = useLocale()
  const s = locale === 'es' ? t.agencias.proceso : t.agencies.proceso

  return (
    <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8 bg-[#96B6C5]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-[#2C3340] text-3xl sm:text-4xl mb-12"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 md:border-t md:border-[rgba(44,51,64,0.15)]"
            variants={staggerContainer}
          >
            {s.pasos.map((paso, i) => (
              <motion.div
                key={i}
                className={[
                  'pt-6 pb-6 px-6',
                  'border-b border-[rgba(44,51,64,0.15)] md:border-b-0',
                  i === s.pasos.length - 1 ? 'border-b-0' : '',
                  'md:border-r md:border-[rgba(44,51,64,0.15)]',
                  i === s.pasos.length - 1 ? 'md:border-r-0' : '',
                ].join(' ')}
                variants={fadeInUp}
              >
                <p className="font-mono text-xs text-[rgba(44,51,64,0.5)] tracking-widest mb-3">
                  {paso.numero}
                </p>
                <h3 className="font-syne font-bold text-[#2C3340] text-lg lg:text-xl mb-2">
                  {paso.titulo}
                </h3>
                <p className="font-dm-sans text-[rgba(44,51,64,0.75)] text-sm lg:text-base leading-relaxed">
                  {paso.descripcion}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
