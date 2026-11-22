import React from 'react';
import { BedDouble, Plus, Minus, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { translateBedCategory, translateHospitalName } from '../../i18n/translateHelpers';

export const BedManagementDesk: React.FC = () => {
  const { t } = useTranslation();
  const { bedCategories, updateBedCount, selectedHospital, addToast } = useApp();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">INPATIENT ADMISSIONS BUREAU</span>
          <h2 className="text-xl font-black text-navy-900 tracking-tight">{t('staff.nav_beds', 'Live Bed Management Bureau')}</h2>
          <p className="text-xs text-navy-500">{translateHospitalName(selectedHospital.name.split('(')[0])}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {bedCategories.map((cat) => {
          const occupancyRate = Math.round((cat.occupied / cat.total) * 100);

          return (
            <div
              key={cat.id}
              className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    cat.name.includes('ICU') ? 'bg-rose-100 text-rose-700' :
                    cat.name.includes('Oxygen') ? 'bg-teal-100 text-teal-700' :
                    'bg-navy-100 text-navy-700'
                  }`}>
                    <BedDouble className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-950 text-sm">{translateBedCategory(cat.name)}</h3>
                    <p className="text-[11px] text-navy-500">{t('beds.total_capacity', 'Total Capacity')}: {cat.total} {t('hosp.beds', 'beds')}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-700">{cat.available}</span>
                  <span className="text-[10px] text-navy-400 block font-bold uppercase">{t('beds.available', 'Vacant')}</span>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="flex justify-between text-[11px] text-navy-500 mb-1 font-medium">
                  <span>{t('beds.occupied', 'Occupied')}: {cat.occupied}</span>
                  <span>{occupancyRate}% full</span>
                </div>
                <div className="w-full bg-navy-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      occupancyRate > 90 ? 'bg-rose-500' : occupancyRate > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${occupancyRate}%` }}
                  />
                </div>
              </div>

              {/* Staff Action Buttons */}
              <div className="pt-2 border-t border-navy-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => {
                    if (cat.available > 0) {
                      updateBedCount(cat.id, 'occupy');
                      addToast('Patient Admitted', `Assigned to ${cat.name}`);
                    }
                  }}
                  disabled={cat.available === 0}
                  className="flex-1 bg-medical-50 hover:bg-medical-100 disabled:opacity-50 text-medical-800 text-xs font-bold py-2 rounded-xl flex items-center justify-center space-x-1 border border-medical-200 transition-all active:scale-95"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{t('staff.admit_patient', 'Admit Patient')}</span>
                </button>

                <button
                  onClick={() => {
                    if (cat.occupied > 0) {
                      updateBedCount(cat.id, 'release');
                      addToast('Patient Discharged', `Bed freed in ${cat.name}`);
                    }
                  }}
                  disabled={cat.occupied === 0}
                  className="flex-1 bg-navy-50 hover:bg-navy-100 disabled:opacity-50 text-navy-800 text-xs font-semibold py-2 rounded-xl flex items-center justify-center space-x-1 border border-navy-200 transition-all active:scale-95"
                >
                  <Minus className="w-3.5 h-3.5" />
                  <span>{t('staff.discharge_patient', 'Discharge / Free')}</span>
                </button>

                <button
                  onClick={() => {
                    if (cat.available > 0) {
                      updateBedCount(cat.id, 'reserve');
                      addToast('Emergency Buffer Reserved', `1 bed held for casualty in ${cat.name}`);
                    }
                  }}
                  className="px-2.5 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-xs font-semibold"
                  title="Reserve 1 bed for incoming emergency casualty"
                >
                  SOS Hold
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
