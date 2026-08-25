import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocale } from '../hooks/useLocale';
import { LOCALE_PREFIX, OG_LOCALE, BASE_URL } from '../utils/seoLocale';

const truncateText = (text, maxLen) =>
  text && text.length > maxLen ? text.slice(0, maxLen - 3) + '...' : text;

const BlogMetaTags = ({
  title,
  description,
  slug,
  imageUrl,
  publishDate,
  author = 'Leandro Gavegno'
}) => {
  const { locale } = useLocale();
  const canonicalUrl = `${BASE_URL}${LOCALE_PREFIX[locale] ?? ''}/blog/${slug}`;
  const fallbackImage = `${BASE_URL}/og-image.png`;
  const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : fallbackImage;
  const truncatedDescription = truncateText(description, 155);

  return (
    <Helmet>
      <title>{title} — Ongevag Blog</title>
      <meta name="description" content={truncatedDescription} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Dynamic */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={OG_LOCALE[locale] ?? OG_LOCALE.es} />
      <meta property="og:site_name" content="Ongevag" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* hreflang: mismo slug publicado en las 3 locales, ES es canonical/x-default */}
      <link rel="alternate" hreflang="es" href={`${BASE_URL}/blog/${slug}`} />
      <link rel="alternate" hreflang="en" href={`${BASE_URL}/en/blog/${slug}`} />
      <link rel="alternate" hreflang="pt" href={`${BASE_URL}/pt/blog/${slug}`} />
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/blog/${slug}`} />

      {/* Article-Specific */}
      {publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: truncatedDescription,
          image: fullImageUrl,
          author: { '@type': 'Person', name: author },
          datePublished: publishDate,
          url: canonicalUrl
        })}
      </script>
    </Helmet>
  );
};

export default BlogMetaTags;
