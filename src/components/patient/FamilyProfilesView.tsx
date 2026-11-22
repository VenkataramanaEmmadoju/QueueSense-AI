import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  CalendarPlus, 
  Edit3, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle, 
  Heart, 
  Phone, 
  Calendar,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { FamilyMember, FamilyRelationship } from '../../types';

export const FamilyProfilesView: React.FC = () => {
  const { t } = useTranslation();
  const { 
    familyMembers, 
    addFamilyMember, 
    updateFamilyMember, 
    removeFamilyMember, 
    appointments, 
    setPatientTab, 
    currentUser,
    patientProfile
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<FamilyMember | null>(null);
  const [memberToDelete, setMemberToDelete] = useState<FamilyMember | null>(null);

  // Form states
  const [formName, setFormName] = useState('');
  const [formRelation, setFormRelation] = useState<FamilyRelationship>('Father');
  const [formAge, setFormAge] = useState('');
  const [formGender, setFormGender] = useState('Male');
  const [formPhone, setFormPhone] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formError, setFormError] = useState('');

  const relationships: FamilyRelationship[] = [
    'Father', 'Mother', 'Spouse', 'Son', 'Daughter', 
    'Brother', 'Sister', 'Grandfather', 'Grandmother', 'Other'
  ];

  const openAddModal = () => {
    setEditingMember(null);
    setFormName('');
    setFormRelation('Father');
    setFormAge('');
    setFormGender('Male');
    setFormPhone('');
    setFormNotes('');
    setFormError('');
    setIsAddModalOpen(true);
  };

  const openEditModal = (member: FamilyMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormRelation(member.relation);
    setFormAge(member.age.toString());
    setFormGender(member.gender || 'Male');
    setFormPhone(member.phone || '');
    setFormNotes(member.notes || '');
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAge) {
      setFormError('Please enter member name and age.');
      return;
    }

    if (editingMember) {
      updateFamilyMember(editingMember.id, {
        name: formName.trim(),
        relation: formRelation,
        age: parseInt(formAge) || 30,
        gender: formGender,
        phone: formPhone.trim() || undefined,
        notes: formNotes.trim() || undefined
      });
    } else {
      addFamilyMember({
        name: formName.trim(),
        relation: formRelation,
        age: parseInt(formAge) || 30,
        gender: formGender,
        phone: formPhone.trim() || undefined,
        notes: formNotes.trim() || undefined
      });
    }

    setIsAddModalOpen(false);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      removeFamilyMember(memberToDelete.id);
      setMemberToDelete(null);
    }
  };

  // Count upcoming appointments per member
  const getAppointmentCountForMember = (memberId: string, memberName: string) => {
    return appointments.filter(a => 
      (a.beneficiaryId === memberId || a.beneficiaryName.toLowerCase() === memberName.toLowerCase()) && 
      a.status === 'upcoming'
    ).length;
  };

  return (
    <div className="space-y-4 pb-24 md:pb-12 max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">CAREGIVER ECOSYSTEM</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('family.title')}</h2>
          <p className="text-xs text-navy-500">{t('family.subtitle')}</p>
        </div>

        <button
          onClick={openAddModal}
          className="bg-medical-600 hover:bg-medical-700 active:scale-95 text-white font-bold px-3 py-2 rounded-2xl text-xs flex items-center space-x-1.5 shadow-soft-sm transition-all shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>{t('family.add_member_btn', '+ Add Family Member')}</span>
        </button>
      </div>

      {/* Account Owner Card (Self) */}
      <div className="bg-gradient-to-r from-medical-900 via-navy-900 to-medical-950 text-white rounded-3xl p-5 shadow-soft-md">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-lg border border-white/20">
              👤
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-extrabold text-white text-base">{currentUser?.name || patientProfile.name}</h3>
                <span className="bg-medical-500/20 text-teal-300 border border-teal-400/30 text-[10px] font-black px-2 py-0.2 rounded-full uppercase">
                  {t('home.myself', 'Primary Account')}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {t('family.modal_age_label', 'Age')}: {currentUser?.age || patientProfile.age} • {t('family.modal_phone_label', 'Phone')}: {currentUser?.phone || patientProfile.phone}
              </p>
              <p className="text-[11px] text-teal-200 mt-0.5 font-mono">
                ABHA: {currentUser?.abhaDemoNumber || patientProfile.abhaId}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-300">
            {t('apt.my_appointments_title', 'Appointments')}: <strong>{getAppointmentCountForMember(currentUser?.id || patientProfile.id, currentUser?.name || patientProfile.name)}</strong>
          </span>
          <button
            onClick={() => setPatientTab('booking')}
            className="bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center space-x-1 transition-all active:scale-95"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            <span>{t('home.service_book_opd', 'Book OPD')}</span>
          </button>
        </div>
      </div>

      {/* Family Members List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-navy-600 uppercase tracking-wider px-1">
          {t('family.title', 'Family & Dependents')} ({familyMembers.length})
        </h3>

        {familyMembers.length === 0 ? (
          <div className="bg-white border border-navy-200/80 rounded-3xl p-8 text-center space-y-2">
            <Users className="w-10 h-10 text-navy-300 mx-auto stroke-1" />
            <h4 className="font-bold text-navy-900 text-sm">No Family Members Added Yet</h4>
            <p className="text-xs text-navy-500 max-w-xs mx-auto">
              Add parents, children or dependents to manage their OPD bookings and tokens from your single login.
            </p>
            <button
              onClick={openAddModal}
              className="mt-2 bg-medical-50 text-medical-700 border border-medical-200 font-bold px-4 py-2 rounded-xl text-xs inline-flex items-center space-x-1"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add First Dependent</span>
            </button>
          </div>
        ) : (
          familyMembers.map((member) => {
            const aptCount = getAppointmentCountForMember(member.id, member.name);

            return (
              <div
                key={member.id}
                className="bg-white border border-navy-200/80 rounded-3xl p-4 sm:p-5 shadow-soft-sm space-y-3 hover:border-medical-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold text-xl border border-teal-100">
                      {member.relation === 'Father' || member.relation === 'Grandfather' ? '👴' :
                       member.relation === 'Mother' || member.relation === 'Grandmother' ? '👵' :
                       member.relation === 'Son' || member.relation === 'Daughter' ? '🧒' : '🧑'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-extrabold text-navy-950 text-sm">{member.name}</h4>
                        <span className="text-[10px] bg-navy-100 text-navy-800 font-bold px-2 py-0.5 rounded-full">
                          {member.relation}
                        </span>
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">
                        Age: {member.age} • Gender: {member.gender || 'Not Specified'}
                        {member.phone && ` • ${member.phone}`}
                      </p>
                      {member.notes && (
                        <p className="text-[11px] text-medical-800 bg-medical-50/70 px-2 py-0.5 rounded-md inline-block mt-1 font-medium">
                          Notes: {member.notes}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditModal(member)}
                      className="p-1.5 text-navy-400 hover:text-navy-800 rounded-lg hover:bg-navy-100 transition-colors"
                      title="Edit Family Member"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setMemberToDelete(member)}
                      className="p-1.5 text-navy-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Remove Family Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Footer of Card: Appointments & Booking CTA */}
                <div className="pt-3 border-t border-navy-100 flex items-center justify-between text-xs">
                  <span className="text-navy-500 font-medium">
                    {t('queue.live_token', 'Tokens')}: <strong className="text-navy-900">{aptCount}</strong>
                  </span>

                  <button
                    onClick={() => {
                      setPatientTab('booking');
                    }}
                    className="bg-medical-50 hover:bg-medical-100 text-medical-800 font-bold px-3 py-1.5 rounded-xl border border-medical-200 transition-all active:scale-95 flex items-center space-x-1"
                  >
                    <CalendarPlus className="w-3.5 h-3.5" />
                    <span>{t('family.book_appointment', 'Book for')} {member.name.split(' ')[0]}</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between pb-2 border-b border-navy-100">
              <h3 className="font-extrabold text-navy-900 text-base">
                {editingMember ? t('family.edit_member', 'Edit Family Profile') : t('family.modal_add_title', 'Add New Family Member')}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-navy-400 hover:text-navy-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl font-medium">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamala Santhu"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 focus:outline-none focus:ring-1 focus:ring-medical-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    Relationship *
                  </label>
                  <select
                    value={formRelation}
                    onChange={(e) => setFormRelation(e.target.value as FamilyRelationship)}
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 font-medium"
                  >
                    {relationships.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    Age *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 62"
                    value={formAge}
                    onChange={(e) => setFormAge(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    Gender
                  </label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50 font-medium"
                  >
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                    Contact Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 "
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-navy-700 uppercase tracking-wider block mb-1">
                  Health Notes / Known Conditions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Diabetic, Cardiac review, Pediatric vaccination"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-navy-200 bg-navy-50/50"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-medical-600 hover:bg-medical-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all active:scale-95"
                >
                  {editingMember ? 'Save Changes' : 'Add Family Member'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold rounded-xl text-xs"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION DIALOG */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-3 shadow-2xl text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-navy-900 text-base">Remove Family Profile?</h3>
            <p className="text-xs text-navy-600 leading-relaxed">
              Are you sure you want to remove <strong>{memberToDelete.name}</strong> ({memberToDelete.relation})?
            </p>

            <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-[11px] text-amber-900 text-left">
              <strong>Notice:</strong> Removing this profile will not delete past OPD consultations or appointments booked for this person.
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={confirmDelete}
                className="flex-1 bg-rose-600 hover:bg-rose-700 text-white font-bold py-2.5 rounded-xl text-xs active:scale-95 transition-all"
              >
                Yes, Remove
              </button>
              <button
                onClick={() => setMemberToDelete(null)}
                className="flex-1 bg-navy-100 hover:bg-navy-200 text-navy-800 font-semibold py-2.5 rounded-xl text-xs"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
