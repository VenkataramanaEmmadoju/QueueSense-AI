import React, { useState } from 'react';
import { Users, User, Heart, Plus, Check, X, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { CaregiverProfile } from '../../types';

interface CaregiverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CaregiverModal: React.FC<CaregiverModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { 
    patientProfile, 
    activePatientIdentity, 
    setActivePatientIdentity,
    addCaregiverMember 
  } = useApp();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newRelationship, setNewRelationship] = useState('Mother');
  const [newAge, setNewAge] = useState('');
  const [newGender, setNewGender] = useState('Female');
  const [newCondition, setNewCondition] = useState('');

  if (!isOpen) return null;

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAge) return;

    addCaregiverMember({
      name: newName.trim(),
      relationship: newRelationship,
      age: parseInt(newAge) || 45,
      gender: newGender,
      phone: patientProfile.phone,
      abhaId: `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-1190`,
      uhid: `TIMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      conditionNotes: newCondition.trim() || undefined
    });

    setShowAddForm(false);
    setNewName('');
    setNewAge('');
    setNewCondition('');
  };

  const initials = patientProfile.name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-navy-950/60 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in">
      <div 
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-2xl shadow-soft-xl max-h-[85vh] flex flex-col overflow-hidden animate-in slide-in-from-bottom"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b border-navy-100 flex items-center justify-between bg-medical-50/50">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-medical-100 flex items-center justify-center text-medical-700">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-navy-900 text-sm">{t('modal.caregiver_title', 'Select Active Patient Identity')}</h3>
              <p className="text-[11px] text-navy-500">{t('modal.caregiver_subtitle', 'Switch identity between yourself and family members')}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-navy-400 hover:text-navy-700 rounded-full hover:bg-navy-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {/* Active Profile: Self */}
          <div 
            onClick={() => { setActivePatientIdentity('self'); onClose(); }}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
              activePatientIdentity === 'self'
                ? 'border-medical-600 bg-medical-50/70 shadow-soft-sm ring-1 ring-medical-500/20'
                : 'border-navy-200 hover:border-navy-300 bg-white'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-medical-100 text-medical-800 font-bold flex items-center justify-center text-sm">
                {initials}
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-navy-900 text-sm">{patientProfile.name}</span>
                  <span className="text-[10px] bg-medical-200 text-medical-900 px-1.5 py-0.5 rounded font-semibold uppercase">{t('home.myself', 'Self')}</span>
                </div>
                <div className="text-xs text-navy-500 mt-0.5">
                  {t('family.modal_age_label', 'Age')}: {patientProfile.age} | ABHA: {patientProfile.abhaId}
                </div>
              </div>
            </div>
            {activePatientIdentity === 'self' && (
              <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Caregiver Dependents */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-navy-600 uppercase tracking-wider">Registered Family Members</span>
              <button 
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs text-medical-600 font-semibold hover:text-medical-700 flex items-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>{showAddForm ? 'Cancel' : 'Add Member'}</span>
              </button>
            </div>

            {patientProfile.caregivers.map((member) => {
              const isSelected = activePatientIdentity !== 'self' && activePatientIdentity.id === member.id;
              return (
                <div 
                  key={member.id}
                  onClick={() => { setActivePatientIdentity(member); onClose(); }}
                  className={`p-3.5 mb-2 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'border-medical-600 bg-medical-50/70 shadow-soft-sm ring-1 ring-medical-500/20'
                      : 'border-navy-200 hover:border-navy-300 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-100 text-navy-700 font-bold flex items-center justify-center text-sm">
                      {member.relationship === 'Father' || member.relationship === 'Mother' ? '👴' : '👧'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-navy-900 text-sm">{member.name}</span>
                        <span className="text-[10px] bg-navy-200 text-navy-800 px-1.5 py-0.5 rounded font-medium">
                          {member.relationship}
                        </span>
                      </div>
                      <div className="text-xs text-navy-500 mt-0.5">
                        Age: {member.age} • {member.conditionNotes || 'General Care'}
                      </div>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-medical-600 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Member inline form */}
          {showAddForm && (
            <form onSubmit={handleAddSubmit} className="p-3.5 bg-navy-50 rounded-2xl border border-navy-200 space-y-2.5 animate-in fade-in">
              <h4 className="text-xs font-bold text-navy-800">Add New Dependent for OPD Tokens</h4>
              <div>
                <label className="text-[11px] font-medium text-navy-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kamala Santhu"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-navy-300 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-medium text-navy-600 block mb-1">Relationship</label>
                  <select
                    value={newRelationship}
                    onChange={e => setNewRelationship(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-navy-300 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-white"
                  >
                    <option value="Mother">Mother</option>
                    <option value="Father">Father</option>
                    <option value="Child">Child</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Grandparent">Grandparent</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-navy-600 block mb-1">Age</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g. 62"
                    value={newAge}
                    onChange={e => setNewAge(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-navy-300 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-navy-600 block mb-1">Known Condition (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Diabetic, Thyroid, Pediatric checkup"
                  value={newCondition}
                  onChange={e => setNewCondition(e.target.value)}
                  className="w-full text-xs p-2 rounded-lg border border-navy-300 focus:outline-none focus:ring-1 focus:ring-medical-600 bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-medical-600 hover:bg-medical-700 text-white font-semibold py-2 rounded-lg text-xs transition-all mt-1"
              >
                Save Family Member
              </button>
            </form>
          )}
        </div>

        <div className="p-3 bg-navy-50 text-[11px] text-navy-500 border-t border-navy-100 flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-medical-600 shrink-0" />
          <span>Tokens booked in Caregiver Mode link directly to patient UHID and Aadhaar / ABHA records.</span>
        </div>
      </div>
    </div>
  );
};
