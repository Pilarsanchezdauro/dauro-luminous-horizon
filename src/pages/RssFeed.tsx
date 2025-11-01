import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const RssFeed = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRss = async () => {
      try {
        const response = await fetch('https://rnrsfzgmgjdzufqrsnhd.supabase.co/functions/v1/generate-rss');
        
        if (!response.ok) {
          throw new Error('Error al generar el feed RSS');
        }

        const xmlText = await response.text();
        
        // Create a blob and download it
        const blob = new Blob([xmlText], { type: 'application/xml' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'feed.xml';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        // Redirect back home after download
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
        
      } catch (err) {
        console.error('Error fetching RSS:', err);
        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchRss();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4 max-w-md">
          <svg className="mx-auto h-12 w-12 text-destructive" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h2 className="text-lg font-semibold mb-2">Error al cargar el RSS</h2>
            <p className="text-sm text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground mt-4">
              Puedes acceder directamente al feed en:{' '}
              <a 
                href="https://rnrsfzgmgjdzufqrsnhd.supabase.co/functions/v1/generate-rss"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                este enlace
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <svg className="mx-auto h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
        <p className="text-muted-foreground">Generando feed RSS...</p>
      </div>
    </div>
  );
};

export default RssFeed;
