import React from 'react';
import { Calendar, Clock, User, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { translateStatus } from '../../i18n/translateHelpers';

export const DoctorAppointmentsView: React.FC = () => {
  const { t } = useTranslation();
  const { doctorQueueTokens, startDoctorConsultation, currentDoctorUser } = useApp();

  const slots = [
    { time: '09:00 AM - 09:30 AM', token: 'A-101', patient: 'Laxmi Bai', age: 62, status: 'completed' },
    { time: '09:30 AM - 10:00 AM', token: 'A-102', patient: 'G. Suresh Kumar', age: 48, status: 'completed' },
    { time: '10:00 AM - 10:30 AM', token: 'A-103', patient: 'K. Padma', age: 54, status: 'completed' },
    { time: '10:30 AM - 11:00 AM', token: 'A-104', patient: 'Rahul Kumar', age: 34, status: 'waiting' },
    { time: '11:00 AM - 11:30 AM', token: 'A-105', patient: 'Ananya Santhu', age: 6, status: 'waiting' },
    { time: '11:30 AM - 12:00 PM', token: 'A-106', patient: 'S. Narsimha', age: 71, status: 'waiting' },
    { time: '12:00 PM - 12:30 PM', token: 'A-107', patient: 'B. Renuka', age: 39, status: 'waiting' },
    { time: '12:30 PM - 01:00 PM', token: 'A-108', patient: 'M. Chennaiah', age: 65, status: 'waiting' },
    { time: '01:00 PM - 01:30 PM', token: 'A-109', patient: 'P. Sandhya', age: 29, status: 'waiting' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            OPD Schedule & Booking Register
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-0.5">{t('doctor.nav_appointments', "Today's Scheduled Appointments")}</h2>
          <p className="text-xs text-slate-500">
            {currentDoctorUser.name} • Cardiology OPD Room 104 • {slots.length} Booked Slots
          </p>
        </div>

        <div className="bg-teal-50 border border-teal-200 px-3.5 py-2 rounded-2xl text-center">
          <span className="text-[10px] text-teal-700 font-bold uppercase block">Quota Utilized</span>
          <span className="text-sm font-extrabold text-teal-900">100% (9/9 Slots)</span>
        </div>
      </div>

      {/* Appointments Timeline Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs font-bold text-slate-600">
          <span>{t('common.time', 'Time Slot')}</span>
          <span>{t('doctor.table_patient', 'Patient Details')}</span>
          <span>{t('doctor.table_token', 'Token #')}</span>
          <span>{t('doctor.table_status', 'Status')}</span>
          <span>{t('doctor.table_action', 'Action')}</span>
        </div>

        <div className="divide-y divide-slate-100">
          {slots.map((s, idx) => {
            const isCompleted = s.status === 'completed';
            const matchedToken = doctorQueueTokens.find(t => t.tokenNumber === s.token);

            return (
              <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors text-xs">
                <div className="flex items-center space-x-2 w-48">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-semibold text-slate-800">{s.time}</span>
                </div>

                <div className="w-64">
                  <h4 className="font-bold text-slate-900">{s.patient}</h4>
                  <p className="text-[11px] text-slate-500">Age: {s.age} • Cardiology Follow-up</p>
                </div>

                <div className="w-24">
                  <span className="font-mono font-bold bg-teal-50 border border-teal-200 text-teal-900 px-2 py-0.5 rounded-md">
                    {s.token}
                  </span>
                </div>

                <div className="w-32">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {translateStatus(s.status).toUpperCase()}
                  </span>
                </div>

                <div className="w-28 text-right">
                  {!isCompleted && matchedToken ? (
                    <button
                      onClick={() => startDoctorConsultation(matchedToken)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] inline-flex items-center space-x-1"
                    >
                      <span>{t('doctor.btn_call', 'Call Now')}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  ) : isCompleted ? (
                    <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{t('status.completed', 'Finished')}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-400">Scheduled</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
