import React, { useState } from 'react';
import { 
  Activity, 
  Lock, 
  User, 
  ShieldCheck, 
  PhoneCall, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle,
  Stethoscope,
  Building2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { DEMO_CREDENTIALS } from '../../services/authService';
import { DEMO_STAFF_USERS } from '../../data/syntheticData';
import { BrandLogo } from '../common/BrandLogo';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

type SelectedRole = 'patient' | 'doctor' | 'staff';

export const AuthPortal: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { loginPatient, registerPatient, loginDoctor, loginStaff } = useApp();

  const [role, setRole] = useState<SelectedRole>('patient');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Input states initialized with Patient default demo credentials
  const [identifier, setIdentifier] = useState(DEMO_CREDENTIALS.PATIENT.email);
  const [password, setPassword] = useState(DEMO_CREDENTIALS.PATIENT.password);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Staff Subrole selection for evaluator testing
  const [selectedStaffSubrole, setSelectedStaffSubrole] = useState('staff@queuesense.demo');

  // Signup form state for patients
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [signupPassword, setSignupPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Forgot password modal
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Emergency 112 Modal
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  // Handle Role selection & auto-prefill
  const handleRoleChange = (newRole: SelectedRole) => {
    setRole(newRole);
    setAuthMode('login');
    setError('');

    if (newRole === 'patient') {
      setIdentifier(DEMO_CREDENTIALS.PATIENT.email);
      setPassword(DEMO_CREDENTIALS.PATIENT.password);
    } else if (newRole === 'doctor') {
      setIdentifier(DEMO_CREDENTIALS.DOCTOR.email);
      setPassword(DEMO_CREDENTIALS.DOCTOR.password);
    } else if (newRole === 'staff') {
      setIdentifier(selectedStaffSubrole);
      setPassword(DEMO_CREDENTIALS.STAFF.password);
    }
  };

  // Handle Staff Subrole change
  const handleStaffSubroleChange = (emailVal: string) => {
    setSelectedStaffSubrole(emailVal);
    setIdentifier(emailVal);
    setPassword(DEMO_CREDENTIALS.STAFF.password);
    setError('');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (role === 'patient') {
        const res = loginPatient(identifier, password);
        if (!res.success) {
          setError(res.error || 'Authentication failed. Please check credentials.');
        }
      } else if (role === 'doctor') {
        const res = loginDoctor(identifier, password);
        if (!res.success) {
          setError(res.error || 'Doctor authentication failed. Please check Doctor ID / Password.');
        }
      } else if (role === 'staff') {
        const res = loginStaff(identifier, password);
        if (!res.success) {
          setError(res.error || 'Staff authentication failed. Please check Staff ID / Password.');
        }
      }
      setLoading(false);
    }, 350);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (signupPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const res = registerPatient({
        fullName,
        mobile,
        email: email || undefined,
        age: parseInt(age) || 28,
        gender,
        password: signupPassword
      });

      if (!res.success) {
        setError(res.error || 'Registration failed.');
      }
      setLoading(false);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-navy-50 flex flex-col justify-between p-3.5 sm:p-6 selection:bg-medical-100 selection:text-medical-800">
      {/* Top Bar: Emergency 112 Banner & Language */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between mb-3 pt-1">
        {/* Unauthenticated Emergency shortcut */}
        <button
          type="button"
          onClick={() => setShowEmergencyModal(true)}
          className="bg-rose-50 hover:bg-rose-100 active:scale-95 text-rose-700 border border-rose-200/80 px-3 py-1.5 rounded-full text-xs font-bold flex items-center space-x-1.5 transition-all shadow-soft-xs"
        >
          <PhoneCall className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
          <span>{t('app.emergency_112')}</span>
        </button>

        {/* Centralized Language selector */}
        <LanguageSwitcher />
      </header>

      {/* Main Unified Login Card */}
      <div className="max-w-md w-full mx-auto bg-white border border-navy-200/80 rounded-3xl shadow-soft-xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header Hero */}
        <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-medical-950 text-white p-6 sm:p-7 text-center relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-32 h-32 bg-medical-500/10 rounded-full blur-2xl pointer-events-none" />
          
          {/* Official QueueSense AI Brand Logo */}
          <div className="flex flex-col items-center justify-center mb-1">
            <BrandLogo 
              variant="full" 
              theme="dark" 
              size="lg" 
              showTagline={true} 
              badgeText="PWA"
              className="flex-col !space-x-0 space-y-2 text-center" 
            />
            <p className="text-[11px] text-teal-200/80 mt-1">
              Telangana Public Health System • Unified Access Portal
            </p>
          </div>

          {/* THREE-ROLE SEGMENTED SELECTOR */}
          <div className="mt-4 p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 text-xs font-bold grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => handleRoleChange('patient')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                role === 'patient'
                  ? 'bg-white text-navy-950 shadow-soft-sm font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Patient</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('doctor')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                role === 'doctor'
                  ? 'bg-teal-400 text-navy-950 shadow-soft-sm font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('staff')}
              className={`py-2 rounded-xl transition-all flex items-center justify-center space-x-1.5 ${
                role === 'staff'
                  ? 'bg-teal-400 text-navy-950 shadow-soft-sm font-black'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Staff</span>
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {/* Unobtrusive Demo Mode Notice */}
          <div className="bg-teal-50/70 border border-teal-200/60 rounded-2xl p-2.5 flex items-center justify-between text-[11px] text-teal-900">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span className="font-bold">Demo Mode:</span>
              <span className="text-teal-800">
                {role === 'patient' ? 'Patient prefilled' : role === 'doctor' ? 'Dr. Arvind Rao prefilled' : 'Staff credentials prefilled'}
              </span>
            </div>
            <span className="text-[10px] bg-teal-200/60 text-teal-950 font-bold px-1.5 py-0.5 rounded">
              Prototype
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-rose-50 border border-rose-200/80 rounded-2xl p-3 flex items-start space-x-2 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* FOR PATIENT: SIGN IN / SIGN UP TABS */}
          {role === 'patient' && (
            <div className="flex border-b border-navy-100 pb-2 text-xs font-bold text-navy-500 space-x-4">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); setError(''); }}
                className={`pb-1 transition-all ${authMode === 'login' ? 'text-medical-700 border-b-2 border-medical-600 font-black' : 'hover:text-navy-800'}`}
              >
                {t('auth.sign_in')}
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); setError(''); }}
                className={`pb-1 transition-all ${authMode === 'signup' ? 'text-medical-700 border-b-2 border-medical-600 font-black' : 'hover:text-navy-800'}`}
              >
                {t('auth.switch_patient_signup')}
              </button>
            </div>
          )}

          {/* STAFF SUBROLE SELECTOR (For Evaluator Testing Only) */}
          {role === 'staff' && (
            <div className="bg-navy-50 p-3 rounded-2xl border border-navy-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider">
                  {t('auth.choose_staff_role')}
                </label>
                <span className="text-[10px] text-teal-700 font-semibold">Demo Role</span>
              </div>
              <select
                value={selectedStaffSubrole}
                onChange={(e) => handleStaffSubroleChange(e.target.value)}
                className="w-full text-xs font-semibold p-2.5 rounded-xl border border-navy-200 bg-white text-navy-900 focus:outline-none focus:ring-1 focus:ring-medical-600"
              >
                {DEMO_STAFF_USERS.map((u) => (
                  <option key={u.id} value={u.email}>
                    {u.avatar} {u.name} — {u.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* DOCTOR ROLE PREVIEW INFO */}
          {role === 'doctor' && (
            <div className="bg-medical-50/70 p-3 rounded-2xl border border-medical-200/70 flex items-center space-x-3">
              <span className="text-2xl">👨‍⚕️</span>
              <div>
                <h4 className="font-bold text-navy-950 text-xs">Dr. Arvind Rao, MD, DM</h4>
                <p className="text-[11px] text-medical-800 font-medium">Cardiology OPD Room 104 • TIMS Gachibowli</p>
                <p className="text-[10px] text-navy-500 font-mono">Reg: TS-MCI-2014-9981</p>
              </div>
            </div>
          )}

          {/* LOGIN FORM (Shown for all roles in login mode) */}
          {authMode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  {role === 'patient' ? t('auth.email_or_mobile') : role === 'doctor' ? t('auth.official_doctor_id') : t('auth.official_staff_id')}
                </label>
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={role === 'patient' ? t('auth.email_or_mobile_placeholder') : role === 'doctor' ? t('auth.doctor_id_placeholder') : t('auth.staff_id_placeholder')}
                  required
                  className="w-full text-xs p-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50 text-navy-900 font-medium transition-all"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-navy-700 uppercase tracking-wider">
                    {t('auth.password')}
                  </label>
                  {role === 'patient' && (
                    <button
                      type="button"
                      onClick={() => { setShowForgotPassword(true); setForgotSent(false); }}
                      className="text-[11px] text-medical-700 hover:text-medical-800 font-semibold"
                    >
                      {t('auth.forgot_password')}
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full text-xs p-3 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50 text-navy-900 font-medium pr-10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-navy-400 hover:text-navy-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* SINGLE PRIMARY SIGN IN BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50 mt-4"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {role === 'patient' ? t('auth.sign_in_as_patient') : role === 'doctor' ? t('auth.sign_in_as_doctor') : t('auth.sign_in_as_staff')}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* PATIENT SIGNUP FORM */
            <form onSubmit={handleSignupSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  {t('auth.full_name')} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={t('auth.full_name_placeholder')}
                  required
                  className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    {t('auth.mobile_phone')} *
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder={t('auth.mobile_placeholder')}
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    {t('auth.age')}
                  </label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={t('auth.age_placeholder')}
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  {t('auth.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.email_placeholder')}
                  className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    {t('auth.create_password')} *
                  </label>
                  <input
                    type="password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    {t('auth.confirm_password')} *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-navy-50/50"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-medical-600 hover:bg-medical-700 active:scale-[0.98] text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-soft-sm disabled:opacity-50 mt-3"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{t('auth.create_free_account')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Prototype Security Disclaimer */}
          <div className="pt-2 border-t border-navy-100 text-center">
            <p className="text-[10px] text-navy-400">
              Prototype Evaluation Only • In production, credentials use Supabase Auth and server-side role validation.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="max-w-xl mx-auto w-full text-center text-[11px] text-navy-500 pb-2">
        <span>Government of Telangana • Healthcare Access Initiative Prototype</span>
      </footer>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <div className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border border-navy-200 shadow-soft-xl animate-in zoom-in-95">
            <h3 className="font-extrabold text-navy-900 text-base">{t('auth.reset_password')}</h3>
            <p className="text-xs text-navy-600">
              {t('auth.reset_password_desc')}
            </p>
            {forgotSent ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-2xl text-xs flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t('auth.reset_sent_msg')}</span>
              </div>
            ) : (
              <input
                type="text"
                value={forgotInput}
                onChange={(e) => setForgotInput(e.target.value)}
                placeholder={t('auth.email_or_mobile_placeholder')}
                className="w-full text-xs p-3 rounded-xl border border-navy-200 bg-navy-50/50"
              />
            )}
            <div className="flex space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 py-2 rounded-xl border border-navy-200 text-xs font-semibold text-navy-700 hover:bg-navy-50"
              >
                {t('auth.close')}
              </button>
              {!forgotSent && (
                <button
                  type="button"
                  onClick={() => setForgotSent(true)}
                  className="flex-1 py-2 rounded-xl bg-medical-600 text-white text-xs font-bold hover:bg-medical-700"
                >
                  {t('auth.send_reset_link')}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Emergency 112 Direct Access Modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 border-2 border-rose-500 shadow-soft-2xl animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div className="text-center">
              <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full uppercase">
                {t('app.grid_badge')}
              </span>
              <h3 className="font-black text-navy-950 text-xl mt-1">{t('app.emergency_112')}</h3>
              <p className="text-xs text-navy-600 mt-1">
                {t('app.subtagline')}
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-black py-3 rounded-xl text-center block text-sm transition-all shadow-soft-md shadow-rose-600/30 active:scale-95"
              >
                📞 {t('app.emergency_112')}
              </a>
              <a
                href="tel:108"
                className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold py-2.5 rounded-xl text-center block text-xs transition-all active:scale-95"
              >
                🚑 {t('app.emergency_108')}
              </a>
              <button
                type="button"
                onClick={() => setShowEmergencyModal(false)}
                className="w-full py-2 text-xs font-bold text-navy-500 hover:text-navy-800"
              >
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
