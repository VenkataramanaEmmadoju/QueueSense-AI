import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Check, 
  Calendar, 
  Clock, 
  User, 
  Users, 
  Sparkles, 
  QrCode, 
  CheckCircle2, 
  Building2, 
  Stethoscope, 
  Share2, 
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { DepartmentInfo } from '../../types';

export const OPDTokenBookingFlow: React.FC = () => {
  const { 
    departments, 
    selectedHospital, 
    patientProfile, 
    activePatientIdentity, 
    bookOPDToken, 
    setPatientTab 
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedDept, setSelectedDept] = useState<DepartmentInfo>(departments[0]);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>('11:00 AM - 11:30 AM');
  const [bookingFor, setBookingFor] = useState<'self' | string>('self');
  const [confirmedToken, setConfirmedToken] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Time slots for demo
  const sampleSlots = [
    { time: '10:30 AM - 11:00 AM', status: 'available', waitMins: selectedDept.avgWaitMins },
    { time: '11:00 AM - 11:30 AM', status: 'available', waitMins: selectedDept.avgWaitMins + 5 },
    { time: '11:30 AM - 12:00 PM', status: 'available', waitMins: selectedDept.avgWaitMins + 10 },
    { time: '12:00 PM - 12:30 PM', status: 'filling_fast', waitMins: selectedDept.avgWaitMins + 15 },
    { time: '02:00 PM - 02:30 PM', status: 'available', waitMins: 10 },
    { time: '02:30 PM - 03:00 PM', status: 'available', waitMins: 15 }
  ];

  const handleConfirmBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const isCaregiver = bookingFor !== 'self';
      const bookedForName = isCaregiver ? bookingFor : patientProfile.name;

      const token = bookOPDToken({
        department: selectedDept.name,
        doctorName: selectedDept.headDoctor,
        slotTime: selectedSlotTime,
        roomNumber: selectedDept.roomNumber,
        isCaregiverBooking: isCaregiver,
        bookedForName: bookedForName
      });

      setConfirmedToken(token);
      setIsSubmitting(false);
      setCurrentStep(4);
    }, 600);
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Top Navigation & Step Indicator */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => {
            if (currentStep > 1 && currentStep < 4) {
              setCurrentStep(currentStep - 1);
            } else {
              setPatientTab('home');
            }
          }}
          className="flex items-center space-x-1.5 text-navy-600 hover:text-navy-950 text-xs font-semibold p-2 rounded-xl hover:bg-navy-100 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentStep === 4 ? 'Back to Home' : 'Back'}</span>
        </button>

        <div className="flex items-center space-x-2">
          {[1, 2, 3, 4].map((step) => (
            <div
              key={step}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentStep === step
                  ? 'w-7 bg-medical-600'
                  : currentStep > step
                  ? 'w-2 bg-medical-300'
                  : 'w-2 bg-navy-200'
              }`}
            />
          ))}
        </div>

        <span className="text-xs font-bold text-navy-400">Step {currentStep} of 4</span>
      </div>

      {/* STEP 1: Department Selection */}
      {currentStep === 1 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Select Clinical Department</h2>
            <p className="text-xs text-navy-500 mt-1">
              Choose the specialty at <span className="font-semibold text-medical-700">{selectedHospital.name.split('(')[0]}</span>
            </p>
          </div>

          <div className="space-y-2.5">
            {departments.map((dept) => {
              const isSelected = selectedDept.id === dept.id;
              return (
                <div
                  key={dept.id}
                  onClick={() => setSelectedDept(dept)}
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
                          {dept.activeDoctors} Doctors Active
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
            onClick={() => setCurrentStep(2)}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Proceed to Doctor & Slots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 2: Doctor & Time Slot Selection */}
      {currentStep === 2 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Select Slot & Doctor</h2>
            <p className="text-xs text-navy-500 mt-1">
              Department: <strong className="text-navy-800">{selectedDept.name}</strong>
            </p>
          </div>

          {/* Assigned Doctor Card */}
          <div className="bg-white border border-navy-200/80 rounded-3xl p-4 flex items-center space-x-3.5 shadow-soft-sm">
            <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl shrink-0">
              👨‍⚕️
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-[10px] bg-teal-50 text-teal-700 border border-teal-200 font-bold px-2 py-0.2 rounded-md uppercase">
                Duty Consultant
              </span>
              <h3 className="font-extrabold text-navy-950 text-sm mt-0.5 truncate">{selectedDept.headDoctor}</h3>
              <p className="text-xs text-navy-500">{selectedDept.roomNumber} • OPD In-Session</p>
            </div>
          </div>

          {/* Available Slots Grid */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              Today's Available OPD Consultation Slots
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {sampleSlots.map((slot) => {
                const isSelected = selectedSlotTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() => setSelectedSlotTime(slot.time)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'border-medical-600 bg-medical-50/80 text-medical-950 font-bold shadow-soft-sm ring-1 ring-medical-500/20'
                        : 'border-navy-200/80 hover:border-navy-300 bg-white text-navy-800'
                    }`}
                  >
                    <div className="flex items-center space-x-1.5 text-xs">
                      <Clock className="w-3.5 h-3.5 text-medical-600" />
                      <span className="font-semibold">{slot.time.split(' - ')[0]}</span>
                    </div>
                    <div className="text-[10px] text-navy-500 mt-1">
                      Throughput wait: ~{slot.waitMins}m
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* AI Wait Inference Note */}
          <div className="bg-teal-50/60 border border-teal-200/60 rounded-2xl p-3 flex items-start space-x-2.5 text-xs text-teal-900">
            <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Simulated AI Queue Forecast:</strong> Patient arrival velocity is regular. Booking <strong>{selectedSlotTime}</strong> gives an estimated consultation wait of ~{selectedDept.avgWaitMins} minutes.
            </p>
          </div>

          <button
            onClick={() => setCurrentStep(3)}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <span>Proceed to Patient Selection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* STEP 3: Patient & Caregiver Selection */}
      {currentStep === 3 && (
        <div className="space-y-4 animate-in fade-in duration-200">
          <div>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Who is this Token For?</h2>
            <p className="text-xs text-navy-500 mt-1">
              Select primary patient or family member to attach ABHA & UHID records
            </p>
          </div>

          <div className="space-y-3">
            {/* Option 1: Self */}
            <div
              onClick={() => setBookingFor('self')}
              className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                bookingFor === 'self'
                  ? 'border-medical-600 bg-medical-50/80 shadow-soft-sm ring-1 ring-medical-500/20'
                  : 'border-navy-200/80 hover:border-navy-300 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-medical-100 text-medical-800 font-bold flex items-center justify-center">
                  👤
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="font-bold text-navy-950 text-sm">{patientProfile.name}</h3>
                    <span className="text-[10px] bg-medical-200 text-medical-900 px-1.5 py-0.2 rounded font-semibold uppercase">Self</span>
                  </div>
                  <p className="text-xs text-navy-500 mt-0.5">
                    Age: {patientProfile.age} • Phone: {patientProfile.phone}
                  </p>
                  <p className="text-[11px] text-medical-700 font-medium">ABHA: {patientProfile.abhaId}</p>
                </div>
              </div>
              {bookingFor === 'self' && (
                <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </div>

            {/* Option 2+: Family Members */}
            {patientProfile.caregivers.map((cg) => {
              const isSelected = bookingFor === cg.name;
              return (
                <div
                  key={cg.id}
                  onClick={() => setBookingFor(cg.name)}
                  className={`p-4 rounded-3xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-medical-600 bg-medical-50/80 shadow-soft-sm ring-1 ring-medical-500/20'
                      : 'border-navy-200/80 hover:border-navy-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-2xl bg-navy-100 text-navy-700 font-bold flex items-center justify-center text-lg">
                      {cg.relationship === 'Father' || cg.relationship === 'Mother' ? '👴' : '👧'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="font-bold text-navy-950 text-sm">{cg.name}</h3>
                        <span className="text-[10px] bg-navy-200 text-navy-800 px-1.5 py-0.2 rounded font-semibold">
                          {cg.relationship}
                        </span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">
                        Age: {cg.age} • {cg.conditionNotes || 'Family Member'}
                      </p>
                      <p className="text-[11px] text-medical-700 font-medium">ABHA: {cg.abhaId}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Booking Summary Box */}
          <div className="bg-navy-50 border border-navy-200/70 rounded-2xl p-4 text-xs space-y-2 text-navy-700">
            <h4 className="font-bold text-navy-900 uppercase tracking-wider text-[11px]">Appointment Summary</h4>
            <div className="flex justify-between">
              <span className="text-navy-500">Hospital:</span>
              <span className="font-semibold">{selectedHospital.name.split('(')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Department:</span>
              <span className="font-semibold">{selectedDept.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Slot & Room:</span>
              <span className="font-semibold">{selectedSlotTime} ({selectedDept.roomNumber})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-navy-500">Consultation Fee:</span>
              <span className="font-bold text-emerald-700">₹0 (Free Aarogyasri / Govt OPD)</span>
            </div>
          </div>

          <button
            onClick={handleConfirmBooking}
            disabled={isSubmitting}
            className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-sm transition-all shadow-soft-md flex items-center justify-center space-x-2"
          >
            {isSubmitting ? (
              <span>Generating Secure Digital Token...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Confirm & Generate Digital Token</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* STEP 4: Token Confirmation & Digital Pass */}
      {currentStep === 4 && confirmedToken && (
        <div className="space-y-4 animate-in zoom-in-95 duration-300">
          <div className="text-center py-2">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2 ring-8 ring-emerald-50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-navy-900 tracking-tight">Token Confirmed & Active!</h2>
            <p className="text-xs text-navy-500 mt-0.5">
              Your OPD Queue Token has been registered in the Hospital OPD system
            </p>
          </div>

          {/* DIGITAL TICKET / SMART PASS */}
          <div className="bg-white border-2 border-medical-500/40 rounded-3xl p-5 shadow-soft-xl relative overflow-hidden">
            <div className="bg-gradient-to-r from-medical-600 to-teal-700 text-white p-3.5 -mx-5 -mt-5 mb-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-teal-200">OPD SMART PASS</span>
                <h3 className="font-extrabold text-sm text-white">{confirmedToken.hospitalName.split('(')[0]}</h3>
              </div>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full font-bold">
                {confirmedToken.slotTime.split(' - ')[0]}
              </span>
            </div>

            {/* Main Token Large Display */}
            <div className="text-center py-2">
              <span className="text-xs text-navy-500 font-semibold uppercase tracking-wider">Your Assigned Token</span>
              <div className="text-4xl font-black text-navy-950 tracking-tight my-1 text-medical-700">
                {confirmedToken.tokenNumber}
              </div>
              <div className="inline-block bg-teal-50 border border-teal-200 text-teal-800 text-xs px-3 py-1 rounded-full font-bold">
                {confirmedToken.department} • {confirmedToken.roomNumber}
              </div>
            </div>

            {/* QR Code Simulation */}
            <div className="my-4 p-4 bg-navy-50 rounded-2xl flex flex-col items-center justify-center border border-dashed border-navy-200">
              <div className="w-32 h-32 bg-white p-2 rounded-xl shadow-xs border border-navy-200 flex items-center justify-center relative">
                {/* SVG QR Code Pattern */}
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

                  {/* Random QR clusters */}
                  <rect x="40" y="15" width="10" height="10" fill="currentColor" />
                  <rect x="55" y="25" width="10" height="10" fill="currentColor" />
                  <rect x="35" y="45" width="25" height="10" fill="currentColor" />
                  <rect x="70" y="45" width="15" height="15" fill="currentColor" />
                  <rect x="45" y="75" width="15" height="15" fill="currentColor" />
                  <rect x="75" y="80" width="15" height="15" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[10px] text-navy-500 font-medium mt-2">
                Scan at Hospital Reception / Triage Kiosk
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="bg-navy-50 p-2.5 rounded-xl">
                <span className="text-navy-500 block text-[10px] uppercase font-semibold">Patients Ahead</span>
                <span className="text-base font-bold text-navy-900">{confirmedToken.peopleAhead}</span>
              </div>
              <div className="bg-navy-50 p-2.5 rounded-xl">
                <span className="text-navy-500 block text-[10px] uppercase font-semibold">Est. Consult Time</span>
                <span className="text-base font-bold text-medical-700">{confirmedToken.estimatedConsultTime}</span>
              </div>
            </div>

            {/* AI queue note */}
            <div className="mt-3 bg-medical-50/70 border border-medical-200/60 rounded-xl p-2.5 flex items-start space-x-2 text-[11px] text-medical-900">
              <Sparkles className="w-3.5 h-3.5 text-medical-600 shrink-0 mt-0.5" />
              <p>{confirmedToken.aiAdvice}</p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-2">
            <button
              onClick={() => setPatientTab('tokens')}
              className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 rounded-2xl text-xs flex items-center justify-center space-x-1.5 transition-all shadow-soft-sm"
            >
              <span>Track Live Queue & Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setPatientTab('home')}
              className="w-full bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold py-2.5 rounded-2xl text-xs transition-colors"
            >
              Return to Home Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
