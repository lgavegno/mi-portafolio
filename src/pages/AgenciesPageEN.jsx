import { Helmet } from 'react-helmet-async'
import { useLocale } from '../hooks/useLocale'
import AgenciasHero from '../features/agencias/AgenciasHero'
import AgenciasParaQuien from '../features/agencias/AgenciasParaQuien'
import AgenciasColaboracion from '../features/agencias/AgenciasColaboracion'
import AgenciasProceso from '../features/agencias/AgenciasProceso'
import AgenciasFAQ from '../features/agencias/AgenciasFAQ'
import AgenciasCTAFinal from '../features/agencias/AgenciasCTAFinal'

export default function AgenciesPageEN() {
  const { t } = useLocale()
  const meta = t.agencies.meta

  return (
    <>
      <Helmet>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={meta.canonical} />
        <link rel="alternate" hrefLang="es" href={meta.hrefLangES} />
        <meta property="og:title" content={meta.ogTitle} />
        <meta property="og:description" content={meta.ogDescription} />
        <meta property="og:url" content={meta.ogUrl} />
      </Helmet>
      <AgenciasHero />
      <AgenciasParaQuien />
      <AgenciasColaboracion />
      <AgenciasProceso />
      <AgenciasFAQ />
      <AgenciasCTAFinal />
    </>
  )
}
