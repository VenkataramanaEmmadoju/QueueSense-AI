import React, { useState } from 'react';
import { 
  Activity, 
  MapPin, 
  Users, 
  Bell, 
  ChevronDown, 
  ShieldAlert, 
  PhoneCall,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { LocationModal } from './LocationModal';
import { CaregiverModal } from './CaregiverModal';
import { NotificationsDrawer } from './NotificationsDrawer';
import { BrandLogo } from './BrandLogo';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    appMode, 
    selectedDistrict, selectedVillage,
    activePatientIdentity,
    currentUser,
    patientProfile,
    notifications,
    setPatientTab,
    logout,
    userRole
  } = useApp();

  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const currentCaregiverName = activePatientIdentity === 'self' 
    ? 'Myself' 
    : `${activePatientIdentity.relationship} (${activePatientIdentity.name.split(' ')[0]})`;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('queuesense_preferred_lang', lang);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-navy-100 shadow-soft-sm">
        {/* Top utility bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-1.5 flex items-center justify-between border-b border-navy-50 text-xs">
          {/* Location pill */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center space-x-1.5 text-navy-700 hover:text-medical-700 bg-navy-50 hover:bg-navy-100/80 px-2.5 py-1 rounded-full transition-all text-[11px] font-medium border border-navy-200/60 max-w-[210px] sm:max-w-xs truncate"
            title="Change Telangana District/Mandal"
          >
            <MapPin className="w-3.5 h-3.5 text-medical-600 shrink-0" />
            <span className="truncate">
              {selectedVillage}, {selectedDistrict}
            </span>
            <ChevronDown className="w-3 h-3 text-navy-400 shrink-0" />
          </button>

          {/* Right controls: Language, Emergency 112, Switch Mode, Logout */}
          <div className="flex items-center space-x-2">
            {/* Direct Call 112 */}
            <a
              href="tel:112"
              className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2 py-0.5 rounded-lg text-[10px] font-black flex items-center space-x-1 transition-all active:scale-95"
            >
              <PhoneCall className="w-3 h-3 text-rose-600" />
              <span>112</span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center bg-navy-100/70 p-0.5 rounded-lg text-[11px] font-bold">
              {(['en', 'te', 'hi'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => handleLanguageChange(lang)}
                  className={`px-2 py-0.5 rounded-md transition-all uppercase ${
                    i18n.language === lang 
                      ? 'bg-white text-medical-800 shadow-soft-sm font-extrabold' 
                      : 'text-navy-500 hover:text-navy-800'
                  }`}
                >
                  {lang === 'te' ? 'తె' : lang === 'hi' ? 'हि' : 'EN'}
                </button>
              ))}
            </div>

            {/* Logout button */}
            <button
              onClick={logout}
              className="p-1 text-navy-400 hover:text-rose-600 rounded-lg hover:bg-navy-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main App Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Official QueueSense AI Brand Logo */}
          <div 
            onClick={() => {
              if (appMode === 'patient') setPatientTab('home');
            }}
            className="cursor-pointer select-none"
          >
            <BrandLogo 
              variant="full" 
              theme="light" 
              size="md" 
              showTagline={true} 
              badgeText="AI PWA" 
            />
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* My Family Quick Shortcut in Header */}
            {appMode === 'patient' && (
              <button
                onClick={() => setPatientTab('family')}
                className="hidden sm:flex items-center space-x-1.5 bg-teal-50 hover:bg-teal-100/80 border border-teal-200 text-teal-800 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                <Users className="w-3.5 h-3.5 text-teal-600" />
                <span>My Family</span>
              </button>
            )}

            {/* Caregiver Switcher */}
            {appMode === 'patient' && (
              <button
                onClick={() => setIsCaregiverModalOpen(true)}
                className="flex items-center space-x-1.5 bg-medical-50/80 hover:bg-medical-100/80 border border-medical-200/80 text-medical-800 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
              >
                <UserCheck className="w-3.5 h-3.5 text-medical-600" />
                <span className="max-w-[85px] sm:max-w-none truncate">{currentCaregiverName}</span>
                <ChevronDown className="w-3 h-3 text-medical-500" />
              </button>
            )}

            {/* Emergency SOS quick pill in header */}
            {appMode === 'patient' && (
              <button
                onClick={() => setPatientTab('emergency')}
                className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1 transition-all active:scale-95"
              >
                <ShieldAlert className="w-3.5 h-3.5 text-rose-600 animate-bounce" />
                <span className="hidden sm:inline">108 SOS</span>
              </button>
            )}

            {/* Notification bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 text-navy-600 hover:text-navy-900 rounded-xl hover:bg-navy-100 transition-colors"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Modals & Drawers */}
      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
      <CaregiverModal 
        isOpen={isCaregiverModalOpen} 
        onClose={() => setIsCaregiverModalOpen(false)} 
      />
      <NotificationsDrawer 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />
    </>
  );
};
