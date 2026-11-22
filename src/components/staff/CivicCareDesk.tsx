import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  CheckCircle2, 
  Clock, 
  UserCheck, 
  Send, 
  AlertCircle 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { CivicCareGrievance } from '../../types';
import { translateStatus } from '../../i18n/translateHelpers';

export const CivicCareDesk: React.FC = () => {
  const { t } = useTranslation();
  const { grievances, updateGrievanceStatus, currentStaffUser, addToast } = useApp();
  const [activeEditingId, setActiveEditingId] = useState<string | null>(null);
  const [resolutionNote, setResolutionNote] = useState<string>('');

  const handleUpdateStatus = (g: CivicCareGrievance, newStatus: CivicCareGrievance['status']) => {
    updateGrievanceStatus(g.id, newStatus, resolutionNote || undefined);
    setActiveEditingId(null);
    setResolutionNote('');
  };

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">HOSPITAL ADMINISTRATIVE DESK</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('staff.nav_civiccare', 'CivicCare Grievance Redressal')}</h2>
        <p className="text-xs text-navy-500">Citizen feedback, sanitation tickets and administrative action logs</p>
      </div>

      <div className="space-y-3">
        {grievances.map((g) => {
          const isResolved = g.status === 'resolved';
          const isActionTaken = g.status === 'action_taken';
          const isUnderReview = g.status === 'under_review';
          const isEditing = activeEditingId === g.id;

          return (
            <div
              key={g.id}
              className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      {g.trackingCode}
                    </span>
                    <span className="text-[10px] text-navy-400">{g.filedAt}</span>
                    <span className="text-[10px] bg-rose-50 text-rose-700 border border-rose-200 font-bold px-1.5 rounded uppercase">
                      {g.urgency}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-navy-950 text-sm mt-1">{g.title}</h3>
                  <p className="text-xs text-navy-500">{g.wardOrDept} • Reporter: {g.isAnonymous ? 'Anonymous Citizen' : `${g.reporterName} (${g.reporterPhone})`}</p>
                </div>

                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full shrink-0 ${
                  isResolved ? 'bg-emerald-100 text-emerald-800' :
                  isActionTaken ? 'bg-blue-100 text-blue-800' :
                  isUnderReview ? 'bg-amber-100 text-amber-800' :
                  'bg-navy-100 text-navy-700'
                }`}>
                  {translateStatus(g.status)}
                </span>
              </div>

              <p className="text-xs text-navy-700 bg-pearl p-3 rounded-2xl border border-navy-100 leading-relaxed">
                "{g.description}"
              </p>

              {g.resolutionSummary && (
                <div className="bg-medical-50/70 border border-medical-200/70 rounded-xl p-2.5 text-xs text-medical-950">
                  <span className="font-bold block text-[10px] uppercase text-medical-800">
                    Resolution Report:
                  </span>
                  <p className="mt-0.5">{g.resolutionSummary}</p>
                </div>
              )}

              {/* Editing Form */}
              {isEditing ? (
                <div className="p-3 bg-navy-50 rounded-2xl border border-navy-200 space-y-2 text-xs">
                  <label className="font-bold text-navy-700 block">Staff Resolution Note</label>
                  <input
                    type="text"
                    value={resolutionNote}
                    onChange={(e) => setResolutionNote(e.target.value)}
                    placeholder="e.g. Maintenance cleared blockage at 10:45 AM"
                    className="w-full p-2.5 rounded-xl border border-navy-300 bg-white"
                  />
                  <div className="flex items-center space-x-2 pt-1">
                    <button
                      onClick={() => handleUpdateStatus(g, 'action_taken')}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs"
                    >
                      {t('staff.update_status', 'Mark Action Taken')}
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(g, 'resolved')}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-1.5 px-3 rounded-xl text-xs"
                    >
                      {t('staff.mark_resolved', 'Mark Fully Resolved')}
                    </button>
                    <button
                      onClick={() => setActiveEditingId(null)}
                      className="text-navy-500 font-bold hover:text-navy-800 text-xs px-2"
                    >
                      {t('common.cancel', 'Cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-2 border-t border-navy-100 flex items-center justify-between">
                  <span className="text-[11px] text-navy-500">
                    Officer: <strong>{g.officerAssigned || currentStaffUser.name}</strong>
                  </span>
                  <button
                    onClick={() => {
                      setActiveEditingId(g.id);
                      setResolutionNote(g.resolutionSummary || '');
                    }}
                    className="bg-medical-50 hover:bg-medical-100 text-medical-800 border border-medical-200 font-semibold px-3 py-1.5 rounded-xl text-xs transition-all active:scale-95"
                  >
                    {t('staff.update_status', 'Update Resolution Status')}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
