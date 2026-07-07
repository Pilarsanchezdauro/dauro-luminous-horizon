import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.grupodauro.com';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  structuredData?: object;
  noindex?: boolean;
}

export const SEO = ({
  title,
  description,
  keywords = 'editorial, arte, cine, inteligencia artificial, cultura, literatura, Granada, Andalucía',
  image = `${SITE_URL}/og-image.jpg`,
  url,
  type = 'website',
  author = 'Grupo Cultural Dauro',
  publishedTime,
  structuredData,
  noindex = false,
}: SEOProps) => {
  const siteTitle = 'Grupo Cultural Dauro';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  // Canonical siempre limpio: dominio canónico (www) + pathname, sin query ni hash
  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/';
  const normalizedUrl = url
    ? url.replace(/^https?:\/\/(www\.)?grupodauro\.com/, SITE_URL)
    : `${SITE_URL}${pathname === '/' ? '' : pathname}`;
  const currentUrl = normalizedUrl || SITE_URL;
  const absoluteImage = image.startsWith('http')
    ? image.replace(/^https?:\/\/(www\.)?grupodauro\.com/, SITE_URL)
    : `${SITE_URL}${image}`;

  // Generar alt text optimizado para la imagen OG
  const imageAlt = `${title} – Grupo Cultural Dauro`;

  // Organización structured data base
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grupo Cultural Dauro",
    "alternateName": "Ediciones Dauro",
    "foundingDate": "2000",
    "url": SITE_URL,
    "logo": `${SITE_URL}/og-logo.png`,
    "description": "Grupo cultural dedicado a la edición de libros, los guiones de cine y televisión, la representación de arte y la inteligencia artificial en Granada",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Granada",
      "addressCountry": "ES",
      "addressRegion": "Andalucía"
    },
    "sameAs": [
      "https://www.edicionesdauro.com",
      "https://www.facebook.com/grupodauro",
      "https://www.instagram.com/grupodauro/",
      "https://x.com/EdicionesDauro",
      "https://es.pinterest.com/Grupoculturaldauro/",
      "https://www.youtube.com/@grupodauro2900"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Grupo Cultural Dauro" />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Article specific */}
      {type === 'article' && publishedTime && (
        <>
          <meta property="article:published_time" content={publishedTime} />
          <meta property="article:author" content={author} />
        </>
      )}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};
