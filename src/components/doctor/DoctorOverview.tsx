import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles, 
  ArrowRight, 
  Calendar,
  AlertTriangle,
  Stethoscope,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorOverview: React.FC = () => {
  const { 
    currentDoctorUser, 
    doctorQueueTokens, 
    activeConsultationToken, 
    callNextDoctorToken, 
    setDoctorTab,
    startDoctorConsultation 
  } = useApp();

  const waitingTokens = doctorQueueTokens.filter(t => t.status === 'waiting');
  const completedTokens = doctorQueueTokens.filter(t => t.status === 'completed');

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Welcome Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
              {currentDoctorUser.department} • OPD Room 104
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              Live Duty Active
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Good Morning, {currentDoctorUser.name}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentDoctorUser.hospitalName} • Morning OPD Consultation Block (08:30 AM - 01:30 PM)
          </p>
        </div>

        {/* Primary Call Action */}
        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={() => callNextDoctorToken()}
            disabled={waitingTokens.length === 0}
            className="bg-teal-600 hover:bg-teal-700 active:scale-95 disabled:opacity-50 text-white font-extrabold px-5 py-3 rounded-2xl text-xs flex items-center space-x-2 shadow-soft-md shadow-teal-600/20 transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Next Patient ({waitingTokens.length} Waiting)</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Today</span>
            <Calendar className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currentDoctorUser.consultationStats.scheduledToday}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Confirmed OPD Bookings</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Waiting in Lobby</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-black text-teal-700">
            {waitingTokens.length}
          </div>
          <p className="text-[11px] text-teal-600 font-medium mt-1">Ready for consultation</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-700">
            {currentDoctorUser.consultationStats.completedToday + completedTokens.length}
          </div>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Consultations finished</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-soft-xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Pace</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-black text-slate-900">
            {currentDoctorUser.consultationStats.avgConsultMins}m
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Minutes per patient</p>
        </div>
      </div>

      {/* ACTIVE CONSULTATION CARD (HERO IF PATIENT IS IN ROOM) */}
      {activeConsultationToken ? (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border-2 border-teal-500 rounded-3xl p-6 shadow-soft-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
              <span className="text-xs font-extrabold text-teal-900 uppercase tracking-wider">
                Current Patient in Examination Room 104
              </span>
            </div>
            <button
              onClick={() => setDoctorTab('consultation')}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl flex items-center space-x-1"
            >
              <span>Open Clinical Desk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-teal-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white font-black text-xl flex items-center justify-center shrink-0">
                {activeConsultationToken.tokenNumber}
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">{activeConsultationToken.patientName}</h3>
                <div className="flex items-center space-x-3 text-xs text-slate-600 mt-0.5">
                  <span>Age: {activeConsultationToken.patientAge}</span>
                  <span>•</span>
                  <span>Gender: {activeConsultationToken.patientGender}</span>
                  <span>•</span>
                  <span className="font-mono text-teal-800">UHID: {activeConsultationToken.uhid || 'TIMS-2026-8812'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 text-xs text-center">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Vitals Pre-Check</span>
                <span className="font-extrabold text-emerald-700">BP: 138/88 • SpO2: 98%</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft-sm flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Consultation Desk Standing By</h3>
            <p className="text-xs text-slate-500 mt-0.5">No patient currently active in Room 104. Click "Call Next Patient" to advance queue.</p>
          </div>
          <button
            onClick={() => callNextDoctorToken()}
            disabled={waitingTokens.length === 0}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5"
          >
            <span>Call Next</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* TWO COLUMN GRID: WAITING QUEUE PREVIEW & AI QUEUE INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waiting Queue List Preview */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-teal-600" />
              <h3 className="font-extrabold text-slate-900 text-sm">Assigned Cardiology Queue</h3>
            </div>
            <button
              onClick={() => setDoctorTab('queue')}
              className="text-xs font-bold text-teal-700 hover:text-teal-800"
            >
              View Full Desk ({waitingTokens.length})
            </button>
          </div>

          <div className="space-y-2.5">
            {waitingTokens.slice(0, 4).map((token, index) => (
              <div
                key={token.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-teal-300 bg-slate-50/50 flex items-center justify-between transition-all"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-900 font-black text-sm flex items-center justify-center shrink-0">
                    {token.tokenNumber}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900">{token.patientName}</h4>
                    <p className="text-[11px] text-slate-500">Slot: {token.slotTime} • Est: {token.estimatedConsultTime}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    token.priority === 'emergency' ? 'bg-rose-100 text-rose-800' : token.priority === 'priority' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {token.priority.toUpperCase()}
                  </span>
                  <button
                    onClick={() => startDoctorConsultation(token)}
                    className="p-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs"
                    title="Start Consult"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {waitingTokens.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-400">
                All assigned Cardiology patients have been consulted for this hour.
              </div>
            )}
          </div>
        </div>

        {/* AI Operational Flow Insights */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-soft-sm space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-teal-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">AI Patient Flow Intelligence</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-teal-50 border border-teal-200/70 p-3.5 rounded-2xl">
              <span className="font-bold text-teal-950 block mb-1">Peak Consultation Window (10:30 AM - 11:45 AM)</span>
              <p className="text-teal-800 leading-snug">
                Historical cardiology footfall indicates 4 additional walk-ins arriving from rural mandal referrals by 11:15 AM.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
              <span className="font-bold text-slate-900 block mb-1">Pacing Recommendation</span>
              <p className="text-slate-600 leading-snug">
                Maintaining current pacing of 8.5 min/patient will clear the morning token quota by 01:10 PM without queue backlog.
              </p>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-950 block">Pharmacy & ECG Bay Status</span>
                <span className="text-emerald-800">Cardiology Bay 2 ECG running with zero wait</span>
              </div>
              <span className="text-[10px] bg-emerald-200 text-emerald-950 font-bold px-2 py-0.5 rounded">Smooth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
