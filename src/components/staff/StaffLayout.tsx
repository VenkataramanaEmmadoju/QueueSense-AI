import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  Ticket, 
  UserPlus, 
  BedDouble, 
  ShieldAlert, 
  MessageSquareHeart, 
  BarChart3, 
  FileText, 
  LogOut, 
  Menu, 
  X, 
  UserCheck, 
  Bell, 
  Sparkles,
  Users,
  Wrench,
  SprayCan
} from 'lucide-react';
import { useApp, StaffTab } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { translateRole, translateDepartment } from '../../i18n/translateHelpers';
import { StaffOverviewDesk } from './StaffOverviewDesk';
import { TokenQueueDesk } from './TokenQueueDesk';
import { PatientRegistrationDesk } from './PatientRegistrationDesk';
import { BedManagementDesk } from './BedManagementDesk';
import { EmergencyTriageDesk } from './EmergencyTriageDesk';
import { CivicCareDesk } from './CivicCareDesk';
import { AIAnalyticsDesk } from './AIAnalyticsDesk';
import { DepartmentDoctorDesk } from './DepartmentDoctorDesk';
import { StaffAuditLogsDesk } from './StaffAuditLogsDesk';
import { AttendantTasksDesk } from './AttendantTasksDesk';
import { SanitationTasksDesk } from './SanitationTasksDesk';
import { MaintenanceTasksDesk } from './MaintenanceTasksDesk';

