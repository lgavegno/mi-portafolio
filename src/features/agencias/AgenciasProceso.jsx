import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

export default function AgenciasProceso() {
  const { t, locale } = useLocale()
  const s = locale === 'en' ? t.agencies.proceso : t.agencias.proceso

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-white text-3xl sm:text-4xl mb-12"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 md:border-t md:border-slate-700"
            variants={staggerContainer}
          >
            {s.pasos.map((paso, i) => (
              <motion.div
                key={i}
                className={[
                  'pt-6 pb-6 px-6',
                  'border-b border-slate-700 md:border-b-0',
                  i === s.pasos.length - 1 ? 'border-b-0' : '',
                  'md:border-r md:border-slate-700',
                  i === s.pasos.length - 1 ? 'md:border-r-0' : '',
                ].join(' ')}
                variants={fadeInUp}
              >
                <p className="font-mono text-xs text-slate-500 tracking-widest mb-3">
                  {paso.numero}
                </p>
                <h3 className="font-syne font-bold text-white text-lg mb-2">
                  {paso.titulo}
                </h3>
                <p className="font-dm-sans text-slate-400 text-sm leading-relaxed">
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
