import React, { useMemo } from 'react';

export const CosmicBackground: React.FC = () => {
  // Generate random static stars with twinkling attributes
  const stars = useMemo(() => {
    const starList = [];
    for (let i = 0; i < 75; i++) {
      starList.push({
        id: i,
        top: `${(Math.random() * 100).toFixed(2)}%`,
        left: `${(Math.random() * 100).toFixed(2)}%`,
        size: Math.random() > 0.85 ? 2.5 : Math.random() > 0.6 ? 1.8 : 1.2,
        opacity: (Math.random() * 0.7 + 0.3).toFixed(2),
        animationDuration: `${(Math.random() * 3 + 2).toFixed(1)}s`,
        animationDelay: `${(Math.random() * 5).toFixed(1)}s`,
        isGold: Math.random() > 0.75,
      });
    }
    return starList;
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base Midnight Void */}
      <div className="absolute inset-0 bg-[#101014]" />

      {/* Royal Purple Nebula Top Left */}
      <div
        className="absolute -top-[20%] -left-[10%] w-[65vw] h-[65vw] max-w-[700px] max-h-[700px] rounded-full opacity-40 blur-[90px] animate-nebula"
        style={{
          background: 'radial-gradient(circle, #7650C8 0%, #291536 60%, transparent 80%)',
        }}
      />

      {/* Deep Aubergine & Ultraviolet Nebula Bottom Right */}
      <div
        className="absolute -bottom-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] rounded-full opacity-35 blur-[100px] animate-nebula-delayed"
        style={{
          background: 'radial-gradient(circle, #291536 0%, #7650C8 40%, transparent 80%)',
        }}
      />

      {/* Subtle Champagne Gold Stardust Flare Center-Right */}
      <div
        className="absolute top-[35%] right-[15%] w-[40vw] h-[40vw] max-w-[450px] max-h-[450px] rounded-full opacity-15 blur-[80px]"
        style={{
          background: 'radial-gradient(circle, #E7C77A 0%, rgba(118,80,200,0.3) 50%, transparent 80%)',
        }}
      />

      {/* Constellation Starfield */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full transition-opacity duration-1000"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.isGold ? '#E7C77A' : '#F7F4EF',
            opacity: star.opacity,
            boxShadow: star.isGold
              ? '0 0 6px #E7C77A'
              : '0 0 4px #F7F4EF',
            animationName: 'starlight-twinkle',
            animationDuration: star.animationDuration,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDelay: star.animationDelay,
          }}
        />
      ))}

      {/* Subtle geometric grid horizon lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #E7C77A 1px, transparent 1px), linear-gradient(to right, rgba(118,80,200,0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 80px 80px',
        }}
      />
    </div>
  );
};
