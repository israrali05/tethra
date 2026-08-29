import React from 'react';

interface TethraLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtext?: boolean;
  className?: string;
}

export const TethraLogo: React.FC<TethraLogoProps> = ({
  size = 'md',
  showSubtext = true,
  className = '',
}) => {
  const sizeMap = {
    sm: { icon: 26, title: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 34, title: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 44, title: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 56, title: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`} id="tethra-main-logo">
      {/* Luxury Emerald & Gold Shield Monogram */}
      <div className="relative flex items-center justify-center">
        <svg
          width={currentSize.icon}
          height={currentSize.icon}
          viewBox="0 0 100 100"
          className="drop-shadow-[0_0_12px_rgba(212,175,55,0.4)] transition-transform duration-300 hover:scale-105"
        >
          <defs>
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0a4636" />
              <stop offset="50%" stopColor="#04231a" />
              <stop offset="100%" stopColor="#02130e" />
            </linearGradient>
            <linearGradient id="goldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fae084" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#996515" />
            </linearGradient>
            <linearGradient id="tethraLetter" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f3c64f" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>
          </defs>

          {/* Outer Geometric Shield */}
          <polygon
            points="50,6 92,28 92,72 50,94 8,72 8,28"
            fill="url(#shieldGrad)"
            stroke="url(#goldBorder)"
            strokeWidth="3.5"
          />

          {/* Inner Accent Inset */}
          <polygon
            points="50,14 84,32 84,68 50,86 16,68 16,32"
            fill="none"
            stroke="rgba(212, 175, 55, 0.35)"
            strokeWidth="1.5"
            strokeDasharray="4 2"
          />

          {/* Distinctive 'T' Monogram with Fintech Node */}
          <path
            d="M30 36 L70 36 M50 36 L50 72 M42 72 L58 72"
            stroke="url(#tethraLetter)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Node spark */}
          <circle cx="50" cy="36" r="3.5" fill="#ffffff" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-display font-extrabold tracking-tight text-white ${currentSize.title}`}>
            tethra<span className="text-[#d4af37]">.net</span>
          </span>
        </div>
        {showSubtext && (
          <span className={`font-mono font-medium tracking-wider uppercase text-[#a3c9bd] mt-0.5 ${currentSize.sub}`}>
            Private Fintech &amp; Banking
          </span>
        )}
      </div>
    </div>
  );
};
