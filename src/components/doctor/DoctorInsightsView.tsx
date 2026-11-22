import React from 'react';
import { Sparkles, BarChart3, TrendingUp, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { useApp } from '../../context/AppContext';

export const DoctorInsightsView: React.FC = () => {
  const { currentDoctorUser } = useApp();

  const hourlyFlowData = [
    { hour: '08:30 AM', arrivals: 4, consulted: 2, waitAvg: 8 },
    { hour: '09:30 AM', arrivals: 8, consulted: 6, waitAvg: 12 },
    { hour: '10:30 AM', arrivals: 14, consulted: 8, waitAvg: 22 },
    { hour: '11:30 AM', arrivals: 12, consulted: 9, waitAvg: 18 },
    { hour: '12:30 PM', arrivals: 6, consulted: 7, waitAvg: 10 },
    { hour: '01:30 PM', arrivals: 2, consulted: 4, waitAvg: 5 }
  ];

  const diagnosticDistribution = [
    { name: 'ECG Bay', patients: 14, avgMinutes: 6 },
    { name: 'Biochemistry (Lipid/Sugar)', patients: 19, avgMinutes: 12 },
    { name: 'Echocardiography', patients: 5, avgMinutes: 20 },
    { name: 'Direct Pharmacy Dispatch', patients: 26, avgMinutes: 4 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-teal-600" />
          <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
            Predictive AI Clinical Flow Analytics
          </span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 mt-1">Cardiology OPD Queue Intelligence</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Patient arrival patterns, bottleneck predictions, and consultation throughput metrics
        </p>
      </div>

      {/* Hourly Flow Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Hourly Patient Arrivals vs Consultations</h3>
            <p className="text-xs text-slate-500">Live queue load & throughput per 60-minute window</p>
          </div>
          <div className="flex items-center space-x-3 text-xs">
            <span className="flex items-center space-x-1 font-semibold text-teal-700">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 inline-block" />
              <span>Arrivals</span>
            </span>
            <span className="flex items-center space-x-1 font-semibold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              <span>Consulted</span>
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={hourlyFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} 
              />
              <Area type="monotone" dataKey="arrivals" stroke="#0d9488" fill="#ccfbf1" fillOpacity={0.6} />
              <Area type="monotone" dataKey="consulted" stroke="#10b981" fill="#d1fae5" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2 Cards Grid: Pacing & Downstream Diagnostics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Consultation Pacing Advisory</h3>
          
          <div className="space-y-3 text-xs">
            <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl">
              <span className="font-extrabold text-teal-900 block mb-1">Current Speed: 8.5 Minutes / Patient</span>
              <p className="text-teal-800 leading-snug">
                Ideal pace for comprehensive OPD cardiac review. At this rate, all 18 scheduled patients will be completed by 01:15 PM with buffer time for emergency casualty escalations.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
              <span className="font-extrabold text-amber-900 block mb-1">Expected Peak: 10:30 AM - 11:30 AM</span>
              <p className="text-amber-800 leading-snug">
                Peak check-in window. 6 patients will arrive in rapid succession from rural bus transport arrival times at Gachibowli junction.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-sm">Downstream Diagnostics Throughput</h3>
          
          <div className="space-y-3 text-xs">
            {diagnosticDistribution.map((d, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{d.name}</h4>
                  <p className="text-[11px] text-slate-500">{d.patients} referrals processed today</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-teal-700">~{d.avgMinutes}m turnaround</span>
                  <span className="block text-[10px] text-emerald-600 font-semibold">Active</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
