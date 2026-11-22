import React, { useState } from 'react';
import { 
  ShieldAlert, 
  PhoneCall, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowLeft,
  Activity,
  HeartCrack,
  Car,
  Wind,
  Baby
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { translateHospitalName } from '../../i18n/translateHelpers';

export const EmergencySOSFlow: React.FC = () => {
  const { t } = useTranslation();
  const { 
    selectedHospital, 
    selectedMandal, 
    selectedVillage, 
    patientProfile,
    submitEmergencySOS,
    emergencyAlerts,
    setPatientTab 
  } = useApp();

  const [condition, setCondition] = useState<string>('Chest Pain & Cardiac Distress');
  const [locationInput, setLocationInput] = useState<string>(`${selectedVillage}, ${selectedMandal}`);
  const [activeSOS, setActiveSOS] = useState<any>(null);
  const [isDispatched, setIsDispatched] = useState(false);

  const emergencyTypes = [
    { label: t('emg.type_cardiac', 'Chest Pain / Cardiac'), icon: HeartCrack, desc: 'Suspected heart attack, angina, fainting' },
    { label: t('emg.type_trauma', 'Road Accident / Trauma'), icon: Car, desc: 'Severe bleeding, fractures, vehicle crash' },
    { label: t('emg.type_respiratory', 'Respiratory Distress'), icon: Wind, desc: 'Severe asthma, choking, low oxygen SpO2' },
    { label: t('emg.type_other', 'Maternity / Critical Emergency'), icon: Baby, desc: 'Active labor pains, neonatal distress' }
  ];

  const handleTriggerSOS = () => {
    setIsDispatched(true);
    const req = submitEmergencySOS({
      location: locationInput,
      condition,
      mandal: selectedMandal
    });
    setActiveSOS(req);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setPatientTab('home')}
          className="flex items-center space-x-1.5 text-navy-600 hover:text-navy-950 text-xs font-semibold p-2 rounded-xl hover:bg-navy-100 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.back', 'Back to Home')}</span>
        </button>

        <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold uppercase px-2.5 py-1 rounded-full border border-rose-200 animate-pulse">
          {t('home.service_emergency', 'Telangana 108 Emergency Network')}
        </span>
      </div>

      {/* Synthetic Safety Alert */}
      <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-3 flex items-start space-x-2 text-xs text-rose-900 shadow-soft-sm">
        <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        <div className="leading-snug">
          <strong className="font-bold">{t('common.warning', 'Emergency Warning')}: </strong>
          {t('emg.subtitle', 'Synthetic prototype simulation. In real emergency dial 108 directly.')}
        </div>
      </div>

      {!isDispatched ? (
        /* SOS Trigger Screen */
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-gradient-to-br from-rose-600 to-rose-800 text-white rounded-3xl p-5 shadow-soft-xl text-center relative overflow-hidden">
            <ShieldAlert className="w-14 h-14 mx-auto text-rose-100 animate-pulse" />
            <h2 className="text-2xl font-black mt-2 tracking-tight">{t('emg.title', 'Emergency Assistance')}</h2>
            <p className="text-xs text-rose-100/90 max-w-xs mx-auto mt-1">
              {t('emg.subtitle', 'Instant 108 Advanced Life Support (ALS) Ambulance Dispatch')}
            </p>

            {/* Direct Dial 108 Button */}
            <div className="mt-4 pt-4 border-t border-rose-400/30 flex justify-center">
              <a
                href="tel:108"
                className="bg-white text-rose-700 hover:bg-rose-50 font-black px-6 py-2.5 rounded-full text-sm inline-flex items-center space-x-2 shadow-lg active:scale-95 transition-transform"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('emg.call_108_btn', 'One-Tap Dial 108')}</span>
              </a>
            </div>
          </div>

          {/* Condition Selector */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              {t('emg.emergency_type', 'Select Emergency Condition')}
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {emergencyTypes.map((item) => {
                const isSelected = condition === item.label;
                const IconComponent = item.icon;

                return (
                  <button
                    key={item.label}
                    onClick={() => setCondition(item.label)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-rose-600 bg-rose-50/70 text-rose-950 font-bold shadow-soft-sm ring-1 ring-rose-500/20'
                        : 'border-navy-200/80 hover:border-navy-300 bg-white text-navy-800'
                    }`}
                  >
                    <IconComponent className="w-5 h-5 text-rose-600 mb-2" />
                    <div className="text-xs font-bold">{item.label}</div>
                    <p className="text-[10px] text-navy-500 mt-0.5 leading-tight">{item.desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Location details */}
          <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm space-y-2">
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block">
              {t('emg.patient_location', 'Pickup Location & Landmark')}
            </label>
            <div className="flex items-center space-x-2 bg-navy-50 p-2.5 rounded-xl border border-navy-200">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter village, road, or landmark..."
                className="w-full text-xs bg-transparent focus:outline-none text-navy-900 font-medium"
              />
            </div>
            <p className="text-[11px] text-navy-500">
              Hospital Casualty Pre-Alert: <strong className="text-navy-900">{translateHospitalName(selectedHospital.name.split('(')[0])}</strong>
            </p>
          </div>

          {/* Dispatch Trigger CTA */}
          <button
            onClick={handleTriggerSOS}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 active:scale-[0.98] text-white font-black py-4 px-4 rounded-3xl text-sm transition-all shadow-soft-lg flex items-center justify-center space-x-2"
          >
            <ShieldAlert className="w-5 h-5 animate-pulse" />
            <span>{t('emg.dispatch_ambulance', 'DISPATCH 108 AMBULANCE NOW')}</span>
          </button>
        </div>
      ) : (
        /* Active SOS Dispatch Tracking Screen */
        <div className="space-y-4 animate-in zoom-in-95 duration-300">
          <div className="bg-white border-2 border-rose-500/40 rounded-3xl p-5 shadow-soft-xl text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-2 ring-8 ring-rose-50 animate-bounce">
              <Activity className="w-8 h-8" />
            </div>
            <span className="text-[11px] bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-full uppercase border border-rose-200">
              {t('emg.sos_active_title', '108 AMBULANCE EN ROUTE')}
            </span>
            <h2 className="text-2xl font-black text-navy-950 mt-2">{t('emg.eta_label', 'ETA')}: {t('emg.eta_time', '6 - 8 Minutes')}</h2>
            <p className="text-xs text-navy-500 mt-1">
              Ambulance Unit <strong className="text-navy-900">TS-108-EMG-09</strong> assigned to your location.
            </p>

            {/* Simulated Live Route Card */}
            <div className="my-4 bg-navy-950 text-white p-4 rounded-2xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between text-xs text-teal-300 mb-2">
                <span className="flex items-center space-x-1">
                  <Navigation className="w-3.5 h-3.5 animate-spin" />
                  <span>GPS Telemetry Active</span>
                </span>
                <span className="bg-rose-500/30 text-rose-300 px-2 py-0.5 rounded font-mono text-[10px]">
                  LIVE RADAR
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-200">
                Approaching via Gachibowli Outer Ring Road flyover
              </p>
              <div className="mt-3 flex items-center justify-between text-xs border-t border-white/10 pt-2">
                <span className="text-slate-400">Emergency Casualty Bed:</span>
                <span className="text-emerald-400 font-bold">Trauma Bay 02 Reserved</span>
              </div>
            </div>

            {/* Direct Calls */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="tel:108"
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('emg.call_108_btn', 'Call Driver')}</span>
              </a>
              <a
                href={`tel:${selectedHospital.emergencyHelpline}`}
                className="bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold py-2.5 rounded-xl flex items-center justify-center space-x-1.5"
              >
                <PhoneCall className="w-4 h-4" />
                <span>{t('hosp.call_hospital', 'Call Casualty')}</span>
              </a>
            </div>
          </div>

          <button
            onClick={() => setIsDispatched(false)}
            className="w-full bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold py-2.5 rounded-2xl text-xs transition-colors"
          >
            {t('emg.cancel_sos', 'Reset SOS State')}
          </button>
        </div>
      )}
    </div>
  );
};
