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
import SectionDivider from '../components/ui/SectionDivider'

export default function AgenciasPagePT() {
  const { t } = useLocale()
  const meta = t.agencies.meta

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <link rel="alternate" hrefLang="es" href={meta.hrefLangES} />
        <link rel="alternate" hrefLang="en" href={meta.hrefLangEN} />
        <link rel="alternate" hrefLang="pt" href={meta.hrefLangPT} />
        <link rel="alternate" hrefLang="x-default" href={meta.hrefLangES} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
      </Helmet>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={pageTransition}
        style={{ width: '100%' }}
      >
        <AgenciasHero />
      </motion.div>
      <SectionDivider variant="wave" fromColor="#2C3340" toColor="#EEE0C9" />
      <AgenciasParaQuien />
      <AgenciasColaboracion />
      <AgenciasProceso />
      <SectionDivider variant="bowl" fromColor="#96B6C5" toColor="#EEE0C9" />
      <AgenciasFAQ />
      <SectionDivider variant="overlap" fromColor="#EEE0C9" toColor="#2C3340" overlapLabel="Vamos conversar?" />
      <AgenciasCTAFinal />
    </>
  )
}
