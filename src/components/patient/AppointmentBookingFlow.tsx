import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  User, 
  Users, 
  UserPlus, 
  Building2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  QrCode, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles,
  MapPin,
  ChevronDown,
  AlertCircle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { TELANGANA_ALL_33_DISTRICTS } from '../../data/telanganaDirectory';
import { VERIFIED_GOVERNMENT_HOSPITALS } from '../../data/hospitalsDirectory';
import { FamilyMember, StoredAppointment } from '../../types';

export const AppointmentBookingFlow: React.FC = () => {
  const { t } = useTranslation();
  const { 
    currentUser, 
    patientProfile, 
    familyMembers, 
    addFamilyMember, 
    bookAppointment, 
    setPatientTab,
    departments,
    selectedDistrict: defaultDistrict,
    selectedMandal: defaultMandal,
    selectedVillage: defaultVillage
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Beneficiary Selection
  const [selectedBeneficiaryType, setSelectedBeneficiaryType] = useState<'self' | 'family' | 'new'>('self');
  const [selectedFamilyMemberId, setSelectedFamilyMemberId] = useState<string>(familyMembers[0]?.id || '');
  
  // Inline add new family member state
  const [newMemName, setNewMemName] = useState('');
  const [newMemRelation, setNewMemRelation] = useState<'Father' | 'Mother' | 'Spouse' | 'Son' | 'Daughter' | 'Other'>('Mother');
  const [newMemAge, setNewMemAge] = useState('');
  const [newMemGender, setNewMemGender] = useState('Female');

  // Step 2: Location & Hospital
  const [bookingDistrict, setBookingDistrict] = useState<string>(defaultDistrict || 'Rangareddy');
  const [bookingMandal, setBookingMandal] = useState<string>(defaultMandal || 'Serilingampally');
  const [bookingVillage, setBookingVillage] = useState<string>(defaultVillage || 'Gachibowli');
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>('hosp-tims-gachibowli');

  // Step 3: Department
  const [selectedDeptId, setSelectedDeptId] = useState<string>(departments[0].id);

  // Step 4: Date & Slot
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const dayAfterStr = new Date(Date.now() + 172800000).toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [selectedSlot, setSelectedSlot] = useState<string>('10:30 AM - 11:00 AM');

  // Step 6 Result
  const [confirmedAppointment, setConfirmedAppointment] = useState<StoredAppointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get active District & Mandal objects
  const activeDistrictObj = TELANGANA_ALL_33_DISTRICTS.find(d => d.name === bookingDistrict) || TELANGANA_ALL_33_DISTRICTS[0];
  const activeMandalObj = activeDistrictObj.mandals.find(m => m.name === bookingMandal) || activeDistrictObj.mandals[0];

  const handleDistrictChange = (dName: string) => {
    setBookingDistrict(dName);
    const dObj = TELANGANA_ALL_33_DISTRICTS.find(d => d.name === dName);
    if (dObj && dObj.mandals.length > 0) {
      const firstM = dObj.mandals[0];
      setBookingMandal(firstM.name);
      if (firstM.villages.length > 0) {
        setBookingVillage(firstM.villages[0].name);
      }
    }
  };

  const handleMandalChange = (mName: string) => {
    setBookingMandal(mName);
    const mObj = activeDistrictObj.mandals.find(m => m.name === mName);
    if (mObj && mObj.villages.length > 0) {
      setBookingVillage(mObj.villages[0].name);
    }
  };

  // Filter hospitals for current district / selection
  const hospitalsInDistrict = VERIFIED_GOVERNMENT_HOSPITALS.filter(h => h.district === bookingDistrict);
  const operationalDemoHospital = VERIFIED_GOVERNMENT_HOSPITALS.find(h => h.isOperationalDemo) || VERIFIED_GOVERNMENT_HOSPITALS[0];

  // Current chosen hospital & department
  const activeHospital = VERIFIED_GOVERNMENT_HOSPITALS.find(h => h.id === selectedHospitalId) || operationalDemoHospital;
  const activeDepartment = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Resolve beneficiary information
  const getSelectedBeneficiary = () => {
    if (selectedBeneficiaryType === 'self') {
      return {
        id: currentUser?.id || patientProfile.id,
        name: currentUser?.name || patientProfile.name,
        relation: 'Self',
        age: currentUser?.age || patientProfile.age
      };
    } else if (selectedBeneficiaryType === 'family') {
      const mem = familyMembers.find(f => f.id === selectedFamilyMemberId) || familyMembers[0];
      return {
        id: mem ? mem.id : 'fam-unknown',
        name: mem ? mem.name : 'Family Member',
        relation: mem ? mem.relation : 'Dependent',
        age: mem ? mem.age : 30
      };
    } else {
      return {
        id: 'new-temp',
        name: newMemName || 'New Member',
        relation: newMemRelation,
        age: parseInt(newMemAge) || 30
      };
    }
  };

  const currentBeneficiary = getSelectedBeneficiary();

  const handleConfirmBooking = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      let finalBeneficiaryId = currentBeneficiary.id;

      // If user added a new family member inline in Step 1, persist them
      if (selectedBeneficiaryType === 'new') {
        const added = addFamilyMember({
          name: newMemName.trim(),
          relation: newMemRelation,
          age: parseInt(newMemAge) || 30,
          gender: newMemGender
        });
        finalBeneficiaryId = added.id;
      }

      const apt = bookAppointment({
        beneficiaryId: finalBeneficiaryId,
        beneficiaryName: currentBeneficiary.name,
        beneficiaryRelation: currentBeneficiary.relation,
        beneficiaryAge: currentBeneficiary.age,
        hospitalId: activeHospital.id,
        hospitalName: activeHospital.name,
        department: activeDepartment.name,
        doctorName: activeDepartment.headDoctor,
        roomNumber: activeDepartment.roomNumber,
        appointmentDate: selectedDate,
        timeSlot: selectedSlot
      });

      setConfirmedAppointment(apt);
      setIsSubmitting(false);
      setCurrentStep(6);
    }, 600);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Top Navigation & Step Indicator */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (currentStep > 1 && currentStep < 6) {
              setCurrentStep(currentStep - 1);
            } else {
              setPatientTab('home');
            }
          }}
          className="flex items-center space-x-1.5 text-navy-600 hover:text-navy-950 text-xs font-semibold p-2 rounded-xl hover:bg-navy-100 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 6 ? 'Return Home' : 'Back'}</span>
        </button>

        <div className="flex items-center space-x-1.5">
          {[1, 2, 3, 4, 5, 6].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentStep === s
                  ? 'w-6 bg-medical-600'
                  : currentStep > s
                  ? 'w-2 bg-medical-300'
                  : 'w-2 bg-navy-200'
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-bold text-navy-400">Step {currentStep} of 6</span>
      </div>

      {/* STEP 1: Select Beneficiary */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">STEP 1 • BENEFICIARY</span>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Who is this OPD Appointment For?</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Select yourself or a saved family member from your account
            </p>
          </div>

          <div className="space-y-3">
            {/* Option A: Myself */}
            <div
              onClick={() => setSelectedBeneficiaryType('self')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedBeneficiaryType === 'self'
                  ? 'border-medical-600 bg-medical-50/80 shadow-soft-sm ring-1 ring-medical-500/20'
                  : 'border-navy-200/80 hover:border-navy-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <div className="w-11 h-11 rounded-2xl bg-medical-100 text-medical-800 font-bold flex items-center justify-center text-lg">
                  👤
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-extrabold text-navy-950 text-sm">{currentUser?.name || patientProfile.name}</h3>
                    <span className="text-[9px] bg-medical-200 text-medical-900 px-2 py-0.5 rounded font-black uppercase">
                      Myself
                    </span>
                  </div>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Age: {currentUser?.age || patientProfile.age} • Phone: {currentUser?.phone || patientProfile.phone}
                  </p>
                </div>
              </div>

              {selectedBeneficiaryType === 'self' ? (
                <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-navy-200 shrink-0" />
              )}
            </div>

            {/* Option B: Saved Family Members */}
            {familyMembers.map((mem) => {
              const isSelected = selectedBeneficiaryType === 'family' && selectedFamilyMemberId === mem.id;
              return (
                <div
                  key={mem.id}
                  onClick={() => {
                    setSelectedBeneficiaryType('family');
                    setSelectedFamilyMemberId(mem.id);
                  }}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-medical-600 bg-medical-50/80 shadow-soft-sm ring-1 ring-medical-500/20'
                      : 'border-navy-200/80 hover:border-navy-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-teal-50 text-teal-800 font-bold flex items-center justify-center text-lg">
                      {mem.relation === 'Father' || mem.relation === 'Grandfather' ? '👴' :
                       mem.relation === 'Mother' || mem.relation === 'Grandmother' ? '👵' :
                       mem.relation === 'Son' || mem.relation === 'Daughter' ? '🧒' : '🧑'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-extrabold text-navy-950 text-sm">{mem.name}</h3>
                        <span className="text-[10px] bg-navy-100 text-navy-800 font-bold px-2 py-0.5 rounded">
                          {mem.relation}
                        </span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">
                        Age: {mem.age} • {mem.notes || 'Dependent Member'}
                      </p>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-navy-200 shrink-0" />
                  )}
                </div>
              );
            })}

            {/* Option C: Add New Family Member Inline */}
            <div
              onClick={() => setSelectedBeneficiaryType('new')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                selectedBeneficiaryType === 'new'
                  ? 'border-medical-600 bg-medical-50/60 shadow-soft-sm ring-1 ring-medical-500/20'
                  : 'border-dashed border-navy-300 bg-white hover:bg-navy-50/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-medical-100 text-medical-700 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-navy-900 text-xs sm:text-sm">+ Add New Family Member Now</h4>
                  <p className="text-[11px] text-navy-500">Will be saved to your family directory automatically</p>
                </div>
              </div>

              {selectedBeneficiaryType === 'new' && (
                <div className="mt-3 pt-3 border-t border-navy-200 space-y-2 text-xs" onClick={e => e.stopPropagation()}>
                  <div>
                    <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. S. Kamala"
                      value={newMemName}
                      onChange={e => setNewMemName(e.target.value)}
                      className="w-full p-2 rounded-xl border border-navy-200 bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Relation</label>
                      <select
                        value={newMemRelation}
                        onChange={e => setNewMemRelation(e.target.value as any)}
                        className="w-full p-2 rounded-xl border border-navy-200 bg-white text-xs"
                      >
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Son">Son</option>
                        <option value="Daughter">Daughter</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Age</label>
                      <input
                        type="number"
                        placeholder="58"
                        value={newMemAge}
                        onChange={e => setNewMemAge(e.target.value)}
                        className="w-full p-2 rounded-xl border border-navy-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-navy-600 uppercase block mb-1">Gender</label>
                      <select
                        value={newMemGender}
                        onChange={e => setNewMemGender(e.target.value)}
                        className="w-full p-2 rounded-xl border border-navy-200 bg-white text-xs"
                      >
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              if (selectedBeneficiaryType === 'new' && (!newMemName.trim() || !newMemAge)) {
                alert('Please enter member name and age.');
                return;
              }
              setCurrentStep(2);
            }}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Proceed to Location & Hospital</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Location & Hospital Selection */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">STEP 2 • HEALTHCARE FACILITY</span>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Select Telangana Hospital</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Choose from all 33 Telangana districts with verified government health centres
            </p>
          </div>

          {/* Cascading Location Selectors */}
          <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm space-y-3">
            <h3 className="font-extrabold text-xs text-navy-700 uppercase tracking-wider">
              1. Choose Administrative Region
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>
                <label className="text-[10px] font-bold text-navy-500 uppercase block mb-1">District (33)</label>
                <select
                  value={bookingDistrict}
                  onChange={e => handleDistrictChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-xs font-semibold focus:ring-1 focus:ring-medical-600"
                >
                  {TELANGANA_ALL_33_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.code})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-navy-500 uppercase block mb-1">Mandal</label>
                <select
                  value={bookingMandal}
                  onChange={e => handleMandalChange(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-xs font-semibold focus:ring-1 focus:ring-medical-600"
                >
                  {activeDistrictObj.mandals.map(m => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-navy-500 uppercase block mb-1">Village / Town</label>
                <select
                  value={bookingVillage}
                  onChange={e => setBookingVillage(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 text-xs font-semibold focus:ring-1 focus:ring-medical-600"
                >
                  {activeMandalObj.villages.map(v => (
                    <option key={v.id} value={v.name}>{v.name} ({v.type})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Hospitals List */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-xs text-navy-700 uppercase tracking-wider px-1">
              2. Available Public Hospitals
            </h3>

            {/* Always feature the Operational Demo Benchmark (TIMS) */}
            <div
              onClick={() => setSelectedHospitalId(operationalDemoHospital.id)}
              className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                selectedHospitalId === operationalDemoHospital.id
                  ? 'border-medical-600 bg-medical-50/80 shadow-soft-md ring-1 ring-medical-500/30'
                  : 'border-navy-200/80 hover:border-navy-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-soft-sm">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                      <h4 className="font-extrabold text-navy-950 text-sm">{operationalDemoHospital.name}</h4>
                      <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-1.5 py-0.2 rounded uppercase">
                        Live Demo Operational Hub
                      </span>
                    </div>
                    <p className="text-xs text-navy-500 mt-1">{operationalDemoHospital.address}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                        {operationalDemoHospital.departments.length} Specialties
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold">
                        Aarogyasri Free OPD
                      </span>
                    </div>
                  </div>
                </div>

                {selectedHospitalId === operationalDemoHospital.id ? (
                  <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-navy-200 shrink-0" />
                )}
              </div>
            </div>

            {/* Other regional directory hospitals */}
            {hospitalsInDistrict.filter(h => h.id !== operationalDemoHospital.id).map(hosp => (
              <div
                key={hosp.id}
                onClick={() => setSelectedHospitalId(hosp.id)}
                className={`p-4 rounded-3xl border transition-all cursor-pointer ${
                  selectedHospitalId === hosp.id
                    ? 'border-medical-600 bg-medical-50/80 shadow-soft-md ring-1 ring-medical-500/30'
                    : 'border-navy-200/80 hover:border-navy-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-navy-100 text-navy-700 flex items-center justify-center font-bold text-sm shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-extrabold text-navy-950 text-sm">{hosp.name}</h4>
                      <p className="text-xs text-navy-500 mt-0.5">{hosp.address}</p>
                      <p className="text-[11px] text-navy-400 mt-1">Helpline: {hosp.helpline}</p>
                    </div>
                  </div>

                  {selectedHospitalId === hosp.id ? (
                    <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-navy-200 shrink-0" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentStep(3)}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Proceed to Clinical Department</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: Department Selection */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">STEP 3 • SPECIALTY</span>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Select Clinical Department</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Target Hospital: <strong className="text-navy-900">{activeHospital.name.split('(')[0]}</strong>
            </p>
          </div>

          <div className="space-y-2.5">
            {departments.map((dept) => {
              const isSelected = selectedDeptId === dept.id;
              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-medical-600 bg-medical-50/80 shadow-soft-md ring-1 ring-medical-500/30'
                      : 'border-navy-200/80 hover:border-navy-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm ${
                      isSelected ? 'bg-medical-600 text-white shadow-soft-sm' : 'bg-navy-100 text-navy-700'
                    }`}>
                      {dept.shortCode}
                    </div>
                    <div>
                      <h3 className="font-bold text-navy-950 text-sm">{dept.name}</h3>
                      <p className="text-xs text-navy-500 mt-0.5">{dept.headDoctor} • {dept.roomNumber}</p>
                      <div className="flex items-center space-x-2 mt-1.5">
                        <span className="text-[10px] bg-navy-100 text-navy-700 font-semibold px-2 py-0.5 rounded-full">
                          {dept.activeDoctors} Doctors on Shift
                        </span>
                        <span className="text-[10px] text-medical-700 font-bold">
                          Est. wait ~{dept.avgWaitMins}m
                        </span>
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-navy-200 shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentStep(4)}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Proceed to Date & Slot</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 4: Date & Slot Selection */}
      {currentStep === 4 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">STEP 4 • TIMING</span>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Select Date & Consultation Window</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Consultant: <strong>{activeDepartment.headDoctor}</strong> ({activeDepartment.roomNumber})
            </p>
          </div>

          {/* Date Selector Chips */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              Choose Consultation Date
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { date: todayStr, label: 'Today', sub: 'Immediate' },
                { date: tomorrowStr, label: 'Tomorrow', sub: 'Next Day' },
                { date: dayAfterStr, label: 'Day After', sub: 'Advance' }
              ].map(d => (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    selectedDate === d.date
                      ? 'border-medical-600 bg-medical-50/80 font-bold text-medical-950 shadow-soft-sm ring-1 ring-medical-500/20'
                      : 'border-navy-200/80 bg-white hover:bg-navy-50 text-navy-700'
                  }`}
                >
                  <Calendar className="w-4 h-4 mx-auto mb-1 text-medical-600" />
                  <div className="text-xs font-bold">{d.label}</div>
                  <div className="text-[10px] text-navy-400 mt-0.5">{d.date}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Slots */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              Available Consultation Windows
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                '09:30 AM - 10:00 AM',
                '10:30 AM - 11:00 AM',
                '11:30 AM - 12:00 PM',
                '02:00 PM - 02:30 PM',
                '02:30 PM - 03:00 PM',
                '03:30 PM - 04:00 PM'
              ].map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    selectedSlot === slot
                      ? 'border-medical-600 bg-medical-50/80 font-bold text-medical-950 shadow-soft-sm ring-1 ring-medical-500/20'
                      : 'border-navy-200/80 bg-white hover:bg-navy-50 text-navy-800'
                  }`}
                >
                  <div className="flex items-center space-x-1.5 text-xs">
                    <Clock className="w-3.5 h-3.5 text-medical-600" />
                    <span>{slot}</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-1">
                    ✓ Available Window
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentStep(5)}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Review Appointment Summary</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 5: Review Booking */}
      {currentStep === 5 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">STEP 5 • VERIFICATION</span>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Review Appointment Details</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Please verify beneficiary and clinical information before generating digital pass
            </p>
          </div>

          <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3.5">
            <div className="flex items-center justify-between pb-3 border-b border-navy-100">
              <div>
                <span className="text-[10px] text-navy-400 uppercase font-bold block">Patient Beneficiary</span>
                <h3 className="font-extrabold text-navy-950 text-base">{currentBeneficiary.name}</h3>
                <span className="text-xs text-medical-700 font-semibold">
                  Relation: {currentBeneficiary.relation} • Age: {currentBeneficiary.age} Yrs
                </span>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs text-medical-700 font-bold hover:underline"
              >
                Change
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-navy-400 text-[10px] uppercase font-bold block">Hospital</span>
                <span className="font-bold text-navy-900 block mt-0.5">{activeHospital.name.split('(')[0]}</span>
                <span className="text-[11px] text-navy-500">{bookingDistrict}, {bookingMandal}</span>
              </div>
              <div>
                <span className="text-navy-400 text-[10px] uppercase font-bold block">Specialty</span>
                <span className="font-bold text-navy-900 block mt-0.5">{activeDepartment.name}</span>
                <span className="text-[11px] text-navy-500">{activeDepartment.roomNumber}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-navy-100">
              <div>
                <span className="text-navy-400 text-[10px] uppercase font-bold block">Date</span>
                <span className="font-bold text-navy-900 block mt-0.5">{selectedDate}</span>
              </div>
              <div>
                <span className="text-navy-400 text-[10px] uppercase font-bold block">Window</span>
                <span className="font-bold text-medical-700 block mt-0.5">{selectedSlot}</span>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between text-xs text-emerald-950">
              <span>Government Consultation Fee:</span>
              <strong className="text-emerald-700 text-sm">₹0 (Free Govt OPD / Aarogyasri)</strong>
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-black py-3.5 px-4 rounded-2xl text-sm transition-all shadow-soft-md flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Registering Digital Token & Pass...</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5" />
                <span>Confirm Booking & Generate OPD Pass</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 6: Booking Success & Digital OPD Pass */}
      {currentStep === 6 && confirmedAppointment && (
        <div className="space-y-4 animate-in zoom-in-95 duration-300">
          <div className="text-center py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Appointment Confirmed!</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Digital OPD token generated and saved under your account
            </p>
          </div>

          {/* DIGITAL OPD PASS */}
          <div className="bg-white border-2 border-medical-500/40 rounded-3xl p-5 shadow-soft-xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-medical-700 to-teal-800 text-white p-3.5 -mx-5 -mt-5 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-200">
                  DIGITAL OPD PASS • TELANGANA HEALTH
                </span>
                <h3 className="font-extrabold text-sm text-white">{confirmedAppointment.hospitalName.split('(')[0]}</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {confirmedAppointment.appointmentCode}
              </span>
            </div>

            <div className="text-center py-2">
              <span className="text-xs text-navy-500 font-semibold uppercase tracking-wider">Assigned Queue Token</span>
              <div className="text-4xl font-black text-medical-700 tracking-tight my-1">
                {confirmedAppointment.tokenNumber}
              </div>
              <div className="inline-block bg-teal-50 border border-teal-200 text-teal-800 text-xs px-3 py-1 rounded-full font-bold">
                {confirmedAppointment.department} • {confirmedAppointment.roomNumber}
              </div>
            </div>

            {/* QR Simulation */}
            <div className="my-3 p-4 bg-navy-50 rounded-2xl flex flex-col items-center justify-center border border-dashed border-navy-200">
              <div className="w-28 h-28 bg-white p-2 rounded-xl shadow-xs border border-navy-200 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full text-navy-900">
                  <rect x="0" y="0" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="5" y="5" width="20" height="20" fill="white" rx="1" />
                  <rect x="10" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="70" y="0" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="75" y="5" width="20" height="20" fill="white" rx="1" />
                  <rect x="80" y="10" width="10" height="10" fill="currentColor" />

                  <rect x="0" y="70" width="30" height="30" fill="currentColor" rx="2" />
                  <rect x="5" y="75" width="20" height="20" fill="white" rx="1" />
                  <rect x="10" y="80" width="10" height="10" fill="currentColor" />

                  <rect x="40" y="15" width="10" height="10" fill="currentColor" />
                  <rect x="55" y="25" width="10" height="10" fill="currentColor" />
                  <rect x="35" y="45" width="25" height="10" fill="currentColor" />
                  <rect x="70" y="45" width="15" height="15" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] text-navy-500 font-medium mt-1.5">
                Scan at Hospital Reception / Triage Kiosk
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-navy-50 p-2 rounded-xl">
                <span className="text-navy-400 text-[10px] block uppercase font-bold">Beneficiary</span>
                <strong className="text-navy-900">{confirmedAppointment.beneficiaryName} ({confirmedAppointment.beneficiaryRelation})</strong>
              </div>
              <div className="bg-navy-50 p-2 rounded-xl">
                <span className="text-navy-400 text-[10px] block uppercase font-bold">Slot</span>
                <strong className="text-medical-700">{confirmedAppointment.timeSlot.split(' - ')[0]}</strong>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setPatientTab('tokens')}
              className="w-full bg-medical-600 hover:bg-medical-700 text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center space-x-1.5 shadow-soft-sm active:scale-[0.98] transition-all"
            >
              <span>Track Live Queue & Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPatientTab('appointments')}
              className="w-full bg-white hover:bg-navy-50 border border-navy-200 text-navy-800 font-semibold py-2.5 rounded-2xl text-xs transition-colors"
            >
              View in My Appointments
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
