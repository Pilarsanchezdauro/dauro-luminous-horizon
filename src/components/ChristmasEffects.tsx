import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

const ChristmasEffects = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate snowflakes
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 8 + Math.random() * 12,
        animationDelay: Math.random() * 10,
        size: 4 + Math.random() * 8,
        opacity: 0.4 + Math.random() * 0.6,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      {/* Snow container */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-snowfall"
            style={{
              left: `${flake.left}%`,
              animationDuration: `${flake.animationDuration}s`,
              animationDelay: `${flake.animationDelay}s`,
              width: `${flake.size}px`,
              height: `${flake.size}px`,
              opacity: flake.opacity,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-full h-full text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
            >
              <path d="M12 0L12.9 3.1L16 4L12.9 4.9L12 8L11.1 4.9L8 4L11.1 3.1L12 0ZM12 16L12.9 19.1L16 20L12.9 20.9L12 24L11.1 20.9L8 20L11.1 19.1L12 16ZM4 8L4.9 11.1L8 12L4.9 12.9L4 16L3.1 12.9L0 12L3.1 11.1L4 8ZM20 8L20.9 11.1L24 12L20.9 12.9L20 16L19.1 12.9L16 12L19.1 11.1L20 8Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Christmas ribbons - top corners */}
      <div className="fixed top-0 left-0 z-40 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-90">
          <defs>
            <linearGradient id="ribbonGradientLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C41E3A" />
              <stop offset="50%" stopColor="#E31B23" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
          </defs>
          <path
            d="M0 0 L120 0 L0 120 Z"
            fill="url(#ribbonGradientLeft)"
          />
          <path
            d="M0 0 L80 0 L0 80 Z"
            fill="#FFD700"
            opacity="0.3"
          />
          {/* Gold trim */}
          <path
            d="M0 90 L90 0"
            stroke="#FFD700"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M0 100 L100 0"
            stroke="#FFD700"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      <div className="fixed top-0 right-0 z-40 pointer-events-none">
        <svg width="120" height="120" viewBox="0 0 120 120" className="opacity-90">
          <defs>
            <linearGradient id="ribbonGradientRight" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#C41E3A" />
              <stop offset="50%" stopColor="#E31B23" />
              <stop offset="100%" stopColor="#8B0000" />
            </linearGradient>
          </defs>
          <path
            d="M120 0 L0 0 L120 120 Z"
            fill="url(#ribbonGradientRight)"
          />
          <path
            d="M120 0 L40 0 L120 80 Z"
            fill="#FFD700"
            opacity="0.3"
          />
          {/* Gold trim */}
          <path
            d="M30 0 L120 90"
            stroke="#FFD700"
            strokeWidth="3"
            fill="none"
          />
          <path
            d="M20 0 L120 100"
            stroke="#FFD700"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Small decorative holly/ornament in corners */}
      <div className="fixed bottom-4 left-4 z-40 pointer-events-none opacity-70">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="12" fill="#E31B23" />
          <circle cx="25" cy="25" r="8" fill="#C41E3A" />
          <ellipse cx="25" cy="15" rx="3" ry="2" fill="#FFD700" />
          <line x1="25" y1="13" x2="25" y2="8" stroke="#228B22" strokeWidth="2" />
        </svg>
      </div>

      <div className="fixed bottom-4 right-4 z-40 pointer-events-none opacity-70">
        <svg width="50" height="50" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="12" fill="#228B22" />
          <circle cx="25" cy="25" r="8" fill="#006400" />
          <ellipse cx="25" cy="15" rx="3" ry="2" fill="#FFD700" />
          <line x1="25" y1="13" x2="25" y2="8" stroke="#8B4513" strokeWidth="2" />
        </svg>
      </div>
    </>
  );
};

export default ChristmasEffects;
