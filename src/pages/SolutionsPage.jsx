import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { useLocale } from '../hooks/useLocale';
import { LOCALE_PREFIX, OG_LOCALE, BASE_URL } from '../utils/seoLocale';
import SolutionsSection from '../features/solutions/components/SolutionsSection';
import { FEATURES } from '../config/features';

/** Página compartible /odoo y /dux (+ /en/*, /pt/*). Spec §5. */
export default function SolutionsPage({ path }) {
  const { locale, t } = useLocale();
  const navigate = useNavigate();
  const page = t.solutions.pages[path];
  const prefix = LOCALE_PREFIX[locale] ?? '';
  const url = (l, p = path) => `${BASE_URL}${LOCALE_PREFIX[l]}/${p}`;

  // El HTML estático de /odoo y /dux (scripts/generate-route-meta.js) trae canonical/hreflang/og:url
  // para crawlers sin JS. Con JS los pone Helmet: se retiran los estáticos para no duplicarlos.
  useEffect(() => {
    document.querySelectorAll('[data-route-meta]').forEach((node) => node.remove());
  }, []);

  // Con la alianza terminada (FEATURES.solutions = false) no se captan más leads:
  // los links ya compartidos llevan a la home del mismo idioma.
  if (!FEATURES.solutions) return <Navigate to={prefix || '/'} replace />;

  return (
    <>
      <Helmet>
        <html lang={locale} />
        <title>{page.meta.title}</title>
        <meta name="description" content={page.meta.description} />
        <link rel="canonical" href={url(locale)} />
        <link rel="alternate" hrefLang="es" href={url('es')} />
        <link rel="alternate" hrefLang="en" href={url('en')} />
        <link rel="alternate" hrefLang="pt" href={url('pt')} />
        <link rel="alternate" hrefLang="x-default" href={url('es')} />
        <meta property="og:title" content={page.meta.ogTitle} />
        <meta property="og:description" content={page.meta.ogDescription} />
        <meta property="og:url" content={url(locale)} />
        <meta property="og:locale" content={OG_LOCALE[locale]} />
        <meta property="og:image" content={`${BASE_URL}/og-image.png`} />
        <meta name="twitter:title" content={page.meta.ogTitle} />
        <meta name="twitter:description" content={page.meta.ogDescription} />
      </Helmet>

      <div className="bg-[#EEE0C9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl pt-12 md:pt-16 pb-8 space-y-4">
          <Link
            to={prefix || '/'}
            className="inline-flex items-center gap-2 min-h-[44px] text-sm font-medium text-[#2C3340] underline underline-offset-4 decoration-[#2C3340]/40 hover:decoration-[#2C3340] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2C3340] rounded"
          >
            <FiArrowLeft aria-hidden="true" />
            {t.solutions.pages.backHome}
          </Link>
          <p className="text-xs font-medium tracking-widest uppercase text-[#4B5563]">{t.solutions.section.badge}</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C3340] leading-tight max-w-3xl">{page.h1}</h1>
          <p className="text-lg text-[#4B5563] max-w-2xl">{page.intro}</p>
        </div>
      </div>

      <SolutionsSection
        path={path}
        entry="direct"
        variant="page"
        onPathChange={(p) => navigate(`${prefix}/${p}`)}
      />
    </>
  );
}
