import React from 'react';
import { RoyalEmblem } from './RoyalEmblem';

interface WordmarkProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showEmblem?: boolean;
  className?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({
  showTagline = true,
  size = 'md',
  showEmblem = true,
  className = '',
}) => {
  const emblemSizes = {
    sm: 32,
    md: 44,
    lg: 56,
  };

  const titleSizes = {
    sm: 'text-base tracking-[0.2em]',
    md: 'text-xl tracking-[0.25em]',
    lg: 'text-2xl sm:text-3xl tracking-[0.28em]',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[11px] tracking-[0.24em]',
    lg: 'text-xs tracking-[0.3em]',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {showEmblem && <RoyalEmblem size={emblemSizes[size]} />}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-royal font-bold uppercase gold-gradient-text drop-shadow-[0_2px_8px_rgba(231,199,122,0.3)] ${titleSizes[size]}`}
          >
            RUHANIVEXA
          </span>
          <span
            className={`font-royal font-light tracking-[0.15em] text-[#9A72F6] ${
              size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'
            }`}
          >
            SOCIAL
          </span>
        </div>
        {showTagline && (
          <p
            className={`font-tech uppercase text-[#E7C77A]/80 font-medium ${taglineSizes[size]}`}
          >
            Your World <span className="text-[#7650C8]">•</span> Your People <span className="text-[#7650C8]">•</span> Your Stories
          </p>
        )}
      </div>
    </div>
  );
};
