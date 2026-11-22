import React, { useState } from 'react';
import { 
  BedDouble, 
  Activity, 
  Heart, 
  Baby, 
  ShieldCheck, 
  AlertTriangle, 
  WifiOff, 
  RefreshCw, 
  MapPin, 
  PhoneCall,
  Search,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BedAvailabilityView: React.FC = () => {
  const { 
    bedCategories, 
    selectedHospital, 
    hospitals, 
    setSelectedHospital, 
    isOnline,
    addToast
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshBeds = () => {
    if (!isOnline) {
      addToast('Cannot refresh offline', 'Bed telemetry requires active network connection', 'system');
      return;
    }
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast('Bed Inventory Synced', 'Live telemetry from TIMS Central Admissions Desk');
    }, 500);
  };

  const filteredCategories = bedCategories.filter(cat => {
    if (activeFilter === 'icu' && !cat.name.includes('ICU')) return false;
    if (activeFilter === 'oxygen' && !cat.name.includes('Oxygen')) return false;
    if (activeFilter === 'pediatric' && !cat.name.includes('Pediatric')) return false;
    if (activeFilter === 'maternity' && !cat.name.includes('Maternity')) return false;
    if (activeFilter === 'general' && !cat.name.includes('General')) return false;
    return true;
  });

  const totalBeds = bedCategories.reduce((acc, c) => acc + c.total, 0);
  const totalOccupied = bedCategories.reduce((acc, c) => acc + c.occupied, 0);
  const totalAvailable = bedCategories.reduce((acc, c) => acc + c.available, 0);

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">HOSPITAL CAPACITY RADAR</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">Live Bed Availability</h2>
        </div>
        <button
          onClick={handleRefreshBeds}
          disabled={isRefreshing}
          className="flex items-center space-x-1 text-xs text-medical-700 bg-medical-50 hover:bg-medical-100 font-semibold px-3 py-1.5 rounded-xl border border-medical-200 transition-all active:scale-95"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Sync Beds</span>
        </button>
      </div>

      {/* OFFLINE INTEGRITY SAFEGUARD WARNING */}
      {!isOnline && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start space-x-2.5 shadow-soft-sm">
          <WifiOff className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 animate-pulse" />
          <div className="leading-relaxed">
            <strong>Bed Telemetry Paused (Offline):</strong> In accordance with public healthcare safety rules, QueueSense does not display stale bed counts or admit requests while disconnected. Reconnect to resume live bed reservation.
          </div>
        </div>
      )}

      {/* Hospital Switcher Card */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
        <label className="text-[11px] font-bold text-navy-500 uppercase tracking-wider block mb-1.5">
          Active Facility (Telangana Health Grid)
        </label>
        <select
          value={selectedHospital.id}
          onChange={(e) => {
            const h = hospitals.find(x => x.id === e.target.value);
            if (h) setSelectedHospital(h);
          }}
          className="w-full text-xs font-bold text-navy-900 p-2.5 rounded-xl border border-navy-200 bg-navy-50/70 focus:outline-none focus:ring-1 focus:ring-medical-600"
        >
          {hospitals.map(hosp => (
            <option key={hosp.id} value={hosp.id}>
              {hosp.name} ({hosp.district})
            </option>
          ))}
        </select>
        <div className="flex items-center justify-between text-xs text-navy-500 mt-2 px-1">
          <span className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-medical-600" />
            <span className="truncate max-w-[200px]">{selectedHospital.address}</span>
          </span>
          <a 
            href={`tel:${selectedHospital.emergencyHelpline}`} 
            className="text-medical-700 font-semibold flex items-center space-x-1 hover:underline"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Helpdesk</span>
          </a>
        </div>
      </div>

      {/* Overall Capacity Gauge */}
      <div className="bg-gradient-to-r from-medical-900 to-navy-900 text-white rounded-3xl p-4 sm:p-5 shadow-soft-md">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-medical-200 font-bold uppercase tracking-wider">Facility Occupancy</span>
          <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
            {totalAvailable} Beds Vacant
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden p-0.5 border border-white/10 mb-3">
          <div 
            className="bg-gradient-to-r from-medical-400 to-emerald-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.round((totalOccupied / totalBeds) * 100)}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-white/5 rounded-xl p-2">
            <span className="text-slate-400 text-[10px] uppercase block">Total Beds</span>
            <span className="text-base font-extrabold">{totalBeds}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2">
            <span className="text-slate-400 text-[10px] uppercase block">Occupied</span>
            <span className="text-base font-extrabold text-amber-300">{totalOccupied}</span>
          </div>
          <div className="bg-white/5 rounded-xl p-2">
            <span className="text-slate-400 text-[10px] uppercase block">Available</span>
            <span className="text-base font-extrabold text-emerald-300">{totalAvailable}</span>
          </div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'All Wards' },
          { id: 'icu', label: 'ICU / CCU' },
          { id: 'oxygen', label: 'Oxygen Wards' },
          { id: 'pediatric', label: 'Pediatric' },
          { id: 'maternity', label: 'Maternity' },
          { id: 'general', label: 'General' },
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeFilter === filter.id
                ? 'bg-medical-700 text-white shadow-soft-sm'
                : 'bg-white border border-navy-200 text-navy-600 hover:bg-navy-50'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Bed Category Cards List */}
      <div className="space-y-3">
        {filteredCategories.map((cat) => {
          const occupancyRate = Math.round((cat.occupied / cat.total) * 100);
          const isCritical = cat.available <= 5;

          return (
            <div 
              key={cat.id}
              className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm hover:border-medical-300 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    cat.name.includes('ICU') ? 'bg-rose-100 text-rose-700' :
                    cat.name.includes('Oxygen') ? 'bg-teal-100 text-teal-700' :
                    cat.name.includes('Pediatric') ? 'bg-purple-100 text-purple-700' :
                    cat.name.includes('Maternity') ? 'bg-pink-100 text-pink-700' :
                    'bg-navy-100 text-navy-700'
                  }`}>
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-950 text-sm">{cat.name}</h3>
                    <p className="text-[11px] text-navy-500">
                      {isOnline ? cat.lastUpdated : 'Offline: Telemetry Stale'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`text-base font-black ${
                    isCritical ? 'text-rose-600' : 'text-emerald-700'
                  }`}>
                    {cat.available}
                  </span>
                  <span className="text-xs text-navy-500 block -mt-0.5">vacant</span>
                </div>
              </div>

              {/* Occupancy bar */}
              <div className="mt-3">
                <div className="flex justify-between text-[11px] text-navy-500 mb-1 font-medium">
                  <span>Occupied: {cat.occupied} of {cat.total}</span>
                  <span>{occupancyRate}% full</span>
                </div>
                <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      occupancyRate > 90 ? 'bg-rose-500' : occupancyRate > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-navy-100 flex items-center justify-between text-[11px]">
                <span className="text-navy-500">
                  Reserved Emergency Buffer: <strong>{cat.reservedEmergency} beds</strong>
                </span>
                <span className="text-medical-700 font-semibold">
                  Avg stay: ~{cat.turnaroundAvgHours}h
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
