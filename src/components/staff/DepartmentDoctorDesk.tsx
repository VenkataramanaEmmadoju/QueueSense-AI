import React from 'react';
import { Building2, Stethoscope, Users, Clock, Plus, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DepartmentDoctorDesk: React.FC = () => {
  const { departments, addToast, addAuditLog } = useApp();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">CLINICAL SCHEDULING</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">Departments & Doctor Rosters</h2>
        <p className="text-xs text-navy-500">Manage OPD rooms, doctor shifts, and load balancing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {departments.map((dept) => {
          const isCongested = dept.status === 'congested';
          const isModerate = dept.status === 'moderate';

          return (
            <div
              key={dept.id}
              className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-2xl bg-teal-100 text-teal-800 font-black flex items-center justify-center text-sm">
                    {dept.shortCode}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-navy-950 text-sm">{dept.name}</h3>
                    <p className="text-xs text-navy-500 font-medium">{dept.roomNumber}</p>
                  </div>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full ${
                  isCongested ? 'bg-amber-100 text-amber-800' :
                  isModerate ? 'bg-blue-100 text-blue-800' :
                  'bg-emerald-100 text-emerald-800'
                }`}>
                  {dept.status}
                </span>
              </div>

              <div className="bg-pearl p-3 rounded-2xl border border-navy-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-navy-500 text-[10px] block uppercase font-semibold">Duty Head Consultant</span>
                  <strong className="text-navy-900 text-xs">{dept.headDoctor}</strong>
                </div>
                <div className="text-right">
                  <span className="text-navy-500 text-[10px] block uppercase font-semibold">Queue Influx</span>
                  <strong className="text-navy-900 text-xs">{dept.currentQueueLength} patients</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-navy-100 flex items-center justify-between text-xs">
                <span className="text-navy-600 font-semibold">
                  Active Doctors: <strong>{dept.activeDoctors}</strong>
                </span>

                <button
                  onClick={() => {
                    addToast('Doctor Shift Assigned', `Additional physician deployed to ${dept.name}`);
                    addAuditLog('Doctor Shift Added', `Department: ${dept.name}`);
                  }}
                  className="bg-medical-50 hover:bg-medical-100 text-medical-800 border border-medical-200 font-bold px-3 py-1.5 rounded-xl text-xs transition-all active:scale-95 flex items-center space-x-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Extra Doctor</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
