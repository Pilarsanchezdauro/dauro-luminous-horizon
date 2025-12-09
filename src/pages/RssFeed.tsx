import { useEffect } from 'react';

const RssFeed = () => {
  useEffect(() => {
    // Redirect to static RSS feed
    window.location.href = '/feed.xml';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <div className="animate-pulse">
          <svg className="mx-auto h-12 w-12 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
        <p className="text-muted-foreground">Redirigiendo al feed RSS...</p>
        <p className="text-sm text-muted-foreground">
          Si no eres redirigido automáticamente,{' '}
          <a href="/feed.xml" className="text-primary hover:underline">
            haz clic aquí
          </a>
        </p>
      </div>
    </div>
  );
};

export default RssFeed;
