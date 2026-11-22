import React, { useState } from 'react';
import { 
  MessageSquareHeart, 
  Send, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Building2, 
  ShieldAlert, 
  Camera, 
  UserX, 
  UserCheck, 
  Search, 
  ArrowRight,
  Filter,
  Sparkles
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { CivicCareGrievance } from '../../types';
import { translateGrievanceCategory, translateStatus, translateHospitalName } from '../../i18n/translateHelpers';

export const CivicCareFlow: React.FC = () => {
  const { t } = useTranslation();
  const { 
    grievances, 
    submitCivicGrievance, 
    selectedHospital, 
    patientProfile,
    addToast
  } = useApp();

  const [activeView, setActiveView] = useState<'track' | 'submit'>('track');
  const [category, setCategory] = useState<CivicCareGrievance['category']>('sanitation');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [wardOrDept, setWardOrDept] = useState('OPD Waiting Bay B');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [urgency, setUrgency] = useState<CivicCareGrievance['urgency']>('urgent');
  const [photoAttached, setPhotoAttached] = useState(false);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);

  const categories = [
    { id: 'sanitation', label: t('civic.cat_sanitation', 'Hygiene & Washrooms'), icon: '🧹' },
    { id: 'queue_delay', label: t('civic.cat_delay', 'Queue Delays & Crowding'), icon: '⏱️' },
    { id: 'medicine', label: t('civic.cat_medicine', 'Pharmacy Medicine Stock'), icon: '💊' },
    { id: 'infrastructure', label: t('civic.cat_equipment', 'Fans, Lifts & Water'), icon: '🚰' },
    { id: 'staff_conduct', label: t('civic.cat_staff', 'Staff Guidance / Conduct'), icon: '🤝' },
    { id: 'billing', label: t('civic.cat_other', 'Aarogyasri / Billing'), icon: '📋' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newGrievance = submitCivicGrievance({
      category,
      title: title.trim(),
      description: description.trim(),
      hospitalName: selectedHospital.name,
      wardOrDept: wardOrDept.trim() || 'General OPD Corridor',
      isAnonymous,
      reporterName: isAnonymous ? undefined : patientProfile.name,
      reporterPhone: isAnonymous ? undefined : patientProfile.phone,
      urgency
    });

    setSubmittedCode(newGrievance.trackingCode);
    setTitle('');
    setDescription('');
    setPhotoAttached(false);
    setActiveView('track');
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">CITIZEN GRIEVANCE REDRESSAL</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('civic.title', 'CivicCare Desk')}</h2>
        </div>

        <div className="flex bg-navy-100 p-1 rounded-2xl text-xs font-bold">
          <button
            onClick={() => setActiveView('track')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeView === 'track'
                ? 'bg-white text-navy-950 shadow-soft-sm font-extrabold'
                : 'text-navy-500 hover:text-navy-900'
            }`}
          >
            {t('civic.tab_track', 'Track Status')}
          </button>
          <button
            onClick={() => setActiveView('submit')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeView === 'submit'
                ? 'bg-amber-600 text-white shadow-soft-sm font-extrabold'
                : 'text-navy-500 hover:text-navy-900'
            }`}
          >
            {t('civic.tab_file', '+ File Grievance')}
          </button>
        </div>
      </div>

      {/* Success Banner if recently submitted */}
      {submittedCode && (
        <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-4 text-xs text-emerald-950 flex items-start justify-between shadow-soft-sm animate-in zoom-in-95">
          <div className="flex items-start space-x-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-sm text-emerald-900">{t('civic.grievance_submitted', 'Grievance Registered Successfully')}</h4>
              <p className="mt-0.5">
                {t('civic.tracking_code', 'Tracking ID:')} <strong className="text-emerald-700 font-mono text-xs">{submittedCode}</strong>
              </p>
              <p className="text-[11px] text-emerald-800 mt-1">
                Hospital Administration team notified. Official action timeline: within 4 hours.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setSubmittedCode(null)} 
            className="text-emerald-600 font-bold hover:text-emerald-800 text-xs"
          >
            ✕
          </button>
        </div>
      )}

      {/* VIEW 1: SUBMIT GRIEVANCE FORM */}
      {activeView === 'submit' ? (
        <form onSubmit={handleSubmit} className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-4 animate-in fade-in">
          <div>
            <h3 className="font-extrabold text-navy-900 text-base">{t('civic.title', 'Submit Citizen Complaint')}</h3>
            <p className="text-xs text-navy-500 mt-0.5">
              {t('apt.target_hospital', 'Target Facility')}: <strong className="text-navy-800">{translateHospitalName(selectedHospital.name.split('(')[0])}</strong>
            </p>
          </div>

          {/* Category Grid */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-2">
              {t('civic.category_label', 'Select Issue Category')}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id as any)}
                    className={`p-2.5 rounded-2xl border text-left text-xs font-medium flex items-center space-x-2 transition-all ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950 font-bold shadow-soft-sm ring-1 ring-amber-500/20'
                        : 'border-navy-200/80 hover:border-navy-300 bg-white text-navy-800'
                    }`}
                  >
                    <span className="text-lg">{cat.icon}</span>
                    <span className="truncate">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
              {t('civic.title_label', 'Issue Headline')}
            </label>
            <input
              type="text"
              required
              placeholder={t('civic.title_placeholder', 'e.g. Broken water dispenser in OPD Bay B')}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-navy-50/50"
            />
          </div>

          {/* Ward or Department */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
              {t('civic.ward_dept_label', 'Exact Location / Ward / Floor')}
            </label>
            <input
              type="text"
              required
              placeholder={t('civic.ward_dept_placeholder', 'e.g. Ground Floor, Near Room 104')}
              value={wardOrDept}
              onChange={(e) => setWardOrDept(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-navy-50/50"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
              {t('civic.desc_label', 'Detailed Description & Observation')}
            </label>
            <textarea
              required
              rows={3}
              placeholder={t('civic.desc_placeholder', 'Describe the issue so hospital inspectors can address it immediately...')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-3 rounded-2xl border border-navy-200 focus:outline-none focus:ring-1 focus:ring-amber-500 bg-navy-50/50"
            />
          </div>

          {/* Urgency & Attachments */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                Urgency Level
              </label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 font-medium"
              >
                <option value="routine">Routine (24 hrs)</option>
                <option value="urgent">Urgent (4 hrs)</option>
                <option value="critical">Critical Safety (1 hr)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-navy-700 uppercase tracking-wider block mb-1">
                Photo Proof
              </label>
              <button
                type="button"
                onClick={() => setPhotoAttached(!photoAttached)}
                className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                  photoAttached
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                    : 'border-navy-200 bg-navy-50/50 text-navy-600 hover:bg-navy-100'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>{photoAttached ? '✓ Photo Staged' : 'Attach Photo'}</span>
              </button>
            </div>
          </div>

          {/* Anonymous toggle */}
          <div 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className="flex items-center justify-between p-3 rounded-2xl bg-navy-50/80 border border-navy-200/80 cursor-pointer text-xs"
          >
            <div className="flex items-center space-x-2">
              {isAnonymous ? (
                <UserX className="w-4 h-4 text-navy-600" />
              ) : (
                <UserCheck className="w-4 h-4 text-medical-600" />
              )}
              <div>
                <span className="font-bold text-navy-900">
                  {isAnonymous ? t('civic.anonymous_checkbox', 'Anonymous Submission') : 'Submit with Patient Profile'}
                </span>
                <p className="text-[10px] text-navy-500">
                  {isAnonymous ? 'Your identity and phone number will be hidden' : `Linked to ${patientProfile.name}`}
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
              isAnonymous ? 'bg-amber-600 text-white border-amber-600' : 'bg-white border-navy-300'
            }`}>
              {isAnonymous && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-all shadow-soft-sm flex items-center justify-center space-x-2"
          >
            <Send className="w-4 h-4" />
            <span>{t('civic.submit_grievance', 'Submit Grievance to Hospital Desk')}</span>
          </button>
        </form>
      ) : (
        /* VIEW 2: TRACK GRIEVANCES LIST */
        <div className="space-y-3 animate-in fade-in">
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-2xl p-3 flex items-start space-x-2 text-xs text-amber-950 shadow-soft-sm">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Telangana CivicCare Policy:</strong> Public hospital grievances are audited directly by District Health Administration officers with timestamped resolution tracking.
            </p>
          </div>

          <div className="space-y-3">
            {grievances.map((g) => {
              const isResolved = g.status === 'resolved';
              const isActionTaken = g.status === 'action_taken';
              const isUnderReview = g.status === 'under_review';

              return (
                <div
                  key={g.id}
                  className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {g.trackingCode}
                        </span>
                        <span className="text-[10px] text-navy-400">{g.filedAt}</span>
                      </div>
                      <h4 className="font-bold text-navy-950 text-sm mt-1">{g.title}</h4>
                      <p className="text-xs text-navy-500">{g.wardOrDept} • {translateHospitalName(g.hospitalName.split('(')[0])}</p>
                    </div>

                    <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                      isResolved ? 'bg-emerald-100 text-emerald-800' :
                      isActionTaken ? 'bg-blue-100 text-blue-800' :
                      isUnderReview ? 'bg-amber-100 text-amber-800' :
                      'bg-navy-100 text-navy-700'
                    }`}>
                      {translateStatus(g.status)}
                    </span>
                  </div>

                  <p className="text-xs text-navy-700 leading-relaxed bg-pearl p-2.5 rounded-xl border border-navy-100">
                    "{g.description}"
                  </p>

                  {/* Resolution summary if present */}
                  {g.resolutionSummary && (
                    <div className="bg-medical-50/70 border border-medical-200/70 rounded-xl p-2.5 text-xs text-medical-950">
                      <div className="flex items-center space-x-1 text-[10px] font-bold uppercase text-medical-800 mb-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-medical-600" />
                        <span>{t('civic.resolution_summary', 'Action Report')} ({g.officerAssigned})</span>
                      </div>
                      <p className="text-[11px] leading-snug">{g.resolutionSummary}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-[11px] text-navy-500 pt-1 border-t border-navy-100">
                    <span>{t('apt.patient_name', 'Reporter')}: <strong>{g.isAnonymous ? 'Anonymous Citizen' : g.reporterName}</strong></span>
                    <span className="text-amber-800 font-semibold uppercase text-[10px]">Priority: {g.urgency}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
