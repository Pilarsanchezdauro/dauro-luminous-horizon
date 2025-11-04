import { Helmet } from 'react-helmet-async';

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
}

export const SEO = ({
  title,
  description,
  keywords = 'editorial, arte, cine, inteligencia artificial, cultura, literatura, Granada, Andalucía',
  image = 'https://grupodauro.com/og-image.jpg',
  url,
  type = 'website',
  author = 'Grupo Cultural Dauro',
  publishedTime,
  structuredData,
}: SEOProps) => {
  const siteTitle = 'Grupo Cultural Dauro';
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;
  const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://grupodauro.com');
  const absoluteImage = image.startsWith('http') ? image : `https://grupodauro.com${image}`;

  // Generar alt text optimizado para la imagen OG
  const imageAlt = `${title} – Grupo Cultural Dauro`;

  // Organización structured data base
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grupo Cultural Dauro",
    "url": "https://grupodauro.com",
    "logo": "https://grupodauro.com/logo.png",
    "description": "Grupo cultural dedicado al arte, literatura, cine e inteligencia artificial en Granada",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "ES",
      "addressRegion": "Andalucía"
    },
    "sameAs": [
      "https://www.edicionesdauro.com"
    ]
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
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
