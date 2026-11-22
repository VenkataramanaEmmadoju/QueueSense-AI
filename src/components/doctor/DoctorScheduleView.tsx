import React, { useState } from 'react';
import { Clock, Calendar, CheckCircle2, Building2, Stethoscope, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorScheduleView: React.FC = () => {
  const { currentDoctorUser, addToast } = useApp();
  const [isOnDuty, setIsOnDuty] = useState(true);

  const toggleDuty = () => {
    setIsOnDuty(!isOnDuty);
    addToast(
      isOnDuty ? 'Shift Paused' : 'Shift Active', 
      isOnDuty ? 'Clinical consultation status set to Away/Rounds' : 'Cardiology OPD Room 104 open for consultations',
      'system'
    );
  };

  const scheduleDays = [
    { day: 'Monday', morning: '08:30 AM - 01:30 PM (General Cardiology OPD)', afternoon: '02:30 PM - 04:30 PM (Inpatient Rounds)', status: 'Active' },
    { day: 'Tuesday', morning: '08:30 AM - 01:30 PM (Hypertension Clinic)', afternoon: '02:30 PM - 05:00 PM (Echocardiography Bay)', status: 'Active' },
    { day: 'Wednesday', morning: '08:30 AM - 01:30 PM (General Cardiology OPD)', afternoon: '02:30 PM - 04:30 PM (Clinical Audit & Case Review)', status: 'Active' },
    { day: 'Thursday', morning: '08:30 AM - 01:30 PM (Heart Failure & Rehab)', afternoon: '02:30 PM - 04:30 PM (Inpatient Ward rounds)', status: 'Active' },
    { day: 'Friday', morning: '08:30 AM - 01:30 PM (General Cardiology OPD)', afternoon: '02:30 PM - 04:30 PM (Telemetry Review)', status: 'Active' },
    { day: 'Saturday', morning: '08:30 AM - 01:00 PM (Emergency Specialty Cover)', afternoon: 'On-Call Casualty Rotation', status: 'Active' },
    { day: 'Sunday', morning: 'Off Duty / On-Call Emergency Escalation', afternoon: 'Off Duty', status: 'Off' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Clinical Roster & Availability
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5">OPD Duty Schedule</h2>
          <p className="text-xs text-slate-500">
            {currentDoctorUser.name} • {currentDoctorUser.specialty}
          </p>
        </div>

        {/* Live Duty Toggle */}
        <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-2xl border border-slate-200">
          <div>
            <span className="text-[10px] text-slate-500 font-bold uppercase block">Current Shift Status</span>
            <span className={`text-xs font-extrabold ${isOnDuty ? 'text-emerald-700' : 'text-amber-700'}`}>
              {isOnDuty ? '🟢 Actively Consulting' : '🟡 In Patient Rounds / Away'}
            </span>
          </div>
          <button
            onClick={toggleDuty}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isOnDuty 
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-900' 
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            {isOnDuty ? 'Pause for Rounds' : 'Resume OPD'}
          </button>
        </div>
      </div>

      {/* Schedule Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="w-28">Day</span>
          <span className="flex-1">Morning Consultation Block</span>
          <span className="flex-1">Afternoon Block</span>
          <span className="w-24 text-right">Roster</span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {scheduleDays.map((s, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50">
              <span className="w-28 font-bold text-slate-900">{s.day}</span>
              <span className="flex-1 text-slate-700">{s.morning}</span>
              <span className="flex-1 text-slate-500">{s.afternoon}</span>
              <span className="w-24 text-right">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  s.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                }`}>
                  {s.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
