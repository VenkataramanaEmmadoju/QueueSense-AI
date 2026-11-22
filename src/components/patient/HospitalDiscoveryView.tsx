import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  PhoneCall, 
  Search, 
  Filter, 
  CalendarPlus, 
  BedDouble, 
  ShieldCheck, 
  Star,
  ExternalLink,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { VERIFIED_GOVERNMENT_HOSPITALS } from '../../data/hospitalsDirectory';
import { TELANGANA_ALL_33_DISTRICTS } from '../../data/telanganaDirectory';

export const HospitalDiscoveryView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    selectedDistrict, 
    setSelectedDistrict, 
    setSelectedHospital, 
    setPatientTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filteredHospitals = VERIFIED_GOVERNMENT_HOSPITALS.filter(hosp => {
    if (districtFilter !== 'All' && hosp.district !== districtFilter) return false;
    if (categoryFilter !== 'All' && hosp.category !== categoryFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = hosp.name.toLowerCase().includes(q);
      const matchAddress = hosp.address.toLowerCase().includes(q);
      const matchDept = hosp.departments.some(d => d.toLowerCase().includes(q));
      if (!matchName && !matchAddress && !matchDept) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">TELANGANA PUBLIC HEALTH NETWORK</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('hosp.title')}</h2>
        <p className="text-xs text-navy-500">Find government hospitals, teaching institutes and community health centres</p>
      </div>

      {/* Dataset & Operational Disclosure */}
      <div className="bg-medical-50/70 border border-medical-200/70 rounded-2xl p-3 flex items-start space-x-2 text-xs text-medical-900 shadow-soft-sm">
        <Info className="w-4 h-4 text-medical-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Verified Government Directory:</strong> Hospital addresses, categories and helplines are verified against public health records. For hackathon evaluation, <strong>TIMS Gachibowli</strong> acts as the full operational benchmark with live queue and bed telemetry.
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-navy-400 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search by hospital name, specialty, or locality..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full text-xs pl-10 pr-4 py-3 rounded-2xl border border-navy-200 bg-white focus:outline-none focus:ring-1 focus:ring-medical-600 shadow-soft-sm"
        />
      </div>

      {/* Filters: District & Category */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[10px] font-bold text-navy-500 uppercase block mb-1">Filter District (33)</label>
          <select
            value={districtFilter}
            onChange={e => setDistrictFilter(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-navy-200 bg-white text-xs font-semibold focus:ring-1 focus:ring-medical-600"
          >
            <option value="All">All Districts (33)</option>
            {TELANGANA_ALL_33_DISTRICTS.map(d => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] font-bold text-navy-500 uppercase block mb-1">Facility Category</label>
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full p-2.5 rounded-xl border border-navy-200 bg-white text-xs font-semibold focus:ring-1 focus:ring-medical-600"
          >
            <option value="All">All Categories</option>
            <option value="Government Teaching Hospital">Teaching Hospital</option>
            <option value="District Hospital">District Hospital</option>
            <option value="Area Hospital">Area Hospital</option>
            <option value="Community Health Centre (CHC)">Community Centre (CHC)</option>
          </select>
        </div>
      </div>

      {/* Hospitals List */}
      <div className="space-y-3">
        {filteredHospitals.map((hosp) => {
          const isOperational = hosp.isOperationalDemo;

          return (
            <div
              key={hosp.id}
              className={`bg-white border rounded-3xl p-5 shadow-soft-sm space-y-3 transition-all ${
                isOperational 
                  ? 'border-medical-400 bg-gradient-to-br from-teal-50/40 via-white to-white ring-1 ring-medical-400/20' 
                  : 'border-navy-200/80 hover:border-navy-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                    <span className="text-[9px] bg-navy-100 text-navy-800 font-bold px-2 py-0.5 rounded-full uppercase">
                      {hosp.category}
                    </span>
                    {isOperational && (
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">
                        Live Operational Hub
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-navy-950 text-sm sm:text-base mt-1.5">{hosp.name}</h3>
                  <p className="text-xs text-navy-500 mt-0.5 flex items-center space-x-1">
                    <MapPin className="w-3.5 h-3.5 text-medical-600 shrink-0" />
                    <span>{hosp.address}</span>
                  </p>
                </div>

                <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded-lg text-xs font-bold shrink-0 border border-amber-200/60">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                  <span>{hosp.rating}</span>
                </div>
              </div>

              {/* Specialties / Bed preview */}
              <div className="bg-pearl p-3 rounded-2xl border border-navy-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-navy-600">
                  <span>Capacity Benchmark:</span>
                  <strong className="text-navy-900">{hosp.totalBeds} Beds ({hosp.availableBedsEstimate} estimated vacant)</strong>
                </div>
                <div className="flex justify-between text-navy-600">
                  <span>Emergency Wing:</span>
                  <strong className="text-rose-700">{hosp.emergencyCasualty}</strong>
                </div>
                <div className="flex flex-wrap gap-1 pt-1">
                  {hosp.departments.slice(0, 4).map(d => (
                    <span key={d} className="bg-navy-100 text-navy-700 text-[10px] px-2 py-0.5 rounded-md font-medium">
                      {d}
                    </span>
                  ))}
                  {hosp.departments.length > 4 && (
                    <span className="text-[10px] text-navy-400 font-semibold self-center">
                      +{hosp.departments.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-navy-100 flex items-center justify-between text-xs">
                <a
                  href={`tel:${hosp.helpline}`}
                  className="text-medical-700 hover:text-medical-800 font-bold flex items-center space-x-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Helpline ({hosp.helpline})</span>
                </a>

                {isOperational ? (
                  <button
                    onClick={() => {
                      setSelectedDistrict(hosp.district);
                      setPatientTab('booking');
                    }}
                    className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all active:scale-95 shadow-soft-sm"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>Book OPD Token</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      alert(`Directory Listing: ${hosp.name}. For live operational simulation, please select TIMS Gachibowli.`);
                    }}
                    className="bg-navy-50 hover:bg-navy-100 text-navy-700 font-semibold px-3 py-1.5 rounded-xl text-xs"
                  >
                    View Directory Card
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
