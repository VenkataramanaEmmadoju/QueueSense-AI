import React, { useState } from 'react';
import { 
  Ticket, 
  Clock, 
  MapPin, 
  Sparkles, 
  CheckCircle2, 
  CircleDot, 
  AlertCircle, 
  QrCode, 
  RefreshCw, 
  Share2, 
  ArrowRight,
  CalendarPlus,
  Stethoscope,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveQueueTracker: React.FC = () => {
  const { 
    activePatientToken, 
    tokens, 
    setPatientTab, 
    addToast,
    selectedHospital
  } = useApp();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('Queue Position Refreshed', 'Synced with Hospital OPD Triage Engine');
    }, 500);
  };

  // If no active token for currently active identity
  if (!activePatientToken) {
    return (
      <div className="space-y-4 pb-20 max-w-lg mx-auto text-center py-10 px-4">
        <div className="w-16 h-16 rounded-3xl bg-teal-50 text-teal-700 flex items-center justify-center mx-auto mb-3 border border-teal-200">
          <Ticket className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-black text-navy-900">No Active Queue Token</h2>
        <p className="text-xs text-navy-500 max-w-sm mx-auto">
          You currently don't have an in-progress OPD consultation token. Book an appointment or walk-in digital pass to track live queue stages.
        </p>

        <div className="pt-4">
          <button
            onClick={() => setPatientTab('booking')}
            className="bg-medical-600 hover:bg-medical-700 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl text-xs flex items-center justify-center space-x-2 mx-auto shadow-soft-sm"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book New OPD Token</span>
          </button>
        </div>
      </div>
    );
  }

  // Find currently serving token in same department
  const servingTokenInDept = tokens.find(
    t => t.department === activePatientToken.department && t.status === 'serving'
  );

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Header with Refresh */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">LIVE QUEUE RADAR</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">Consultation Tracker</h2>
        </div>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="flex items-center space-x-1 text-xs text-medical-700 bg-medical-50 hover:bg-medical-100 font-semibold px-3 py-1.5 rounded-xl border border-medical-200 transition-all active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Sync Queue</span>
        </button>
      </div>

      {/* HERO TICKET SUMMARY CARD */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-medical-950 text-white rounded-3xl p-5 shadow-soft-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-medical-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-xs text-medical-300 font-medium">Your Token Number</span>
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight mt-0.5">
              {activePatientToken.tokenNumber}
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Patient: <strong className="text-white">{activePatientToken.patientName}</strong>
            </p>
          </div>

          <button
            onClick={() => setShowQRModal(true)}
            className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex flex-col items-center justify-center text-white transition-all active:scale-95 shrink-0"
            title="View QR Token"
          >
            <QrCode className="w-5 h-5" />
            <span className="text-[9px] font-bold mt-0.5 uppercase">QR</span>
          </button>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-white/10 text-center">
          <div className="bg-white/5 rounded-2xl p-2.5 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Now In Room</span>
            <span className="text-xl font-black text-amber-400">
              {servingTokenInDept ? servingTokenInDept.tokenNumber : 'None'}
            </span>
          </div>

          <div className="bg-white/5 rounded-2xl p-2.5 backdrop-blur-sm">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Estimated Call</span>
            <span className="text-xl font-black text-medical-300">
              {activePatientToken.estimatedConsultTime}
            </span>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-xs text-slate-300 bg-white/5 px-3 py-2 rounded-xl">
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-medical-400 shrink-0" />
            <span className="truncate">{activePatientToken.roomNumber} • {activePatientToken.doctorName}</span>
          </div>
          <span className="font-bold text-teal-300 shrink-0">
            {activePatientToken.peopleAhead} Ahead
          </span>
        </div>
      </div>

      {/* AI QUEUE INSIGHT */}
      <div className="bg-medical-50/80 border border-medical-200/80 rounded-2xl p-3.5 flex items-start space-x-2.5 text-xs text-medical-950 shadow-soft-sm">
        <Sparkles className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-medical-800">QueueSense Throughput Engine: </span>
          <span>{activePatientToken.aiAdvice}</span>
        </div>
      </div>

      {/* PATIENT JOURNEY PREDICTION TIMELINE */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-sm">Patient Care Journey</h3>
              <p className="text-[11px] text-navy-500">Step-by-step hospital navigation</p>
            </div>
          </div>
          <span className="text-[10px] bg-navy-100 text-navy-700 font-bold px-2 py-0.5 rounded-full">
            4 Milestones
          </span>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-navy-200">
          {activePatientToken.journeySteps.map((step, idx) => {
            const isCompleted = step.status === 'completed';
            const isInProgress = step.status === 'in_progress';

            return (
              <div key={idx} className="relative">
                {/* Node icon */}
                <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center ring-4 ring-white ${
                  isCompleted ? 'bg-emerald-600 text-white' :
                  isInProgress ? 'bg-medical-600 text-white animate-pulse' :
                  'bg-navy-200 text-navy-500'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <CircleDot className="w-3.5 h-3.5" />
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h4 className={`text-xs font-bold ${
                      isCompleted ? 'text-navy-900' : isInProgress ? 'text-medical-800' : 'text-navy-500'
                    }`}>
                      {step.step}
                    </h4>
                    <span className="text-[10px] text-navy-400 font-medium">{step.time}</span>
                  </div>
                  <p className="text-[11px] text-navy-600 font-medium mt-0.5">{step.station}</p>
                  <p className="text-[11px] text-navy-500 mt-0.5 italic">{step.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Triage Vitals Summary if available */}
      {activePatientToken.vitals && (
        <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
          <div className="flex items-center space-x-2 mb-2">
            <Stethoscope className="w-4 h-4 text-medical-600" />
            <h4 className="text-xs font-bold text-navy-900">Recorded Triage Vitals</h4>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-navy-50 p-2 rounded-xl">
              <span className="text-[10px] text-navy-500 block">BP</span>
              <span className="font-bold text-navy-900">{activePatientToken.vitals.bp}</span>
            </div>
            <div className="bg-navy-50 p-2 rounded-xl">
              <span className="text-[10px] text-navy-500 block">Pulse</span>
              <span className="font-bold text-navy-900">{activePatientToken.vitals.pulse} bpm</span>
            </div>
            <div className="bg-navy-50 p-2 rounded-xl">
              <span className="text-[10px] text-navy-500 block">SpO2</span>
              <span className="font-bold text-navy-900">{activePatientToken.vitals.spo2}%</span>
            </div>
            <div className="bg-navy-50 p-2 rounded-xl">
              <span className="text-[10px] text-navy-500 block">Temp</span>
              <span className="font-bold text-navy-900">{activePatientToken.vitals.temp}°F</span>
            </div>
          </div>
        </div>
      )}

      {/* QR MODAL */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center shadow-2xl relative">
            <h3 className="font-bold text-navy-900 text-sm">Token Pass QR Code</h3>
            <p className="text-xs text-navy-500 mb-4">Present at OPD Counter / Doctor Room</p>
            
            <div className="w-48 h-48 mx-auto bg-navy-50 p-3 rounded-2xl border border-navy-200 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-navy-900">
                <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="5" y="5" width="20" height="20" fill="white" rx="1" />
                <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="75" y="5" width="20" height="20" fill="white" rx="1" />
                <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="2" />
                <rect x="5" y="75" width="20" height="20" fill="white" rx="1" />
                <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                <rect x="40" y="15" width="10" height="10" fill="currentColor" />
                <rect x="55" y="25" width="10" height="10" fill="currentColor" />
                <rect x="35" y="45" width="25" height="10" fill="currentColor" />
                <rect x="70" y="45" width="15" height="15" fill="currentColor" />
                <rect x="45" y="75" width="15" height="15" fill="currentColor" />
              </svg>
            </div>

            <div className="text-2xl font-black text-medical-700 mt-3">{activePatientToken.tokenNumber}</div>
            <div className="text-xs text-navy-600 font-medium">{activePatientToken.department}</div>

            <button
              onClick={() => setShowQRModal(false)}
              className="mt-5 w-full bg-navy-900 hover:bg-navy-800 text-white font-semibold py-2.5 rounded-xl text-xs"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
