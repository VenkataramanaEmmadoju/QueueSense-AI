import React, { useState } from 'react';
import { Download, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PWAInstallBanner: React.FC = () => {
  const { installPWA } = useApp();
  const [dismissed, setDismissed] = useState(false);
  const [installedNotice, setInstalledNotice] = useState(false);

  if (dismissed) return null;

  const handleInstallClick = () => {
    installPWA();
    setInstalledNotice(true);
    setTimeout(() => setDismissed(true), 3500);
  };

  return (
    <div className="bg-gradient-to-r from-medical-900 via-medical-800 to-navy-900 text-white px-4 py-2.5 text-xs shadow-md border-b border-medical-700/50">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-teal-400/30 overflow-hidden p-0.5">
            <img src="/brand/queuesense-symbol.png" alt="QueueSense Logo" className="w-7 h-7 object-contain" />
          </div>
          <div className="truncate">
            <div className="flex items-center space-x-1.5 font-bold tracking-tight text-white text-[13px]">
              <span>Install QueueSense App</span>
              <span className="bg-medical-400/20 text-medical-200 text-[10px] px-1.5 py-0.2 rounded font-semibold uppercase">PWA</span>
            </div>
            <p className="text-[11px] text-teal-100/80 truncate">
              Instant mobile home-screen access & offline support for Telangana Public Healthcare
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          {installedNotice ? (
            <div className="flex items-center space-x-1 bg-emerald-600/40 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/40 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Prompt Opened</span>
            </div>
          ) : (
            <button
              onClick={handleInstallClick}
              className="bg-medical-500 hover:bg-medical-400 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center space-x-1.5 text-xs transition-all shadow-sm active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
          )}

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="text-white/60 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
