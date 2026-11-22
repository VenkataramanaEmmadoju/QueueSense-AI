import React from 'react';
import { UserCheck, Stethoscope, Building2, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorProfileView: React.FC = () => {
  const { currentDoctorUser, logout } = useApp();

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in">
      {/* Header Profile Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-soft-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-3xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center text-3xl">
              {currentDoctorUser.avatar}
            </div>
            <div>
              <h2 className="text-xl font-black text-white">{currentDoctorUser.name}</h2>
              <p className="text-xs text-teal-300 font-medium">{currentDoctorUser.specialty}</p>
              <p className="text-xs text-slate-400 mt-0.5">{currentDoctorUser.hospitalName}</p>
            </div>
          </div>

          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
            Verified Consultant
          </span>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Medical Council Reg.</span>
            <span className="font-mono text-white font-bold">{currentDoctorUser.registrationNumber}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Hospital Badge ID</span>
            <span className="font-mono text-teal-300 font-bold">{currentDoctorUser.badgeId}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Assigned Room</span>
            <span className="text-white font-bold">{currentDoctorUser.roomNumber}</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Official Email</span>
            <span className="text-white font-mono">{currentDoctorUser.email}</span>
          </div>
        </div>
      </div>

      {/* Clinical Privileges & System Scope */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
        <h3 className="text-sm font-extrabold text-slate-900">Clinical Scope & OPD Privileges</h3>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Authorized for outpatient cardiology consultations, triage escalations & internal referrals.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Digital OPD token call-in authority for Room 104 and ECG Bay 2.</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Tele-consultation standby for rural Primary Health Centres across Telangana health network.</span>
          </div>
        </div>
      </div>

      {/* Sign Out Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex items-center justify-between">
        <div>
          <h4 className="font-bold text-slate-900 text-xs">End Clinical Shift</h4>
          <p className="text-[11px] text-slate-500">Sign out of your doctor account and lock this consultation terminal.</p>
        </div>
        <button
          onClick={logout}
          className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-all"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Lock & Sign Out</span>
        </button>
      </div>
    </div>
  );
};
