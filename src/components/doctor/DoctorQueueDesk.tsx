import React, { useState } from 'react';
import { 
  Users, 
  PhoneCall, 
  Play, 
  Pause, 
  CheckCircle2, 
  Sparkles, 
  Clock, 
  Activity,
  ArrowRight,
  Filter
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { OPDToken } from '../../types';

export const DoctorQueueDesk: React.FC = () => {
  const { 
    doctorQueueTokens, 
    activeConsultationToken,
    startDoctorConsultation,
    updateTokenStatus,
    callNextDoctorToken,
    addToast
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'waiting' | 'completed'>('waiting');

  const filteredTokens = doctorQueueTokens.filter(t => {
    if (filter === 'waiting') return t.status === 'waiting' || t.status === 'serving';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const handleCallPatient = (token: OPDToken) => {
    updateTokenStatus(token.id, 'serving');
    addToast(`Calling Token ${token.tokenNumber}`, `Announcing ${token.patientName} for Cardiology Room 104`, 'token');
  };

  const handleHoldPatient = (token: OPDToken) => {
    updateTokenStatus(token.id, 'hold');
    addToast(`Token ${token.tokenNumber} on Hold`, `${token.patientName} placed on temporary hold for diagnostics`, 'system');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Cardiology OPD • Room 104 Live Queue
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">Assigned Patient Queue</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time token sequencing, vitals pre-check and examination room call-in
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => callNextDoctorToken()}
            className="bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-soft-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Next in Line</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setFilter('waiting')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'waiting' ? 'bg-teal-600 text-white shadow-soft-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Waiting & Active ({doctorQueueTokens.filter(t => t.status === 'waiting' || t.status === 'serving').length})
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'all' ? 'bg-teal-600 text-white shadow-soft-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Tokens ({doctorQueueTokens.length})
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filter === 'completed' ? 'bg-teal-600 text-white shadow-soft-xs' : 'text-slate-600 hover:bg-slate-200'
          }`}
        >
          Completed Today ({doctorQueueTokens.filter(t => t.status === 'completed').length})
        </button>
      </div>

      {/* Tokens List */}
      <div className="space-y-3">
        {filteredTokens.map((token) => {
          const isServing = token.status === 'serving';
          const isHold = token.status === 'hold';
          const isCompleted = token.status === 'completed';

          return (
            <div
              key={token.id}
              className={`p-5 rounded-3xl border transition-all ${
                isServing 
                  ? 'bg-teal-50/70 border-teal-500 ring-2 ring-teal-500/20 shadow-soft-md'
                  : isHold
                  ? 'bg-amber-50/60 border-amber-300'
                  : isCompleted
                  ? 'bg-slate-50 border-slate-200 opacity-70'
                  : 'bg-white border-slate-200/80 hover:border-teal-300 shadow-soft-xs'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Left: Token info */}
                <div className="flex items-center space-x-4">
                  <div className={`w-14 h-14 rounded-2xl font-black text-xl flex items-center justify-center shrink-0 ${
                    isServing 
                      ? 'bg-teal-600 text-white animate-pulse'
                      : isCompleted
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-teal-100 text-teal-900 border border-teal-200'
                  }`}>
                    {token.tokenNumber}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-extrabold text-slate-900 text-base">{token.patientName}</h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md ${
                        token.priority === 'emergency' ? 'bg-rose-100 text-rose-800' : token.priority === 'priority' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {token.priority.toUpperCase()}
                      </span>
                      {isServing && (
                        <span className="bg-teal-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                          IN CONSULTATION
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-3 text-xs text-slate-500 mt-1">
                      <span>Age: {token.patientAge}</span>
                      <span>•</span>
                      <span>Slot: {token.slotTime}</span>
                      <span>•</span>
                      <span className="font-mono text-teal-800">UHID: {token.uhid || 'TIMS-2026-8812'}</span>
                    </div>

                    {/* Vitals pill */}
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                        BP: {token.vitals?.bp || '134/86'}
                      </span>
                      <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                        Pulse: {token.vitals?.pulse || '76'} bpm
                      </span>
                      <span className="text-[10px] bg-slate-100 border border-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                        SpO2: {token.vitals?.spo2 || '98'}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center space-x-2 shrink-0">
                  {!isCompleted && (
                    <>
                      <button
                        onClick={() => handleCallPatient(token)}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold px-3 py-2 rounded-xl text-xs flex items-center space-x-1"
                        title="Announce Call"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-teal-600" />
                        <span>Call In</span>
                      </button>

                      <button
                        onClick={() => handleHoldPatient(token)}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center space-x-1"
                      >
                        <Pause className="w-3.5 h-3.5" />
                        <span>Hold</span>
                      </button>

                      <button
                        onClick={() => startDoctorConsultation(token)}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-soft-xs"
                      >
                        <Play className="w-3.5 h-3.5" />
                        <span>Begin Consult</span>
                      </button>
                    </>
                  )}

                  {isCompleted && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center space-x-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Consultation Finished</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredTokens.length === 0 && (
          <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400">
            <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-semibold">No tokens in this filter state.</p>
          </div>
        )}
      </div>
    </div>
  );
};
