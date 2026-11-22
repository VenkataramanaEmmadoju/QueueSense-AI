import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'app.title': 'QueueSense AI',
    'app.tagline': 'Smart Hospital Queue & Civic Health PWA',
    'nav.home': 'Home',
    'nav.tokens': 'My Token',
    'nav.beds': 'Live Beds',
    'nav.civic': 'CivicCare',
    'nav.profile': 'Profile',
    'btn.bookToken': 'Book OPD Token',
    'btn.emergency': 'Emergency SOS',
    'btn.fileComplaint': 'File Grievance',
    'status.waiting': 'In Queue',
    'status.serving': 'In Consultation',
    'status.in-triage': 'At Triage Station',
    'status.completed': 'Completed',
    'label.peopleAhead': 'People Ahead of You',
    'label.estWait': 'Estimated Wait',
    'label.mins': 'mins',
    'label.syntheticNotice': 'Synthetic Prototype Simulation',
    'label.caregiver': 'Caregiver Mode',
    'label.location': 'Telangana District',
    'label.bedsAvailable': 'Beds Available Now',
    'label.offlineNotice': 'Offline Mode: Stale bed reservation and live queue updates disabled'
  },
  te: {
    'app.title': 'క్యూసెన్స్ AI',
    'app.tagline': 'స్మార్ట్ ఆసుపత్రి క్యూ & పౌర ఆరోగ్య వేదిక',
    'nav.home': 'హోమ్',
    'nav.tokens': 'నా టోకెన్',
    'nav.beds': 'బెడ్లు లభ్యత',
    'nav.civic': 'సివిక్‌కేర్',
    'nav.profile': 'ప్రొఫైల్',
    'btn.bookToken': 'OPD టోకెన్ బుక్ చేయండి',
    'btn.emergency': 'అత్యవసర సహాయం (SOS)',
    'btn.fileComplaint': 'ఫిర్యాదు నమోదు చేయండి',
    'status.waiting': 'క్యూలో వేచి ఉన్నారు',
    'status.serving': 'డాక్టర్ సంప్రదింపులో',
    'status.in-triage': 'ట్రయాజ్ పరీక్షలో',
    'status.completed': 'పూర్తయింది',
    'label.peopleAhead': 'మీ ముందు ఉన్న వ్యక్తులు',
    'label.estWait': 'అంచనా వేసిన సమయం',
    'label.mins': 'నిమిషాలు',
    'label.syntheticNotice': 'సింథటిక్ డెమో సిమ్యులేషన్',
    'label.caregiver': 'సంరక్షకుల మోడ్',
    'label.location': 'తెలంగాణ జిల్లా',
    'label.bedsAvailable': 'ప్రస్తుతం ఖాళీగా ఉన్న బెడ్లు',
    'label.offlineNotice': 'ఆఫ్‌లైన్ మోడ్: పాత సమాచారం చూపించబడదు'
  },
  hi: {
    'app.title': 'क्यूसेंस AI',
    'app.tagline': 'स्मार्ट अस्पताल कतार और नागरिक स्वास्थ्य PWA',
    'nav.home': 'होम',
    'nav.tokens': 'मेरा टोकन',
    'nav.beds': 'बेड उपलब्धता',
    'nav.civic': 'सिविककेयर',
    'nav.profile': 'प्रोफ़ाइल',
    'btn.bookToken': 'OPD टोकन बुक करें',
    'btn.emergency': 'आपातकालीन SOS',
    'btn.fileComplaint': 'शिकायत दर्ज करें',
    'status.waiting': 'कतार में प्रतीक्षारत',
    'status.serving': 'परामर्श में',
    'status.in-triage': 'ट्राइएज जांच में',
    'status.completed': 'पूर्ण',
    'label.peopleAhead': 'आपसे आगे लोग',
    'label.estWait': 'अनुमानित समय',
    'label.mins': 'मिनट',
    'label.syntheticNotice': 'सिंथेटिक डेमो मॉडल',
    'label.caregiver': 'केयरगिवर मोड',
    'label.location': 'तेलंगाना जिला',
    'label.bedsAvailable': 'उपलब्ध बिस्तर',
    'label.offlineNotice': 'ऑफ़लाइन मोड: पुरानी स्थिति नहीं दिखाई जाएगी'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
