import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useLocale } from '../hooks/useLocale'
import { pageTransition } from '../config/motionConfig'
import AgenciasHero from '../features/agencias/AgenciasHero'
import AgenciasParaQuien from '../features/agencias/AgenciasParaQuien'
import AgenciasColaboracion from '../features/agencias/AgenciasColaboracion'
import AgenciasProceso from '../features/agencias/AgenciasProceso'
import AgenciasFAQ from '../features/agencias/AgenciasFAQ'
import AgenciasCTAFinal from '../features/agencias/AgenciasCTAFinal'

export default function AgenciasPage() {
  const { t } = useLocale()
  const meta = t.agencias.meta

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <link rel="alternate" hrefLang="en" href={meta.hrefLangEN} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
      </Helmet>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={pageTransition}
      >
        <AgenciasHero />
      </motion.div>
      <AgenciasParaQuien />
      <AgenciasColaboracion />
      <AgenciasProceso />
      <AgenciasFAQ />
      <AgenciasCTAFinal />
    </>
  )
}
