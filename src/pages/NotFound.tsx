import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Redirect to the old WordPress site for legacy content
    const wordpressUrl = `https://grupodauro.wpcomstaging.com${location.pathname}${location.search}`;
    window.location.href = wordpressUrl;
  }, [location.pathname, location.search]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xl text-muted-foreground">Redirigiendo al archivo histórico...</p>
      </div>
    </div>
  );
};

export default NotFound;
