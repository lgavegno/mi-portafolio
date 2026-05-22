import React from 'react';
import { Helmet } from 'react-helmet-async';

const BlogMetaTags = ({
  title,
  description,
  slug,
  imageUrl,
  publishDate,
  author = 'Leandro Gavegno'
}) => {
  const baseUrl = 'https://ongevag.vercel.app';
  const canonicalUrl = `${baseUrl}/blog/${slug}`;
  const fullImageUrl = imageUrl?.startsWith('http') ? imageUrl : `${baseUrl}${imageUrl}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <meta name="description" content={description} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Ongevag" />

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Article-Specific Meta Tags */}
      {publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Page Title */}
      <title>{title} | Ongevag</title>

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: title,
          description: description,
          image: fullImageUrl,
          author: {
            '@type': 'Person',
            name: author
          },
          datePublished: publishDate,
          url: canonicalUrl
        })}
      </script>
    </Helmet>
  );
};

export default BlogMetaTags;
