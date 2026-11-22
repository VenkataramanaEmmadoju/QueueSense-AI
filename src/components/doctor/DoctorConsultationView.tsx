import React, { useState } from 'react';
import { 
  FileCheck, 
  User, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  AlertTriangle, 
  ArrowRight, 
  Share2, 
  Calendar, 
  Building2, 
  Activity 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';

export const DoctorConsultationView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    activeConsultationToken, 
    completeDoctorConsultation, 
    doctorQueueTokens, 
    setDoctorTab, 
    startDoctorConsultation 
  } = useApp();

  const [workflowNotes, setWorkflowNotes] = useState(
    'Patient presented for routine cardiac evaluation. Standard examination performed. Fasting blood glucose & lipid profile advisory recorded. Advised low-sodium lifestyle regimen.'
  );
  const [referralDept, setReferralDept] = useState('None');
  const [followUpDays, setFollowUpDays] = useState(30);
  const [submitting, setSubmitting] = useState(false);

  // If no active token in room, show waiting list selector
  if (!activeConsultationToken) {
    const nextWaiting = doctorQueueTokens.find(t => t.status === 'waiting');

    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-soft-sm text-center max-w-xl mx-auto my-8 space-y-4">
        <div className="w-16 h-16 rounded-3xl bg-teal-100 text-teal-700 flex items-center justify-center mx-auto">
          <FileCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-slate-900">No Patient in Room 104</h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto">
          Select a patient from your assigned queue to begin clinical examination, record workflow notes, and issue referrals.
        </p>

        {nextWaiting ? (
          <div className="pt-2">
            <button
              onClick={() => startDoctorConsultation(nextWaiting)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-6 py-3 rounded-2xl text-xs inline-flex items-center space-x-2 shadow-soft-md shadow-teal-600/20 active:scale-95 transition-all"
            >
              <span>Begin Consult for Token #{nextWaiting.tokenNumber} ({nextWaiting.patientName})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setDoctorTab('queue')}
            className="bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs"
          >
            Go to Assigned Queue Desk
          </button>
        )}
      </div>
    );
  }

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      completeDoctorConsultation(
        activeConsultationToken.id, 
        workflowNotes, 
        referralDept === 'None' ? undefined : referralDept, 
        followUpDays
      );
      setSubmitting(false);
      setDoctorTab('overview');
    }, 400);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            {t('doctor.nav_consultation', 'Active Clinical Consultation')}
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5">
            Token #{activeConsultationToken.tokenNumber} • {activeConsultationToken.patientName}
          </h2>
          <p className="text-xs text-slate-500">
            Cardiology OPD Room 104 • TIMS Gachibowli
          </p>
        </div>

        <div className="bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-2xl text-right">
          <span className="text-[10px] text-teal-700 uppercase font-bold block">{t('common.status', 'Status')}</span>
          <span className="text-xs font-black text-teal-900">{t('status.serving', 'In Room Examination')}</span>
        </div>
      </div>

      {/* Patient Summary Card */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-soft-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-800 gap-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-400/30 flex items-center justify-center font-bold text-lg">
              👤
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">{activeConsultationToken.patientName}</h3>
              <p className="text-xs text-slate-400">
                Age: {activeConsultationToken.patientAge} • Gender: {activeConsultationToken.patientGender} • Phone: {activeConsultationToken.patientPhone}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-slate-400 uppercase font-mono block">Patient UHID</span>
            <span className="text-xs font-bold text-teal-300 font-mono">
              {activeConsultationToken.uhid || 'TIMS-2026-8812'}
            </span>
          </div>
        </div>

        {/* Vitals Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Blood Pressure</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{activeConsultationToken.vitals?.bp || '136/88'} mmHg</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Pulse Rate</span>
            <span className="text-sm font-bold text-white mt-0.5 block">{activeConsultationToken.vitals?.pulse || 76} bpm</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Oxygen (SpO2)</span>
            <span className="text-sm font-bold text-emerald-400 mt-0.5 block">{activeConsultationToken.vitals?.spo2 || 98}%</span>
          </div>
          <div className="bg-white/5 p-3 rounded-2xl border border-white/10 text-center">
            <span className="text-[10px] text-slate-400 uppercase block font-semibold">Triage Score</span>
            <span className="text-sm font-bold text-teal-300 mt-0.5 block">ESI Level 3</span>
          </div>
        </div>
      </div>

      {/* Consultation Workflow Form */}
      <form onSubmit={handleComplete} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-5">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Clinical Workflow Notes (Non-Clinical Prototype Record)
            </label>
            <span className="text-[10px] text-slate-400">Prototype Demo Notes</span>
          </div>
          <textarea
            rows={4}
            value={workflowNotes}
            onChange={(e) => setWorkflowNotes(e.target.value)}
            required
            className="w-full text-xs p-3.5 rounded-2xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-1 focus:ring-teal-600 leading-relaxed font-sans"
            placeholder="Record doctor consultation notes, examination findings, and advisory..."
          />
          <p className="text-[11px] text-slate-400 mt-1">
            * Does not constitute medical diagnosis or official prescription. Prototype workflow entry only.
          </p>
        </div>

        {/* Referrals & Follow-up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Internal Hospital Referral (Optional)
            </label>
            <select
              value={referralDept}
              onChange={(e) => setReferralDept(e.target.value)}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              <option value="None">None (Discharged to Pharmacy)</option>
              <option value="Radiology & Imaging">Radiology & Ultrasound (Wing C)</option>
              <option value="Clinical Pathology Lab">Biochemistry & Lipid Lab (Ground Floor)</option>
              <option value="Pulmonology OPD">Pulmonology & Chest Medicine</option>
              <option value="Dietary Counseling">Dietary & Lifestyle Guidance Unit</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1.5">
              Follow-up Review Schedule
            </label>
            <select
              value={followUpDays}
              onChange={(e) => setFollowUpDays(Number(e.target.value))}
              className="w-full text-xs p-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold focus:outline-none focus:ring-1 focus:ring-teal-600"
            >
              <option value={7}>Follow-up in 1 Week (7 Days)</option>
              <option value={14}>Follow-up in 2 Weeks (14 Days)</option>
              <option value={30}>Follow-up in 1 Month (30 Days)</option>
              <option value={90}>Routine Annual/Quarterly Review (90 Days)</option>
              <option value={0}>No Follow-up Required</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Completing consultation will notify Pharmacy and advance the next waiting token.
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold px-6 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 shadow-soft-md shadow-teal-600/30 transition-all disabled:opacity-50 shrink-0"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Consultation & Advance Queue</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
