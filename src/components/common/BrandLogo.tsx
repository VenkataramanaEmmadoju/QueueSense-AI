import React from 'react';

export interface BrandLogoProps {
  variant?: 'full' | 'standard' | 'compact' | 'symbol';
  theme?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  badgeText?: string;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'standard',
  theme = 'light',
  size = 'md',
  showTagline = false,
  badgeText,
  className = '',
  onClick
}) => {
  // Dimensions mapping
  const symbolSizes = {
    sm: 'h-7 w-auto',
    md: 'h-9 w-auto',
    lg: 'h-12 w-auto',
    xl: 'h-16 w-auto'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base sm:text-lg',
    lg: 'text-xl sm:text-2xl',
    xl: 'text-2xl sm:text-3xl'
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-xs sm:text-sm'
  };

  const isDark = theme === 'dark';

  // 1. SYMBOL ONLY VARIANT
  if (variant === 'symbol') {
    return (
      <div 
        onClick={onClick}
        className={`inline-flex items-center justify-center shrink-0 ${onClick ? 'cursor-pointer active:scale-95 transition-transform' : ''} ${className}`}
      >
        <img 
          src="/brand/queuesense-symbol.png" 
          alt="QueueSense AI Symbol" 
          className={`${symbolSizes[size]} object-contain drop-shadow-sm select-none`}
          loading="eager"
        />
      </div>
    );
  }

  // 2. FULL BRAND LOGO (Image or Symbol + Typography + Tagline)
  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center space-x-2.5 select-none ${onClick ? 'cursor-pointer active:scale-98 transition-transform' : ''} ${className}`}
    >
      {/* Official Emblem: Hospital building, medical cross, patient queue silhouettes, and flowing teal wave */}
      <div className="shrink-0 flex items-center justify-center">
        <img 
          src="/brand/queuesense-symbol.png" 
          alt="QueueSense AI Emblem" 
          className={`${symbolSizes[size]} object-contain drop-shadow-sm`}
          loading="eager"
        />
      </div>

      {/* Brand Typography & Tagline */}
      <div className="min-w-0 leading-tight">
        <div className="flex items-center space-x-1.5 flex-wrap">
          <span className={`font-black tracking-tight ${textSizes[size]} ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Queue<span className={isDark ? 'text-teal-300' : 'text-teal-600'}>Sense</span>
            <span className={`ml-1 font-black ${isDark ? 'text-teal-400' : 'text-teal-500'}`}>AI</span>
          </span>

          {badgeText && (
            <span className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded uppercase tracking-wider border ${
              isDark 
                ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' 
                : 'bg-teal-50 text-teal-800 border-teal-200'
            }`}>
              {badgeText}
            </span>
          )}
        </div>

        {/* Official Brand Tagline */}
        {(showTagline || variant === 'full') && (
          <p className={`font-medium tracking-normal mt-0.5 ${taglineSizes[size]} ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
            Smart Hospital Queues, Better Care
          </p>
        )}
      </div>
    </div>
  );
};
