import React from 'react';
import { Home, Building2, Calendar, MessageSquareHeart, UserCheck, Ticket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp, PatientTab } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { patientTab, setPatientTab, appointments, activePatientToken, appMode } = useApp();
  const { t } = useTranslation();

  if (appMode !== 'patient') return null;

  const upcomingCount = appointments.filter(a => a.status === 'upcoming').length;

  const navItems: { id: PatientTab; label: string; icon: React.FC<{ className?: string }>; badge?: string | number }[] = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'hospitals', label: t('nav.hospitals'), icon: Building2 },
    { 
      id: 'appointments', 
      label: t('nav.appointments'), 
      icon: Calendar, 
      badge: upcomingCount > 0 ? upcomingCount : undefined 
    },
    { id: 'civiccare', label: t('nav.civiccare'), icon: MessageSquareHeart },
    { id: 'profile', label: t('nav.profile'), icon: UserCheck }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-navy-100 shadow-soft-lg pb-[calc(env(safe-area-inset-bottom,8px)+6px)] pt-2 md:hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 px-1">
        {navItems.map((item) => {
          const isActive = patientTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => setPatientTab(item.id)}
              className={`relative flex flex-col items-center justify-center py-1 transition-all active:scale-90 ${
                isActive ? 'text-medical-700 font-bold' : 'text-navy-400 hover:text-navy-700 font-medium'
              }`}
            >
              <div className="relative">
                <div className={`p-1 rounded-xl transition-all ${
                  isActive ? 'bg-medical-50 text-medical-700 scale-110' : ''
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 px-1.5 py-0.2 min-w-4 text-[9px] font-black bg-medical-600 text-white rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-bold text-medical-800' : 'text-navy-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 bg-medical-600 rounded-full mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
