import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark' | 'compact';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'light', className = '' }) => {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('queuesense_preferred_lang', lang);
    }
  };

  const currentLang = i18n.language?.startsWith('te') ? 'te' : i18n.language?.startsWith('hi') ? 'hi' : 'en';

  const baseContainerStyles = variant === 'dark'
    ? 'bg-white/10 p-0.5 rounded-xl border border-white/10'
    : 'bg-navy-100/70 p-0.5 rounded-lg';

  const activeStyles = variant === 'dark'
    ? 'bg-teal-500 text-slate-950 font-black shadow-soft-xs'
    : 'bg-white text-medical-800 font-black shadow-soft-sm';

  const inactiveStyles = variant === 'dark'
    ? 'text-slate-300 hover:text-white'
    : 'text-navy-600 hover:text-navy-950 font-semibold';

  return (
    <div className={`flex items-center text-[11px] ${baseContainerStyles} ${className}`}>
      {(['en', 'te', 'hi'] as const).map(lang => (
        <button
          key={lang}
          type="button"
          onClick={() => handleLanguageChange(lang)}
          aria-label={`Switch to ${lang === 'te' ? 'Telugu' : lang === 'hi' ? 'Hindi' : 'English'}`}
          className={`px-2 py-0.5 rounded-md transition-all uppercase ${
            currentLang === lang ? activeStyles : inactiveStyles
          }`}
        >
          {lang === 'te' ? 'తెలుగు' : lang === 'hi' ? 'हिंदी' : 'EN'}
        </button>
      ))}
    </div>
  );
};
