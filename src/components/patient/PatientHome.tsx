import React from 'react';
import { 
  CalendarPlus, 
  Calendar,
  BedDouble, 
  MessageSquareHeart, 
  ShieldAlert, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Users, 
  Building2,
  Sparkles,
  Info,
  CheckCircle2,
  Activity,
  UserCheck
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { DEMO_DATA_NOTICE } from '../../data/syntheticData';

export const PatientHome: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentUser,
    patientProfile, 
    activePatientIdentity, 
    activePatientToken, 
    selectedHospital,
    departments,
    setPatientTab,
    bedCategories,
    familyMembers,
    appointments
  } = useApp();

  const currentName = activePatientIdentity === 'self' 
    ? (currentUser?.name || patientProfile.name) 
    : activePatientIdentity.name;

  const totalAvailableBeds = bedCategories.reduce((sum, b) => sum + b.available, 0);
  const upcomingAppointmentsCount = appointments.filter(a => a.status === 'upcoming').length;

  return (
    <div className="space-y-6 pb-20 md:pb-8 animate-in fade-in">
      {/* Synthetic Demo Banner Notice */}
      <div className="bg-gradient-to-r from-medical-50 to-teal-50/70 border border-medical-200/60 rounded-2xl p-2.5 px-3 flex items-start space-x-2.5 shadow-soft-xs">
        <Info className="w-4 h-4 text-medical-700 shrink-0 mt-0.5" />
        <div className="text-[11px] text-navy-700 leading-tight">
          <span className="font-bold text-medical-800">Operational Prototype: </span>
          {DEMO_DATA_NOTICE}. Real-time patient & staff flows active for evaluation.
        </div>
      </div>

      {/* RESPONSIVE DESKTOP TWO-COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: PRIMARY PATIENT FLOWS (Cols 1-7 on desktop) */}
        <div className="lg:col-span-7 space-y-6">
          {/* REDESIGNED PATIENT PROFILE CARD (Restrained subtle navy, crisp contrast, verified demo badges) */}
          <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-6 shadow-soft-lg relative overflow-hidden">
            {/* Subtle radial teal accent glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-teal-300 font-bold tracking-wide uppercase">
                    Namaste / Welcome
                  </span>
                  {activePatientIdentity !== 'self' && (
                    <span className="bg-teal-500/20 text-teal-300 border border-teal-400/40 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Caregiver: {activePatientIdentity.relationship}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {currentName}
                </h2>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-1 text-xs text-slate-300">
                  <span className="font-mono text-slate-300">
                    UHID: {currentUser?.uhidDemoNumber || patientProfile.uhid}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="bg-white/10 text-slate-200 border border-white/15 text-[10px] font-semibold px-2 py-0.5 rounded-md">
                    ABHA Demo Placeholder (Unverified)
                  </span>
                </div>
              </div>

              {/* Profile Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-3xl shadow-soft-xs shrink-0">
                {activePatientIdentity === 'self' ? '👤' : '👨‍👩‍👧'}
              </div>
            </div>

            {/* Clearly Separated Hospital & Scheme Information Bar */}
            <div className="mt-5 pt-3.5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center space-x-2 text-slate-300 truncate">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="font-semibold truncate">{selectedHospital.name.split('(')[0]}</span>
              </div>
              
              {/* High-Contrast Unverified Aarogyasri Scheme Demo Badge */}
              <span className="bg-teal-500/20 text-teal-300 border border-teal-500/40 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
                Demo Scheme Info (Unverified Aarogyasri)
              </span>
            </div>
          </div>

          {/* ACTIVE TOKEN LIVE TRACKER OR BOOKING CALLOUT */}
          {activePatientToken ? (
            <div className="bg-white border-2 border-teal-500/30 rounded-3xl p-5 shadow-soft-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-teal-600 text-white text-[10px] font-black uppercase px-3.5 py-1 rounded-bl-xl tracking-wider">
                Live Queue Active
              </div>

              <div className="flex items-center space-x-3.5 mb-3">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-black text-2xl border border-teal-200">
                  {activePatientToken.tokenNumber}
                </div>
                <div>
                  <div className="text-xs text-navy-500 font-medium">Digital OPD Pass</div>
                  <h3 className="font-extrabold text-navy-950 text-base">{activePatientToken.department}</h3>
                  <p className="text-xs text-teal-700 font-semibold">{activePatientToken.doctorName} • {activePatientToken.roomNumber}</p>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200 my-3 text-center">
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Ahead of You</div>
                  <div className="text-lg font-black text-slate-900 mt-0.5">
                    {activePatientToken.peopleAhead} {activePatientToken.peopleAhead === 1 ? 'patient' : 'patients'}
                  </div>
                </div>
                <div className="border-x border-slate-200">
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Est. Consult</div>
                  <div className="text-lg font-black text-teal-700 mt-0.5">
                    {activePatientToken.estimatedConsultTime}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase">Token State</div>
                  <div className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg py-1 px-1 mt-1 uppercase">
                    {activePatientToken.status}
                  </div>
                </div>
              </div>

              {/* AI Guidance */}
              <div className="bg-teal-50/70 border border-teal-200/60 rounded-xl p-2.5 flex items-start space-x-2 text-xs text-teal-950 mb-3">
                <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <p className="leading-snug">{activePatientToken.aiAdvice}</p>
              </div>

              <button
                onClick={() => setPatientTab('tokens')}
                className="w-full bg-teal-600 hover:bg-teal-700 active:scale-[0.98] text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-soft-sm"
              >
                <span>View Full Journey Timeline & QR Pass</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider">No Active Waiting Token</span>
                <h3 className="font-extrabold text-navy-950 text-sm sm:text-base">Ready for your OPD appointment?</h3>
                <p className="text-xs text-navy-500">Book in under 30 seconds with instant digital token pass</p>
              </div>
              <button
                onClick={() => setPatientTab('booking')}
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center space-x-1.5 shadow-soft-sm active:scale-95 shrink-0 self-start sm:self-auto"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Book OPD Now</span>
              </button>
            </div>
          )}

          {/* HEALTHCARE SERVICES 2x2 / 4-COLUMN RESPONSIVE GRID */}
          <div>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-xs font-bold text-navy-600 uppercase tracking-wider">Healthcare Services</h3>
              <span className="text-[11px] text-navy-400">PWA Modules</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-3">
              {/* Action 1: Book OPD */}
              <button
                onClick={() => setPatientTab('booking')}
                className="bg-white hover:bg-teal-50/40 border border-navy-200/80 hover:border-teal-300 rounded-3xl p-4 text-left transition-all active:scale-[0.97] shadow-soft-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <CalendarPlus className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-950 text-xs sm:text-sm">Book OPD</h4>
                <p className="text-[11px] text-navy-500 mt-1 leading-tight">
                  Fast token booking across 8 specialties
                </p>
                <div className="flex items-center text-xs text-teal-600 font-semibold mt-2.5 group-hover:translate-x-1 transition-transform">
                  <span>Start</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Action 2: My Family */}
              <button
                onClick={() => setPatientTab('family')}
                className="bg-white hover:bg-teal-50/40 border border-navy-200/80 hover:border-teal-300 rounded-3xl p-4 text-left transition-all active:scale-[0.97] shadow-soft-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1">
                  <h4 className="font-bold text-navy-950 text-xs sm:text-sm">My Family</h4>
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-1.5 rounded-full">
                    {familyMembers.length}
                  </span>
                </div>
                <p className="text-[11px] text-navy-500 mt-1 leading-tight">
                  Manage parents, spouse and children
                </p>
                <div className="flex items-center text-xs text-indigo-700 font-semibold mt-2.5 group-hover:translate-x-1 transition-transform">
                  <span>Profiles</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Action 3: Live Beds */}
              <button
                onClick={() => setPatientTab('beds')}
                className="bg-white hover:bg-teal-50/40 border border-navy-200/80 hover:border-teal-300 rounded-3xl p-4 text-left transition-all active:scale-[0.97] shadow-soft-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <BedDouble className="w-5 h-5" />
                </div>
                <div className="flex items-center space-x-1">
                  <h4 className="font-bold text-navy-950 text-xs sm:text-sm">Live Beds</h4>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 rounded-full">
                    {totalAvailableBeds}
                  </span>
                </div>
                <p className="text-[11px] text-navy-500 mt-1 leading-tight">
                  Track ICU & ward bed availability
                </p>
                <div className="flex items-center text-xs text-emerald-700 font-semibold mt-2.5 group-hover:translate-x-1 transition-transform">
                  <span>Wards</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>

              {/* Action 4: CivicCare */}
              <button
                onClick={() => setPatientTab('civiccare')}
                className="bg-white hover:bg-teal-50/40 border border-navy-200/80 hover:border-teal-300 rounded-3xl p-4 text-left transition-all active:scale-[0.97] shadow-soft-xs group"
              >
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <MessageSquareHeart className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-navy-950 text-xs sm:text-sm">CivicCare</h4>
                <p className="text-[11px] text-navy-500 mt-1 leading-tight">
                  Report sanitation & hospital issues
                </p>
                <div className="flex items-center text-xs text-amber-700 font-semibold mt-2.5 group-hover:translate-x-1 transition-transform">
                  <span>Report</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: APPOINTMENTS, EMERGENCY & LIVE QUEUE RADAR (Cols 8-12 on desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Shortcuts: My Appointments & 112 Emergency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {/* Appointments card */}
            <div 
              onClick={() => setPatientTab('appointments')}
              className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-xs cursor-pointer hover:border-teal-300 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-950 text-xs sm:text-sm">My Appointments</h4>
                  <p className="text-[11px] text-navy-500">{upcomingAppointmentsCount} Upcoming Consultation(s)</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-navy-400 shrink-0" />
            </div>

            {/* 112 / 108 Emergency Card */}
            <div 
              onClick={() => setPatientTab('emergency')}
              className="bg-gradient-to-r from-rose-50 to-white border border-rose-200 rounded-3xl p-4 shadow-soft-xs cursor-pointer hover:border-rose-300 transition-all flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center animate-pulse shrink-0">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-rose-950 text-xs sm:text-sm">Call 112 / 108 Emergency</h4>
                  <p className="text-[11px] text-rose-700/80">Immediate ambulance & casualty beacon</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-rose-500 shrink-0" />
            </div>
          </div>

          {/* LIVE DEPARTMENT WAIT TIME RADAR */}
          <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-xs">
            <div className="flex items-center justify-between mb-3.5">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">Live Department Queues</h3>
                  <p className="text-[11px] text-navy-500">Real-time wait radar at TIMS Gachibowli</p>
                </div>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-700 font-bold px-2 py-0.5 rounded-full border border-teal-200">
                Live Radar
              </span>
            </div>

            <div className="space-y-2">
              {departments.slice(0, 5).map((dept) => {
                const isCongested = dept.status === 'congested';
                const isModerate = dept.status === 'moderate';

                return (
                  <div 
                    key={dept.id}
                    onClick={() => setPatientTab('booking')}
                    className="p-3 rounded-2xl bg-navy-50/60 hover:bg-teal-50/50 border border-navy-100 hover:border-teal-200 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                        isCongested ? 'bg-amber-100 text-amber-800' :
                        isModerate ? 'bg-blue-100 text-blue-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {dept.shortCode}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-navy-900">{dept.name}</h4>
                        <p className="text-[10px] text-navy-500">{dept.headDoctor} • {dept.roomNumber}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-center justify-end space-x-1">
                        <span className="text-xs font-bold text-navy-900">~{dept.avgWaitMins}m</span>
                        <span className={`w-2 h-2 rounded-full ${
                          isCongested ? 'bg-amber-500' : isModerate ? 'bg-blue-500' : 'bg-emerald-500'
                        }`} />
                      </div>
                      <span className="text-[10px] text-navy-500">{dept.currentQueueLength} waiting</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
