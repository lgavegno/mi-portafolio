import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '../hooks/useLocale';
import { LOCALE_PREFIX, OG_LOCALE, BASE_URL } from '../utils/seoLocale';

const DefaultMetaTags = () => {
  const { locale } = useLocale();

  return (
    <Helmet>
      <link rel="canonical" href={`${BASE_URL}${LOCALE_PREFIX[locale] ?? ''}`} />
      <link rel="alternate" hreflang="es" href={BASE_URL} />
      <link rel="alternate" hreflang="en" href={`${BASE_URL}/en`} />
      <link rel="alternate" hreflang="pt" href={`${BASE_URL}/pt`} />
      <link rel="alternate" hreflang="x-default" href={BASE_URL} />
      <meta property="og:url" content={`${BASE_URL}${LOCALE_PREFIX[locale] ?? ''}`} />
      <meta property="og:locale" content={OG_LOCALE[locale] ?? OG_LOCALE.es} />
    </Helmet>
  );
};

export default DefaultMetaTags;
