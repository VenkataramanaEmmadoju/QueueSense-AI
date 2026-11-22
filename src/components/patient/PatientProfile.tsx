import React, { useState } from 'react';
import { 
  UserCheck, 
  QrCode, 
  ShieldCheck, 
  Users, 
  Globe, 
  Download, 
  MapPin, 
  Phone, 
  Heart, 
  ChevronRight,
  ExternalLink,
  Sparkles,
  Wifi,
  WifiOff,
  Edit3,
  Check,
  LogOut,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { CaregiverModal } from '../common/CaregiverModal';
import { BrandLogo } from '../common/BrandLogo';

export const PatientProfile: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { 
    currentUser,
    patientProfile, 
    updatePatientProfile,
    familyMembers,
    selectedDistrict, 
    selectedMandal, 
    selectedVillage,
    isOnline,
    canInstallPWA,
    installPWA,
    setPatientTab,
    logout
  } = useApp();

  const [isCaregiverModalOpen, setIsCaregiverModalOpen] = useState(false);
  const [showABHAQR, setShowABHAQR] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Edit fields
  const [editName, setEditName] = useState(currentUser?.name || patientProfile.name);
  const [editAge, setEditAge] = useState((currentUser?.age || patientProfile.age).toString());
  const [editPhone, setEditPhone] = useState(currentUser?.phone || patientProfile.phone);
  const [editEmail, setEditEmail] = useState(currentUser?.email || '');
  const [editGender, setEditGender] = useState(currentUser?.gender || patientProfile.gender);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatientProfile({
      name: editName.trim(),
      age: parseInt(editAge) || 30,
      phone: editPhone.trim(),
      email: editEmail.trim() || undefined,
      gender: editGender
    });
    setIsEditingProfile(false);
  };

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('queuesense_preferred_lang', lang);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">PATIENT ACCOUNT</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('nav.profile')}</h2>
        </div>

        <button
          onClick={() => setIsEditingProfile(!isEditingProfile)}
          className="flex items-center space-x-1 text-xs text-medical-700 font-bold bg-medical-50 hover:bg-medical-100 px-3 py-1.5 rounded-xl border border-medical-200 transition-all active:scale-95"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
        </button>
      </div>

      {/* EDIT PROFILE FORM */}
      {isEditingProfile && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3 animate-in fade-in">
          <h3 className="font-extrabold text-navy-900 text-sm">Edit Personal Profile</h3>
          
          <div>
            <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={editName}
              onChange={e => setEditName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Age</label>
              <input
                type="number"
                required
                value={editAge}
                onChange={e => setEditAge(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Gender</label>
              <select
                value={editGender}
                onChange={e => setEditGender(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Mobile Phone</label>
              <input
                type="text"
                required
                value={editPhone}
                onChange={e => setEditPhone(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={e => setEditEmail(e.target.value)}
                placeholder="Optional"
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95 shadow-soft-sm"
          >
            Save Profile Changes
          </button>
        </form>
      )}

      {/* DIGITAL ABHA HEALTH CARD (SIMULATED PROTOTYPE PLACEHOLDER) */}
      <div className="bg-gradient-to-tr from-teal-900 via-medical-800 to-teal-700 text-white rounded-3xl p-5 shadow-soft-xl relative overflow-hidden">
        {/* Emblem stamp */}
        <div className="flex items-center justify-between border-b border-white/15 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center font-bold text-xs border border-white/20">
              🇮🇳
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-teal-200">
                ABHA HEALTH CARD (DEMO PLACEHOLDER)
              </span>
              <h4 className="text-xs font-bold text-white">Public Healthcare Prototype Model</h4>
            </div>
          </div>
          <span className="bg-white/20 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase">
            Demo Scheme Info (Unverified)
          </span>
        </div>

        {/* Card Body */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-lg sm:text-xl font-black text-white tracking-tight">
              {currentUser?.name || patientProfile.name}
            </div>
            <div className="text-xs text-teal-100/90 mt-0.5">
              Age: {currentUser?.age || patientProfile.age} Yrs • Gender: {currentUser?.gender || patientProfile.gender} • Blood: {patientProfile.bloodGroup}
            </div>
            <div className="mt-3 font-mono text-sm tracking-wider font-extrabold text-teal-200">
              {currentUser?.abhaDemoNumber || patientProfile.abhaId}
            </div>
            <div className="text-[11px] text-teal-100/70 mt-0.5">UHID: {currentUser?.uhidDemoNumber || patientProfile.uhid}</div>
          </div>

          <button
            onClick={() => setShowABHAQR(!showABHAQR)}
            className="w-16 h-16 bg-white p-1.5 rounded-2xl shadow-md border border-white/30 flex flex-col items-center justify-center shrink-0 active:scale-95 transition-transform"
          >
            <QrCode className="w-8 h-8 text-navy-950" />
            <span className="text-[8px] font-black text-navy-900 uppercase mt-0.5">TAP QR</span>
          </button>
        </div>

        {/* Address */}
        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-teal-100/80">
          <div className="flex items-center space-x-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-300 shrink-0" />
            <span className="truncate">{selectedVillage}, {selectedMandal}, {selectedDistrict}</span>
          </div>
          <span className="text-teal-200 font-bold shrink-0">Emergency: 112 / 108</span>
        </div>
      </div>

      {/* ABHA Unconnected Disclaimer */}
      <div className="bg-navy-100/70 border border-navy-200 p-2.5 rounded-2xl flex items-start space-x-2 text-[11px] text-navy-600">
        <Info className="w-4 h-4 text-navy-500 shrink-0 mt-0.5" />
        <span>
          <strong>ABHA Integration Notice:</strong> The ABHA number and QR code shown above are unconnected demo placeholders for hackathon evaluation. Production ABDM M1/M2 APIs will be connected in Phase 2.
        </span>
      </div>

      {/* MY FAMILY ACCESS CARD */}
      <div 
        onClick={() => setPatientTab('family')}
        className="bg-white border border-navy-200/80 rounded-3xl p-4 sm:p-5 shadow-soft-sm hover:border-medical-300 cursor-pointer transition-all flex items-center justify-between"
      >
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-navy-950 text-sm sm:text-base">My Family & Dependents</h3>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-black px-2 py-0.5 rounded-full">
                {familyMembers.length} Saved
              </span>
            </div>
            <p className="text-xs text-navy-500 mt-0.5">
              Add and manage appointments for parents, children and family kin
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-navy-400" />
      </div>

      {/* APP PREFERENCES & PWA SETTINGS */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-4 sm:p-5 shadow-soft-sm space-y-3">
        <h3 className="font-bold text-navy-900 text-sm">App Preferences & PWA Settings</h3>

        {/* Language selector */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50/60 border border-navy-100">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-medical-600" />
            <div>
              <span className="text-xs font-bold text-navy-900">Application Language</span>
              <p className="text-[10px] text-navy-500">English, Telugu or Hindi</p>
            </div>
          </div>
          <div className="flex bg-white rounded-xl p-0.5 border border-navy-200 text-xs font-bold">
            {(['en', 'te', 'hi'] as const).map(l => (
              <button
                key={l}
                onClick={() => handleLanguageChange(l)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  i18n.language === l ? 'bg-medical-700 text-white shadow-xs font-black' : 'text-navy-500'
                }`}
              >
                {l === 'te' ? 'తెలుగు' : l === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* PWA Install Button */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50/60 border border-navy-100">
          <div className="flex items-center space-x-2">
            <Download className="w-4 h-4 text-medical-600" />
            <div>
              <span className="text-xs font-bold text-navy-900">Install as Mobile App</span>
              <p className="text-[10px] text-navy-500">Add to iPhone or Android Home Screen</p>
            </div>
          </div>
          <button
            onClick={installPWA}
            className="bg-medical-600 hover:bg-medical-700 text-white font-bold px-3 py-1.5 rounded-xl text-xs active:scale-95 transition-all shadow-xs"
          >
            Install PWA
          </button>
        </div>

        {/* Network & Offline Status */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-navy-50/60 border border-navy-100 text-xs">
          <div className="flex items-center space-x-2">
            {isOnline ? <Wifi className="w-4 h-4 text-emerald-600" /> : <WifiOff className="w-4 h-4 text-amber-600" />}
            <div>
              <span className="font-bold text-navy-900">Network Connectivity</span>
              <p className="text-[10px] text-navy-500">
                {isOnline ? 'Online - Live Hospital Telemetry Connected' : 'Offline - Safe Static Cache Active'}
              </p>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
            isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Brand Identity & Version */}
      <div className="bg-white border border-navy-100 rounded-3xl p-4 shadow-soft-sm flex flex-col items-center justify-center space-y-1.5 text-center">
        <BrandLogo variant="standard" theme="light" size="sm" showTagline={true} />
        <p className="text-[10px] text-navy-400 font-medium">
          Telangana Public Healthcare • QueueSense AI Mobile PWA
        </p>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold py-3 rounded-3xl text-xs flex items-center justify-center space-x-1.5 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out of Patient Account</span>
      </button>

      <CaregiverModal
        isOpen={isCaregiverModalOpen}
        onClose={() => setIsCaregiverModalOpen(false)}
      />
    </div>
  );
};
