import React, { useState } from 'react';
import { MapPin, Check, X, Search, ChevronRight, Building } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TELANGANA_ALL_33_DISTRICTS } from '../../data/telanganaDirectory';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose }) => {
  const { 
    selectedDistrict, setSelectedDistrict,
    selectedMandal, setSelectedMandal,
    selectedVillage, setSelectedVillage
  } = useApp();

  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const currentDistrictObj = TELANGANA_ALL_33_DISTRICTS.find(d => d.name === selectedDistrict) || TELANGANA_ALL_33_DISTRICTS[0];
  const currentMandalObj = currentDistrictObj.mandals.find(m => m.name === selectedMandal) || currentDistrictObj.mandals[0];

  const filteredDistricts = TELANGANA_ALL_33_DISTRICTS.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectDistrict = (distName: string) => {
    setSelectedDistrict(distName);
    const dObj = TELANGANA_ALL_33_DISTRICTS.find(d => d.name === distName);
    if (dObj && dObj.mandals.length > 0) {
      const firstMandal = dObj.mandals[0];
      setSelectedMandal(firstMandal.name);
      if (firstMandal.villages.length > 0) {
        setSelectedVillage(firstMandal.villages[0].name);
      }
    }
  };

  const handleSelectMandal = (mandalName: string) => {
    setSelectedMandal(mandalName);
    const mObj = currentDistrictObj.mandals.find(m => m.name === mandalName);
    if (mObj && mObj.villages.length > 0) {
      setSelectedVillage(mObj.villages[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-950/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-2xl shadow-soft-xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-navy-100 flex items-center justify-between bg-medical-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-700">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-sm">Select Healthcare Region (All 33 Districts)</h3>
              <p className="text-[11px] text-navy-500">Telangana Public Health Administrative Directory</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-navy-400 hover:text-navy-700 rounded-full hover:bg-navy-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Selection summary */}
        <div className="bg-navy-50 px-4 py-2 text-xs flex items-center justify-between border-b border-navy-100">
          <span className="text-navy-500">Active Location:</span>
          <span className="font-semibold text-medical-700 truncate max-w-[280px]">
            {selectedVillage}, {selectedMandal}, {selectedDistrict}
          </span>
        </div>

        {/* Search District */}
        <div className="p-3 border-b border-navy-100 bg-white">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-navy-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search any of 33 Telangana districts..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
            />
          </div>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {/* Step 1: District Selection */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              1. Select District ({filteredDistricts.length} of 33)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {filteredDistricts.map(dist => (
                <button
                  key={dist.id}
                  onClick={() => handleSelectDistrict(dist.name)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                    selectedDistrict === dist.name
                      ? 'border-medical-600 bg-medical-50/80 text-medical-900 font-bold shadow-soft-sm'
                      : 'border-navy-200 hover:border-navy-300 text-navy-700 bg-white'
                  }`}
                >
                  <span className="truncate">{dist.name}</span>
                  {selectedDistrict === dist.name && (
                    <Check className="w-4 h-4 text-medical-600 shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Mandal Selection */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              2. Select Mandal ({selectedDistrict})
            </label>
            <div className="grid grid-cols-2 gap-2">
              {currentDistrictObj.mandals.map(mandal => (
                <button
                  key={mandal.id}
                  onClick={() => handleSelectMandal(mandal.name)}
                  className={`p-2.5 rounded-xl border text-left text-xs font-medium flex items-center justify-between transition-all ${
                    selectedMandal === mandal.name
                      ? 'border-medical-600 bg-medical-50/80 text-medical-900 font-bold shadow-soft-sm'
                      : 'border-navy-200 hover:border-navy-300 text-navy-700 bg-white'
                  }`}
                >
                  <span className="truncate">{mandal.name}</span>
                  {selectedMandal === mandal.name && (
                    <Check className="w-4 h-4 text-medical-600 shrink-0 ml-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Village / Locality Selection */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              3. Select Locality / Village ({selectedMandal})
            </label>
            <div className="flex flex-wrap gap-2">
              {currentMandalObj.villages.map(village => (
                <button
                  key={village.id}
                  onClick={() => setSelectedVillage(village.name)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedVillage === village.name
                      ? 'bg-medical-600 text-white font-semibold shadow-sm'
                      : 'bg-navy-100 hover:bg-navy-200 text-navy-700'
                  }`}
                >
                  {village.name} ({village.type})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Apply */}
        <div className="p-4 border-t border-navy-100 bg-white flex justify-end">
          <button
            onClick={onClose}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition-all shadow-soft-sm"
          >
            Confirm Location Selection
          </button>
        </div>
      </div>
    </div>
  );
};
