import React, { useState } from 'react';
import { 
  Ticket, 
  PhoneCall, 
  CheckCircle2, 
  PauseCircle, 
  ArrowRightLeft, 
  Stethoscope, 
  Clock, 
  Search, 
  Filter, 
  Users,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TokenQueueDesk: React.FC = () => {
  const { 
    tokens, 
    callNextToken, 
    updateTokenStatus, 
    departments, 
    currentStaffUser,
    addToast
  } = useApp();

  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filteredTokens = tokens.filter(t => {
    if (selectedDeptFilter !== 'All' && !t.department.includes(selectedDeptFilter)) return false;
    if (search && !t.tokenNumber.toLowerCase().includes(search.toLowerCase()) && !t.patientName.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const waitingTokens = filteredTokens.filter(t => t.status === 'waiting');
  const servingTokens = filteredTokens.filter(t => t.status === 'serving');
  const completedTokens = filteredTokens.filter(t => t.status === 'completed');

  return (
    <div className="space-y-4">
      {/* Top action row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">CLINICAL OPD WORKFLOW</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">OPD Token Queue Desk</h2>
        </div>

        {/* Quick Call Next Button */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              const targetDept = selectedDeptFilter === 'All' ? 'Cardio' : selectedDeptFilter;
              callNextToken(targetDept);
            }}
            className="bg-medical-600 hover:bg-medical-700 active:scale-95 text-white font-bold px-4 py-2 rounded-2xl text-xs flex items-center space-x-1.5 shadow-soft-sm transition-all"
          >
            <Ticket className="w-4 h-4" />
            <span>Call Next Patient</span>
          </button>
        </div>
      </div>

      {/* Filter Chips & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
          {['All', 'Cardio', 'General', 'Pediatrics', 'Orthopedics'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDeptFilter(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDeptFilter === dept
                  ? 'bg-navy-900 text-white shadow-soft-sm'
                  : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
              }`}
            >
              {dept === 'All' ? 'All Departments' : dept}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px]">
          <Search className="w-3.5 h-3.5 text-navy-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search token # or patient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-navy-200 bg-white focus:outline-none focus:ring-1 focus:ring-medical-600"
          />
        </div>
      </div>

      {/* CURRENTLY SERVING HERO CARDS */}
      {servingTokens.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-navy-600 uppercase tracking-wider flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Active in Consultation Room</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {servingTokens.map((tok) => (
              <div 
                key={tok.id}
                className="bg-gradient-to-r from-emerald-50 via-teal-50 to-white border-2 border-emerald-400/50 rounded-3xl p-4 shadow-soft-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-xl flex items-center justify-center shadow-soft-sm">
                      {tok.tokenNumber}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy-950 text-sm">{tok.patientName}</h4>
                      <p className="text-xs text-navy-600 font-medium">{tok.department} • {tok.roomNumber}</p>
                      <p className="text-[11px] text-navy-500">Age: {tok.patientAge} • {tok.patientGender} • Dr: {tok.doctorName}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold bg-emerald-600 text-white px-2.5 py-1 rounded-full uppercase">
                    Serving
                  </span>
                </div>

                {/* Staff Actions */}
                <div className="mt-3 pt-3 border-t border-emerald-200/60 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      updateTokenStatus(tok.id, 'completed');
                      addToast(`Token ${tok.tokenNumber} Completed`, 'Consultation finished, e-Prescription dispatched');
                    }}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1 transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Complete & Dispatch</span>
                  </button>

                  <button
                    onClick={() => {
                      updateTokenStatus(tok.id, 'hold');
                      addToast(`Token ${tok.tokenNumber} on Hold`, 'Awaiting ECG / Lab report');
                    }}
                    className="px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold py-2 rounded-xl border border-amber-200 transition-all"
                  >
                    Hold
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WAITING QUEUE TABLE */}
      <div className="bg-white border border-navy-200/80 rounded-3xl overflow-hidden shadow-soft-sm">
        <div className="p-4 border-b border-navy-100 flex items-center justify-between bg-navy-50/50">
          <div className="flex items-center space-x-2">
            <h3 className="font-bold text-navy-900 text-sm">Patients in Queue</h3>
            <span className="bg-medical-100 text-medical-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {waitingTokens.length} Waiting
            </span>
          </div>
        </div>

        {waitingTokens.length === 0 ? (
          <div className="text-center py-10 text-navy-400">
            <Ticket className="w-8 h-8 mx-auto text-navy-300 stroke-1 mb-1" />
            <p className="text-xs font-semibold text-navy-600">No Patients Currently Waiting</p>
            <p className="text-[11px] text-navy-400">Queue is clear or all tokens have been called.</p>
          </div>
        ) : (
          <div className="divide-y divide-navy-100">
            {waitingTokens.map((tok, idx) => {
              const isPriority = tok.priority === 'priority' || tok.priority === 'emergency';

              return (
                <div 
                  key={tok.id}
                  className="p-3.5 sm:p-4 hover:bg-navy-50/50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div className="w-10 h-10 rounded-2xl bg-medical-50 text-medical-800 font-extrabold text-sm flex items-center justify-center border border-medical-200 shrink-0">
                      {tok.tokenNumber}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-bold text-navy-950 text-xs sm:text-sm truncate">{tok.patientName}</h4>
                        {isPriority && (
                          <span className="text-[9px] bg-rose-100 text-rose-800 font-bold px-1.5 rounded uppercase shrink-0">
                            Priority
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-navy-500 truncate">
                        {tok.department} • Slot: {tok.slotTime.split(' - ')[0]} • Age: {tok.patientAge}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="text-[11px] text-navy-500 hidden sm:inline">
                      Position: <strong>#{idx + 1}</strong>
                    </span>

                    <button
                      onClick={() => {
                        updateTokenStatus(tok.id, 'serving');
                        addToast(`Token ${tok.tokenNumber} Called`, `Patient ${tok.patientName} called into room`);
                      }}
                      className="bg-medical-600 hover:bg-medical-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-all shadow-xs"
                    >
                      Call In
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
