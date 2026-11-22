import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enTranslations } from './i18n/locales/en';
import { teTranslations } from './i18n/locales/te';
import { hiTranslations } from './i18n/locales/hi';

export const resources = {
  en: {
    translation: enTranslations
  },
  te: {
    translation: teTranslations
  },
  hi: {
    translation: hiTranslations
  }
};

const savedLang = (typeof window !== 'undefined' && localStorage.getItem('queuesense_preferred_lang')) || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