export const StaffLayout: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentStaffUser, 
    logout, 
    staffTab, 
    setStaffTab, 
    tokens,
    emergencyAlerts,
    grievances,
    operationalTasks,
    selectedHospital
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const waitingTokensCount = tokens.filter(t => t.status === 'waiting').length;
  const criticalEmergencyCount = emergencyAlerts.filter(e => e.status === 'ambulance_en_route').length;
  const pendingGrievancesCount = grievances.filter(g => g.status === 'submitted' || g.status === 'under_review').length;
  const attendantPending = operationalTasks.filter(t => t.category === 'transport' && t.status !== 'completed').length;
  const sanitationPending = operationalTasks.filter(t => t.category === 'sanitation' && t.status !== 'completed').length;
  const maintenancePending = operationalTasks.filter(t => t.category === 'maintenance' && t.status !== 'completed').length;

  const allNavDefinitions: { id: StaffTab; label: string; icon: React.FC<{ className?: string }>; badge?: number }[] = [
    { id: 'overview', label: t('staff.nav_overview'), icon: Building2 },
    { id: 'tokens', label: t('staff.nav_tokens'), icon: Ticket, badge: waitingTokensCount },
    { id: 'registration', label: t('staff.nav_registration'), icon: UserPlus },
    { id: 'beds', label: t('staff.nav_beds'), icon: BedDouble },
    { id: 'emergency', label: t('staff.nav_emergency'), icon: ShieldAlert, badge: criticalEmergencyCount },
    { id: 'civiccare', label: t('staff.nav_civiccare'), icon: MessageSquareHeart, badge: pendingGrievancesCount },
    { id: 'attendant_tasks', label: t('staff.nav_attendant'), icon: UserCheck, badge: attendantPending },
    { id: 'sanitation_tasks', label: t('staff.nav_sanitation'), icon: Sparkles, badge: sanitationPending },
    { id: 'maintenance_tasks', label: t('staff.nav_maintenance'), icon: Wrench, badge: maintenancePending },
    { id: 'analytics', label: t('staff.nav_analytics'), icon: BarChart3 },
    { id: 'departments', label: t('staff.nav_departments'), icon: Users },
    { id: 'audit', label: t('staff.nav_audit'), icon: FileText }
  ];

  // Filter navigation items strictly to the staff user's assigned permissions
  const allowedNavItems = allNavDefinitions.filter(item => 
    currentStaffUser.allowedTabs?.includes(item.id)
  );

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col md:flex-row">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-navy-950 text-white p-4 border-r border-navy-900 shrink-0 min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Brand */}
        <div className="pb-4 border-b border-navy-800">
          <BrandLogo 
            variant="full" 
            theme="dark" 
            size="md" 
            showTagline={true} 
            badgeText="STAFF" 
          />
          <p className="mt-2 text-[10px] text-slate-400 truncate max-w-[220px]">
            {selectedHospital.name.split('(')[0]}
          </p>
        </div>

        {/* Current Staff User Card (No Role Simulation buttons) */}
        <div className="my-4 p-3.5 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-3">
            <span className="text-3xl shrink-0">{currentStaffUser.avatar}</span>
            <div className="min-w-0 flex-1">
              <h4 className="font-extrabold text-white text-xs truncate">{currentStaffUser.name}</h4>
              <p className="text-[10px] text-teal-300 truncate font-bold uppercase">{translateRole(currentStaffUser.role)}</p>
              <p className="text-[10px] text-slate-400 font-mono">{currentStaffUser.badgeId}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-slate-400">Terminal:</span>
            <span className="text-teal-300 font-medium truncate max-w-[150px]">{translateDepartment(currentStaffUser.department)}</span>
          </div>
        </div>

        {/* Language Switcher in Staff Sidebar */}
        <div className="mb-3">
          <LanguageSwitcher variant="dark" />
        </div>

        {/* Navigation Items (Role-based permissions) */}
        <nav className="space-y-1 flex-1">
          {allowedNavItems.map((item) => {
            const isActive = staffTab === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setStaffTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-medical-700 text-white shadow-soft-sm font-bold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate pr-2">
                  <Icon className="w-4 h-4 text-teal-300 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full shrink-0 ${
                    item.id === 'emergency' ? 'bg-rose-500 text-white' : 'bg-teal-500 text-navy-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom Actions: Logout Only (No cross-role buttons) */}
        <div className="pt-3 border-t border-navy-800">
          <button
            onClick={logout}
            className="w-full text-slate-400 hover:text-rose-300 text-xs font-semibold py-2 px-3 rounded-xl hover:bg-white/5 flex items-center justify-center space-x-1.5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>{t('nav.sign_out')}</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR (For Staff on mobile) */}
      <div className="md:hidden bg-navy-950 text-white p-3 flex items-center justify-between sticky top-0 z-40 border-b border-navy-900 shadow-md">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center space-x-2">
            <BrandLogo 
              variant="compact" 
              theme="dark" 
              size="sm" 
              badgeText={translateRole(currentStaffUser.role)} 
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <LanguageSwitcher variant="dark" />
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-rose-300"
            title={t('nav.sign_out')}
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex">
          <div className="w-64 bg-navy-950 text-white p-4 flex flex-col justify-between h-full border-r border-navy-900 animate-in slide-in-from-left">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-3">
                <span className="font-extrabold text-white text-sm">Staff Modules</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {allowedNavItems.map((item) => {
                  const isActive = staffTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setStaffTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-medical-700 text-white font-bold' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4 text-teal-300" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="text-[10px] bg-teal-500 text-navy-950 px-1.5 py-0.2 rounded-full font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-3 border-t border-navy-800">
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
        {staffTab === 'overview' && <StaffOverviewDesk />}
        {staffTab === 'tokens' && <TokenQueueDesk />}
        {staffTab === 'registration' && <PatientRegistrationDesk />}
        {staffTab === 'beds' && <BedManagementDesk />}
        {staffTab === 'emergency' && <EmergencyTriageDesk />}
        {staffTab === 'civiccare' && <CivicCareDesk />}
        {staffTab === 'attendant_tasks' && <AttendantTasksDesk />}
        {staffTab === 'sanitation_tasks' && <SanitationTasksDesk />}
        {staffTab === 'maintenance_tasks' && <MaintenanceTasksDesk />}
        {staffTab === 'analytics' && <AIAnalyticsDesk />}
        {staffTab === 'departments' && <DepartmentDoctorDesk />}
        {staffTab === 'audit' && <StaffAuditLogsDesk />}
      </main>
    </div>
  );
};
