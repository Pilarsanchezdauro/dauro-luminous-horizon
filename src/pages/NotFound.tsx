import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();
  const wordpressUrl = `https://grupodauro.wpcomstaging.com${location.pathname}${location.search}`;

  useEffect(() => {
    // Fallback redirect via JavaScript
    window.location.replace(wordpressUrl);
  }, [wordpressUrl]);

  return (
    <>
      <Helmet>
        <meta httpEquiv="refresh" content={`0;url=${wordpressUrl}`} />
        <link rel="canonical" href={wordpressUrl} />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">Redirigiendo al archivo histórico...</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
