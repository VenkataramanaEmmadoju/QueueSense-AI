import React, { useState } from 'react';
import { 
  UserPlus, 
  Stethoscope, 
  Heart, 
  Thermometer, 
  Activity, 
  CheckCircle2, 
  QrCode, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PatientRegistrationDesk: React.FC = () => {
  const { departments, bookOPDToken, addTriageVitals, addToast } = useApp();

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('+91 ');
  const [selectedDeptName, setSelectedDeptName] = useState(departments[0].name);
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState('76');
  const [spo2, setSpo2] = useState('98');
  const [temp, setTemp] = useState('98.6');
  const [esiScore, setEsiScore] = useState<number>(3);
  const [generatedPass, setGeneratedPass] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !age) return;

    const deptObj = departments.find(d => d.name === selectedDeptName) || departments[0];

    const token = bookOPDToken({
      department: deptObj.name,
      doctorName: deptObj.headDoctor,
      slotTime: 'Walk-in / Immediate Triage',
      roomNumber: deptObj.roomNumber,
      isCaregiverBooking: false,
      bookedForName: name.trim()
    });

    // Record vitals and ESI score
    addTriageVitals(token.id, {
      bp,
      pulse: parseInt(pulse) || 75,
      spo2: parseInt(spo2) || 98,
      temp: parseFloat(temp) || 98.4
    }, esiScore);

    setGeneratedPass(token);
    addToast('Walk-in Token Issued', `Token #${token.tokenNumber} created for ${name}`, 'token');

    // Reset fields
    setName('');
    setAge('');
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div>
        <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">TRIAGE & ADMISSIONS DESK</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">Walk-In Patient Registration & Vitals</h2>
      </div>

      {generatedPass && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-3xl p-5 text-emerald-950 flex items-start justify-between shadow-soft-sm animate-in zoom-in-95">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black text-emerald-800">{generatedPass.tokenNumber}</span>
                <span className="text-xs bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full">
                  Assigned: {generatedPass.department}
                </span>
              </div>
              <p className="text-xs text-emerald-900 mt-1">
                Triage vitals recorded. Patient queued for {generatedPass.roomNumber}.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setGeneratedPass(null)} 
            className="text-emerald-700 font-bold hover:text-emerald-900 text-xs"
          >
            ✕ Close
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-navy-200/80 rounded-3xl p-5 sm:p-6 shadow-soft-sm space-y-4">
        <h3 className="font-extrabold text-navy-900 text-base">Patient Demographics</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">Patient Full Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Ramesh Chandra"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="+91 98490 00000"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">Age</label>
              <input
                type="number"
                required
                placeholder="42"
                value={age}
                onChange={e => setAge(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">Gender</label>
              <select
                value={gender}
                onChange={e => setGender(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">Clinical Department</label>
            <select
              value={selectedDeptName}
              onChange={e => setSelectedDeptName(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600 font-medium"
            >
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name} ({d.roomNumber})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Nursing Triage Vitals */}
        <div className="pt-3 border-t border-navy-100">
          <div className="flex items-center space-x-2 mb-3">
            <Stethoscope className="w-4 h-4 text-medical-600" />
            <h4 className="text-xs font-bold text-navy-900 uppercase tracking-wider">Nursing Triage Vitals (On Arrival)</h4>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div>
              <label className="text-[10px] text-navy-500 font-semibold block mb-1">BP (mmHg)</label>
              <input
                type="text"
                value={bp}
                onChange={e => setBp(e.target.value)}
                className="w-full p-2 rounded-xl border border-navy-200 bg-navy-50/50 text-center font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-navy-500 font-semibold block mb-1">Pulse (bpm)</label>
              <input
                type="number"
                value={pulse}
                onChange={e => setPulse(e.target.value)}
                className="w-full p-2 rounded-xl border border-navy-200 bg-navy-50/50 text-center font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-navy-500 font-semibold block mb-1">SpO2 (%)</label>
              <input
                type="number"
                value={spo2}
                onChange={e => setSpo2(e.target.value)}
                className="w-full p-2 rounded-xl border border-navy-200 bg-navy-50/50 text-center font-bold text-medical-700"
              />
            </div>
            <div>
              <label className="text-[10px] text-navy-500 font-semibold block mb-1">Temp (°F)</label>
              <input
                type="text"
                value={temp}
                onChange={e => setTemp(e.target.value)}
                className="w-full p-2 rounded-xl border border-navy-200 bg-navy-50/50 text-center font-bold"
              />
            </div>
          </div>
        </div>

        {/* ESI Triage Score */}
        <div className="pt-2">
          <label className="text-[11px] font-bold text-navy-600 uppercase tracking-wider block mb-1">
            Emergency Severity Index (ESI Triage Category)
          </label>
          <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
            {[
              { score: 1, label: 'ESI-1 Resuscitation', color: 'bg-rose-100 text-rose-800 border-rose-300' },
              { score: 2, label: 'ESI-2 Emergent', color: 'bg-orange-100 text-orange-800 border-orange-300' },
              { score: 3, label: 'ESI-3 Urgent', color: 'bg-amber-100 text-amber-800 border-amber-300' },
              { score: 4, label: 'ESI-4 Less Urgent', color: 'bg-blue-100 text-blue-800 border-blue-300' },
              { score: 5, label: 'ESI-5 Routine', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
            ].map(item => (
              <button
                key={item.score}
                type="button"
                onClick={() => setEsiScore(item.score)}
                className={`p-2 rounded-xl border text-[11px] font-bold transition-all ${
                  esiScore === item.score
                    ? 'ring-2 ring-navy-900 shadow-sm ' + item.color
                    : 'bg-navy-50 border-navy-200 text-navy-600 hover:bg-navy-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-2xl text-xs transition-all shadow-soft-sm flex items-center justify-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register Walk-in Patient & Issue OPD Token</span>
        </button>
      </form>
    </div>
  );
};
