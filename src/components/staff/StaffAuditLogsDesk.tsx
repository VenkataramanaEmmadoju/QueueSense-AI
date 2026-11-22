import React from 'react';
import { ShieldCheck, Clock, FileText, AlertCircle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const StaffAuditLogsDesk: React.FC = () => {
  const { auditLogs } = useApp();

  return (
    <div className="space-y-4">
      <div>
        <span className="text-[10px] font-black uppercase text-medical-700 tracking-wider">COMPLIANCE & GOVERNANCE</span>
        <h2 className="text-xl font-black text-navy-900 tracking-tight">Staff Operations & Audit Trail</h2>
        <p className="text-xs text-navy-500">Immutable chronological record of token calls, bed allocations, and clinical dispatches</p>
      </div>

      <div className="bg-white border border-navy-200/80 rounded-3xl overflow-hidden shadow-soft-sm">
        <div className="p-4 bg-navy-50/60 border-b border-navy-100 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-medical-600" />
            <span className="font-bold text-navy-900">Total System Events: {auditLogs.length}</span>
          </div>
          <span className="text-[10px] text-navy-500 font-medium">Auto-recorded with staff session ID</span>
        </div>

        <div className="divide-y divide-navy-100">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 hover:bg-navy-50/40 transition-colors flex items-start space-x-3 text-xs">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                log.severity === 'alert' ? 'bg-rose-100 text-rose-700' :
                log.severity === 'warning' ? 'bg-amber-100 text-amber-700' :
                'bg-teal-100 text-teal-700'
              }`}>
                {log.severity === 'alert' ? <AlertCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-navy-950">{log.action}</span>
                    <span className="text-[9px] bg-navy-200 text-navy-800 font-bold px-1.5 py-0.2 rounded uppercase">
                      {log.role.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-[10px] text-navy-400 font-mono shrink-0">{log.timestamp}</span>
                </div>
                <p className="text-[11px] text-navy-600 mt-0.5">{log.details}</p>
                <p className="text-[10px] text-navy-400 mt-0.5">Actor: {log.actorName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
