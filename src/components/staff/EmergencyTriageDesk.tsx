import React from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Navigation, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  AlertTriangle 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const EmergencyTriageDesk: React.FC = () => {
  const { emergencyAlerts, updateEmergencyStatus, addToast } = useApp();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider">TRAUMA BAY & CASUALTY</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">Emergency 108 Operations Desk</h2>
        <p className="text-xs text-navy-500">Live ambulance tracking and casualty trauma bed pre-allocation</p>
      </div>

      <div className="space-y-3">
        {emergencyAlerts.map((emg) => {
          const isEnRoute = emg.status === 'ambulance_en_route';
          const isArrived = emg.status === 'arrived_at_triage';
          const isAdmitted = emg.status === 'admitted';

          return (
            <div
              key={emg.id}
              className={`border-2 rounded-3xl p-5 shadow-soft-sm transition-all ${
                isEnRoute 
                  ? 'border-rose-300 bg-gradient-to-r from-rose-50/70 via-white to-white' 
                  : isArrived 
                  ? 'border-amber-300 bg-amber-50/40' 
                  : 'border-navy-200 bg-white opacity-80'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg shrink-0 ${
                    emg.severity === 'critical' ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-amber-100 text-amber-700'
                  }`}>
                    <ShieldAlert className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-extrabold text-navy-950 text-sm">{emg.patientName}</h3>
                      <span className="text-[9px] bg-rose-600 text-white font-extrabold px-2 py-0.5 rounded-full uppercase">
                        {emg.severity}
                      </span>
                    </div>
                    <p className="text-xs text-rose-900 font-semibold mt-0.5">{emg.condition}</p>
                    <p className="text-[11px] text-navy-500">Location: {emg.location} ({emg.mandal})</p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <div className="text-xs font-mono font-bold text-navy-700">
                    Ambulance: <span className="text-rose-700">{emg.ambulanceId || '108-ALS'}</span>
                  </div>
                  <div className="text-sm font-extrabold text-rose-600 mt-0.5">
                    {isEnRoute ? `ETA: ~${emg.etaMinutes} mins` : isArrived ? 'Arrived at Casualty' : 'Admitted'}
                  </div>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="mt-4 pt-3 border-t border-navy-100 flex items-center justify-end space-x-2">
                {isEnRoute && (
                  <button
                    onClick={() => {
                      updateEmergencyStatus(emg.id, 'arrived_at_triage');
                      addToast('Ambulance Arrived', `${emg.patientName} received at Triage Bay 1`, 'emergency');
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all active:scale-95 flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Confirm Arrival at Bay</span>
                  </button>
                )}

                {isArrived && (
                  <button
                    onClick={() => {
                      updateEmergencyStatus(emg.id, 'admitted');
                      addToast('Patient Admitted', `${emg.patientName} transferred to ICU`, 'emergency');
                    }}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all active:scale-95 flex items-center space-x-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Admit to Trauma ICU</span>
                  </button>
                )}

                <a
                  href={`tel:${emg.contactPhone}`}
                  className="bg-navy-100 hover:bg-navy-200 text-navy-800 text-xs font-semibold py-2 px-3 rounded-xl flex items-center space-x-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Attendant</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
