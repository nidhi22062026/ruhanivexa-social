import React from 'react';

interface RoyalEmblemProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export const RoyalEmblem: React.FC<RoyalEmblemProps> = ({
  className = '',
  size = 48,
  glow = true,
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
      aria-label="Ruhanivexa Royal Emblem"
    >
      {glow && (
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-75 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(231, 199, 122, 0.45) 0%, rgba(118, 80, 200, 0.35) 55%, transparent 75%)',
          }}
        />
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10"
      >
        <defs>
          {/* Gold Gradient */}
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="45%" stopColor="#E7C77A" />
            <stop offset="100%" stopColor="#B38938" />
          </linearGradient>

          {/* Ultraviolet Glow Gradient */}
          <linearGradient id="purpleGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7650C8" />
            <stop offset="60%" stopColor="#9A72F6" />
            <stop offset="100%" stopColor="#C4B5FD" />
          </linearGradient>

          <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Orbital Ring 1 */}
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="url(#purpleGradient)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          opacity="0.6"
        />

        {/* Elliptical Tilted Orbit Ring (Celestial Horizon) */}
        <ellipse
          cx="50"
          cy="50"
          rx="44"
          ry="18"
          stroke="url(#goldGradient)"
          strokeWidth="1.5"
          transform="rotate(-25 50 50)"
          opacity="0.85"
        />

        {/* Opposite Counter-Orbit Ring */}
        <ellipse
          cx="50"
          cy="50"
          rx="40"
          ry="14"
          stroke="#7650C8"
          strokeWidth="1"
          strokeDasharray="2 4"
          transform="rotate(35 50 50)"
          opacity="0.4"
        />

        {/* Constellation Nodes on Orbit */}
        <circle cx="16" cy="33" r="2.2" fill="#E7C77A" filter="url(#starGlow)" />
        <circle cx="84" cy="67" r="2.2" fill="#E7C77A" filter="url(#starGlow)" />
        <circle cx="50" cy="5" r="1.8" fill="#FFF4D0" />
        <circle cx="50" cy="95" r="1.8" fill="#7650C8" />
        <circle cx="78" cy="28" r="1.5" fill="#E7C77A" />

        {/* Central Constellation Star Core Background */}
        <circle
          cx="50"
          cy="50"
          r="26"
          fill="#101014"
          stroke="url(#purpleGradient)"
          strokeWidth="1"
          opacity="0.9"
        />

        {/* Bespoke Constellation 'R' Glyph */}
        {/* Vertical celestial pillar of the R */}
        <path
          d="M38 27 L38 73"
          stroke="url(#goldGradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        {/* Top royal crown loop of R */}
        <path
          d="M38 28 C38 28, 62 25, 62 44 C62 55, 46 54, 38 54"
          stroke="url(#goldGradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Dynamic diagonal celestial leg of R with starlight flare */}
        <path
          d="M48 53 L63 73"
          stroke="url(#goldGradient)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />

        {/* Constellation Connection Vertices / Stars on 'R' */}
        <circle cx="38" cy="28" r="2.5" fill="#FFF4D0" filter="url(#starGlow)" />
        <circle cx="38" cy="54" r="2.2" fill="#E7C77A" filter="url(#starGlow)" />
        <circle cx="38" cy="73" r="2.5" fill="#FFF4D0" filter="url(#starGlow)" />
        <circle cx="62" cy="44" r="2.2" fill="#FFF4D0" filter="url(#starGlow)" />
        <circle cx="63" cy="73" r="2.8" fill="#FFF4D0" filter="url(#starGlow)" />

        {/* Four-pointed Starlight Sparkle at the apex */}
        <path
          d="M63 73 L65 70 L67 73 L70 75 L67 77 L65 80 L63 77 L60 75 Z"
          fill="#FFF4D0"
          opacity="0.9"
          transform="scale(0.6) translate(38, 45)"
        />
      </svg>
    </div>
  );
};
