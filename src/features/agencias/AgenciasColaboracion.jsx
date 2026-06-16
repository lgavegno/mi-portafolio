import { motion } from 'framer-motion'
import { useLocale } from '../../hooks/useLocale'
import { staggerContainer, fadeInUp, viewportConfig } from '../../config/motionConfig'

export default function AgenciasColaboracion() {
  const { t, locale } = useLocale()
  const s = locale === 'en' ? t.agencies.colaboracion : t.agencias.colaboracion

  return (
    <section id="colaboracion" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
        >
          <motion.h2
            className="font-syne font-bold text-white text-3xl sm:text-4xl mb-4"
            variants={fadeInUp}
          >
            {s.titulo}
          </motion.h2>

          <motion.p
            className="font-dm-sans text-slate-300 text-base leading-relaxed mb-12 max-w-2xl"
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
                <h3 className="font-syne font-bold text-white text-lg mb-6">
                  {modelo.tipo}
                </h3>

                <ol className="flex flex-col gap-3 mb-6">
                  {modelo.pasos.map((paso, j) => (
                    <li
                      key={j}
                      className="border-l-2 border-[#0EA5E9] pl-4 font-dm-sans text-slate-300 text-sm leading-relaxed"
                    >
                      {paso}
                    </li>
                  ))}
                </ol>

                <p className="font-dm-sans text-sky-400 text-sm font-medium leading-relaxed">
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
