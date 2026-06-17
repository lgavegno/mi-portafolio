import React from 'react'
import { FiMail } from 'react-icons/fi'
import { useLocale } from '../../hooks/useLocale'
import { trackEvent } from '../../utils/trackEvent'

const WireframeGeometry = React.lazy(() => import('../../components/WireframeGeometry'))


const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL
const SUBJECT = encodeURIComponent('Partner técnico — [nombre de agencia]')
const MAILTO_URL = `mailto:${CONTACT_EMAIL}?subject=${SUBJECT}`

export default function AgenciasHero() {
  const { t, locale } = useLocale()
  const h = locale === 'en' ? t.agencies.hero : t.agencias.hero

  const handleEmailClick = () => {
    trackEvent('agency_cta_email', { position: 'hero' })
  }

  const headline = h.headline.split('\n')

  return (
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#2C3340]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="font-syne font-bold text-[#F1F0E8] text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              {headline.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headline.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="font-dm-sans text-[rgba(241,240,232,0.65)] text-lg lg:text-xl leading-relaxed mb-8 max-w-xl">
              {h.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAILTO_URL}
                onClick={handleEmailClick}
                className="inline-flex items-center justify-center gap-2 bg-[#EEE0C9] hover:bg-[#F1F0E8] text-[#2C3340] font-syne font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <FiMail size={18} />
                {h.ctaPrimario}
              </a>
              <a
                href="#colaboracion"
                className="inline-flex items-center justify-center gap-2 border border-[rgba(150,182,197,0.4)] hover:border-[#ADC4CE] text-[#ADC4CE] hover:text-[#F1F0E8] font-syne font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {h.ctaSecundario}
              </a>
            </div>
          </div>

          {/* Right Column - WireframeGeometry */}
          <div className="hidden lg:flex items-center justify-center h-full min-h-[400px] max-h-[500px] p-8">
            <div className="relative">
              <React.Suspense fallback={<div className="w-64 h-64" />}>
                <WireframeGeometry />
              </React.Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
