import { FiMail } from 'react-icons/fi'
import { useLocale } from '../../hooks/useLocale'
import { trackEvent } from '../../utils/trackEvent'


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
    <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="">
          <div className="max-w-2xl">
            <h1 className="font-syne font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
              {headline.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < headline.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="font-dm-sans text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
              {h.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={MAILTO_URL}
                onClick={handleEmailClick}
                className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-syne font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                <FiMail size={18} />
                {h.ctaPrimario}
              </a>
              <a
                href="#colaboracion"
                className="inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-syne font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                {h.ctaSecundario}
              </a>
            </div>
          </div>


        </div>
      </div>
    </section>
  )
}
