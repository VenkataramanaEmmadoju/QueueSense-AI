import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Stethoscope, 
  Users, 
  Calendar, 
  Clock, 
  FileCheck, 
  BarChart3, 
  UserCheck, 
  LogOut, 
  Menu, 
  X, 
  Sparkles, 
  Bell, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DoctorTab } from '../../types';
import { DoctorOverview } from './DoctorOverview';
import { DoctorQueueDesk } from './DoctorQueueDesk';
import { DoctorConsultationView } from './DoctorConsultationView';
import { DoctorAppointmentsView } from './DoctorAppointmentsView';
import { DoctorScheduleView } from './DoctorScheduleView';
import { DoctorInsightsView } from './DoctorInsightsView';
import { DoctorProfileView } from './DoctorProfileView';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { translateDepartment } from '../../i18n/translateHelpers';

export const DoctorLayout: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentDoctorUser, 
    doctorTab, 
    setDoctorTab, 
    logout, 
    doctorQueueTokens, 
    activeConsultationToken,
    notifications 
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const waitingCount = doctorQueueTokens.filter(t => t.status === 'waiting').length;

  const navItems: { id: DoctorTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: t('doctor.nav_overview'), icon: Stethoscope },
    { id: 'queue', label: t('doctor.nav_queue'), icon: Users, badge: waitingCount },
    { 
      id: 'consultation', 
      label: t('doctor.nav_consultation'), 
      icon: FileCheck, 
      badge: activeConsultationToken ? 1 : undefined 
    },
    { id: 'appointments', label: t('doctor.nav_appointments'), icon: Calendar },
    { id: 'schedule', label: t('doctor.nav_schedule'), icon: Clock },
    { id: 'insights', label: t('doctor.nav_insights'), icon: BarChart3 },
    { id: 'profile', label: t('doctor.nav_profile'), icon: UserCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-slate-800">
      {/* DESKTOP CLINICAL SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-slate-900 text-white p-4 border-r border-slate-800 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="pb-4 border-b border-slate-800">
          <BrandLogo 
            variant="full" 
            theme="dark" 
            size="md" 
            showTagline={true} 
            badgeText="DOCTOR" 
          />
        </div>

        {/* Doctor Identity Card */}
        <div className="my-4 p-3 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center text-xl shrink-0">
              {currentDoctorUser.avatar}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-extrabold text-white text-xs truncate">{currentDoctorUser.name}</h4>
              <p className="text-[10px] text-teal-300 font-semibold truncate">{translateDepartment(currentDoctorUser.department)}</p>
              <p className="text-[10px] text-slate-400 font-mono">{currentDoctorUser.roomNumber}</p>
            </div>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">{t('doctor.shift_status')}</span>
            <span className="inline-flex items-center text-emerald-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1" />
              {t('doctor.on_duty')}
            </span>
          </div>
        </div>

        {/* Language Switcher in Doctor Sidebar */}
        <div className="mb-3">
          <LanguageSwitcher variant="dark" />
        </div>

        {/* Active Consultation Alert Pill in Sidebar */}
        {activeConsultationToken && (
          <button
            onClick={() => setDoctorTab('consultation')}
            className="mb-3 p-2.5 rounded-2xl bg-teal-500/15 border border-teal-400/40 text-left hover:bg-teal-500/25 transition-all text-xs"
          >
            <div className="flex items-center justify-between text-[10px] font-bold text-teal-300 uppercase">
              <span>{t('doctor.consulting_now')}</span>
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
            </div>
            <p className="font-black text-white text-sm mt-0.5">{activeConsultationToken.tokenNumber}</p>
            <p className="text-[11px] text-slate-300 truncate">{activeConsultationToken.patientName}</p>
          </button>
        )}

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => {
            const isActive = doctorTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setDoctorTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-soft-sm font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon className="w-4 h-4 text-teal-300" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full ${
                    item.id === 'consultation' ? 'bg-amber-400 text-slate-950' : 'bg-teal-400 text-slate-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sign Out (No cross-role buttons) */}
        <div className="pt-3 border-t border-slate-800">
          <button
            onClick={logout}
            className="w-full text-slate-400 hover:text-rose-300 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-white/5 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('doctor.sign_out')}</span>
          </button>
        </div>
      </aside>

      {/* MOBILE CLINICAL HEADER */}
      <header className="md:hidden bg-slate-900 text-white p-3 flex items-center justify-between sticky top-0 z-40 border-b border-slate-800 shadow-md">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <BrandLogo 
            variant="compact" 
            theme="dark" 
            size="sm" 
            badgeText="DOCTOR" 
          />
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher variant="dark" />
          {activeConsultationToken && (
            <button
              onClick={() => setDoctorTab('consultation')}
              className="bg-teal-500 text-slate-950 px-2 py-1 rounded-lg text-[10px] font-black animate-pulse"
            >
              {t('doctor.consulting_now')} {activeConsultationToken.tokenNumber}
            </button>
          )}
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-300"
            title={t('nav.sign_out')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER NAVIGATION */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex">
          <div className="w-64 bg-slate-900 text-white p-4 flex flex-col justify-between h-full border-r border-slate-800 animate-in slide-in-from-left">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-extrabold text-white text-sm">Doctor Navigation</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const isActive = doctorTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setDoctorTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-teal-600 text-white font-bold' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-teal-300" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] bg-teal-400 text-slate-950 px-1.5 py-0.2 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <button
                onClick={logout}
                className="w-full text-slate-400 hover:text-rose-300 text-xs font-semibold py-2 flex items-center justify-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
        {doctorTab === 'overview' && <DoctorOverview />}
        {doctorTab === 'queue' && <DoctorQueueDesk />}
        {doctorTab === 'consultation' && <DoctorConsultationView />}
        {doctorTab === 'appointments' && <DoctorAppointmentsView />}
        {doctorTab === 'schedule' && <DoctorScheduleView />}
        {doctorTab === 'insights' && <DoctorInsightsView />}
        {doctorTab === 'profile' && <DoctorProfileView />}
      </main>
    </div>
  );
};
