import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Ticket, 
  Building2, 
  User, 
  Users, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Filter, 
  CalendarPlus,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { StoredAppointment } from '../../types';

export const MyAppointmentsView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    appointments, 
    cancelAppointment, 
    setPatientTab, 
    familyMembers, 
    currentUser,
    patientProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  const [selectedBeneficiaryFilter, setSelectedBeneficiaryFilter] = useState<string>('all');
  const [appointmentToCancel, setAppointmentToCancel] = useState<StoredAppointment | null>(null);
  const [cancelReason, setCancelReason] = useState<string>('Personal Emergency');

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    if (apt.status !== activeTab) return false;
    if (selectedBeneficiaryFilter !== 'all' && apt.beneficiaryName !== selectedBeneficiaryFilter) return false;
    return true;
  });

  const handleConfirmCancel = () => {
    if (appointmentToCancel) {
      cancelAppointment(appointmentToCancel.id, cancelReason);
      setAppointmentToCancel(null);
    }
  };

  const currentUserName = currentUser?.name || patientProfile.name;

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">APPOINTMENT REGISTRY</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('apt.my_appointments')}</h2>
          <p className="text-xs text-navy-500">Track, reschedule or review your family OPD consultations</p>
        </div>

        <button
          onClick={() => setPatientTab('booking')}
          className="bg-medical-600 hover:bg-medical-700 active:scale-95 text-white font-bold px-3 py-2 rounded-2xl text-xs flex items-center space-x-1.5 shadow-soft-sm transition-all shrink-0"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>New Booking</span>
        </button>
      </div>

      {/* Tabs: Upcoming / Completed / Cancelled */}
      <div className="flex bg-navy-100/80 p-1 rounded-2xl text-xs font-bold">
        {(['upcoming', 'completed', 'cancelled'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 rounded-xl transition-all capitalize ${
              activeTab === tab
                ? 'bg-white text-navy-950 shadow-soft-sm font-extrabold'
                : 'text-navy-500 hover:text-navy-900'
            }`}
          >
            {tab} ({appointments.filter(a => a.status === tab).length})
          </button>
        ))}
      </div>

      {/* Beneficiary Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        <button
          onClick={() => setSelectedBeneficiaryFilter('all')}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedBeneficiaryFilter === 'all'
              ? 'bg-navy-900 text-white shadow-soft-sm'
              : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
          }`}
        >
          All Members
        </button>

        <button
          onClick={() => setSelectedBeneficiaryFilter(currentUserName)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            selectedBeneficiaryFilter === currentUserName
              ? 'bg-medical-700 text-white shadow-soft-sm'
              : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
          }`}
        >
          Myself ({currentUserName.split(' ')[0]})
        </button>

        {familyMembers.map(mem => (
          <button
            key={mem.id}
            onClick={() => setSelectedBeneficiaryFilter(mem.name)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedBeneficiaryFilter === mem.name
                ? 'bg-teal-700 text-white shadow-soft-sm'
                : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
            }`}
          >
            {mem.name.split(' ')[0]} ({mem.relation})
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="space-y-3">
        {filteredAppointments.length === 0 ? (
          <div className="bg-white border border-navy-200/80 rounded-3xl p-8 text-center space-y-2">
            <Calendar className="w-10 h-10 text-navy-300 mx-auto stroke-1" />
            <h4 className="font-bold text-navy-900 text-sm capitalize">No {activeTab} Appointments</h4>
            <p className="text-xs text-navy-500 max-w-xs mx-auto">
              {activeTab === 'upcoming' 
                ? 'You do not have any upcoming OPD consultations booked right now.'
                : `No ${activeTab} consultation records found for the selected filter.`}
            </p>
            {activeTab === 'upcoming' && (
              <button
                onClick={() => setPatientTab('booking')}
                className="mt-2 bg-medical-50 text-medical-700 border border-medical-200 font-bold px-4 py-2 rounded-xl text-xs inline-flex items-center space-x-1"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Book OPD Now</span>
              </button>
            )}
          </div>
        ) : (
          filteredAppointments.map((apt) => {
            const isUpcoming = apt.status === 'upcoming';
            const isCompleted = apt.status === 'completed';
            const isCancelled = apt.status === 'cancelled';

            return (
              <div
                key={apt.id}
                className="bg-white border border-navy-200/80 rounded-3xl p-4 sm:p-5 shadow-soft-sm space-y-3 hover:border-medical-300 transition-all"
              >
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-800 font-black text-sm flex items-center justify-center border border-teal-100">
                      {apt.tokenNumber}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-navy-950 text-sm">{apt.beneficiaryName}</h4>
                        <span className="text-[10px] bg-navy-100 text-navy-800 font-bold px-2 py-0.5 rounded">
                          {apt.beneficiaryRelation}
                        </span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">
                        {apt.department} • {apt.roomNumber}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isUpcoming ? 'bg-emerald-100 text-emerald-800' :
                    isCompleted ? 'bg-blue-100 text-blue-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {apt.status}
                  </span>
                </div>

                {/* Details box */}
                <div className="bg-pearl p-3 rounded-2xl border border-navy-100 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-navy-400 text-[10px] uppercase font-bold block">Hospital</span>
                    <strong className="text-navy-900 truncate block">{apt.hospitalName.split('(')[0]}</strong>
                  </div>
                  <div>
                    <span className="text-navy-400 text-[10px] uppercase font-bold block">Doctor</span>
                    <strong className="text-navy-900 truncate block">{apt.doctorName}</strong>
                  </div>
                  <div>
                    <span className="text-navy-400 text-[10px] uppercase font-bold block">Date</span>
                    <span className="text-navy-700 font-semibold">{apt.appointmentDate}</span>
                  </div>
                  <div>
                    <span className="text-navy-400 text-[10px] uppercase font-bold block">Time Slot</span>
                    <span className="text-medical-700 font-bold">{apt.timeSlot.split(' - ')[0]}</span>
                  </div>
                </div>

                {apt.cancellationReason && (
                  <div className="bg-rose-50 border border-rose-200/80 p-2 rounded-xl text-[11px] text-rose-800">
                    <strong>Cancellation Note:</strong> {apt.cancellationReason}
                  </div>
                )}

                {/* Card action row */}
                <div className="pt-2 border-t border-navy-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-navy-400 font-mono">
                    Code: <strong>{apt.appointmentCode}</strong>
                  </span>

                  <div className="flex items-center space-x-2">
                    {isUpcoming && (
                      <>
                        <button
                          onClick={() => setPatientTab('tokens')}
                          className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition-all active:scale-95 flex items-center space-x-1"
                        >
                          <Ticket className="w-3.5 h-3.5" />
                          <span>Track Live Queue</span>
                        </button>

                        <button
                          onClick={() => setAppointmentToCancel(apt)}
                          className="text-navy-400 hover:text-rose-600 font-semibold text-xs px-2 py-1"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* CANCELLATION MODAL */}
      {appointmentToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-3 shadow-2xl text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-navy-900 text-base">Cancel Appointment?</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Cancel token <strong>#{appointmentToCancel.tokenNumber}</strong> for <strong>{appointmentToCancel.beneficiaryName}</strong> at {appointmentToCancel.department}?
            </p>

            <div className="text-left text-xs">
              <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Select Cancellation Reason</label>
              <select
                value={cancelReason}
                onChange={e => setCancelReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-navy-200 bg-navy-50 text-xs"
              >
                <option value="Personal Emergency">Personal Emergency</option>
                <option value="Symptoms Resolved">Symptoms Resolved / Feeling Better</option>
                <option value="Timing Conflict">Timing Conflict / Rescheduling</option>
                <option value="Visited Another Facility">Visited Another Healthcare Facility</option>
              </select>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleConfirmCancel}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
              >
                Yes, Cancel Appointment
              </button>
              <button
                onClick={() => setAppointmentToCancel(null)}
                className="flex-1 bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold py-2.5 rounded-xl text-xs"
              >
                Keep Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
