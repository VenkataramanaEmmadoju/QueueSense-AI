import React from 'react';
import { 
  Building2, 
  Users, 
  BedDouble, 
  ShieldAlert, 
  MessageSquareHeart, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { translateHospitalName, translateRole } from '../../i18n/translateHelpers';

export const StaffOverviewDesk: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentStaffUser, 
    selectedHospital, 
    tokens, 
    bedCategories, 
    emergencyAlerts, 
    grievances, 
    setStaffTab 
  } = useApp();

  const totalBeds = bedCategories.reduce((sum, b) => sum + b.total, 0);
  const availableBeds = bedCategories.reduce((sum, b) => sum + b.available, 0);
  const occupancyPercent = Math.round(((totalBeds - availableBeds) / totalBeds) * 100);

  const waitingTokens = tokens.filter(t => t.status === 'waiting').length;
  const criticalEmergencies = emergencyAlerts.filter(e => e.status === 'ambulance_en_route' || e.status === 'dispatch_requested').length;
  const pendingGrievances = grievances.filter(g => g.status === 'submitted' || g.status === 'under_review').length;

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Hospital Administrator Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-navy-200/80 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              {t('staff.sidebar_title', 'Hospital Operations')}
            </span>
            <span className="bg-navy-900 text-teal-300 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
              {translateRole(currentStaffUser.title)}
            </span>
          </div>
          <h2 className="text-2xl font-black text-navy-950 mt-1">
            {translateHospitalName(selectedHospital.name.split('(')[0])}
          </h2>
          <p className="text-xs text-navy-500 mt-0.5">
            Administrative Command & Resource Intelligence Bureau • Shift Director: {currentStaffUser.name}
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-navy-50 p-2.5 rounded-2xl border border-navy-200 text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-extrabold text-navy-900">Live Hospital Ops Normal</span>
        </div>
      </div>

      {/* 4 Operations Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => setStaffTab('tokens')}
          className="bg-white p-5 rounded-3xl border border-navy-200/80 hover:border-teal-400 text-left shadow-soft-xs transition-all group"
        >
          <div className="flex items-center justify-between text-navy-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600">{t('staff.stat_total_queue', 'Active OPD Queue')}</span>
            <Users className="w-4 h-4 text-teal-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-navy-950">{waitingTokens} {t('status.waiting', 'Waiting')}</div>
          <p className="text-[11px] text-teal-700 font-semibold mt-1">Across 8 clinical departments</p>
        </button>

        <button
          onClick={() => setStaffTab('beds')}
          className="bg-white p-5 rounded-3xl border border-navy-200/80 hover:border-teal-400 text-left shadow-soft-xs transition-all group"
        >
          <div className="flex items-center justify-between text-navy-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy-600">{t('staff.stat_bed_occupancy', 'Bed Occupancy Rate')}</span>
            <BedDouble className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-emerald-700">{occupancyPercent}% {t('beds.occupied', 'Occupied')}</div>
          <p className="text-[11px] text-slate-500 mt-1">{availableBeds} {t('beds.available', 'beds free')}</p>
        </button>

        <button
          onClick={() => setStaffTab('emergency')}
          className="bg-white p-5 rounded-3xl border border-navy-200/80 hover:border-rose-400 text-left shadow-soft-xs transition-all group"
        >
          <div className="flex items-center justify-between text-navy-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">{t('staff.stat_emergency_cases', '108 Casualty Alerts')}</span>
            <ShieldAlert className="w-4 h-4 text-rose-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-rose-700">{criticalEmergencies} Active Dispatches</div>
          <p className="text-[11px] text-rose-600 font-medium mt-1">Golden hour trauma receiving</p>
        </button>

        <button
          onClick={() => setStaffTab('civiccare')}
          className="bg-white p-5 rounded-3xl border border-navy-200/80 hover:border-amber-400 text-left shadow-soft-xs transition-all group"
        >
          <div className="flex items-center justify-between text-navy-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">{t('staff.nav_civiccare', 'CivicCare Redressal')}</span>
            <MessageSquareHeart className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl font-black text-amber-700">{pendingGrievances} Pending</div>
          <p className="text-[11px] text-amber-600 font-medium mt-1">Within SLA response time</p>
        </button>
      </div>

      {/* Staff Administration Quick Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-navy-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-navy-950 text-sm">On-Duty Department Status</h3>
            <button
              onClick={() => setStaffTab('departments')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              View Roster & Desks
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-navy-50 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-navy-900">Cardiology & Hypertension</h4>
                <p className="text-[11px] text-navy-500">Dr. Arvind Rao • Room 104</p>
              </div>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Smooth Pacing
              </span>
            </div>

            <div className="p-3 bg-navy-50 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-navy-900">General Medicine OPD</h4>
                <p className="text-[11px] text-navy-500">Dr. P. Sunita • Room 101</p>
              </div>
              <span className="text-[10px] font-black bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Moderate Load
              </span>
            </div>

            <div className="p-3 bg-navy-50 rounded-2xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-navy-900">Pediatric Care</h4>
                <p className="text-[11px] text-navy-500">Dr. M. Harish • Room 108</p>
              </div>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                Smooth Pacing
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-navy-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-navy-950 text-sm">Administrative Audit Snapshot</h3>
            <button
              onClick={() => setStaffTab('audit')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              View Full Audit Ledger
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
              <div>
                <span className="font-bold text-navy-900">Dr. Arvind Rao consulted Token A-103</span>
                <p className="text-[11px] text-navy-500">Follow-up scheduled in 30 days • Cardiology</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <div>
                <span className="font-bold text-navy-900">ICU Bed #12 Allocated</span>
                <p className="text-[11px] text-navy-500">Emergency trauma patient admitted from 108 ambulance</p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-start space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <div>
                <span className="font-bold text-navy-900">CivicCare #CC-TS-8492 Action Taken</span>
                <p className="text-[11px] text-navy-500">Sanitation team resolved water dispenser overflow in OPD Bay B</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
