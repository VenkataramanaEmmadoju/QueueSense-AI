import React from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { Sparkles, TrendingUp, AlertTriangle, Clock, Users, ArrowUpRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AIAnalyticsDesk: React.FC = () => {
  const { selectedHospital } = useApp();

  // Synthetic Hourly Footfall Data
  const hourlyData = [
    { hour: '08:00', actual: 42, predicted: 40 },
    { hour: '09:00', actual: 95, predicted: 88 },
    { hour: '10:00', actual: 168, predicted: 155 },
    { hour: '11:00', actual: 215, predicted: 220 },
    { hour: '12:00', actual: 180, predicted: 195 },
    { hour: '13:00', actual: 92, predicted: 105 },
    { hour: '14:00', actual: 130, predicted: 125 },
    { hour: '15:00', actual: 110, predicted: 115 },
  ];

  // Turnaround Time (TAT in minutes) by Department
  const tatData = [
    { department: 'Gen Med', waitTime: 22, targetTime: 20 },
    { department: 'Cardio', waitTime: 35, targetTime: 25 },
    { department: 'Pediatrics', waitTime: 15, targetTime: 20 },
    { department: 'Ortho', waitTime: 28, targetTime: 25 },
    { department: 'OBGYN', waitTime: 20, targetTime: 20 },
    { department: 'Pulmo', waitTime: 14, targetTime: 15 },
  ];

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">PREDICTIVE OPERATIONS INTELLIGENCE</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">AI Operational Analytics</h2>
        <p className="text-xs text-navy-500">Live footfall forecasting, queue bottleneck detection, and patient flow dynamics</p>
      </div>

      {/* Synthetic Disclaimer Banner */}
      <div className="bg-medical-50/70 border border-medical-200/80 rounded-2xl p-3 flex items-start space-x-2 text-xs text-medical-900 shadow-soft-sm">
        <Sparkles className="w-4 h-4 text-medical-600 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Synthetic AI Predictive Engine:</strong> Wait times and footfalls are simulated based on seasonal Telangana OPD epidemiological models. No external patient PHI is processed.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
          <span className="text-[10px] text-navy-500 uppercase font-semibold block">Total OPD Footfall</span>
          <div className="text-2xl font-black text-navy-900 mt-1">1,032</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" /> +8.4% vs last week
          </span>
        </div>

        <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
          <span className="text-[10px] text-navy-500 uppercase font-semibold block">Average Queue Wait</span>
          <div className="text-2xl font-black text-medical-700 mt-1">21.4m</div>
          <span className="text-[11px] text-emerald-600 font-bold flex items-center mt-0.5">
            Within 25m target
          </span>
        </div>

        <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
          <span className="text-[10px] text-navy-500 uppercase font-semibold block">Peak Triage Velocity</span>
          <div className="text-2xl font-black text-navy-900 mt-1">3.2m</div>
          <span className="text-[11px] text-navy-500 mt-0.5 block">per patient vitals</span>
        </div>

        <div className="bg-white border border-navy-200/80 rounded-3xl p-4 shadow-soft-sm">
          <span className="text-[10px] text-navy-500 uppercase font-semibold block">Civic SLA Compliance</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">94.8%</div>
          <span className="text-[11px] text-emerald-600 font-bold mt-0.5 block">Within 4hr window</span>
        </div>
      </div>

      {/* CHART 1: Hourly Footfall (Actual vs Predicted) */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-navy-900 text-sm">Hourly OPD Influx: Predicted vs Actual</h3>
            <p className="text-[11px] text-navy-500">Real-time arrival density at {selectedHospital.name.split('(')[0]}</p>
          </div>
          <span className="text-[10px] bg-navy-100 text-navy-700 font-bold px-2 py-0.5 rounded-full">
            Today
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Line type="monotone" dataKey="actual" name="Actual Arrivals" stroke="#0d9488" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="predicted" name="AI Influx Forecast" stroke="#f59e0b" strokeWidth={2} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHART 2: Department Wait Times */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3">
        <div>
          <h3 className="font-bold text-navy-900 text-sm">Department Consultation Turnaround (Minutes)</h3>
          <p className="text-[11px] text-navy-500">Comparing current wait times against Telangana clinical benchmark</p>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tatData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }} 
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <Bar dataKey="waitTime" name="Current Wait (Mins)" fill="#0d9488" radius={[6, 6, 0, 0]} />
              <Bar dataKey="targetTime" name="Hospital Target SLA" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI BOTTLENECK DETECTIONS */}
      <div className="bg-white border border-navy-200/80 rounded-3xl p-5 shadow-soft-sm space-y-3">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-5 h-5 text-medical-600" />
          <h3 className="font-extrabold text-navy-900 text-sm">Autonomous Bottleneck Detections & Action Items</h3>
        </div>

        <div className="space-y-2.5">
          <div className="p-3.5 bg-amber-50 rounded-2xl border border-amber-200/80 flex items-start space-x-3 text-xs text-amber-950">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900">Cardiology OPD Threshold Exceeded</h4>
              <p className="text-[11px] text-amber-800 mt-0.5 leading-relaxed">
                Wait times at Room 204 are running at 35 mins (40% above benchmark). Recommended action: Open supplementary OPD Room 205 and assign Dr. N. Sudhakar.
              </p>
            </div>
          </div>

          <div className="p-3.5 bg-teal-50 rounded-2xl border border-teal-200/80 flex items-start space-x-3 text-xs text-teal-950">
            <Clock className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-teal-900">Fever Clinic Smoothing Expected</h4>
              <p className="text-[11px] text-teal-800 mt-0.5 leading-relaxed">
                General Medicine queue velocity is improving. Queue expected to normalize to &lt;15 mins after 12:30 PM.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
