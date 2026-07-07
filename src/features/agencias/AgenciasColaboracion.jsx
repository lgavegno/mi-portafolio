import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

export default function AgenciasColaboracion() {
  const { t, locale } = useLocale()
  const s = locale === 'es' ? t.agencias.colaboracion : t.agencies.colaboracion

  return (
    <section id="colaboracion" className="py-16 px-4 sm:px-6 lg:px-8 bg-[#F1F0E8]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-[#2C3340] text-3xl sm:text-4xl mb-4"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.p
            className="font-dm-sans text-[#4B5563] text-base lg:text-lg leading-relaxed mb-12 max-w-2xl"
            variants={fadeInUp}
          >
            {s.intro}
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {s.modelos.map((modelo, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <h3 className="font-syne font-bold text-[#2C3340] text-lg lg:text-xl mb-6">
                  {modelo.tipo}
                </h3>

                <ol className="flex flex-col gap-3 mb-6">
                  {modelo.pasos.map((paso, j) => (
                    <li
                      key={j}
                      className={`border-l-2 pl-4 font-dm-sans text-[#4B5563] text-sm lg:text-base leading-relaxed ${['border-[#96B6C5]', 'border-[#ADC4CE]', 'border-[#EEE0C9]'][i] ?? 'border-[#96B6C5]'}`}
                    >
                      {paso}
                    </li>
                  ))}
                </ol>

                <p className="font-dm-sans text-[#2C3340] text-sm lg:text-base font-semibold leading-relaxed"
>
                  {modelo.resultado}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
